import streamlit as st
import random

def show_fun_coding_games():
    st.title("🎮 Fun Coding Games")
    st.write("Learn coding through interactive games and challenges!")
    
    # Game selection tabs
    tab1, tab2, tab3, tab4 = st.tabs(["🧩 Code Puzzles", "🎯 Debug Challenge", "🏗️ Build & Create", "🏆 Coding Quiz"])
    
    with tab1:
        show_code_puzzles()
    
    with tab2:
        show_debug_challenge()
    
    with tab3:
        show_build_create()
    
    with tab4:
        show_coding_quiz()

def show_code_puzzles():
    st.subheader("🧩 Code Puzzles")
    st.write("Complete the code to solve the puzzle!")
    
    puzzles = [
        {
            "title": "Print Hello World",
            "description": "Complete the code to print 'Hello, World!'",
            "code": "print('Hello, ___')",
            "answer": "World!",
            "hint": "What greeting do programmers usually use?"
        },
        {
            "title": "Simple Math",
            "description": "Complete the code to add two numbers",
            "code": "result = 5 ___ 3",
            "answer": "+",
            "hint": "What symbol do we use to add numbers?"
        }
    ]
    
    selected_puzzle = st.selectbox("Choose a puzzle:", [p["title"] for p in puzzles])
    
    puzzle = next(p for p in puzzles if p["title"] == selected_puzzle)
    
    st.write(f"**Challenge:** {puzzle['description']}")
    st.code(puzzle['code'], language='python')
    
    user_answer = st.text_input("Your answer:")
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Check Answer"):
            if user_answer.strip() == puzzle['answer']:
                st.success("🎉 Correct! Great job!")
                st.balloons()
            else:
                st.error("❌ Not quite right. Try again!")
    
    with col2:
        if st.button("Show Hint"):
            st.info(f"💡 Hint: {puzzle['hint']}")

def show_debug_challenge():
    st.subheader("🎯 Debug Challenge")
    st.write("Find and fix the bugs in the code!")
    
    buggy_codes = [
        {
            "title": "Missing Quotes",
            "buggy_code": "print(Hello World)",
            "fixed_code": "print('Hello World')",
            "explanation": "Strings need to be in quotes!"
        },
        {
            "title": "Wrong Indentation", 
            "buggy_code": "if True:\nprint('Yes')",
            "fixed_code": "if True:\n    print('Yes')",
            "explanation": "Python needs proper indentation!"
        }
    ]
    
    selected_bug = st.selectbox("Choose a bug to fix:", [b["title"] for b in buggy_codes])
    bug = next(b for b in buggy_codes if b["title"] == selected_bug)
    
    st.write("**Buggy Code:**")
    st.code(bug['buggy_code'], language='python')
    
    st.write("**Can you fix it?**")
    user_fix = st.text_area("Write the fixed code here:")
    
    if st.button("Check Fix"):
        if user_fix.strip() == bug['fixed_code'].strip():
            st.success("🎉 Bug fixed! You're a debugging expert!")
            st.info(f"💡 Explanation: {bug['explanation']}")
        else:
            st.error("❌ Still has bugs. Keep trying!")

def show_build_create():
    st.subheader("🏗️ Build & Create")
    st.write("Use your creativity to build something awesome!")
    
    project_type = st.selectbox("What do you want to create?", [
        "Simple Calculator",
        "Story Generator", 
        "Color Mixer",
        "Number Guessing Game"
    ])
    
    if project_type == "Simple Calculator":
        st.write("**Build a Calculator:**")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            num1 = st.number_input("First number:", value=0)
        with col2:
            operation = st.selectbox("Operation:", ["+", "-", "×", "÷"])
        with col3:
            num2 = st.number_input("Second number:", value=0)
        
        if st.button("Calculate"):
            if operation == "+":
                result = num1 + num2
            elif operation == "-":
                result = num1 - num2
            elif operation == "×":
                result = num1 * num2
            elif operation == "÷":
                result = num1 / num2 if num2 != 0 else "Cannot divide by zero!"
            
            st.success(f"Result: {result}")
            st.code(f"# Your calculator code:\nresult = {num1} {operation} {num2}\nprint(result)")
    
    elif project_type == "Story Generator":
        st.write("**Create a Story:**")
        
        name = st.text_input("Hero's name:")
        place = st.text_input("Magical place:")
        object = st.text_input("Special object:")
        
        if st.button("Generate Story") and name and place and object:
            story = f"Once upon a time, {name} went to {place} and found a magical {object}. It was the beginning of an amazing adventure!"
            st.success("📖 Your Story:")
            st.write(story)

def show_coding_quiz():
    st.subheader("🏆 Coding Quiz")
    st.write("Test your coding knowledge!")
    
    questions = [
        {
            "question": "What does 'print()' do in Python?",
            "options": ["Prints on paper", "Shows text on screen", "Makes noise", "Deletes files"],
            "correct": "Shows text on screen"
        },
        {
            "question": "Which symbol is used for comments in Python?",
            "options": ["//", "#", "/*", "@"],
            "correct": "#"
        },
        {
            "question": "What is a variable?",
            "options": ["A box that stores data", "A type of loop", "An error", "A function"],
            "correct": "A box that stores data"
        }
    ]
    
    if 'quiz_score' not in st.session_state:
        st.session_state.quiz_score = 0
        st.session_state.quiz_completed = False
    
    if not st.session_state.quiz_completed:
        for i, q in enumerate(questions):
            st.write(f"**Question {i+1}:** {q['question']}")
            answer = st.radio("Choose your answer:", q['options'], key=f"q_{i}")
            
            if st.button(f"Submit Answer {i+1}", key=f"submit_{i}"):
                if answer == q['correct']:
                    st.success("✅ Correct!")
                    st.session_state.quiz_score += 1
                else:
                    st.error(f"❌ Wrong! Correct answer: {q['correct']}")
            st.divider()
        
        if st.button("Finish Quiz"):
            st.session_state.quiz_completed = True
            st.rerun()
    else:
        st.success(f"🎉 Quiz Complete! Your score: {st.session_state.quiz_score}/{len(questions)}")
        if st.button("Retake Quiz"):
            st.session_state.quiz_score = 0
            st.session_state.quiz_completed = False
            st.rerun()
