import streamlit as st

# Page configuration
st.set_page_config(
    page_title="🤖 AI Kids Learning",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

def main():
    # Initialize session state
    if 'ai_basics_progress' not in st.session_state:
        st.session_state.ai_basics_progress = 0
    if 'coding_games_progress' not in st.session_state:
        st.session_state.coding_games_progress = 0

    # Sidebar
    st.sidebar.title("🤖 AI Kids Learning")
    st.sidebar.write("Learn AI and coding in a fun way!")
    
    st.sidebar.markdown("---")
    st.sidebar.subheader("📚 Navigate")
    
    # Clean navigation - no duplicates
    page = st.sidebar.radio(
        "Choose a section:",
        [
            "🏠 Home",
            "🧠 Learn AI Basics",
            "🎮 Fun Coding Games", 
            "🤖 AI Playground"
        ]
    )
    
    # Progress tracking
    st.sidebar.markdown("---")
    st.sidebar.subheader("🏆 Your Progress")
    
    total_lessons = 0
    completed_lessons = 0
    
    if st.session_state.ai_basics_progress >= 100:
        completed_lessons += 1
    if st.session_state.ai_basics_progress > 0:
        total_lessons += 1
        
    if st.session_state.coding_games_progress >= 100:
        completed_lessons += 1
    if st.session_state.coding_games_progress > 0:
        total_lessons += 1
    
    if total_lessons > 0:
        st.sidebar.write(f"Completed: {completed_lessons}/{total_lessons} sections")
    
    if st.session_state.ai_basics_progress > 0:
        st.sidebar.metric("🧠 AI Basics", f"{st.session_state.ai_basics_progress}%")
        st.sidebar.progress(st.session_state.ai_basics_progress / 100)
    
    if st.session_state.coding_games_progress > 0:
        st.sidebar.metric("🎮 Coding Games", f"{st.session_state.coding_games_progress}%")
        st.sidebar.progress(st.session_state.coding_games_progress / 100)
    
    # Main content
    if page == "🏠 Home":
        show_home_page()
    elif page == "🧠 Learn AI Basics":
        show_learn_ai_basics()
    elif page == "🎮 Fun Coding Games":
        show_fun_coding_games()
    elif page == "🤖 AI Playground":
        show_ai_playground()

def show_home_page():
    st.title("🤖 Welcome to AI Kids Learning!")
    st.write("### Learn AI and coding in a fun, interactive way! 🚀")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        ### 🧠 Learn AI Basics
        Discover what AI is and how it works through fun lessons and quizzes!
        """)
        if st.button("Start Learning AI", key="start_ai"):
            st.success("Navigate to 'Learn AI Basics' in the sidebar! 👈")
    
    with col2:
        st.markdown("""
        ### 🎮 Fun Coding Games
        Play interactive games while learning programming concepts!
        """)
        if st.button("Play Games", key="start_games"):
            st.success("Navigate to 'Fun Coding Games' in the sidebar! 👈")
    
    with col3:
        st.markdown("""
        ### 🤖 AI Playground
        Experiment with AI tools and create amazing projects!
        """)
        if st.button("Explore AI", key="start_playground"):
            st.success("Navigate to 'AI Playground' in the sidebar! 👈")

def show_learn_ai_basics():
    st.header("🧠 Learn AI Basics")
    st.write("Let's discover the amazing world of Artificial Intelligence!")
    
    # Lesson tabs
    tab1, tab2, tab3, tab4 = st.tabs([
        "🤖 What is AI?", 
        "🧠 How AI Learns", 
        "🌟 AI Examples", 
        "🎯 Quiz Time"
    ])
    
    with tab1:
        st.subheader("What is Artificial Intelligence?")
        st.write("""
        🤖 **AI (Artificial Intelligence)** is like teaching computers to think and solve problems like humans do!
        
        **Think of AI like:**
        - 🧠 A very smart computer brain
        - 🎓 A computer that can learn new things
        - 🤝 A helpful digital assistant
        
        **Cool fact:** AI can recognize your face, understand your voice, and even play games!
        """)
        
        if st.button("✅ I understand what AI is!", key="understand_ai"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 25)
            st.success("Great job! You've completed lesson 1! 🎉")
    
    with tab2:
        st.subheader("How Does AI Learn?")
        st.write("""
        🎯 AI learns by looking at lots of examples, just like you do!
        
        **Examples:**
        - 📸 To recognize cats, AI looks at thousands of cat photos
        - 🗣️ To understand speech, AI listens to many people talking
        - 🎮 To play games, AI practices millions of times
        - 🚗 Self-driving cars learn by watching human drivers
        
        **Just like you:** You learned to recognize dogs by seeing many different dogs!
        """)
        
        if st.button("✅ I understand how AI learns!", key="understand_learning"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 50)
            st.success("Awesome! You've completed lesson 2! 🌟")
    
    with tab3:
        st.subheader("AI Examples You Know")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**🏠 At Home:**")
            st.write("- 🗣️ Siri, Alexa (voice assistants)")
            st.write("- 📱 Face unlock on phones")
            st.write("- 🎵 Music recommendations on Spotify")
            st.write("- 📺 Netflix movie suggestions")
            
        with col2:
            st.write("**🎮 In Games & Apps:**")
            st.write("- 🤖 Smart game characters")
            st.write("- 🎯 Auto-aim helpers")
            st.write("- 🧩 Puzzle solvers")
            st.write("- 📷 Photo filters and effects")
        
        if st.button("✅ I can spot AI around me!", key="spot_ai"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 75)
            st.success("Excellent! You're becoming an AI expert! 🚀")
    
    with tab4:
        st.subheader("🎯 Quick AI Quiz")
        
        question = st.radio(
            "What is the best way for AI to learn?",
            ["Looking at many examples", "Reading one book", "Guessing randomly", "Asking humans"]
        )
        
        if st.button("Submit Answer", key="submit_quiz"):
            if question == "Looking at many examples":
                st.success("🎉 Correct! AI learns best from lots of examples!")
                st.session_state.ai_basics_progress = 100
                st.balloons()
                st.write("🏆 **Congratulations!** You've mastered AI Basics!")
            else:
                st.error("Try again! Think about how you learn to recognize things.")

def show_fun_coding_games():
    st.header("🎮 Fun Coding Games")
    st.write("Learn programming concepts through interactive games!")
    
    game_tabs = st.tabs([
        "🧩 Logic Puzzle", 
        "🎯 Pattern Game", 
        "🤖 Code Commands", 
        "🏆 Achievements"
    ])
    
    with game_tabs[0]:
        st.subheader("🧩 Robot Logic Puzzle")
        st.write("Help the robot navigate to the treasure! 🏴‍☠️")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**Robot's Journey:**")
            st.code("""
🤖 Robot starts facing NORTH
1. Move Forward (still facing North)
2. Turn Right (now facing East)
3. Move Forward (still facing East)
4. Turn Left (now facing North)
5. Move Forward (still facing North)
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
                    st.error("Try again! Follow the robot's path step by step. 🤔")
    
    with game_tabs[1]:
        st.subheader("🎯 Memory Pattern Challenge")
        st.write("Test your memory with this color sequence!")
        
        # Simple pattern game
        if 'pattern_shown' not in st.session_state:
            st.session_state.pattern_shown = False
        
        if not st.session_state.pattern_shown:
            if st.button("🎲 Show Pattern", key="show_pattern"):
                st.session_state.pattern_shown = True
        
        if st.session_state.pattern_shown:
            st.write("**Remember this pattern:**")
            st.write("🔴 🟡 🔵 🔴")
            
            st.write("**Now select the colors in order:**")
            
            user_pattern = st.text_input("Type the pattern using: Red, Yellow, Blue, Red", key="user_pattern")
            
            if st.button("Check Pattern", key="check_pattern"):
                if user_pattern.lower().replace(" ", "") == "redyellowbluered":
                    st.success("🎉 Perfect memory! You got the sequence right!")
                    st.session_state.coding_games_progress = max(st.session_state.coding_games_progress, 50)
                    st.balloons()
                else:
                    st.error("Try again! Look at the pattern carefully. 👀")
            
            if st.button("🔄 New Pattern", key="reset_pattern"):
                st.session_state.pattern_shown = False
    
    with game_tabs[2]:
        st.subheader("🤖 Code Command Center")
        st.write("Write simple commands to solve problems!")
        
        problem = st.selectbox("Choose a coding challenge:", [
            "Sort these numbers: [3, 1, 4, 2]",
            "Find the biggest number: [7, 2, 9, 5]",
            "Count letters in: CODING"
        ])
        
        st.write("**Write your solution in simple steps:**")
        solution = st.text_area("Your solution:", placeholder="Step 1: ...\nStep 2: ...\nStep 3: ...")
        
        if st.button("🚀 Run Program", key="run_program"):
            if solution and len(solution) > 10:
                st.success("🤖 Program executed successfully! Great problem-solving!")
                st.session_state.coding_games_progress = max(st.session_state.coding_games_progress, 75)
                
                # Show sample solutions
                if "sort" in problem.lower():
                    st.info("💡 Sample solution: Compare numbers and arrange from smallest to largest!")
                elif "biggest" in problem.lower():
                    st.info("💡 Sample solution: Compare each number to find the largest one!")
                elif "count" in problem.lower():
                    st.info("💡 Sample solution: Go through each letter and count them!")
            else:
                st.warning("Write some solution steps first! Think step by step. 🤔")
    
    with game_tabs[3]:
        st.subheader("🏆 Your Coding Achievements")
        
        progress = st.session_state.coding_games_progress
        
        achievements = [
            ("🧩 Logic Master", progress >= 25, "Solved the robot navigation puzzle"),
            ("🎯 Pattern Pro", progress >= 50, "Mastered the memory pattern game"),
            ("🤖 Code Commander", progress >= 75, "Wrote successful program solutions"),
            ("🌟 Coding Champion", progress >= 100, "Completed all coding challenges")
        ]
        
        for achievement, unlocked, description in achievements:
            if unlocked:
                st.success(f"✅ {achievement}")
                st.caption(f"   {description}")
            else:
                st.info(f"🔒 {achievement}")
                st.caption(f"   {description}")
        
        if progress >= 100:
            st.balloons()
            st.success("🎉 **CONGRATULATIONS!** You're a Coding Champion!")

def show_ai_playground():
    st.header("🤖 AI Playground")
    st.write("Experiment with AI concepts and tools! 🔬")
    
    playground_tabs = st.tabs([
        "🎨 AI Art Ideas", 
        "🗣️ Chat with AI", 
        "🔍 Pattern Detective",
        "🎮 AI Games"
    ])
    
    with playground_tabs[0]:
        st.subheader("🎨 AI Art Idea Generator")
        st.write("Describe what you want to create and AI will help!")
        
        art_prompt = st.text_input("Describe your dream artwork:", placeholder="A rainbow unicorn flying through space")
        
        if st.button("🎨 Generate Ideas", key="generate_art"):
            if art_prompt:
                st.success(f"🎨 Great idea: '{art_prompt}'")
                st.write("**AI suggests adding:**")
                st.write("- ✨ Sparkly stars in the background")
                st.write("- 🌈 More vibrant colors")
                st.write("- 🌙 A magical moon")
                st.info("💡 **Coming soon:** Real AI art generation!")
            else:
                st.warning("Please describe what you want to create!")
    
    with playground_tabs[1]:
        st.subheader("🗣️ AI Chat Assistant")
        st.write("Ask questions and get helpful answers!")
        
        user_question = st.text_input("Ask anything:", placeholder="What is the biggest planet?")
        
        if st.button("🤖 Ask AI", key="ask_ai"):
            if user_question:
                st.success(f"🤖 You asked: '{user_question}'")
                
                # Simple responses for common questions
                if "planet" in user_question.lower():
                    st.write("🪐 **AI Answer:** Jupiter is the biggest planet in our solar system!")
                elif "color" in user_question.lower():
                    st.write("🌈 **AI Answer:** There are many beautiful colors! Red, blue, green, yellow, and more!")
                elif "animal" in user_question.lower():
                    st.write("🐾 **AI Answer:** There are amazing animals like elephants, dolphins, and butterflies!")
                else:
                    st.write("🤖 **AI Answer:** That's a great question! Keep exploring and learning!")
                
                st.info("💡 **Coming soon:** Advanced AI chat features!")
            else:
                st.warning("Please ask a question!")
    
    with playground_tabs[2]:
        st.subheader("🔍 Pattern Detective")
        st.write("Train your brain to spot patterns like AI does!")
        
        st.write("**Find the pattern:**")
        st.write("2, 4, 6, 8, ?")
        
        pattern_answer = st.number_input("What comes next?", min_value=0, max_value=20, value=10)
        
        if st.button("🔍 Check Pattern", key="check_pattern_ai"):
            if pattern_answer == 10:
                st.success("🎉 Correct! The pattern is adding 2 each time!")
                st.write("This is how AI learns to recognize patterns!")
            else:
                st.error("Try again! Look for what's the same between each number.")
    
    with playground_tabs[3]:
        st.subheader("🎮 AI Challenge Games")
        st.write("Play games that teach you about AI!")
        
        game_choice = st.selectbox("Choose your challenge:", [
            "🎯 Guess the AI's Number (1-10)",
            "🔤 Word Association Game", 
            "🧩 Logic Puzzle Challenge"
        ])
        
        if game_choice == "🎯 Guess the AI's Number (1-10)":
            if 'ai_number' not in st.session_state:
                import random
                st.session_state.ai_number = random.randint(1, 10)
            
            guess = st.number_input("Guess the AI's number:", min_value=1, max_value=10, value=5)
            
            if st.button("🎯 Make Guess", key="guess_number"):
                if guess == st.session_state.ai_number:
                    st.success(f"🎉 Correct! The AI was thinking of {st.session_state.ai_number}!")
                    st.balloons()
                    # Reset for new game
                    import random
                    st.session_state.ai_number = random.randint(1, 10)
                else:
                    if guess < st.session_state.ai_number:
                        st.info("📈 Too low! Try higher!")
                    else:
                        st.info("📉 Too high! Try lower!")
        
        elif game_choice == "🔤 Word Association Game":
            st.write("**AI says:** OCEAN")
            st.write("What word do you think of?")
            
            association = st.text_input("Your word:", key="word_association")
            
            if st.button("🔤 Submit Word", key="submit_word"):
                if association:
                    ocean_words = ["water", "blue", "fish", "waves", "beach", "sea", "swimming"]
                    if association.lower() in ocean_words:
                        st.success(f"🎉 Great connection! '{association}' relates to OCEAN!")
                    else:
                        st.success(f"🤔 Interesting choice: '{association}'! AI learns from creative connections too!")
        
        else:  # Logic Puzzle
            st.write("**Logic Challenge:**")
            st.write("If all cats are animals, and Fluffy is a cat, then...")
            
            logic_answer = st.radio("What can we conclude?", [
                "Fluffy is an animal",
                "Fluffy is not an animal", 
                "We can't tell"
            ])
            
            if st.button("🧩 Check Logic", key="check_logic"):
                if logic_answer == "Fluffy is an animal":
                    st.success("🎉 Perfect logic! This is how AI makes logical connections!")
                else:
                    st.error("Think about it: If all cats are animals, and Fluffy is a cat...")

if __name__ == "__main__":
    main()
