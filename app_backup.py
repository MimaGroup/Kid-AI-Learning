import streamlit as st
import os
import sys

# Add the current directory to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Try to import the necessary modules
try:
    from pages.learn_ai_basics import show_learn_ai_basics, show_lesson_content, show_lesson_quiz
    print("Successfully imported learn_ai_basics modules")
except ImportError as e:
    print(f"Import error for learn_ai_basics: {e}")
    # Define fallback functions if imports fail
    def show_learn_ai_basics():
        st.title("Learn AI Basics")
        st.error(f"Module not found. Error: {str(e)}")
        
    def show_lesson_content(lesson_name):
        st.title("Lesson Content")
        st.error(f"Module not found. Error: {str(e)}")
        
    def show_lesson_quiz(lesson_name):
        st.title("Lesson Quiz")
        st.error(f"Module not found. Error: {str(e)}")

def initialize_session_state():
    """Initialize session state variables for the application."""
    # Initialize default values if they don't exist
    if 'user_progress' not in st.session_state:
        st.session_state.user_progress = 0
    
    if 'completed_lessons' not in st.session_state:
        st.session_state.completed_lessons = []
    
    if 'achievements' not in st.session_state:
        st.session_state.achievements = []
    
    if 'current_page' not in st.session_state:
        st.session_state.current_page = "AI Playground"
    
    # Lesson state
    if 'current_lesson' not in st.session_state:
        st.session_state.current_lesson = None
    
    if 'lesson_page' not in st.session_state:
        st.session_state.lesson_page = None

# Now call the function
initialize_session_state()

def main():
    st.sidebar.title("AI Kids Learning")
    
    # Navigation - use radio buttons for cleaner UI
    pages = ["Learn AI Basics", "Fun Coding Games", "AI Adventures", 
             "Parent Dashboard", "AI Playground", "Enhanced Features", 
             "interactive playground"]
    
    # Use the Go to section with radio buttons that's already in your UI
    st.sidebar.header("Go to")
    selection = st.sidebar.radio("", pages, label_visibility="collapsed")
    st.session_state.current_page = selection
    
    # Display the selected page
    if selection == "Learn AI Basics":
        # Check if we're viewing a specific lesson
        if st.session_state.current_lesson and st.session_state.lesson_page:
            if st.session_state.lesson_page == "content":
                show_lesson_content(st.session_state.current_lesson)
            elif st.session_state.lesson_page == "quiz":
                show_lesson_quiz(st.session_state.current_lesson)
        else:
            show_learn_ai_basics()
    elif selection == "Fun Coding Games":
        show_fun_coding_games()
    elif selection == "AI Adventures":
        show_ai_adventures()
    elif selection == "Parent Dashboard":
        show_parent_dashboard()
    elif selection == "AI Playground":
        show_ai_playground()
    elif selection == "Enhanced Features":
        show_enhanced_features()
    elif selection == "interactive playground":
        show_interactive_playground()

# Import and use existing page functions
def show_fun_coding_games():
    try:
        # Import the main function from the existing file
        import importlib.util
        spec = importlib.util.spec_from_file_location("fun_coding_games", "pages/2_Fun_Coding_Games.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        # Call the main function if it exists
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("Fun Coding Games")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("Fun Coding Games")
        st.error(f"Error loading page: {e}")

def show_ai_adventures():
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("ai_adventures", "pages/3_AI_Adventures.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("AI Adventures")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("AI Adventures")
        st.error(f"Error loading page: {e}")

def show_parent_dashboard():
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("parent_dashboard", "pages/4_Parent_Dashboard.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("Parent Dashboard")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("Parent Dashboard")
        st.error(f"Error loading page: {e}")

def show_ai_playground():
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("ai_playground", "pages/5_AI_Playground.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("AI Playground")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("AI Playground")
        st.error(f"Error loading page: {e}")

def show_enhanced_features():
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("enhanced_features", "pages/6_Enhanced_Features.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("Enhanced Features")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("Enhanced Features")
        st.error(f"Error loading page: {e}")

def show_interactive_playground():
    try:
        import importlib.util
        spec = importlib.util.spec_from_file_location("interactive_playground", "pages/7_Interactive_Playground.py")
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        if hasattr(module, 'main'):
            module.main()
        else:
            st.title("Interactive Playground")
            st.write("Page loaded but main function not found.")
    except Exception as e:
        st.title("Interactive Playground")
        st.error(f"Error loading page: {e}")

if __name__ == "__main__":
    main()
