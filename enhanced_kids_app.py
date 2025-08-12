import streamlit as st
import sqlite3
import json
import random
import time
from datetime import datetime
from parent_dashboard import ParentDashboard

class EnhancedKidsApp:
    def __init__(self):
        self.dashboard = ParentDashboard()
        self.init_session_state()
    
    def init_session_state(self):
        """Initialize session state for tracking"""
        if 'current_kid_id' not in st.session_state:
            st.session_state.current_kid_id = None
        
        if 'session_start_time' not in st.session_state:
            st.session_state.session_start_time = datetime.now()
        
        if 'activities_completed_session' not in st.session_state:
            st.session_state.activities_completed_session = []
        
        if 'total_session_score' not in st.session_state:
            st.session_state.total_session_score = 0
        
        # Activity states
        if 'activity1_completed' not in st.session_state:
            st.session_state.activity1_completed = False
        if 'detective_game' not in st.session_state:
            st.session_state.detective_game = {'score': 0, 'questions_asked': 0}
    
    def select_kid_profile(self):
        """Show kid profile selection"""
        st.title("👶 Who's Learning Today?")
        st.caption("Select your profile to start learning!")
        
        # Get all kids from database
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, age, avatar FROM kids")
        kids = cursor.fetchall()
        conn.close()
        
        if not kids:
            st.warning("👶 No kid profiles found! Ask your parent to create a profile for you.")
            st.info("Parents can create profiles in the Parent Dashboard.")
            return False
        
        # Display kid profiles
        cols = st.columns(min(3, len(kids)))
        
        for i, (kid_id, name, age, avatar) in enumerate(kids):
            with cols[i % 3]:
                st.markdown(f"""
                <div style="text-align: center; padding: 20px; border: 2px solid #ddd; border-radius: 15px; margin: 10px;">
                    <h1>{avatar}</h1>
                    <h3>{name}</h3>
                    <p>Age {age}</p>
                </div>
                """, unsafe_allow_html=True)
                
                if st.button(f"🚀 Start Learning as {name}", key=f"select_{kid_id}", type="primary"):
                    st.session_state.current_kid_id = kid_id
                    st.session_state.current_kid_name = name
                    st.session_state.current_kid_avatar = avatar
                    st.session_state.session_start_time = datetime.now()
                    st.success(f"Welcome, {name}! Let's start learning! 🎉")
                    time.sleep(1)
                    st.rerun()
        
        return False
    
    def track_activity_completion(self, activity_name: str, score: int):
        """Track when an activity is completed"""
        if activity_name not in st.session_state.activities_completed_session:
            st.session_state.activities_completed_session.append(activity_name)
            st.session_state.total_session_score += score
    
    def end_learning_session(self):
        """End the learning session and save to database"""
        if st.session_state.current_kid_id:
            session_duration = (datetime.now() - st.session_state.session_start_time).total_seconds() / 60
            
            certificates = []
            if st.session_state.activity1_completed:
                certificates.append("AI Detective Certificate")
            
            # Save session to database
            self.dashboard.log_learning_session(
                kid_id=st.session_state.current_kid_id,
                activities_completed=st.session_state.activities_completed_session,
                total_score=st.session_state.total_session_score,
                time_spent=int(session_duration),
                certificates=certificates
            )
            
            return session_duration, certificates
        return 0, []

def create_simple_ai_lesson():
    """Create a simple AI lesson with tracking"""
    
    app = EnhancedKidsApp()
    
    # Kid selection
    if not st.session_state.current_kid_id:
        return app.select_kid_profile()
    
    # Show current kid info
    st.sidebar.markdown(f"""
    ### 👶 Learning Profile
    **{st.session_state.current_kid_avatar} {st.session_state.current_kid_name}**
    
    **📊 This Session:**
    - ⏰ Time: {int((datetime.now() - st.session_state.session_start_time).total_seconds() / 60)} min
    - 🎯 Activities: {len(st.session_state.activities_completed_session)}
    - 📊 Score: {st.session_state.total_session_score}
    """)
    
    if st.sidebar.button("🔄 Switch Kid"):
        st.session_state.current_kid_id = None
        st.rerun()
    
    if st.sidebar.button("🏠 Finish Learning"):
        duration, certificates = app.end_learning_session()
        
        # Reset session
        st.session_state.current_kid_id = None
        for key in list(st.session_state.keys()):
            if key.startswith(('activity', 'detective', 'session')):
                del st.session_state[key]
        
        st.success(f"🎉 Great job! You learned for {int(duration)} minutes!")
        if certificates:
            st.balloons()
            st.success(f"🏆 You earned: {', '.join(certificates)}")
        
        time.sleep(2)
        st.rerun()
    
    # Main lesson content
    st.title("🤖 AI Detective Game!")
    st.caption(f"Welcome, {st.session_state.current_kid_name}! Let's learn about AI!")
    
    # Simple AI Detective Game
    st.subheader("🎮 AI Detective Challenge")
    
    if not st.session_state.activity1_completed:
        items = [
            {"name": "Smart Speaker (Alexa)", "is_ai": True, "emoji": "🔊"},
            {"name": "Calculator", "is_ai": False, "emoji": "🧮"},
            {"name": "Netflix Recommendations", "is_ai": True, "emoji": "📺"},
            {"name": "Regular Clock", "is_ai": False, "emoji": "⏰"}
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
                    st.success(f"🎉 Game Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    app.track_activity_completion("AI Detective Game", game['score'])
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
                    st.success(f"🎉 Game Complete! Final Score: {game['score']}/3")
                    st.session_state.activity1_completed = True
                    app.track_activity_completion("AI Detective Game", game['score'])
                    st.balloons()
                    time.sleep(2)
                    st.rerun()
    else:
        st.success("✅ **AI Detective Game Completed!** You're an AI Detective!")
        
        # Show certificate
        st.subheader("🏆 Congratulations!")
        
        detective_score = st.session_state.detective_game['score']
        
        st.markdown(f"""
        <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white; margin: 20px 0;">
            <h1 style="font-size: 3em; margin: 0;">🏆</h1>
            <h1 style="margin: 10px 0; font-size: 2.5em;">AI DETECTIVE</h1>
            <h2 style="margin: 10px 0; font-size: 2em;">CERTIFICATE</h2>
            <h3 style="margin: 15px 0;">Awarded to:</h3>
            <h2 style="color: #FFD700;">{st.session_state.current_kid_avatar} {st.session_state.current_kid_name}</h2>
            <p style="margin: 15px 0;">Score: {detective_score}/3</p>
        </div>
        """, unsafe_allow_html=True)

def main():
    """Main enhanced kids application"""
    st.set_page_config(
        page_title="AI Kids Learning - Enhanced",
        page_icon="🚀",
        layout="wide"
    )
    
    create_simple_ai_lesson()

if __name__ == "__main__":
    main()
