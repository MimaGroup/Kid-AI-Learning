import streamlit as st
import random

def display_sorting_game():
    """
    Display a simple sorting game where kids drag and drop items to sort them
    """
    st.subheader("AI Sorting Challenge")
    
    # Initialize game state if not exists
    if "sorting_items" not in st.session_state:
        st.session_state.sorting_items = generate_sorting_items()
    if "sorting_completed" not in st.session_state:
        st.session_state.sorting_completed = False
    
    # Display instructions
    st.markdown("""
    Help the AI learn to sort items! Drag the numbers to put them in order from smallest to largest.
    """)
    
    # Display the items to sort
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # In a real drag-and-drop interface, we'd use JavaScript/HTML
        # For Streamlit, we'll simulate with a select box for each position
        items = st.session_state.sorting_items
        sorted_positions = {}
        
        st.write("Arrange these numbers in order:")
        st.write(", ".join([str(item) for item in items]))
        
        # Create a row of select boxes
        cols = st.columns(len(items))
        for i, col in enumerate(cols):
            with col:
                sorted_positions[i] = st.selectbox(
                    f"Position {i+1}",
                    options=items,
                    key=f"sort_pos_{i}"
                )
        
        # Check if the sorting is correct
        user_sorted = list(sorted_positions.values())
        correct_sort = sorted(items)
        
        if st.button("Check My Answer"):
            if user_sorted == correct_sort:
                st.success("Great job! You've sorted the numbers correctly!")
                st.session_state.sorting_completed = True
            else:
                st.error("Not quite right. Try again!")
                st.write(f"Your answer: {user_sorted}")
                st.write(f"Correct order: {correct_sort}")
    
    with col2:
        # Display a robot helper
        st.image("https://via.placeholder.com/150x150/4285F4/FFFFFF?text=🤖", width=100)
        st.caption("Sort the numbers from smallest to largest!")
    
    # Reset button
    if st.button("New Numbers"):
        st.session_state.sorting_items = generate_sorting_items()
        st.session_state.sorting_completed = False
        st.rerun()

def generate_sorting_items():
    """Generate a list of random numbers to sort"""
    return random.sample(range(1, 100), 5)

def display_pattern_game():
    """
    Display a pattern recognition game where kids identify the next item in a sequence
    """
    st.subheader("AI Pattern Recognition")
    
    # Initialize game state if not exists
    if "pattern_sequence" not in st.session_state:
        st.session_state.pattern_sequence, st.session_state.pattern_answer = generate_pattern()
    if "pattern_completed" not in st.session_state:
        st.session_state.pattern_completed = False
    
    # Display instructions
    st.markdown("""
    Help the AI learn patterns! Look at the sequence and figure out what comes next.
    """)
    
    # Display the pattern
    col1, col2 = st.columns([3, 1])
    
    with col1:
        sequence = st.session_state.pattern_sequence
        st.write("What number comes next in this sequence?")
        st.write(" → ".join([str(num) for num in sequence]) + " → ?")
        
        user_answer = st.number_input("Your answer:", min_value=0, max_value=1000, step=1)
        
        if st.button("Check Answer"):
            if user_answer == st.session_state.pattern_answer:
                st.success("Correct! You've identified the pattern!")
                st.session_state.pattern_completed = True
            else:
                st.error(f"Not quite right. The correct answer is {st.session_state.pattern_answer}.")
                
    with col2:
        # Display a robot helper
        st.image("https://via.placeholder.com/150x150/4285F4/FFFFFF?text=🤖", width=100)
        st.caption("Find the pattern and predict what comes next!")
    
    # Reset button
    if st.button("New Pattern"):
        st.session_state.pattern_sequence, st.session_state.pattern_answer = generate_pattern()
        st.session_state.pattern_completed = False
        st.rerun()

def generate_pattern():
    """Generate a sequence with a pattern and the next number"""
    pattern_types = [
        "add",      # Add a constant
        "multiply", # Multiply by a constant
        "fibonacci" # Fibonacci-like sequence
    ]
    
    pattern_type = random.choice(pattern_types)
    
    if pattern_type == "add":
        start = random.randint(1, 20)
        increment = random.randint(1, 10)
        sequence = [start + i * increment for i in range(5)]
        next_num = start + 5 * increment
    
    elif pattern_type == "multiply":
        start = random.randint(1, 5)
        multiplier = random.randint(2, 3)
        sequence = [start * (multiplier ** i) for i in range(5)]
        next_num = start * (multiplier ** 5)
    
    else:  # fibonacci-like
        a, b = random.randint(1, 5), random.randint(6, 10)
        sequence = [a, b]
        for i in range(3):
            a, b = b, a + b
            sequence.append(b)
        next_num = sequence[-1] + sequence[-2]
    
    return sequence, next_num
