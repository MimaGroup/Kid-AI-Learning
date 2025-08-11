import streamlit as st
from components.robot_guide import display_robot_guide, display_robot_celebration
from components.interactive_games import display_sorting_game, display_pattern_game, display_robot_maze, display_image_detective_game
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
        },
        {
            "id": "neural_network",
            "title": "Neural Network Builder",
            "description": "Build your own neural network to solve problems!",
            "difficulty": "Advanced",
            "skill": "Deep Learning",
            "image": "https://via.placeholder.com/100x100.png?text=Neural+Network"
        }
    ]
    
    # Game selection - display as cards in a grid
    st.markdown("## Choose a Game")
    
    # Define colors for game buttons
    button_colors = {
        "sorting_game": "#3CB371",  # Medium Sea Green
        "pattern_game": "#FF7F50",  # Coral
        "robot_maze": "#4169E1",    # Royal Blue
        "image_detective": "#20B2AA", # Light Sea Green
        "neural_network": "#6A5ACD"  # Slate Blue
    }
    
    # Create two columns for the game cards
    cols = st.columns(2)
    
    # Display game cards
    for i, game in enumerate(games):
        with cols[i % 2]:
            # Check if game is completed
            completed = game["id"] in st.session_state.get("completed_games", [])
            
            # Create a container for the entire game card
            with st.container():
                # Card container with styling
                st.markdown(f"""
                <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 10px; 
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
                
                # Use regular Streamlit button
                play_button = st.button(
                    f"▶️ Play {game['title']}", 
                    key=f"play_{game['id']}",
                    type="primary",
                    use_container_width=True
                )
                
                # Handle button click
                if play_button:
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
    elif game_id == "neural_network":
        display_neural_network_game()
    else:
        st.error("Game not found. Please go back and select another game.")

def display_image_detective_game():
    from components.interactive_games.image_detective import display_image_detective_game as imported_game
    imported_game()
    
