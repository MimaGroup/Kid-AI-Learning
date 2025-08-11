import streamlit as st
import sys
import os
import json
import glob
import openai
from collections import Counter
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def load_scraped_data():
    """Load scraped educational data"""
    try:
        files = glob.glob("scraped_data/kids_education_*.json")
        if files:
            latest_file = max(files, key=os.path.getctime)
            with open(latest_file, 'r') as f:
                return json.load(f)
    except:
        pass
    return []

def generate_ai_lesson(topic, age_group, scraped_insights):
    """Generate actual AI-powered lesson using scraped insights"""
    
    # Check if OpenAI API key is available
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        return generate_fallback_lesson(topic, age_group, scraped_insights)
    
    try:
        client = openai.OpenAI(api_key=api_key)
        
        # Create context from scraped data
        context = f"""
        Based on analysis of successful educational websites, here are proven approaches:
        
        Successful sites for this age group use:
        - {', '.join(scraped_insights['teaching_approaches'][:3])}
        
        Popular activity types:
        - {', '.join(scraped_insights['activity_types'][:3])}
        
        Engagement words that work:
        - {', '.join(scraped_insights['engagement_words'][:5])}
        
        Lesson structure patterns from successful sites:
        {scraped_insights['structure_pattern']}
        """
        
        prompt = f"""
        Create an engaging {topic} lesson for children aged {age_group}.
        
        {context}
        
        Create a complete lesson with:
        1. An exciting hook/introduction (use storytelling or games)
        2. 3 progressive learning activities
        3. A hands-on project they can create
        4. Simple assessment questions
        5. Extension activities for advanced learners
        
        Make it practical, fun, and age-appropriate. Use the successful patterns from the educational sites.
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert educational content creator who designs engaging, age-appropriate lessons based on proven educational approaches."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        return response.choices[0].message.content
        
    except Exception as e:
        st.error(f"AI generation error: {e}")
        return generate_fallback_lesson(topic, age_group, scraped_insights)

def generate_fallback_lesson(topic, age_group, insights):
    """Generate lesson without AI as fallback"""
    
    lesson_content = f"""
## 🎯 {topic} Adventure for Ages {age_group}

### 🚀 Exciting Introduction
Let's start a coding adventure! Imagine you're a digital explorer who needs to teach a friendly robot how to think and solve problems.

### 🎮 Learning Activities

**Activity 1: Code Detective**
- Explore simple {topic.lower()} concepts through interactive puzzles
- Use visual elements and drag-and-drop interfaces
- {insights['engagement_words'][0] if insights['engagement_words'] else 'Discover'} how computers think step by step

**Activity 2: Creative Builder**
- Build your own mini-project using {topic.lower()}
- Start with templates and customize them
- Make something you can show to friends and family

**Activity 3: Problem Solver**
- Take on coding challenges that get progressively more {insights['engagement_words'][1] if len(insights['engagement_words']) > 1 else 'exciting'}
- Work in pairs or small groups
- Celebrate each success with digital badges

### 🎨 Hands-On Project
Create your own interactive story or game using {topic.lower()}! You'll:
- Design characters and backgrounds
- Add movement and interactions
- Share your creation with others

### 🧠 Quick Check
- What did you {insights['engagement_words'][2] if len(insights['engagement_words']) > 2 else 'learn'} today?
- Can you explain one new concept to a friend?
- What would you like to {insights['engagement_words'][0] if insights['engagement_words'] else 'build'} next?

### 🌟 Level Up Challenges
- Add sound effects to your project
- Create multiple levels or scenes
- Teach someone else what you learned

---
*This lesson was enhanced using insights from {len(insights.get('source_sites', []))} successful educational websites!*
"""
    
    return lesson_content

def extract_insights_from_scraped_data(data, topic, age_group):
    """Extract relevant insights from scraped data"""
    insights = {
        'teaching_approaches': [],
        'activity_types': [],
        'engagement_words': [],
        'structure_pattern': '',
        'source_sites': []
    }
    
    relevant_sites = []
    
    # Find relevant sites
    for item in data:
        content = (item.get('full_content', '') + ' ' + item.get('description', '')).lower()
        
        # Check if relevant to topic
        topic_keywords = ['programming', 'coding', 'python', 'computer', 'technology', 'ai', 'stem']
        if any(keyword in content for keyword in topic_keywords):
            relevant_sites.append(item)
    
    # Extract insights from relevant sites
    for item in relevant_sites:
        content = (item.get('full_content', '') + ' ' + item.get('description', '')).lower()
        insights['source_sites'].append(item['site_name'])
        
        # Extract teaching approaches
        if 'game' in content or 'play' in content:
            insights['teaching_approaches'].append('game-based learning')
        if 'visual' in content or 'blocks' in content:
            insights['teaching_approaches'].append('visual programming')
        if 'story' in content or 'adventure' in content:
            insights['teaching_approaches'].append('storytelling approach')
        if 'hands-on' in content or 'project' in content:
            insights['teaching_approaches'].append('project-based learning')
        
        # Extract activity types
        if 'challenge' in content:
            insights['activity_types'].append('coding challenges')
        if 'creative' in content or 'create' in content:
            insights['activity_types'].append('creative projects')
        if 'interactive' in content:
            insights['activity_types'].append('interactive exercises')
        if 'tutorial' in content:
            insights['activity_types'].append('guided tutorials')
        
        # Extract engagement words
        engagement_words = ['fun', 'exciting', 'adventure', 'discover', 'explore', 'create', 'build', 'play', 'amazing', 'cool']
        for word in engagement_words:
            if word in content:
                insights['engagement_words'].append(word)
    
    # Create structure pattern
    if '6-8' in age_group:
        insights['structure_pattern'] = "Start with stories/games → Visual activities → Creative projects → Show & share"
    elif '9-12' in age_group:
        insights['structure_pattern'] = "Problem introduction → Guided practice → Independent creation → Peer sharing"
    else:
        insights['structure_pattern'] = "Real-world connection → Deep exploration → Complex projects → Reflection & extension"
    
    # Remove duplicates
    insights['teaching_approaches'] = list(set(insights['teaching_approaches']))
    insights['activity_types'] = list(set(insights['activity_types']))
    insights['engagement_words'] = list(set(insights['engagement_words']))
    insights['source_sites'] = list(set(insights['source_sites']))
    
    return insights

def show_smart_lesson_generator():
    """Enhanced smart lesson generator with real AI"""
    st.title("🎯 Smart Lesson Generator")
    st.caption("Enhanced with insights from top educational websites")
    
    data = load_scraped_data()
    
    if not data:
        st.warning("No scraped data found. Run the scraper first!")
        st.code("python custom_kids_scraper.py")
        return
    
    # Input section
    col1, col2 = st.columns(2)
    with col1:
        topic = st.selectbox("Choose Topic:", [
            "Python Programming", "AI Basics", "Creative Coding", 
            "Math Games", "Science Experiments", "Digital Art",
            "Web Development", "Game Design", "Data Science"
        ])
    
    with col2:
        age_group = st.selectbox("Age Group:", ["6-8", "9-12", "13-15", "16-18"])
    
    # Generate lesson button
    if st.button("🚀 Generate Enhanced Lesson", type="primary"):
        
        # Show loading spinner
        with st.spinner("🧠 Analyzing educational patterns and generating your lesson..."):
            
            # Extract insights from scraped data
            insights = extract_insights_from_scraped_data(data, topic, age_group)
            
            # Show insights being used
            if insights['source_sites']:
                st.success(f"✅ Lesson enhanced using insights from {len(insights['source_sites'])} educational sites!")
                
                with st.expander("🔍 See what insights are being used"):
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        if insights['teaching_approaches']:
                            st.write("**🎯 Teaching Approaches:**")
                            for approach in insights['teaching_approaches'][:3]:
                                st.write(f"• {approach}")
                    
                    with col2:
                        if insights['engagement_words']:
                            st.write("**💫 Engagement Elements:**")
                            for word in insights['engagement_words'][:4]:
                                st.write(f"• {word}")
                    
                    st.write(f"**🌟 Inspired by:** {', '.join(insights['source_sites'][:3])}")
            
            # Generate the actual lesson
            lesson_content = generate_ai_lesson(topic, age_group, insights)
            
            # Display the generated lesson
            st.markdown("---")
            st.markdown(lesson_content)
            
            # Add download option
            st.download_button(
                label="📥 Download Lesson Plan",
                data=lesson_content,
                file_name=f"{topic.lower().replace(' ', '_')}_lesson_{age_group}.md",
                mime="text/markdown"
            )

def main():
    """Main application"""
    st.set_page_config(
        page_title="AI Kids Learning - Enhanced",
        page_icon="🚀",
        layout="wide"
    )
    
    # Sidebar navigation
    st.sidebar.title("🚀 Enhanced Features")
    st.sidebar.caption("Powered by scraped educational data")
    
    page = st.sidebar.selectbox("Choose Enhancement:", [
        "🎯 Smart Lesson Generator",
        "📊 Content Optimizer", 
        "🆕 Fresh Resources",
        "📈 Analytics Dashboard"
    ])
    
    # Show data status
    data = load_scraped_data()
    if data:
        st.sidebar.success(f"✅ {len(data)} educational sites loaded")
        
        # Show API status
        if os.getenv('OPENAI_API_KEY'):
            st.sidebar.success("🤖 AI Generation: Ready")
        else:
            st.sidebar.warning("⚠️ Add OPENAI_API_KEY for AI lessons")
    else:
        st.sidebar.warning("⚠️ No scraped data found")
        st.sidebar.info("Run: python custom_kids_scraper.py")
    
    # Route to different pages - simplified for now
    if page == "🎯 Smart Lesson Generator":
        show_smart_lesson_generator()
    else:
        st.info(f"Feature '{page}' coming soon! For now, try the Smart Lesson Generator.")

if __name__ == "__main__":
    main()
