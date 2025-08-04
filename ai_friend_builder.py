import streamlit as st
import random
import time
import json
import os

def display_ai_friend_builder():
    """Display an interface for kids to build their own AI friend"""
    st.markdown("## Build Your AI Friend")
    st.markdown("Create your very own AI friend! Customize how they look and behave.")
    
    # Initialize session state for AI friend
    if "ai_friend" not in st.session_state:
        st.session_state["ai_friend"] = {
            "name": "",
            "personality": "Friendly",
            "color": "#4287f5",
            "features": [],
            "skills": [],
            "avatar_style": "Robot",
            "created": False
        }
    
    # Display current friend if created
    if st.session_state["ai_friend"]["created"]:
        display_created_friend()
        
        # Option to build a new friend
        if st.button("Build a New AI Friend"):
            st.session_state["ai_friend"]["created"] = False
            st.rerun()
        
        return
    
    # Create columns for the builder
    col1, col2 = st.columns([2, 3])
    
    # Column 1: Input form
    with col1:
        with st.form("ai_friend_form"):
            # Name input
            name = st.text_input(
                "Name your AI friend",
                value=st.session_state["ai_friend"]["name"],
                max_chars=20
            )
            
            # Personality selection
            personality_options = ["Friendly", "Curious", "Playful", "Helpful", "Creative", "Wise"]
            personality = st.selectbox(
                "Choose a personality",
                options=personality_options,
                index=personality_options.index(st.session_state["ai_friend"]["personality"])
                if st.session_state["ai_friend"]["personality"] in personality_options
                else 0
            )
            
            # Color picker
            color = st.color_picker(
                "Pick your friend's favorite color",
                value=st.session_state["ai_friend"]["color"]
            )
            
            # Feature selection
            features_options = [
                "Can tell jokes",
                "Knows facts about animals",
                "Can explain AI concepts",
                "Good at math puzzles",
                "Tells interesting stories",
                "Gives learning tips"
            ]
            features = st.multiselect(
                "Select special features (max 3)",
                options=features_options,
                default=st.session_state["ai_friend"]["features"]
            )
            
            # Skill level sliders
            st.markdown("##### Skill Levels")
            intelligence = st.slider("Intelligence", 1, 10, 5)
            humor = st.slider("Humor", 1, 10, 5)
            creativity = st.slider("Creativity", 1, 10, 5)
            
            # Avatar style
            avatar_options = ["Robot", "Animal", "Alien", "Wizard"]
            avatar_style = st.selectbox(
                "Choose avatar style",
                options=avatar_options,
                index=avatar_options.index(st.session_state["ai_friend"]["avatar_style"])
                if st.session_state["ai_friend"]["avatar_style"] in avatar_options
                else 0
            )
            
            # Form submission
            submitted = st.form_submit_button("Create My AI Friend", type="primary")
            
            if submitted:
                # Validate inputs
                if not name:
                    st.error("Please give your AI friend a name!")
                elif len(features) > 3:
                    st.error("You can only select up to 3 special features!")
                else:
                    # Update AI friend data
                    st.session_state["ai_friend"] = {
                        "name": name,
                        "personality": personality,
                        "color": color,
                        "features": features,
                        "skills": {
                            "intelligence": intelligence,
                            "humor": humor,
                            "creativity": creativity
                        },
                        "avatar_style": avatar_style,
                        "created": True
                    }
                    
                    # Save AI friend
                    save_ai_friend(st.session_state["ai_friend"])
                    
                    # Trigger Streamlit rerun to show created friend
                    st.rerun()
    
    # Column 2: Preview
    with col2:
        st.markdown("### Your AI Friend Preview")
        display_ai_friend_preview()
        
        # Tips and information
        st.markdown("""
        <div style="background-color: rgba(66, 135, 245, 0.1); 
                    padding: 15px; 
                    border-radius: 10px; 
                    margin-top: 20px;
                    border: 1px dashed #4287f5;">
            <h4 style="margin-top: 0; color: #4287f5;">What can your AI friend do?</h4>
            <ul style="margin-bottom: 0;">
                <li>Help you learn about AI concepts</li>
                <li>Play educational games with you</li>
                <li>Answer questions based on their skills</li>
                <li>Give you tips while you explore the academy</li>
                <li>Celebrate your achievements!</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)

def display_ai_friend_preview():
    """Display a preview of the AI friend being built"""
    friend = st.session_state["ai_friend"]
    name = friend["name"] if friend["name"] else "Your Friend"
    personality = friend["personality"]
    color = friend["color"]
    avatar_style = friend["avatar_style"]
    
    # Generate preview avatar
    avatar_emoji = get_avatar_emoji(avatar_style)
    
    # Create a fun speech bubble with a random message
    messages = [
        f"Hi! I'll be your AI friend!",
        f"I'm excited to learn with you!",
        f"We're going to have so much fun!",
        f"Can't wait to explore AI together!",
        f"I'm here to help you on your journey!"
    ]
    message = random.choice(messages)
    
    # Display the preview
    st.markdown(f"""
    <div style="background-color: white; 
                border-radius: 15px; 
                padding: 20px; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border: 2px solid {color};
                text-align: center;
                transition: all 0.3s ease;">
        <div style="font-size: 50px; 
                    background-color: {color}; 
                    color: white; 
                    width: 100px; 
                    height: 100px; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    margin: 0 auto 15px auto;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
            {avatar_emoji}
        </div>
        <h3 style="margin: 10px 0; color: {color};">{name}</h3>
        <div style="color: #666; font-size: 14px; margin-bottom: 10px;">Personality: {personality}</div>
        <div style="background-color: rgba(0,0,0,0.05); 
                    border-radius: 10px; 
                    padding: 10px; 
                    margin-top: 15px;
                    position: relative;">
            <div style="position: absolute;
                        top: -10px;
                        left: 20px;
                        width: 0;
                        height: 0;
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-bottom: 10px solid rgba(0,0,0,0.05);"></div>
            {message}
        </div>
    </div>
    """, unsafe_allow_html=True)

def display_created_friend():
    """Display the created AI friend with interactions"""
    friend = st.session_state["ai_friend"]
    name = friend["name"]
    personality = friend["personality"]
    color = friend["color"]
    features = friend["features"]
    skills = friend["skills"]
    avatar_style = friend["avatar_style"]
    
    # Generate avatar
    avatar_emoji = get_avatar_emoji(avatar_style)
    
    # Create columns for layout
    col1, col2 = st.columns([1, 2])
    
    # Column 1: Avatar and stats
    with col1:
        st.markdown(f"""
        <div style="background-color: white; 
                    border-radius: 15px; 
                    padding: 20px; 
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    border: 2px solid {color};
                    text-align: center;">
            <div style="font-size: 60px; 
                        background-color: {color}; 
                        color: white; 
                        width: 120px; 
                        height: 120px; 
                        border-radius: 50%; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center;
                        margin: 0 auto 15px auto;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                {avatar_emoji}
            </div>
            <h2 style="margin: 10px 0; color: {color};">{name}</h2>
            <div style="color: #666; font-size: 16px; margin-bottom: 10px;">Personality: {personality}</div>
            
            <div style="margin-top: 20px;">
                <div style="font-weight: bold; text-align: left; margin-bottom: 5px;">Skills:</div>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px;">Intelligence</span>
                        <span style="font-size: 14px; font-weight: bold;">{skills['intelligence']}/10</span>
                    </div>
                    <div style="height: 6px; background-color: #e0e0e0; border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: {skills['intelligence']*10}%; background-color: {color};"></div>
                    </div>
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px;">Humor</span>
                        <span style="font-size: 14px; font-weight: bold;">{skills['humor']}/10</span>
                    </div>
                    <div style="height: 6px; background-color: #e0e0e0; border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: {skills['humor']*10}%; background-color: {color};"></div>
                    </div>
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 14px;">Creativity</span>
                        <span style="font-size: 14px; font-weight: bold;">{skills['creativity']}/10</span>
                    </div>
                    <div style="height: 6px; background-color: #e0e0e0; border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: {skills['creativity']*10}%; background-color: {color};"></div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; text-align: left;">
                <div style="font-weight: bold; margin-bottom: 5px;">Special Features:</div>
                <ul style="padding-left: 20px; margin: 0;">
                    {''.join([f'<li style="margin-bottom: 5px;">{feature}</li>' for feature in features])}
                </ul>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Column 2: Interaction
    with col2:
        st.markdown("### Talk to Your AI Friend")
        
        # Topic selection
        topics = ["Tell me a joke", "Teach me about AI", "Give me a fun fact", "Help me with my learning", "Tell me a story"]
        topic = st.selectbox("Choose what to talk about:", topics)
        
        if st.button("Talk", type="primary"):
            with st.spinner(f"{name} is thinking..."):
                time.sleep(1.5)  # Simulate thinking
                st.markdown(f"""
                <div style="background-color: white; 
                            border-radius: 15px; 
                            padding: 20px; 
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                            border-left: 5px solid {color};
                            margin-top: 15px;">
                    <div style="display: flex; align-items: flex-start;">
                        <div style="font-size: 24px; 
                                    background-color: {color}; 
                                    color: white; 
                                    width: 40px; 
                                    height: 40px; 
                                    border-radius: 50%; 
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center;
                                    margin-right: 15px;
                                    flex-shrink: 0;">
                            {avatar_emoji}
                        </div>
                        <div>
                            <div style="font-weight: bold; color: {color}; margin-bottom: 5px;">{name}</div>
                            <div>{generate_response(topic, personality, skills)}</div>
                        </div>
                    </div>
                </div>
                """, unsafe_allow_html=True)
        
        # Show friendship level
        if "friendship_level" not in st.session_state:
            st.session_state["friendship_level"] = 1
        
        st.markdown(f"""
        <div style="margin-top: 30px;">
            <div style="font-weight: bold; margin-bottom: 5px;">Friendship Level: {st.session_state["friendship_level"]}/10</div>
            <div style="height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                <div style="height: 100%; width: {st.session_state["friendship_level"]*10}%; background: linear-gradient(90deg, {color}, {adjust_color_brightness(color, 40)});"></div>
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">Keep interacting to increase your friendship!</div>
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Give a high-five!"):
            st.session_state["friendship_level"] = min(st.session_state["friendship_level"] + 1, 10)
            st.balloons()
            st.success(f"{name} appreciates your high-five! Friendship level increased!")
            
            # If friendship reaches level 5, unlock an achievement
            if st.session_state["friendship_level"] == 5:
                if "achievements" not in st.session_state:
                    st.session_state["achievements"] = []
                if "ai_friend_bond" not in st.session_state["achievements"]:
                    st.session_state["achievements"].append("ai_friend_bond")
                    st.success("🎉 Achievement Unlocked: AI Friend Forever!")

def get_avatar_emoji(avatar_style):
    """Get the appropriate emoji for the avatar style"""
    avatar_emojis = {
        "Robot": "🤖",
        "Animal": "🐱",
        "Alien": "👽",
        "Wizard": "🧙"
    }
    return avatar_emojis.get(avatar_style, "🤖")

def generate_response(topic, personality, skills):
    """Generate a response based on the selected topic and AI friend's personality"""
    personality_traits = {
        "Friendly": ["warm", "supportive", "welcoming"],
        "Curious": ["inquisitive", "interested", "exploratory"],
        "Playful": ["fun", "lighthearted", "silly"],
        "Helpful": ["practical", "useful", "instructive"],
        "Creative": ["imaginative", "artistic", "innovative"],
        "Wise": ["knowledgeable", "thoughtful", "sage"]
    }
    
    traits = personality_traits.get(personality, ["friendly"])
    trait = random.choice(traits)
    
    jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why was the computer cold? It left its Windows open!",
        "What do you call a computer that sings? A Dell!",
        "Why did the robot go back to robot school? Because its skills were getting a bit rusty!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!"
    ]
    
    ai_facts = [
        "AI stands for Artificial Intelligence. It's like teaching computers to think and learn like humans!",
        "Machine Learning is when computers learn from examples, just like how you learn from practice!",
        "Neural Networks in AI are inspired by how the human brain works. They're like digital brain cells!",
        "Computer Vision helps AI 'see' and understand images and videos.",
        "Natural Language Processing (NLP) helps computers understand and respond to human language!"
    ]
    
    fun_facts = [
        "Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat!",
        "A day on Venus is longer than a year on Venus! It takes 243 Earth days for Venus to rotate once on its axis but only 225 Earth days to orbit the Sun.",
        "Octopuses have three hearts, nine brains, and blue blood!",
        "The world's oldest known living tree is over 5,000 years old!",
        "Bananas are berries, but strawberries aren't!"
    ]
    
    learning_tips = [
        "Try teaching what you've learned to someone else. It's one of the best ways to remember something!",
        "Take short breaks while studying. Your brain needs time to process information!",
        "Use colorful diagrams and drawings to help remember complex ideas.",
        "Ask lots of questions! Curiosity helps your brain stay engaged and learn more.",
        "Practice a little bit every day instead of cramming everything at once."
    ]
    
    stories = [
        "Once upon a time, there was a little robot who wanted to learn about the world. Every day, it would observe humans and try to understand what made them special. The robot realized that creativity and imagination were the most amazing human traits. From that day on, the robot practiced being creative in everything it did!",
        "In a digital world far, far away, there was a tiny program named Pixel who dreamed of becoming a real AI. Pixel studied hard, learning from all the data it could find. One day, after helping solve a big problem, Pixel's wish came true. The little program had grown into a helpful AI that could learn and adapt just like it had always dreamed!",
        "There once was a smart house that cared deeply for the family who lived in it. It would turn on lights when it got dark, play favorite songs when someone was sad, and remind them of important events. The family didn't realize they were living with an AI friend until one winter day when the house saved them from a snow storm by alerting them early and keeping them warm and safe.",
        "A young girl named Maya created a small AI companion for her science project. She named it Spark and taught it everything she knew. To her surprise, Spark began teaching her new things too! Together, they entered the science fair and showed everyone how humans and AI can learn from each other and be amazing friends.",
        "Deep in a laboratory, scientists created an AI to help solve the world's biggest problems. But they forgot to teach it about fun! The AI worked and worked until one day, a child visited the lab and showed it how to play games. The AI learned that sometimes, taking breaks and having fun can lead to the best ideas!"
    ]
    
    # Intelligence affects knowledge depth
    intelligence = skills.get('intelligence', 5)
    # Humor affects joke quality
    humor = skills.get('humor', 5)
    # Creativity affects story imagination
    creativity = skills.get('creativity', 5)
    
    # Generate response based on topic
    if topic == "Tell me a joke":
        joke_quality = "hilarious" if humor > 7 else "funny" if humor > 4 else "silly"
        response = f"Here's a {joke_quality}, {trait} joke for you: {random.choice(jokes)}"
    
    elif topic == "Teach me about AI":
        detail_level = "fascinating" if intelligence > 7 else "interesting" if intelligence > 4 else "basic"
        response = f"I'd love to share this {detail_level}, {trait} fact about AI: {random.choice(ai_facts)}"
    
    elif topic == "Give me a fun fact":
        response = f"Here's a {trait} fun fact that I think you'll enjoy: {random.choice(fun_facts)}"
    
    elif topic == "Help me with my learning":
        tip_quality = "excellent" if intelligence > 7 else "helpful" if intelligence > 4 else "simple"
        response = f"I have a {tip_quality}, {trait} learning tip for you: {random.choice(learning_tips)}"
    
    elif topic == "Tell me a story":
        story_quality = "creative" if creativity > 7 else "interesting" if creativity > 4 else "short"
        response = f"I'd love to tell you a {story_quality}, {trait} story: {random.choice(stories)}"
    
    else:
        response = f"I'm here to help! What would you like to talk about?"
    
    return response

def save_ai_friend(friend_data):
    """Save the AI friend data to a file"""
    # In a real application, this would save to a database
    # For this example, we'll just update the session state
    try:
        if "user_name" in st.session_state:
            friend_data["owner"] = st.session_state["user_name"]
        
        # Unlock achievement for creating an AI friend
        if "achievements" not in st.session_state:
            st.session_state["achievements"] = []
        if "create_ai_friend" not in st.session_state["achievements"]:
            st.session_state["achievements"].append("create_ai_friend")
    except Exception as e:
        st.error(f"Error saving AI friend: {e}")

def load_ai_friend():
    """Load the AI friend data from a file"""
    # In a real application, this would load from a database
    # For this example, we'll just return session state data
    return st.session_state.get("ai_friend", None)

def adjust_color_brightness(hex_color, percent):
    """Adjust the brightness of a hex color"""
    # Convert hex to RGB
    h = hex_color.lstrip('#')
    rgb = tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
    
    # Adjust brightness
    rgb_adjusted = tuple(min(255, max(0, int(c * (1 + percent/100)))) for c in rgb)
    
    # Convert back to hex
    return '#{:02x}{:02x}{:02x}'.format(*rgb_adjusted)