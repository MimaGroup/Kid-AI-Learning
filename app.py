import streamlit as st
import sys
import os

# Add pages to path
sys.path.append('pages')

# Page configuration
st.set_page_config(
    page_title="🤖 AI Kids Learning",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

def main():
    # Initialize session state
    if 'user_progress' not in st.session_state:
        st.session_state.user_progress = 0
    if 'completed_lessons' not in st.session_state:
        st.session_state.completed_lessons = []

    # Sidebar
    st.sidebar.title("🤖 AI Kids Learning")
    st.sidebar.write("Learn AI and coding in a fun way!")
    
    st.sidebar.markdown("---")
    st.sidebar.subheader("📚 Navigate")
    
    # Navigation
    page = st.sidebar.selectbox(
        "Choose a section:",
        [
            "🧠 Learn AI Basics",
            "🎮 Fun Coding Games", 
            "🤖 AI Playground"
        ]
    )
    
    # Progress tracking
    st.sidebar.markdown("---")
    st.sidebar.subheader("🏆 Your Progress")
    
    ai_basics_progress = st.session_state.get('ai_basics_progress', 0)
    coding_games_progress = st.session_state.get('coding_games_progress', 0)
    
    if ai_basics_progress > 0:
        st.sidebar.metric("🧠 AI Basics", f"{ai_basics_progress}%")
        st.sidebar.progress(ai_basics_progress / 100)
    
    if coding_games_progress > 0:
        st.sidebar.metric("🎮 Coding Games", f"{coding_games_progress}%")
        st.sidebar.progress(coding_games_progress / 100)
    
    # Main content
    if page == "🧠 Learn AI Basics":
        show_learn_ai_basics_page()
    elif page == "🎮 Fun Coding Games":
        show_fun_coding_games_page()
    elif page == "🤖 AI Playground":
        show_ai_playground_page()

def show_learn_ai_basics_page():
    try:
        from learn_ai_basics import show_learn_ai_basics
        show_learn_ai_basics()
    except Exception as e:
        st.error(f"Error loading Learn AI Basics: {e}")
        show_fallback_ai_basics()

def show_fallback_ai_basics():
    st.header("🧠 Learn AI Basics")
    
    if 'ai_basics_progress' not in st.session_state:
        st.session_state.ai_basics_progress = 0
    
    tab1, tab2, tab3 = st.tabs(["🤖 What is AI?", "🧠 How AI Works", "🎯 Quiz"])
    
    with tab1:
        st.subheader("What is AI?")
        st.write("""
        🤖 **Artificial Intelligence (AI)** is like teaching computers to think!
        
        **Examples you know:**
        - 🗣️ Siri and Alexa
        - 📱 Face unlock on phones
        - 🎮 Smart game characters
        """)
        
        if st.button("✅ I understand!", key="understand_ai"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 33)
            st.success("Great! 🎉")
    
    with tab2:
        st.subheader("How AI Works")
        st.write("🎯 AI learns by looking at lots of examples!")
        
        if st.button("✅ Makes sense!", key="understand_learning"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 66)
            st.success("Awesome! 🌟")
    
    with tab3:
        st.subheader("🎯 Quick Quiz")
        answer = st.radio("How does AI learn?", ["Many examples", "One book", "Guessing"])
        
        if st.button("Submit", key="submit_quiz"):
            if answer == "Many examples":
                st.success("🎉 Correct!")
                st.session_state.ai_basics_progress = 100
                st.balloons()
            else:
                st.error("Try again!")

def show_fun_coding_games_page():
    try:
        from fun_coding_games_new import show_fun_coding_games
        show_fun_coding_games()
    except Exception as e:
        st.error(f"Error loading Fun Coding Games: {e}")
        show_fallback_coding_games()

def show_fallback_coding_games():
    st.header("🎮 Fun Coding Games")
    
    if 'coding_games_progress' not in st.session_state:
        st.session_state.coding_games_progress = 0
    
    tab1, tab2 = st.tabs(["🧩 Logic Puzzle", "🏆 Achievements"])
    
    with tab1:
        st.subheader("🧩 Robot Logic Puzzle")
        st.write("Help the robot find treasure!")
        
        st.code("""
Robot moves:
1. Forward
2. Turn Right
3. Forward
        """)
        
        direction = st.selectbox("Which way is robot facing?", ["North", "South", "East", "West"])
        
        if st.button("Check Answer", key="robot_answer"):
            if direction == "East":
                st.success("🎉 Correct!")
                st.session_state.coding_games_progress = 100
                st.balloons()
            else:
                st.error("Try again!")
    
    with tab2:
        st.subheader("🏆 Achievements")
        if st.session_state.coding_games_progress >= 100:
            st.success("✅ Logic Master!")
        else:
            st.info("🔒 Complete puzzle to unlock!")

def show_ai_playground_page():
    try:
        from ai_playground_new import show_ai_playground
        show_ai_playground()
    except Exception as e:
        st.error(f"Error loading AI Playground: {e}")
        st.info("🚧 AI Playground coming soon!")

if __name__ == "__main__":
    main()
