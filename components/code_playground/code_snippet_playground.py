import streamlit as st
import random

def display_code_snippet_playground():
    """
    Display a code snippet playground where kids can learn and experiment with simple code
    """
    st.markdown("""
    <div style="text-align: center; padding: 10px; background-color: #e8f4ff; border-radius: 10px; margin-bottom: 20px;">
        <h2>Code Snippet Playground</h2>
        <p>Experiment with real code and see what happens!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Choose a programming language
    language = st.selectbox(
        "Choose a programming language to explore:",
        ["Python for Kids", "Scratch-like Blocks", "HTML/CSS Basics"]
    )
    
    # Initialize session state for code
    if "code_playground_content" not in st.session_state:
        st.session_state.code_playground_content = {}
        
        # Default examples for each language
        st.session_state.code_playground_content["Python for Kids"] = '''# This is a simple drawing program
# Try changing the numbers and see what happens!

import turtle

t = turtle.Turtle()  # Create a turtle

# Draw a colorful square
t.pencolor("blue")   # Change the pen color
t.pensize(3)         # Change the pen size

for i in range(4):   # Repeat 4 times to make a square
    t.forward(100)   # Move forward
    t.right(90)      # Turn right 90 degrees
    
# Add a circle on top
t.pencolor("red")
t.penup()           # Lift the pen up
t.goto(50, 100)     # Move to a position
t.pendown()         # Put the pen down
t.circle(50)        # Draw a circle

# Write some text
t.penup()
t.goto(0, -50)
t.write("My Awesome Drawing!", font=("Arial", 16, "bold"))
'''
        
        st.session_state.code_playground_content["Scratch-like Blocks"] = '''when GREEN FLAG clicked
repeat 4 times
  move 100 steps
  turn right 90 degrees
end

go to x: 0 y: 0
say "Hello!" for 2 seconds

if <touching color [blue]> then
  play sound [meow]
else
  switch costume to [costume2]
end

when SPACE KEY pressed
  change [score] by 1
  if <[score] > [10]> then
    broadcast [win]
  end
'''
        
        st.session_state.code_playground_content["HTML/CSS Basics"] = '''<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: purple;
      text-align: center;
    }
    
    .cool-box {
      background-color: lightblue;
      border: 3px solid blue;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
      text-align: center;
    }
    
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>My Awesome Web Page</h1>
  
  <div class="cool-box">
    <h2>Welcome to my page!</h2>
    <p>This is a paragraph about me and my interests.</p>
    <button>Click Me!</button>
  </div>
</body>
</html>
'''
    
    # Display the code editor
    code = st.text_area(
        f"{language} Code",
        value=st.session_state.code_playground_content.get(language, ""),
        height=300
    )
    
    # Save the edited code
    st.session_state.code_playground_content[language] = code
    
    # Display execution section
    st.markdown("### Code Output")
    
    # Different outputs based on language
    if language == "Python for Kids":
        if st.button("Run Python Code"):
            st.markdown("""
            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 10px;">
                <p><strong>Code execution simulated:</strong></p>
                <img src="https://via.placeholder.com/500x300.png?text=Turtle+Drawing+Output" style="width: 100%; border-radius: 5px;" />
                <p><em>In a real Python environment, this would create a drawing with a turtle. This is a simulated visualization only.</em></p>
            </div>
            """, unsafe_allow_html=True)
            
            # Add explanation of the code
            explain_code(code, language)
    
    elif language == "Scratch-like Blocks":
        if st.button("Run Block Code"):
            st.markdown("""
            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 10px;">
                <p><strong>Block code execution simulated:</strong></p>
                <img src="https://via.placeholder.com/500x300.png?text=Scratch+Animation+Output" style="width: 100%; border-radius: 5px;" />
                <p><em>In Scratch, this would animate a sprite moving in a square pattern and responding to events.</em></p>
            </div>
            """, unsafe_allow_html=True)
            
            # Add explanation of the code
            explain_code(code, language)
    
    elif language == "HTML/CSS Basics":
        if st.button("Preview Web Page"):
            # Extract styles to show a preview
            st.markdown("""
            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 10px;">
                <p><strong>HTML/CSS Preview:</strong></p>
                <iframe srcdoc='%s' style="width: 100%%; height: 400px; border: 1px solid #ddd; border-radius: 5px;"></iframe>
            </div>
            """ % code.replace("'", "\\'"), unsafe_allow_html=True)
            
            # Add explanation of the code
            explain_code(code, language)
    
    # Show code challenges
    st.markdown("### Code Challenges")
    
    if language == "Python for Kids":
        challenges = [
            "Make the turtle draw a triangle instead of a square",
            "Change the colors to your favorite colors",
            "Make the turtle draw a house (square with a triangle on top)",
            "Add your name to the drawing"
        ]
    elif language == "Scratch-like Blocks":
        challenges = [
            "Make the sprite move in a triangle pattern",
            "Add a sound effect when the space key is pressed",
            "Make the sprite change color every time it moves",
            "Create a loop that makes the sprite grow and shrink"
        ]
    else:  # HTML/CSS
        challenges = [
            "Change the background color to your favorite color",
            "Add a list of your hobbies using <ul> and <li> tags",
            "Insert an image using the <img> tag",
            "Create a second cool-box with a different color"
        ]
    
    # Randomly select 2 challenges
    selected_challenges = random.sample(challenges, 2)
    
    for i, challenge in enumerate(selected_challenges):
        st.markdown(f"**Challenge {i+1}:** {challenge}")
    
    # Tips and help
    with st.expander("Tips & Resources"):
        if language == "Python for Kids":
            st.markdown("""
            ### Python Tips:
            
            - `forward(100)` - Move the turtle forward 100 pixels
            - `right(90)` - Turn the turtle right 90 degrees
            - `pencolor("red")` - Change the pen color to red
            - `pensize(5)` - Change the pen thickness to 5 pixels
            - `circle(50)` - Draw a circle with radius 50 pixels
            
            Try these colors: "red", "blue", "green", "purple", "orange"
            """)
        elif language == "Scratch-like Blocks":
            st.markdown("""
            ### Scratch-like Blocks Tips:
            
            - Motion blocks move the sprite around the screen
            - Looks blocks change how the sprite appears
            - Sound blocks play sounds and music
            - Events blocks start scripts when something happens
            - Control blocks include loops and conditionals
            
            Remember that indentation shows which blocks are inside loops or if-statements!
            """)
        else:  # HTML/CSS
            st.markdown("""
            ### HTML/CSS Tips:
            
            - HTML tags usually come in pairs like `<h1>` and `</h1>`
            - CSS properties end with semicolons like `color: blue;`
            - Change colors using names like `red` or codes like `#ff0000`
            - Add images with `<img src="picture.jpg">`
            - Create links with `<a href="https://example.com">Click me</a>`
            
            Try different fonts: "Arial", "Verdana", "Comic Sans MS", "Courier New"
            """)

def explain_code(code, language):
    """
    Provide a kid-friendly explanation of the code
    
    Args:
        code (str): The code to explain
        language (str): The programming language
    """
    st.markdown("### Code Explanation")
    
    if language == "Python for Kids":
        st.markdown("""
        This Python code uses a "turtle" to draw shapes:
        
        - The turtle is like a robot with a pen that follows your instructions
        - `forward()` tells the turtle to move ahead
        - `right()` tells the turtle to turn
        - `pencolor()` changes the color of the pen
        - A "for loop" is used to repeat instructions multiple times
        
        Try changing the numbers and colors to see what happens!
        """)
    
    elif language == "Scratch-like Blocks":
        st.markdown("""
        This block code is similar to Scratch programming:
        
        - When the green flag is clicked, the script starts
        - "Repeat" blocks make the same actions happen multiple times
        - "If-then" blocks make decisions based on conditions
        - "Broadcast" blocks send messages to other sprites
        - Events like pressing the space key can trigger actions
        
        Block programming is a great way to learn programming concepts without worrying about syntax!
        """)
    
    elif language == "HTML/CSS Basics":
        st.markdown("""
        This code creates a web page:
        
        - HTML is the structure of the page (headings, paragraphs, buttons)
        - CSS controls how things look (colors, sizes, fonts)
        - The `<style>` section contains all the appearance rules
        - Each element can have a "class" that applies specific styles
        - The web browser reads this code and displays it as a colorful page
        
        HTML and CSS are the building blocks of all websites!
        """)