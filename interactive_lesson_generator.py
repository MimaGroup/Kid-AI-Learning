import streamlit as st
import random
import time
from datetime import datetime

def initialize_session_state():
    if 'activity1_completed' not in st.session_state:
        st.session_state.activity1_completed = False
    if 'activity2_completed' not in st.session_state:
        st.session_state.activity2_completed = False
    if 'activity3_completed' not in st.session_state:
        st.session_state.activity3_completed = False
    if 'activity4_completed' not in st.session_state:
        st.session_state.activity4_completed = False
    if 'activity5_completed' not in st.session_state:
        st.session_state.activity5_completed = False
    
    if 'detective_game' not in st.session_state:
        st.session_state.detective_game = {'score': 0, 'questions_asked': 0}
    if 'quiz_game' not in st.session_state:
        st.session_state.quiz_game = {'score': 0, 'current_question': 0, 'answered_current': False}
    if 'pattern_game' not in st.session_state:
        st.session_state.pattern_game = {'correct_answers': 0, 'current_pattern': 0}
    if 'art_creator' not in st.session_state:
        st.session_state.art_creator = {'creations': []}

def main():
    st.set_page_config(
        page_title="Interactive AI Kids Learning",
        page_icon="🚀",
        layout="wide"
    )
    
    st.title("🤖 Interactive AI Adventure!")
    st.caption("Learn about AI by doing, not just reading!")
    
    initialize_session_state()
    
    # Progress tracking
    total_activities = 5
    completed_activities = sum([
        st.session_state.activity1_completed,
        st.session_state.activity2_completed, 
        st.session_state.activity3_completed,
        st.session_state.activity4_completed,
        st.session_state.activity5_completed
    ])
    
    progress = st.progress(completed_activities / total_activities)
    st.write(f"🎯 **Progress: {completed_activities}/{total_activities} activities completed**")
    
    # Activity 1: AI Detective Game
    st.subheader("🎮 Activity 1: AI Detective Game")
    
    if not st.session_state.activity1_completed:
        items = [
            {"name": "Smart Speaker (Alexa)", "is_ai": True, "emoji": "🔊"},
            {"name": "Calculator", "is_ai": False, "emoji": "🧮"},
            {"name": "Netflix Recommendations", "is_ai": True, "emoji": "📺"},
            {"name": "Regular Clock", "is_ai": False, "emoji": "⏰"},
            {"name": "Google Translate", "is_ai": True, "emoji": "🌐"},
            {"name": "Flashlight", "is_ai": False, "emoji": "🔦"}
        ]
        
        if 'current_item' not in st.session_state:
            st.session_state.current_item = random.choice(items)
        
        item = st.session_state.current_item
        game = st.session_state.detective_game
        
        st.write(f"### {item['emoji']} Is this AI or Not AI?")
        st.write(f"**{item['name']}**")
        st.write(f"**Score: {game['score']}/{game['questions_asked']}** | **Question: {game['questions_asked'] + 1}/3**")
        
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🤖 This is AI!", key="ai_yes", type="primary"):
                game['questions_asked'] += 1
                if item['is_ai']:
                    st.success("✅ Correct! This uses AI!")
                    game['score'] += 1
                else:
                    st.error("❌ Not quite! This doesn't use AI.")
                
                if game['questions_asked'] < 3:
                    st.session_state.current_item = random.choice(items)
                    time.sleep(1)
                    st.rerun()
                else:
                    st.success(f"🎉 Activity 1 Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    st.balloons()
                    time.sleep(2)
                    st.rerun()
        
        with col2:
            if st.button("🚫 Not AI!", key="ai_no", type="secondary"):
                game['questions_asked'] += 1
                if not item['is_ai']:
                    st.success("✅ Correct! This doesn't use AI!")
                    game['score'] += 1
                else:
                    st.error("❌ Actually, this does use AI!")
                
                if game['questions_asked'] < 3:
                    st.session_state.current_item = random.choice(items)
                    time.sleep(1)
                    st.rerun()
                else:
                    st.success(f"🎉 Activity 1 Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    st.balloons()
                    time.sleep(2)
                    st.rerun()
    else:
        st.success("✅ **Activity 1 Completed!** You're an AI Detective!")
    
    st.divider()
    
    # Activity 2: Design Your AI Friend
    st.subheader("🎨 Activity 2: Design Your AI Friend")
    
    if st.session_state.activity1_completed and not st.session_state.activity2_completed:
        st.write("🎉 **Unlocked!** Create your own AI friend by choosing its features!")
        
        col1, col2 = st.columns(2)
        
        with col1:
            ai_name = st.text_input("🏷️ What's your AI friend's name?", value="RoboHelper", key="ai_name_input")
            ai_color = st.color_picker("🎨 Pick a color for your AI friend", "#00f900", key="ai_color_input")
            ai_shape = st.selectbox("🔷 Choose a shape:", ["Robot 🤖", "Animal 🐱", "Star ⭐", "Heart ❤️"], key="ai_shape_input")
        
        with col2:
            ai_power = st.multiselect("⚡ What powers should it have?", [
                "Help with homework 📚",
                "Tell jokes 😄", 
                "Play music 🎵",
                "Answer questions ❓",
                "Play games 🎮"
            ], key="ai_power_input")
            
            ai_personality = st.radio("😊 Personality:", ["Friendly", "Funny", "Smart", "Adventurous"], key="ai_personality_input")
        
        if st.button("✨ Create My AI Friend!", type="primary", key="create_ai_friend"):
            st.success("🎉 AI Friend Created!")
            
            st.markdown(f"""
            <div style="background-color: {ai_color}; padding: 20px; border-radius: 10px; text-align: center; color: white; margin: 10px 0;">
                <h2>{ai_shape} {ai_name}</h2>
                <p><strong>Personality:</strong> {ai_personality}</p>
                <p><strong>Powers:</strong> {', '.join(ai_power) if ai_power else 'Being awesome!'}</p>
            </div>
            """, unsafe_allow_html=True)
            
            st.session_state.ai_friend = {
                'name': ai_name,
                'color': ai_color,
                'shape': ai_shape,
                'powers': ai_power,
                'personality': ai_personality
            }
            
            st.session_state.activity2_completed = True
            st.balloons()
            time.sleep(2)
            st.rerun()
    
    elif st.session_state.activity2_completed:
        st.success("✅ **Activity 2 Completed!** Your AI friend is ready!")
        if 'ai_friend' in st.session_state:
            friend = st.session_state.ai_friend
            st.markdown(f"""
            <div style="background-color: {friend['color']}; padding: 15px; border-radius: 10px; text-align: center; color: white; margin: 10px 0;">
                <h3>{friend['shape']} {friend['name']}</h3>
                <p>{friend['personality']} personality</p>
            </div>
            """, unsafe_allow_html=True)
    
    elif not st.session_state.activity1_completed:
        st.info("🔒 Complete Activity 1 to unlock this activity!")
    
    st.divider()
    
    # Activity 3: AI Training Game
    st.subheader("🧠 Activity 3: Train Your AI")
    
    if st.session_state.activity2_completed and not st.session_state.activity3_completed:
        st.write("🎉 **Unlocked!** Help train an AI to recognize patterns!")
        
        patterns = [
            {'sequence': ['🔴', '🔵', '🔴', '🔵'], 'next': '🔴', 'name': 'Red-Blue Pattern'},
            {'sequence': ['⭐', '⭐', '🌙', '⭐', '⭐'], 'next': '🌙', 'name': 'Star-Moon Pattern'},
            {'sequence': ['🍎', '🍌', '🍎', '🍌'], 'next': '🍎', 'name': 'Apple-Banana Pattern'}
        ]
        
        game = st.session_state.pattern_game
        
        if game['current_pattern'] < len(patterns):
            current = patterns[game['current_pattern']]
            
            st.write(f"**Pattern {game['current_pattern'] + 1}/3: {current['name']}**")
            st.write("**Look at this pattern and guess what comes next:**")
            
            pattern_display = " → ".join(current['sequence']) + " → ❓"
            st.markdown(f"<h2 style='text-align: center;'>{pattern_display}</h2>", unsafe_allow_html=True)
            
            st.write(f"**Progress: {game['correct_answers']}/3 patterns solved**")
            
            options = ['🔴', '🔵', '⭐', '🌙', '🍎', '🍌']
            
            cols = st.columns(len(options))
            for i, option in enumerate(options):
                with cols[i]:
                    if st.button(option, key=f"pattern_btn_{game['current_pattern']}_{i}"):
                        if option == current['next']:
                            st.success(f"🎉 Correct! The answer was {current['next']}")
                            game['correct_answers'] += 1
                            game['current_pattern'] += 1
                            
                            if game['correct_answers'] >= 3:
                                st.success("🌟 **Activity 3 Complete!** You're an AI trainer!")
                                st.session_state.activity3_completed = True
                                st.balloons()
                            
                            time.sleep(2)
                            st.rerun()
                        else:
                            st.error(f"❌ Not quite! The answer was {current['next']}")
                            game['current_pattern'] += 1
                            time.sleep(2)
                            st.rerun()
    
    elif st.session_state.activity3_completed:
        st.success("✅ **Activity 3 Completed!** You trained the AI successfully!")
    
    elif not st.session_state.activity2_completed:
        st.info("🔒 Complete Activity 2 to unlock this activity!")
    
    st.divider()
    
    # Activity 4: AI Quiz
    st.subheader("🧩 Activity 4: AI Knowledge Quiz")
    
    if st.session_state.activity3_completed and not st.session_state.activity4_completed:
        st.write("🎉 **Unlocked!** Test your AI knowledge!")
        
        questions = [
            {
                "question": "What does AI stand for?",
                "options": ["Artificial Intelligence", "Amazing Ideas", "Automatic Internet"],
                "correct": 0,
                "explanation": "AI stands for Artificial Intelligence!"
            },
            {
                "question": "Which of these uses AI?",
                "options": ["Voice assistants like Siri", "Regular calculators", "Paper books"],
                "correct": 0,
                "explanation": "Voice assistants use AI to understand speech!"
            },
            {
                "question": "How do we teach AI?",
                "options": ["By giving it examples", "By magic", "By shouting at it"],
                "correct": 0,
                "explanation": "We teach AI by showing it lots of examples!"
            }
        ]
        
        quiz = st.session_state.quiz_game
        
        if quiz['current_question'] < len(questions):
            q = questions[quiz['current_question']]
            
            st.write(f"**Question {quiz['current_question'] + 1} of {len(questions)}**")
            st.write(f"**Current Score: {quiz['score']}/{quiz['current_question']}**")
            
            st.markdown(f"### {q['question']}")
            
            if not quiz['answered_current']:
                for i, option in enumerate(q['options']):
                    if st.button(f"**{chr(65+i)}.** {option}", key=f"quiz_q{quiz['current_question']}_opt{i}"):
                        quiz['answered_current'] = True
                        
                        if i == q['correct']:
                            st.success("✅ Correct! Great job!")
                            quiz['score'] += 1
                        else:
                            st.error(f"❌ The correct answer is: **{q['options'][q['correct']]}**")
                        
                        st.info(f"💡 **Explanation:** {q['explanation']}")
                        st.rerun()
            
            if quiz['answered_current']:
                if quiz['current_question'] < len(questions) - 1:
                    if st.button("➡️ Next Question", type="primary"):
                        quiz['current_question'] += 1
                        quiz['answered_current'] = False
                        st.rerun()
                else:
                    if st.button("🏁 Finish Quiz", type="primary"):
                        st.session_state.activity4_completed = True
                        st.rerun()
    
    elif st.session_state.activity4_completed:
        st.success("✅ **Activity 4 Completed!** You aced the AI quiz!")
    
    elif not st.session_state.activity3_completed:
        st.info("🔒 Complete Activity 3 to unlock this activity!")
    
    st.divider()
    
    # Activity 5: AI Art Creator
    st.subheader("🎨 Activity 5: AI Art Creator")
    
    if st.session_state.activity4_completed and not st.session_state.activity5_completed:
        st.write("🎉 **Unlocked!** Create amazing art with AI!")
        
        col1, col2 = st.columns(2)
        
        with col1:
            art_style = st.selectbox("🎨 Choose art style:", ["Cartoon", "Realistic", "Abstract", "Pixel Art"], key="art_style_select")
            art_subject = st.text_input("🖼️ What should the AI draw?", value="a friendly robot", key="art_subject_input")
        
        with col2:
            art_colors = st.multiselect("🌈 Choose colors:", ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"], default=["Blue", "Green"], key="art_colors_select")
            add_sparkles = st.checkbox("✨ Add magical sparkles", key="sparkles_check")
        
        if st.button("🎨 Generate AI Art!", type="primary", key="generate_art_btn"):
            with st.spinner("🧠 AI is creating your art..."):
                time.sleep(2)
            
            color_map = {"Red": "🔴", "Blue": "🔵", "Green": "🟢", "Yellow": "🟡", "Purple": "🟣", "Orange": "🟠"}
            art_colors_emoji = [color_map.get(c, "⚪") for c in art_colors]
            sparkles = "✨" * 3 if add_sparkles else ""
            
            st.success("🎉 **AI Art Created Successfully!**")
            
            st.markdown(f"""
            <div style="border: 4px solid #FFD700; padding: 30px; text-align: center; 
                       background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                       border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #333;">🎨 {art_style} Style</h3>
                <div style="font-size: 2em; margin: 20px 0;">
                    {sparkles} {"".join(art_colors_emoji)} {sparkles}
                </div>
                <h2 style="color: #555;">{art_subject}</h2>
                <p style="color: #666;">Created by AI Art Generator</p>
            </div>
            """, unsafe_allow_html=True)
            
            st.session_state.art_creator['creations'].append({
                'style': art_style,
                'subject': art_subject,
                'colors': art_colors,
                'sparkles': add_sparkles
            })
            
            st.session_state.activity5_completed = True
            st.balloons()
            st.success("🌟 **Activity 5 Complete!** You're an AI artist!")
    
    elif st.session_state.activity5_completed:
        st.success("✅ **Activity 5 Completed!** You're an amazing AI artist!")
    
    elif not st.session_state.activity4_completed:
        st.info("🔒 Complete Activity 4 to unlock this activity!")
    
    st.divider()
    
    # Final Certificate - only show when ALL activities are completed
    if all([st.session_state.activity1_completed, st.session_state.activity2_completed, 
            st.session_state.activity3_completed, st.session_state.activity4_completed, 
            st.session_state.activity5_completed]):
        
        st.subheader("🎉 Adventure Complete!")
        
        detective_score = st.session_state.detective_game['score']
        quiz_score = st.session_state.quiz_game['score']
        art_creations = len(st.session_state.art_creator['creations'])
        
        st.balloons()
        
        # Certificate Header
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            st.markdown("""
            <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white; margin: 20px 0;">
                <h1 style="font-size: 3em; margin: 0;">🏆</h1>
                <h1 style="margin: 10px 0; font-size: 2.5em;">AI EXPLORER</h1>
                <h2 style="margin: 10px 0; font-size: 2em;">CERTIFICATE</h2>
            </div>
            """, unsafe_allow_html=True)
        
        # Congratulations Section
        st.markdown("""
        <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 15px; margin: 20px 0; border: 3px solid #FFD700;">
            <h2 style="color: #667eea; font-size: 2.5em; margin-bottom: 20px;">🎉 CONGRATULATIONS! 🎉</h2>
            <p style="font-size: 1.3em; color: #333; margin-bottom: 15px;">This certifies that you have successfully completed</p>
            <h3 style="color: #764ba2; font-size: 2em; margin: 20px 0;">✨ The Complete Interactive AI Adventure! ✨</h3>
        </div>
        """, unsafe_allow_html=True)
        
        # Achievements
        st.subheader("🎯 Your Achievements:")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("🕵️ AI Detective", f"{detective_score}/3")
            st.metric("🧠 Pattern Trainer", "3/3")
        
        with col2:
            st.metric("🧩 Quiz Master", f"{quiz_score}/3")
            st.metric("🤖 AI Friend Creator", "1")
        
        with col3:
            st.metric("🎨 AI Artist", f"{art_creations}")
            st.metric("🎯 Total Score", f"{detective_score + quiz_score}/6")
        
        # Final Declaration
        st.markdown(f"""
        <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #FFD700, #FFA500); border-radius: 15px; margin: 20px 0; color: white;">
            <h2 style="font-size: 2.2em; margin-bottom: 15px;">🚀 You are now an official AI Explorer! 🚀</h2>
            <p style="font-size: 1.2em; margin: 10px 0;">Ready to explore the amazing world of Artificial Intelligence!</p>
            <p style="font-style: italic; margin-top: 20px;">🗓️ Completed on {datetime.now().strftime("%B %d, %Y at %H:%M")}</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Action buttons
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("🔄 New Adventure", type="primary"):
                for key in list(st.session_state.keys()):
                    del st.session_state[key]
                st.rerun()
        
        with col2:
            certificate_text = f"""
🏆 AI EXPLORER CERTIFICATE 🏆

CONGRATULATIONS!

This certifies that you have successfully completed
The Complete Interactive AI Adventure!

🎯 YOUR ACHIEVEMENTS:
🕵️ AI Detective Score: {detective_score}/3
🧩 Quiz Score: {quiz_score}/3  
🎨 Art Creations: {art_creations}
🧠 Patterns Trained: 3/3
🤖 AI Friends Created: 1

🚀 You are now an official AI Explorer! 🚀

Total Score: {detective_score + quiz_score}/6 Points

Completed on {datetime.now().strftime("%B %d, %Y at %H:%M")}

⭐ Keep exploring and learning! ⭐
            """
            
            st.download_button(
                label="📥 Download Certificate",
                data=certificate_text,
                file_name=f"AI_Explorer_Certificate_{datetime.now().strftime('%Y%m%d_%H%M')}.txt",
                mime="text/plain",
                type="secondary"
            )
        
        st.success("🌟 Congratulations on completing your AI learning journey!")

if __name__ == "__main__":
    main()
