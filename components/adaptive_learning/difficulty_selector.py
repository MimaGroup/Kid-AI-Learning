import streamlit as st

def display_difficulty_selector():
    """
    Display a difficulty selector that adapts content based on age and skill level
    """
    st.markdown("""
    <div style="background-color: #f5f5ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <p>Choose your skill level to see content that's just right for you!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Age group selector
    age_groups = ["7-8 years", "9-10 years", "11-13 years"]
    
    # Initialize session state
    if "selected_age_group" not in st.session_state:
        st.session_state.selected_age_group = age_groups[1]  # Default to middle age group
    
    if "difficulty_level" not in st.session_state:
        st.session_state.difficulty_level = "Medium"  # Default to medium difficulty
    
    # Age group selection with colored boxes
    st.markdown("### Select Your Age Group")
    
    # Create columns for the age group selection
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("7-8 years", key="age_7_8", 
                    use_container_width=True,
                    type="primary" if st.session_state.selected_age_group == "7-8 years" else "secondary"):
            st.session_state.selected_age_group = "7-8 years"
            st.session_state.difficulty_level = "Easy"
            st.rerun()
    
    with col2:
        if st.button("9-10 years", key="age_9_10", 
                    use_container_width=True,
                    type="primary" if st.session_state.selected_age_group == "9-10 years" else "secondary"):
            st.session_state.selected_age_group = "9-10 years"
            st.session_state.difficulty_level = "Medium"
            st.rerun()
    
    with col3:
        if st.button("11-13 years", key="age_11_13", 
                    use_container_width=True,
                    type="primary" if st.session_state.selected_age_group == "11-13 years" else "secondary"):
            st.session_state.selected_age_group = "11-13 years"
            st.session_state.difficulty_level = "Advanced"
            st.rerun()
    
    # Manual difficulty override
    st.markdown("### Fine-tune Your Difficulty Level")
    
    # Create columns for difficulty buttons
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("Easy", key="easy_difficulty", 
                    use_container_width=True,
                    type="primary" if st.session_state.difficulty_level == "Easy" else "secondary"):
            st.session_state.difficulty_level = "Easy"
            st.rerun()
    
    with col2:
        if st.button("Medium", key="medium_difficulty", 
                    use_container_width=True,
                    type="primary" if st.session_state.difficulty_level == "Medium" else "secondary"):
            st.session_state.difficulty_level = "Medium"
            st.rerun()
    
    with col3:
        if st.button("Advanced", key="advanced_difficulty", 
                    use_container_width=True,
                    type="primary" if st.session_state.difficulty_level == "Advanced" else "secondary"):
            st.session_state.difficulty_level = "Advanced"
            st.rerun()
    
    # Display current settings
    st.markdown(f"""
    <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 20px;">
        <h3 style="margin-top: 0;">Your Learning Settings</h3>
        <p><strong>Age Group:</strong> {st.session_state.selected_age_group}</p>
        <p><strong>Difficulty Level:</strong> {st.session_state.difficulty_level}</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Preview content adaptation
    st.markdown("### See How Content Adapts")
    
    # Get appropriate content examples based on age and difficulty
    examples = get_adaptive_content_examples(st.session_state.selected_age_group, st.session_state.difficulty_level)
    
    # Display in a two-column layout
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Vocabulary Level")
        st.write(examples["vocabulary"])
        
        st.markdown("#### Visual Style")
        st.write(examples["visual"])
    
    with col2:
        st.markdown("#### Concepts Introduced")
        st.write(examples["concepts"])
        
        st.markdown("#### Activity Complexity")
        st.write(examples["activities"])

def get_adaptive_content_examples(age_group, difficulty):
    """
    Return content examples adapted to age and difficulty level
    
    Args:
        age_group (str): The selected age group
        difficulty (str): The selected difficulty level
        
    Returns:
        dict: Examples of adapted content
    """
    examples = {
        "vocabulary": "",
        "visual": "",
        "concepts": "",
        "activities": ""
    }
    
    # Vocabulary adaptation
    if age_group == "7-8 years":
        examples["vocabulary"] = """We'll use simple words and explain new terms like:
- AI = Computer brain
- Algorithm = Computer recipe
- Data = Information
- Learning = How computers get better"""
    elif age_group == "9-10 years":
        examples["vocabulary"] = """We'll use grade-appropriate vocabulary and explain technical terms:
- Artificial Intelligence = Computer systems that can learn
- Algorithm = Step-by-step instructions for solving problems
- Dataset = Collection of information for training
- Machine Learning = How computers improve from examples"""
    else:  # 11-13
        examples["vocabulary"] = """We'll use more advanced terminology with explanations:
- Artificial Intelligence = Computer systems that simulate human intelligence
- Neural Networks = Computing systems inspired by the brain
- Training Data vs. Testing Data
- Supervised vs. Unsupervised Learning"""
    
    # Visual style adaptation
    if age_group == "7-8 years":
        examples["visual"] = """
- More colorful, playful characters
- Larger text and buttons
- Simple diagrams with fewer elements
- More animations and interactions
- Audio instructions available
"""
    elif age_group == "9-10 years":
        examples["visual"] = """
- Balanced colors and characters
- Standard-sized UI elements
- Moderately detailed diagrams
- Interactive elements with some complexity
- Text-based instructions with visuals
"""
    else:  # 11-13
        examples["visual"] = """
- More sophisticated design style
- Compact interface elements
- Detailed diagrams with multiple concepts
- Interactive visualizations with more variables
- Primarily text-based with supporting visuals
"""
    
    # Concepts adaptation based on difficulty
    if difficulty == "Easy":
        examples["concepts"] = """
- What is AI and how is it used
- Simple pattern recognition
- Supervised learning basics
- Friendly robots and assistants
- Basics of decision-making
"""
    elif difficulty == "Medium":
        examples["concepts"] = """
- How AI learns from data
- Multiple types of machine learning
- Image and speech recognition
- Neural networks simplified
- Introduction to AI ethics
"""
    else:  # Advanced
        examples["concepts"] = """
- Neural network architectures
- Training, validation, and testing
- Reinforcement learning concepts
- Bias in AI systems
- Real-world AI applications and limitations
"""
    
    # Activity complexity adaptation
    if difficulty == "Easy":
        examples["activities"] = """
- Guided tutorials with step-by-step instructions
- Pre-built examples to modify
- Visual programming with blocks
- Simple quizzes with multiple-choice questions
- Activities take 5-10 minutes to complete
"""
    elif difficulty == "Medium":
        examples["activities"] = """
- Semi-guided activities with hints available
- Templates with sections to complete
- Mix of visual and text-based programming
- Quizzes with multiple question types
- Activities take 10-15 minutes to complete
"""
    else:  # Advanced
        examples["activities"] = """
- Open-ended challenges with objectives
- Blank canvas projects with suggestions
- Text-based programming with documentation
- Projects and quizzes testing multiple concepts
- Activities take 15-20+ minutes to complete
"""
    
    return examples