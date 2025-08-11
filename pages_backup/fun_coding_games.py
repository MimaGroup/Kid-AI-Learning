import streamlit as st
import random

def show_fun_coding_games():
    st.header("🎮 Fun Coding Games")
    
    # Progress tracking
    if 'coding_games_progress' not in st.session_state:
        st.session_state.coding_games_progress = 0
    
    game_tabs = st.tabs([
        "🧩 Code Puzzle", 
        "🎯 Sequence Game", 
        "🤖 AI Commands", 
        "🏆 Achievements"
    ])
    
    with game_tabs[0]:
        st.subheader("🧩 Code Logic Puzzle")
        st.write("Help the robot reach the treasure!")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**Robot's Path:**")
            st.code("""
            1. Move Forward
            2. Turn Right
            3. Move Forward
            4. Turn Left
            5. Move Forward
            """)
        
        with col2:
            st.write("**Your Mission:**")
            st.info("What direction is the robot facing at the end?")
            
            answer = st.selectbox("Robot is facing:", ["North", "South", "East", "West"])
            
            if st.button("Check Answer", key="puzzle1"):
                if answer == "North":
                    st.success("🎉 Correct! Great logical thinking!")
                    st.session_state.coding_games_progress = max(st.session_state.coding_games_progress, 25)
                else:
                    st.error("Try again! Follow the robot's path step by step.")
    
    with game_tabs[1]:
        st.subheader("🎯 Pattern Sequence Game")
        
        if 'sequence' not in st.session_state:
            st.session_state.sequence = [random.choice(['🔴', '🟡', '🔵']) for _ in range(4)]
        
        st.write("**Remember this pattern:**")
        st.write(" ".join(st.session_state.sequence))
        
        st.write("**Now recreate it:**")
        user_sequence = []
        
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            if st.button("🔴", key="red1"):
                user_sequence.append('🔴')
        with col2:
            if st.button("🟡", key="yellow1"):
                user_sequence.append('🟡')
        with col3:
            if st.button("🔵", key="blue1"):
                user_sequence.append('🔵')
        with col4:
            if st.button("🔄 Reset", key="reset1"):
                st.session_state.sequence = [random.choice(['🔴', '🟡', '🔵']) for _ in range(4)]
        
        if len(user_sequence) == 4:
            if user_sequence == st.session_state.sequence:
                st.success("🎉 Perfect memory! You got the sequence right!")
                st.session_state.coding_games_progress = max(st.session_state.coding_games_progress, 50)
    
    with game_tabs[2]:
        st.subheader("🤖 AI Command Center")
        st.write("Program the AI to solve problems!")
        
        problem = st.selectbox("Choose a problem:", [
            "Sort numbers: [3, 1, 4, 2]",
            "Find the biggest: [7, 2, 9, 5]",
            "Count vowels in: ARTIFICIAL"
        ])
        
        solution = st.text_area("Write your solution steps:")
        
        if st.button("Run AI Program"):
            if solution:
                st.success("🤖 AI Program executed! Great problem-solving!")
                st.session_state.coding_games_progress = max(st.session_state.coding_games_progress, 75)
            else:
                st.warning("Write some solution steps first!")
    
    with game_tabs[3]:
        st.subheader("🏆 Your Achievements")
        
        achievements = [
            ("🧩 Logic Master", st.session_state.coding_games_progress >= 25),
            ("🎯 Pattern Pro", st.session_state.coding_games_progress >= 50),
            ("🤖 AI Programmer", st.session_state.coding_games_progress >= 75),
            ("🌟 Coding Champion", st.session_state.coding_games_progress >= 100)
        ]
        
        for achievement, unlocked in achievements:
            if unlocked:
                st.success(f"✅ {achievement}")
            else:
                st.info(f"🔒 {achievement}")
    
    # Show progress in sidebar
    st.sidebar.metric("🎮 Coding Games Progress", f"{st.session_state.coding_games_progress}%")
    st.sidebar.progress(st.session_state.coding_games_progress / 100)
