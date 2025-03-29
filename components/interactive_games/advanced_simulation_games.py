import streamlit as st
import random
import time
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

def display_advanced_simulation_games():
    """Display advanced AI simulation games for different age groups"""
    st.markdown("## Advanced AI Simulation Games")
    
    # Age group selection
    age_group = st.radio(
        "Select age group:",
        ["7-9 years", "10-13 years"],
        horizontal=True
    )
    
    # Display appropriate games based on age group
    st.markdown("### Available Simulation Games")
    
    if age_group == "7-9 years":
        display_younger_games()
    else:
        display_older_games()

def display_younger_games():
    """Display simulation games for 7-9 year olds"""
    # Create a 2-column layout for game cards
    col1, col2 = st.columns(2)
    
    # First game card
    with col1:
        st.markdown("""
        <div style="border: 2px solid #4287f5; border-radius: 10px; padding: 15px;">
            <h3 style="color: #4287f5; margin-top: 0;">Evolving Creatures</h3>
            <p>Create simple creatures that learn to walk by themselves using a genetic algorithm.</p>
            <div style="text-align: center; margin: 15px 0;">
                <span style="font-size: 40px;">🦎</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <span style="background-color: #4287f5; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Easy to Learn
                </span>
                <span style="background-color: #f58c42; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Evolution AI
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Play Evolving Creatures"):
            st.session_state.selected_game = "evolving_creatures"
    
    # Second game card
    with col2:
        st.markdown("""
        <div style="border: 2px solid #42f5b3; border-radius: 10px; padding: 15px;">
            <h3 style="color: #42f5b3; margin-top: 0;">Smart City Builder</h3>
            <p>Build a small city and watch AI cars learn to navigate through your streets.</p>
            <div style="text-align: center; margin: 15px 0;">
                <span style="font-size: 40px;">🏙️</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <span style="background-color: #42f5b3; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Creative
                </span>
                <span style="background-color: #f542a7; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Reinforcement Learning
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Play Smart City Builder"):
            st.session_state.selected_game = "smart_city"
    
    # Display the selected game
    if "selected_game" in st.session_state:
        st.markdown("---")
        if st.session_state.selected_game == "evolving_creatures":
            display_evolving_creatures_game(age_group="younger")
        elif st.session_state.selected_game == "smart_city":
            display_smart_city_game(age_group="younger")

def display_older_games():
    """Display simulation games for 10-13 year olds"""
    # Create a 2-column layout for game cards
    col1, col2 = st.columns(2)
    
    # First game card
    with col1:
        st.markdown("""
        <div style="border: 2px solid #9542f5; border-radius: 10px; padding: 15px;">
            <h3 style="color: #9542f5; margin-top: 0;">Neural Network Playground</h3>
            <p>Build and train your own neural network to solve image classification problems.</p>
            <div style="text-align: center; margin: 15px 0;">
                <span style="font-size: 40px;">🧠</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <span style="background-color: #9542f5; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Advanced
                </span>
                <span style="background-color: #42adf5; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Deep Learning
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Play Neural Network Playground"):
            st.session_state.selected_game = "neural_network"
    
    # Second game card
    with col2:
        st.markdown("""
        <div style="border: 2px solid #f54263; border-radius: 10px; padding: 15px;">
            <h3 style="color: #f54263; margin-top: 0;">Genetic Algorithm Lab</h3>
            <p>Design experiments where AI solves problems through evolution and natural selection.</p>
            <div style="text-align: center; margin: 15px 0;">
                <span style="font-size: 40px;">🧬</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <span style="background-color: #f54263; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Challenging
                </span>
                <span style="background-color: #42f5e6; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    Evolutionary AI
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Play Genetic Algorithm Lab"):
            st.session_state.selected_game = "genetic_algorithm"
    
    # Display the selected game
    if "selected_game" in st.session_state:
        st.markdown("---")
        if st.session_state.selected_game == "neural_network":
            display_neural_network_game(age_group="older")
        elif st.session_state.selected_game == "genetic_algorithm":
            display_genetic_algorithm_game(age_group="older")

def display_evolving_creatures_game(age_group):
    """Display the Evolving Creatures game"""
    st.markdown("## Evolving Creatures Simulation")
    
    st.markdown("""
    In this game, you'll create simple creatures that learn to walk all by themselves!
    
    This uses a type of AI called a **Genetic Algorithm**, which works like this:
    
    1. We start with a group of random creatures
    2. We test how well each creature can walk
    3. We keep the best walkers and let them have "baby" creatures
    4. The babies have similar but slightly different bodies
    5. We test the babies and keep the best ones
    6. After many generations, our creatures get really good at walking!
    
    This is similar to how animals evolved in nature over millions of years!
    """)
    
    # Game controls
    st.markdown("### Create Your First Generation")
    
    col1, col2 = st.columns(2)
    
    with col1:
        creature_count = st.slider("Number of creatures:", min_value=5, max_value=20, value=10)
        mutation_rate = st.slider("Mutation rate:", min_value=1, max_value=10, value=5, 
                                  help="Higher values mean more random changes in each generation")
    
    with col2:
        creature_parts = st.multiselect(
            "Creature body parts:",
            ["Legs", "Arms", "Tail", "Head", "Body"],
            default=["Legs", "Body", "Head"]
        )
        
        environment = st.selectbox(
            "Environment:",
            ["Flat Ground", "Hills", "Water", "Obstacles"]
        )
    
    # Start simulation button
    if st.button("Start Evolution Simulation"):
        # Show a progress bar for "generating creatures"
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        status_text.text("Generating first generation of creatures...")
        for i in range(100):
            # Update progress bar
            progress_bar.progress(i + 1)
            time.sleep(0.01)
        
        status_text.text("First generation created!")
        
        # Show generation results
        display_generation_results(1, creature_count, mutation_rate, creature_parts, environment)
        
        # Continue evolution button
        if st.button("Evolve Next Generation"):
            status_text.text("Evolving creatures...")
            for i in range(100):
                # Update progress bar
                progress_bar.progress(i + 1)
                time.sleep(0.01)
            
            status_text.text("Evolution complete!")
            
            # Show improved generation results
            display_generation_results(2, creature_count, mutation_rate, creature_parts, environment, improved=True)
    
    # Explanation box
    with st.expander("How Genetic Algorithms Work"):
        st.markdown("""
        Genetic algorithms are inspired by how living things evolve in nature:
        
        1. **Initial Population**: Start with a variety of random solutions
        2. **Fitness Testing**: Test how good each solution is at solving the problem
        3. **Selection**: Choose the best solutions to become "parents"
        4. **Crossover**: Combine parts of two good solutions to make new ones
        5. **Mutation**: Make small random changes to keep variety
        6. **Repeat**: Test the new generation and continue the process
        
        After many generations, the solutions get better and better!
        
        This is used in real AI to:
        - Design efficient shapes for cars and airplanes
        - Create robots that can walk well
        - Find the best strategy for games
        - Optimize schedules and routes
        """)

def display_generation_results(generation, creature_count, mutation_rate, creature_parts, environment, improved=False):
    """Display the results of a generation of creatures"""
    st.markdown(f"### Generation {generation} Results")
    
    # Create a box showing stats
    col1, col2, col3 = st.columns(3)
    
    with col1:
        # Better stats for the second generation
        if improved:
            average_distance = random.uniform(15.0, 25.0)
            max_distance = random.uniform(30.0, 45.0)
        else:
            average_distance = random.uniform(5.0, 15.0)
            max_distance = random.uniform(10.0, 30.0)
        
        st.metric(
            "Average Distance", 
            f"{average_distance:.1f} meters",
            f"{'+' if improved else ''}{(average_distance*0.3 if improved else 0):.1f} m"
        )
    
    with col2:
        st.metric(
            "Best Creature", 
            f"{max_distance:.1f} meters",
            f"{'+' if improved else ''}{(max_distance*0.2 if improved else 0):.1f} m"
        )
    
    with col3:
        survivors = int(creature_count * 0.4)
        st.metric(
            "Survivors", 
            f"{survivors}/{creature_count}",
            None
        )
    
    # Create a chart showing the distribution of walking distances
    distances = []
    for i in range(creature_count):
        # Better performance in later generations
        if improved:
            base = random.uniform(10.0, 20.0)
            # A few really good performers
            if i < creature_count * 0.2:
                base += random.uniform(15.0, 25.0)
        else:
            base = random.uniform(0.0, 10.0)
            # A few decent performers
            if i < creature_count * 0.2:
                base += random.uniform(5.0, 20.0)
        
        distances.append(base)
    
    # Sort distances for the chart
    distances.sort(reverse=True)
    
    # Create a DataFrame
    df = pd.DataFrame({
        'Creature': [f"Creature {i+1}" for i in range(creature_count)],
        'Distance (meters)': distances
    })
    
    # Create a bar chart
    fig = px.bar(
        df, 
        x='Creature', 
        y='Distance (meters)',
        color='Distance (meters)',
        color_continuous_scale=px.colors.sequential.Viridis,
        title=f"Generation {generation} Performance"
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Show the top performers
    st.markdown("### Top Performers")
    
    top_n = min(3, creature_count)
    top_performers_cols = st.columns(top_n)
    
    for i in range(top_n):
        with top_performers_cols[i]:
            # Create a colorful box for each top performer
            color = "#42f5b3" if i == 0 else "#4287f5" if i == 1 else "#f542a7"
            
            st.markdown(f"""
            <div style="border: 2px solid {color}; border-radius: 10px; padding: 15px; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 10px;">🦎</div>
                <div style="font-weight: bold; margin-bottom: 5px;">Creature {i+1}</div>
                <div style="font-size: 20px; font-weight: bold; color: {color};">{distances[i]:.1f} m</div>
                <div style="font-size: 12px; margin-top: 10px;">
                    Legs: {random.randint(2, 6)}<br>
                    Body Length: {random.randint(1, 5)}<br>
                    {"Tail: Yes" if "Tail" in creature_parts else ""}
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    # Explanation of results
    if improved:
        st.markdown("""
        #### Evolution is Working!
        
        Notice how the second generation performs better than the first. This is because:
        
        1. We kept the best creatures from the first generation
        2. These creatures had "babies" with similar traits
        3. Small mutations (random changes) allowed for new improvements
        
        In real genetic algorithms, we would continue this process for many generations until the creatures become expert walkers!
        """)
    else:
        st.markdown("""
        #### First Generation Results
        
        The first generation doesn't walk very well because their body shapes were created randomly.
        
        Some creatures got lucky and had better body shapes than others. We'll use these top performers
        to create the next generation!
        """)

def display_smart_city_game(age_group):
    """Display the Smart City Builder game"""
    st.markdown("## Smart City Builder with AI Cars")
    
    st.markdown("""
    In this simulation, you'll build a small city with roads, and watch AI-powered cars learn to drive through it!
    
    This uses **Reinforcement Learning**, which works like this:
    
    1. The AI cars start by driving randomly
    2. They get rewards for good driving (staying on roads, reaching destinations)
    3. They get penalties for bad driving (crashes, going off-road)
    4. Over time, they learn which actions lead to more rewards
    5. Eventually, they become expert drivers in your city!
    
    This is similar to how you might train a dog with treats for good behavior!
    """)
    
    # City design options
    st.markdown("### Design Your City")
    
    col1, col2 = st.columns(2)
    
    with col1:
        city_size = st.select_slider(
            "City size:",
            options=["Small", "Medium", "Large"],
            value="Medium"
        )
        
        traffic_lights = st.checkbox("Add traffic lights", value=True)
        roundabouts = st.checkbox("Add roundabouts", value=False)
    
    with col2:
        num_cars = st.slider("Number of AI cars:", min_value=2, max_value=20, value=5)
        
        car_speed = st.select_slider(
            "Car learning speed:",
            options=["Slow", "Medium", "Fast"],
            value="Medium",
            help="How quickly the cars learn from their mistakes"
        )
    
    # City map display (simplified version)
    st.markdown("### Your City Map")
    
    # Use a placeholder image for now
    st.image("https://via.placeholder.com/800x400.png?text=City+Map+(Placeholder)")
    
    # Navigation buttons
    build_col, train_col = st.columns(2)
    
    with build_col:
        if st.button("Edit City Layout"):
            st.session_state.city_mode = "edit"
    
    with train_col:
        if st.button("Train AI Cars"):
            st.session_state.city_mode = "train"
    
    # City editing mode
    if st.session_state.get("city_mode") == "edit":
        st.markdown("### Edit City Layout")
        
        st.markdown("""
        Use the tools below to design your city:
        
        - **Roads**: Click and drag to create roads
        - **Buildings**: Click to place different types of buildings
        - **Traffic Controls**: Add traffic lights, stop signs, etc.
        """)
        
        # Placeholder for city editor
        st.info("In a complete game, you would have interactive tools to design your city here.")
        
        # Example editor interface
        edit_col1, edit_col2, edit_col3 = st.columns(3)
        
        with edit_col1:
            st.selectbox("Road Type:", ["Straight Road", "Curved Road", "Intersection", "Highway"])
        
        with edit_col2:
            st.selectbox("Building Type:", ["House", "Store", "Office", "Park"])
        
        with edit_col3:
            st.selectbox("Traffic Controls:", ["Traffic Light", "Stop Sign", "Yield Sign", "Crosswalk"])
    
    # Training mode
    elif st.session_state.get("city_mode") == "train":
        st.markdown("### AI Car Training")
        
        st.markdown("""
        Watch as the AI cars learn to navigate your city! The cars use reinforcement learning to improve over time.
        """)
        
        # Learning progress
        st.markdown("#### Learning Progress")
        
        # Simulate training progress
        training_progress = st.progress(0)
        training_status = st.empty()
        
        if st.button("Start Training"):
            for i in range(100):
                # Update progress bar
                training_progress.progress(i + 1)
                
                # Update status text
                if i < 20:
                    training_status.text("Cars are exploring randomly...")
                elif i < 50:
                    training_status.text("Cars are learning basic navigation...")
                elif i < 80:
                    training_status.text("Cars are optimizing routes...")
                else:
                    training_status.text("Cars are mastering advanced driving...")
                
                time.sleep(0.05)
            
            training_status.text("Training complete! Cars have learned to navigate your city.")
        
        # Training statistics (would be real in a complete implementation)
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("Success Rate", "78%", "+23%")
        
        with col2:
            st.metric("Avg. Trip Time", "45 sec", "-12 sec")
        
        with col3:
            st.metric("Collisions", "2", "-15")
        
        # Explanation of what's happening
        with st.expander("How the AI Cars Learn"):
            st.markdown("""
            The AI cars in this simulation learn using Q-learning, a type of reinforcement learning:
            
            1. Each car has a "Q-table" that stores values for each action in each situation
            2. At first, the Q-table values are random, so cars drive randomly
            3. As cars drive, they update their Q-table based on rewards and penalties
            4. Over time, the Q-table guides cars to take better actions
            
            For example, if a car gets a penalty for going through a red light, it updates its Q-table to avoid that action in the future.
            
            This is similar to how autonomous vehicles learn in the real world, but real self-driving cars use more complex neural networks instead of Q-tables.
            """)

def display_neural_network_game(age_group):
    """Display the Neural Network Playground game"""
    st.markdown("## Neural Network Playground")
    
    st.markdown("""
    In this advanced simulation, you'll build and train your own neural network to recognize images!
    
    A **Neural Network** is a type of AI that's inspired by how the human brain works:
    
    1. It has "neurons" organized in layers
    2. Each neuron connects to neurons in other layers
    3. When you train it with examples, it learns which connections are important
    4. After training, it can recognize patterns it has never seen before
    
    This is the technology behind many AI systems like image recognition, language translation, and more!
    """)
    
    # Neural network design
    st.markdown("### Design Your Neural Network")
    
    # Description of the task
    st.markdown("""
    You'll create a neural network to recognize handwritten digits (0-9).
    This is a classic AI task called MNIST digit recognition.
    """)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        # Network architecture
        st.markdown("#### Network Architecture")
        
        hidden_layers = st.slider("Hidden Layers:", min_value=1, max_value=5, value=2)
        
        neurons_per_layer = []
        for i in range(hidden_layers):
            neurons_per_layer.append(
                st.slider(f"Neurons in Layer {i+1}:", min_value=4, max_value=128, value=32, step=4)
            )
        
        activation_function = st.selectbox(
            "Activation Function:",
            ["ReLU", "Sigmoid", "Tanh"],
            index=0
        )
    
    with col2:
        # Training parameters
        st.markdown("#### Training Parameters")
        
        learning_rate = st.slider(
            "Learning Rate:",
            min_value=0.001, 
            max_value=0.1,
            value=0.01,
            format="%.3f"
        )
        
        batch_size = st.selectbox(
            "Batch Size:",
            [16, 32, 64, 128],
            index=1
        )
        
        epochs = st.slider("Training Epochs:", min_value=1, max_value=20, value=5)
        
        # Add data augmentation option
        data_augmentation = st.checkbox("Use Data Augmentation", value=True,
                                        help="Generate more training examples by rotating and scaling existing ones")
    
    # Visualize network architecture
    st.markdown("### Neural Network Visualization")
    
    # Create a visualization of the network architecture
    fig = go.Figure()
    
    # Constants for visualization
    layers = [784] + neurons_per_layer + [10]  # Input layer (28x28=784) + hidden layers + output layer (10 digits)
    layer_names = ["Input"] + [f"Hidden {i+1}" for i in range(hidden_layers)] + ["Output"]
    layer_colors = ["#4287f5", "#42f5b3", "#f542a7", "#f5d742", "#f54242", "#9542f5", "#42d7f5"]
    
    # Position nodes in each layer
    x_positions = []
    y_positions = []
    node_colors = []
    node_sizes = []
    node_texts = []
    layer_indices = []
    
    # Maximum number of nodes to display per layer
    max_display_nodes = 10
    
    for layer_idx, num_nodes in enumerate(layers):
        # Handle large layers by showing fewer nodes
        if num_nodes > max_display_nodes:
            # Show max_display_nodes
            display_nodes = max_display_nodes
            # Add text to indicate there are more nodes
            extra_text = f"+ {num_nodes - max_display_nodes} more"
        else:
            display_nodes = num_nodes
            extra_text = None
        
        # Calculate vertical spacing for this layer
        spacing = 0.9 / (display_nodes + 1)
        
        for i in range(display_nodes):
            # Place nodes evenly along the y-axis
            y_pos = 0.05 + (i + 1) * spacing
            
            # Add node
            x_positions.append(layer_idx / (len(layers) - 1))
            y_positions.append(y_pos)
            node_colors.append(layer_colors[layer_idx % len(layer_colors)])
            
            # Adjust node size based on layer type
            if layer_idx == 0:  # Input layer
                node_sizes.append(8)  # Smaller nodes for input layer
                node_texts.append("Input")
            elif layer_idx == len(layers) - 1:  # Output layer
                node_sizes.append(12)
                node_texts.append(str(i))  # Digit for output layer
            else:  # Hidden layers
                node_sizes.append(10)
                node_texts.append("")
            
            layer_indices.append(layer_idx)
        
        # Add text for additional nodes if needed
        if extra_text:
            x_positions.append(layer_idx / (len(layers) - 1))
            y_positions.append(0.05 + (display_nodes + 1) * spacing)
            node_colors.append("rgba(200, 200, 200, 0.5)")
            node_sizes.append(5)
            node_texts.append(extra_text)
            layer_indices.append(layer_idx)
    
    # Add nodes to the figure
    fig.add_trace(go.Scatter(
        x=x_positions,
        y=y_positions,
        mode='markers+text',
        marker=dict(
            size=node_sizes,
            color=node_colors,
            line=dict(width=1, color='#333')
        ),
        text=node_texts,
        textposition="bottom center",
        textfont=dict(size=8),
        hoverinfo='none'
    ))
    
    # Add layer labels
    for i, name in enumerate(layer_names):
        fig.add_annotation(
            x=i / (len(layers) - 1),
            y=0.02,
            text=name,
            showarrow=False,
            font=dict(size=12)
        )
    
    # Update layout
    fig.update_layout(
        showlegend=False,
        height=300,
        plot_bgcolor='rgba(248, 249, 250, 1)',
        margin=dict(l=20, r=20, t=20, b=40),
        xaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[-0.05, 1.05]
        ),
        yaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            range=[-0.05, 1.05]
        )
    )
    
    # Display the network visualization
    st.plotly_chart(fig, use_container_width=True)
    
    # Training button
    if st.button("Train Neural Network"):
        # Training progress
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        # Simulate the training process
        current_accuracy = 0.0
        for i in range(epochs):
            status_text.text(f"Training Epoch {i+1}/{epochs}...")
            
            # Simulate epoch progress
            for j in range(100):
                progress_bar.progress(j + 1)
                time.sleep(0.01)
            
            # Simulate increased accuracy with each epoch
            base_accuracy = 0.7 + (0.2 * i / epochs)  # Start at ~70%, approach ~90%
            
            # Modify based on network design choices
            if hidden_layers >= 3:
                base_accuracy += 0.02  # Deeper networks may perform better
            
            if activation_function == "ReLU":
                base_accuracy += 0.01  # ReLU often performs well
            
            if data_augmentation:
                base_accuracy += 0.02  # Data augmentation helps
            
            # Add some randomness
            current_accuracy = min(0.99, base_accuracy + random.uniform(-0.03, 0.03))
            
            # Show epoch results
            status_text.text(f"Epoch {i+1}/{epochs} complete - Accuracy: {current_accuracy:.2%}")
            time.sleep(1)
        
        status_text.text(f"Training complete! Final accuracy: {current_accuracy:.2%}")
        
        # Display test results section
        display_neural_network_results(current_accuracy, activation_function, data_augmentation)

def display_neural_network_results(accuracy, activation_function, data_augmentation):
    """Display the results of neural network training"""
    st.markdown("### Testing Your Neural Network")
    
    # Display some test images
    st.markdown("#### Test Images")
    
    # Create a grid of digits
    test_cols = st.columns(5)
    
    # For each test case
    for i, col in enumerate(test_cols):
        digit = i * 2  # 0, 2, 4, 6, 8
        with col:
            # Simplified - would use real digit images in a full implementation
            st.markdown(f"""
            <div style="text-align: center; border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px;">
                <div style="font-size: 36px;">{digit}</div>
                <div style="margin-top: 10px;">
                    <span style="font-weight: bold;">Prediction:</span> {digit}
                </div>
                <div style="font-size: 12px; color: green;">
                    {random.uniform(max(0.7, accuracy-0.1), min(0.99, accuracy+0.05)):.1%} confident
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    # Performance metrics
    st.markdown("#### Performance Metrics")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Accuracy", f"{accuracy:.2%}", None)
    
    with col2:
        precision = min(0.99, accuracy + random.uniform(-0.03, 0.03))
        st.metric("Precision", f"{precision:.2%}", None)
    
    with col3:
        recall = min(0.99, accuracy + random.uniform(-0.05, 0.01))
        st.metric("Recall", f"{recall:.2%}", None)
    
    # Confusion matrix
    st.markdown("#### Confusion Matrix")
    
    # Generate a simplified confusion matrix
    # In a real app, this would show actual model predictions
    matrix_size = 10  # 0-9 digits
    confusion_matrix = np.zeros((matrix_size, matrix_size))
    
    # Fill diagonal with high values (correct predictions)
    for i in range(matrix_size):
        confusion_matrix[i, i] = int(accuracy * 100) + random.randint(-5, 5)
    
    # Add some errors
    error_count = int((1 - accuracy) * 100)
    for _ in range(error_count):
        i = random.randint(0, matrix_size-1)
        j = random.randint(0, matrix_size-1)
        while j == i:  # Ensure it's an error (not on diagonal)
            j = random.randint(0, matrix_size-1)
        confusion_matrix[i, j] += 1
    
    # Normalize to have 100 samples per class
    for i in range(matrix_size):
        total = confusion_matrix[i].sum()
        if total > 0:
            confusion_matrix[i] = confusion_matrix[i] * (100 / total)
    
    # Create confusion matrix visualization
    fig = px.imshow(
        confusion_matrix,
        labels=dict(x="Predicted Digit", y="True Digit", color="Count"),
        x=[str(i) for i in range(10)],
        y=[str(i) for i in range(10)],
        color_continuous_scale="Blues"
    )
    
    # Update layout
    fig.update_layout(
        height=400,
        margin=dict(l=40, r=40, t=30, b=40),
        coloraxis_colorbar=dict(
            title="Count",
            tickvals=[0, 50, 100],
            ticktext=["0", "50", "100"]
        )
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Insights about the model
    st.markdown("### Insights")
    
    insights = []
    
    # Generate insights based on model performance and architecture
    if accuracy > 0.9:
        insights.append("Your model achieved excellent accuracy! The network architecture you chose works well for this task.")
    elif accuracy > 0.8:
        insights.append("Your model achieved good accuracy. You might try adding more layers or neurons to improve further.")
    else:
        insights.append("Your model's accuracy could be improved. Try adjusting the network architecture or training parameters.")
    
    # Insights about specific choices
    if activation_function == "ReLU":
        insights.append("ReLU activation is a good choice for this task as it helps with faster training.")
    elif activation_function == "Sigmoid":
        insights.append("Sigmoid activation works well for this task, but might cause vanishing gradient issues in deeper networks.")
    
    if data_augmentation:
        insights.append("Data augmentation helped improve model generalization by creating more diverse training examples.")
    else:
        insights.append("Adding data augmentation might help improve model performance, especially with limited training data.")
    
    # Display insights
    for insight in insights:
        st.info(insight)
    
    # Learning resources
    with st.expander("Learn More About Neural Networks"):
        st.markdown("""
        ### How Neural Networks Work
        
        Neural networks are inspired by the structure of the human brain. They consist of:
        
        1. **Input Layer**: Receives the raw data (in this case, pixel values from digit images)
        2. **Hidden Layers**: Process the information through weighted connections
        3. **Output Layer**: Produces the final result (probabilities for each digit)
        
        During training, the network:
        1. Makes predictions based on current weights
        2. Compares predictions to correct answers
        3. Adjusts weights to reduce errors
        4. Repeats this process many times
        
        This is called **backpropagation** and is the key to how neural networks learn.
        
        ### Real-World Applications
        
        Neural networks similar to what you built are used in:
        
        - Facial recognition in phones and security systems
        - Self-driving cars to recognize road signs and obstacles
        - Medical imaging to detect diseases
        - Voice assistants to understand speech
        - Language translation services
        """)

def display_genetic_algorithm_game(age_group):
    """Display the Genetic Algorithm Lab game"""
    st.markdown("## Genetic Algorithm Lab")
    
    st.markdown("""
    In this advanced simulation, you'll design experiments where AI solves problems through evolution and natural selection!
    
    A **Genetic Algorithm** mimics how evolution works in nature:
    
    1. Create a population of random solutions
    2. Test how well each solution solves the problem
    3. Select the best solutions to become "parents"
    4. Create "children" by mixing parts of the parents
    5. Introduce small random mutations
    6. Repeat for many generations until solutions become excellent
    
    This is used to solve complex problems where traditional algorithms struggle!
    """)
    
    # Experiment selection
    st.markdown("### Choose Your Experiment")
    
    experiment_type = st.selectbox(
        "Experiment type:",
        ["Find the Optimal Path", "Create a Game Strategy", "Design an Efficient Shape"]
    )
    
    # Common genetic algorithm parameters
    st.markdown("### Configure Algorithm Parameters")
    
    col1, col2 = st.columns(2)
    
    with col1:
        population_size = st.slider("Population Size:", min_value=10, max_value=200, value=50)
        
        generations = st.slider("Number of Generations:", min_value=10, max_value=500, value=100)
        
        selection_type = st.selectbox(
            "Selection Method:",
            ["Tournament", "Roulette Wheel", "Rank"],
            index=0
        )
    
    with col2:
        crossover_rate = st.slider("Crossover Rate:", min_value=0.1, max_value=1.0, value=0.8, step=0.1)
        
        mutation_rate = st.slider("Mutation Rate:", min_value=0.01, max_value=0.5, value=0.05, step=0.01)
        
        elitism = st.slider("Elitism (best solutions to keep):", min_value=0, max_value=10, value=2)
    
    # Experiment-specific settings
    if experiment_type == "Find the Optimal Path":
        st.markdown("### Path Finding Experiment")
        
        map_type = st.selectbox(
            "Map Type:",
            ["City Grid", "Terrain Map", "Maze"],
            index=0
        )
        
        obstacles = st.slider("Obstacle Density:", min_value=0, max_value=100, value=30)
        
        st.markdown("#### Preview")
        # Placeholder for a map visualization
        st.image("https://via.placeholder.com/800x400.png?text=Path+Map+(Placeholder)")
    
    elif experiment_type == "Create a Game Strategy":
        st.markdown("### Game Strategy Experiment")
        
        game_type = st.selectbox(
            "Game Type:",
            ["Tic-Tac-Toe", "Connect Four", "Simple Chess"],
            index=0
        )
        
        opponent_strength = st.select_slider(
            "Opponent Strength:",
            options=["Easy", "Medium", "Hard", "Expert"],
            value="Medium"
        )
        
        st.markdown("#### Preview")
        # Placeholder for a game board visualization
        st.image("https://via.placeholder.com/400x400.png?text=Game+Board+(Placeholder)")
    
    elif experiment_type == "Design an Efficient Shape":
        st.markdown("### Shape Design Experiment")
        
        design_goal = st.selectbox(
            "Design Goal:",
            ["Aerodynamic Shape", "Bridge Design", "Heat Sink"],
            index=0
        )
        
        constraints = st.multiselect(
            "Design Constraints:",
            ["Maximum Size", "Minimum Strength", "Weight Limit", "Material Restrictions"],
            default=["Maximum Size", "Weight Limit"]
        )
        
        st.markdown("#### Preview")
        # Placeholder for a shape visualization
        st.image("https://via.placeholder.com/600x300.png?text=Shape+Design+(Placeholder)")
    
    # Run experiment button
    if st.button("Run Genetic Algorithm"):
        # Show progress
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        # Track the best fitness over generations
        fitness_data = []
        avg_fitness_data = []
        
        # Simulate the genetic algorithm running
        for i in range(generations):
            # Only show periodic updates to avoid UI slowdown
            if i % max(1, generations // 100) == 0:
                # Update progress
                progress_percent = (i + 1) / generations
                progress_bar.progress(progress_percent)
                
                # Calculate a simulated fitness (improves over time with some noise)
                gen_progress = i / generations
                best_fitness = 0.4 + (0.55 * gen_progress) + random.uniform(-0.02, 0.02)
                avg_fitness = 0.2 + (0.4 * gen_progress) + random.uniform(-0.05, 0.05)
                
                # Store fitness data
                fitness_data.append((i, best_fitness))
                avg_fitness_data.append((i, avg_fitness))
                
                # Update status
                if gen_progress < 0.2:
                    status = "Early exploration phase..."
                elif gen_progress < 0.5:
                    status = "Refining promising solutions..."
                elif gen_progress < 0.8:
                    status = "Fine-tuning top performers..."
                else:
                    status = "Converging on optimal solution..."
                
                status_text.text(f"Generation {i+1}/{generations}: {status}")
                
                # Pretend this is computationally intensive
                time.sleep(0.01)
        
        # Complete the progress bar
        progress_bar.progress(1.0)
        status_text.text(f"Experiment complete! Ran for {generations} generations.")
        
        # Display results
        display_genetic_algorithm_results(experiment_type, fitness_data, avg_fitness_data)

def display_genetic_algorithm_results(experiment_type, fitness_data, avg_fitness_data):
    """Display the results of the genetic algorithm experiment"""
    st.markdown("### Experiment Results")
    
    # Display fitness over generations chart
    st.markdown("#### Fitness Improvement Over Generations")
    
    # Extract data for plotting
    generations = [data[0] for data in fitness_data]
    best_fitness = [data[1] for data in fitness_data]
    avg_fitness = [data[1] for data in avg_fitness_data]
    
    # Create DataFrame
    df = pd.DataFrame({
        'Generation': generations,
        'Best Fitness': best_fitness,
        'Average Fitness': avg_fitness
    })
    
    # Create line chart
    fig = px.line(
        df, 
        x='Generation', 
        y=['Best Fitness', 'Average Fitness'],
        labels={'value': 'Fitness', 'variable': 'Metric'},
        color_discrete_map={
            'Best Fitness': '#4287f5',
            'Average Fitness': '#f542a7'
        },
        title='Fitness Evolution'
    )
    
    # Update layout
    fig.update_layout(
        xaxis_title='Generation',
        yaxis_title='Fitness',
        hovermode='x unified',
        legend_title='',
        height=350,
        margin=dict(l=40, r=40, t=40, b=40)
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    # Show best solution visualization
    st.markdown("#### Best Solution Found")
    
    # Different visualization based on experiment type
    if experiment_type == "Find the Optimal Path":
        st.markdown("""
        Your genetic algorithm found an efficient path through the obstacles!
        
        - **Path Length**: 342 units
        - **Obstacles Avoided**: 28
        - **Efficiency**: 94% of optimal
        """)
        
        # Placeholder for path visualization
        st.image("https://via.placeholder.com/800x400.png?text=Optimal+Path+Result")
        
    elif experiment_type == "Create a Game Strategy":
        st.markdown("""
        Your genetic algorithm created a game strategy that wins or ties in most games!
        
        - **Win Rate**: 87%
        - **Draw Rate**: 12% 
        - **Loss Rate**: 1%
        - **Strategy Complexity**: High
        """)
        
        # Show win/loss statistics
        results = pd.DataFrame({
            'Outcome': ['Win', 'Draw', 'Loss'],
            'Percentage': [87, 12, 1]
        })
        
        fig = px.pie(
            results, 
            values='Percentage', 
            names='Outcome',
            color='Outcome',
            color_discrete_map={
                'Win': '#4CAF50',
                'Draw': '#FFC107',
                'Loss': '#F44336'
            },
            hole=0.4
        )
        
        fig.update_layout(
            height=300,
            margin=dict(l=20, r=20, t=20, b=20)
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
    elif experiment_type == "Design an Efficient Shape":
        st.markdown("""
        Your genetic algorithm designed a highly efficient shape!
        
        - **Aerodynamic Efficiency**: 93%
        - **Structural Integrity**: 89%
        - **Material Usage**: 76% of maximum
        - **Weight**: 1.2kg
        """)
        
        # Placeholder for shape visualization
        st.image("https://via.placeholder.com/600x300.png?text=Optimized+Shape+Design")
        
        # Show radar chart of performance metrics
        categories = ['Aerodynamic Efficiency', 'Structural Integrity', 
                     'Material Efficiency', 'Weight Optimization', 'Cost Efficiency']
        
        values = [0.93, 0.89, 0.76, 0.84, 0.78]
        
        fig = go.Figure()
        
        fig.add_trace(go.Scatterpolar(
            r=values,
            theta=categories,
            fill='toself',
            name='Optimized Design'
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
            margin=dict(l=50, r=50, t=20, b=20)
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    # Explanation of the algorithm's learning process
    with st.expander("How the Algorithm Evolved"):
        st.markdown("""
        ### Evolution Process Highlights
        
        1. **Initial Population (Generations 1-10)**
           - Started with random solutions
           - Most performed poorly
           - A few showed slight promise
        
        2. **Early Evolution (Generations 11-40)**
           - Good traits from early winners spread through population
           - Average fitness began to rise
           - Some interesting solution patterns emerged
        
        3. **Mid Evolution (Generations 41-80)**
           - Top solutions refined their approach
           - Mutation introduced novel improvements
           - Weaker solutions disappeared
        
        4. **Final Convergence (Generations 81-100)**
           - Population converged on optimal strategy
           - Small refinements continued
           - Elitism preserved the best solutions
        
        This mimics how natural evolution works, but at an accelerated pace!
        """)
    
    # Real-world applications
    st.markdown("### Real-World Applications")
    
    # Different applications based on experiment type
    if experiment_type == "Find the Optimal Path":
        st.markdown("""
        Genetic algorithms for path finding are used in:
        
        - **Logistics**: Finding optimal delivery routes for packages
        - **Robotics**: Planning movement paths for robots in complex environments
        - **Networks**: Designing efficient network routing
        - **Games**: Creating NPC movement paths in video games
        """)
        
    elif experiment_type == "Create a Game Strategy":
        st.markdown("""
        Genetic algorithms for strategy optimization are used in:
        
        - **Gaming AI**: Creating challenging opponents in strategy games
        - **Finance**: Optimizing trading strategies in stock markets
        - **Military**: Simulating and planning tactical operations
        - **Sports**: Analyzing and developing team strategies
        """)
        
    elif experiment_type == "Design an Efficient Shape":
        st.markdown("""
        Genetic algorithms for design optimization are used in:
        
        - **Aerospace**: Designing efficient airplane wings and spacecraft
        - **Architecture**: Optimizing building structures for strength and material use
        - **Engineering**: Creating efficient heat sinks for electronics
        - **Automotive**: Designing aerodynamic vehicle shapes
        """)
    
    # Option to export results
    st.button("Export Results (CSV)")
    
    # Try again button
    st.button("Try Different Parameters", on_click=lambda: None)