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
                
                # Use standard Streamlit button with play icon and primary styling
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

def display_neural_network_game():
    """A simple neural network building game for kids
    
    This game lets kids build a simple neural network to solve various AI tasks.
    """
    st.header("Neural Network Builder")
    st.markdown("Build your own neural network to solve AI problems!")
    
    # Initialize game state
    if "nn_level" not in st.session_state:
        st.session_state.nn_level = 1
        
    if "nn_score" not in st.session_state:
        st.session_state.nn_score = 0
        
    if "current_nn_problem" not in st.session_state:
        # Set initial problem
        st.session_state.current_nn_problem = get_nn_problem(st.session_state.nn_level)
        
    if "current_network" not in st.session_state:
        # Initialize empty neural network
        st.session_state.current_network = {
            "input_nodes": [],
            "hidden_nodes": [],
            "output_nodes": [],
            "connections": []
        }
    
    # Display current level and problem description
    st.markdown(f"### Level: {st.session_state.nn_level} | Score: {st.session_state.nn_score}")
    
    # Get current problem
    problem = st.session_state.current_nn_problem
    
    # Display robot guide with the problem description
    display_robot_guide(problem["description"])
    
    # Create two columns layout
    col1, col2 = st.columns([2, 3])
    
    with col1:
        st.markdown("### Neural Network Requirements")
        st.markdown(f"**Task:** {problem['task']}")
        st.markdown(f"**Input Features:** {', '.join(problem['inputs'])}")
        st.markdown(f"**Expected Output:** {', '.join(problem['outputs'])}")
        
        # Show hints
        with st.expander("Need a hint?"):
            st.markdown(problem["hint"])
            
        # Add evaluation button
        if st.button("Evaluate My Network", type="primary"):
            results = evaluate_network(st.session_state.current_network, problem)
            if results["success"]:
                st.success(f"Great job! {results['message']}")
                # Award points
                st.session_state.nn_score += 10 * st.session_state.nn_level
                # Level up
                st.session_state.nn_level += 1
                # Reset network
                st.session_state.current_network = {
                    "input_nodes": [],
                    "hidden_nodes": [],
                    "output_nodes": [],
                    "connections": []
                }
                # Get new problem
                st.session_state.current_nn_problem = get_nn_problem(st.session_state.nn_level)
                # Award badge if level is high enough
                if st.session_state.nn_level >= 3 and "Neural Master" not in st.session_state.get("badges", []):
                    award_badge("Neural Master")
                    st.balloons()
                    st.success("🏆 You earned the Neural Master badge!")
                    
                # Complete this game
                complete_game("neural_network")
                st.rerun()
            else:
                st.error(f"Not quite right: {results['message']}")
                with st.expander("Suggestions"):
                    st.markdown(results["suggestions"])
    
    with col2:
        st.markdown("### Build Your Neural Network")
        
        # Visualize the network (simplified for kids)
        network_html = create_network_visualization(
            st.session_state.current_network,
            problem["inputs"],
            problem["outputs"]
        )
        
        st.markdown(network_html, unsafe_allow_html=True)
        
        # Network building interface
        st.markdown("### Add Connections")
        
        # Lists of available nodes based on problem
        input_nodes = problem["inputs"]
        hidden_nodes = ["Hidden 1", "Hidden 2", "Hidden 3"]
        output_nodes = problem["outputs"]
        
        # Source node selection
        source_type = st.selectbox(
            "Select source layer:",
            options=["Input", "Hidden"]
        )
        
        if source_type == "Input":
            source_node = st.selectbox(
                "Select input node:",
                options=input_nodes
            )
        else:
            source_node = st.selectbox(
                "Select hidden node:",
                options=hidden_nodes
            )
        
        # Target node selection
        target_type = st.selectbox(
            "Select target layer:",
            options=["Hidden", "Output"]
        )
        
        if target_type == "Hidden":
            target_node = st.selectbox(
                "Select hidden node:",
                options=hidden_nodes
            )
        else:
            target_node = st.selectbox(
                "Select output node:",
                options=output_nodes
            )
        
        # Check validity and add connection
        is_valid_connection = (
            (source_type == "Input" and target_type == "Hidden") or
            (source_type == "Hidden" and target_type == "Output")
        )
        
        if is_valid_connection:
            connection_key = f"{source_type}:{source_node}->{target_type}:{target_node}"
            
            # Check if connection already exists
            connection_exists = connection_key in st.session_state.current_network["connections"]
            
            if not connection_exists:
                if st.button("Add Connection", key="add_connection", type="primary"):
                    # Add the connection
                    st.session_state.current_network["connections"].append(connection_key)
                    
                    # Keep track of used nodes
                    if source_type == "Input" and source_node not in st.session_state.current_network["input_nodes"]:
                        st.session_state.current_network["input_nodes"].append(source_node)
                    elif source_type == "Hidden" and source_node not in st.session_state.current_network["hidden_nodes"]:
                        st.session_state.current_network["hidden_nodes"].append(source_node)
                    
                    if target_type == "Hidden" and target_node not in st.session_state.current_network["hidden_nodes"]:
                        st.session_state.current_network["hidden_nodes"].append(target_node)
                    elif target_type == "Output" and target_node not in st.session_state.current_network["output_nodes"]:
                        st.session_state.current_network["output_nodes"].append(target_node)
                    
                    st.rerun()
            else:
                st.warning("This connection already exists.")
        else:
            st.error("Invalid connection. Inputs must connect to hidden nodes, and hidden nodes must connect to outputs.")
        
        # Clear network button
        if st.button("Clear Network", key="clear_network"):
            st.session_state.current_network = {
                "input_nodes": [],
                "hidden_nodes": [],
                "output_nodes": [],
                "connections": []
            }
            st.rerun()
    
    # Test network button
    if st.button("Test My Neural Network", key="test_network", type="primary"):
        # Check if the network meets minimum requirements
        is_valid = validate_network(
            st.session_state.current_network,
            problem["inputs"],
            problem["outputs"]
        )
        
        if is_valid:
            # Calculate a score based on the network quality
            score, feedback = evaluate_network(
                st.session_state.current_network,
                problem
            )
            
            st.session_state.nn_score += score
            
            # Show results
            if score >= 8:  # Good solution
                st.success(f"Great job! Your neural network works well for this problem! +{score} points")
                st.markdown(feedback)
                
                # Award badge if applicable
                if st.session_state.nn_level >= 3 and "Neural Network Architect" not in st.session_state.get("badges", []):
                    if award_badge("Neural Network Architect"):
                        st.balloons()
                        st.success("🏆 You earned the Neural Network Architect badge!")
                
                # Level up
                if st.button("Go to Next Level"):
                    st.session_state.nn_level += 1
                    st.session_state.current_nn_problem = get_nn_problem(st.session_state.nn_level)
                    st.session_state.current_network = {
                        "input_nodes": [],
                        "hidden_nodes": [],
                        "output_nodes": [],
                        "connections": []
                    }
                    
                    # Complete the game if reached final level
                    if st.session_state.nn_level > 3:
                        complete_game("neural_network")
                        
                    st.rerun()
            else:  # Needs improvement
                st.warning(f"Your neural network needs some improvements. +{score} points")
                st.markdown(feedback)
        else:
            st.error("Your neural network is incomplete. Make sure all inputs and outputs are connected.")

def get_nn_problem(level):
    """Get a neural network problem based on the current level"""
    problems = [
        {
            "task": "Identify if an animal is a bird",
            "description": "Create a neural network that can identify if an animal is a bird based on its features.",
            "inputs": ["Has Feathers", "Has Wings", "Can Fly"],
            "outputs": ["Is Bird"],
            "hint": "Connect 'Has Feathers' and 'Has Wings' to output. Flying isn't necessary for all birds (penguins don't fly).",
            "ideal_connections": 3
        },
        {
            "task": "Predict if it will rain",
            "description": "Build a neural network that predicts if it will rain based on weather data.",
            "inputs": ["Cloudy Sky", "Humidity", "Wind Speed", "Temperature"],
            "outputs": ["Will Rain"],
            "hint": "Clouds and humidity are the most important factors. Temperature and wind affect the likelihood too.",
            "ideal_connections": 5
        },
        {
            "task": "Classify fruits by characteristics",
            "description": "Create a neural network that can classify fruits by their characteristics.",
            "inputs": ["Color", "Size", "Sweetness", "Shape"],
            "outputs": ["Is Apple", "Is Banana", "Is Orange"],
            "hint": "Different features matter for different fruits. For example, shape is important for bananas, while color helps identify apples and oranges.",
            "ideal_connections": 8
        }
    ]
    
    level_index = min(level - 1, len(problems) - 1)
    return problems[level_index]

def create_network_visualization(network, input_labels, output_labels):
    """Create a visual representation of the neural network"""
    # Start HTML
    html = """
    <style>
    .nn-container {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .nn-layer {
        display: flex;
        justify-content: space-evenly;
        margin: 10px 0;
    }
    .nn-node {
        width: 80px;
        height: 40px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .nn-input {
        background-color: #AED6F1;
        border: 2px solid #3498DB;
    }
    .nn-hidden {
        background-color: #D7BDE2;
        border: 2px solid #8E44AD;
    }
    .nn-output {
        background-color: #F5CBA7;
        border: 2px solid #E67E22;
    }
    .nn-connection {
        height: 2px;
        background-color: #95A5A6;
        position: absolute;
        transform-origin: 0 0;
        z-index: 1;
    }
    .nn-active {
        background-color: #2ECC71;
    }
    </style>
    
    <div class="nn-container">
        <div class="nn-layer nn-input-layer">
    """
    
    # Add input nodes
    for input_label in input_labels:
        active_class = " nn-active" if input_label in network["input_nodes"] else ""
        html += f'<div class="nn-node nn-input{active_class}">{input_label}</div>'
    
    # Add hidden layer
    html += '</div><div class="nn-layer nn-hidden-layer">'
    hidden_nodes = ["Hidden 1", "Hidden 2", "Hidden 3"]
    
    for hidden_node in hidden_nodes:
        active_class = " nn-active" if hidden_node in network["hidden_nodes"] else ""
        html += f'<div class="nn-node nn-hidden{active_class}">{hidden_node}</div>'
    
    # Add output layer
    html += '</div><div class="nn-layer nn-output-layer">'
    
    for output_label in output_labels:
        active_class = " nn-active" if output_label in network["output_nodes"] else ""
        html += f'<div class="nn-node nn-output{active_class}">{output_label}</div>'
    
    # Close container
    html += '</div></div>'
    
    # Add text representation of connections
    if network["connections"]:
        html += '<div style="background-color: white; border-radius: 5px; padding: 10px; border: 1px solid #ddd;"><strong>Network Connections:</strong><ul>'
        for conn in network["connections"]:
            html += f'<li>{conn}</li>'
        html += '</ul></div>'
    else:
        html += '<div style="background-color: white; border-radius: 5px; padding: 10px; border: 1px solid #ddd; color: #666;"><em>No connections added yet. Use the controls below to add connections between nodes.</em></div>'
    
    return html

def validate_network(network, required_inputs, required_outputs):
    """Check if the network meets minimum requirements"""
    # Check if all input nodes are used
    all_inputs_used = all(input_node in network["input_nodes"] for input_node in required_inputs)
    
    # Check if all output nodes are used
    all_outputs_used = all(output_node in network["output_nodes"] for output_node in required_outputs)
    
    # Check if there's at least one complete path from input to output
    has_complete_path = False
    
    # For simplicity, just check if there's at least one connection to each required output
    for conn in network["connections"]:
        for output in required_outputs:
            if f"Output:{output}" in conn:
                has_complete_path = True
                break
    
    return all_inputs_used and all_outputs_used and has_complete_path and len(network["connections"]) >= len(required_inputs)

def evaluate_network(network, problem):
    """Evaluate the neural network and provide feedback"""
    connections = network["connections"]
    
    # Calculate score based on connections
    ideal_connections = problem["ideal_connections"]
    actual_connections = len(connections)
    
    # Base score on how close the network is to the ideal
    score = 10 - min(5, abs(actual_connections - ideal_connections))
    
    # Generate feedback
    if actual_connections < ideal_connections:
        feedback = "Your network might need more connections to learn effectively."
        suggestions = "Try adding more connections from inputs to hidden nodes and from hidden nodes to outputs."
    elif actual_connections > ideal_connections + 3:
        feedback = "Your network has more connections than needed. Simpler networks are often better!"
        suggestions = "Try removing some less important connections to make your network more efficient."
    else:
        feedback = "Your network has a good number of connections!"
        suggestions = "Your network structure looks good!"
    
    # Additional task-specific feedback
    if problem["task"] == "Identify if an animal is a bird":
        # Check if the key features are connected
        has_feathers_connected = any("Input:Has Feathers" in conn for conn in connections)
        has_wings_connected = any("Input:Has Wings" in conn for conn in connections)
        
        if has_feathers_connected and has_wings_connected:
            feedback += "\n\n✅ Great job connecting the most important features (feathers and wings)!"
            score += 1
        else:
            feedback += "\n\n⚠️ Birds are identified primarily by feathers and wings. Make sure these are well-connected!"
            suggestions += " Focus on connecting 'Has Feathers' and 'Has Wings' to your network."
    
    elif problem["task"] == "Predict if it will rain":
        # Check if key weather factors are connected
        clouds_connected = any("Input:Cloudy Sky" in conn for conn in connections)
        humidity_connected = any("Input:Humidity" in conn for conn in connections)
        
        if clouds_connected and humidity_connected:
            feedback += "\n\n✅ Good choice connecting clouds and humidity - these are the most predictive of rain!"
            score += 1
        else:
            feedback += "\n\n⚠️ Clouds and humidity are the strongest indicators of rain. Make sure they're well-connected!"
            suggestions += " Make sure to connect 'Cloudy Sky' and 'Humidity' to your network."
    
    elif problem["task"] == "Classify fruits by characteristics":
        # Check if outputs are connected to appropriate inputs
        shape_to_banana = any("Input:Shape" in conn and "Output:Is Banana" in conn for conn in connections)
        color_connections = sum(1 for conn in connections if "Input:Color" in conn)
        
        if shape_to_banana:
            feedback += "\n\n✅ Good insight connecting shape to bananas - they have a distinctive shape!"
            score += 1
        
        if color_connections >= 2:
            feedback += "\n\n✅ Using color to help identify multiple fruits is smart!"
            score += 1
    
    # Return results in expected format
    success = score >= 8
    return {
        "success": success,
        "message": feedback,
        "suggestions": suggestions
    }

# Run the main function
if __name__ == "__main__":
    main()
