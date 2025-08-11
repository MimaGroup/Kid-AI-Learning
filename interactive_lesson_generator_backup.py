import streamlit as st
import json
import glob
import random
import time
import os
from datetime import datetime

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

def initialize_session_state():
    """Initialize all session state variables"""
    if 'lesson_progress' not in st.session_state:
        st.session_state.lesson_progress = 0
    
    if 'activity1_completed' not in st.session_state:
        st.session_state.activity1_completed = False
    
    if 'activity2_completed' not in st.session_state:
        st.session_state.activity2_completed = False
    
    if 'activity3_completed' not in st.session_state:
        st.session_state.activity3_completed = False
    
    if 'activity4_completed' not in st.session_state:
        st.session_state.activity4_completed = False
    
    if 'activity5_completed' not in st.session_state:
        st.session_state.activity5_completed = False

def create_interactive_ai_lesson():
    """Create a complete interactive AI lesson with all activities working"""
    
    st.title("🤖 Interactive AI Adventure!")
    st.caption("Learn about AI by doing, not just reading!")
    
    # Initialize session state
    initialize_session_state()
    
    # Progress tracking
    total_activities = 5
    completed_activities = sum([
        st.session_state.activity1_completed,
        st.session_state.activity2_completed, 
        st.session_state.activity3_completed,
        st.session_state.activity4_completed,
        st.session_state.activity5_completed
    ])
    
    progress = st.progress(completed_activities / total_activities)
    st.write(f"🎯 **Progress: {completed_activities}/{total_activities} activities completed**")
    
    # Activity 1: AI Detective Game
    st.subheader("🎮 Activity 1: AI Detective Game")
    
    if not st.session_state.activity1_completed:
        items = [
            {"name": "Smart Speaker (Alexa)", "is_ai": True, "emoji": "🔊"},
            {"name": "Calculator", "is_ai": False, "emoji": "🧮"},
            {"name": "Netflix Recommendations", "is_ai": True, "emoji": "📺"},
            {"name": "Regular Clock", "is_ai": False, "emoji": "⏰"},
            {"name": "Google Translate", "is_ai": True, "emoji": "🌐"},
            {"name": "Flashlight", "is_ai": False, "emoji": "🔦"}
        ]
        
        if 'detective_game' not in st.session_state:
            st.session_state.detective_game = {
                'current_item': random.choice(items),
                'score': 0,
                'questions_asked': 0,
                'items': items
            }
        
        game = st.session_state.detective_game
        item = game['current_item']
        
        st.write(f"### {item['emoji']} Is this AI or Not AI?")
        st.write(f"**{item['name']}**")
        st.write(f"**Score: {game['score']}/{game['questions_asked']}** | **Question: {game['questions_asked'] + 1}/3**")
        
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🤖 This is AI!", key="ai_yes", type="primary"):
                game['questions_asked'] += 1
                if item['is_ai']:
                    st.success("✅ Correct! This uses AI!")
                    game['score'] += 1
                else:
                    st.error("❌ Not quite! This doesn't use AI.")
                
                if game['questions_asked'] < 3:
                    game['current_item'] = random.choice(game['items'])
                    time.sleep(1)
                    st.rerun()
                else:
                    st.success(f"🎉 Activity 1 Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    st.balloons()
                    time.sleep(2)
                    st.rerun()
        
        with col2:
            if st.button("🚫 Not AI!", key="ai_no", type="secondary"):
                game['questions_asked'] += 1
                if not item['is_ai']:
                    st.success("✅ Correct! This doesn't use AI!")
                    game['score'] += 1
                else:
                    st.error("❌ Actually, this does use AI!")
                
                if game['questions_asked'] < 3:
                    game['current_item'] = random.choice(game['items'])
                    time.sleep(1)
                    st.rerun()
                else:
                    st.success(f"🎉 Activity 1 Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    st.balloons()
                    time.sleep(2)
                    st.rerun()
    else:
        st.success("✅ **Activity 1 Completed!** You're an AI Detective!")
    
    st.divider()
    
    # Activity 2: Build Your AI Friend
    st.subheader("🎨 Activity 2: Design Your AI Friend")
    
    if st.session_state.activity1_completed and not st.session_state.activity2_completed:
        st.write("🎉 **Unlocked!** Create your own AI friend by choosing its features!")
        
        col1, col2 = st.columns(2)
        
        with col1:
            ai_name = st.text_input("🏷️ What's your AI friend's name?", value="RoboHelper", key="ai_name_input")
            ai_color = st.color_picker("🎨 Pick a color for your AI friend", "#00f900", key="ai_color_input")
            ai_shape = st.selectbox("🔷 Choose a shape:", ["Robot 🤖", "Animal 🐱", "Star ⭐", "Heart ❤️"], key="ai_shape_input")
        
        with col2:
            ai_power = st.multiselect("⚡ What powers should it have?", [
                "Help with homework 📚",
                "Tell jokes 😄", 
                "Play music 🎵",
                "Answer questions ❓",
                "Play games 🎮"
            ], key="ai_power_input")
            
            ai_personality = st.radio("😊 Personality:", ["Friendly", "Funny", "Smart", "Adventurous"], key="ai_personality_input")
        
        if st.button("✨ Create My AI Friend!", type="primary", key="create_ai_friend"):
            st.success("🎉 AI Friend Created!")
            
            # Display the created AI friend
            st.markdown(f"""
            <div style="background-color: {ai_color}; padding: 20px; border-radius: 10px; text-align: center; color: white; margin: 10px 0;">
                <h2>{ai_shape} {ai_name}</h2>
                <p><strong>Personality:</strong> {ai_personality}</p>
                <p><strong>Powers:</strong> {', '.join(ai_power) if ai_power else 'Being awesome!'}</p>
            </div>
            """, unsafe_allow_html=True)
            
            # Store the AI friend data
            st.session_state.ai_friend = {
                'name': ai_name,
                'color': ai_color,
                'shape': ai_shape,
                'powers': ai_power,
                'personality': ai_personality
            }
            
            st.session_state.activity2_completed = True
            st.balloons()
            time.sleep(2)
            st.rerun()
    
    elif st.session_state.activity2_completed:
        st.success("✅ **Activity 2 Completed!** Your AI friend is ready!")
        # Show the created AI friend
        if 'ai_friend' in st.session_state:
            friend = st.session_state.ai_friend
            st.markdown(f"""
            <div style="background-color: {friend['color']}; padding: 15px; border-radius: 10px; text-align: center; color: white; margin: 10px 0;">
                <h3>{friend['shape']} {friend['name']}</h3>
                <p>{friend['personality']} personality</p>
            </div>
            """, unsafe_allow_html=True)
    
    elif not st.session_state.activity1_completed:
        st.info("🔒 Complete Activity 1 to unlock this activity!")
    
    st.divider()
    
    # Activity 3: AI Training Game - COMPLETELY FIXED
    st.subheader("🧠 Activity 3: Train Your AI")
    
    if st.session_state.activity2_completed and not st.session_state.activity3_completed:
        st.write("🎉 **Unlocked!** Help train an AI to recognize patterns!")
        
        # Initialize pattern game
        if 'pattern_game' not in st.session_state:
            st.session_state.pattern_game = {
                'patterns': [
                    {'sequence': ['🔴', '🔵', '🔴', '🔵'], 'next': '🔴', 'name': 'Red-Blue Pattern'},
                    {'sequence': ['⭐', '⭐', '🌙', '⭐', '⭐'], 'next': '🌙', 'name': 'Star-Moon Pattern'},
                    {'sequence': ['🍎', '🍌', '🍎', '🍌'], 'next': '🍎', 'name': 'Apple-Banana Pattern'}
                ],
                'current_pattern': 0,
                'correct_answers': 0,
                'total_attempts': 0
            }
        
        game = st.session_state.pattern_game
        current = game['patterns'][game['current_pattern']]
        
        st.write(f"**Pattern {game['current_pattern'] + 1}/3: {current['name']}**")
        st.write("**Look at this pattern and guess what comes next:**")
        
        # Display pattern with larger emojis
        pattern_display = " → ".join(current['sequence']) + " → ❓"
        st.markdown(f"<h2 style='text-align: center;'>{pattern_display}</h2>", unsafe_allow_html=True)
        
        st.write(f"**Progress: {game['correct_answers']}/3 patterns solved**")
        
        options = ['🔴', '🔵', '⭐', '🌙', '🍎', '🍌']
        
        cols = st.columns(len(options))
        for i, option in enumerate(options):
            with cols[i]:
                if st.button(option, key=f"pattern_btn_{game['current_pattern']}_{game['total_attempts']}_{i}", 
                           help=f"Click {option}"):
                    game['total_attempts'] += 1
                    
                    if option == current['next']:
                        st.success(f"🎉 Correct! The answer was {current['next']}")
                        game['correct_answers'] += 1
                        
                        if game['correct_answers'] >= 3:
                            st.success("🌟 **Activity 3 Complete!** You're an AI trainer!")
                            st.session_state.activity3_completed = True
                            st.balloons()
                            time.sleep(2)
                            st.rerun()
                        else:
                            # Move to next pattern
                            game['current_pattern'] += 1
                            st.info(f"Great! Moving to pattern {game['current_pattern'] + 1}...")
                            time.sleep(1)
                            st.rerun()
                    else:
                        st.error(f"❌ Not quite! The answer was {current['next']}")
                        st.info("Let's try the next pattern!")
                        
                        # Move to next pattern
                        game['current_pattern'] += 1
                        if game['current_pattern'] >= len(game['patterns']):
                            game['current_pattern'] = 0  # Loop back
                        
                        time.sleep(2)
                        st.rerun()
    
    elif st.session_state.activity3_completed:
        st.success("✅ **Activity 3 Completed!** You trained the AI successfully!")
    
    elif not st.session_state.activity2_completed:
        st.info("🔒 Complete Activity 2 to unlock this activity!")
    
    st.divider()
    
    # Activity 4: AI Quiz - COMPLETELY FIXED
    st.subheader("🧩 Activity 4: AI Knowledge Quiz")
    
    if st.session_state.activity3_completed and not st.session_state.activity4_completed:
        st.write("🎉 **Unlocked!** Test your AI knowledge!")
        
        questions = [
            {
                "question": "What does AI stand for?",
                "options": ["Artificial Intelligence", "Amazing Ideas", "Automatic Internet"],
                "correct": 0,
                "explanation": "AI stands for Artificial Intelligence - computer systems that can think and learn!"
            },
            {
                "question": "Which of these uses AI?",
                "options": ["Voice assistants like Siri", "Regular calculators", "Paper books"],
                "correct": 0,
                "explanation": "Voice assistants use AI to understand speech and provide helpful responses!"
            },
            {
                "question": "How do we teach AI?",
                "options": ["By giving it examples", "By magic", "By shouting at it"],
                "correct": 0,
                "explanation": "We teach AI by showing it lots of examples so it can learn patterns!"
            }
        ]
        
        # Initialize quiz state
        if 'quiz_game' not in st.session_state:
            st.session_state.quiz_game = {
                'current_question': 0,
                'score': 0,
                'answered_current': False,
                'show_explanation': False
            }
        
        quiz = st.session_state.quiz_game
        
        if quiz['current_question'] < len(questions):
            q = questions[quiz['current_question']]
            
            st.write(f"**Question {quiz['current_question'] + 1} of {len(questions)}**")
            st.write(f"**Current Score: {quiz['score']}/{quiz['current_question']}**")
            
            st.markdown(f"### {q['question']}")
            
            # Show options as buttons
            if not quiz['answered_current']:
                for i, option in enumerate(q['options']):
                    if st.button(f"**{chr(65+i)}.** {option}", 
                               key=f"quiz_q{quiz['current_question']}_opt{i}",
                               type="primary" if i == 0 else "secondary"):
                        quiz['answered_current'] = True
                        quiz['show_explanation'] = True
                        
                        if i == q['correct']:
                            st.success("✅ Correct! Great job!")
                            quiz['score'] += 1
                        else:
                            st.error(f"❌ The correct answer is: **{q['options'][q['correct']]}**")
                        
                        st.info(f"💡 **Explanation:** {q['explanation']}")
                        st.rerun()
            
            # Show next button after answering
            if quiz['answered_current']:
                if quiz['current_question'] < len(questions) - 1:
                    if st.button("➡️ Next Question", type="primary"):
                        quiz['current_question'] += 1
                        quiz['answered_current'] = False
                        quiz['show_explanation'] = False
                        st.rerun()
                else:
                    if st.button("🏁 Finish Quiz", type="primary"):
                        st.session_state.activity4_completed = True
                        st.rerun()
        
        # Show final results
        if st.session_state.activity4_completed:
            final_score = quiz['score']
            st.success(f"🎉 **Quiz Complete!** Final Score: {final_score}/{len(questions)}")
            
            if final_score == len(questions):
                st.balloons()
                st.write("🌟 **Perfect score!** You're an AI expert!")
            elif final_score >= len(questions) // 2:
                st.write("👍 **Good job!** You know a lot about AI!")
            else:
                st.write("📚 **Keep learning!** AI is fascinating!")
    
    elif st.session_state.activity4_completed:
        st.success("✅ **Activity 4 Completed!** You aced the AI quiz!")
    
    elif not st.session_state.activity3_completed:
        st.info("🔒 Complete Activity 3 to unlock this activity!")
    
    st.divider()
    
    # Activity 5: AI Art Creator - COMPLETELY FIXED
    st.subheader("🎨 Activity 5: AI Art Creator")
    
    if st.session_state.activity4_completed and not st.session_state.activity5_completed:
        st.write("🎉 **Unlocked!** Create amazing art with AI!")
        
        # Initialize art creator
        if 'art_creator' not in st.session_state:
            st.session_state.art_creator = {
                'creations': [],
                'current_creation': None
            }
        
        col1, col2 = st.columns(2)
        
        with col1:
            art_style = st.selectbox("🎨 Choose art style:", 
                                   ["Cartoon", "Realistic", "Abstract", "Pixel Art", "Watercolor", "Digital"], 
                                   key="art_style_select")
            
            art_subject = st.text_input("🖼️ What should the AI draw?", 
                                      value="a friendly robot", 
                                      key="art_subject_input")
            
            art_mood = st.selectbox("😊 Choose the mood:", 
                                  ["Happy", "Mysterious", "Energetic", "Peaceful", "Adventurous"], 
                                  key="art_mood_select")
        
        with col2:
            art_colors = st.multiselect("🌈 Choose colors:", 
                                      ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Cyan"], 
                                      default=["Blue", "Green"],
                                      key="art_colors_select")
            
            art_size = st.radio("📏 Canvas size:", 
                              ["Small", "Medium", "Large"], 
                              index=1,
                              key="art_size_select")
            
            add_sparkles = st.checkbox("✨ Add magical sparkles", key="sparkles_check")
        
        if st.button("🎨 Generate AI Art!", type="primary", key="generate_art_btn"):
            # Simulate AI art generation with progress
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            steps = [
                "🧠 AI is analyzing your request...",
                "🎨 Choosing the perfect colors...",
                "✏️ Sketching the basic shapes...",
                "🖌️ Adding artistic details...",
                "✨ Applying final touches..."
            ]
            
            for i, step in enumerate(steps):
                status_text.text(step)
                progress_bar.progress((i + 1) / len(steps))
                time.sleep(0.8)
            
            status_text.empty()
            progress_bar.empty()
            
            # Create art representation
            color_map = {
                "Red": "🔴", "Blue": "🔵", "Green": "🟢", "Yellow": "🟡", 
                "Purple": "🟣", "Orange": "🟠", "Pink": "🩷", "Cyan": "🩵"
            }
            
            art_colors_emoji = [color_map.get(c, "⚪") for c in art_colors]
            sparkles = "✨" * 3 if add_sparkles else ""
            
            # Size-based styling
            size_styles = {
                "Small": "width: 200px; height: 150px;",
                "Medium": "width: 300px; height: 200px;",
                "Large": "width: 400px; height: 250px;"
            }
            
            art_creation = {
                'style': art_style,
                'subject': art_subject,
                'mood': art_mood,
                'colors': art_colors,
                'size': art_size,
                'sparkles': add_sparkles,
                'timestamp': datetime.now().strftime("%H:%M:%S")
            }
            
            st.session_state.art_creator['creations'].append(art_creation)
            st.session_state.art_creator['current_creation'] = art_creation
            
            st.success("🎉 **AI Art Created Successfully!**")
            
            # Display the "artwork"
            st.markdown(f"""
            <div style="border: 4px solid #FFD700; padding: 30px; text-align: center; 
                       background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                       border-radius: 15px; margin: 20px 0; {size_styles[art_size]}
                       box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
                <h3 style="color: #333; margin-bottom: 15px;">🎨 {art_style} Style</h3>
                <div style="font-size: 2em; margin: 20px 0;">
                    {sparkles} {"".join(art_colors_emoji)} {sparkles}
                </div>
                <h2 style="color: #555; margin: 15px 0;">{art_subject}</h2>
                <div style="font-size: 1.5em; margin: 15px 0;">
                    {sparkles} {"".join(art_colors_emoji)} {sparkles}
                </div>
                <p style="color: #666; font-style: italic;">
                    <strong>Mood:</strong> {art_mood} | <strong>Size:</strong> {art_size}
                </p>
                <p style="color: #888; font-size: 0.9em;">
                    Created at {art_creation['timestamp']} by AI Art Generator
                </p>
            </div>
            """, unsafe_allow_html=True)
            
            # Complete activity after creating art
            if not st.session_state.activity5_completed:
                st.session_state.activity5_completed = True
                st.balloons()
                st.success("🌟 **Activity 5 Complete!** You're an AI artist!")
    
    elif st.session_state.activity5_completed:
        st.success("✅ **Activity 5 Completed!** You're an amazing AI artist!")
        
        # Show art gallery
        if 'art_creator' in st.session_state and st.session_state.art_creator['creations']:
            st.write("🖼️ **Your AI Art Gallery:**")
            
            for creation in st.session_state.art_creator['creations'][-2:]:
                color_map = {
                    "Red": "🔴", "Blue": "🔵", "Green": "🟢", "Yellow": "🟡", 
                    "Purple": "🟣", "Orange": "🟠", "Pink": "🩷", "Cyan": "🩵"
                }
                art_colors_emoji = [color_map.get(c, "⚪") for c in creation['colors']]
                sparkles = "✨" if creation['sparkles'] else ""
                
                st.markdown(f"""
                <div style="border: 2px solid #FFD700; padding: 20px; text-align: center; 
                           background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                           border-radius: 10px; margin: 10px 0;">
                    <h4>🎨 {creation['style']} - {creation['subject']}</h4>
                    <div>{sparkles} {"".join(art_colors_emoji)} {sparkles}</div>
                    <small>Created at {creation['timestamp']}</small>
                </div>
                """, unsafe_allow_html=True)
    
    elif not st.session_state.activity4_completed:
        st.info("🔒 Complete Activity 4 to unlock this activity!")
    
    st.divider()
    
    # Final Completion Certificate
    if all([st.session_state.activity1_completed, st.session_state.activity2_completed, 
            st.session_state.activity3_completed, st.session_state.activity4_completed, 
            st.session_state.activity5_completed]):
        
        st.subheader("🏆 Congratulations! Adventure Complete!")
        
        # Calculate total score
        detective_score = st.session_state.detective_game['score'] if 'detective_game' in st.session_state else 0
        quiz_score = st.session_state.quiz_game['score'] if 'quiz_game' in st.session_state else 0
        art_creations = len(st.session_state.art_creator['creations']) if 'art_creator' in st.session_state else 0
        
        st.markdown(f"""
        <div style="border: 5px solid gold; padding: 30px; text-align: center; 
                   background: linear-gradient(135deg, #fff9c4 0%, #fff3a0 100%);
                   border-radius: 20px; margin: 20px 0;
                   box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
            <h1>🏆 AI Explorer Certificate 🏆</h1>
            <h2 style="color: #d4af37;">CONGRATULATIONS!</h2>
            <p style="font-size: 1.2em;">This certifies that you have successfully completed</p>
            <h2 style="color: #d4af37;">The Complete Interactive AI Adventure!</h2>
            
            <div style="margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.7); border-radius: 10px;">
                <h3>🎯 Your Achievements:</h3>
                <p>🕵️ AI Detective Score: {detective_score}/3</p>
                <p>🧩 Quiz Score: {quiz_score}/3</p>
                <p>🎨 Art Creations: {art_creations}</p>
                <p>🧠 Patterns Trained: 3/3</p>
                <p>🤖 AI Friends Created: 1</p>
            </div>
            
            <h3 style="color: #d4af37;">You are now an official AI Explorer! 🚀</h3>
            <p style="font-style: italic;">Completed on {datetime.now().strftime("%B %d, %Y at %H:%M")}</p>
        </div>
        """, unsafe_allow_html=True)
        
        col1, col2 = st.columns(2)
        with col1:
            if st.button("🔄 Start New Adventure", type="primary"):
                # Reset all progress
                for key in list(st.session_state.keys()):
                    del st.session_state[key]
                st.rerun()
        
        with col2:
            if st.button("📥 Download Certificate", type="secondary"):
                certificate_text = f"""
AI EXPLORER CERTIFICATE

Congratulations! You have successfully completed
The Complete Interactive AI Adventure!

Achievements:
- AI Detective Score: {detective_score}/3
- Quiz Score: {quiz_score}/3  
- Art Creations: {art_creations}
- Patterns Trained: 3/3
- AI Friends Created: 1

You are now an official AI Explorer!
Completed on {datetime.now().strftime("%B %d, %Y at %H:%M")}
                """
                
                st.download_button(
                    label="📄 Download as Text",
                    data=certificate_text,
                    file_name=f"AI_Explorer_Certificate_{datetime.now().strftime('%Y%m%d_%H%M')}.txt",
                    mime="text/plain"
                )

def main():
    """Main interactive lesson app"""
    st.set_page_config(
        page_title="Interactive AI Kids Learning",
        page_icon="🚀",
        layout="wide"
    )
    
    st.sidebar.title("🎮 Interactive Lessons")
    
    lesson_type = st.sidebar.selectbox("Choose Your Adventure:", [
        "🤖 AI Basics (Interactive)",
        "🐍 Python Programming (Interactive)",
        "🎨 Creative Coding (Coming Soon)",
        "🧮 Math Games (Coming Soon)"
    ])
    
    # Debug info in sidebar
    if 'lesson_progress' in st.session_state:
        st.sidebar.write("**🎯 Progress Tracker:**")
        activities = [
            ("🎮 AI Detective", 'activity1_completed'),
            ("🎨 AI Friend Designer", 'activity2_completed'),
            ("🧠 AI Trainer", 'activity3_completed'),
            ("🧩 AI Quiz Master", 'activity4_completed'),
            ("🎨 AI Artist", 'activity5_completed')
        ]
        
        for name, key in activities:
            status = "✅" if st.session_state.get(key, False) else "⏳"
            st.sidebar.write(f"{status} {name}")
    
    if st.sidebar.button("🔄 Reset All Progress"):
        for key in list(st.session_state.keys()):
            del st.session_state[key]
        st.rerun()
    
    if lesson_type == "🤖 AI Basics (Interactive)":
        create_interactive_ai_lesson()
    else:
        st.info("This interactive lesson is coming soon! Try the AI Basics lesson for now.")
        create_interactive_ai_lesson()

if __name__ == "__main__":
    main()
