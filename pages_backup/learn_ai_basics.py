import streamlit as st

def show_ai_basics_content():
    st.header("🧠 Learn AI Basics")
    
    # Progress tracking
    if 'ai_basics_progress' not in st.session_state:
        st.session_state.ai_basics_progress = 0
    
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
        """)
        
        if st.button("✅ I understand what AI is!"):
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
        """)
        
        if st.button("✅ I understand how AI learns!"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 50)
            st.success("Awesome! You've completed lesson 2! 🌟")
    
    with tab3:
        st.subheader("AI Examples You Know")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.write("**🏠 At Home:**")
            st.write("- 🗣️ Siri, Alexa (voice assistants)")
            st.write("- 📱 Face unlock on phones")
            st.write("- 🎵 Music recommendations")
            
        with col2:
            st.write("**🎮 In Games:**")
            st.write("- 🤖 Smart game characters")
            st.write("- 🎯 Auto-aim helpers")
            st.write("- 🧩 Puzzle solvers")
        
        if st.button("✅ I can spot AI around me!"):
            st.session_state.ai_basics_progress = max(st.session_state.ai_basics_progress, 75)
            st.success("Excellent! You're becoming an AI expert! 🚀")
    
    with tab4:
        st.subheader("🎯 Quick AI Quiz")
        
        question = st.radio(
            "What is the best way for AI to learn?",
            ["Looking at many examples", "Reading one book", "Guessing randomly"]
        )
        
        if st.button("Submit Answer"):
            if question == "Looking at many examples":
                st.success("🎉 Correct! AI learns best from lots of examples!")
                st.session_state.ai_basics_progress = 100
                st.balloons()
            else:
                st.error("Try again! Think about how you learn to recognize things.")
    
    # Show progress
    st.sidebar.metric("🎓 AI Basics Progress", f"{st.session_state.ai_basics_progress}%")
    st.sidebar.progress(st.session_state.ai_basics_progress / 100)

def show_learn_ai_basics():
    show_ai_basics_content()
