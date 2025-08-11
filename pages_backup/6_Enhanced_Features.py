import streamlit as st
from components.code_playground.code_snippet_playground import display_code_snippet_playground
from components.adaptive_learning.difficulty_selector import display_difficulty_selector
from components.adaptive_learning.personalized_learning_path import display_personalized_learning_path
from components.feature_cards.ai_personality_creator import display_ai_personality_creator, display_ai_project_builder
from components.feature_cards.learning_insights import display_learning_insights
from components.interactive_games.advanced_simulation_games import display_advanced_simulation_games
from components.robot_guide import display_robot_guide
from components.achievements import display_achievements
import os

# Configure page
st.set_page_config(
    page_title="Enhanced Features | KidAI Academy",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

def main():
    # Header
    st.title("🌟 Enhanced Features")
    
    # Display robot guide
    display_robot_guide("Welcome to our enhanced features section! Here you can explore our newest and most advanced AI learning tools.")
    
    # Use the images from the attachments
    col1, col2 = st.columns(2)
    
    with col1:
        if os.path.exists("assets/images/new/Screenshot 2025-03-28 at 22.02.33.png"):
            st.image("assets/images/new/Screenshot 2025-03-28 at 22.02.33.png", use_column_width=True)
    
    with col2:
        if os.path.exists("assets/images/new/Screenshot 2025-03-28 at 22.02.41.png"):
            st.image("assets/images/new/Screenshot 2025-03-28 at 22.02.41.png", use_column_width=True)
    
    # Feature selection
    st.markdown("""
    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 10px; margin: 15px 0 30px 0;">
        <h2 style="margin-top: 0;">Select an Enhanced Feature to Explore</h2>
        <p>These advanced tools provide personalized learning experiences and deeper engagement with AI concepts.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Create feature selection tabs
    tabs = st.tabs([
        "🎮 Code Snippet Playground", 
        "🔄 Difficulty Selector", 
        "🏆 Achievement System",
        "🤖 AI Personality Creator",
        "🛠️ AI Project Builder",
        "🧩 Learning Paths",
        "📊 Parent Dashboard",
        "🎯 Simulation Games"
    ])
    
    with tabs[0]:
        st.markdown("### Code Snippet Playground with Real-time Preview")
        st.markdown("""
        This interactive playground allows kids to experiment with real code snippets and see the results immediately.
        Children can learn the basics of programming in a safe, guided environment with instant visual feedback.
        """)
        display_code_snippet_playground()
    
    with tabs[1]:
        st.markdown("### Difficulty Level Selector with Adaptive Learning")
        st.markdown("""
        Our adaptive learning system adjusts content difficulty based on the child's age, skill level, and learning pace.
        This ensures that each child receives appropriately challenging content that grows with them.
        """)
        display_difficulty_selector()
    
    with tabs[2]:
        st.markdown("### Gamified Achievement System with Cute Badges")
        st.markdown("""
        Our gamified achievement system makes learning fun by rewarding progress with colorful badges and celebrations.
        Children can track their accomplishments and stay motivated throughout their AI learning journey.
        """)
        display_achievements()
    
    with tabs[3]:
        st.markdown("### Interactive AI Personality Creator for Kids")
        st.markdown("""
        Children can create their own AI assistant with unique personality traits, skills, and appearance.
        This creative tool helps kids understand AI customization while building a learning companion.
        """)
        display_ai_personality_creator()
    
    with tabs[4]:
        st.markdown("### Interactive AI Project Builder for Kids")
        st.markdown("""
        Kids can build their own simple AI projects using kid-friendly templates and guided instructions.
        This hands-on approach helps children understand how AI models work by creating their own.
        """)
        display_ai_project_builder()
    
    with tabs[5]:
        st.markdown("### Personalized Learning Paths Based on Child's Progress")
        st.markdown("""
        Our personalized learning path system adapts to each child's interests, strengths, and learning style.
        Children receive custom recommendations that keep them engaged and help them grow in areas that need attention.
        """)
        display_personalized_learning_path()
    
    with tabs[6]:
        st.markdown("### Parent Dashboard with Learning Progress Insights")
        st.markdown("""
        Parents and educators can track their child's learning journey with detailed analytics and insights.
        This dashboard shows progress, strengths, areas for growth, and recommendations for supporting learning.
        """)
        display_learning_insights()
    
    with tabs[7]:
        st.markdown("### Advanced AI Simulation Games for Different Age Groups")
        st.markdown("""
        Our advanced simulation games teach complex AI concepts through age-appropriate interactive activities.
        Children can experiment with neural networks, genetic algorithms, computer vision, and more in a playful environment.
        """)
        display_advanced_simulation_games()
    
    # Bottom navigation
    st.markdown("---")
    st.markdown("### Continue Learning")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.page_link("pages/1_Learn_AI_Basics.py", label="🧠 Learn AI Basics", icon="book")
    
    with col2:
        st.page_link("pages/2_Fun_Coding_Games.py", label="🎮 Fun Coding Games", icon="joystick")
    
    with col3:
        st.page_link("pages/3_AI_Adventures.py", label="🚀 AI Adventures", icon="rocket")

if __name__ == "__main__":
    main()