import streamlit as st
from components.robot_guide import display_robot_guide
from utils.helpers import initialize_session_state
import pandas as pd

# Configure page
st.set_page_config(
    page_title="KidAI Academy",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
initialize_session_state()

# Main page 
def main():
    # Header with robot mascot
    col1, col2 = st.columns([1, 3])
    
    with col1:
        st.markdown("""
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="30" r="20" fill="#4287f5" />
                <rect x="30" y="50" width="40" height="40" fill="#4287f5" rx="5" />
                <circle cx="40" cy="25" r="5" fill="white" />
                <circle cx="60" cy="25" r="5" fill="white" />
                <circle cx="40" cy="25" r="2" fill="black" />
                <circle cx="60" cy="25" r="2" fill="black" />
                <path d="M 40 40 Q 50 50 60 40" stroke="white" stroke-width="2" fill="none" />
                <rect x="20" y="60" width="10" height="25" fill="#4287f5" rx="5" />
                <rect x="70" y="60" width="10" height="25" fill="#4287f5" rx="5" />
                <circle cx="25" cy="85" r="5" fill="#333" />
                <circle cx="75" cy="85" r="5" fill="#333" />
                <rect x="40" y="90" width="20" height="5" fill="#4287f5" />
            </svg>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.title("Welcome to KidAI Academy!")
        st.markdown("""
        Discover the amazing world of Artificial Intelligence through fun games and adventures!
        
        👋 Hello, future AI experts! I'm Byte, your robot guide to the world of AI.
        """)
    
    # Display robot guide welcome message
    display_robot_guide("Welcome to KidAI Academy! Let's learn about AI together!")
    
    # Main content
    st.markdown("## Start Your AI Adventure!")
    
    # Feature boxes
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("### 🧠 Learn AI Basics")
        st.markdown("Discover what AI is and how it works through fun, interactive lessons.")
        st.button("Start Learning", key="learn_basics", on_click=lambda: st.switch_page("pages/1_Learn_AI_Basics.py"))
    
    with col2:
        st.markdown("### 🎮 Fun Coding Games")
        st.markdown("Play games that teach you how to code and create your own AI!")
        st.button("Play Games", key="coding_games", on_click=lambda: st.switch_page("pages/2_Fun_Coding_Games.py"))
    
    with col3:
        st.markdown("### 🚀 AI Adventures")
        st.markdown("Join Byte on exciting adventures to solve problems using AI.")
        st.button("Start Adventure", key="ai_adventures", on_click=lambda: st.switch_page("pages/3_AI_Adventures.py"))
    
    # Featured content
    st.markdown("## What You'll Learn")
    
    tab1, tab2, tab3, tab4 = st.tabs(["AI Algorithms", "Machine Learning", "AI Safety", "Deep Learning"])
    
    with tab1:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### What are AI Algorithms?
            
            An algorithm is a set of rules or instructions that a computer follows to solve a problem.
            
            In AI, algorithms help computers make decisions and learn from information!
            """)
        with col2:
            st.image("https://via.placeholder.com/400x200.png?text=AI+Algorithms", use_column_width=True)
    
    with tab2:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### Machine Learning
            
            Machine Learning is how computers learn from examples instead of being explicitly programmed.
            
            It's like how you learn to recognize cats after seeing many pictures of cats!
            """)
        with col2:
            st.image("https://via.placeholder.com/400x200.png?text=Machine+Learning", use_column_width=True)
    
    with tab3:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### AI Safety
            
            Learn why it's important to create AI that is helpful, harmless, and honest.
            
            Discover the rules that help keep AI safe for everyone!
            """)
        with col2:
            st.image("https://via.placeholder.com/400x200.png?text=AI+Safety", use_column_width=True)
    
    with tab4:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### Deep Learning
            
            Deep Learning uses special computer networks that work a bit like the human brain!
            
            These networks can recognize patterns in images, sounds, and text.
            """)
        with col2:
            st.image("https://via.placeholder.com/400x200.png?text=Deep+Learning", use_column_width=True)
    
    # Featured books
    st.markdown("## AI Books for Kids")
    
    book_col1, book_col2, book_col3, book_col4 = st.columns(4)
    
    with book_col1:
        st.markdown("### Introduction to AI")
        st.image("https://via.placeholder.com/150x200.png?text=AI+Book", use_column_width=True)
        st.markdown("A fun introduction to AI concepts for beginners.")
    
    with book_col2:
        st.markdown("### Brainy Bots")
        st.image("https://via.placeholder.com/150x200.png?text=Brainy+Bots", use_column_width=True)
        st.markdown("20+ AI algorithm adventures for curious minds.")
    
    with book_col3:
        st.markdown("### Fantastic Futures")
        st.image("https://via.placeholder.com/150x200.png?text=Fantastic+Futures", use_column_width=True)
        st.markdown("The adventures of AI in our changing world.")
    
    with book_col4:
        st.markdown("### Building AI")
        st.image("https://via.placeholder.com/150x200.png?text=Building+AI", use_column_width=True)
        st.markdown("A block-by-block adventure in coding.")
    
    # Footer
    st.markdown("---")
    st.markdown("© 2025 KidAI Academy | Made with ❤️ for young learners")

# Sidebar
with st.sidebar:
    st.image("https://via.placeholder.com/150x150.png?text=KidAI+Logo", use_column_width=True)
    
    if "user_name" not in st.session_state or not st.session_state["user_name"]:
        st.markdown("### Welcome, Explorer!")
        with st.form("name_form"):
            name = st.text_input("What's your name?")
            submit = st.form_submit_button("Let's Go!")
            if submit and name:
                st.session_state["user_name"] = name
                st.rerun()
    else:
        st.markdown(f"### Hi, {st.session_state['user_name']}! 👋")
        
        # Display user level and progress
        st.progress(st.session_state.get("progress", 0), "Learning Progress")
        
        st.markdown(f"**Level:** {st.session_state.get('level', 'Beginner')}")
        st.markdown(f"**Badges:** {st.session_state.get('badges_count', 0)}/10")
        
        # Navigation
        st.markdown("## Navigate")
        st.page_link("app.py", label="🏠 Home", icon="house")
        st.page_link("pages/1_Learn_AI_Basics.py", label="🧠 Learn AI Basics", icon="book")
        st.page_link("pages/2_Fun_Coding_Games.py", label="🎮 Coding Games", icon="joystick")
        st.page_link("pages/3_AI_Adventures.py", label="🚀 AI Adventures", icon="rocket")
        
        # For parents and teachers
        st.markdown("---")
        st.page_link("pages/4_Parent_Dashboard.py", label="👨‍👩‍👧‍👦 Parent Dashboard", icon="people")
        
        # Reset option (for testing)
        if st.button("Reset Progress"):
            for key in list(st.session_state.keys()):
                if key != "user_name":
                    if key in st.session_state:
                        del st.session_state[key]
            st.session_state["progress"] = 0
            st.session_state["level"] = "Beginner"
            st.session_state["badges_count"] = 0
            st.rerun()

if __name__ == "__main__":
    main()
