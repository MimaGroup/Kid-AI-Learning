import streamlit as st
from components.robot_guide import display_robot_guide, display_robot_celebration
from components.interactive_games import display_sorting_game, display_pattern_game, display_robot_maze
from utils.helpers import initialize_session_state, complete_game, award_badge
import random

# Configure page
st.set_page_config(
    page_title="Fun Coding Games - KidAI Academy",
    page_icon="🎮",
    layout="wide"
)

# Initialize session state
initialize_session_state()

# Main content
def main():
    st.title("🎮 Fun Coding Games")
    
    # Robot guide introduction
    display_robot_guide("Welcome to the games zone! Learn about AI concepts through fun games and challenges.")
    
    # If a game is selected, show that game
    if "current_game" in st.session_state:
        show_game(st.session_state["current_game"])
        return
    
    # Available games
    games = [
        {
            "id": "sorting_game",
            "title": "AI Sorting Game",
            "description": "Help the AI learn to sort items into categories!",
            "difficulty": "Beginner",
            "skill": "Classification",
            "image": "https://via.placeholder.com/100x100.png?text=Sorting+Game"
        },
        {
            "id": "pattern_game",
            "title": "Pattern Finder",
            "description": "Find patterns in data just like AI does!",
            "difficulty": "Intermediate",
            "skill": "Pattern Recognition",
            "image": "https://via.placeholder.com/100x100.png?text=Pattern+Game"
        },
        {
            "id": "robot_maze",
            "title": "Robot Maze",
            "description": "Program a robot to navigate through a maze!",
            "difficulty": "Intermediate",
            "skill": "Programming Basics",
            "image": "https://via.placeholder.com/100x100.png?text=Robot+Maze"
        },
        {
            "id": "image_detective",
            "title": "AI Image Detective",
            "description": "Train an AI to recognize objects in images!",
            "difficulty": "Advanced",
            "skill": "Computer Vision",
            "image": "https://via.placeholder.com/100x100.png?text=Image+Detective"
        }
    ]
    
    # Game selection - display as cards in a grid
    st.markdown("## Choose a Game")
    
    # Create two columns for the game cards
    cols = st.columns(2)
    
    # Display game cards
    for i, game in enumerate(games):
        with cols[i % 2]:
            # Check if game is completed
            completed = game["id"] in st.session_state.get("completed_games", [])
            
            # Card container
            st.markdown(f"""
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 20px; 
                       background-color: {'#f0f8ff' if not completed else '#e6ffec'};">
                <h3 style="margin-top: 0;">{game["title"]} {' ✅' if completed else ''}</h3>
                <p>{game["description"]}</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        {game["difficulty"]}
                    </span>
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        Skill: {game["skill"]}
                    </span>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # Button to start the game
            if st.button("Play Game", key=f"game_{game['id']}"):
                st.session_state["current_game"] = game["id"]
                st.rerun()

def show_game(game_id):
    """Show a specific game based on ID"""
    
    # Go back button
    if st.button("← Back to Games", key="back_to_games"):
        if "current_game" in st.session_state:
            del st.session_state["current_game"]
        st.rerun()
    
    # Display the appropriate game
    if game_id == "sorting_game":
        display_sorting_game()
    elif game_id == "pattern_game":
        display_pattern_game()
    elif game_id == "robot_maze":
        display_robot_maze()
    elif game_id == "image_detective":
        display_image_detective_game()
    else:
        st.error("Game not found. Please go back and select another game.")

def display_image_detective_game():
    """A simplified image recognition game for kids
    
    This game simulates teaching an AI to recognize objects in images.
    """
    st.header("AI Image Detective")
    st.markdown("Help train an AI to recognize objects in pictures!")
    
    # Initialize game state
    if "detective_score" not in st.session_state:
        st.session_state.detective_score = 0
    
    if "detective_round" not in st.session_state:
        st.session_state.detective_round = 1
        
    if "detective_training_data" not in st.session_state:
        # Simulated training data (in a real app, we'd use actual images)
        st.session_state.detective_training_data = {
            "Animals": ["dog", "cat", "elephant", "tiger", "bird", "fish", "lion", "zebra"],
            "Vehicles": ["car", "bus", "train", "bicycle", "airplane", "boat", "motorcycle", "helicopter"],
            "Food": ["apple", "pizza", "banana", "ice cream", "sandwich", "cookie", "hamburger", "spaghetti"],
            "Clothing": ["shirt", "pants", "dress", "hat", "shoes", "socks", "jacket", "gloves"]
        }
    
    if "current_training" not in st.session_state:
        # Select a random category for training
        categories = list(st.session_state.detective_training_data.keys())
        selected_category = random.choice(categories)
        
        # Select 4 items from the category for training
        training_items = random.sample(st.session_state.detective_training_data[selected_category], 4)
        
        # Select a different category for testing (for "negative" examples)
        other_categories = [c for c in categories if c != selected_category]
        test_category = random.choice(other_categories)
        test_items = random.sample(st.session_state.detective_training_data[test_category], 2)
        
        # Select 2 more items from the training category for positive test examples
        positive_test_items = random.sample(
            [item for item in st.session_state.detective_training_data[selected_category] if item not in training_items],
            2
        )
        
        # Combine test items and shuffle
        test_items = positive_test_items + test_items
        random.shuffle(test_items)
        
        # Store the current training session
        st.session_state.current_training = {
            "category": selected_category,
            "training_items": training_items,
            "test_items": test_items,
            "positive_test_items": positive_test_items,
            "stage": "training",  # Stages: training, testing, results
            "test_answers": [],
            "accuracy": 0
        }
    
    # Display the appropriate stage
    if st.session_state.current_training["stage"] == "training":
        display_training_stage()
    elif st.session_state.current_training["stage"] == "testing":
        display_testing_stage()
    elif st.session_state.current_training["stage"] == "results":
        display_results_stage()

def display_training_stage():
    """Display the training stage of the image detective game"""
    training_data = st.session_state.current_training
    
    st.markdown(f"## Training Round {st.session_state.detective_round}")
    
    display_robot_guide(f"Help me learn what a {training_data['category'].lower()} looks like! Show me some examples.")
    
    st.markdown(f"### Category: {training_data['category']}")
    
    # Display training items
    st.markdown("I'm learning from these examples:")
    
    # Create grid for training images
    cols = st.columns(2)
    
    for i, item in enumerate(training_data["training_items"]):
        with cols[i % 2]:
            st.markdown(f"#### {item.title()}")
            st.image(f"https://via.placeholder.com/200x150.png?text={item}", use_column_width=True)
    
    # Continue to testing stage
    if st.button("I'm Ready to Test the AI", key="start_testing"):
        st.session_state.current_training["stage"] = "testing"
        st.rerun()

def display_testing_stage():
    """Display the testing stage of the image detective game"""
    training_data = st.session_state.current_training
    
    st.markdown(f"## Testing Round {st.session_state.detective_round}")
    
    display_robot_guide(f"Now test me! For each picture, tell me if it's a {training_data['category'].lower()} or not.")
    
    # Testing form
    with st.form("testing_form"):
        # Display test items with yes/no options
        for i, item in enumerate(training_data["test_items"]):
            st.markdown(f"### Is this a {training_data['category']}?")
            st.image(f"https://via.placeholder.com/300x200.png?text={item}", width=300)
            
            response = st.radio(
                f"Is this a {training_data['category']}?",
                options=["Yes", "No"],
                key=f"test_{i}"
            )
            
            # Store answer (done after form submission)
            training_data["test_answers"].append(response)
            
            st.markdown("---")
        
        # Submit button
        submitted = st.form_submit_button("Submit Answers")
    
    if submitted:
        # Calculate accuracy
        correct_answers = 0
        for i, item in enumerate(training_data["test_items"]):
            is_correct_category = item in training_data["positive_test_items"]
            user_says_yes = training_data["test_answers"][i] == "Yes"
            
            if (is_correct_category and user_says_yes) or (not is_correct_category and not user_says_yes):
                correct_answers += 1
        
        accuracy = correct_answers / len(training_data["test_items"])
        training_data["accuracy"] = accuracy
        
        # Move to results stage
        training_data["stage"] = "results"
        st.rerun()

def display_results_stage():
    """Display the results stage of the image detective game"""
    training_data = st.session_state.current_training
    
    st.markdown(f"## Results - Round {st.session_state.detective_round}")
    
    # Display accuracy
    accuracy_percentage = int(training_data["accuracy"] * 100)
    
    if accuracy_percentage >= 75:
        display_robot_celebration()
        st.success(f"Great job! The AI is {accuracy_percentage}% accurate at recognizing {training_data['category']}!")
    else:
        st.warning(f"The AI is only {accuracy_percentage}% accurate. It needs more training!")
    
    # Show detailed results
    st.markdown("### Detailed Results")
    
    for i, item in enumerate(training_data["test_items"]):
        is_correct_category = item in training_data["positive_test_items"]
        user_says_yes = training_data["test_answers"][i] == "Yes"
        is_correct_answer = (is_correct_category and user_says_yes) or (not is_correct_category and not user_says_yes)
        
        result_icon = "✅" if is_correct_answer else "❌"
        
        st.markdown(f"{result_icon} **{item.title()}**: You said {'YES' if user_says_yes else 'NO'}. "
                   f"This {'IS' if is_correct_category else 'is NOT'} a {training_data['category'].lower()}.")
    
    # Update score based on accuracy
    points = int(accuracy_percentage / 10)  # 0-10 points
    st.session_state.detective_score += points
    st.markdown(f"**Points earned:** {points}")
    st.markdown(f"**Total score:** {st.session_state.detective_score}")
    
    # Continue to next round
    if st.button("Train on a New Category", key="next_round"):
        # Complete this game if needed
        if "image_detective" not in st.session_state.get("completed_games", []):
            complete_game("image_detective")
        
        # Award badge if score is high enough
        if st.session_state.detective_score >= 30 and "AI Visionary" not in st.session_state.get("badges", []):
            if award_badge("AI Visionary"):
                st.balloons()
                st.success("🏆 You earned the AI Visionary badge!")
        
        # Reset for next round
        st.session_state.detective_round += 1
        if "current_training" in st.session_state:
            del st.session_state.current_training
        
        st.rerun()

# Run the main function
if __name__ == "__main__":
    main()
