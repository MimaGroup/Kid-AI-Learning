import streamlit as st

def display_difficulty_selector():
    """
    Display a difficulty selector that adapts content based on age and skill level
    """
    st.markdown("## Adaptive Learning System")
    
    # Create a container for the difficulty selector
    difficulty_selector_container = st.container()
    
    with difficulty_selector_container:
        # Create two columns for age group and difficulty
        col1, col2 = st.columns([1, 1])
        
        with col1:
            st.markdown("### Choose Your Age Group")
            age_group = st.radio(
                "Select your age group:",
                ["5-7 years", "8-10 years", "11-13 years"],
                key="age_group_selector",
                horizontal=True
            )
            
            st.markdown("""
            <div style="background-color: #f0f8ff; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <p style="margin: 0;">The content will be adapted to your age level!</p>
            </div>
            """, unsafe_allow_html=True)
        
        with col2:
            st.markdown("### Choose Difficulty Level")
            difficulty = st.select_slider(
                "Select difficulty level:",
                options=["Beginner", "Easy", "Medium", "Hard", "Expert"],
                value="Medium",
                key="difficulty_selector"
            )
            
            # Show emoji based on difficulty
            difficulty_emojis = {
                "Beginner": "🌱",
                "Easy": "🌟",
                "Medium": "🚀",
                "Hard": "🔥",
                "Expert": "🧠"
            }
            
            st.markdown(f"""
            <div style="text-align: center; margin-top: 10px;">
                <span style="font-size: 3rem;">{difficulty_emojis[difficulty]}</span>
            </div>
            """, unsafe_allow_html=True)
    
    # Show adaptive content examples
    st.markdown("### Adapted Content Preview")
    
    # Get adaptive content based on selections
    content_examples = get_adaptive_content_examples(age_group, difficulty)
    
    # Display the examples in tabs
    tab1, tab2, tab3 = st.tabs(["Content", "Activities", "Challenges"])
    
    with tab1:
        st.markdown(f"#### {content_examples['content_title']}")
        st.markdown(content_examples['content_description'])
        
        # Show vocabulary
        st.markdown("##### Key Vocabulary")
        
        for i, word in enumerate(content_examples['vocabulary']):
            st.markdown(f"""
            <div style="background-color: #e6f2ff; padding: 8px; border-radius: 5px; margin-bottom: 8px;">
                <span style="font-weight: bold;">{word['term']}:</span> {word['definition']}
            </div>
            """, unsafe_allow_html=True)
    
    with tab2:
        st.markdown("#### Learning Activities")
        
        for i, activity in enumerate(content_examples['activities']):
            activity_color = "#e6f7ff" if i % 2 == 0 else "#f2f8ff"
            st.markdown(f"""
            <div style="background-color: {activity_color}; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <h5 style="margin-top: 0;">{activity['title']}</h5>
                <p>{activity['description']}</p>
                <div style="margin-top: 5px;">
                    <span style="background-color: #4287f5; color: white; padding: 3px 8px; border-radius: 15px; font-size: 12px;">
                        {activity['time']} minutes
                    </span>
                    <span style="background-color: #42f59e; color: white; padding: 3px 8px; border-radius: 15px; font-size: 12px; margin-left: 8px;">
                        {activity['focus']}
                    </span>
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    with tab3:
        st.markdown("#### Learning Challenges")
        
        for i, challenge in enumerate(content_examples['challenges']):
            # Display challenge in an expander
            with st.expander(f"{i+1}. {challenge['title']}"):
                st.markdown(f"""
                {challenge['description']}
                
                **Skills needed:**
                - {challenge['skills'][0]}
                - {challenge['skills'][1]}
                - {challenge['skills'][2]}
                
                **Time needed:** {challenge['time']} minutes
                """)
                
                st.markdown("""
                <div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
                    <p style="margin: 0; font-style: italic;">
                        💡 Parents: This challenge is designed to help your child develop problem-solving
                        skills while learning AI concepts in an age-appropriate way.
                    </p>
                </div>
                """, unsafe_allow_html=True)
    
    # Show adaptation info
    with st.expander("How Content Adaptation Works"):
        st.markdown("""
        ### How Our Adaptive Learning System Works
        
        Our system changes learning content based on:
        
        1. **Age Group**
           - Adjusts vocabulary and concepts for different ages
           - Modifies examples to match interests of each age group
           - Simplifies complex topics for younger learners
        
        2. **Difficulty Level**
           - Beginner: Basic concepts with lots of guidance
           - Easy: Simple concepts with some guidance
           - Medium: More complex concepts with occasional help
           - Hard: Advanced concepts with minimal guidance
           - Expert: Complex projects with independent work
        
        3. **Progress Tracking**
           - Remembers what you've learned
           - Suggests new topics based on your interests
           - Increases difficulty as you master topics
        
        This helps every child learn at their own pace and in their own way!
        """)

def get_adaptive_content_examples(age_group, difficulty):
    """
    Return content examples adapted to age and difficulty level
    
    Args:
        age_group (str): The selected age group
        difficulty (str): The selected difficulty level
        
    Returns:
        dict: Examples of adapted content
    """
    # Base content structure
    content = {
        "content_title": "",
        "content_description": "",
        "vocabulary": [],
        "activities": [],
        "challenges": []
    }
    
    # Adapt content based on age group
    if age_group == "5-7 years":
        if difficulty == "Beginner":
            content["content_title"] = "What is AI? Meet Your Robot Friends!"
            content["content_description"] = """
            AI stands for Artificial Intelligence. AI is like a robot brain that can learn and solve problems.
            
            Imagine if your toys could think and talk to you - that's a bit like what AI can do!
            
            Let's learn about AI through colorful pictures and fun stories about friendly robots.
            """
            content["vocabulary"] = [
                {"term": "Robot", "definition": "A machine that can move and do things to help people"},
                {"term": "AI", "definition": "A computer brain that can think and learn like people"},
                {"term": "Smart", "definition": "When something can figure things out by itself"}
            ]
            content["activities"] = [
                {
                    "title": "Draw Your Robot Friend",
                    "description": "Draw a picture of a friendly robot. What can your robot do to help you?",
                    "time": "15",
                    "focus": "Creativity"
                },
                {
                    "title": "Robot Says Game",
                    "description": "Play a game like 'Simon Says' but with robot commands like 'Robot says beep' or 'Robot says spin'.",
                    "time": "10",
                    "focus": "Following Instructions"
                }
            ]
            content["challenges"] = [
                {
                    "title": "Robot Maze Helper",
                    "description": "Help a robot find its way through a simple maze by giving it step-by-step directions.",
                    "skills": ["Problem solving", "Directions", "Planning"],
                    "time": "10"
                },
                {
                    "title": "Sort the Toys",
                    "description": "Sort toy pictures into groups like 'animals', 'vehicles', and 'blocks' just like an AI would sort things.",
                    "skills": ["Classification", "Sorting", "Patterns"],
                    "time": "8"
                }
            ]
        elif difficulty in ["Easy", "Medium"]:
            content["content_title"] = "Teaching Computers to Learn"
            content["content_description"] = """
            Computers can learn just like you! When you play a game over and over, you get better at it.
            
            Computers can also get better at things by practicing lots of times. This is called "machine learning."
            
            Let's see how we can teach a computer to recognize pictures of animals!
            """
            content["vocabulary"] = [
                {"term": "Learn", "definition": "Getting better at something by practicing"},
                {"term": "Pattern", "definition": "Something that repeats in a way you can predict"},
                {"term": "Training", "definition": "Teaching a computer by showing it lots of examples"}
            ]
            # Additional content here...
        else:  # Hard or Expert
            content["content_title"] = "Creating Smart Robot Helpers"
            content["content_description"] = """
            Robots can be programmed to help people do all kinds of things! Some robots clean floors, some help build cars, and some can even explore space!
            
            These robots use AI (Artificial Intelligence) to make decisions and solve problems.
            
            Let's learn how to program a simple robot to follow our commands!
            """
            content["vocabulary"] = [
                {"term": "Program", "definition": "A set of instructions that tells a computer what to do"},
                {"term": "Command", "definition": "An instruction you give to a computer or robot"},
                {"term": "Sensor", "definition": "A part that helps robots detect things around them, like eyes and ears for robots"}
            ]
            # Additional content here...
    
    elif age_group == "8-10 years":
        if difficulty in ["Beginner", "Easy"]:
            content["content_title"] = "Introduction to AI: Smart Computer Brains"
            content["content_description"] = """
            Artificial Intelligence (AI) is technology that allows computers to think a bit like humans do. 
            AI can learn from examples, recognize patterns, and make decisions.
            
            Think of it like teaching a dog new tricks, but with computers! The more examples you show, the better it gets.
            
            Let's explore how AI works and some cool things it can do!
            """
            content["vocabulary"] = [
                {"term": "Algorithm", "definition": "A step-by-step set of instructions for solving a problem"},
                {"term": "Machine Learning", "definition": "How computers learn from examples instead of being directly programmed"},
                {"term": "Data", "definition": "Information that computers use to learn patterns and make decisions"}
            ]
            # Additional content here...
        elif difficulty == "Medium":
            content["content_title"] = "Machine Learning: Teaching Computers to Learn"
            content["content_description"] = """
            Machine Learning is a type of AI where computers learn from examples rather than following strict rules.
            
            For instance, if you show a computer thousands of cat pictures, it can learn to recognize cats in new pictures it has never seen before!
            
            This is similar to how you might learn to recognize animals - by seeing many examples rather than memorizing a list of features.
            """
            content["vocabulary"] = [
                {"term": "Training Data", "definition": "The examples we use to teach the computer"},
                {"term": "Prediction", "definition": "When the computer makes a guess based on what it has learned"},
                {"term": "Features", "definition": "The important details the computer uses to make decisions"}
            ]
            # Additional content here...
        else:  # Hard or Expert
            content["content_title"] = "Neural Networks: Computer Brains Inspired by Human Brains"
            content["content_description"] = """
            Neural networks are a special type of AI that work a bit like the human brain. They're made up of digital "neurons" that connect and communicate with each other.
            
            These networks can learn to do amazing things like recognize faces, understand speech, or even create art!
            
            Let's learn how neural networks work by building a simple one ourselves!
            """
            content["vocabulary"] = [
                {"term": "Neuron", "definition": "A basic processing unit in a neural network, inspired by brain cells"},
                {"term": "Layer", "definition": "A group of neurons that work together in a neural network"},
                {"term": "Connection", "definition": "The path where information flows between neurons"}
            ]
            # Additional content here...
    
    else:  # 11-13 years
        if difficulty in ["Beginner", "Easy"]:
            content["content_title"] = "AI Fundamentals: The Science of Smart Machines"
            content["content_description"] = """
            Artificial Intelligence is a field of computer science focused on creating systems that can perform tasks that typically require human intelligence.
            
            These include problem-solving, recognizing speech, understanding images, making decisions, and even learning from experience.
            
            AI systems are all around us - in voice assistants, recommendation systems, games, and many other applications.
            """
            content["vocabulary"] = [
                {"term": "Artificial Intelligence", "definition": "The field of making computers capable of intelligent behavior"},
                {"term": "Algorithm", "definition": "A precise sequence of operations that solve a specific problem"},
                {"term": "Training", "definition": "The process of teaching an AI by providing examples and feedback"}
            ]
            # Additional content here...
        elif difficulty == "Medium":
            content["content_title"] = "Machine Learning Fundamentals: Data-Driven Intelligence"
            content["content_description"] = """
            Machine Learning is a subset of AI that focuses on developing systems that improve automatically through experience.
            
            Unlike traditional programming where rules are explicitly coded, ML systems learn patterns from data and make predictions or decisions based on what they've learned.
            
            We'll explore the three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning.
            """
            content["vocabulary"] = [
                {"term": "Supervised Learning", "definition": "Learning from labeled examples (like a teacher showing correct answers)"},
                {"term": "Unsupervised Learning", "definition": "Finding patterns in data without specific guidance"},
                {"term": "Dataset", "definition": "A collection of data used to train and test machine learning models"}
            ]
            # Additional content here...
        else:  # Hard or Expert
            content["content_title"] = "Deep Learning and Neural Networks: Advanced AI Systems"
            content["content_description"] = """
            Deep Learning is a powerful technique in machine learning that uses complex neural networks with many layers (hence "deep").
            
            These systems can automatically discover important features in raw data without human guidance, making them incredibly powerful for tasks like image recognition, language translation, and game playing.
            
            Modern AI breakthroughs like self-driving cars, voice assistants, and AI art generators are powered by deep learning techniques.
            """
            content["vocabulary"] = [
                {"term": "Deep Learning", "definition": "Machine learning using neural networks with multiple layers"},
                {"term": "Backpropagation", "definition": "The key algorithm that allows neural networks to learn from mistakes"},
                {"term": "GPU", "definition": "Graphics Processing Unit - special hardware that helps train neural networks quickly"}
            ]
            # Additional content here...
    
    # Add common activities and challenges if they're empty
    if not content["activities"]:
        content["activities"] = [
            {
                "title": "Pattern Recognition Game",
                "description": "Find the patterns in a series of images, just like an AI would do in a computer vision task.",
                "time": "15",
                "focus": "Pattern Recognition"
            },
            {
                "title": "Decision Tree Builder",
                "description": "Build a simple decision tree to classify animals based on their features.",
                "time": "20",
                "focus": "Classification"
            },
            {
                "title": "AI Ethics Discussion",
                "description": "Discuss important questions about how AI should be used responsibly.",
                "time": "25",
                "focus": "Critical Thinking"
            }
        ]
    
    if not content["challenges"]:
        content["challenges"] = [
            {
                "title": "Train Your Own Classifier",
                "description": "Collect examples to train a simple image classifier to recognize different objects.",
                "skills": ["Data collection", "Classification", "Evaluation"],
                "time": "30"
            },
            {
                "title": "AI Detective",
                "description": "Use clues to figure out how an AI might have made specific decisions.",
                "skills": ["Analytical thinking", "Problem solving", "Logic"],
                "time": "25"
            },
            {
                "title": "Create an AI Storyboard",
                "description": "Design a storyboard showing how AI could help solve a real-world problem.",
                "skills": ["Creativity", "Planning", "Communication"],
                "time": "40"
            }
        ]
    
    return content