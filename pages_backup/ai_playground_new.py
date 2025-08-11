import streamlit as st
import random

def show_ai_playground():
    st.title("🤖 AI Playground")
    st.write("Experiment with AI concepts in a fun, interactive way!")
    
    # AI experiment tabs
    tab1, tab2, tab3, tab4 = st.tabs(["🧠 Train AI", "🎨 AI Artist", "🔮 AI Predictor", "💬 Chat with AI"])
    
    with tab1:
        show_train_ai()
    
    with tab2:
        show_ai_artist()
    
    with tab3:
        show_ai_predictor()
    
    with tab4:
        show_chat_ai()

def show_train_ai():
    st.subheader("🧠 Train Your AI")
    st.write("Teach an AI to recognize patterns!")
    
    st.info("🎯 **Concept:** This simulates how AI learns from examples")
    
    # Simple pattern recognition game
    st.write("**Teach AI to recognize animals:**")
    
    animals = ["🐶 Dog", "🐱 Cat", "🐦 Bird", "🐟 Fish"]
    
    if 'ai_training_data' not in st.session_state:
        st.session_state.ai_training_data = []
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.write("**Training Phase:**")
        selected_animal = st.selectbox("Choose an animal:", animals)
        
        # Simulate features
        size = st.slider("Size (1-10):", 1, 10, 5)
        legs = st.selectbox("Number of legs:", [0, 2, 4])
        can_fly = st.checkbox("Can fly?")
        lives_in_water = st.checkbox("Lives in water?")
        
        if st.button("Add Training Example"):
            example = {
                "animal": selected_animal,
                "size": size,
                "legs": legs,
                "can_fly": can_fly,
                "lives_in_water": lives_in_water
            }
            st.session_state.ai_training_data.append(example)
            st.success(f"Added {selected_animal} to training data!")
    
    with col2:
        st.write("**AI's Knowledge:**")
        if st.session_state.ai_training_data:
            st.write(f"AI has learned about {len(st.session_state.ai_training_data)} animals!")
            
            for example in st.session_state.ai_training_data[-3:]:  # Show last 3
                st.write(f"• {example['animal']}: Size {example['size']}, {example['legs']} legs")
        else:
            st.write("AI hasn't learned anything yet. Add some examples!")
    
    # Test the AI
    if len(st.session_state.ai_training_data) >= 2:
        st.write("**Test Your AI:**")
        test_size = st.slider("Test animal size:", 1, 10, 5, key="test_size")
        test_legs = st.selectbox("Test animal legs:", [0, 2, 4], key="test_legs")
        test_fly = st.checkbox("Test animal can fly?", key="test_fly")
        test_water = st.checkbox("Test animal lives in water?", key="test_water")
        
        if st.button("What animal is this?"):
            # Simple prediction logic
            best_match = None
            best_score = -1
            
            for example in st.session_state.ai_training_data:
                score = 0
                if abs(example['size'] - test_size) <= 2:
                    score += 1
                if example['legs'] == test_legs:
                    score += 2
                if example['can_fly'] == test_fly:
                    score += 1
                if example['lives_in_water'] == test_water:
                    score += 1
                
                if score > best_score:
                    best_score = score
                    best_match = example['animal']
            
            if best_match:
                st.success(f"🤖 AI thinks this is a {best_match}!")
                st.write(f"Confidence: {best_score}/5")
            else:
                st.warning("🤖 AI is not sure. Need more training data!")

def show_ai_artist():
    st.subheader("🎨 AI Artist")
    st.write("Create art with AI-inspired randomness!")
    
    st.info("🎯 **Concept:** AI can generate creative content by combining patterns")
    
    art_style = st.selectbox("Choose art style:", [
        "Abstract Shapes",
        "Color Patterns", 
        "ASCII Art",
        "Emoji Art"
    ])
    
    if art_style == "Abstract Shapes":
        if st.button("Generate Abstract Art"):
            # Create simple ASCII abstract art
            shapes = ["●", "■", "▲", "♦", "★"]
            art = ""
            for _ in range(5):
                line = ""
                for _ in range(10):
                    if random.random() > 0.7:
                        line += random.choice(shapes) + " "
                    else:
                        line += "  "
                art += line + "\n"
            
            st.code(art)
            st.success("🎨 AI-generated abstract art!")
    
    elif art_style == "Emoji Art":
        if st.button("Generate Emoji Art"):
            emojis = ["🌟", "🌙", "☀️", "🌈", "⭐", "💫", "🔥", "💎"]
            art = ""
            for _ in range(4):
                line = ""
                for _ in range(8):
                    if random.random() > 0.6:
                        line += random.choice(emojis)
                    else:
                        line += "  "
                art += line + "\n"
            
            st.text(art)
            st.success("🎨 AI-generated emoji art!")

def show_ai_predictor():
    st.subheader("🔮 AI Predictor")
    st.write("See how AI makes predictions!")
    
    st.info("🎯 **Concept:** AI uses patterns in data to make predictions")
    
    prediction_type = st.selectbox("What should AI predict?", [
        "Weather Tomorrow",
        "Your Mood",
        "Lucky Number",
        "Best Activity"
    ])
    
    if prediction_type == "Weather Tomorrow":
        today_weather = st.selectbox("Today's weather:", ["☀️ Sunny", "🌧️ Rainy", "☁️ Cloudy", "❄️ Snowy"])
        temperature = st.slider("Today's temperature:", -10, 40, 20)
        
        if st.button("Predict Tomorrow's Weather"):
            # Simple prediction logic
            if "Sunny" in today_weather and temperature > 25:
                prediction = "☀️ Sunny and warm!"
            elif "Rainy" in today_weather:
                prediction = "🌦️ Partly cloudy (rain might continue)"
            elif temperature < 5:
                prediction = "❄️ Cold, maybe snow!"
            else:
                prediction = "☁️ Probably cloudy"
            
            st.success(f"🔮 AI predicts: {prediction}")
            st.write("*Note: This is a simple simulation. Real weather AI uses much more data!*")
    
    elif prediction_type == "Your Mood":
        activities = st.multiselect("What did you do today?", [
            "Played games", "Studied", "Exercised", "Watched TV", 
            "Spent time with friends", "Read a book", "Listened to music"
        ])
        
        if st.button("Predict Your Mood") and activities:
            positive_activities = ["Played games", "Exercised", "Spent time with friends", "Listened to music"]
            mood_score = sum(1 for activity in activities if activity in positive_activities)
            
            if mood_score >= 3:
                mood = "😄 Very Happy!"
            elif mood_score >= 2:
                mood = "😊 Happy!"
            elif mood_score >= 1:
                mood = "🙂 Content"
            else:
                mood = "😐 Neutral"
            
            st.success(f"🔮 AI predicts your mood: {mood}")

def show_chat_ai():
    st.subheader("💬 Chat with AI")
    st.write("Have a simple conversation with a simulated AI!")
    
    st.info("🎯 **Concept:** AI can understand and respond to human language")
    
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    
    # Simple chatbot responses
    responses = {
        "hello": "Hello! I'm a simple AI. How are you today?",
        "how are you": "I'm doing great! I love learning new things. What about you?",
        "what is ai": "AI stands for Artificial Intelligence. It's when computers can think and learn like humans!",
        "bye": "Goodbye! It was nice chatting with you!",
        "default": "That's interesting! Can you tell me more? (I'm still learning!)"
    }
    
    user_input = st.text_input("Type your message:", key="chat_input")
    
    if st.button("Send") and user_input:
        # Add user message
        st.session_state.chat_history.append(("You", user_input))
        
        # Generate AI response
        user_lower = user_input.lower()
        ai_response = responses.get("default", responses["default"])
        
        for key in responses:
            if key in user_lower and key != "default":
                ai_response = responses[key]
                break
        
        st.session_state.chat_history.append(("AI", ai_response))
    
    # Display chat history
    if st.session_state.chat_history:
        st.write("**Chat History:**")
        for sender, message in st.session_state.chat_history[-6:]:  # Show last 6 messages
            if sender == "You":
                st.write(f"**You:** {message}")
            else:
                st.write(f"**🤖 AI:** {message}")
    
    if st.button("Clear Chat"):
        st.session_state.chat_history = []
        st.rerun()
