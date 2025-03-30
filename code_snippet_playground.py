import streamlit as st
import time

def display_code_snippet_playground():
    """
    Display a code snippet playground where kids can learn and experiment with simple code
    """
    # Initialize session state variables if needed
    if "reset_code" not in st.session_state:
        st.session_state["reset_code"] = False
    if "reset_code_value" not in st.session_state:
        st.session_state["reset_code_value"] = None
        
    st.markdown("## Code Snippet Playground")
    
    # Code examples
    code_examples = {
        "Python - Simple AI Greeting": 
        '''
# This code makes a simple AI greeting
name = st.text_input("What's your name?")
if name:
    st.write(f"Hello {name}! I'm an AI that can talk to you.")
    st.balloons()
        ''',
        
        "Python - Smart Counter": 
        '''
# This code makes a counter that learns
if 'count' not in st.session_state:
    st.session_state.count = 0
    
if st.button("Count +1"):
    st.session_state.count += 1
    
st.write(f"The count is: {st.session_state.count}")

# Watch the number grow each time you click!
if st.session_state.count >= 10:
    st.success("Wow! You're a counting master!")
        ''',
        
        "Python - Emotion Detector": 
        '''
# This code detects emotions in text
text = st.text_area("Type a sentence with emotions:")

if text:
    if "happy" in text.lower() or "glad" in text.lower() or "joy" in text.lower():
        st.write("😊 I detect happiness in your text!")
    elif "sad" in text.lower() or "upset" in text.lower() or "unhappy" in text.lower():
        st.write("😢 I detect sadness in your text!")
    elif "angry" in text.lower() or "mad" in text.lower() or "furious" in text.lower():
        st.write("😠 I detect anger in your text!")
    else:
        st.write("🤔 I'm not sure what emotion your text shows.")
        ''',
        
        "Python - AI Decision Maker": 
        '''
# This code helps make decisions
import random

question = st.text_input("Ask me a yes/no question:")

if question:
    st.write("🤖 Thinking...")
    time.sleep(1)  # Simulate AI "thinking"
    
    # This simple AI makes random choices
    # Real AI would be more sophisticated!
    answer = random.choice([
        "Yes, definitely!",
        "I think yes.",
        "Maybe...",
        "I'm not sure about that.",
        "I don't think so.",
        "No, probably not."
    ])
    
    st.write(f"🤖 {answer}")
        '''
    }
    
    # Create tabs for the different examples
    example_selection = st.selectbox(
        "Choose a code example:", 
        list(code_examples.keys()),
        key="code_example_selectbox"
    )
    
    # Create a two-column layout
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### Code Editor")
        # Get the selected example
        default_code = code_examples[example_selection]
        
        # Handle reset code logic
        initial_value = default_code
        if st.session_state["reset_code"] and st.session_state["reset_code_value"] is not None:
            initial_value = st.session_state["reset_code_value"]
            # Reset the flag
            st.session_state["reset_code"] = False
        
        # Create an editable text area with the example code
        code = st.text_area(
            "Edit the code below:", 
            value=initial_value,
            height=300,
            key="code_editor_textarea"
        )
        
        # Add a reset button
        if st.button("Reset Code", key="reset_code_button"):
            # Create a session state variable to indicate reset is needed
            st.session_state["reset_code"] = True
            st.session_state["reset_code_value"] = default_code
            st.rerun()
    
    with col2:
        st.markdown("### Code Output")
        st.markdown("What your code does:")
        
        with st.expander("How it works", expanded=True):
            st.markdown("""
            In this playground:
            1. The left side shows the code you can edit
            2. The right side (here) shows what happens when the code runs
            3. Try changing numbers or text in the code to see what happens!
            """)
        
        # Create a container for the code output
        code_output_container = st.container()
        
        # Execute the code in the container
        with code_output_container:
            try:
                exec(code)
            except Exception as e:
                st.error(f"Oops! Something went wrong: {str(e)}")
                st.markdown("""
                Don't worry! Errors are part of coding. 
                Try to fix the code and run it again.
                """)
    
    # Display an explanation of the code
    with st.expander("Code Explanation"):
        explain_code(code, "Python")

def explain_code(code, language):
    """
    Provide a kid-friendly explanation of the code
    
    Args:
        code (str): The code to explain
        language (str): The programming language
    """
    # Simple explanations for the example codes
    explanations = {
        "# This code makes a simple AI greeting": 
            """
            This code creates a friendly AI that asks for your name. When you type your name:
            
            1. The AI remembers it and creates a personalized greeting
            2. It shows a fun celebration with balloons!
            
            This is similar to how virtual assistants like Siri or Alexa remember your name.
            """,
            
        "# This code makes a counter that learns": 
            """
            This code creates a smart counter that:
            
            1. Remembers the number even when you click other things
            2. Adds 1 each time you press the button
            3. Celebrates when you reach 10!
            
            This is similar to how computers keep track of scores in games.
            """,
            
        "# This code detects emotions in text": 
            """
            This code creates a simple emotion detector that:
            
            1. Looks at the words you type
            2. Searches for emotion words like "happy" or "sad"
            3. Tells you what emotion it found
            
            This is similar to how AI can understand feelings in text messages or reviews!
            """,
            
        "# This code helps make decisions": 
            """
            This code creates a decision-making assistant that:
            
            1. Takes your question
            2. Pretends to think about it (using a small delay)
            3. Gives a random answer from its list of possible responses
            
            Real AI decision makers use much more complex calculations, but they follow the same basic idea of taking input and providing output based on programmed rules or learning.
            """
    }
    
    # Find which explanation matches the code
    for key, explanation in explanations.items():
        if key in code:
            st.markdown(explanation)
            return
    
    # Default explanation if no matches found
    st.markdown("""
    This code is written in Python, one of the most popular programming languages for AI.
    
    Code works by giving the computer step-by-step instructions:
    1. Input - Getting information (like from text boxes or buttons)
    2. Processing - Making decisions with that information
    3. Output - Showing results on the screen
    
    Try changing values in the code to see how it affects the result!
    """)