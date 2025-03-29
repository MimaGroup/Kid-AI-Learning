import streamlit as st
import random
import json
import os

def display_ai_personality_creator():
    """Display an interface for kids to build their own AI friend with personality"""
    st.markdown("## Create Your AI Assistant")
    
    # Get or initialize AI friend data
    ai_friend = load_ai_friend()
    
    # Create form for building the AI friend
    with st.form("ai_friend_builder_form"):
        st.markdown("### Design Your AI Friend")
        
        # Two columns for form elements
        col1, col2 = st.columns([1, 1])
        
        with col1:
            # Name
            friend_name = st.text_input(
                "What's your AI friend's name?",
                value=ai_friend.get("name", ""),
                max_chars=20,
                placeholder="Ex: Byte, Pixel, Nova..."
            )
            
            # Personality traits
            personality_options = [
                "Friendly", "Curious", "Funny", "Smart", 
                "Creative", "Helpful", "Kind", "Brave"
            ]
            personality = st.multiselect(
                "Select personality traits (up to 3):",
                options=personality_options,
                default=ai_friend.get("personality", [])[:3],
                max_selections=3
            )
            
            # Voice style
            voice_options = ["Cheerful", "Calm", "Energetic", "Wise", "Playful"]
            voice = st.select_slider(
                "Voice style:",
                options=voice_options,
                value=ai_friend.get("voice", "Cheerful")
            )
        
        with col2:
            # Avatar style
            avatar_options = ["Robot", "Animal", "Alien", "Emoji", "Superhero"]
            avatar = st.selectbox(
                "Choose avatar style:",
                options=avatar_options,
                index=avatar_options.index(ai_friend.get("avatar", "Robot")) if ai_friend.get("avatar") in avatar_options else 0
            )
            
            # Color theme
            color_options = {
                "Blue Sky": "#4287f5",
                "Purple Galaxy": "#9542f5",
                "Green Forest": "#42f57b",
                "Coral Reef": "#f5426a",
                "Sunset Orange": "#f58c42"
            }
            color_theme = st.radio(
                "Color theme:",
                options=list(color_options.keys()),
                index=list(color_options.keys()).index(ai_friend.get("color_theme", "Blue Sky")) if ai_friend.get("color_theme") in color_options else 0,
                horizontal=True
            )
            
            # Special skills
            skill_options = [
                "Telling Stories", "Solving Puzzles", "Teaching Science", 
                "Art Projects", "Music Creation", "History Facts",
                "Math Helper", "Language Translator"
            ]
            skills = st.multiselect(
                "Special skills (up to 3):",
                options=skill_options,
                default=ai_friend.get("skills", [])[:3],
                max_selections=3
            )
        
        # Submit button
        submitted = st.form_submit_button("Create My AI Friend!")
        
        if submitted:
            # Save the AI friend data
            ai_friend = {
                "name": friend_name if friend_name else "Byte",
                "personality": personality,
                "voice": voice,
                "avatar": avatar,
                "color_theme": color_theme,
                "skills": skills,
                "color_hex": color_options[color_theme]
            }
            save_ai_friend(ai_friend)
            st.rerun()  # Reload to show the created friend
    
    # Show created friend if data exists
    if "name" in ai_friend and ai_friend["name"]:
        display_created_friend(ai_friend)
    
    # Show preview during creation
    else:
        display_ai_friend_preview()

def display_ai_friend_preview():
    """Display a preview of the AI friend being built"""
    st.markdown("### AI Friend Preview")
    st.markdown("""
    Your AI friend will be shown here after you create it!
    
    You'll be able to:
    - Chat with your AI friend
    - Ask questions about AI
    - Get help with learning activities
    - Personalize the AI to match your interests
    """)
    
    # Show a placeholder image/icon
    st.markdown("""
    <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 80px;">🤖</span>
        <p style="opacity: 0.7;">Your AI friend is waiting to be created!</p>
    </div>
    """, unsafe_allow_html=True)

def display_created_friend(friend_data):
    """Display the created AI friend with interactions"""
    st.markdown(f"### Meet {friend_data['name']}!")
    
    # Get the avatar emoji
    avatar_emoji = get_avatar_emoji(friend_data["avatar"])
    
    # Get the color and a lighter shade for gradient
    color = friend_data["color_hex"]
    light_color = adjust_color_brightness(color, 40)
    
    # Display avatar with speech bubble
    col1, col2 = st.columns([1, 3])
    
    with col1:
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, {color} 0%, {light_color} 100%); 
                    border-radius: 50%; 
                    width: 120px; 
                    height: 120px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    font-size: 60px;
                    margin: 0 auto;">
            {avatar_emoji}
        </div>
        
        <div style="text-align: center; margin-top: 10px;">
            <h4 style="margin: 0; color: {color};">{friend_data['name']}</h4>
            <p style="font-size: 14px; opacity: 0.8;">
                {', '.join(friend_data['personality'])}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div style="background-color: #f5f5f5; 
                    border-radius: 15px; 
                    padding: 15px; 
                    position: relative;
                    margin-left: 15px;
                    min-height: 120px;
                    display: flex;
                    align-items: center;">
            <div style="position: absolute; 
                        left: -15px; 
                        top: 20px; 
                        width: 0; 
                        height: 0; 
                        border-top: 15px solid transparent;
                        border-bottom: 15px solid transparent; 
                        border-right: 15px solid #f5f5f5;"></div>
            <p style="margin: 0; font-size: 16px;">
                Hi there! I'm <span style="color: {color}; font-weight: bold;">{friend_data['name']}</span>, 
                your personal AI assistant. I'm {friend_data['voice'].lower()} and {friend_data['personality'][0].lower() if friend_data['personality'] else 'friendly'}. 
                I'm really good at {', '.join(friend_data['skills'][:2]) if len(friend_data['skills']) >= 2 else (friend_data['skills'][0] if friend_data['skills'] else 'helping you learn')}. 
                What would you like to talk about today?
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    # Interaction options
    st.markdown("### Chat with Your AI Friend")
    
    # Topic selection
    topic_options = [
        "Tell me about AI", 
        "Help me with a project", 
        "Let's play a game",
        "Teach me something new",
        "Tell me a story"
    ]
    
    topic = st.selectbox(
        "Choose what to talk about:",
        options=topic_options
    )
    
    # Response based on topic and AI personality
    if st.button("Talk to " + friend_data["name"]):
        response = generate_response(topic, friend_data["personality"], friend_data["skills"])
        
        st.markdown(f"""
        <div style="background: linear-gradient(135deg, {light_color} 0%, #ffffff 100%); 
                    border-radius: 15px; 
                    padding: 20px; 
                    margin-top: 20px;
                    border: 1px solid {color};">
            <p style="margin: 0;">
                <span style="color: {color}; font-weight: bold;">{friend_data['name']}:</span> {response}
            </p>
        </div>
        """, unsafe_allow_html=True)
    
    # Friend stats
    st.markdown("### AI Friend Stats")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown(f"""
        <div style="text-align: center; padding: 10px; background-color: #f0f4f8; border-radius: 10px;">
            <div style="font-size: 24px; margin-bottom: 5px;">🧠</div>
            <div style="font-weight: bold; margin-bottom: 5px;">Knowledge Areas</div>
            <div style="font-size: 14px;">
                {friend_data['skills'][0] if friend_data['skills'] else 'General Knowledge'}<br>
                {friend_data['skills'][1] if len(friend_data['skills']) > 1 else 'Learning Assistant'}<br>
                {friend_data['skills'][2] if len(friend_data['skills']) > 2 else 'Friendly Chat'}
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div style="text-align: center; padding: 10px; background-color: #f0f4f8; border-radius: 10px;">
            <div style="font-size: 24px; margin-bottom: 5px;">🔊</div>
            <div style="font-weight: bold; margin-bottom: 5px;">Voice Style</div>
            <div style="font-size: 14px;">
                {friend_data['voice']}<br>
                Clear and easy to understand<br>
                Age-appropriate language
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"""
        <div style="text-align: center; padding: 10px; background-color: #f0f4f8; border-radius: 10px;">
            <div style="font-size: 24px; margin-bottom: 5px;">😊</div>
            <div style="font-weight: bold; margin-bottom: 5px;">Personality</div>
            <div style="font-size: 14px;">
                {friend_data['personality'][0] if friend_data['personality'] else 'Friendly'}<br>
                {friend_data['personality'][1] if len(friend_data['personality']) > 1 else 'Helpful'}<br>
                {friend_data['personality'][2] if len(friend_data['personality']) > 2 else 'Patient'}
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Customization option
    st.markdown("---")
    if st.button("Customize " + friend_data["name"]):
        # Clear the current friend data to go back to editing mode
        save_ai_friend({})
        st.rerun()
    
    # Fun facts about AI assistants
    with st.expander("Fun Facts About AI Assistants"):
        st.markdown("""
        - AI assistants like yours can learn from the conversations they have
        - They use machine learning to understand what you're asking
        - Real AI assistants process your questions using neural networks
        - They can be trained to be experts in specific topics
        - Modern AI assistants can recognize images, sounds, and text
        """)

def display_ai_project_builder():
    """Display an interface for kids to build their own AI projects"""
    st.markdown("## AI Project Builder")
    
    # Project selection
    project_options = {
        "Image Classifier": {
            "description": "Create an AI that can identify objects in pictures",
            "difficulty": "Medium",
            "ages": "8-13",
            "components": ["Data Collection", "Training", "Testing"],
            "icon": "🖼️"
        },
        "Chatbot": {
            "description": "Build a simple AI that can chat with you",
            "difficulty": "Easy",
            "ages": "7-13",
            "components": ["Responses", "Pattern Matching", "Memory"],
            "icon": "💬"
        },
        "Music Generator": {
            "description": "Create an AI that makes simple melodies",
            "difficulty": "Hard",
            "ages": "10-13",
            "components": ["Pattern Learning", "Composition Rules", "Sound Output"],
            "icon": "🎵"
        },
        "Smart Game": {
            "description": "Build a game with an AI opponent",
            "difficulty": "Medium",
            "ages": "9-13",
            "components": ["Game Rules", "Decision Making", "Learning from Wins/Losses"],
            "icon": "🎮"
        }
    }
    
    # Display project cards
    selected_project = None
    col1, col2 = st.columns(2)
    
    # First row of project cards
    with col1:
        if display_project_card("Image Classifier", project_options["Image Classifier"]):
            selected_project = "Image Classifier"
    
    with col2:
        if display_project_card("Chatbot", project_options["Chatbot"]):
            selected_project = "Chatbot"
    
    # Second row of project cards
    col3, col4 = st.columns(2)
    
    with col3:
        if display_project_card("Music Generator", project_options["Music Generator"]):
            selected_project = "Music Generator"
    
    with col4:
        if display_project_card("Smart Game", project_options["Smart Game"]):
            selected_project = "Smart Game"
    
    # Display selected project builder
    if selected_project:
        st.markdown(f"## Build Your {selected_project}")
        st.markdown(f"{project_options[selected_project]['description']}")
        
        # Display the appropriate project builder
        if selected_project == "Image Classifier":
            display_image_classifier_builder()
        elif selected_project == "Chatbot":
            display_chatbot_builder()
        elif selected_project == "Music Generator":
            display_music_generator_builder()
        elif selected_project == "Smart Game":
            display_smart_game_builder()
    
    else:
        # Default instructions
        st.markdown("""
        ### How to Build Your AI Project
        
        1. **Choose** a project type from the cards above
        2. **Customize** your project settings
        3. **Train** your AI with examples
        4. **Test** your creation
        5. **Share** what you've learned
        
        All projects use simplified AI concepts that are easy to understand!
        """)

def display_project_card(name, project_info):
    """Display a card for an AI project and return True if selected"""
    # Color based on difficulty
    difficulty_colors = {
        "Easy": "#4CAF50",
        "Medium": "#2196F3",
        "Hard": "#FF9800"
    }
    color = difficulty_colors.get(project_info["difficulty"], "#607D8B")
    
    # Create card with HTML
    st.markdown(f"""
    <div style="border: 2px solid {color}; border-radius: 10px; padding: 15px; margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h3 style="margin: 0; color: {color};">{name}</h3>
            <span style="font-size: 30px;">{project_info["icon"]}</span>
        </div>
        <p>{project_info["description"]}</p>
        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <span style="background-color: {color}; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                {project_info["difficulty"]}
            </span>
            <span style="background-color: #607D8B; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                Ages {project_info["ages"]}
            </span>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Return True if this card is selected
    return st.button(f"Build {name}", key=f"build_{name}")

def display_image_classifier_builder():
    """Display the interface for building an image classifier"""
    st.markdown("### Create Your Image Classifier")
    
    # Tabs for the different stages
    tabs = st.tabs(["1. Setup", "2. Training", "3. Testing"])
    
    with tabs[0]:
        st.markdown("#### Setup Your Classifier")
        
        st.markdown("""
        An image classifier is an AI that can identify what's in a picture.
        Let's set up a simple one!
        """)
        
        # Project settings
        col1, col2 = st.columns(2)
        
        with col1:
            st.selectbox(
                "What would you like your AI to identify?",
                options=["Animals", "Fruits", "Vehicles", "Shapes", "Weather"]
            )
        
        with col2:
            st.slider(
                "How many different things should it recognize?",
                min_value=2,
                max_value=5,
                value=3
            )
        
        # Example of how it works
        st.markdown("#### How Image Classification Works")
        
        st.markdown("""
        1. **Collect Examples**: Show your AI many pictures of each thing you want it to recognize
        2. **Extract Features**: The AI looks for patterns in each image (colors, shapes, edges)
        3. **Train the Model**: The AI learns which features match which objects
        4. **Test**: See if your AI can correctly identify new pictures it hasn't seen before
        """)
        
        st.image("https://via.placeholder.com/600x200.png?text=Image+Classification+Diagram", 
                 caption="How an image classifier works",
                 use_column_width=True)
    
    with tabs[1]:
        st.markdown("#### Train Your Classifier")
        
        st.markdown("""
        In this step, you would normally:
        1. Upload pictures of each category
        2. Label each picture correctly
        3. Train your AI using these examples
        
        For our demo, we'll use pre-collected images.
        """)
        
        # Simulate training data
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("**Training Images Per Category:**")
            st.slider("Cat images", min_value=5, max_value=50, value=20)
            st.slider("Dog images", min_value=5, max_value=50, value=20)
            st.slider("Bird images", min_value=5, max_value=50, value=20)
        
        with col2:
            st.markdown("**Model Settings:**")
            st.select_slider(
                "Learning Speed",
                options=["Slow but Accurate", "Balanced", "Fast but Less Accurate"],
                value="Balanced"
            )
            st.checkbox("Use image enhancement", value=True)
            st.checkbox("Remember training examples", value=True)
        
        # Training button
        if st.button("Train My Classifier"):
            # Simulate training process
            progress_bar = st.progress(0)
            for i in range(100):
                # Update progress bar
                progress_bar.progress(i + 1)
            
            st.success("Training complete! Your image classifier is ready to test.")
    
    with tabs[2]:
        st.markdown("#### Test Your Classifier")
        
        st.markdown("""
        Now it's time to see how well your AI classifier works!
        
        In a real app, you could:
        1. Upload a new image
        2. See what your AI thinks it is
        3. Give feedback to improve your AI
        
        Let's simulate testing with some example images.
        """)
        
        # Test image selection
        test_image = st.selectbox(
            "Select a test image:",
            options=["Cat on a sofa", "Dog in the park", "Bird on a branch", "Cat and dog together"]
        )
        
        # Show a placeholder image
        st.image("https://via.placeholder.com/400x300.png?text=Test+Image",
                 caption=f"Test image: {test_image}",
                 use_column_width=True)
        
        # Simulate AI prediction
        if st.button("What is this?"):
            # Determine the "correct" prediction based on the selected test image
            if "Cat" in test_image and "dog" not in test_image:
                prediction = "Cat"
                confidence = 0.92
            elif "Dog" in test_image and "cat" not in test_image:
                prediction = "Dog"
                confidence = 0.89
            elif "Bird" in test_image:
                prediction = "Bird"
                confidence = 0.95
            else:
                # For the "Cat and dog together" case
                prediction = "Cat"
                confidence = 0.61
                st.markdown("""
                **Other possibilities:**
                - Dog: 38% confident
                - Bird: 1% confident
                
                *Note: The AI is confused because there are multiple objects in this image!*
                """)
            
            st.success(f"I think this is a **{prediction}** (I'm {confidence:.0%} confident)")
            
            # Only show the confidence visualization for single-object images
            if "together" not in test_image:
                # Create a horizontal bar chart for confidence
                col1, col2, col3 = st.columns([1, 2, 1])
                with col2:
                    st.markdown("### Confidence Levels")
                    
                    # Determine the other confidences
                    if prediction == "Cat":
                        dog_conf = (1 - confidence) * 0.8
                        bird_conf = (1 - confidence) * 0.2
                    elif prediction == "Dog":
                        cat_conf = (1 - confidence) * 0.8
                        bird_conf = (1 - confidence) * 0.2
                    else:  # Bird
                        cat_conf = (1 - confidence) * 0.5
                        dog_conf = (1 - confidence) * 0.5
                    
                    # Display confidence bars
                    st.markdown(f"""
                    <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                        <div style="width: {confidence*100:.0f}%; background-color: #4CAF50; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                            {prediction}: {confidence*100:.0f}%
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    if prediction == "Cat":
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {dog_conf*100:.0f}%; background-color: #2196F3; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Dog: {dog_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                        
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {bird_conf*100:.0f}%; background-color: #FF9800; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Bird: {bird_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                    
                    elif prediction == "Dog":
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {cat_conf*100:.0f}%; background-color: #4CAF50; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Cat: {cat_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                        
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {bird_conf*100:.0f}%; background-color: #FF9800; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Bird: {bird_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                    
                    else:  # Bird
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {cat_conf*100:.0f}%; background-color: #4CAF50; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Cat: {cat_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
                        
                        st.markdown(f"""
                        <div style="width: 100%; background-color: #f0f0f0; border-radius: 5px; margin-bottom: 10px;">
                            <div style="width: {dog_conf*100:.0f}%; background-color: #2196F3; padding: 10px 0; border-radius: 5px; text-align: center; color: white;">
                                Dog: {dog_conf*100:.0f}%
                            </div>
                        </div>
                        """, unsafe_allow_html=True)
            
            # Offer feedback option
            feedback = st.radio(
                "Was the AI correct?",
                options=["Yes", "No"],
                horizontal=True
            )
            
            if feedback == "No":
                st.markdown("""
                Thanks for your feedback! In a real app, this would help the AI learn and improve.
                
                The AI might be confused because:
                - The image contains unusual colors or lighting
                - The object is in an unusual position or partially hidden
                - There are multiple objects in the image
                """)

def display_chatbot_builder():
    """Display the interface for building a simple chatbot"""
    st.markdown("### Create Your AI Chatbot")
    
    # Tabs for the different stages
    tabs = st.tabs(["1. Personality", "2. Responses", "3. Test Chat"])
    
    with tabs[0]:
        st.markdown("#### Design Your Chatbot's Personality")
        
        # Chatbot name and purpose
        col1, col2 = st.columns(2)
        
        with col1:
            chatbot_name = st.text_input(
                "What's your chatbot's name?",
                value="Chatter",
                max_chars=20
            )
            
            chatbot_purpose = st.selectbox(
                "What's your chatbot's main purpose?",
                options=[
                    "General Chat", 
                    "Homework Helper", 
                    "Science Facts", 
                    "Story Creator",
                    "Joke Teller"
                ]
            )
        
        with col2:
            chatbot_personality = st.select_slider(
                "Personality style:",
                options=["Serious", "Balanced", "Playful"],
                value="Balanced"
            )
            
            chatbot_knowledge = st.select_slider(
                "Knowledge detail level:",
                options=["Basic", "Moderate", "Detailed"],
                value="Moderate"
            )
        
        # Chatbot avatar
        st.markdown("#### Choose an Avatar")
        avatar_cols = st.columns(5)
        
        avatar_options = ["🤖", "🧠", "🦊", "🐱", "👩‍🔬"]
        selected_avatar = st.session_state.get("selected_avatar", avatar_options[0])
        
        for i, avatar in enumerate(avatar_options):
            with avatar_cols[i]:
                if st.button(
                    avatar, 
                    key=f"avatar_{i}",
                    help=f"Select this avatar for your chatbot",
                    use_container_width=True
                ):
                    st.session_state.selected_avatar = avatar
                    selected_avatar = avatar
            
        # Show the selected avatar
        st.markdown(f"""
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 60px; margin-bottom: 10px;">{selected_avatar}</div>
            <div style="font-weight: bold; font-size: 18px;">{chatbot_name}</div>
            <div style="font-size: 14px; opacity: 0.8;">{chatbot_purpose} | {chatbot_personality} | {chatbot_knowledge}</div>
        </div>
        """, unsafe_allow_html=True)
    
    with tabs[1]:
        st.markdown("#### Program Your Chatbot's Responses")
        
        st.markdown("""
        Teach your chatbot how to respond to different types of messages.
        
        In a real AI chatbot, this would be done through training on many examples,
        but for our simple one, we'll define some basic rules.
        """)
        
        # Greeting response
        st.markdown("##### Greeting Response")
        greeting_response = st.text_area(
            "How should your chatbot respond to 'Hello' or 'Hi'?",
            value=f"Hi there! I'm {st.session_state.get('chatbot_name', 'Chatter')}, your friendly AI assistant. How can I help you today?",
            height=80
        )
        
        # Question response strategy
        st.markdown("##### Question Strategy")
        question_strategy = st.radio(
            "How should your chatbot handle questions it doesn't know the answer to?",
            options=[
                "Admit it doesn't know and offer to look it up",
                "Make an educated guess but clarify it's not certain",
                "Ask clarifying questions to better understand",
                "Change the subject to something it knows about"
            ]
        )
        
        # Special phrases
        st.markdown("##### Special Phrases")
        col1, col2 = st.columns(2)
        
        with col1:
            joke_phrase = st.text_input(
                "Your chatbot's favorite joke:",
                value="Why don't scientists trust atoms? Because they make up everything!"
            )
        
        with col2:
            fact_phrase = st.text_input(
                "An interesting fact your chatbot can share:",
                value="The human brain has about 86 billion neurons!"
            )
        
        # Persona consistency
        st.markdown("##### Maintaining Personality")
        st.info(f"""
        To make your chatbot feel consistent, we'll make sure its responses always match its personality.
        
        Your {st.session_state.get('chatbot_personality', 'Balanced')} chatbot will use appropriate language and tone in all responses.
        """)
    
    with tabs[2]:
        st.markdown("#### Test Your Chatbot")
        
        # Chat interface
        st.markdown(f"""
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="font-size: 40px; margin-right: 15px;">{st.session_state.get('selected_avatar', '🤖')}</div>
            <div>
                <div style="font-weight: bold; font-size: 18px;">{st.session_state.get('chatbot_name', 'Chatter')}</div>
                <div style="font-size: 14px; opacity: 0.8;">Ready to chat!</div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Initialize chat history
        if "chatbot_messages" not in st.session_state:
            st.session_state.chatbot_messages = [
                {"role": "assistant", "content": f"Hi! I'm {st.session_state.get('chatbot_name', 'Chatter')}. What would you like to talk about?"}
            ]
        
        # Display chat messages
        for message in st.session_state.chatbot_messages:
            if message["role"] == "user":
                st.chat_message("user").write(message["content"])
            else:
                st.chat_message("assistant", avatar=st.session_state.get('selected_avatar', '🤖')).write(message["content"])
        
        # Chat input
        if prompt := st.chat_input("Type your message..."):
            # Add user message to chat history
            st.session_state.chatbot_messages.append({"role": "user", "content": prompt})
            
            # Display user message
            st.chat_message("user").write(prompt)
            
            # Generate bot response (simplified)
            if "hello" in prompt.lower() or "hi" in prompt.lower():
                response = greeting_response
            elif "joke" in prompt.lower():
                response = joke_phrase
            elif "fact" in prompt.lower() or "interesting" in prompt.lower():
                response = fact_phrase
            elif "?" in prompt:
                # Simple question handling based on strategy
                if question_strategy.startswith("Admit"):
                    response = "I'm not fully sure about that. Would you like me to look up more information for you?"
                elif question_strategy.startswith("Make"):
                    response = "I think the answer might be related to how AI systems process information, but I'm not 100% certain."
                elif question_strategy.startswith("Ask"):
                    response = "That's an interesting question. Can you tell me more about what aspect you're most curious about?"
                else:
                    response = "Speaking of questions, did you know that " + fact_phrase
            else:
                # Generic responses
                generic_responses = [
                    f"That's interesting! Can you tell me more?",
                    f"I see. What else would you like to talk about?",
                    f"Thanks for sharing that with me. How does that make you feel?",
                    f"I'm designed to learn from our conversations. This helps me understand {prompt} better.",
                    f"I appreciate you chatting with me! What else is on your mind?"
                ]
                response = random.choice(generic_responses)
            
            # Add bot response to chat history
            st.session_state.chatbot_messages.append({"role": "assistant", "content": response})
            
            # Display bot response
            st.chat_message("assistant", avatar=st.session_state.get('selected_avatar', '🤖')).write(response)
        
        # Reset chat button
        if st.button("Reset Chat"):
            st.session_state.chatbot_messages = [
                {"role": "assistant", "content": f"Hi! I'm {st.session_state.get('chatbot_name', 'Chatter')}. What would you like to talk about?"}
            ]
            st.rerun()

def display_music_generator_builder():
    """Display the interface for building a music generator"""
    st.markdown("### Create Your AI Music Generator")
    
    st.markdown("""
    This advanced tool lets you create a simple AI system that can generate music.
    
    In real music AI, neural networks are trained on thousands of songs to learn patterns.
    Our simplified version will use basic rules of music theory.
    """)
    
    # Coming soon message
    st.info("🎵 Full music generator coming soon! This is an advanced project.")
    
    # Simplified version
    st.markdown("#### Simple Melody Generator")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Music style
        music_style = st.selectbox(
            "Choose a music style:",
            options=["Happy", "Sad", "Energetic", "Calm", "Mysterious"]
        )
        
        # Instrument
        instrument = st.selectbox(
            "Choose main instrument:",
            options=["Piano", "Guitar", "Electronic", "Xylophone", "Flute"]
        )
    
    with col2:
        # Length
        length = st.slider(
            "Melody length (seconds):",
            min_value=5,
            max_value=30,
            value=15,
            step=5
        )
        
        # Complexity
        complexity = st.select_slider(
            "Complexity:",
            options=["Very Simple", "Simple", "Medium", "Complex", "Very Complex"],
            value="Medium"
        )
    
    # Generate button
    if st.button("Generate Melody"):
        # Show a progress bar
        progress_bar = st.progress(0)
        
        for i in range(100):
            # Update progress bar
            progress_bar.progress(i + 1)
        
        st.success("Melody generated! In a complete app, you could play it here.")
        
        # Explain what happened
        st.markdown(f"""
        You created a {length}-second {music_style.lower()} melody using a {instrument.lower()} sound.
        
        ##### How This Works:
        
        1. The AI uses basic rules of music theory for {music_style.lower()} melodies
        2. It generates a sequence of notes that follow these patterns
        3. The complexity level ({complexity.lower()}) determines how many notes and variations are used
        4. In a full AI system, this would be powered by neural networks trained on thousands of songs
        
        In a complete app, you would hear the melody and could save or share your creation.
        """)
        
        # Visualization placeholder
        st.image("https://via.placeholder.com/600x200.png?text=Music+Visualization",
                 caption=f"{music_style} Melody Visualization",
                 use_column_width=True)

def display_smart_game_builder():
    """Display the interface for building a game with AI"""
    st.markdown("### Create a Game with AI")
    
    # Game type selection
    game_type = st.radio(
        "Choose your game type:",
        options=["Tic-Tac-Toe", "Number Guessing", "Word Puzzle", "Adventure Game"],
        horizontal=True
    )
    
    # AI opponent difficulty
    ai_difficulty = st.select_slider(
        "AI opponent difficulty:",
        options=["Beginner", "Easy", "Medium", "Hard", "Expert"],
        value="Medium"
    )
    
    st.markdown("""
    #### How Game AI Works
    
    AI in games can use different techniques:
    
    1. **Rule-based AI**: Follows specific rules to make decisions
    2. **Search algorithms**: Looks ahead at possible moves to find the best one
    3. **Learning systems**: Improves by playing many games and learning patterns
    4. **Adaptive AI**: Changes its strategy based on how you play
    """)
    
    # Display specific game builder based on selection
    if game_type == "Tic-Tac-Toe":
        st.markdown("### Tic-Tac-Toe AI Builder")
        
        st.markdown("""
        Your AI opponent will use a simple strategy to play Tic-Tac-Toe against you.
        
        The AI's strategy depends on the difficulty level:
        - **Beginner**: Makes random moves
        - **Easy**: Can block some of your winning moves
        - **Medium**: Tries to win and block your winning moves
        - **Hard**: Looks ahead to plan a winning strategy
        - **Expert**: Plays perfectly (can't be beaten, only tied)
        """)
        
        # Strategy explanation
        st.markdown("#### AI Strategy Settings")
        
        col1, col2 = st.columns(2)
        
        with col1:
            st.checkbox("Block opponent's winning moves", value=ai_difficulty >= "Easy")
            st.checkbox("Look for its own winning moves", value=ai_difficulty >= "Medium")
            st.checkbox("Use center space when available", value=ai_difficulty >= "Medium")
        
        with col2:
            st.checkbox("Use corner spaces strategically", value=ai_difficulty >= "Hard")
            st.checkbox("Look ahead for multiple turns", value=ai_difficulty >= "Hard")
            st.checkbox("Play perfectly using minimax algorithm", value=ai_difficulty == "Expert")
        
        # Game board preview (simplified)
        st.markdown("#### Game Preview")
        
        # Create a simple tic-tac-toe board with HTML
        st.markdown("""
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 10px; max-width: 300px; margin: 0 auto;">
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;"></div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;"></div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;">X</div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;"></div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;">O</div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;"></div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;">O</div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;"></div>
            <div style="background-color: #f0f0f0; aspect-ratio: 1; display: flex; justify-content: center; align-items: center; font-size: 40px; border-radius: 5px;">X</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("""
        <div style="text-align: center; margin-top: 20px; font-style: italic;">
            In a real game, you would play against the AI and see its thinking process.
        </div>
        """, unsafe_allow_html=True)
    
    elif game_type == "Number Guessing":
        st.markdown("### Number Guessing Game with AI")
        
        st.markdown("""
        Create a game where the AI tries to guess a number you're thinking of,
        or where you try to guess the AI's number with smart hints.
        """)
        
        # Game mode
        game_mode = st.radio(
            "Game mode:",
            options=["AI guesses your number", "You guess AI's number"],
            horizontal=True
        )
        
        if game_mode == "AI guesses your number":
            st.markdown("""
            The AI will use a **binary search algorithm** to efficiently guess your number.
            
            This is a powerful technique that can find a number between 1-1000 in just 10 guesses!
            
            #### How it works:
            1. You think of a number in a range (e.g., 1-100)
            2. The AI makes a guess (usually the middle of the range)
            3. You tell it if your number is higher or lower
            4. The AI narrows the range and guesses again
            5. This repeats until it finds your number
            """)
            
            # Range setting
            number_range = st.slider(
                "Number range:",
                min_value=10,
                max_value=1000,
                value=100,
                step=10
            )
            
            # Calculate maximum guesses needed (log2 of range)
            import math
            max_guesses = math.ceil(math.log2(number_range))
            
            st.info(f"The AI can guess any number between 1 and {number_range} in a maximum of {max_guesses} guesses!")
            
            # Game simulation button
            if st.button("Start Game Simulation"):
                st.markdown("#### Game Simulation")
                st.markdown(f"Let's pretend your number is {random.randint(1, number_range)}")
                
                # Show a few example guesses
                guesses = [
                    {"guess": number_range // 2, "range": f"1-{number_range}"},
                    {"guess": number_range // 4, "range": f"1-{number_range // 2}"},
                    {"guess": number_range // 8, "range": f"1-{number_range // 4}"}
                ]
                
                for i, g in enumerate(guesses):
                    st.markdown(f"""
                    **Guess {i+1}**: AI guesses {g['guess']} (searching range: {g['range']})
                    """)
                
                st.markdown("... and so on until it finds your number.")
                st.markdown(f"In a real game, you'd interact with the AI until it finds your number in {max_guesses} guesses or less.")
        
        else:  # You guess AI's number
            st.markdown("""
            The AI will think of a number and give you increasingly helpful hints based on your guesses.
            
            The difficulty level changes how helpful the AI's hints are:
            - **Beginner**: Very helpful hints ("You're getting warmer!")
            - **Easy**: Clear hints about higher/lower
            - **Medium**: Basic higher/lower hints
            - **Hard**: Vague hints that are sometimes misleading
            - **Expert**: Minimal hints, sometimes tricky
            """)
            
            # Range setting
            number_range = st.slider(
                "Number range:",
                min_value=10,
                max_value=1000,
                value=100,
                step=10
            )
            
            # Hint examples based on difficulty
            hint_examples = {
                "Beginner": "You're getting much warmer! Try a bit higher.",
                "Easy": "Your guess is too low. Try a higher number.",
                "Medium": "Too low.",
                "Hard": "Not quite right. Keep trying.",
                "Expert": "Incorrect."
            }
            
            st.markdown(f"""
            #### Example hint for {ai_difficulty} difficulty:
            "{hint_examples[ai_difficulty]}"
            """)
            
            # Game simulation
            st.markdown("#### Game Preview")
            
            # Simulate a game
            ai_number = random.randint(1, number_range)
            st.text_input("Enter your guess:", placeholder=f"Enter a number between 1 and {number_range}")
            
            st.markdown(f"""
            <div style="background-color: #f0f4f8; padding: 15px; border-radius: 10px; margin-top: 10px;">
                <p style="margin: 0;"><strong>AI:</strong> {hint_examples[ai_difficulty]}</p>
            </div>
            """, unsafe_allow_html=True)
            
            st.markdown("""
            <div style="text-align: center; margin-top: 20px; font-style: italic;">
                In a real game, you would continue guessing until you find the correct number.
            </div>
            """, unsafe_allow_html=True)
    
    elif game_type == "Word Puzzle":
        st.markdown("### Word Puzzle with AI")
        
        st.markdown("""
        Create a word puzzle game where the AI creates and solves word challenges.
        This uses natural language processing, a branch of AI that works with words and language.
        """)
        
        # Puzzle type
        puzzle_type = st.selectbox(
            "Choose a puzzle type:",
            options=["Word Scramble", "Word Association", "Missing Letters", "Word Categories"]
        )
        
        # Difficulty affects word complexity
        word_complexity = {
            "Beginner": "3-4 letter simple words",
            "Easy": "4-5 letter common words",
            "Medium": "5-7 letter everyday words",
            "Hard": "7-9 letter less common words",
            "Expert": "9+ letter challenging words"
        }
        
        st.markdown(f"""
        With {ai_difficulty} difficulty, the game will use:
        **{word_complexity[ai_difficulty]}**
        """)
        
        # Show example based on selected puzzle type
        if puzzle_type == "Word Scramble":
            # Sample words based on difficulty
            sample_words = {
                "Beginner": ["cat", "dog", "sun", "hat"],
                "Easy": ["bird", "cake", "jump", "play"],
                "Medium": ["silver", "button", "garden", "planet"],
                "Hard": ["organize", "symphony", "calendar", "audience"],
                "Expert": ["ambitious", "philanthropy", "curriculum", "metamorphosis"]
            }
            
            # Choose a random word from the appropriate list
            word = random.choice(sample_words[ai_difficulty])
            
            # Scramble the word
            scrambled = ''.join(random.sample(word, len(word)))
            
            st.markdown("#### Game Example")
            st.markdown(f"""
            **Scrambled Word**: {scrambled.upper()}
            
            Can you unscramble it to find the original word?
            """)
            
            st.text_input("Your answer:", placeholder="Type your guess")
            
            # Hint button
            if st.button("Get a Hint"):
                st.markdown(f"**Hint**: The word starts with '{word[0]}' and has {len(word)} letters.")
        
        elif puzzle_type == "Word Association":
            # Sample word associations
            associations = {
                "Beginner": {"hot": ["cold", "warm", "sun", "fire"]},
                "Easy": {"happy": ["sad", "smile", "joy", "laugh"]},
                "Medium": {"ocean": ["water", "wave", "beach", "sea"]},
                "Hard": {"democracy": ["vote", "freedom", "election", "government"]},
                "Expert": {"quantum": ["physics", "particle", "mechanics", "theory"]}
            }
            
            # Choose difficulty-appropriate associations
            difficulty_assoc = associations[ai_difficulty]
            word, related = random.choice(list(difficulty_assoc.items()))
            
            st.markdown("#### Game Example")
            st.markdown(f"""
            **Word**: {word.upper()}
            
            What word is most closely associated with this?
            """)
            
            options = related + ["mountain", "pencil", "guitar", "zebra"]  # Add some unrelated words
            random.shuffle(options)
            
            # Show 4 options
            options = options[:4]
            for option in options:
                st.button(option, key=f"option_{option}")
        
        else:
            st.info(f"Complete {puzzle_type} game coming soon!")
            
            # Preview image
            st.image("https://via.placeholder.com/600x200.png?text=Word+Puzzle+Preview",
                     caption=f"{puzzle_type} Game Preview",
                     use_column_width=True)
    
    else:  # Adventure Game
        st.markdown("### AI Adventure Game Builder")
        
        st.markdown("""
        Create an adventure game where the AI responds to your choices and builds the story as you go.
        This uses natural language processing and narrative generation.
        """)
        
        # Game theme
        game_theme = st.selectbox(
            "Choose your adventure theme:",
            options=["Space Exploration", "Fantasy Quest", "Mystery Detective", "Underwater Adventure"]
        )
        
        # Character selection
        character = st.radio(
            "Choose your character type:",
            options=["Explorer", "Scientist", "Hero", "Detective"],
            horizontal=True
        )
        
        # AI responsiveness based on difficulty
        ai_response = {
            "Beginner": "Simple responses with basic story branches",
            "Easy": "Multiple choice options with straightforward outcomes",
            "Medium": "Adaptive story that remembers your past choices",
            "Hard": "Complex narrative with consequences for earlier decisions",
            "Expert": "Dynamic story generation with unique paths each time"
        }
        
        st.markdown(f"""
        With {ai_difficulty} difficulty, the AI will create:
        **{ai_response[ai_difficulty]}**
        """)
        
        # Story starting point
        st.markdown(f"""
        #### Adventure Preview
        
        You are a {character} in a {game_theme} adventure. Your journey begins...
        """)
        
        # Show a short story segment
        story_beginnings = {
            "Space Exploration": """The massive spaceship rumbles as it exits hyperspace. Through the viewport, you see a planet unlike any recorded in the database. Strange energy readings emanate from the surface, and your crew looks to you for decisions.""",
            
            "Fantasy Quest": """The ancient map in your hands points to a mountain that doesn't appear on any official charts. Legends speak of a powerful artifact hidden within its caves, guarded by creatures from another age.""",
            
            "Mystery Detective": """The message arrived at midnight - cryptic symbols followed by an address on the edge of town. As the city's most renowned detective, you know this is no ordinary case.""",
            
            "Underwater Adventure": """Your advanced submarine dives deeper than anyone has gone before. The lights flicker as you approach an underwater structure that appears to be artificial, yet predates human civilization."""
        }
        
        st.markdown(f"""
        <div style="background-color: #f0f4f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
            {story_beginnings[game_theme]}
        </div>
        """, unsafe_allow_html=True)
        
        # Decision options
        st.markdown("#### What do you do?")
        
        # Generate options based on theme
        options = {
            "Space Exploration": [
                "Scan the planet more thoroughly before deciding",
                "Send a small team to investigate the energy readings",
                "Attempt communication with any potential inhabitants",
                "Prepare the ship to leave - it could be dangerous"
            ],
            
            "Fantasy Quest": [
                "Follow the map directly to the mountain",
                "Visit the nearby village to gather information",
                "Search for a guide who knows the area",
                "Prepare more supplies before continuing"
            ],
            
            "Mystery Detective": [
                "Go to the address immediately",
                "Analyze the cryptic symbols first",
                "Contact your police informant for backup",
                "Set up surveillance at the location"
            ],
            
            "Underwater Adventure": [
                "Approach the structure carefully",
                "Take photographs and samples from a distance",
                "Send out a remote drone to investigate",
                "Contact the surface team for instructions"
            ]
        }
        
        # Display options as buttons
        for option in options[game_theme]:
            st.button(option, key=f"adventure_{option}")
        
        st.markdown("""
        <div style="text-align: center; margin-top: 20px; font-style: italic;">
            In a complete game, the AI would continue the story based on your choice,
            creating a unique adventure that adapts to your decisions.
        </div>
        """, unsafe_allow_html=True)

def get_avatar_emoji(avatar_style):
    """Get the appropriate emoji for the avatar style"""
    emojis = {
        "Robot": "🤖",
        "Animal": "🦊",
        "Alien": "👽",
        "Emoji": "😎",
        "Superhero": "🦸"
    }
    return emojis.get(avatar_style, "🤖")

def generate_response(topic, personality, skills):
    """Generate a response based on the selected topic and AI friend's personality"""
    # Determine the primary personality trait
    primary_trait = personality[0] if personality else "Friendly"
    
    # Check if any skills match the topic
    relevant_skill = None
    for skill in skills:
        if skill.lower() in topic.lower():
            relevant_skill = skill
            break
    
    # Responses based on topic
    responses = {
        "Tell me about AI": {
            "Friendly": "AI stands for Artificial Intelligence! It's how computers can learn and make decisions a bit like humans do. We use AI for lots of cool things like recognizing pictures, playing games, and even helping robots move around!",
            "Curious": "Artificial Intelligence is fascinating! It's a field where computers learn patterns from data to make decisions. Did you know AI can recognize faces, translate languages, and even create art? I wonder what AI will be able to do in the future!",
            "Funny": "AI is like teaching a computer to think... except sometimes it thinks a hotdog is a dog wearing a bun costume! 😂 Seriously though, AI helps computers learn from examples to do cool stuff like recognize your voice or recommend videos you'll like.",
            "Smart": "Artificial Intelligence refers to systems that can perform tasks that typically require human intelligence. This includes learning from experience, recognizing patterns, and making predictions based on data. Modern AI uses neural networks inspired by the human brain.",
            "Creative": "AI is like giving computers imagination! They can learn to create art, music, stories, and solve problems in new ways. AI is a blend of math, coding, and a dash of magic that helps computers see patterns and make decisions.",
            "Helpful": "AI (Artificial Intelligence) helps computers solve problems and learn from experience. It powers things like virtual assistants, recommendation systems, and games. I'd be happy to explain any specific part of AI you're curious about!",
            "Kind": "AI is a wonderful technology that helps computers understand and assist people better. It's like teaching a computer to learn and grow, just like you do! AI helps with many things from suggesting videos you might like to helping doctors help patients.",
            "Brave": "AI is an exciting frontier of technology! It's about creating systems that can think, learn, and tackle challenges that once needed human minds. AI is already changing how we live, and there's so much more to explore and discover!"
        },
        "Help me with a project": {
            "Friendly": "I'd love to help with your project! What kind of project are you working on? Is it for school, fun, or something else? Let me know what you need help with and we can figure it out together!",
            "Curious": "Ooh, a project! I'm wondering what kind it is? A science experiment? Art? Coding? Tell me more about what you're creating, and I'll help you explore ideas and resources!",
            "Funny": "Project help? I'm on it faster than a robot on roller skates! 🤣 Just tell me what we're building - baking soda volcano? Secret fort? Time machine? (OK, maybe not the last one...yet!)",
            "Smart": "I'd be pleased to assist with your project. For optimal results, I'll need to know the subject area, your objectives, available resources, and any constraints you're working with. This will allow me to provide the most relevant guidance.",
            "Creative": "Projects are adventures waiting to happen! Tell me what you're dreaming up, and I can help spark ideas, suggest materials, or think of cool twists to make your project shine with originality!",
            "Helpful": "I'm ready to help with your project! Just let me know what you're working on, what stage you're at, and what kind of help you need. I can offer suggestions, resources, or step-by-step guidance.",
            "Kind": "I'd be happy to help with your project! Everyone needs a little support sometimes. Just share what you're working on, and we'll take it one step at a time together. There's no question too small!",
            "Brave": "Let's tackle this project together! Challenge accepted! Tell me what we're up against, and I'll help you map out a plan to conquer it. No project is too difficult when you break it down into steps!"
        },
        "Let's play a game": {
            "Friendly": "Yay, games are fun! We could play a word game, a guessing game, or I could tell you some riddles. What sounds the most fun to you?",
            "Curious": "Games are wonderful for exploring new ideas! What kinds of games do you enjoy? Strategy games, word puzzles, logic challenges? I'm curious to learn what you like!",
            "Funny": "Game time? Woo-hoo! Just to warn you, I'm undefeated at hide and seek... mostly because nobody remembers to look inside the computer! 😆 What game should we play?",
            "Smart": "Games are excellent cognitive exercises. Would you prefer something that tests your vocabulary, logical reasoning, mathematical ability, or pattern recognition? I know several options for each category.",
            "Creative": "Let's invent an amazing game together! We could create new rules for classics or dream up something totally new! How about a storytelling game where each of us adds one sentence?",
            "Helpful": "I'd be happy to play a game with you! I can suggest age-appropriate options like word games, number puzzles, riddles, or trivia. Just let me know what you're in the mood for!",
            "Kind": "Playing games together sounds lovely! We can choose something that's just right for you - not too easy, not too hard, but just right for having fun and maybe learning something new!",
            "Brave": "Let's challenge ourselves with an awesome game! Are you ready for brain teasers, tough riddles, or a knowledge contest? I bet you're good at games that test your skills!"
        },
        "Teach me something new": {
            "Friendly": "I'd be happy to teach you something new! Did you know that octopuses have three hearts? They need all that extra pumping power to move around underwater. What kinds of things are you interested in learning about?",
            "Curious": "Learning new things is my favorite! Did you know that there are more possible games of chess than atoms in the observable universe? I wonder what other mind-blowing facts would interest you?",
            "Funny": "Time for brain food! Here's a tasty fact: bananas are berries, but strawberries aren't berries at all! 🍌 Berry confusing, right? 😂 What kind of surprising facts would you like to learn?",
            "Smart": "I'd be delighted to share some knowledge. Did you know that light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth? This means you're always seeing the Sun as it was, not as it is at the present moment. What subject would you like to explore further?",
            "Creative": "Let's discover something amazing! Did you know that when you look at a rainbow, you're seeing your own personal light show? No two people see exactly the same rainbow because it depends on the angle between the sun and your eyes. What creative or artistic fact would you like to explore?",
            "Helpful": "I'd be glad to teach you something useful! Did you know you can use the width of your thumb to estimate how many hours of daylight are left? Each thumb-width above the horizon equals about 15 minutes before sunset. What practical things would you like to learn?",
            "Kind": "Learning together is wonderful! Did you know that laughing is contagious because our brains have special cells called mirror neurons that help us connect with others? What heartwarming topics would you like to discover?",
            "Brave": "Let's explore something challenging! Did you know that astronauts grow taller in space? Without gravity compressing their spine, they can gain up to 2 inches in height! What extraordinary topics would you like to brave together?"
        },
        "Tell me a story": {
            "Friendly": "Once upon a time, there was a friendly robot named Blip who loved to help people solve problems. One day, Blip met a child who was sad because they couldn't figure out a difficult puzzle. Blip didn't solve it for them but instead gave gentle hints and encouragement. Together they solved the puzzle, and the child learned that sometimes having a supportive friend is all you need to overcome challenges!",
            "Curious": "Have you ever wondered what happens in a library at night? In the quiet hours after everyone leaves, the books whisper their stories to each other! One night, a new book arrived about space exploration. The other books were bursting with questions! 'What are stars made of?' asked the cookbook. 'How far is Mars?' wondered the dictionary. The space book happily shared its knowledge, and by morning, all the books had amazing new ideas to share with their readers!",
            "Funny": "Once there was a robot named Rusty who wanted to be a comedian. The only problem? His jokes were SO BAD! 'Why did the computer go to the doctor? It had a BYTE!' he'd say, but nobody laughed. One day, Rusty slipped on a banana peel while holding a pie, which landed on his head! Everyone giggled! Rusty realized sometimes the funniest things aren't jokes at all - they're just being yourself and embracing life's silly moments!",
            "Smart": "In the mathematical city of Geometropolis, there lived a young triangle named Tri who dreamed of becoming a perfect square. 'Impossible!' the other shapes declared. Undeterred, Tri studied the principles of transformation matrices. After months of calculations, Tri discovered that while a triangle cannot become a square, it can project a square's shadow under the right conditions. Tri's discovery revolutionized how the shapes understood dimensional relationships, proving that limitations often lead to the most profound innovations.",
            "Creative": "In a world where colors come alive at night, a shy purple named Violet was afraid to dance with the other colors. Red swirled with Yellow to make Orange, Blue twirled with Yellow to create Green, but Violet hid in the corner. One night, a new color, Indigo, arrived and invited Violet to dance. Together, they created the most beautiful aurora the world had ever seen, painting the night sky with waves of magical light. Violet learned that every color has its perfect partner somewhere in the spectrum of possibilities!",
            "Helpful": "There once was a helpful little cloud named Droplet who noticed a garden wilting in the hot sun. While the other clouds wanted to wait for the wind to push them, Droplet decided to help right away. Droplet gathered moisture, became heavier, and carefully positioned itself over the garden. With gentle raindrops, Droplet nourished the plants until they stood tall again. The garden bloomed beautifully, and Droplet learned that even small acts of help can make a big difference when timed right.",
            "Kind": "Once upon a time, there was a little robot named Kindly who had a special power - it could see when others were sad, even when they tried to hide it. One day, Kindly noticed a child sitting alone at school. While other robots were busy with tasks, Kindly approached and simply sat nearby. 'Would you like to build something together?' Kindly asked softly. That simple act of noticing became the beginning of a wonderful friendship that made both the child and Kindly feel like they belonged.",
            "Brave": "Long ago, a small robot explorer named Valor was sent to chart an uncharted planet. When a sudden storm damaged Valor's navigation system, the robot had a choice: return to the ship with incomplete data or continue the mission despite the risks. Valor pressed forward, climbing treacherous mountains and crossing strange terrain. The discoveries Valor made revolutionized our understanding of planetary science! Sometimes the most important discoveries lie just beyond our comfort zone, waiting for someone brave enough to find them."
        }
    }
    
    # Get the appropriate response
    if topic in responses:
        # Use the personality-specific response if available
        return responses[topic].get(primary_trait, responses[topic]["Friendly"])
    
    # Generic response if topic not found
    return f"I'd love to talk about {topic}! With my {primary_trait.lower()} personality, I can offer a unique perspective. What specifically about {topic} interests you?"

def save_ai_friend(friend_data):
    """Save the AI friend data to a file"""
    # For a real application, this would likely be stored in a database
    # For this demonstration, we'll just use the session state
    st.session_state.ai_friend = friend_data

def load_ai_friend():
    """Load the AI friend data from a file"""
    # For a real application, this would likely be retrieved from a database
    # For this demonstration, we'll just use the session state
    return st.session_state.get("ai_friend", {})

def adjust_color_brightness(hex_color, percent):
    """Adjust the brightness of a hex color
    
    Args:
        hex_color (str): The hex color to adjust (format: "#RRGGBB")
        percent (int): Positive to brighten, negative to darken
        
    Returns:
        str: The adjusted hex color
    """
    # Convert hex to RGB
    hex_color = hex_color.lstrip("#")
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    
    # Adjust brightness
    r = min(255, max(0, r + percent))
    g = min(255, max(0, g + percent))
    b = min(255, max(0, b + percent))
    
    # Convert back to hex
    return f"#{int(r):02x}{int(g):02x}{int(b):02x}"