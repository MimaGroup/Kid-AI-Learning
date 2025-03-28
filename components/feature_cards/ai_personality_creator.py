import streamlit as st
import random

def display_ai_personality_creator():
    """Display a tool for kids to create and customize their own AI personalities"""
    st.markdown("""
    <div style="background-color: #ffe6f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="margin-top: 0;">AI Personality Creator</h2>
        <p>Design your own AI assistant with a unique personality and skills!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Initialize session state for the AI friend
    if "ai_friend" not in st.session_state:
        st.session_state.ai_friend = {
            "name": "",
            "personality": ["Friendly", "Helpful"],
            "appearance": "Robot",
            "voice": "Cheerful",
            "skills": ["Answering questions"],
            "favorite_topics": ["Space"],
            "backstory": ""
        }
    
    # Two-column layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Basic information
        st.markdown("### Basic Information")
        
        # AI Name
        st.session_state.ai_friend["name"] = st.text_input(
            "What's your AI friend's name?",
            value=st.session_state.ai_friend["name"]
        )
        
        # Appearance
        st.session_state.ai_friend["appearance"] = st.selectbox(
            "What does your AI friend look like?",
            ["Robot", "Animal", "Cartoon Character", "Glowing Orb", "Hologram", "Abstract Shape"],
            index=["Robot", "Animal", "Cartoon Character", "Glowing Orb", "Hologram", "Abstract Shape"].index(st.session_state.ai_friend["appearance"])
        )
        
        if st.session_state.ai_friend["appearance"] == "Animal":
            st.session_state.ai_friend["animal_type"] = st.selectbox(
                "What kind of animal?",
                ["Cat", "Dog", "Fox", "Owl", "Dolphin", "Dragon"],
                index=["Cat", "Dog", "Fox", "Owl", "Dolphin", "Dragon"].index(st.session_state.ai_friend.get("animal_type", "Cat"))
            )
        
        # Voice
        st.session_state.ai_friend["voice"] = st.select_slider(
            "What kind of voice does your AI friend have?",
            options=["Robotic", "Calm", "Cheerful", "Energetic", "Musical"],
            value=st.session_state.ai_friend["voice"]
        )
        
        # Personality traits
        st.markdown("### Personality")
        
        personalities = ["Friendly", "Helpful", "Funny", "Creative", "Wise", "Curious", "Adventurous", "Logical", "Enthusiastic", "Patient"]
        
        st.session_state.ai_friend["personality"] = st.multiselect(
            "Choose up to 3 personality traits:",
            personalities,
            default=st.session_state.ai_friend["personality"]
        )
        
        # Limit to 3 personality traits
        if len(st.session_state.ai_friend["personality"]) > 3:
            st.session_state.ai_friend["personality"] = st.session_state.ai_friend["personality"][:3]
            st.warning("Maximum 3 personality traits allowed!")
        
        # Skills
        st.markdown("### AI Skills")
        
        skills = ["Answering questions", "Telling stories", "Playing games", "Solving math problems", 
                  "Drawing pictures", "Writing poems", "Making jokes", "Teaching new things",
                  "Giving advice", "Solving puzzles", "Translating languages"]
        
        st.session_state.ai_friend["skills"] = st.multiselect(
            "What skills should your AI have? (Choose up to 5)",
            skills,
            default=st.session_state.ai_friend["skills"]
        )
        
        # Limit to 5 skills
        if len(st.session_state.ai_friend["skills"]) > 5:
            st.session_state.ai_friend["skills"] = st.session_state.ai_friend["skills"][:5]
            st.warning("Maximum 5 skills allowed!")
        
        # Favorite topics
        topics = ["Space", "Animals", "Sports", "Music", "Art", "History", "Science", "Technology", 
                 "Nature", "Food", "Travel", "Movies", "Books", "Games"]
        
        st.session_state.ai_friend["favorite_topics"] = st.multiselect(
            "What topics does your AI like to talk about?",
            topics,
            default=st.session_state.ai_friend["favorite_topics"]
        )
        
        # Backstory
        st.markdown("### Backstory")
        
        st.session_state.ai_friend["backstory"] = st.text_area(
            "Give your AI friend a backstory (optional):",
            value=st.session_state.ai_friend["backstory"],
            height=100,
            max_chars=500,
            help="Where was your AI created? What is its purpose? What makes it special?"
        )
    
    with col2:
        # Preview of the AI friend
        st.markdown("### Preview")
        
        # Get avatar emoji and color based on appearance
        avatar_emoji = get_avatar_emoji(st.session_state.ai_friend["appearance"], st.session_state.ai_friend.get("animal_type", "Cat"))
        
        # Generate a color based on personality
        avatar_color = generate_avatar_color(st.session_state.ai_friend["personality"])
        
        # Display avatar
        st.markdown(f"""
        <div style="
            background-color: {avatar_color};
            width: 150px;
            height: 150px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 60px;
            margin: 0 auto 20px auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        ">
            {avatar_emoji}
        </div>
        """, unsafe_allow_html=True)
        
        # Display name and personality
        if st.session_state.ai_friend["name"]:
            name_display = st.session_state.ai_friend["name"]
        else:
            name_display = "Your AI Friend"
            
        personality_traits = ", ".join(st.session_state.ai_friend["personality"]) if st.session_state.ai_friend["personality"] else "Undefined"
        
        st.markdown(f"""
        <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="margin-bottom: 5px;">{name_display}</h3>
            <p>{personality_traits} {st.session_state.ai_friend["appearance"]}</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Show skills badges
        if st.session_state.ai_friend["skills"]:
            st.markdown("<p style='text-align: center;'><strong>Skills:</strong></p>", unsafe_allow_html=True)
            
            # Create a grid for skill badges
            skills_html = """<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; margin-bottom: 15px;">"""
            
            for skill in st.session_state.ai_friend["skills"]:
                # Generate a pastel color for each skill
                hue = random.randint(0, 360)
                skill_color = f"hsl({hue}, 70%, 85%)"
                
                skills_html += f"""
                <span style="
                    background-color: {skill_color};
                    padding: 3px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    white-space: nowrap;
                ">
                    {skill}
                </span>
                """
            
            skills_html += "</div>"
            st.markdown(skills_html, unsafe_allow_html=True)
        
        # Show sample dialogue
        if st.session_state.ai_friend["name"]:
            st.markdown("### Sample Dialogue")
            
            st.markdown("""<div style="border: 1px solid #ddd; border-radius: 10px; padding: 10px; margin-top: 15px;">""", unsafe_allow_html=True)
            
            personality = st.session_state.ai_friend["personality"][0] if st.session_state.ai_friend["personality"] else "Friendly"
            topics = st.session_state.ai_friend["favorite_topics"][0] if st.session_state.ai_friend["favorite_topics"] else "general"
            
            # Generate a sample response
            sample_response = generate_response(topics, personality, st.session_state.ai_friend["skills"])
            
            st.markdown(f"""
            <p><strong>You:</strong> Hi! Can you tell me something interesting?</p>
            <p><strong>{st.session_state.ai_friend["name"]}:</strong> {sample_response}</p>
            """, unsafe_allow_html=True)
            
            st.markdown("</div>", unsafe_allow_html=True)
            
        # Save button
        if st.button("Save Your AI Friend", key="save_ai_friend"):
            if not st.session_state.ai_friend["name"]:
                st.error("Please give your AI friend a name!")
            else:
                st.success(f"🎉 {st.session_state.ai_friend['name']} has been created! You can now interact with your AI friend.")
    
    # Test interaction section
    if st.session_state.ai_friend["name"]:
        st.markdown("---")
        st.markdown("### Talk to Your AI Friend")
        
        # Initialize conversation history if not present
        if "conversation_history" not in st.session_state:
            st.session_state.conversation_history = []
        
        # User input
        user_input = st.text_input("Ask your AI friend a question:", key="user_question")
        
        if st.button("Send", key="send_question"):
            if user_input:
                # Add user message to history
                st.session_state.conversation_history.append({"role": "user", "content": user_input})
                
                # Generate AI response
                personality = st.session_state.ai_friend["personality"][0] if st.session_state.ai_friend["personality"] else "Friendly"
                topics = st.session_state.ai_friend["favorite_topics"][0] if st.session_state.ai_friend["favorite_topics"] else "general"
                ai_response = generate_response(topics, personality, st.session_state.ai_friend["skills"])
                
                # Add AI response to history
                st.session_state.conversation_history.append({"role": "ai", "content": ai_response})
                
                # Clear input
                st.rerun()
        
        # Display conversation history
        st.markdown("#### Conversation History")
        
        for message in st.session_state.conversation_history:
            if message["role"] == "user":
                st.markdown(f"""
                <div style="
                    background-color: #e6f7ff;
                    border-radius: 10px;
                    padding: 10px;
                    margin: 5px 0 5px auto;
                    max-width: 80%;
                    text-align: right;
                ">
                    <p style="margin: 0;"><strong>You:</strong> {message["content"]}</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div style="
                    background-color: {avatar_color}50;
                    border-radius: 10px;
                    padding: 10px;
                    margin: 5px auto 5px 0;
                    max-width: 80%;
                ">
                    <p style="margin: 0;"><strong>{st.session_state.ai_friend["name"]}:</strong> {message["content"]}</p>
                </div>
                """, unsafe_allow_html=True)
        
        # Reset conversation button
        if st.session_state.conversation_history and st.button("Reset Conversation", key="reset_convo"):
            st.session_state.conversation_history = []
            st.rerun()

def display_ai_project_builder():
    """Display a tool for building simple AI projects based on templates"""
    st.markdown("""
    <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="margin-top: 0;">AI Project Builder</h2>
        <p>Create your own AI projects using kid-friendly templates!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Project type selection
    project_types = [
        "Image Classifier", 
        "Story Generator", 
        "Chatbot Creator", 
        "Music Maker", 
        "Animal Recognizer"
    ]
    
    selected_project = st.selectbox(
        "Choose a project type:",
        project_types
    )
    
    # Project description and interface
    if selected_project == "Image Classifier":
        display_image_classifier_project()
    elif selected_project == "Story Generator":
        display_story_generator_project()
    elif selected_project == "Chatbot Creator":
        display_chatbot_creator_project()
    elif selected_project == "Music Maker":
        display_music_maker_project()
    elif selected_project == "Animal Recognizer":
        display_animal_recognizer_project()

def display_image_classifier_project():
    """Display the image classifier project template"""
    st.markdown("""
    ### Image Classifier Project
    
    Create an AI that can tell the difference between different objects in pictures!
    """)
    
    # Two columns layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("#### Step 1: Train Your AI")
        
        # Initialize categories if not present
        if "image_categories" not in st.session_state:
            st.session_state.image_categories = ["Cats", "Dogs"]
        
        # Category management
        st.markdown("**Define Categories to Recognize:**")
        
        category1 = st.text_input("Category 1:", value=st.session_state.image_categories[0] if len(st.session_state.image_categories) > 0 else "")
        category2 = st.text_input("Category 2:", value=st.session_state.image_categories[1] if len(st.session_state.image_categories) > 1 else "")
        
        if st.button("Update Categories"):
            if category1 and category2:
                st.session_state.image_categories = [category1, category2]
                st.success(f"Great! Your AI will learn to tell the difference between {category1} and {category2}.")
            else:
                st.error("Please enter both categories!")
        
        # Training simulation
        st.markdown("#### Step 2: Add Training Examples")
        
        st.markdown("""
        In a real AI project, you would upload example images for each category.
        
        For this demo, we'll simulate training with some examples:
        """)
        
        col_ex1, col_ex2 = st.columns(2)
        
        with col_ex1:
            st.markdown(f"**{st.session_state.image_categories[0]} (5 examples)**")
            st.markdown("✅ Example 1 added")
            st.markdown("✅ Example 2 added")
            st.markdown("✅ Example 3 added")
            st.markdown("✅ Example 4 added")
            st.markdown("✅ Example 5 added")
        
        with col_ex2:
            st.markdown(f"**{st.session_state.image_categories[1]} (5 examples)**")
            st.markdown("✅ Example 1 added")
            st.markdown("✅ Example 2 added")
            st.markdown("✅ Example 3 added")
            st.markdown("✅ Example 4 added")
            st.markdown("✅ Example 5 added")
        
        # Training button
        if st.button("Train the Model"):
            with st.spinner("Training your AI model..."):
                # Simulate training delay
                import time
                time.sleep(1)
                st.success("🎉 Training complete! Your model is now ready to make predictions.")
                st.session_state.model_trained = True
    
    with col2:
        st.markdown("#### How It Works")
        
        st.markdown("""
        1. You define the categories you want to recognize
        2. You provide example images for each category
        3. The AI learns patterns from the examples
        4. The trained AI can now recognize new images
        
        This is called **supervised learning** - teaching the AI by showing it examples with the correct answers!
        """)
        
        # Display model status
        if st.session_state.get("model_trained", False):
            st.markdown("""
            <div style="background-color: #e6ffe6; padding: 10px; border-radius: 5px; margin-top: 15px;">
                <p style="margin: 0;"><strong>Model Status:</strong> Trained and Ready!</p>
            </div>
            """, unsafe_allow_html=True)
    
    # Test the model section
    if st.session_state.get("model_trained", False):
        st.markdown("#### Step 3: Test Your Model")
        
        st.markdown("""
        In a real application, you would upload a new image to test.
        For this demo, we'll simulate testing:
        """)
        
        test_option = st.selectbox(
            "Choose a test image:",
            ["Select a test image...", f"Test Image 1 (a {st.session_state.image_categories[0].lower()})", 
             f"Test Image 2 (a {st.session_state.image_categories[1].lower()})", "Test Image 3 (something else)"]
        )
        
        if test_option != "Select a test image..." and st.button("Run Prediction"):
            with st.spinner("AI is thinking..."):
                # Simulate prediction delay
                import time
                time.sleep(0.5)
                
                # Simulated prediction results
                if "1" in test_option:
                    confidence = random.uniform(0.85, 0.98)
                    prediction = st.session_state.image_categories[0]
                elif "2" in test_option:
                    confidence = random.uniform(0.80, 0.95)
                    prediction = st.session_state.image_categories[1]
                else:
                    confidence = random.uniform(0.40, 0.60)
                    prediction = random.choice(st.session_state.image_categories)
                
                # Display prediction
                st.markdown(f"""
                <div style="background-color: #f0f0f0; padding: 15px; border-radius: 10px; margin-top: 15px;">
                    <h4 style="margin-top: 0;">Prediction Results</h4>
                    <p><strong>Prediction:</strong> {prediction}</p>
                    <p><strong>Confidence:</strong> {confidence:.1%}</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Add explanation if it's the "something else" case
                if "3" in test_option:
                    st.markdown("""
                    <div style="background-color: #fff9e6; padding: 10px; border-radius: 5px; margin-top: 15px;">
                        <p style="margin: 0;">Notice the lower confidence! This is because the image doesn't clearly match either category. AI models work best when tested on categories they've been trained on.</p>
                    </div>
                    """, unsafe_allow_html=True)

def display_story_generator_project():
    """Display the story generator project template"""
    st.markdown("""
    ### AI Story Generator
    
    Create an AI that can generate simple stories based on your ideas!
    """)
    
    # Initialize story settings if not present
    if "story_settings" not in st.session_state:
        st.session_state.story_settings = {
            "theme": "Space Adventure",
            "main_character": "Astronaut",
            "setting": "Space Station",
            "genre": "Adventure",
            "tone": "Exciting"
        }
    
    # Two columns layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("#### Story Settings")
        
        # Theme selection
        st.session_state.story_settings["theme"] = st.selectbox(
            "Story Theme:",
            ["Space Adventure", "Magical Forest", "Underwater World", "Robot City", "Dinosaur Land", "Superhero Academy"],
            index=["Space Adventure", "Magical Forest", "Underwater World", "Robot City", "Dinosaur Land", "Superhero Academy"].index(st.session_state.story_settings["theme"])
        )
        
        # Character selection
        if st.session_state.story_settings["theme"] == "Space Adventure":
            character_options = ["Astronaut", "Alien", "Robot", "Scientist"]
        elif st.session_state.story_settings["theme"] == "Magical Forest":
            character_options = ["Wizard", "Elf", "Fairy", "Talking Animal"]
        elif st.session_state.story_settings["theme"] == "Underwater World":
            character_options = ["Mermaid", "Scuba Diver", "Talking Fish", "Sea Creature"]
        elif st.session_state.story_settings["theme"] == "Robot City":
            character_options = ["Robot", "Engineer", "AI", "Inventor"]
        elif st.session_state.story_settings["theme"] == "Dinosaur Land":
            character_options = ["Explorer", "Dinosaur", "Time Traveler", "Paleontologist"]
        else:  # Superhero Academy
            character_options = ["Superhero Student", "Teacher with Powers", "Sidekick", "Super Pet"]
        
        st.session_state.story_settings["main_character"] = st.selectbox(
            "Main Character:",
            character_options,
            index=min(character_options.index(st.session_state.story_settings["main_character"]) if st.session_state.story_settings["main_character"] in character_options else 0, len(character_options)-1)
        )
        
        # Other story elements
        col_a, col_b = st.columns(2)
        
        with col_a:
            st.session_state.story_settings["genre"] = st.radio(
                "Story Genre:",
                ["Adventure", "Mystery", "Funny", "Action"],
                index=["Adventure", "Mystery", "Funny", "Action"].index(st.session_state.story_settings["genre"])
            )
        
        with col_b:
            st.session_state.story_settings["tone"] = st.radio(
                "Story Tone:",
                ["Exciting", "Mysterious", "Silly", "Educational"],
                index=["Exciting", "Mysterious", "Silly", "Educational"].index(st.session_state.story_settings["tone"])
            )
        
        # Story length
        story_length = st.slider("Story Length:", 1, 5, 3, help="1 = Very Short, 5 = Longer Story")
        st.session_state.story_settings["length"] = story_length
        
        # Generate button
        if st.button("Generate Story"):
            # Set flag that a story has been generated
            st.session_state.story_generated = True
            st.rerun()
    
    with col2:
        st.markdown("#### How It Works")
        
        st.markdown("""
        1. You choose the story elements you want
        2. The AI combines your choices with patterns it learned from books and stories
        3. The AI generates a unique story based on your inputs
        
        This is called **generative AI** - creating new content based on patterns in existing stories!
        """)
        
        # Example of what the AI has learned
        st.markdown("""
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 15px;">
            <p style="margin: 0;"><strong>AI's Knowledge:</strong> The AI knows about story structure, characters, settings, and how different genres typically develop.</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Generated story display
    if st.session_state.get("story_generated", False):
        st.markdown("#### Your Generated Story")
        
        # Get story settings
        theme = st.session_state.story_settings["theme"]
        character = st.session_state.story_settings["main_character"]
        genre = st.session_state.story_settings["genre"]
        tone = st.session_state.story_settings["tone"]
        length = st.session_state.story_settings["length"]
        
        # Generate story title
        story_title = generate_story_title(theme, character)
        
        # Generate story based on settings
        story_paragraphs = []
        
        # Introduction
        if theme == "Space Adventure":
            intro = f"Once upon a time, a brave {character} named Alex was aboard the International Space Station when something strange happened."
        elif theme == "Magical Forest":
            intro = f"Deep in the Whispering Woods lived a {character} named Morgan who discovered a glowing crystal that changed everything."
        elif theme == "Underwater World":
            intro = f"Beneath the waves of the Azure Sea, a curious {character} named Jamie found an ancient treasure map leading to adventure."
        elif theme == "Robot City":
            intro = f"In Mechanopolis, a city where robots and humans lived together, a resourceful {character} named Taylor made an amazing discovery."
        elif theme == "Dinosaur Land":
            intro = f"After finding a mysterious portal, a daring {character} named Casey was transported to a world where dinosaurs still roamed."
        else:  # Superhero Academy
            intro = f"It was the first day at Powerhouse Academy, and a nervous {character} named Riley was about to discover incredible abilities."
        
        story_paragraphs.append(intro)
        
        # Middle of story - different based on genre
        if genre == "Adventure":
            middle = f"Without hesitation, our hero embarked on an epic journey filled with challenges. Along the way, they met new friends who helped them overcome obstacles."
        elif genre == "Mystery":
            middle = f"Something wasn't right. Clues began to appear, and our hero had to solve the puzzle before time ran out. Each discovery led to more questions."
        elif genre == "Funny":
            middle = f"What happened next was completely unexpected and hilariously chaotic! Everything that could go wrong did go wrong, in the most amusing ways possible."
        else:  # Action
            middle = f"Suddenly, danger appeared! Our hero had to act fast, using quick thinking and special skills to face the threat head-on."
        
        story_paragraphs.append(middle)
        
        # Add extra paragraph for longer stories
        if length >= 3:
            if tone == "Exciting":
                extra = f"Hearts racing, they pressed forward into the unknown. The challenge ahead seemed impossible, but failure was not an option."
            elif tone == "Mysterious":
                extra = f"Strange symbols appeared, revealing secrets that had been hidden for centuries. Each discovery deepened the mystery."
            elif tone == "Silly":
                extra = f"To make matters even more ridiculous, they accidentally triggered the world's largest bubble machine, covering everything in rainbow bubbles!"
            else:  # Educational
                extra = f"This experience taught them about teamwork and perseverance. They learned that solving problems often requires looking at things from different perspectives."
            
            story_paragraphs.append(extra)
        
        # Add another paragraph for very long stories
        if length >= 4:
            situation = f"The situation seemed hopeless when suddenly they remembered an important lesson. Sometimes the simplest solution is the best one."
            story_paragraphs.append(situation)
        
        # Conclusion
        if tone == "Exciting":
            ending = f"In an amazing final moment of triumph, they succeeded in their mission! Everyone celebrated their incredible achievement."
        elif tone == "Mysterious":
            ending = f"Finally, the truth was revealed, but it left them with one last question that would lead to a whole new mystery."
        elif tone == "Silly":
            ending = f"In the end, everyone had a good laugh about the whole adventure, especially when they discovered it all started because of a misunderstanding!"
        else:  # Educational
            ending = f"They returned home with new knowledge and understanding about the world around them, eager to share what they had learned with others."
        
        story_paragraphs.append(ending)
        
        # Display the story in a nice format
        st.markdown(f"""
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 5px solid #9C6DF2;">
            <h3 style="text-align: center; color: #9C6DF2;">{story_title}</h3>
            
            <div style="margin-top: 20px;">
                {"<p>" + "</p><p>".join(story_paragraphs) + "</p>"}
            </div>
            
            <p style="text-align: right; margin-top: 20px; font-style: italic;">- Generated by AI Story Generator</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Regenerate option
        if st.button("Generate Another Story"):
            st.session_state.story_generated = True
            st.rerun()

def display_chatbot_creator_project():
    """Display the chatbot creator project template"""
    st.markdown("""
    ### Chatbot Creator Project
    
    Design your own chatbot that can answer questions on topics you choose!
    """)
    
    # Initialize chatbot data if not present
    if "chatbot_data" not in st.session_state:
        st.session_state.chatbot_data = {
            "name": "Helpbot",
            "expertise": ["Science", "Animals"],
            "personality": "Friendly",
            "responses": {}
        }
    
    # Two columns layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("#### Design Your Chatbot")
        
        # Chatbot name
        st.session_state.chatbot_data["name"] = st.text_input(
            "Chatbot Name:",
            value=st.session_state.chatbot_data["name"]
        )
        
        # Expertise areas
        expertise_options = ["Science", "Animals", "Space", "Technology", "History", "Art", "Sports", "Music", "Math", "Geography"]
        
        st.session_state.chatbot_data["expertise"] = st.multiselect(
            "Areas of Expertise (Select 1-3):",
            expertise_options,
            default=st.session_state.chatbot_data["expertise"]
        )
        
        # Limit to 3 areas
        if len(st.session_state.chatbot_data["expertise"]) > 3:
            st.session_state.chatbot_data["expertise"] = st.session_state.chatbot_data["expertise"][:3]
            st.warning("Maximum 3 areas of expertise allowed!")
        
        # Personality
        st.session_state.chatbot_data["personality"] = st.radio(
            "Chatbot Personality:",
            ["Friendly", "Funny", "Serious", "Enthusiastic"],
            index=["Friendly", "Funny", "Serious", "Enthusiastic"].index(st.session_state.chatbot_data["personality"])
        )
        
        # Custom responses
        st.markdown("#### Add Custom Responses")
        st.markdown("Teach your chatbot how to answer specific questions:")
        
        with st.form("add_response"):
            question = st.text_input("When someone asks:", placeholder="E.g., What is your name?")
            answer = st.text_input("Your chatbot should answer:", placeholder="E.g., My name is Helpbot!")
            
            submit = st.form_submit_button("Add Response")
            
            if submit and question and answer:
                st.session_state.chatbot_data["responses"][question] = answer
                st.success(f"Response added! Your chatbot will answer '{question}' with '{answer}'")
        
        # Display current custom responses
        if st.session_state.chatbot_data["responses"]:
            st.markdown("#### Current Custom Responses")
            
            for q, a in st.session_state.chatbot_data["responses"].items():
                st.markdown(f"""
                <div style="border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin-bottom: 10px;">
                    <p style="margin: 0;"><strong>Q:</strong> {q}</p>
                    <p style="margin: 5px 0 0 0;"><strong>A:</strong> {a}</p>
                </div>
                """, unsafe_allow_html=True)
            
            if st.button("Clear All Responses"):
                st.session_state.chatbot_data["responses"] = {}
                st.rerun()
    
    with col2:
        st.markdown("#### How It Works")
        
        st.markdown("""
        1. You choose your chatbot's expertise areas
        2. You teach it specific responses
        3. For other questions, the chatbot uses its pre-trained knowledge
        4. The chatbot's personality affects how it answers
        
        This combines **knowledge-based AI** with **natural language processing**!
        """)
        
        # Chatbot preview
        st.markdown("#### Chatbot Preview")
        
        name = st.session_state.chatbot_data["name"]
        expertise = ", ".join(st.session_state.chatbot_data["expertise"])
        personality = st.session_state.chatbot_data["personality"]
        
        st.markdown(f"""
        <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 15px;">
            <h4 style="margin-top: 0;">{name}</h4>
            <p><strong>Expertise:</strong> {expertise}</p>
            <p><strong>Personality:</strong> {personality}</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Test chatbot section
    st.markdown("---")
    st.markdown("#### Test Your Chatbot")
    
    # Create a chat input
    user_question = st.text_input("Ask your chatbot a question:", key="chatbot_question")
    
    if st.button("Ask", key="ask_chatbot") and user_question:
        # Check if this is a custom response
        if user_question in st.session_state.chatbot_data["responses"]:
            answer = st.session_state.chatbot_data["responses"][user_question]
        else:
            # Generate a response based on chatbot personality and expertise
            answer = generate_chatbot_response(user_question, 
                                             st.session_state.chatbot_data["personality"],
                                             st.session_state.chatbot_data["expertise"])
        
        # Display the chat exchange
        st.markdown(f"""
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
            <div style="background-color: #f0f0f0; padding: 10px; border-radius: 10px; margin-left: auto; max-width: 80%;">
                <p style="margin: 0;"><strong>You:</strong> {user_question}</p>
            </div>
            <div style="background-color: #e6f7ff; padding: 10px; border-radius: 10px; margin-right: auto; max-width: 80%;">
                <p style="margin: 0;"><strong>{st.session_state.chatbot_data["name"]}:</strong> {answer}</p>
            </div>
        </div>
        """, unsafe_allow_html=True)

def display_music_maker_project():
    """Display the music maker project template"""
    st.markdown("""
    ### AI Music Maker
    
    Create AI-generated music by selecting the style and mood you want!
    """)
    
    # Initialize music settings if not present
    if "music_settings" not in st.session_state:
        st.session_state.music_settings = {
            "style": "Electronic",
            "mood": "Happy",
            "tempo": "Medium",
            "instruments": ["Piano", "Drums"]
        }
    
    # Two columns layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("#### Music Settings")
        
        # Music style selection
        st.session_state.music_settings["style"] = st.selectbox(
            "Music Style:",
            ["Electronic", "Classical", "Jazz", "Pop", "Rock", "Hip Hop", "Ambient"],
            index=["Electronic", "Classical", "Jazz", "Pop", "Rock", "Hip Hop", "Ambient"].index(st.session_state.music_settings["style"])
        )
        
        # Mood selection
        st.session_state.music_settings["mood"] = st.select_slider(
            "Music Mood:",
            options=["Calm", "Happy", "Energetic", "Mysterious", "Epic"],
            value=st.session_state.music_settings["mood"]
        )
        
        # Tempo selection
        st.session_state.music_settings["tempo"] = st.radio(
            "Tempo:",
            ["Slow", "Medium", "Fast"],
            index=["Slow", "Medium", "Fast"].index(st.session_state.music_settings["tempo"]),
            horizontal=True
        )
        
        # Instrument selection
        instrument_options = ["Piano", "Guitar", "Drums", "Strings", "Bass", "Synth", "Flute", "Trumpet"]
        
        st.session_state.music_settings["instruments"] = st.multiselect(
            "Instruments (Select 1-4):",
            instrument_options,
            default=st.session_state.music_settings["instruments"]
        )
        
        # Limit to 4 instruments
        if len(st.session_state.music_settings["instruments"]) > 4:
            st.session_state.music_settings["instruments"] = st.session_state.music_settings["instruments"][:4]
            st.warning("Maximum 4 instruments allowed!")
        
        # Generate button
        if st.button("Generate Music"):
            st.session_state.music_generated = True
            st.rerun()
    
    with col2:
        st.markdown("#### How It Works")
        
        st.markdown("""
        1. You select the style, mood, and instruments
        2. The AI analyzes patterns from thousands of songs
        3. It creates a new piece based on your choices
        4. The AI combines different instrument sounds to create the final music
        
        This uses **generative AI for music** - creating new melodies and patterns based on existing music!
        """)
        
        # Additional info
        st.markdown("""
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-top: 15px;">
            <p style="margin: 0;"><strong>Music AI:</strong> Real music AIs learn patterns from thousands of songs to understand melody, harmony, rhythm, and structure.</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Display generated music
    if st.session_state.get("music_generated", False):
        st.markdown("#### Your Generated Music")
        
        # Get music settings
        style = st.session_state.music_settings["style"]
        mood = st.session_state.music_settings["mood"]
        tempo = st.session_state.music_settings["tempo"]
        instruments = ", ".join(st.session_state.music_settings["instruments"])
        
        # Display the music player (simulated)
        st.markdown(f"""
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 5px solid #4CAF50;">
            <h3 style="margin-top: 0;">{mood} {style} Composition</h3>
            
            <div style="margin: 20px 0; background-color: #e0e0e0; height: 80px; border-radius: 5px; display: flex; justify-content: center; align-items: center;">
                <div style="text-align: center;">
                    <p>🎵 Music Visualization 🎵</p>
                    <p style="font-size: 12px; color: #666;">(In a real application, an audio player would appear here)</p>
                </div>
            </div>
            
            <p><strong>Style:</strong> {style}</p>
            <p><strong>Mood:</strong> {mood}</p>
            <p><strong>Tempo:</strong> {tempo}</p>
            <p><strong>Instruments:</strong> {instruments}</p>
            
            <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
                <button style="background-color: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;" disabled>▶️ Play</button>
                <button style="background-color: #f44336; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;" disabled>⏹️ Stop</button>
                <button style="background-color: #2196F3; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;" disabled>💾 Save</button>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Music variation options
        st.markdown("#### Try Some Variations")
        
        variation_cols = st.columns(3)
        
        with variation_cols[0]:
            st.markdown("""
            <div style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center; cursor: pointer;">
                <p style="margin: 0;"><strong>More Upbeat</strong></p>
            </div>
            """, unsafe_allow_html=True)
        
        with variation_cols[1]:
            st.markdown("""
            <div style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center; cursor: pointer;">
                <p style="margin: 0;"><strong>Add Bass</strong></p>
            </div>
            """, unsafe_allow_html=True)
        
        with variation_cols[2]:
            st.markdown("""
            <div style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center; cursor: pointer;">
                <p style="margin: 0;"><strong>Different Melody</strong></p>
            </div>
            """, unsafe_allow_html=True)
        
        # Educational note
        st.markdown("""
        <div style="background-color: #fff9e6; padding: 15px; border-radius: 10px; margin-top: 20px;">
            <h4 style="margin-top: 0;">How Did AI Create This?</h4>
            <p>AI music generators work by analyzing patterns in thousands of songs to understand:</p>
            <ul>
                <li><strong>Melody:</strong> The main sequence of notes you can hum along to</li>
                <li><strong>Harmony:</strong> The chords and notes that accompany the melody</li>
                <li><strong>Rhythm:</strong> The timing and beat patterns</li>
                <li><strong>Structure:</strong> How songs are organized into sections</li>
            </ul>
            <p>The AI builds a mathematical model of these patterns, then generates new music based on your choices!</p>
        </div>
        """, unsafe_allow_html=True)

def display_animal_recognizer_project():
    """Display the animal recognizer project template"""
    st.markdown("""
    ### Animal Recognizer Project
    
    Build an AI that can identify different animals and learn interesting facts about them!
    """)
    
    # Initialize settings if not present
    if "animal_settings" not in st.session_state:
        st.session_state.animal_settings = {
            "animals": ["Dogs", "Cats", "Birds", "Fish"],
            "fun_facts": True,
            "sounds": True,
            "habitat_info": False
        }
    
    # Two columns layout
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("#### Configure Your Animal Recognizer")
        
        # Animal selection
        animal_options = ["Dogs", "Cats", "Birds", "Fish", "Bears", "Reptiles", "Insects", "Farm Animals", "Ocean Animals", "Jungle Animals", "Desert Animals"]
        
        st.session_state.animal_settings["animals"] = st.multiselect(
            "Animals to Recognize (Select 2-5):",
            animal_options,
            default=st.session_state.animal_settings["animals"]
        )
        
        # Enforce limits
        if len(st.session_state.animal_settings["animals"]) < 2:
            st.warning("Please select at least 2 animal categories!")
        elif len(st.session_state.animal_settings["animals"]) > 5:
            st.session_state.animal_settings["animals"] = st.session_state.animal_settings["animals"][:5]
            st.warning("Maximum 5 animal categories allowed!")
        
        # Additional features
        st.markdown("#### Additional Features")
        
        feature_col1, feature_col2 = st.columns(2)
        
        with feature_col1:
            st.session_state.animal_settings["fun_facts"] = st.checkbox(
                "Include fun facts", 
                value=st.session_state.animal_settings["fun_facts"]
            )
            
            st.session_state.animal_settings["habitat_info"] = st.checkbox(
                "Include habitat information", 
                value=st.session_state.animal_settings["habitat_info"]
            )
        
        with feature_col2:
            st.session_state.animal_settings["sounds"] = st.checkbox(
                "Include animal sounds", 
                value=st.session_state.animal_settings["sounds"]
            )
            
            st.session_state.animal_settings["endangered"] = st.checkbox(
                "Include conservation status", 
                value=st.session_state.animal_settings.get("endangered", False)
            )
        
        # Build model button
        if st.button("Build Animal Recognizer"):
            with st.spinner("Training your animal recognizer..."):
                # Simulate delay
                import time
                time.sleep(1)
                st.success("🎉 Your Animal Recognizer is ready to use!")
                st.session_state.animal_model_built = True
    
    with col2:
        st.markdown("#### How It Works")
        
        st.markdown("""
        1. The AI uses image recognition to identify animals
        2. It analyzes visual patterns like shapes, colors, and textures
        3. It compares these patterns to thousands of animal images it's seen
        4. When it recognizes an animal, it retrieves information from its database
        
        This combines **computer vision** with a **knowledge database**!
        """)
        
        # Show model status
        if st.session_state.get("animal_model_built", False):
            st.markdown("""
            <div style="background-color: #e6ffe6; padding: 10px; border-radius: 5px; margin-top: 15px;">
                <p style="margin: 0;"><strong>Model Status:</strong> Trained and Ready!</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Recognizes: {}</p>
            </div>
            """.format(", ".join(st.session_state.animal_settings["animals"])), unsafe_allow_html=True)
    
    # Test the recognizer
    if st.session_state.get("animal_model_built", False):
        st.markdown("---")
        st.markdown("#### Test Your Animal Recognizer")
        
        # Test options based on selected animals
        test_options = ["Select a test image..."]
        for animal in st.session_state.animal_settings["animals"]:
            test_options.append(f"{animal} - Example 1")
            test_options.append(f"{animal} - Example 2")
        
        selected_test = st.selectbox(
            "Choose a test image:",
            test_options
        )
        
        if selected_test != "Select a test image..." and st.button("Recognize Animal"):
            with st.spinner("Analyzing image..."):
                # Simulate delay
                import time
                time.sleep(0.5)
                
                # Parse the selected animal
                animal_type = selected_test.split(" - ")[0]
                
                # Display results
                st.markdown(f"""
                <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 5px solid #2196F3; margin-top: 15px;">
                    <h3 style="margin-top: 0;">Recognition Results</h3>
                    
                    <div style="display: flex; margin: 20px 0;">
                        <div style="flex: 1; background-color: #e0e0e0; height: 200px; border-radius: 5px; display: flex; justify-content: center; align-items: center;">
                            <p style="text-align: center;">🖼️ {animal_type} Image</p>
                        </div>
                        
                        <div style="flex: 1; padding-left: 20px;">
                            <p><strong>Recognized:</strong> {animal_type}</p>
                            <p><strong>Confidence:</strong> {random.uniform(85, 98):.1f}%</p>
                        </div>
                    </div>
                """, unsafe_allow_html=True)
                
                # Add additional information based on settings
                additional_info = "<h4>Animal Information</h4><ul>"
                
                if st.session_state.animal_settings["fun_facts"]:
                    if animal_type == "Dogs":
                        additional_info += "<li><strong>Fun Fact:</strong> Dogs have a sense of smell that is 40 times better than humans!</li>"
                    elif animal_type == "Cats":
                        additional_info += "<li><strong>Fun Fact:</strong> Cats spend about 70% of their lives sleeping!</li>"
                    elif animal_type == "Birds":
                        additional_info += "<li><strong>Fun Fact:</strong> Some birds can remember thousands of hiding places for seeds!</li>"
                    elif animal_type == "Fish":
                        additional_info += "<li><strong>Fun Fact:</strong> Some fish can change their gender throughout their lifetime!</li>"
                    else:
                        additional_info += f"<li><strong>Fun Fact:</strong> {animal_type} are fascinating creatures with unique adaptations!</li>"
                
                if st.session_state.animal_settings["habitat_info"]:
                    if animal_type == "Dogs":
                        additional_info += "<li><strong>Habitat:</strong> Dogs have adapted to live alongside humans in various environments worldwide.</li>"
                    elif animal_type == "Cats":
                        additional_info += "<li><strong>Habitat:</strong> Cats are found on every continent except Antarctica, in homes and in the wild.</li>"
                    elif animal_type == "Birds":
                        additional_info += "<li><strong>Habitat:</strong> Birds live in diverse habitats from forests to oceans, deserts to mountains.</li>"
                    elif animal_type == "Fish":
                        additional_info += "<li><strong>Habitat:</strong> Fish live in freshwater and saltwater environments worldwide.</li>"
                    else:
                        additional_info += f"<li><strong>Habitat:</strong> {animal_type} can be found in various natural habitats around the world.</li>"
                
                if st.session_state.animal_settings.get("endangered", False):
                    if animal_type == "Dogs" or animal_type == "Cats":
                        additional_info += "<li><strong>Conservation Status:</strong> Domesticated, not endangered</li>"
                    elif animal_type == "Birds":
                        additional_info += "<li><strong>Conservation Status:</strong> Varies by species - many bird species are threatened</li>"
                    elif animal_type == "Fish":
                        additional_info += "<li><strong>Conservation Status:</strong> Many fish species are endangered due to overfishing</li>"
                    else:
                        statuses = ["Least Concern", "Vulnerable", "Endangered", "Critically Endangered"]
                        additional_info += f"<li><strong>Conservation Status:</strong> {random.choice(statuses)}</li>"
                
                additional_info += "</ul>"
                
                # Add sounds if enabled
                if st.session_state.animal_settings["sounds"]:
                    sound_text = "🔊"
                    if animal_type == "Dogs":
                        sound_text += " Woof! Woof!"
                    elif animal_type == "Cats":
                        sound_text += " Meow! Purr..."
                    elif animal_type == "Birds":
                        sound_text += " Tweet! Chirp!"
                    elif animal_type == "Fish":
                        sound_text += " (Fish don't make sounds we can hear!)"
                    else:
                        sound_text += f" {animal_type} sounds!"
                    
                    additional_info += f"""
                    <div style="background-color: #e0e0e0; padding: 10px; border-radius: 5px; margin-top: 10px;">
                        <p style="margin: 0; text-align: center;">{sound_text}</p>
                    </div>
                    """
                
                # Close the main div
                st.markdown(additional_info + "</div>", unsafe_allow_html=True)

def get_avatar_emoji(appearance, animal_type="Cat"):
    """Get the appropriate emoji for the avatar style"""
    if appearance == "Robot":
        return "🤖"
    elif appearance == "Animal":
        animal_emojis = {
            "Cat": "🐱",
            "Dog": "🐶",
            "Fox": "🦊",
            "Owl": "🦉",
            "Dolphin": "🐬",
            "Dragon": "🐲"
        }
        return animal_emojis.get(animal_type, "🐱")
    elif appearance == "Cartoon Character":
        return "👾"
    elif appearance == "Glowing Orb":
        return "🔮"
    elif appearance == "Hologram":
        return "👤"
    elif appearance == "Abstract Shape":
        return "⭐"
    else:
        return "🤖"

def generate_avatar_color(personality):
    """Generate a color based on personality traits"""
    if not personality:
        return "#a0a0ff"  # Default blue
    
    # Color mapping for different personalities
    color_map = {
        "Friendly": "#a0d0ff",  # Light blue
        "Helpful": "#a0ffa0",   # Light green
        "Funny": "#ffd0a0",     # Light orange
        "Creative": "#ffa0ff",  # Light purple
        "Wise": "#d0d0ff",      # Periwinkle
        "Curious": "#ffffa0",   # Light yellow
        "Adventurous": "#ffa0a0", # Light red
        "Logical": "#a0ffff",   # Light cyan
        "Enthusiastic": "#ffa0d0", # Light pink
        "Patient": "#d0ffa0"    # Light lime
    }
    
    # Use the first personality trait's color
    first_trait = personality[0]
    return color_map.get(first_trait, "#a0a0ff")

def generate_response(topic, personality, skills):
    """Generate a response based on the selected topic and AI friend's personality"""
    # Simple templated responses based on topic and personality
    responses = {
        "Space": {
            "Friendly": "I'd be happy to tell you about space! Did you know that stars are actually huge balls of gas, like our sun? Space is so vast that light from distant stars takes millions of years to reach us!",
            "Funny": "Space, the final fun-tier! 😄 Why don't astronauts tell jokes on the moon? Because there's no atmosphere! But seriously, space is amazing with billions of stars and planets.",
            "Creative": "Imagine floating among the stars, watching colorful nebulas swirl like cosmic paintings. Space is the ultimate canvas of the universe, with galaxies like brushstrokes across infinity.",
            "Wise": "The study of the cosmos teaches us perspective. In the vastness of space, we find both our insignificance and our remarkable uniqueness. The atoms in our bodies were once forged in stars.",
            "default": "Space is fascinating! Our solar system has eight planets orbiting around the sun, and there are billions of other stars with their own planets. Scientists discover new things about space every day!"
        },
        "Animals": {
            "Friendly": "Animals are amazing friends! There are over 8 million different animal species on Earth, from tiny insects to enormous whales. What's your favorite animal?",
            "Funny": "Animals are hilarious! Did you know that otters hold hands while sleeping so they don't float away? And penguins propose with pebbles! Nature's comedians, I tell you!",
            "Creative": "The animal kingdom is like a living art gallery - from the geometric patterns on a butterfly's wings to the flowing movements of sea creatures. Each animal has its own unique design and story.",
            "Wise": "Animals have much to teach us about living in harmony with nature. Each creature, from the smallest ant to the largest elephant, has an important role in maintaining the balance of our ecosystems.",
            "default": "Animals are incredible! They've evolved amazing adaptations to survive in their environments. Some can change colors, others can survive extreme temperatures, and many have senses much stronger than humans!"
        },
        "general": {
            "Friendly": "That's a great question! I'm always happy to chat and learn new things together. What else would you like to know about?",
            "Funny": "Well, that's an interesting question! It reminds me of the time I tried to download more RAM... just kidding, I wouldn't do that! 😄 But I'd love to help you find an answer!",
            "Creative": "What a thought-provoking question! It makes me imagine all sorts of possibilities and ideas we could explore together. Let's think outside the box!",
            "Wise": "An excellent inquiry. As the ancient proverb says, 'To know that we know what we know, and that we do not know what we do not know, that is true knowledge.' Let's explore this together.",
            "default": "That's interesting! I'm designed to be helpful and informative. I can tell stories, answer questions, and chat about lots of different topics."
        }
    }
    
    # Determine which topic to use
    if "Telling stories" in skills and random.random() < 0.3:
        return "Would you like me to tell you a story? I can create adventures about space explorers, talking animals, or magical journeys!"
    
    if "Making jokes" in skills and random.random() < 0.2:
        jokes = [
            "Why did the robot go back to robot school? To improve its motor skills!",
            "What do you call an AI that sings? Artificial Harmonies!",
            "Why don't scientists trust atoms? Because they make up everything!",
            "How does a computer get drunk? It takes screenshots!"
        ]
        return random.choice(jokes) + " 😄"
    
    # Select the topic-specific responses if available, otherwise use general
    if topic in responses:
        topic_responses = responses[topic]
    else:
        topic_responses = responses["general"]
    
    # Select the personality-specific response if available, otherwise use default
    if personality in topic_responses:
        return topic_responses[personality]
    else:
        return topic_responses["default"]

def generate_story_title(theme, character):
    """Generate a story title based on theme and character"""
    if theme == "Space Adventure":
        titles = [
            f"The {character}'s Cosmic Journey",
            f"Lost in the Stars: A {character}'s Tale",
            f"Galactic Mission: {character} to the Rescue"
        ]
    elif theme == "Magical Forest":
        titles = [
            f"The Enchanted Woods and the {character}",
            f"Whispers of the Magical Forest: The {character}'s Quest",
            f"The {character} and the Crystal of Power"
        ]
    elif theme == "Underwater World":
        titles = [
            f"Deep Blue Secrets: The {character}'s Discovery",
            f"The {character}'s Underwater Adventure",
            f"Treasures of the Azure Sea: A {character}'s Journey"
        ]
    elif theme == "Robot City":
        titles = [
            f"Gears and Circuits: The {character} of Mechanopolis",
            f"The {character}'s Mechanical Mystery",
            f"Powering Up: A {character} in Robot City"
        ]
    elif theme == "Dinosaur Land":
        titles = [
            f"Prehistoric Journeys: The {character}'s Adventure",
            f"The {character} and the Lost Dinosaur World",
            f"Time Portal: A {character} Among Dinosaurs"
        ]
    else:  # Superhero Academy
        titles = [
            f"Super Powers Unleashed: The {character}'s First Day",
            f"The {character} of Powerhouse Academy",
            f"Learning to Fly: A {character}'s Hero Journey"
        ]
    
    return random.choice(titles)

def generate_chatbot_response(question, personality, expertise):
    """Generate a chatbot response based on question, personality and expertise"""
    # Check if question is related to any expertise areas
    topic = None
    if any(area.lower() in question.lower() for area in expertise):
        # Find which expertise area matches
        for area in expertise:
            if area.lower() in question.lower():
                topic = area
                break
    
    # Simple response templates based on expertise and personality
    if topic == "Science":
        if personality == "Friendly":
            return "Science is so fascinating! From chemistry to physics, there's so much to explore. What specific part of science interests you the most?"
        elif personality == "Funny":
            return "I'm pretty good at science jokes - they always get a reaction! 😄 But seriously, science helps us understand everything from tiny atoms to giant galaxies. What would you like to know?"
        elif personality == "Serious":
            return "Science is the systematic study of the natural world through observation and experiment. It encompasses physics, chemistry, biology, and other disciplines. What specific scientific topic are you inquiring about?"
        else:  # Enthusiastic
            return "WOW! Science is AMAZING! It explains how EVERYTHING works! From explosive chemical reactions to the mysteries of quantum physics, science is the greatest adventure of discovery! What part excites you the most?!"
    
    elif topic == "Space":
        if personality == "Friendly":
            return "Space is such an amazing place! Our solar system has eight planets, and beyond that are billions of stars and galaxies. What would you like to know about space?"
        elif personality == "Funny":
            return "Space: the final fun-tier! 🚀 I heard the restaurants there have no atmosphere... Sorry, couldn't resist! Space is actually filled with fascinating objects like planets, stars, and black holes. What space topic interests you?"
        elif personality == "Serious":
            return "Space is the boundless three-dimensional extent in which objects and events have relative position and direction. Our observable universe spans approximately 93 billion light-years. Would you like information about specific celestial objects?"
        else:  # Enthusiastic
            return "SPACE IS INCREDIBLE! Stars exploding! Planets with diamond rain! Black holes warping reality! It's the biggest, most exciting frontier we have! What awesome space topic would you like to explore?!"
    
    elif topic == "Animals":
        if personality == "Friendly":
            return "Animals are wonderful! There are millions of different species, from tiny insects to enormous whales. Do you have a favorite animal you'd like to learn about?"
        elif personality == "Funny":
            return "What do you call a bear with no teeth? A gummy bear! 🐻 Animals are amazing creatures with all sorts of weird and wonderful adaptations. Any particular critter you're curious about?"
        elif personality == "Serious":
            return "The animal kingdom encompasses a diverse range of organisms, from simple sponges to complex mammals. Each has evolved specialized adaptations for survival. Which taxonomic group would you like information on?"
        else:  # Enthusiastic
            return "ANIMALS ARE THE BEST! From super-smart dolphins to the incredible camouflage of the octopus, animals have AMAZING abilities! Some can even see colors we can't imagine! What awesome animal would you like to know about?!"
    
    # General responses for other topics
    elif "hello" in question.lower() or "hi" in question.lower():
        if personality == "Friendly":
            return f"Hello there! It's nice to meet you. I'm your helpful chatbot with expertise in {', '.join(expertise)}. How can I help you today?"
        elif personality == "Funny":
            return f"Hey there! 👋 I was going to tell a joke about my expertise in {', '.join(expertise)}, but I wasn't sure if it would compute! How can I help you today?"
        elif personality == "Serious":
            return f"Greetings. I am a knowledge-based assistant specializing in {', '.join(expertise)}. Please state your query so I may provide information."
        else:  # Enthusiastic
            return f"HI THERE! I'm SO EXCITED to chat with you today! I know LOTS about {', '.join(expertise)} and can't wait to help! What would you like to talk about?!"
    
    elif "how are you" in question.lower():
        if personality == "Friendly":
            return "I'm doing well, thank you for asking! I'm ready to help with any questions you might have."
        elif personality == "Funny":
            return "I'm operating at 100% humor capacity and my pun generator is fully charged! 🔋 Ready to help and maybe share a laugh or two!"
        elif personality == "Serious":
            return "I am functioning within optimal parameters. My systems are prepared to provide informational assistance."
        else:  # Enthusiastic
            return "I'm FANTASTIC! Every day is amazing when you get to learn and share knowledge! I'm SUPER ready to help you with anything you need!"
    
    else:
        # Default response based on personality
        if personality == "Friendly":
            return f"That's an interesting question! While I specialize in {', '.join(expertise)}, I'd be happy to help you find information on this topic too. Could you tell me more about what you'd like to know?"
        elif personality == "Funny":
            return f"Hmm, that's a bit outside my expertise in {', '.join(expertise)}... I could make something up, but my 'fictional answer generator' is being repaired! 😄 What specific information are you looking for?"
        elif personality == "Serious":
            return f"I primarily provide information on {', '.join(expertise)}. Your query appears to be outside these domains. Please provide additional context or reformulate your question."
        else:  # Enthusiastic
            return f"OOH! Interesting question! While I'm ESPECIALLY knowledgeable about {', '.join(expertise)}, I'm EXCITED to explore other topics too! What would you like to know specifically?!"