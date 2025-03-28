import streamlit as st
from components.robot_guide import display_robot_guide
from utils.helpers import initialize_session_state, get_lesson_content, complete_lesson, save_quiz_score, award_badge
import random

# Configure page
st.set_page_config(
    page_title="Learn AI Basics - KidAI Academy",
    page_icon="🧠",
    layout="wide"
)

# Initialize session state
initialize_session_state()

# Main content
def main():
    st.title("🧠 Learn AI Basics")
    
    # Robot guide introduction
    display_robot_guide("Welcome to the learning zone! Choose a lesson to start exploring AI concepts.")
    
    # Available lessons
    lessons = [
        {
            "id": "what_is_ai",
            "title": "What is Artificial Intelligence?",
            "description": "Learn what AI is and how it's used in the world around us.",
            "difficulty": "Beginner",
            "duration": "10 min",
            "image": "https://via.placeholder.com/100x100.png?text=AI+Basics"
        },
        {
            "id": "ai_algorithms",
            "title": "AI Algorithms: The Recipe for Intelligence",
            "description": "Discover how algorithms help computers make decisions and solve problems.",
            "difficulty": "Beginner",
            "duration": "15 min",
            "image": "https://via.placeholder.com/100x100.png?text=Algorithms"
        },
        {
            "id": "machine_learning",
            "title": "Machine Learning: How Computers Learn",
            "description": "Find out how computers learn from examples, just like you do!",
            "difficulty": "Intermediate",
            "duration": "20 min",
            "image": "https://via.placeholder.com/100x100.png?text=Machine+Learning"
        },
        {
            "id": "neural_networks",
            "title": "Neural Networks: Brain-Inspired Computing",
            "description": "Explore how computers use networks inspired by the human brain.",
            "difficulty": "Intermediate", 
            "duration": "25 min",
            "image": "https://via.placeholder.com/100x100.png?text=Neural+Networks"
        },
        {
            "id": "ai_ethics",
            "title": "AI Ethics: Making Good Choices",
            "description": "Learn why it's important to create AI that's helpful, harmless, and honest.",
            "difficulty": "Advanced",
            "duration": "20 min",
            "image": "https://via.placeholder.com/100x100.png?text=AI+Ethics"
        },
        {
            "id": "ai_future",
            "title": "The Future of AI",
            "description": "Imagine how AI might change the world in the future.",
            "difficulty": "Advanced",
            "duration": "15 min",
            "image": "https://via.placeholder.com/100x100.png?text=Future+AI"
        }
    ]
    
    # Lesson selection - display as cards in a grid
    st.markdown("## Choose a Lesson")
    
    # Create three columns for the lesson cards
    cols = st.columns(3)
    
    # Display lesson cards
    for i, lesson in enumerate(lessons):
        with cols[i % 3]:
            # Check if lesson is completed
            completed = lesson["id"] in st.session_state.get("completed_lessons", [])
            
            # Card container
            st.markdown(f"""
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 20px; 
                       background-color: {'#f0f8ff' if not completed else '#e6ffec'};">
                <h3 style="margin-top: 0;">{lesson["title"]} {' ✅' if completed else ''}</h3>
                <p>{lesson["description"]}</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        {lesson["difficulty"]}
                    </span>
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        ⏱️ {lesson["duration"]}
                    </span>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # Button to start the lesson
            button_label = "Start Lesson" if not completed else "Review Lesson"
            if st.button(button_label, key=f"lesson_{lesson['id']}"):
                st.session_state["current_lesson"] = lesson["id"]
                st.rerun()
    
    # If a lesson is selected, show its content
    if "current_lesson" in st.session_state:
        show_lesson(st.session_state["current_lesson"])

def show_lesson(lesson_id):
    """Show the content for a specific lesson"""
    
    # Get lesson content
    lesson = get_lesson_content(lesson_id)
    
    # Go back button
    if st.button("← Back to Lessons", key="back_to_lessons"):
        if "current_lesson" in st.session_state:
            del st.session_state["current_lesson"]
        if "quiz_active" in st.session_state:
            del st.session_state["quiz_active"]
        if "quiz_answers" in st.session_state:
            del st.session_state["quiz_answers"]
        st.rerun()
    
    # Display lesson title and content
    st.title(lesson["title"])
    
    # Check if quiz is active
    if "quiz_active" in st.session_state and st.session_state["quiz_active"]:
        show_quiz(lesson)
    else:
        # Display lesson content
        st.markdown(lesson["content"])
        
        # Quiz button
        if st.button("Take Quiz", key="start_quiz"):
            st.session_state["quiz_active"] = True
            st.session_state["quiz_answers"] = {}
            st.rerun()
        
        # Mark as completed button
        completed = lesson_id in st.session_state.get("completed_lessons", [])
        
        if not completed:
            if st.button("Mark as Completed", key="complete_lesson"):
                # Mark lesson as completed and update progress
                if complete_lesson(lesson_id):
                    st.success("Lesson completed! Keep learning to earn badges.")
                    
                    # Check if first lesson completed - award badge
                    if len(st.session_state.get("completed_lessons", [])) == 1:
                        if award_badge("Learner"):
                            st.balloons()
                            st.success("🏆 You earned the Learner badge!")
                    
                    # Check if 5+ lessons completed - award badge
                    if len(st.session_state.get("completed_lessons", [])) >= 5:
                        if award_badge("Explorer"):
                            st.balloons()
                            st.success("🏆 You earned the Explorer badge!")
                            
                st.rerun()

def show_quiz(lesson):
    """Display a quiz for the current lesson"""
    
    st.markdown("## Test Your Knowledge")
    display_robot_guide("Time to test what you've learned! Answer these questions about " + lesson["title"])
    
    # Initialize quiz answers if not already done
    if "quiz_answers" not in st.session_state:
        st.session_state["quiz_answers"] = {}
    
    # Display quiz questions
    quiz = lesson.get("quiz", [])
    
    if not quiz:
        st.warning("No quiz available for this lesson yet.")
        if st.button("Go Back to Lesson", key="no_quiz_back"):
            st.session_state["quiz_active"] = False
            st.rerun()
        return
    
    # Create a form for the quiz
    with st.form("lesson_quiz"):
        for i, question in enumerate(quiz):
            st.markdown(f"**Question {i+1}:** {question['question']}")
            
            # Radio buttons for options
            selected = st.radio(
                "Select your answer:",
                options=question["options"],
                key=f"q{i}",
                index=st.session_state["quiz_answers"].get(i, None)
            )
            
            # Store selected answer index
            if selected:
                option_index = question["options"].index(selected)
                st.session_state["quiz_answers"][i] = option_index
            
            st.markdown("---")
        
        # Submit button
        submitted = st.form_submit_button("Submit Answers")
    
    # Handle submission
    if submitted:
        score = 0
        feedback = []
        
        # Check answers
        for i, question in enumerate(quiz):
            if i in st.session_state["quiz_answers"]:
                selected_index = st.session_state["quiz_answers"][i]
                correct_index = question["correct"]
                
                if selected_index == correct_index:
                    score += 1
                    feedback.append(f"✅ Question {i+1}: Correct!")
                else:
                    feedback.append(f"❌ Question {i+1}: Incorrect. The correct answer is: {question['options'][correct_index]}")
            else:
                feedback.append(f"❓ Question {i+1}: Not answered")
        
        # Display results
        st.markdown(f"## Quiz Results: {score}/{len(quiz)}")
        
        for item in feedback:
            st.markdown(item)
        
        # Calculate percentage and save score
        percentage = (score / len(quiz)) * 100
        save_quiz_score(lesson["title"], score, len(quiz))
        
        # Award badges based on performance
        if percentage == 100:
            badge_name = lesson["title"].split(":")[0].strip() + " Expert"
            if award_badge(badge_name):
                st.balloons()
                st.success(f"🏆 You earned the {badge_name} badge!")
        
        # Mark lesson as completed
        if lesson["title"].split(":")[0].strip() in st.session_state.get("completed_lessons", []):
            pass  # Already completed
        else:
            complete_lesson(lesson["title"].split(":")[0].strip())
        
        # Back to lessons button
        if st.button("Back to Lessons", key="quiz_complete_back"):
            if "current_lesson" in st.session_state:
                del st.session_state["current_lesson"]
            if "quiz_active" in st.session_state:
                del st.session_state["quiz_active"]
            if "quiz_answers" in st.session_state:
                del st.session_state["quiz_answers"]
            st.rerun()

# Run the main function
if __name__ == "__main__":
    main()
