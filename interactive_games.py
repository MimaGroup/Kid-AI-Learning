import streamlit as st
import random
import time

def display_sorting_game():
    """Display a simple AI-themed sorting game
    
    Players need to sort items into correct categories like AI would do.
    """
    st.header("AI Sorting Game")
    st.markdown("Help the AI learn to sort items into the right categories!")
    
    # Initialize game state
    if "sorting_items" not in st.session_state:
        st.session_state.sorting_items = {
            "animals": ["dog", "cat", "elephant", "tiger", "bird", "fish", "lion", "zebra"],
            "fruits": ["apple", "banana", "orange", "grape", "mango", "pineapple", "strawberry", "watermelon"],
            "vehicles": ["car", "bus", "train", "bicycle", "airplane", "boat", "motorcycle", "helicopter"]
        }
        
    if "current_sorting_round" not in st.session_state:
        st.session_state.current_sorting_round = 1
        
    if "sorting_score" not in st.session_state:
        st.session_state.sorting_score = 0
        
    if "current_sorting_items" not in st.session_state:
        # Select random items for this round
        st.session_state.current_sorting_items = []
        for category, items in st.session_state.sorting_items.items():
            selected_items = random.sample(items, 2)  # Pick 2 random items from each category
            for item in selected_items:
                st.session_state.current_sorting_items.append({"item": item, "category": category})
        
        # Shuffle the items
        random.shuffle(st.session_state.current_sorting_items)

    # Game interface
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown(f"### Round {st.session_state.current_sorting_round} - Score: {st.session_state.sorting_score}")
        st.markdown("Drag each item to its correct category.")
        
        # Display the items to sort
        for i, item_data in enumerate(st.session_state.current_sorting_items):
            item = item_data["item"]
            
            # Create a unique key for each selectbox
            selected_category = st.selectbox(
                f"Sort: **{item}**",
                options=list(st.session_state.sorting_items.keys()),
                key=f"sort_{i}"
            )
            
            # Store the selected category
            st.session_state.current_sorting_items[i]["selected"] = selected_category
    
    with col2:
        st.markdown("### Categories")
        for category in st.session_state.sorting_items.keys():
            st.markdown(f"- **{category.title()}**")
            
        # Check button
        if st.button("Check My Sorting", key="check_sorting"):
            correct_count = 0
            for item_data in st.session_state.current_sorting_items:
                if item_data.get("selected") == item_data["category"]:
                    correct_count += 1
            
            # Calculate score and provide feedback
            accuracy = correct_count / len(st.session_state.current_sorting_items)
            points = int(accuracy * 10)  # 0-10 points based on accuracy
            
            st.session_state.sorting_score += points
            
            if accuracy == 1.0:
                st.success(f"Perfect! You sorted all items correctly! +{points} points")
            elif accuracy >= 0.7:
                st.success(f"Good job! You sorted {correct_count} out of {len(st.session_state.current_sorting_items)} items correctly. +{points} points")
            else:
                st.warning(f"You sorted {correct_count} out of {len(st.session_state.current_sorting_items)} items correctly. Keep practicing! +{points} points")
            
            # Increment round and reset items for next round
            st.session_state.current_sorting_round += 1
            
            # Prepare new items for next round
            st.session_state.current_sorting_items = []
            for category, items in st.session_state.sorting_items.items():
                selected_items = random.sample(items, 2)
                for item in selected_items:
                    st.session_state.current_sorting_items.append({"item": item, "category": category})
            
            # Shuffle the items
            random.shuffle(st.session_state.current_sorting_items)
            
            # If score reaches threshold, award badge
            if st.session_state.sorting_score >= 30 and "Sorting Master" not in st.session_state.get("badges", []):
                if "badges" not in st.session_state:
                    st.session_state.badges = []
                st.session_state.badges.append("Sorting Master")
                st.balloons()
                st.success("🏆 You earned the Sorting Master badge!")
                
            st.rerun()

def display_pattern_game():
    """Display a pattern recognition game
    
    Players need to find patterns in sequences, similar to how machine learning works.
    """
    st.header("Pattern Finder Game")
    st.markdown("Find the pattern and predict what comes next - just like AI does!")
    
    # Initialize game state
    if "pattern_score" not in st.session_state:
        st.session_state.pattern_score = 0
        
    if "pattern_level" not in st.session_state:
        st.session_state.pattern_level = 1
        
    if "current_pattern" not in st.session_state:
        # Generate a pattern based on level
        generate_new_pattern()

    # Display current score and level
    st.markdown(f"### Level: {st.session_state.pattern_level} | Score: {st.session_state.pattern_score}")
    
    # Show the current pattern
    pattern = st.session_state.current_pattern["sequence"]
    pattern_type = st.session_state.current_pattern["type"]
    answer = st.session_state.current_pattern["next"]
    
    st.markdown("### What comes next in this pattern?")
    
    # Format the pattern display based on type
    if pattern_type == "number":
        pattern_display = " → ".join([str(num) for num in pattern])
        st.markdown(f"## {pattern_display} → ?")
        
        # Input for user's answer
        user_answer = st.number_input("Your answer:", min_value=0, max_value=100, step=1)
        
    elif pattern_type == "letter":
        pattern_display = " → ".join(pattern)
        st.markdown(f"## {pattern_display} → ?")
        
        # Input for user's answer (letters)
        user_answer = st.text_input("Your answer (one letter):", max_chars=1)
        
    elif pattern_type == "shape":
        # Display shapes using emoji or symbols
        shape_map = {
            "circle": "⭕",
            "square": "⬛",
            "triangle": "🔺",
            "star": "⭐",
            "heart": "❤️",
            "diamond": "💠"
        }
        
        pattern_display = " → ".join([shape_map.get(shape, shape) for shape in pattern])
        st.markdown(f"## {pattern_display} → ?")
        
        # Dropdown for shapes
        user_answer = st.selectbox(
            "Select the next shape:",
            options=list(shape_map.keys())
        )
    
    # Check button
    if st.button("Check Answer", key="check_pattern"):
        if (pattern_type == "number" and user_answer == answer) or \
           (pattern_type == "letter" and user_answer.lower() == answer.lower()) or \
           (pattern_type == "shape" and user_answer == answer):
            
            st.success("Correct! You found the pattern!")
            
            # Update score and level
            points = st.session_state.pattern_level * 5
            st.session_state.pattern_score += points
            st.session_state.pattern_level += 1
            
            # Generate new pattern for next level
            generate_new_pattern()
            
            # Award badge at certain levels
            if st.session_state.pattern_level == 5 and "Pattern Spotter" not in st.session_state.get("badges", []):
                if "badges" not in st.session_state:
                    st.session_state.badges = []
                st.session_state.badges.append("Pattern Spotter")
                st.balloons()
                st.success("🏆 You earned the Pattern Spotter badge!")
            
        else:
            st.error(f"Not quite! The correct answer was {answer}. Try a new pattern.")
            # Generate new pattern but don't increase level
            generate_new_pattern()
        
        st.rerun()
    
    # Hint button
    if st.button("Get a Hint", key="pattern_hint"):
        if pattern_type == "number":
            if "arithmetic" in st.session_state.current_pattern["rule"]:
                st.info("Look for a consistent addition or subtraction between numbers.")
            elif "geometric" in st.session_state.current_pattern["rule"]:
                st.info("Look for a consistent multiplication or division between numbers.")
            elif "fibonacci" in st.session_state.current_pattern["rule"]:
                st.info("Each number might be the sum of the two before it.")
                
        elif pattern_type == "letter":
            st.info("Count how many letters forward or backward each step goes.")
                
        elif pattern_type == "shape":
            st.info("There may be a repeating sequence of shapes.")

def generate_new_pattern():
    """Generate a new pattern based on the current level"""
    level = st.session_state.get("pattern_level", 1)
    
    # Different pattern types
    if level <= 3:
        # Simple patterns for early levels
        pattern_type = random.choice(["number", "letter"])
    else:
        pattern_type = random.choice(["number", "letter", "shape"])
    
    # Generate the specific pattern based on type
    if pattern_type == "number":
        if level <= 2:
            # Simple arithmetic (addition/subtraction)
            start = random.randint(1, 10)
            increment = random.randint(1, 5)
            sequence = [start + i * increment for i in range(5)]
            next_value = start + 5 * increment
            rule = "arithmetic_progression"
            
        elif level <= 4:
            # Geometric progression (multiplication/division)
            start = random.randint(1, 5)
            ratio = random.randint(2, 3)
            sequence = [start * (ratio ** i) for i in range(5)]
            next_value = start * (ratio ** 5)
            rule = "geometric_progression"
            
        else:
            # More complex patterns
            options = ["fibonacci", "square", "cube"]
            selected = random.choice(options)
            
            if selected == "fibonacci":
                # Fibonacci-like sequence (each number is sum of two previous)
                a, b = random.randint(1, 5), random.randint(1, 5)
                sequence = [a, b]
                for i in range(3):
                    sequence.append(sequence[-1] + sequence[-2])
                next_value = sequence[-1] + sequence[-2]
                rule = "fibonacci"
                
            elif selected == "square":
                # Square numbers with offset
                offset = random.randint(0, 5)
                sequence = [i**2 + offset for i in range(1, 6)]
                next_value = 6**2 + offset
                rule = "square_numbers"
                
            elif selected == "cube":
                # Cube numbers
                sequence = [i**3 for i in range(1, 6)]
                next_value = 6**3
                rule = "cube_numbers"
    
    elif pattern_type == "letter":
        # Letter patterns (alphabetical shifts)
        if level <= 3:
            # Simple forward/backward in alphabet
            start_char = random.choice("abcdefghijklm")
            start_index = ord(start_char) - ord('a')
            increment = random.randint(1, 3)
            
            sequence = []
            for i in range(5):
                index = (start_index + i * increment) % 26
                sequence.append(chr(ord('a') + index))
                
            next_index = (start_index + 5 * increment) % 26
            next_value = chr(ord('a') + next_index)
            rule = "alphabetical_shift"
            
        else:
            # Alternating patterns or skips
            options = ["alternating", "vowels", "consonants"]
            selected = random.choice(options)
            
            if selected == "alternating":
                # Alternating increments
                start_char = random.choice("abcdefghij")
                start_index = ord(start_char) - ord('a')
                increment1 = random.randint(1, 2)
                increment2 = random.randint(3, 4)
                
                sequence = []
                current_index = start_index
                
                for i in range(5):
                    sequence.append(chr(ord('a') + current_index % 26))
                    if i % 2 == 0:
                        current_index += increment1
                    else:
                        current_index += increment2
                
                if len(sequence) % 2 == 0:
                    next_index = (current_index + increment1) % 26
                else:
                    next_index = (current_index + increment2) % 26
                    
                next_value = chr(ord('a') + next_index)
                rule = "alternating_shift"
                
            elif selected == "vowels":
                # Only vowels
                vowels = ['a', 'e', 'i', 'o', 'u']
                sequence = random.sample(vowels, 5)
                remaining = [v for v in vowels if v not in sequence]
                if remaining:
                    next_value = random.choice(remaining)
                else:
                    next_value = random.choice(vowels)
                rule = "vowels_only"
                
            elif selected == "consonants":
                # Only certain consonants
                consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm']
                sequence = random.sample(consonants, 5)
                remaining = [c for c in consonants if c not in sequence]
                if remaining:
                    next_value = random.choice(remaining)
                else:
                    next_value = random.choice(consonants)
                rule = "consonants_only"
    
    elif pattern_type == "shape":
        # Shape patterns
        shapes = ["circle", "square", "triangle", "star", "heart", "diamond"]
        
        if level <= 4:
            # Repeating pattern
            pattern_length = random.randint(2, 3)
            base_pattern = random.sample(shapes, pattern_length)
            
            # Repeat to get 5 elements
            sequence = []
            for i in range(5):
                sequence.append(base_pattern[i % pattern_length])
                
            next_value = base_pattern[5 % pattern_length]
            rule = "repeating_pattern"
            
        else:
            # More complex patterns
            options = ["alternating_pairs", "increasing_complexity", "random_with_rule"]
            selected = random.choice(options)
            
            if selected == "alternating_pairs":
                # Two shapes alternate in pairs
                shape1, shape2 = random.sample(shapes, 2)
                sequence = [shape1, shape1, shape2, shape2, shape1]
                next_value = shape1
                rule = "alternating_pairs"
                
            elif selected == "increasing_complexity":
                # Each shape appears one more time than the previous
                selected_shapes = random.sample(shapes, 3)
                sequence = [selected_shapes[0]]
                for i in range(1, 3):
                    sequence.extend([selected_shapes[i]] * (i + 1))
                
                # Truncate to 5 if needed
                sequence = sequence[:5]
                
                # Determine next based on pattern
                if len(sequence) < 6:
                    shape_index = len(sequence) % 3
                    repeat_count = (len(sequence) // 3) + 1
                    next_value = selected_shapes[shape_index]
                else:
                    next_value = random.choice(selected_shapes)
                
                rule = "increasing_repetition"
                
            elif selected == "random_with_rule":
                # Shapes follow a rule like "after circle always comes square"
                rule_shape = random.choice(shapes)
                follow_shape = random.choice([s for s in shapes if s != rule_shape])
                
                sequence = []
                for i in range(5):
                    if i > 0 and sequence[i-1] == rule_shape:
                        sequence.append(follow_shape)
                    else:
                        options = [s for s in shapes if s != follow_shape or sequence[i-1] != rule_shape]
                        sequence.append(random.choice(options))
                
                if sequence[-1] == rule_shape:
                    next_value = follow_shape
                else:
                    options = [s for s in shapes if s != follow_shape or sequence[-1] != rule_shape]
                    next_value = random.choice(options)
                
                rule = "conditional_follow"
    
    # Store the pattern
    st.session_state.current_pattern = {
        "type": pattern_type,
        "sequence": sequence,
        "next": next_value,
        "rule": rule
    }

def display_robot_maze():
    """Display a simple programming game where players direct a robot through a maze"""
    st.header("Robot Maze - Programming Adventure")
    st.markdown("Program your robot to reach the goal! Create a sequence of moves to navigate the maze.")
    
    # Initialize game state
    if "maze_level" not in st.session_state:
        st.session_state.maze_level = 1
        
    if "maze_score" not in st.session_state:
        st.session_state.maze_score = 0
    
    if "current_maze" not in st.session_state:
        generate_maze(st.session_state.maze_level)
    
    if "robot_program" not in st.session_state:
        st.session_state.robot_program = []
        
    if "simulation_results" not in st.session_state:
        st.session_state.simulation_results = None
        
    if "simulation_status" not in st.session_state:
        st.session_state.simulation_status = None
    
    # Display current maze
    maze = st.session_state.current_maze["grid"]
    start_pos = st.session_state.current_maze["start"]
    goal_pos = st.session_state.current_maze["goal"]
    
    # Create a visual representation of the maze
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.markdown(f"### Level: {st.session_state.maze_level} | Score: {st.session_state.maze_score}")
        
        # Display the maze grid with better visualization
        st.markdown("""
        <style>
        .maze-grid {
            font-family: monospace;
            line-height: 1.2;
            font-size: 24px;
            letter-spacing: 0.2em;
        }
        </style>
        """, unsafe_allow_html=True)
        
        maze_display = "<div class='maze-grid'>"
        
        # If we have simulation results, show the robot path
        robot_path = []
        if st.session_state.simulation_results:
            robot_path = st.session_state.simulation_results["path"]
        
        for i, row in enumerate(maze):
            for j, cell in enumerate(row):
                if (i, j) == start_pos and not robot_path:
                    maze_display += "🤖"  # Robot at start
                elif (i, j) == goal_pos:
                    maze_display += "🏆"  # Goal
                elif robot_path and (i, j) in robot_path:
                    # Show the robot at its latest position in the path
                    if (i, j) == robot_path[-1]:
                        maze_display += "🤖"  # Current robot position
                    elif (i, j) == start_pos:
                        maze_display += "🟢"  # Start position
                    else:
                        maze_display += "👣"  # Robot path
                elif cell == 1:
                    maze_display += "🟦"  # Wall (blue square for better visibility)
                else:
                    maze_display += "⬜"  # Open path
            maze_display += "<br>"
        
        maze_display += "</div>"
        st.markdown(maze_display, unsafe_allow_html=True)
        
        # Display simulation status if available
        if st.session_state.simulation_status:
            if st.session_state.simulation_status == "success":
                st.success("🎉 Goal reached! Well done!")
            elif st.session_state.simulation_status == "failure":
                st.error("❌ The robot couldn't reach the goal. Try a different program!")
            elif st.session_state.simulation_status == "wall":
                st.warning("💥 The robot crashed into a wall! Adjust your program.")
            elif st.session_state.simulation_status == "out_of_bounds":
                st.warning("⚠️ The robot went out of bounds! Check your program.")
    
    with col2:
        st.markdown("### Program Your Robot")
        st.markdown("Create a sequence of moves to reach the goal:")
        
        # Add interactive programming interface
        command_options = {
            "MOVE_UP": "⬆️ Move Up",
            "MOVE_DOWN": "⬇️ Move Down",
            "MOVE_LEFT": "⬅️ Move Left",
            "MOVE_RIGHT": "➡️ Move Right",
            "REPEAT_2": "🔄 Repeat next command 2x",
            "REPEAT_3": "🔄 Repeat next command 3x"
        }
        
        # Display current program
        st.markdown("#### Your Program:")
        program_display = ""
        for cmd in st.session_state.robot_program:
            program_display += f"- {command_options.get(cmd, cmd)}\n"
        
        if program_display:
            st.markdown(program_display)
        else:
            st.info("Your program is empty. Add commands below.")
        
        # Add commands to the program
        selected_command = st.selectbox(
            "Select command:",
            options=list(command_options.keys()),
            format_func=lambda x: command_options[x]
        )
        
        cmd_col1, cmd_col2 = st.columns([1, 1])
        
        with cmd_col1:
            if st.button("Add Command"):
                st.session_state.robot_program.append(selected_command)
                st.session_state.simulation_results = None
                st.session_state.simulation_status = None
                st.rerun()
                
        with cmd_col2:
            if st.button("Clear Program"):
                st.session_state.robot_program = []
                st.session_state.simulation_results = None
                st.session_state.simulation_status = None
                st.rerun()
        
        # Run simulation
        if st.button("Run Program", type="primary"):
            if st.session_state.robot_program:
                # Simulate robot movement
                results = simulate_robot_movement(
                    maze, 
                    start_pos,
                    goal_pos,
                    st.session_state.robot_program
                )
                
                st.session_state.simulation_results = results
                
                # Determine simulation status
                if results["reached_goal"]:
                    st.session_state.simulation_status = "success"
                    
                    # Award points based on efficiency
                    optimal_length = st.session_state.current_maze["optimal_length"]
                    program_length = len(st.session_state.robot_program)
                    
                    if program_length <= optimal_length:
                        points = st.session_state.maze_level * 10
                    else:
                        points = st.session_state.maze_level * 5
                    
                    st.session_state.maze_score += points
                    
                    # Level up and generate new maze
                    if st.session_state.maze_level < 5:
                        st.session_state.maze_level += 1
                        generate_maze(st.session_state.maze_level)
                        st.session_state.robot_program = []
                        
                        # Award badge at level 3
                        if st.session_state.maze_level == 3 and "Coding Wizard" not in st.session_state.get("badges", []):
                            if "badges" not in st.session_state:
                                st.session_state.badges = []
                            st.session_state.badges.append("Coding Wizard")
                            st.balloons()
                            st.success("🏆 You earned the Coding Wizard badge!")
                else:
                    if results["hit_wall"]:
                        st.session_state.simulation_status = "wall"
                    elif results["out_of_bounds"]:
                        st.session_state.simulation_status = "out_of_bounds"
                    else:
                        st.session_state.simulation_status = "failure"
                
                st.rerun()
            else:
                st.warning("Add some commands to your program first!")
        
        # Instructions for programming the robot
        st.markdown("""
        - ⬆️ Move Up
        - ⬇️ Move Down
        - ⬅️ Move Left
        - ➡️ Move Right
        """)
        
        # Buttons for adding commands
        command_col1, command_col2 = st.columns(2)
        
        with command_col1:
            if st.button("⬆️ Up", key="move_up"):
                st.session_state.robot_program.append("up")
                st.rerun()
                
            if st.button("⬅️ Left", key="move_left"):
                st.session_state.robot_program.append("left")
                st.rerun()
        
        with command_col2:
            if st.button("⬇️ Down", key="move_down"):
                st.session_state.robot_program.append("down")
                st.rerun()
                
            if st.button("➡️ Right", key="move_right"):
                st.session_state.robot_program.append("right")
                st.rerun()
        
        # Clear program button
        if st.button("🗑️ Clear Program", key="clear_program"):
            st.session_state.robot_program = []
            st.rerun()
    
    # Display the current program
    st.markdown("### Your Robot's Program:")
    
    if st.session_state.robot_program:
        program_display = ""
        for i, cmd in enumerate(st.session_state.robot_program):
            if cmd == "up":
                icon = "⬆️"
            elif cmd == "down":
                icon = "⬇️"
            elif cmd == "left":
                icon = "⬅️"
            elif cmd == "right":
                icon = "➡️"
            else:
                icon = "❓"
            
            program_display += f"{i+1}. {icon} {cmd.capitalize()}\n"
        
        st.code(program_display)
    else:
        st.markdown("*Your program is empty. Add some moves!*")
    
    # Run program button
    if st.button("▶️ Run Program", key="run_program"):
        if not st.session_state.robot_program:
            st.warning("Add some commands to your program first!")
        else:
            # Simulate the robot's movement
            result, path = simulate_robot_movement(
                maze, 
                start_pos, 
                goal_pos, 
                st.session_state.robot_program
            )
            
            # Display the animation
            with st.spinner("Robot is moving..."):
                # Create animation frames
                frames = []
                for pos in path:
                    frame = ""
                    for i, row in enumerate(maze):
                        for j, cell in enumerate(row):
                            if (i, j) == pos:
                                frame += "🤖 "  # Robot
                            elif (i, j) == goal_pos:
                                frame += "🏆 "  # Goal
                            elif cell == 1:
                                frame += "⬛ "  # Wall
                            else:
                                frame += "⬜ "  # Open path
                        frame += "\n"
                    frames.append(frame)
                
                # Display animation with a placeholder
                anim_placeholder = st.empty()
                for frame in frames:
                    anim_placeholder.markdown(f"```\n{frame}\n```")
                    time.sleep(0.5)  # Slow enough to see movement
            
            # Show result
            if result == "goal":
                st.success("🎉 Success! Your robot reached the goal!")
                
                # Calculate score based on efficiency
                optimal_steps = st.session_state.current_maze["optimal_steps"]
                used_steps = len(st.session_state.robot_program)
                
                if used_steps <= optimal_steps:
                    points = st.session_state.maze_level * 10
                    message = "Perfect solution! Maximum points awarded!"
                else:
                    efficiency = optimal_steps / used_steps
                    points = int(st.session_state.maze_level * 10 * efficiency)
                    message = f"Solution found! Your program used {used_steps} steps (optimal: {optimal_steps})."
                
                st.session_state.maze_score += points
                st.success(f"{message} +{points} points")
                
                # Level up
                st.session_state.maze_level += 1
                st.session_state.robot_program = []
                generate_maze(st.session_state.maze_level)
                
                # Award badge at certain levels
                if st.session_state.maze_level == 4 and "Robot Programmer" not in st.session_state.get("badges", []):
                    if "badges" not in st.session_state:
                        st.session_state.badges = []
                    st.session_state.badges.append("Robot Programmer")
                    st.balloons()
                    st.success("🏆 You earned the Robot Programmer badge!")
                
                st.rerun()
                
            elif result == "wall":
                st.error("Oh no! Your robot hit a wall! Try again.")
                
            elif result == "out_of_bounds":
                st.error("Your robot went outside the maze! Try again.")
                
            else:  # incomplete
                st.warning("Your robot didn't reach the goal. Try adding more commands!")

def generate_maze(level):
    """Generate a maze based on the current level"""
    
    # Define maze complexity based on level
    if level <= 2:
        size = 5  # 5x5 maze
        complexity = "easy"
    elif level <= 4:
        size = 6  # 6x6 maze
        complexity = "medium"
    else:
        size = 7  # 7x7 maze
        complexity = "hard"
    
    # Initialize an empty maze
    maze = [[0 for _ in range(size)] for _ in range(size)]
    
    # Add walls based on complexity
    if complexity == "easy":
        # Just a few walls
        num_walls = size * 2
        for _ in range(num_walls):
            x, y = random.randint(0, size-1), random.randint(0, size-1)
            # Avoid placing walls on edges for easy levels
            if x > 0 and x < size-1 and y > 0 and y < size-1:
                maze[x][y] = 1
    
    elif complexity == "medium":
        # More walls, including some on edges
        num_walls = size * 3
        for _ in range(num_walls):
            x, y = random.randint(0, size-1), random.randint(0, size-1)
            maze[x][y] = 1
    
    else:  # hard
        # Many walls creating a more challenging path
        num_walls = size * 4
        for _ in range(num_walls):
            x, y = random.randint(0, size-1), random.randint(0, size-1)
            maze[x][y] = 1
    
    # Place start and goal positions
    # For simplicity, start is always in the top-left area and goal in bottom-right
    
    # Define possible start positions in top-left quadrant
    start_positions = [(i, j) for i in range(2) for j in range(2) if maze[i][j] == 0]
    if not start_positions:  # If all are walls, clear one
        start_pos = (0, 0)
        maze[0][0] = 0
    else:
        start_pos = random.choice(start_positions)
    
    # Define possible goal positions in bottom-right quadrant
    goal_positions = [(i, j) for i in range(size-2, size) for j in range(size-2, size) if maze[i][j] == 0]
    if not goal_positions:  # If all are walls, clear one
        goal_pos = (size-1, size-1)
        maze[size-1][size-1] = 0
    else:
        goal_pos = random.choice(goal_positions)
    
    # Calculate an estimate of optimal steps (Manhattan distance considering the maze size)
    # This is a simplified estimate; in a real app you might use pathfinding
    optimal_steps = abs(goal_pos[0] - start_pos[0]) + abs(goal_pos[1] - start_pos[1])
    
    # Slight increase for higher levels to account for walls
    if complexity == "medium":
        optimal_steps += 2
    elif complexity == "hard":
        optimal_steps += 4
    
    # Store the maze
    st.session_state.current_maze = {
        "grid": maze,
        "start": start_pos,
        "goal": goal_pos,
        "level": level,
        "optimal_steps": optimal_steps,
        "optimal_length": optimal_steps + 2  # Estimated optimal program length (including possible repeats)
    }

def simulate_robot_movement(maze, start_pos, goal_pos, program):
    """Simulate the robot's movement through the maze based on the program
    
    Args:
        maze (list): 2D grid representing the maze (0 for path, 1 for wall)
        start_pos (tuple): Starting position (row, col)
        goal_pos (tuple): Goal position (row, col)
        program (list): List of commands to execute
        
    Returns:
        dict: Results of the simulation including whether goal was reached,
              path taken, and any errors encountered
    """
    # Initialize robot position and path
    current_pos = start_pos
    path = [current_pos]
    
    # Track program execution
    reached_goal = False
    hit_wall = False
    out_of_bounds = False
    
    # Process each command
    i = 0
    while i < len(program):
        cmd = program[i]
        repeat = 1
        
        # Check for repeat commands
        if cmd.startswith("REPEAT_"):
            try:
                repeat = int(cmd.split("_")[1])
                i += 1
                if i >= len(program):
                    break
                cmd = program[i]
            except (IndexError, ValueError):
                repeat = 1
        
        # Execute command (potentially multiple times)
        for _ in range(repeat):
            row, col = current_pos
            
            # Determine new position based on command
            if cmd == "MOVE_UP":
                new_pos = (row - 1, col)
            elif cmd == "MOVE_DOWN":
                new_pos = (row + 1, col)
            elif cmd == "MOVE_LEFT":
                new_pos = (row, col - 1)
            elif cmd == "MOVE_RIGHT":
                new_pos = (row, col + 1)
            else:
                # Unknown command, skip
                i += 1
                continue
            
            # Check if the new position is valid
            new_row, new_col = new_pos
            
            # Check boundaries
            if new_row < 0 or new_row >= len(maze) or new_col < 0 or new_col >= len(maze[0]):
                out_of_bounds = True
                break
            
            # Check for walls
            if maze[new_row][new_col] == 1:
                hit_wall = True
                break
            
            # Move robot
            current_pos = new_pos
            path.append(current_pos)
            
            # Check if goal reached
            if current_pos == goal_pos:
                reached_goal = True
                break
        
        # Stop if there was an error or goal reached
        if hit_wall or out_of_bounds or reached_goal:
            break
        
        i += 1
    
    # Return simulation results
    return {
        "reached_goal": reached_goal,
        "hit_wall": hit_wall,
        "out_of_bounds": out_of_bounds,
        "path": path,
        "final_position": current_pos
    }
