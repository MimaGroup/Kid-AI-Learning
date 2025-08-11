import streamlit as st
import time
import os
import sys
import random

# Add the root directory to the path to import from components
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import custom components
from components.world_map import display_world_map
from components.achievements import display_achievements, unlock_achievement
from components.ai_friend_builder import display_ai_friend_builder
from components.robot_guide import display_robot_guide

# Import utility functions
from utils.helpers import initialize_session_state, update_progress

def main():
    """Main function for the AI Playground page"""
    st.title("AI Playground 🎮")
    
    # Initialize session state
    initialize_session_state()
    
    # Display robot guide
    display_robot_guide(
        "Welcome to the AI Playground! This is where you can have fun, create, and explore interactive AI experiences. Choose an activity below to get started!"
    )
    
    # Create tabs for different playground activities
    tab1, tab2, tab3, tab4 = st.tabs([
        "🗺️ Adventure Map", 
        "🏆 Achievements", 
        "🤖 AI Friend Builder", 
        "🔬 Experiment Lab"
    ])
    
    # Tab 1: Adventure Map
    with tab1:
        display_world_map()
        
        st.markdown("""
        <div style="background-color: rgba(66, 135, 245, 0.1); 
                    border-radius: 10px; 
                    padding: 15px; 
                    margin-top: 20px;
                    border: 1px dashed #4287f5;">
            <h4 style="margin-top: 0; color: #4287f5;">How Adventures Work</h4>
            <p>Each region on the map represents a different AI topic to explore. Complete tasks and quizzes to unlock new regions!</p>
            <p>Your progress unlocks new areas on the map. Keep learning and playing to discover the entire AI world!</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Tab 2: Achievements
    with tab2:
        display_achievements()
    
    # Tab 3: AI Friend Builder
    with tab3:
        display_ai_friend_builder()
    
    # Tab 4: Experiment Lab
    with tab4:
        display_experiment_lab()

def display_experiment_lab():
    """Display the AI experiment lab section"""
    st.markdown("## AI Experiment Lab")
    st.markdown("Try simple experiments to understand how AI technologies work!")
    
    # Create experiment categories
    exp_category = st.selectbox(
        "Choose an experiment category:",
        ["Image Recognition", "Text Generation", "Voice & Sound", "Pattern Finding"]
    )
    
    # Display experiments based on selected category
    if exp_category == "Image Recognition":
        display_image_recognition_experiment()
    elif exp_category == "Text Generation":
        display_text_generation_experiment()
    elif exp_category == "Voice & Sound":
        display_voice_sound_experiment()
    elif exp_category == "Pattern Finding":
        display_pattern_finding_experiment()

def display_image_recognition_experiment():
    """Display an image recognition experiment"""
    st.markdown("### 📷 Image Recognition Experiment")
    st.markdown("""
    Learn how AI can recognize objects in pictures! In this simulation, you'll see how
    a computer learns to identify different objects.
    """)
    
    # Create columns for layout
    col1, col2 = st.columns([2, 3])
    
    with col1:
        # Image selection
        st.markdown("#### Select an image to analyze")
        image_options = {
            "Cat": "🐱",
            "Dog": "🐶",
            "Apple": "🍎",
            "Bicycle": "🚲",
            "Book": "📚"
        }
        selected_image = st.selectbox("Choose an object:", list(image_options.keys()))
        
        # Display the selected image (using emoji as placeholder)
        st.markdown(f"""
        <div style="background-color: #f5f5f5; 
                    border-radius: 10px; 
                    padding: 40px; 
                    margin: 20px 0;
                    text-align: center;
                    font-size: 100px;">
            {image_options[selected_image]}
        </div>
        """, unsafe_allow_html=True)
        
        # Analyze button
        if st.button("Analyze Image", type="primary"):
            with st.spinner("AI analyzing image..."):
                # Simulate processing time
                time.sleep(2)
                
                # Update experiment progress in session state
                if "experiments_completed" not in st.session_state:
                    st.session_state["experiments_completed"] = []
                
                experiment_id = f"image_recognition_{selected_image.lower()}"
                if experiment_id not in st.session_state["experiments_completed"]:
                    st.session_state["experiments_completed"].append(experiment_id)
                    update_progress(0.05)
    
    with col2:
        st.markdown("#### How AI Sees Images")
        
        # If an image has been selected, show the analysis
        if "experiments_completed" in st.session_state:
            image_experiments = [exp for exp in st.session_state["experiments_completed"] if exp.startswith("image_recognition_")]
            
            if image_experiments:
                # Show a visualization of how AI analyzes the image
                st.markdown(f"""
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin-bottom: 20px;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 1: Feature Detection</h4>
                    <div style="height: 80px; 
                                background-color: #f5f5f5;
                                margin-bottom: 15px;
                                border-radius: 5px;
                                position: relative;
                                overflow: hidden;">
                        <div style="position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: repeating-linear-gradient(
                                        90deg,
                                        rgba(66, 135, 245, 0.1),
                                        rgba(66, 135, 245, 0.1) 20px,
                                        rgba(255, 255, 255, 0) 20px,
                                        rgba(255, 255, 255, 0) 40px
                                    );">
                        </div>
                    </div>
                    <p style="font-size: 14px; color: #666;">AI looks for edges, shapes, and patterns in the image</p>
                </div>
                
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin-bottom: 20px;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 2: Pattern Matching</h4>
                    <div style="display: flex; justify-content: space-between; margin: 15px 0;">
                        <div style="text-align: center; width: 30%;">
                            <div style="font-size: 24px; margin-bottom: 5px;">🐱</div>
                            <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                <div style="height: 100%; width: {25 if selected_image != 'Cat' else 95}%; background-color: #4CAF50;"></div>
                            </div>
                        </div>
                        <div style="text-align: center; width: 30%;">
                            <div style="font-size: 24px; margin-bottom: 5px;">🐶</div>
                            <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                <div style="height: 100%; width: {30 if selected_image != 'Dog' else 95}%; background-color: #2196F3;"></div>
                            </div>
                        </div>
                        <div style="text-align: center; width: 30%;">
                            <div style="font-size: 24px; margin-bottom: 5px;">🍎</div>
                            <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                <div style="height: 100%; width: {15 if selected_image != 'Apple' else 95}%; background-color: #F44336;"></div>
                            </div>
                        </div>
                    </div>
                    <p style="font-size: 14px; color: #666;">AI compares patterns to objects it's seen before</p>
                </div>
                
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin-bottom: 20px;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 3: Classification</h4>
                    <div style="text-align: center; 
                                padding: 15px; 
                                background-color: rgba(76, 175, 80, 0.1); 
                                border-radius: 8px;
                                border: 2px solid #4CAF50;">
                        <div style="font-weight: bold; font-size: 24px; color: #4CAF50;">
                            This is a {selected_image}! (95% confident)
                        </div>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 15px;">AI decides what the image shows based on the patterns it identified</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Show explanation
                st.markdown("#### How It Works")
                st.markdown("""
                1. **Feature Detection**: The AI breaks down the image into simple shapes and patterns
                2. **Pattern Matching**: It compares these patterns to what it has learned before
                3. **Classification**: It makes a prediction about what's in the image
                
                This is a simplified simulation of how real computer vision systems work!
                """)
                
                # Unlock achievement if multiple images analyzed
                if len(image_experiments) >= 3:
                    unlock_achievement("computer_vision_explorer")
            else:
                st.info("Click 'Analyze Image' to see how AI processes the image!")
        else:
            st.info("Click 'Analyze Image' to see how AI processes the image!")

def display_text_generation_experiment():
    """Display a text generation experiment"""
    st.markdown("### ✍️ Text Generation Experiment")
    st.markdown("""
    Discover how AI can write text! This simulation shows how AI generates text based on what you tell it.
    """)
    
    # Story generation section
    st.markdown("#### Create a Story with AI")
    
    # Topic selection
    topic_options = [
        "Space Adventure", 
        "Magical Forest", 
        "Underwater Kingdom", 
        "Robot Friends", 
        "Time Travel"
    ]
    selected_topic = st.selectbox("Choose a story topic:", topic_options)
    
    # Character selection
    character_options = [
        "Kid Adventurer", 
        "Friendly Robot", 
        "Curious Alien", 
        "Magical Animal", 
        "Brave Scientist"
    ]
    selected_character = st.selectbox("Choose a main character:", character_options)
    
    # Length selection
    story_length = st.select_slider(
        "Story length:",
        options=["Short", "Medium", "Long"]
    )
    
    # Generate button
    if st.button("Generate Story", type="primary"):
        with st.spinner("AI creating your story..."):
            # Simulate processing time
            time.sleep(2)
            
            # Update experiment progress
            if "experiments_completed" not in st.session_state:
                st.session_state["experiments_completed"] = []
            
            experiment_id = f"text_generation_{selected_topic.lower().replace(' ', '_')}"
            if experiment_id not in st.session_state["experiments_completed"]:
                st.session_state["experiments_completed"].append(experiment_id)
                update_progress(0.05)
            
            # Generate a story based on selections
            story = generate_story(selected_topic, selected_character, story_length)
            
            # Display the story
            st.markdown(f"""
            <div style="background-color: white; 
                        border-radius: 15px; 
                        padding: 25px; 
                        margin: 20px 0;
                        border: 1px solid #e0e0e0;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h3 style="color: #4287f5; margin-top: 0; margin-bottom: 15px;">
                    {get_story_title(selected_topic, selected_character)}
                </h3>
                <div style="line-height: 1.6; color: #333;">
                    {story}
                </div>
                <div style="margin-top: 20px; font-style: italic; color: #666; font-size: 14px; text-align: right;">
                    - Story created by AI
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # Show explanation of the process
            st.markdown("#### How It Works")
            st.markdown("""
            1. **Input Processing**: The AI takes your choices (topic, character, length)
            2. **Pattern Recognition**: It finds patterns in stories it has learned from
            3. **Text Generation**: It creates new text following these patterns
            
            Real AI text generators like GPT-3 and GPT-4 work on similar principles, but are much more sophisticated!
            """)
            
            # Unlock achievement if multiple stories generated
            text_experiments = [exp for exp in st.session_state["experiments_completed"] if exp.startswith("text_generation_")]
            if len(text_experiments) >= 3:
                unlock_achievement("creative_writer")

def generate_story(topic, character, length):
    """Generate a story based on the selected options"""
    # Simplified story generation - in a real app, this could use an actual AI model
    stories = {
        "Space Adventure": {
            "Kid Adventurer": "Once upon a time, there was a brave young explorer named Alex who dreamed of visiting the stars. One day, while stargazing from the backyard, Alex noticed a strange glowing object falling from the sky. It wasn't a shooting star—it was a small spacecraft! As Alex approached, the door opened with a gentle hiss, revealing a map of the galaxy with one special star highlighted. It was an invitation to an adventure beyond imagination.",
            "Friendly Robot": "B33P was a maintenance robot on Space Station Alpha who had always been curious about the vast universe outside. One day, while fixing a viewing port, B33P noticed an unusual asteroid drifting toward the station. Using quick thinking and clever engineering, B33P modified an old probe to intercept the asteroid. Inside was a mysterious crystal that glowed with knowledge of distant galaxies. The robot knew this discovery would change everything.",
            "Curious Alien": "Zorb was a young alien from the planet Nexus who had a passion for studying other worlds. When Zorb's research vessel encountered a strange anomaly near Earth, curiosity took over. The anomaly turned out to be a wormhole connecting different parts of the galaxy! Excited by this discovery, Zorb navigated through the wormhole and found a magnificent space highway built by an ancient civilization. This would be Zorb's greatest discovery yet!",
            "Magical Animal": "Stella was a cosmic space cat with fur that sparkled like stars. She could leap between asteroids and communicate with space creatures of all kinds. When a shower of shooting stars began traveling in the wrong direction, Stella knew something was wrong. Following the reversed stars, she discovered a lonely comet who was pulling the stars toward it for company. Stella taught the comet that friendship couldn't be forced but offered to be its first friend instead.",
            "Brave Scientist": "Dr. Maya was the youngest astronomer at the Global Space Agency and had just detected a signal no one else believed existed. Determined to prove her discovery, she borrowed a small research vessel and followed the signal to the edge of our solar system. There, hidden in Saturn's rings, was an ancient monitoring station left by visitors from another galaxy. Dr. Maya's discovery would open a new chapter in human understanding of the universe."
        },
        "Magical Forest": {
            "Kid Adventurer": "Jamie was known in the village for being too curious for their own good. When other children avoided the forest at the edge of town, Jamie was drawn to it. One autumn day, following a trail of unusually bright mushrooms, Jamie discovered an entrance to a hidden part of the forest where the trees whispered secrets and flowers changed colors with emotions. A tiny fox with emerald eyes approached Jamie and spoke: 'We've been waiting for someone who still believes in magic.'",
            "Friendly Robot": "LEAF-E was a small robot designed to catalog plant species. During a routine forest expedition, a sudden thunderstorm damaged its navigation system, causing LEAF-E to wander into an uncharted area of the ancient forest. There, the trees seemed to move, and the flowers glowed in the darkness. Most surprising of all, the plants responded to LEAF-E's presence, reaching out with vines and branches to repair the robot's damaged systems with an energy unlike anything in its database.",
            "Curious Alien": "Myx came from a desert planet and had never seen so much green in one place. The alien explorer had crash-landed in the heart of Earth's most magical forest and was amazed by the diversity of life. While trying to repair the ship, Myx discovered that the trees were connected through their roots, sharing a collective wisdom. The forest was actually one vast, ancient organism, and it was willing to help the stranded visitor—for a promise to share stories of the stars.",
            "Magical Animal": "Echo was a shape-shifting fox with the ability to absorb and reflect the magical properties of anything in the forest. When a mysterious blight began turning parts of the magical forest to stone, Echo set out to find the source. The journey led to a cursed crystal deep underground that was draining the forest's magic. Using the collected magic from healthy parts of the forest, Echo transformed the crystal from an object of destruction to one of renewal.",
            "Brave Scientist": "Professor Lin had spent years studying rare plant species, but nothing prepared her for what she found in the forgotten valley. Every plant seemed to respond to thoughts and emotions, creating a harmonious ecosystem unlike anything science had documented. As she respectfully collected samples, the forest began to reveal its secrets—it was an ancient experiment by early human druids who had discovered how to blend consciousness with plant life, creating a sanctuary of living thought."
        }
    }
    
    # Get the story for the selected topic and character
    base_story = stories.get(topic, {}).get(character, "Once upon a time...")
    
    # Adjust length as requested
    if length == "Short":
        # Return just the first two sentences
        sentences = base_story.split('.')
        if len(sentences) > 2:
            return '. '.join(sentences[:2]) + '.'
        return base_story
    elif length == "Medium":
        # Return the base story
        return base_story
    else:  # Long
        # Add more content to the base story
        additional_content = " The adventure was just beginning, and many more discoveries awaited. With each step forward, new mysteries revealed themselves, promising an exciting journey ahead. The world was full of wonders waiting to be explored, and this was only the first chapter of an epic tale."
        return base_story + additional_content

def get_story_title(topic, character):
    """Generate a catchy title for the story"""
    titles = {
        "Space Adventure": {
            "Kid Adventurer": "The Cosmic Explorer's Invitation",
            "Friendly Robot": "B33P and the Stellar Crystal",
            "Curious Alien": "Zorb's Wormhole Discovery",
            "Magical Animal": "Stella and the Lonely Comet",
            "Brave Scientist": "Dr. Maya's Signal from the Stars"
        },
        "Magical Forest": {
            "Kid Adventurer": "Jamie and the Whispering Woods",
            "Friendly Robot": "LEAF-E's Enchanted Malfunction",
            "Curious Alien": "Myx and the Living Forest",
            "Magical Animal": "Echo's Quest Against the Stone Blight",
            "Brave Scientist": "Professor Lin and the Thinking Plants"
        },
        "Underwater Kingdom": {
            "Kid Adventurer": "The Secret Beneath the Waves",
            "Friendly Robot": "BUBBLE: The Waterproof Wonder",
            "Curious Alien": "First Contact in the Deep Blue",
            "Magical Animal": "Marina and the Coral Crown",
            "Brave Scientist": "Dr. Ocean's Atlantean Discovery"
        },
        "Robot Friends": {
            "Kid Adventurer": "My Best Friend is Programmed for Fun",
            "Friendly Robot": "The Robot Who Learned to Feel",
            "Curious Alien": "Strange Machines of Planet Earth",
            "Magical Animal": "Whiskers and Gears: An Unlikely Friendship",
            "Brave Scientist": "The Emotional Algorithm Breakthrough"
        },
        "Time Travel": {
            "Kid Adventurer": "Yesterday's Tomorrow: A Time Hopper's Tale",
            "Friendly Robot": "Clockwork: The Time-Jumping Android",
            "Curious Alien": "Studying Earth Across Millennia",
            "Magical Animal": "The Fox Who Leapt Through Time",
            "Brave Scientist": "The Temporal Paradox Solution"
        }
    }
    
    # Return the title for the selected topic and character, or a default title
    return titles.get(topic, {}).get(character, "An Amazing Adventure")

def display_voice_sound_experiment():
    """Display a voice and sound AI experiment"""
    st.markdown("### 🔊 Voice & Sound Experiment")
    st.markdown("""
    Explore how AI can understand and create sounds! This simulation shows a simplified version
    of how voice assistants and sound recognition systems work.
    """)
    
    # Create tabs for different sound experiments
    sound_tab1, sound_tab2 = st.tabs(["Voice Recognition", "Sound Classification"])
    
    # Voice Recognition Tab
    with sound_tab1:
        st.markdown("#### How AI Understands Your Voice")
        
        # Simulated voice command input
        voice_commands = [
            "What's the weather today?",
            "Play my favorite song",
            "Set an alarm for 7 AM",
            "Tell me a fun fact about AI",
            "How do computers learn?"
        ]
        
        selected_command = st.selectbox(
            "Choose a voice command to simulate:",
            voice_commands
        )
        
        if st.button("Simulate Voice Command", type="primary"):
            with st.spinner("Processing voice..."):
                # Simulate processing time
                time.sleep(1.5)
                
                # Update experiment progress
                if "experiments_completed" not in st.session_state:
                    st.session_state["experiments_completed"] = []
                
                experiment_id = "voice_recognition"
                if experiment_id not in st.session_state["experiments_completed"]:
                    st.session_state["experiments_completed"].append(experiment_id)
                    update_progress(0.05)
                
                # Show the voice recognition process
                st.markdown(f"""
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin: 20px 0;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 1: Sound Wave Analysis</h4>
                    <div style="height: 60px; 
                                background-color: #f5f5f5;
                                margin-bottom: 15px;
                                border-radius: 5px;
                                position: relative;
                                overflow: hidden;">
                        <div style="position: absolute;
                                    top: 50%;
                                    left: 0;
                                    width: 100%;
                                    height: 20px;
                                    background: linear-gradient(90deg, 
                                                               rgba(66, 135, 245, 0.8) 0%, 
                                                               rgba(66, 135, 245, 0.2) 20%, 
                                                               rgba(66, 135, 245, 0.8) 40%,
                                                               rgba(66, 135, 245, 0.4) 60%,
                                                               rgba(66, 135, 245, 0.6) 80%,
                                                               rgba(66, 135, 245, 0.3) 100%);
                                    transform: translateY(-50%);">
                        </div>
                    </div>
                </div>
                
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin: 20px 0;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 2: Speech-to-Text Conversion</h4>
                    <div style="font-family: monospace; 
                                padding: 10px; 
                                background-color: #f5f5f5; 
                                border-radius: 5px; 
                                font-size: 16px;
                                color: #333;">
                        "{selected_command}"
                    </div>
                </div>
                
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin: 20px 0;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 3: Understanding Intent</h4>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Weather Query</span>
                            <span>{95 if "weather" in selected_command.lower() else 5}%</span>
                        </div>
                        <div style="height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if "weather" in selected_command.lower() else 5}%; background-color: #4CAF50;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Media Request</span>
                            <span>{90 if "play" in selected_command.lower() else 10}%</span>
                        </div>
                        <div style="height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: {90 if "play" in selected_command.lower() else 10}%; background-color: #2196F3;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Alarm/Reminder</span>
                            <span>{95 if "alarm" in selected_command.lower() else 5}%</span>
                        </div>
                        <div style="height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if "alarm" in selected_command.lower() else 5}%; background-color: #FF9800;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>Information Query</span>
                            <span>{90 if "fact" in selected_command.lower() or "how" in selected_command.lower() else 20}%</span>
                        </div>
                        <div style="height: 8px; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
                            <div style="height: 100%; width: {90 if "fact" in selected_command.lower() or "how" in selected_command.lower() else 20}%; background-color: #9C27B0;"></div>
                        </div>
                    </div>
                </div>
                
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin: 20px 0;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Step 4: Response Generation</h4>
                    <div style="background-color: #f0f7ff; 
                                border-left: 4px solid #4287f5; 
                                padding: 15px; 
                                border-radius: 4px;">
                        {get_voice_assistant_response(selected_command)}
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                # Show explanation
                st.markdown("#### How Voice AI Works")
                st.markdown("""
                1. **Sound Analysis**: The AI converts your voice into a digital waveform
                2. **Speech Recognition**: It translates this waveform into text
                3. **Intent Recognition**: It figures out what you're asking for
                4. **Response Generation**: It creates an appropriate answer
                
                Voice assistants like Siri, Alexa, and Google Assistant use much more sophisticated versions of these steps!
                """)
    
    # Sound Classification Tab
    with sound_tab2:
        st.markdown("#### How AI Identifies Sounds")
        
        # Sound selection
        sound_options = {
            "Dog barking": "🐕 Woof! Woof!",
            "Car horn": "🚗 Beep! Beep!",
            "Rain falling": "☔ Pitter-patter...",
            "Piano music": "🎹 ♪♫♪♫",
            "Door bell": "🚪 Ding-dong!"
        }
        
        selected_sound = st.selectbox(
            "Choose a sound to identify:", 
            list(sound_options.keys())
        )
        
        # Display the selected sound (text representation)
        st.markdown(f"""
        <div style="background-color: #f5f5f5; 
                    border-radius: 10px; 
                    padding: 20px; 
                    margin: 20px 0;
                    text-align: center;
                    font-size: 24px;">
            {sound_options[selected_sound]}
        </div>
        """, unsafe_allow_html=True)
        
        if st.button("Identify Sound", type="primary"):
            with st.spinner("Analyzing sound..."):
                # Simulate processing time
                time.sleep(1.5)
                
                # Update experiment progress
                if "experiments_completed" not in st.session_state:
                    st.session_state["experiments_completed"] = []
                
                experiment_id = "sound_classification"
                if experiment_id not in st.session_state["experiments_completed"]:
                    st.session_state["experiments_completed"].append(experiment_id)
                    update_progress(0.05)
                
                # Show the sound classification process
                st.markdown(f"""
                <div style="background-color: white; 
                            border-radius: 10px; 
                            padding: 20px; 
                            margin: 20px 0;
                            border: 1px solid #e0e0e0;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin-top: 0;">Sound Classification Results</h4>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span>🐕 Dog barking</span>
                            <span style="font-weight: {700 if selected_sound == 'Dog barking' else 400};">{95 if selected_sound == 'Dog barking' else random.randint(5, 20)}%</span>
                        </div>
                        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if selected_sound == 'Dog barking' else random.randint(5, 20)}%; background-color: #4CAF50;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span>🚗 Car horn</span>
                            <span style="font-weight: {700 if selected_sound == 'Car horn' else 400};">{95 if selected_sound == 'Car horn' else random.randint(5, 20)}%</span>
                        </div>
                        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if selected_sound == 'Car horn' else random.randint(5, 20)}%; background-color: #2196F3;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span>☔ Rain falling</span>
                            <span style="font-weight: {700 if selected_sound == 'Rain falling' else 400};">{95 if selected_sound == 'Rain falling' else random.randint(5, 20)}%</span>
                        </div>
                        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if selected_sound == 'Rain falling' else random.randint(5, 20)}%; background-color: #FF9800;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span>🎹 Piano music</span>
                            <span style="font-weight: {700 if selected_sound == 'Piano music' else 400};">{95 if selected_sound == 'Piano music' else random.randint(5, 20)}%</span>
                        </div>
                        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if selected_sound == 'Piano music' else random.randint(5, 20)}%; background-color: #9C27B0;"></div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                            <span>🚪 Door bell</span>
                            <span style="font-weight: {700 if selected_sound == 'Door bell' else 400};">{95 if selected_sound == 'Door bell' else random.randint(5, 20)}%</span>
                        </div>
                        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
                            <div style="height: 100%; width: {95 if selected_sound == 'Door bell' else random.randint(5, 20)}%; background-color: #E91E63;"></div>
                        </div>
                    </div>
                </div>
                
                <div style="background-color: rgba(76, 175, 80, 0.1); 
                            border-radius: 10px; 
                            padding: 20px; 
                            border: 1px solid #4CAF50;
                            margin-bottom: 20px;
                            text-align: center;">
                    <h3 style="margin-top: 0; color: #4CAF50;">
                        Identified Sound: {selected_sound}
                    </h3>
                    <p style="margin-bottom: 0;">95% confidence</p>
                </div>
                """, unsafe_allow_html=True)
                
                # Show explanation
                st.markdown("#### How Sound Classification Works")
                st.markdown("""
                1. **Audio Sampling**: The AI analyzes the pattern of sound waves
                2. **Feature Extraction**: It identifies unique characteristics of the sound
                3. **Pattern Matching**: It compares these features to known sound categories
                4. **Classification**: It determines the most likely type of sound
                
                This technology is used in smart home devices, security systems, and accessibility tools!
                """)

def get_voice_assistant_response(command):
    """Generate a response for the simulated voice assistant"""
    command = command.lower()
    
    if "weather" in command:
        return "Today will be sunny with a high of 75°F. There's a 10% chance of rain in the afternoon."
    elif "play" in command:
        return "Playing your favorite songs on the Music app."
    elif "alarm" in command:
        return "Alarm set for 7:00 AM tomorrow."
    elif "fact" in command and "ai" in command:
        return "Here's a fun fact about AI: The term 'artificial intelligence' was first coined in 1956 at a conference at Dartmouth College!"
    elif "how" in command and "computer" in command:
        return "Computers learn through a process called machine learning, where they analyze patterns in data to make predictions or decisions. It's like how you learn from examples!"
    else:
        return "I'm here to help! What else would you like to know about?"

def display_pattern_finding_experiment():
    """Display a pattern finding AI experiment"""
    st.markdown("### 🔍 Pattern Finding Experiment")
    st.markdown("""
    See how AI finds patterns in data! This simulation demonstrates a core part of machine learning.
    """)
    
    st.markdown("#### Predict the Next Number")
    
    # Create different pattern options
    patterns = {
        "Simple Addition": [2, 4, 6, 8, 10, '?'],
        "Squares": [1, 4, 9, 16, 25, '?'],
        "Fibonacci": [1, 1, 2, 3, 5, '?'],
        "Powers of 2": [2, 4, 8, 16, 32, '?'],
        "Alternating +1/-2": [5, 6, 4, 5, 3, '?']
    }
    
    # Select a pattern
    selected_pattern_name = st.selectbox(
        "Choose a number pattern:",
        list(patterns.keys())
    )
    
    selected_pattern = patterns[selected_pattern_name]
    
    # Display the pattern
    st.markdown(f"""
    <div style="display: flex; justify-content: space-around; margin: 30px 0;">
        {''.join([f'<div style="width: 50px; height: 50px; background-color: {"#f5f5f5" if i < 5 else "#e0e0e0"}; border-radius: 10px; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: bold;">{selected_pattern[i]}</div>' for i in range(6)])}
    </div>
    """, unsafe_allow_html=True)
    
    # Input for prediction
    user_prediction = st.number_input("What's the next number in the pattern?", min_value=0, max_value=100, step=1)
    
    if st.button("Check My Prediction", type="primary"):
        # Calculate the correct next number
        correct_answer = get_next_number(selected_pattern_name)
        
        # Update experiment progress
        if "experiments_completed" not in st.session_state:
            st.session_state["experiments_completed"] = []
        
        experiment_id = f"pattern_finding_{selected_pattern_name.lower().replace(' ', '_')}"
        if experiment_id not in st.session_state["experiments_completed"]:
            st.session_state["experiments_completed"].append(experiment_id)
            update_progress(0.05)
        
        # Check if prediction is correct
        if user_prediction == correct_answer:
            st.success(f"Correct! {correct_answer} is the next number in the pattern.")
            
            # Display AI explanation
            st.markdown(f"""
            <div style="background-color: white; 
                        border-radius: 10px; 
                        padding: 20px; 
                        margin: 20px 0;
                        border: 1px solid #e0e0e0;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h4 style="margin-top: 0;">AI Pattern Analysis</h4>
                <p>{get_pattern_explanation(selected_pattern_name)}</p>
                <div style="margin-top: 15px;">
                    <div style="font-weight: bold; margin-bottom: 5px;">Pattern Confidence:</div>
                    <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden; margin-bottom: 5px;">
                        <div style="height: 100%; width: 95%; background-color: #4CAF50;"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 12px;">
                        <span>0%</span>
                        <span>95%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            st.markdown("#### How Pattern Recognition Works")
            st.markdown("""
            1. **Data Analysis**: The AI looks at the given sequence of numbers
            2. **Pattern Identification**: It tests different mathematical relationships
            3. **Model Selection**: It chooses the most likely pattern
            4. **Prediction**: It uses the pattern to predict the next value
            
            This is similar to how machine learning algorithms find patterns in much more complex data!
            """)
            
            # Unlock achievement if multiple patterns solved
            pattern_experiments = [exp for exp in st.session_state["experiments_completed"] if exp.startswith("pattern_finding_")]
            if len(pattern_experiments) >= 3:
                unlock_achievement("pattern_master")
        else:
            st.error(f"Not quite! The correct answer is {correct_answer}.")
            st.markdown(f"**Hint:** Look carefully at how each number relates to the previous ones.")

def get_next_number(pattern_name):
    """Calculate the next number in the selected pattern"""
    if pattern_name == "Simple Addition":
        return 12  # 10 + 2
    elif pattern_name == "Squares":
        return 36  # 6^2
    elif pattern_name == "Fibonacci":
        return 8   # 3 + 5
    elif pattern_name == "Powers of 2":
        return 64  # 32 * 2
    elif pattern_name == "Alternating +1/-2":
        return 4   # 3 + 1
    return 0

def get_pattern_explanation(pattern_name):
    """Get an explanation for the selected pattern"""
    if pattern_name == "Simple Addition":
        return "This is an arithmetic sequence where each number increases by 2. Starting with 2, we add 2 each time: 2, 4, 6, 8, 10, and the next number is 12."
    elif pattern_name == "Squares":
        return "These are perfect squares! Each number is the square of its position: 1², 2², 3², 4², 5², and the next number is 6² = 36."
    elif pattern_name == "Fibonacci":
        return "This is the famous Fibonacci sequence where each number is the sum of the two before it. After 1, 1, 2, 3, 5, the next number is 3 + 5 = 8."
    elif pattern_name == "Powers of 2":
        return "Each number is doubling - these are powers of 2: 2¹, 2², 2³, 2⁴, 2⁵, and the next is 2⁶ = 64."
    elif pattern_name == "Alternating +1/-2":
        return "This pattern alternates between adding 1 and subtracting 2: 5, 5+1=6, 6-2=4, 4+1=5, 5-2=3, and the next step is to add 1, so 3+1=4."
    return "Pattern analysis complete."

if __name__ == "__main__":
    main()