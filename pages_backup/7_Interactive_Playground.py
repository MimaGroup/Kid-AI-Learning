import streamlit as st
import time
import random
from components.animated_text import animated_text
from components.reward_system import award_points, award_badge, initialize_rewards, display_rewards
from components.age_adaptive_content import display_adaptive_explanation

def interactive_playground():
    st.title("🎮 AI Interactive Playground")
    
    # Initialize reward system
    initialize_rewards()
    display_rewards()
    
    # Create tabs for different interactive elements
    tab1, tab2, tab3 = st.tabs(["Teach AI 🧠", "Image Recognition 👁️", "Voice Commands 🎤"])
    
    with tab1:
        st.subheader("Teach the AI to recognize patterns")
        
        # Age-appropriate explanations
        display_adaptive_explanation(
            "Teaching AI",
            "AI is like a puppy that learns tricks! Let's teach it to recognize patterns.",
            "AI learns from examples, just like you do. Let's show it some patterns and see if it can learn.",
            "Machine learning algorithms identify patterns in data. Let's create a simple classification task."
        )
        
        # Interactive pattern recognition game
        st.write("Choose which shapes belong to Group A and which belong to Group B:")
        
        col1, col2, col3 = st.columns(3)
        with col1:
            circle = st.checkbox("Circle ⭕")
        with col2:
            square = st.checkbox("Square 🟥")
        with col3:
            triangle = st.checkbox("Triangle 🔺")
            
        col4, col5, col6 = st.columns(3)
        with col4:
            star = st.checkbox("Star ⭐")
        with col5:
            heart = st.checkbox("Heart ❤️")
        with col6:
            diamond = st.checkbox("Diamond 💎")
        
        if st.button("Train AI", key="train_ai"):
            with st.spinner("AI is learning your pattern..."):
                progress = st.progress(0)
                for i in range(100):
                    progress.progress(i + 1)
                    time.sleep(0.02)
            
            # Check if user created a clear pattern
            group_a = []
            if circle: group_a.append("Circle ⭕")
            if square: group_a.append("Square 🟥")
            if triangle: group_a.append("Triangle 🔺")
            if star: group_a.append("Star ⭐")
            if heart: group_a.append("Heart ❤️")
            if diamond: group_a.append("Diamond 💎")
            
            if len(group_a) == 0 or len(group_a) == 6:
                st.error("The AI needs some shapes in Group A and some in Group B to learn a pattern!")
            else:
                st.success("The AI has learned your pattern!")
                
                # Test the AI
                st.subheader("Let's test the AI!")
                test_shape = random.choice(["Circle ⭕", "Square 🟥", "Triangle 🔺", 
                                           "Star ⭐", "Heart ❤️", "Diamond 💎"])
                
                st.write(f"Which group does {test_shape} belong to?")
                
                col1, col2 = st.columns(2)
                with col1:
                    if st.button("Group A"):
                        if (test_shape in group_a and len(group_a) <= 3) or \
                           (test_shape not in group_a and len(group_a) > 3):
                            st.success("Correct! The AI agrees with you!")
                            award_points(10, "for teaching AI correctly")
                            if 'teacher' not in st.session_state.badges:
                                award_badge("👨‍🏫", "AI Teacher")
                        else:
                            st.error("The AI predicted differently based on your training!")
                
                with col2:
                    if st.button("Group B"):
                        if (test_shape not in group_a and len(group_a) <= 3) or \
                           (test_shape in group_a and len(group_a) > 3):
                            st.success("Correct! The AI agrees with you!")
                            award_points(10, "for teaching AI correctly")
                            if 'teacher' not in st.session_state.badges:
                                award_badge("👨‍🏫", "AI Teacher")
                        else:
                            st.error("The AI predicted differently based on your training!")
    
    with tab2:
        st.subheader("Image Recognition Demo")
        
        # Age-appropriate explanations
        display_adaptive_explanation(
            "Image Recognition",
            "AI can see pictures and tell what's in them, like magic!",
            "AI can recognize objects in images by looking for patterns it has learned before.",
            "Computer vision uses convolutional neural networks to identify features in images."
        )
        
        # Simple image recognition demo
        st.write("What would you like the AI to recognize?")
        
        image_options = ["Cat 🐱", "Dog 🐶", "Bird 🐦", "Fish 🐠"]
        selected_image = st.selectbox("Choose an object:", image_options)
        
        if st.button("Recognize Image"):
            with st.spinner("AI is looking at the image..."):
                time.sleep(2)
            
            st.success(f"I see a {selected_image}!")
            st.write("Here's how confident I am:")
            
            # Show fake confidence scores
            confidences = {}
            selected_index = image_options.index(selected_image)
            
            for i, option in enumerate(image_options):
                if i == selected_index:
                    confidences[option] = random.uniform(0.85, 0.98)
                else:
                    confidences[option] = random.uniform(0.01, 0.15)
            
            # Sort by confidence
            sorted_confidences = {k: v for k, v in sorted(confidences.items(), 
                                                         key=lambda item: item[1], 
                                                         reverse=True)}
            
            # Display as progress bars
            for option, confidence in sorted_confidences.items():
                st.write(f"{option}: {confidence:.2%}")
                st.progress(confidence)
            
            award_points(5, "for using image recognition")
    
    with tab3:
        st.subheader("Voice Command Simulator")
        
        # Age-appropriate explanations
        display_adaptive_explanation(
            "Voice Recognition",
            "AI can listen to your voice and understand what you say!",
            "AI can convert speech to text and understand commands by recognizing patterns in sound.",
            "Speech recognition uses recurrent neural networks to process sequential audio data."
        )
        
        # Voice command simulator
        st.write("What would you like to say to the AI assistant?")
        
        command_options = [
            "What's the weather today?",
            "Tell me a joke",
            "Play my favorite song",
            "Set a timer for 5 minutes"
        ]
        
        selected_command = st.selectbox("Choose a command:", command_options)
        
        if st.button("Speak to AI"):
            # Simulate voice processing
            with st.spinner("Listening..."):
                time.sleep(1)
            
            animated_text(f"I heard: \"{selected_command}\"")
            
            time.sleep(0.5)
            
            # Different responses based on command
            if selected_command == "What's the weather today?":
                animated_text("The weather today is sunny with a high of 75°F!")
            elif selected_command == "Tell me a joke":
                animated_text("Why don't scientists trust atoms? Because they make up everything! 😄")
            elif selected_command == "Play my favorite song":
                animated_text("🎵 Playing your favorite song now... 🎵")
            elif selected_command == "Set a timer for 5 minutes":
                animated_text("Timer set for 5 minutes! ⏲️")
            
            award_points(5, "for using voice commands")
            
            # Award badge after using all features
            if all(tab in st.session_state.get('used_tabs', []) for tab in ['tab1', 'tab2']):
                if 'explorer' not in st.session_state.badges:
                    award_badge("🔍", "AI Explorer")
        
        # Track which tabs the user has used
        if 'used_tabs' not in st.session_state:
            st.session_state.used_tabs = []
        if 'tab3' not in st.session_state.used_tabs:
            st.session_state.used_tabs.append('tab3')

if __name__ == "__main__":
    interactive_playground()
