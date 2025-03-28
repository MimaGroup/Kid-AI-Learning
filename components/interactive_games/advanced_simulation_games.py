import streamlit as st
import random
import time
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

def display_advanced_simulation_games():
    """
    Display advanced AI simulation games for different age groups
    with customizable difficulty levels and interactive learning
    """
    st.markdown("""
    <div style="text-align: center; padding: 10px; background-color: #f9e6ff; border-radius: 10px; margin-bottom: 20px;">
        <h2>Advanced AI Simulation Games</h2>
        <p>Explore complex AI concepts through interactive simulations!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Game selection
    game_options = [
        "AI City Planner", 
        "Evolution Simulator", 
        "Neural Network Playground", 
        "Smart Car Racing"
    ]
    
    selected_game = st.selectbox(
        "Choose a simulation game:",
        game_options
    )
    
    # Age group selector
    age_groups = ["7-8 years", "9-10 years", "11-13 years"]
    age_group = st.radio("Select age group:", age_groups, horizontal=True)
    
    # Adjust difficulty based on age group
    difficulty_mapping = {
        "7-8 years": "Easy",
        "9-10 years": "Medium",
        "11-13 years": "Advanced"
    }
    
    difficulty = difficulty_mapping[age_group]
    
    # Display selected game
    st.markdown(f"### {selected_game}")
    st.markdown(f"**Difficulty:** {difficulty}")
    
    # Game container
    game_container = st.container()
    
    with game_container:
        if selected_game == "AI City Planner":
            display_city_planner_game(difficulty)
        elif selected_game == "Evolution Simulator":
            display_evolution_simulator(difficulty)
        elif selected_game == "Neural Network Playground":
            display_neural_network_playground(difficulty)
        elif selected_game == "Smart Car Racing":
            display_smart_car_racing(difficulty)

def display_city_planner_game(difficulty):
    """
    Display a game where children place elements in a city and an AI simulates
    the effects on traffic, pollution, and happiness
    
    Args:
        difficulty (str): The difficulty level (Easy, Medium, Advanced)
    """
    st.markdown("""
    Build a smart city that uses AI to improve the lives of its citizens! 
    Place different buildings and let the AI predict how they will affect the city.
    """)
    
    # Initialize city data if not present
    if "city_grid" not in st.session_state:
        # Create a 5x5 grid for Easy, 7x7 for Medium, 10x10 for Advanced
        grid_size = 5 if difficulty == "Easy" else (7 if difficulty == "Medium" else 10)
        st.session_state.city_grid = [[None for _ in range(grid_size)] for _ in range(grid_size)]
        st.session_state.city_stats = {
            "happiness": 50,
            "traffic": 50,
            "pollution": 50,
            "energy": 50,
            "population": 1000
        }
    
    # Building options
    building_types = {
        "🏠 House": {"happiness": 5, "traffic": 2, "pollution": 1, "energy": -2, "population": 50},
        "🏢 Office": {"happiness": -2, "traffic": 8, "pollution": 3, "energy": -5, "population": 20},
        "🏭 Factory": {"happiness": -5, "traffic": 5, "pollution": 10, "energy": -10, "population": 30},
        "🌳 Park": {"happiness": 10, "traffic": -2, "pollution": -5, "energy": 0, "population": 0},
        "🔋 Power Plant": {"happiness": -3, "traffic": 1, "pollution": 8, "energy": 25, "population": 5},
        "🏥 Hospital": {"happiness": 8, "traffic": 4, "pollution": 1, "energy": -8, "population": 10},
        "🏪 Store": {"happiness": 3, "traffic": 6, "pollution": 2, "energy": -3, "population": 5}
    }
    
    # Display city stats
    col1, col2 = st.columns([3, 2])
    
    with col1:
        # Display city grid
        grid_size = len(st.session_state.city_grid)
        
        # Create HTML for the grid
        grid_html = f"""
        <div style="display: grid; grid-template-columns: repeat({grid_size}, 1fr); gap: 2px; margin: 20px 0;">
        """
        
        # Add cells
        for i in range(grid_size):
            for j in range(grid_size):
                cell_content = st.session_state.city_grid[i][j] if st.session_state.city_grid[i][j] else "➕"
                cell_color = "#f0f0f0" if not st.session_state.city_grid[i][j] else "#e6f7ff"
                
                grid_html += f"""
                <div style="
                    width: 100%;
                    aspect-ratio: 1;
                    background-color: {cell_color};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    border: 1px solid #ddd;
                    cursor: pointer;
                " onclick="alert('Click the + button below to place a building')">
                    {cell_content}
                </div>
                """
        
        grid_html += "</div>"
        
        st.markdown(grid_html, unsafe_allow_html=True)
        
        # Building placement controls
        st.markdown("### Place a Building")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            building = st.selectbox("Building type:", list(building_types.keys()))
        
        with col2:
            row = st.number_input("Row:", min_value=1, max_value=grid_size, step=1)
        
        with col3:
            col = st.number_input("Column:", min_value=1, max_value=grid_size, step=1)
        
        if st.button("Place Building"):
            # Adjust to 0-based indexing
            row_idx = row - 1
            col_idx = col - 1
            
            # Check if cell is empty
            if st.session_state.city_grid[row_idx][col_idx] is None:
                # Place building
                st.session_state.city_grid[row_idx][col_idx] = building
                
                # Update city stats
                for stat, change in building_types[building].items():
                    st.session_state.city_stats[stat] += change
                
                # Ensure stats stay in range 0-100 (except population)
                for stat in ["happiness", "traffic", "pollution", "energy"]:
                    st.session_state.city_stats[stat] = max(0, min(100, st.session_state.city_stats[stat]))
                
                st.success(f"{building} placed at row {row}, column {col}!")
                st.rerun()
            else:
                st.error("That cell is already occupied!")
    
    with col2:
        st.markdown("### City Statistics")
        
        # Create gauges for each stat
        stats = st.session_state.city_stats
        
        # Happiness gauge
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=stats["happiness"],
            title={"text": "Happiness"},
            gauge={
                "axis": {"range": [0, 100]},
                "bar": {"color": "#91e3a4" if stats["happiness"] > 50 else "#f2a477"},
                "steps": [
                    {"range": [0, 33], "color": "#ffcccb"},
                    {"range": [33, 66], "color": "#ffffcc"},
                    {"range": [66, 100], "color": "#ccffcc"}
                ]
            }
        ))
        fig.update_layout(height=150, margin=dict(l=20, r=20, t=50, b=20))
        st.plotly_chart(fig, use_container_width=True)
        
        # Traffic gauge
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=stats["traffic"],
            title={"text": "Traffic"},
            gauge={
                "axis": {"range": [0, 100]},
                "bar": {"color": "#f2a477" if stats["traffic"] > 50 else "#91e3a4"},
                "steps": [
                    {"range": [0, 33], "color": "#ccffcc"},
                    {"range": [33, 66], "color": "#ffffcc"},
                    {"range": [66, 100], "color": "#ffcccb"}
                ]
            }
        ))
        fig.update_layout(height=150, margin=dict(l=20, r=20, t=50, b=20))
        st.plotly_chart(fig, use_container_width=True)
        
        # Pollution gauge
        fig = go.Figure(go.Indicator(
            mode="gauge+number",
            value=stats["pollution"],
            title={"text": "Pollution"},
            gauge={
                "axis": {"range": [0, 100]},
                "bar": {"color": "#f2a477" if stats["pollution"] > 50 else "#91e3a4"},
                "steps": [
                    {"range": [0, 33], "color": "#ccffcc"},
                    {"range": [33, 66], "color": "#ffffcc"},
                    {"range": [66, 100], "color": "#ffcccb"}
                ]
            }
        ))
        fig.update_layout(height=150, margin=dict(l=20, r=20, t=50, b=20))
        st.plotly_chart(fig, use_container_width=True)
        
        # Population and energy
        st.metric("Population", f"{stats['population']} people")
        st.metric("Energy Balance", f"{stats['energy']}%", f"{'+' if stats['energy'] - 50 > 0 else ''}{stats['energy'] - 50}%")
        
        # AI Advisor
        st.markdown("### 🤖 AI City Advisor")
        
        # Generate advice based on city stats
        advice = generate_city_advice(stats)
        
        st.markdown(f"""
        <div style="background-color: #f0f7ff; padding: 10px; border-radius: 10px; margin-top: 10px;">
            <p style="margin: 0;"><i>"{advice}"</i></p>
        </div>
        """, unsafe_allow_html=True)
        
        # Clear city button
        if st.button("🔄 Reset City"):
            # Reset the grid and stats
            grid_size = len(st.session_state.city_grid)
            st.session_state.city_grid = [[None for _ in range(grid_size)] for _ in range(grid_size)]
            st.session_state.city_stats = {
                "happiness": 50,
                "traffic": 50,
                "pollution": 50,
                "energy": 50,
                "population": 1000
            }
            st.rerun()

def display_evolution_simulator(difficulty):
    """
    Display a simplified evolution simulator where children can set environmental
    conditions and watch how a population adapts over time
    
    Args:
        difficulty (str): The difficulty level (Easy, Medium, Advanced)
    """
    st.markdown("""
    Watch virtual creatures evolve in different environments! 
    This simulator shows how AI can model natural selection and adaptation.
    """)
    
    # Initialize evolution data if not present
    if "evolution_step" not in st.session_state:
        st.session_state.evolution_step = 0
    
    if "creature_population" not in st.session_state:
        # Start with 20 creatures with random traits
        st.session_state.creature_population = initialize_creature_population(20)
    
    if "environment" not in st.session_state:
        # Default environment
        st.session_state.environment = {
            "temperature": 50,  # 0-100, 0=cold, 100=hot
            "food_supply": 50,  # 0-100, 0=scarce, 100=abundant
            "predators": 50,    # 0-100, 0=none, 100=many
            "terrain": "plains"  # plains, forest, desert, water
        }
    
    # Layout
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown("### Evolution Simulation")
        
        # Display current generation info
        generation = st.session_state.evolution_step
        population_size = len(st.session_state.creature_population)
        
        st.markdown(f"""
        <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
            <span style="font-weight: bold;">Generation:</span> {generation} | 
            <span style="font-weight: bold;">Population:</span> {population_size} creatures
        </div>
        """, unsafe_allow_html=True)
        
        # Display creatures (simplified visualization)
        display_creature_population(st.session_state.creature_population)
        
        # Population statistics
        if st.session_state.creature_population:
            st.markdown("### Population Statistics")
            display_population_stats(st.session_state.creature_population)
    
    with col2:
        st.markdown("### Environment Controls")
        
        # Environment settings
        env = st.session_state.environment
        
        # Temperature slider
        temperature = st.slider(
            "Temperature:",
            min_value=0,
            max_value=100,
            value=env["temperature"],
            help="0 = very cold, 100 = very hot"
        )
        
        # Food supply slider
        food_supply = st.slider(
            "Food Supply:",
            min_value=0,
            max_value=100,
            value=env["food_supply"],
            help="0 = very scarce, 100 = very abundant"
        )
        
        # Predator density slider
        predators = st.slider(
            "Predator Density:",
            min_value=0,
            max_value=100,
            value=env["predators"],
            help="0 = no predators, 100 = many predators"
        )
        
        # Terrain selection
        terrain_options = ["plains", "forest", "desert", "water"]
        terrain = st.selectbox(
            "Terrain Type:",
            terrain_options,
            index=terrain_options.index(env["terrain"])
        )
        
        # Update environment
        if (temperature != env["temperature"] or 
            food_supply != env["food_supply"] or 
            predators != env["predators"] or 
            terrain != env["terrain"]):
            
            st.session_state.environment = {
                "temperature": temperature,
                "food_supply": food_supply,
                "predators": predators,
                "terrain": terrain
            }
            
            st.success("Environment updated! Run the simulation to see what happens.")
        
        # Controls
        st.markdown("### Simulation Controls")
        
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🔄 Next Generation"):
                # Evolve the population
                st.session_state.creature_population = evolve_population(
                    st.session_state.creature_population,
                    st.session_state.environment
                )
                st.session_state.evolution_step += 1
                st.rerun()
        
        with col2:
            if st.button("🔄 Simulate 5 Generations"):
                for _ in range(5):
                    st.session_state.creature_population = evolve_population(
                        st.session_state.creature_population,
                        st.session_state.environment
                    )
                    st.session_state.evolution_step += 1
                st.rerun()
        
        # Reset simulation
        if st.button("🔄 Reset Simulation"):
            st.session_state.evolution_step = 0
            st.session_state.creature_population = initialize_creature_population(20)
            st.rerun()
        
        # Explanations based on difficulty
        if difficulty == "Easy":
            st.markdown("""
            ### How It Works
            
            This is like a simple video game where creatures change over time!
            
            - Creatures with helpful traits survive better
            - Survivors have babies that look like them
            - Over time, the whole group changes
            
            This is similar to how AI learns to improve over time!
            """)
        elif difficulty == "Medium":
            st.markdown("""
            ### How It Works
            
            This simulation shows natural selection and genetic algorithms:
            
            - Each creature has different traits (genes)
            - The environment determines which traits are helpful
            - Creatures with better traits have more offspring
            - Mutations introduce new variations
            
            AI uses similar algorithms to find the best solutions!
            """)
        else:  # Advanced
            st.markdown("""
            ### How It Works
            
            This models evolutionary algorithms and reinforcement learning:
            
            - The population represents possible solutions
            - Fitness is calculated based on the environment
            - Selection pressure favors more adapted individuals
            - Crossover and mutation operators create diversity
            
            Modern AI combines evolution-inspired algorithms with other techniques like neural networks!
            """)

def display_neural_network_playground(difficulty):
    """
    Display an interactive neural network playground where kids can
    build and train simple neural networks
    
    Args:
        difficulty (str): The difficulty level (Easy, Medium, Advanced)
    """
    st.markdown("""
    Build your own neural network brain and teach it to recognize patterns!
    See how computers learn to make decisions through training.
    """)
    
    # Set complexity based on difficulty
    if difficulty == "Easy":
        max_layers = 2
        max_neurons = 4
        problems = ["Shape Recognition", "Color Sorting"]
    elif difficulty == "Medium":
        max_layers = 3
        max_neurons = 6
        problems = ["Shape Recognition", "Color Sorting", "Number Prediction", "Animal Classifier"]
    else:  # Advanced
        max_layers = 4
        max_neurons = 8
        problems = ["Shape Recognition", "Color Sorting", "Number Prediction", "Animal Classifier", "Pattern Completion"]
    
    # Layout
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown("### Neural Network Designer")
        
        # Problem selection
        problem = st.selectbox("Choose a problem to solve:", problems)
        
        # Network structure
        st.markdown("#### Network Architecture")
        
        # Initialize network architecture if not present
        if "nn_architecture" not in st.session_state:
            st.session_state.nn_architecture = [2, 3, 1]  # Default: input, hidden, output
            st.session_state.nn_trained = False
            st.session_state.nn_accuracy = 0
        
        # Layer controls
        layers = []
        
        # Input layer (fixed by problem)
        input_size = 2 if problem == "Color Sorting" else (1 if problem == "Number Prediction" else 4)
        layers.append(input_size)
        
        # Hidden layers
        num_hidden_layers = st.slider("Number of hidden layers:", 1, max_layers-1, 1)
        
        for i in range(num_hidden_layers):
            neurons = st.slider(f"Neurons in hidden layer {i+1}:", 1, max_neurons, min(3, max_neurons))
            layers.append(neurons)
        
        # Output layer (fixed by problem)
        output_size = 1 if problem in ["Number Prediction", "Color Sorting"] else (4 if problem == "Animal Classifier" else 3)
        layers.append(output_size)
        
        # Update architecture if changed
        if layers != st.session_state.nn_architecture:
            st.session_state.nn_architecture = layers
            st.session_state.nn_trained = False
            st.session_state.nn_accuracy = 0
        
        # Visualize the network
        st.markdown("#### Network Visualization")
        visualize_neural_network(layers)
    
    with col2:
        st.markdown("### Training Controls")
        
        # Learning parameters based on difficulty
        if difficulty == "Easy":
            st.markdown("Training Settings: Basic")
            learning_rate = 0.1
            epochs = 10
        elif difficulty == "Medium":
            learning_rate = st.slider("Learning Rate:", 0.01, 0.2, 0.1, 0.01)
            epochs = st.slider("Training Epochs:", 5, 20, 10)
        else:  # Advanced
            learning_rate = st.slider("Learning Rate:", 0.01, 0.2, 0.1, 0.01)
            epochs = st.slider("Training Epochs:", 5, 50, 10)
            st.checkbox("Use Momentum", value=True)
            st.slider("Dropout Rate:", 0.0, 0.5, 0.2, 0.1)
        
        # Training data
        st.markdown("#### Training Data")
        st.markdown(f"Sample Size: {100 if difficulty == 'Easy' else (250 if difficulty == 'Medium' else 500)} examples")
        
        # Train button
        if st.button("🧠 Train Network"):
            # Simulate training with progress bar
            progress_bar = st.progress(0)
            for i in range(epochs):
                # Simulate epoch training
                time.sleep(0.1)
                progress_bar.progress((i + 1) / epochs)
            
            # Calculate "accuracy" based on network complexity and learning parameters
            base_accuracy = random.uniform(0.5, 0.7)  # Base accuracy
            
            # Factors that affect accuracy
            complexity_bonus = 0.05 * (sum(layers[1:-1]) / (max_neurons * (max_layers-1)))  # More neurons/layers help
            learning_bonus = 0.1 * (epochs / (20 if difficulty == "Advanced" else 10))  # More epochs help
            problem_penalty = -0.1 if problem in ["Animal Classifier", "Pattern Completion"] else 0  # Harder problems
            random_factor = random.uniform(-0.05, 0.05)  # Random variation
            
            accuracy = min(0.98, max(0.4, base_accuracy + complexity_bonus + learning_bonus + problem_penalty + random_factor))
            
            st.session_state.nn_trained = True
            st.session_state.nn_accuracy = accuracy
            
            st.success(f"Training complete! Accuracy: {accuracy:.1%}")
        
        # Test data
        if st.session_state.nn_trained:
            st.markdown("#### Test Your Network")
            
            if problem == "Shape Recognition":
                test_options = ["Circle", "Square", "Triangle"]
                test_input = st.selectbox("Select a shape to classify:", test_options)
                
                if st.button("Test"):
                    result = simulate_nn_prediction(test_input, problem, st.session_state.nn_accuracy)
                    show_prediction_result(test_input, result, problem)
            
            elif problem == "Number Prediction":
                test_input = st.number_input("Enter a number:", value=5, step=1)
                
                if st.button("Predict Next Number"):
                    result = simulate_nn_prediction(test_input, problem, st.session_state.nn_accuracy)
                    show_prediction_result(test_input, result, problem)
            
            elif problem == "Color Sorting":
                test_options = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]
                test_input = st.selectbox("Select a color to classify:", test_options)
                
                if st.button("Classify"):
                    result = simulate_nn_prediction(test_input, problem, st.session_state.nn_accuracy)
                    show_prediction_result(test_input, result, problem)
        
        # Explanation
        st.markdown("### How Neural Networks Work")
        
        if difficulty == "Easy":
            st.markdown("""
            A neural network is like a robot brain that learns patterns:
            
            1. It has layers of connected dots (neurons)
            2. When you train it, it learns which connections are important
            3. After training, it can recognize new examples
            
            Just like you learn to recognize shapes, neural networks learn to recognize patterns!
            """)
        else:
            st.markdown("""
            Neural networks process information through layers:
            
            1. Input layer receives the data
            2. Hidden layers extract features and patterns
            3. Output layer makes the final prediction
            4. Training adjusts the weights between neurons
            
            This is how computers learn to recognize images, understand language, and make decisions!
            """)

def display_smart_car_racing(difficulty):
    """
    Display a simulation of AI-controlled cars learning to race through a track
    
    Args:
        difficulty (str): The difficulty level (Easy, Medium, Advanced)
    """
    st.markdown("""
    Watch AI-controlled cars learn to navigate a racetrack through reinforcement learning!
    """)
    
    # Initialize simulation data if not present
    if "race_generation" not in st.session_state:
        st.session_state.race_generation = 0
        st.session_state.best_lap_time = None
        st.session_state.top_cars = []
    
    # Track selection
    track_options = ["Oval", "Figure 8", "Mountain Pass"]
    available_tracks = track_options if difficulty == "Advanced" else track_options[:2]
    
    track = st.selectbox("Select a track:", available_tracks)
    
    # Car count based on difficulty
    car_count = 5 if difficulty == "Easy" else (10 if difficulty == "Medium" else 20)
    
    # Display track
    st.markdown(f"### {track} Track")
    
    # Simplified track visualization
    track_html = """
    <div style="background-color: #f0f0f0; border-radius: 10px; padding: 20px; height: 300px; position: relative; overflow: hidden;">
    """
    
    if track == "Oval":
        track_html += """
        <div style="position: absolute; top: 50px; left: 50px; right: 50px; bottom: 50px; border: 10px solid #333; border-radius: 100px;"></div>
        <div style="position: absolute; top: 100px; left: 100px; right: 100px; bottom: 100px; border: 2px dashed white;"></div>
        """
    elif track == "Figure 8":
        track_html += """
        <div style="position: absolute; top: 50px; left: 50px; width: 100px; height: 100px; border: 10px solid #333; border-radius: 50%;"></div>
        <div style="position: absolute; top: 150px; left: 150px; width: 100px; height: 100px; border: 10px solid #333; border-radius: 50%;"></div>
        <div style="position: absolute; top: 100px; left: 100px; width: 100px; height: 100px; border: 10px solid #333;"></div>
        """
    else:  # Mountain Pass
        track_html += """
        <div style="position: absolute; top: 50px; left: 50px; right: 50px; height: 20px; background-color: #333;"></div>
        <div style="position: absolute; top: 50px; right: 50px; width: 20px; height: 100px; background-color: #333;"></div>
        <div style="position: absolute; top: 150px; left: 150px; right: 50px; height: 20px; background-color: #333;"></div>
        <div style="position: absolute; top: 150px; left: 150px; width: 20px; height: 100px; background-color: #333;"></div>
        <div style="position: absolute; top: 250px; left: 50px; right: 50px; height: 20px; background-color: #333;"></div>
        <div style="position: absolute; top: 150px; left: 50px; width: 20px; height: 100px; background-color: #333;"></div>
        <div style="position: absolute; top: 50px; left: 50px; width: 20px; height: 100px; background-color: #333;"></div>
        """
    
    # Add some "cars" based on generation
    if st.session_state.race_generation > 0:
        car_positions = []
        for i in range(min(car_count, st.session_state.race_generation)):
            # Generate random positions along the track for demonstration
            if track == "Oval":
                angle = random.uniform(0, 360)
                radius = random.uniform(50, 100)
                x = 150 + radius * np.cos(np.radians(angle))
                y = 150 + radius * np.sin(np.radians(angle))
            elif track == "Figure 8":
                if random.random() > 0.5:
                    angle = random.uniform(0, 360)
                    x = 100 + 50 * np.cos(np.radians(angle))
                    y = 100 + 50 * np.sin(np.radians(angle))
                else:
                    angle = random.uniform(0, 360)
                    x = 200 + 50 * np.cos(np.radians(angle))
                    y = 200 + 50 * np.sin(np.radians(angle))
            else:  # Mountain Pass
                segments = [(100, 50), (300, 50), (300, 150), (170, 150), (170, 250), (300, 250)]
                segment = random.choice(segments)
                if segment[0] == segment[2]:  # Vertical segment
                    x = segment[0]
                    y = random.uniform(min(segment[1], segment[3]), max(segment[1], segment[3]))
                else:  # Horizontal segment
                    y = segment[1]
                    x = random.uniform(min(segment[0], segment[2]), max(segment[0], segment[2]))
            
            car_positions.append((x, y))
            
            # Add car to the visualization
            car_color = "#ff0000" if i == 0 else ("#ff9900" if i < 3 else "#3366ff")
            track_html += f"""
            <div style="position: absolute; top: {y-5}px; left: {x-5}px; width: 10px; height: 10px; background-color: {car_color}; border-radius: 50%;"></div>
            """
    
    track_html += """
    <div style="position: absolute; bottom: 10px; right: 10px; background-color: rgba(255,255,255,0.7); padding: 5px; border-radius: 5px; font-size: 12px;">
        <span style="display: inline-block; width: 10px; height: 10px; background-color: #ff0000; border-radius: 50%; margin-right: 5px;"></span> Best car
        <span style="display: inline-block; width: 10px; height: 10px; background-color: #ff9900; border-radius: 50%; margin-right: 5px; margin-left: 10px;"></span> Top performers
        <span style="display: inline-block; width: 10px; height: 10px; background-color: #3366ff; border-radius: 50%; margin-right: 5px; margin-left: 10px;"></span> Learning cars
    </div>
    """
    
    track_html += "</div>"
    
    st.markdown(track_html, unsafe_allow_html=True)
    
    # Simulation controls
    col1, col2 = st.columns(2)
    
    with col1:
        # Learning settings
        st.markdown("### Learning Settings")
        
        if difficulty != "Easy":
            learning_rate = st.slider("Learning Rate:", 0.01, 0.2, 0.1, 0.01)
            exploration = st.slider("Exploration Rate:", 0.0, 1.0, 0.3, 0.1,
                               help="Higher values encourage more random exploration of new paths")
        
        # Neural network settings for cars
        if difficulty == "Advanced":
            st.markdown("#### Car Brain Structure")
            st.radio("Sensor Arrangement:", ["Basic (5 sensors)", "Advanced (9 sensors)"])
            st.slider("Memory Length:", 1, 10, 3, help="How many past states the car remembers")
    
    with col2:
        # Simulation buttons
        st.markdown("### Simulation Controls")
        
        if st.button("🏎️ Simulate Next Generation"):
            # Simulate a generation of learning
            with st.spinner("Training cars..."):
                time.sleep(1)  # Simulate processing time
                
                # Update generation counter
                st.session_state.race_generation += 1
                
                # Calculate "best lap time" - improves with each generation
                if st.session_state.best_lap_time is None:
                    st.session_state.best_lap_time = random.uniform(60, 90)  # Initial lap time in seconds
                else:
                    # Improvement gets smaller in later generations
                    improvement = 5 / (st.session_state.race_generation**0.5)
                    st.session_state.best_lap_time -= min(improvement, st.session_state.best_lap_time * 0.1)
                
                # Update top cars
                st.session_state.top_cars = [
                    {"id": f"Car {i+1}", "lap_time": st.session_state.best_lap_time + random.uniform(0, 5), "crashes": random.randint(0, 2)}
                    for i in range(3)
                ]
                
                st.success(f"Generation {st.session_state.race_generation} trained!")
        
        if st.button("🔄 Reset Simulation"):
            st.session_state.race_generation = 0
            st.session_state.best_lap_time = None
            st.session_state.top_cars = []
            st.success("Simulation reset!")
    
    # Results
    if st.session_state.race_generation > 0:
        st.markdown("### Learning Results")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown(f"**Generation:** {st.session_state.race_generation}")
            st.markdown(f"**Best Lap Time:** {st.session_state.best_lap_time:.2f} seconds")
            
            # Progress chart (simulated)
            progress_data = []
            for gen in range(1, st.session_state.race_generation + 1):
                # Calculate a simulated time based on generation
                gen_time = 90 - (30 * (1 - np.exp(-(gen-1) / 5)))
                progress_data.append({"Generation": gen, "Best Lap Time": gen_time})
            
            df = pd.DataFrame(progress_data)
            
            fig = px.line(
                df, 
                x="Generation", 
                y="Best Lap Time",
                markers=True,
                title="Learning Progress"
            )
            
            fig.update_layout(height=300)
            st.plotly_chart(fig, use_container_width=True)
        
        with col2:
            st.markdown("**Top Performing Cars:**")
            
            for car in st.session_state.top_cars:
                st.markdown(f"""
                <div style="background-color: white; border-radius: 5px; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd;">
                    <div style="font-weight: bold;">{car['id']}</div>
                    <div>Lap Time: {car['lap_time']:.2f}s</div>
                    <div>Crashes: {car['crashes']}</div>
                </div>
                """, unsafe_allow_html=True)
    
    # Learning explanation
    if difficulty == "Easy":
        st.markdown("""
        ### How Cars Learn
        
        The cars are using **Reinforcement Learning**, which is like training a pet:
        
        1. Cars try different actions (turn left, right, accelerate, brake)
        2. Good actions (staying on track, going fast) get rewards
        3. Bad actions (crashing, going slow) get penalties
        4. Over time, cars learn what works best
        
        This is the same way robots and game AIs learn!
        """)
    else:
        st.markdown("""
        ### How Cars Learn
        
        The simulation uses **Deep Reinforcement Learning**:
        
        1. Each car has a neural network "brain" that processes sensor inputs
        2. The neural network decides what actions to take (steering, acceleration)
        3. A reward function evaluates performance (track position, speed, crashes)
        4. The best performing cars pass their "knowledge" to the next generation
        5. Some random mutations help discover new strategies
        
        This technology is used in real self-driving cars and robotics!
        """)

# Helper functions for the City Planner game
def generate_city_advice(stats):
    """Generate AI advice based on city stats"""
    advice = "Your city is developing well! "
    
    # Check for issues
    if stats["happiness"] < 40:
        advice += "Your citizens aren't very happy. Try adding more parks and houses. "
    
    if stats["traffic"] > 70:
        advice += "Traffic is becoming a problem. Consider adding parks to reduce congestion. "
    
    if stats["pollution"] > 70:
        advice += "Pollution levels are high. Add more parks to clean the air. "
    
    if stats["energy"] < 30:
        advice += "Your city needs more power! Add a power plant. "
    
    if stats["population"] < 1500:
        advice += "To grow your city, add more houses for people to live in. "
    
    if all(40 <= stats[key] <= 60 for key in ["happiness", "traffic", "pollution", "energy"]):
        advice += "Your city has good balance! Keep developing carefully."
    
    return advice

# Helper functions for the Evolution Simulator
def initialize_creature_population(size):
    """Initialize a population of creatures with random traits"""
    creatures = []
    
    for i in range(size):
        creature = {
            "id": i,
            "size": random.uniform(0.5, 1.5),  # 0.5 = small, 1.5 = large
            "speed": random.uniform(0.5, 1.5),  # 0.5 = slow, 1.5 = fast
            "fur": random.uniform(0.2, 1.0),    # 0.2 = thin fur, 1.0 = thick fur
            "color": random.uniform(0, 1),      # 0 = light, 1 = dark
            "fitness": 0.0                      # Will be calculated based on environment
        }
        creatures.append(creature)
    
    return creatures

def evolve_population(population, environment):
    """Evolve the population based on the environment"""
    # Calculate fitness for each creature
    for creature in population:
        creature["fitness"] = calculate_fitness(creature, environment)
    
    # Sort by fitness
    population.sort(key=lambda x: x["fitness"], reverse=True)
    
    # Keep the top half
    survivors = population[:len(population)//2]
    
    # Create offspring
    new_population = []
    
    # Add survivors to new population
    new_population.extend(survivors)
    
    # Create offspring from survivors
    while len(new_population) < len(population):
        # Select two random parents from survivors
        parent1 = random.choice(survivors)
        parent2 = random.choice(survivors)
        
        # Create child with traits from both parents
        child = {
            "id": len(new_population),
            "size": (parent1["size"] + parent2["size"]) / 2 + random.uniform(-0.1, 0.1),
            "speed": (parent1["speed"] + parent2["speed"]) / 2 + random.uniform(-0.1, 0.1),
            "fur": (parent1["fur"] + parent2["fur"]) / 2 + random.uniform(-0.1, 0.1),
            "color": (parent1["color"] + parent2["color"]) / 2 + random.uniform(-0.1, 0.1),
            "fitness": 0.0
        }
        
        # Ensure traits are within bounds
        child["size"] = max(0.2, min(2.0, child["size"]))
        child["speed"] = max(0.2, min(2.0, child["speed"]))
        child["fur"] = max(0.1, min(1.0, child["fur"]))
        child["color"] = max(0, min(1, child["color"]))
        
        new_population.append(child)
    
    return new_population

def calculate_fitness(creature, environment):
    """Calculate fitness of a creature in the given environment"""
    fitness = 1.0  # Base fitness
    
    # Temperature adaptation
    if environment["temperature"] < 30:  # Cold environment
        fitness += (creature["fur"] - 0.5) * 0.5  # Thick fur is good in cold
    elif environment["temperature"] > 70:  # Hot environment
        fitness += (0.5 - creature["fur"]) * 0.5  # Thin fur is good in heat
    
    # Food supply adaptation
    if environment["food_supply"] < 30:  # Scarce food
        fitness += (creature["size"] - 1.0) * -0.5  # Smaller is better when food is scarce
    else:
        fitness += (creature["size"] - 1.0) * 0.3  # Larger is better when food is plentiful
    
    # Predator adaptation
    if environment["predators"] > 70:  # Many predators
        fitness += (creature["speed"] - 1.0) * 0.7  # Fast is good with predators
    else:
        fitness += (creature["speed"] - 1.0) * 0.2  # Speed less important with fewer predators
    
    # Terrain adaptation
    if environment["terrain"] == "desert":
        fitness += (0.3 - creature["fur"]) * 0.4  # Less fur in desert
        fitness += (0.7 - creature["color"]) * 0.4  # Lighter color in desert
    elif environment["terrain"] == "forest":
        fitness += (creature["color"] - 0.5) * 0.4  # Darker color in forest
    elif environment["terrain"] == "water":
        fitness += (creature["size"] - 1.0) * -0.5  # Smaller in water
        fitness += (creature["fur"] - 0.5) * -0.6  # Less fur in water
    
    # Add some randomness
    fitness += random.uniform(-0.1, 0.1)
    
    return max(0.1, fitness)  # Ensure minimum fitness

def display_creature_population(population):
    """Display a visual representation of the creature population"""
    if not population:
        return
    
    # Create a grid layout for creatures
    rows = 4
    cols = 5
    
    # Create HTML grid
    grid_html = f"""
    <div style="display: grid; grid-template-columns: repeat({cols}, 1fr); gap: 10px; margin: 20px 0;">
    """
    
    # Add creatures to grid
    for i, creature in enumerate(population[:rows*cols]):  # Show at most rows*cols creatures
        # Calculate color based on creature traits
        r = int(255 * (1 - creature["color"]))
        g = int(155 + 100 * creature["fur"])
        b = int(255 * (1 - creature["color"] * 0.5))
        color = f"rgb({r}, {g}, {b})"
        
        # Calculate size based on creature size trait
        size_px = int(30 + creature["size"] * 20)
        
        # Create creature element
        grid_html += f"""
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="
                width: {size_px}px;
                height: {size_px}px;
                background-color: {color};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: {10 + creature['size'] * 4}px;
            ">
                👁️
            </div>
            <div style="font-size: 10px; margin-top: 5px;">Fitness: {creature['fitness']:.2f}</div>
        </div>
        """
    
    grid_html += "</div>"
    
    st.markdown(grid_html, unsafe_allow_html=True)

def display_population_stats(population):
    """Display statistics about the population"""
    # Calculate averages
    avg_size = sum(c["size"] for c in population) / len(population)
    avg_speed = sum(c["speed"] for c in population) / len(population)
    avg_fur = sum(c["fur"] for c in population) / len(population)
    avg_color = sum(c["color"] for c in population) / len(population)
    avg_fitness = sum(c["fitness"] for c in population) / len(population)
    
    # Create a radar chart of traits
    categories = ["Size", "Speed", "Fur Thickness", "Color Darkness", "Fitness"]
    values = [avg_size/2, avg_speed/2, avg_fur, avg_color, avg_fitness/3]
    
    # Add the first value at the end to close the loop
    categories.append(categories[0])
    values.append(values[0])
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
        r=values,
        theta=categories,
        fill='toself',
        fillcolor='rgba(64, 224, 208, 0.5)',
        line=dict(color='rgb(64, 224, 208)', width=2),
        name='Population Traits'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 1]
            )
        ),
        showlegend=False,
        height=300,
        margin=dict(l=10, r=10, t=30, b=10)
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Show trait distribution
    col1, col2 = st.columns(2)
    
    with col1:
        trait = st.selectbox("Select trait to view distribution:", ["Size", "Speed", "Fur", "Color"])
        
        trait_mapping = {"Size": "size", "Speed": "speed", "Fur": "fur", "Color": "color"}
        trait_key = trait_mapping[trait]
        
        # Extract trait values
        trait_values = [c[trait_key] for c in population]
        
        # Create histogram
        fig = px.histogram(
            trait_values,
            nbins=10,
            title=f"{trait} Distribution",
            labels={"value": trait, "count": "Number of Creatures"}
        )
        
        fig.update_layout(height=200, margin=dict(l=10, r=10, t=30, b=10))
        st.plotly_chart(fig, use_container_width=True)

# Helper functions for the Neural Network Playground
def visualize_neural_network(layers):
    """Create a visual representation of a neural network"""
    max_neurons = max(layers)
    layer_count = len(layers)
    
    # Create HTML for visualization
    nn_html = f"""
    <div style="display: flex; justify-content: space-between; height: 200px; margin: 20px 0; background-color: white; padding: 20px; border-radius: 10px;">
    """
    
    # Add layers
    for layer_idx, neuron_count in enumerate(layers):
        nn_html += f"""
        <div style="display: flex; flex-direction: column; justify-content: center; flex: 1;">
        """
        
        # Layer label
        if layer_idx == 0:
            layer_name = "Input Layer"
        elif layer_idx == len(layers) - 1:
            layer_name = "Output Layer"
        else:
            layer_name = f"Hidden Layer {layer_idx}"
        
        nn_html += f"""
        <div style="text-align: center; font-size: 12px; margin-bottom: 10px;">{layer_name}</div>
        """
        
        # Add neurons
        for i in range(neuron_count):
            # Position neurons evenly
            top_margin = (100 - (neuron_count * 30)) / 2 + (i * 30)
            
            nn_html += f"""
            <div style="
                width: 25px;
                height: 25px;
                background-color: #4287f5;
                border-radius: 50%;
                margin: 5px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 10px;
                font-weight: bold;
            ">
                {i+1}
            </div>
            """
        
        nn_html += "</div>"
        
        # Add connections between layers
        if layer_idx < layer_count - 1:
            nn_html += """
            <div style="display: flex; flex-direction: column; justify-content: center;">
            """
            
            # Add connection lines (simplified)
            nn_html += """
            <div style="width: 20px; height: 2px; background-color: #ddd; margin: 5px 0;"></div>
            <div style="width: 20px; height: 2px; background-color: #ddd; margin: 5px 0;"></div>
            <div style="width: 20px; height: 2px; background-color: #ddd; margin: 5px 0;"></div>
            """
            
            nn_html += "</div>"
    
    nn_html += "</div>"
    
    st.markdown(nn_html, unsafe_allow_html=True)

def simulate_nn_prediction(test_input, problem, accuracy):
    """Simulate a neural network prediction"""
    # Generate simulated prediction based on input and accuracy
    if problem == "Shape Recognition":
        # Map input to expected output
        expected_output = "Circle" if test_input == "Circle" else ("Square" if test_input == "Square" else "Triangle")
        
        # With probability based on accuracy, return correct answer
        if random.random() < accuracy:
            return expected_output
        else:
            options = ["Circle", "Square", "Triangle"]
            options.remove(expected_output)
            return random.choice(options)
    
    elif problem == "Number Prediction":
        # Based on input number, predict the next number in a sequence
        # Simplified: input + 2 for even numbers, input + 3 for odd numbers
        expected_output = test_input + 2 if test_input % 2 == 0 else test_input + 3
        
        # Add random error based on accuracy
        if random.random() < accuracy:
            return expected_output
        else:
            # Random error within ±3
            error = random.choice([-3, -2, -1, 1, 2, 3])
            return expected_output + error
    
    elif problem == "Color Sorting":
        # Simplified: sort colors into "warm" or "cool"
        warm_colors = ["Red", "Orange", "Yellow"]
        cool_colors = ["Green", "Blue", "Purple"]
        
        expected_output = "Warm" if test_input in warm_colors else "Cool"
        
        # With probability based on accuracy, return correct answer
        if random.random() < accuracy:
            return expected_output
        else:
            return "Cool" if expected_output == "Warm" else "Warm"
    
    # Default fallback
    return "Unknown"

def show_prediction_result(test_input, result, problem):
    """Display the prediction result"""
    # Format result display based on problem type
    if problem == "Shape Recognition":
        st.markdown(f"""
        <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 10px;">
            <p style="margin: 0; font-weight: bold;">Input: {test_input}</p>
            <p style="margin: 5px 0 0 0;">Network predicts this is a: <span style="font-weight: bold; color: #4287f5;">{result}</span></p>
        </div>
        """, unsafe_allow_html=True)
    
    elif problem == "Number Prediction":
        st.markdown(f"""
        <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 10px;">
            <p style="margin: 0; font-weight: bold;">Input: {test_input}</p>
            <p style="margin: 5px 0 0 0;">Network predicts the next number is: <span style="font-weight: bold; color: #4287f5;">{result}</span></p>
        </div>
        """, unsafe_allow_html=True)
    
    elif problem == "Color Sorting":
        color_display = f"<span style='color: {test_input.lower()};'>■</span> {test_input}"
        st.markdown(f"""
        <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 10px;">
            <p style="margin: 0; font-weight: bold;">Input: {color_display}</p>
            <p style="margin: 5px 0 0 0;">Network classifies this as a: <span style="font-weight: bold; color: #4287f5;">{result} color</span></p>
        </div>
        """, unsafe_allow_html=True)