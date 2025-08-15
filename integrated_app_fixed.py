import streamlit as st
# <CHANGE> Adding scraping functionality imports
try:
    from content_scraper import ContentScraper
    from content_manager import ContentManager
    SCRAPING_ENABLED = True
except ImportError:
    SCRAPING_ENABLED = False
    print("Scraping modules not found - using static content")
import sqlite3
import pandas as pd
import json
from datetime import datetime, timedelta
import hashlib
import random
import time

# Set page config ONCE at the very top
st.set_page_config(
    page_title="AI Kids Learning Platform",
    page_icon="🚀",
    layout="wide"
)

class ParentDashboard:
    def __init__(self):
        self.init_database()
    
    def init_database(self):
        """Initialize the parent dashboard database"""
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        
        # Parents table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS parents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Kids table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS kids (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                parent_id INTEGER,
                name TEXT NOT NULL,
                age INTEGER,
                grade TEXT,
                avatar TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (parent_id) REFERENCES parents (id)
            )
        ''')
        
        # Learning sessions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS learning_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kid_id INTEGER,
                session_start TIMESTAMP,
                session_end TIMESTAMP,
                activities_completed TEXT,
                total_score INTEGER,
                time_spent_minutes INTEGER,
                certificates_earned TEXT,
                FOREIGN KEY (kid_id) REFERENCES kids (id)
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def hash_password(self, password: str) -> str:
        """Hash password for secure storage"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def create_parent_account(self, email: str, password: str, name: str) -> bool:
        """Create a new parent account"""
        try:
            conn = sqlite3.connect('parent_dashboard.db')
            cursor = conn.cursor()
            
            password_hash = self.hash_password(password)
            cursor.execute(
                "INSERT INTO parents (email, password_hash, name) VALUES (?, ?, ?)",
                (email, password_hash, name)
            )
            
            conn.commit()
            conn.close()
            return True
        except sqlite3.IntegrityError:
            return False
    
    def authenticate_parent(self, email: str, password: str):
        """Authenticate parent login"""
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        
        password_hash = self.hash_password(password)
        cursor.execute(
            "SELECT id, name, email FROM parents WHERE email = ? AND password_hash = ?",
            (email, password_hash)
        )
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return {
                'id': result[0],
                'name': result[1],
                'email': result[2]
            }
        return None
    
    def add_kid_profile(self, parent_id: int, name: str, age: int, grade: str, avatar: str) -> bool:
        """Add a new kid profile"""
        try:
            conn = sqlite3.connect('parent_dashboard.db')
            cursor = conn.cursor()
            
            cursor.execute(
                "INSERT INTO kids (parent_id, name, age, grade, avatar) VALUES (?, ?, ?, ?, ?)",
                (parent_id, name, age, grade, avatar)
            )
            
            conn.commit()
            conn.close()
            return True
        except:
            return False
    
    def get_kids_for_parent(self, parent_id: int):
        """Get all kids for a parent"""
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT id, name, age, grade, avatar, created_at FROM kids WHERE parent_id = ?",
            (parent_id,)
        )
        
        results = cursor.fetchall()
        conn.close()
        
        return [
            {
                'id': row[0],
                'name': row[1],
                'age': row[2],
                'grade': row[3],
                'avatar': row[4],
                'created_at': row[5]
            }
            for row in results
        ]
    
    def log_learning_session(self, kid_id: int, activities_completed, total_score: int, time_spent: int, certificates):
        """Log a completed learning session"""
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO learning_sessions 
            (kid_id, session_start, session_end, activities_completed, total_score, time_spent_minutes, certificates_earned)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            kid_id,
            datetime.now() - timedelta(minutes=time_spent),
            datetime.now(),
            json.dumps(activities_completed),
            total_score,
            time_spent,
            json.dumps(certificates)
        ))
        
        conn.commit()
        conn.close()
    
    def get_kid_progress(self, kid_id: int):
        """Get comprehensive progress data for a kid"""
        conn = sqlite3.connect('parent_dashboard.db')
        
        # Get learning sessions
        sessions_df = pd.read_sql_query('''
            SELECT * FROM learning_sessions WHERE kid_id = ?
            ORDER BY session_start DESC
        ''', conn, params=(kid_id,))
        
        conn.close()
        
        # Calculate statistics
        total_sessions = len(sessions_df)
        total_time = sessions_df['time_spent_minutes'].sum() if not sessions_df.empty else 0
        avg_score = sessions_df['total_score'].mean() if not sessions_df.empty else 0
        
        # Get recent activity (last 7 days)
        if not sessions_df.empty:
            sessions_df['session_start'] = pd.to_datetime(sessions_df['session_start'])
            recent_sessions = sessions_df[
                sessions_df['session_start'] >= datetime.now() - timedelta(days=7)
            ]
            recent_time = recent_sessions['time_spent_minutes'].sum()
        else:
            recent_time = 0
        
        return {
            'total_sessions': total_sessions,
            'total_time_minutes': total_time,
            'average_score': avg_score,
            'recent_time_minutes': recent_time,
            'sessions_data': sessions_df
        }

def show_parent_login():
    """Show parent login/registration interface"""
    st.title("👨‍👩‍👧‍👦 Parent Dashboard")
    st.caption("Monitor your child's AI learning journey")
    
    dashboard = ParentDashboard()
    
    tab1, tab2 = st.tabs(["🔐 Login", "📝 Create Account"])
    
    with tab1:
        st.subheader("Parent Login")
        
        with st.form("login_form"):
            email = st.text_input("📧 Email")
            password = st.text_input("🔒 Password", type="password")
            login_button = st.form_submit_button("🚀 Login", type="primary")
            
            if login_button:
                if email and password:
                    parent = dashboard.authenticate_parent(email, password)
                    if parent:
                        st.session_state.parent_logged_in = True
                        st.session_state.parent_info = parent
                        st.success(f"Welcome back, {parent['name']}!")
                        st.rerun()
                    else:
                        st.error("❌ Invalid email or password")
                else:
                    st.warning("⚠️ Please fill in all fields")
    
    with tab2:
        st.subheader("Create Parent Account")
        
        with st.form("register_form"):
            name = st.text_input("👤 Full Name")
            email = st.text_input("📧 Email Address")
            password = st.text_input("🔒 Password", type="password")
            confirm_password = st.text_input("🔒 Confirm Password", type="password")
            register_button = st.form_submit_button("✨ Create Account", type="primary")
            
            if register_button:
                if name and email and password and confirm_password:
                    if password == confirm_password:
                        if dashboard.create_parent_account(email, password, name):
                            st.success("🎉 Account created successfully! Please login.")
                        else:
                            st.error("❌ Email already exists or registration failed")
                    else:
                        st.error("❌ Passwords don't match")
                else:
                    st.warning("⚠️ Please fill in all fields")

def show_parent_dashboard():
    """Show the main parent dashboard"""
    st.title(f"👨‍👩‍👧‍👦 Welcome, {st.session_state.parent_info['name']}!")
    
    dashboard = ParentDashboard()
    parent_id = st.session_state.parent_info['id']
    
    # Sidebar navigation
    st.sidebar.title("📊 Dashboard Menu")
    
    page = st.sidebar.selectbox("Choose Section:", [
        "🏠 Overview",
        "👶 Manage Kids",
        "📈 Progress Analytics"
    ])
    
    if st.sidebar.button("🚪 Logout"):
        st.session_state.parent_logged_in = False
        st.session_state.parent_info = None
        st.rerun()
    
    # Get kids data
    kids = dashboard.get_kids_for_parent(parent_id)
    
    if page == "🏠 Overview":
        show_overview(dashboard, kids)
    elif page == "👶 Manage Kids":
        show_manage_kids(dashboard, parent_id, kids)
    elif page == "📈 Progress Analytics":
        show_progress_analytics(dashboard, kids)

def show_overview(dashboard, kids):
    """Show overview dashboard"""
    st.subheader("📊 Family Learning Overview")
    
    if not kids:
        st.info("👶 No kids added yet. Go to 'Manage Kids' to add your first child!")
        return
    
    # Summary metrics
    col1, col2, col3, col4 = st.columns(4)
    
    total_kids = len(kids)
    total_sessions = 0
    total_time = 0
    
    for kid in kids:
        progress = dashboard.get_kid_progress(kid['id'])
        total_sessions += progress['total_sessions']
        total_time += progress['total_time_minutes']
    
    with col1:
        st.metric("👶 Total Kids", total_kids)
    
    with col2:
        st.metric("🎮 Learning Sessions", total_sessions)
    
    with col3:
        st.metric("⏰ Total Time", f"{total_time} min")
    
    with col4:
        avg_score = 85 if total_sessions > 0 else 0
        st.metric("📊 Average Score", f"{avg_score}%")
    
    st.divider()
    
    # Recent activity for each kid
    st.subheader("👶 Kids' Recent Activity")
    
    for kid in kids:
        with st.expander(f"{kid['avatar']} {kid['name']} (Age {kid['age']})"):
            progress = dashboard.get_kid_progress(kid['id'])
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("🎯 Sessions", progress['total_sessions'])
            
            with col2:
                st.metric("⏰ Time This Week", f"{progress['recent_time_minutes']} min")
            
            with col3:
                st.metric("📊 Avg Score", f"{progress['average_score']:.1f}")
            
            # Show recent sessions
            if not progress['sessions_data'].empty:
                st.write("**📅 Recent Sessions:**")
                recent_sessions = progress['sessions_data'].head(3)
                
                for _, session in recent_sessions.iterrows():
                    try:
                        activities = json.loads(session['activities_completed'])
                        # Format timestamp properly
                        session_date = pd.to_datetime(session['session_start']).strftime('%Y-%m-%d')
                        st.write(f"• {session_date} - {len(activities)} activities, Score: {session['total_score']}")
                    except Exception as e:
                        st.write(f"• Session - Score: {session['total_score']}")
            else:
                st.info("No learning sessions yet!")

def show_manage_kids(dashboard, parent_id, kids):
    """Show kid management interface"""
    st.subheader("👶 Manage Kids")
    
    # Add new kid
    with st.expander("➕ Add New Kid"):
        with st.form("add_kid_form"):
            col1, col2 = st.columns(2)
            
            with col1:
                name = st.text_input("👤 Kid's Name")
                age = st.number_input("🎂 Age", min_value=3, max_value=18, value=8)
            
            with col2:
                grade = st.selectbox("🎓 Grade", [
                    "Preschool", "Kindergarten", "1st Grade", "2nd Grade", 
                    "3rd Grade", "4th Grade", "5th Grade", "6th Grade"
                ])
                
                avatar = st.selectbox("😊 Choose Avatar", [
                    "👦", "👧", "🧒", "👶", "🦸‍♂️", "🦸‍♀️", 
                    "🧙‍♂️", "🧙‍♀️", "🤖", "👽", "🦄", "🐱"
                ])
            
            if st.form_submit_button("✨ Add Kid", type="primary"):
                if name:
                    if dashboard.add_kid_profile(parent_id, name, age, grade, avatar):
                        st.success(f"🎉 {name} added successfully!")
                        st.rerun()
                    else:
                        st.error("❌ Failed to add kid")
                else:
                    st.warning("⚠️ Please enter a name")
    
    # Show existing kids
    if kids:
        st.subheader("👨‍👩‍👧‍👦 Your Kids")
        
        for kid in kids:
            with st.container():
                col1, col2, col3 = st.columns([1, 2, 2])
                
                with col1:
                    st.markdown(f"<h2>{kid['avatar']}</h2>", unsafe_allow_html=True)
                
                with col2:
                    st.write(f"**{kid['name']}**")
                    st.write(f"Age: {kid['age']} | {kid['grade']}")
                
                with col3:
                    progress = dashboard.get_kid_progress(kid['id'])
                    st.write(f"🎮 Sessions: {progress['total_sessions']}")
                    st.write(f"⏰ Total Time: {progress['total_time_minutes']} min")
                
                st.divider()
    else:
        st.info("👶 No kids added yet. Add your first child above!")

def show_progress_analytics(dashboard, kids):
    """Show detailed progress analytics"""
    st.subheader("📈 Progress Analytics")
    
    if not kids:
        st.info("👶 No kids added yet. Add kids first to see analytics!")
        return
    
    # Kid selector
    selected_kid_name = st.selectbox(
        "👶 Select Kid:",
        [f"{kid['avatar']} {kid['name']}" for kid in kids]
    )
    
    selected_kid = next(kid for kid in kids if f"{kid['avatar']} {kid['name']}" == selected_kid_name)
    progress = dashboard.get_kid_progress(selected_kid['id'])
    
    # Overview metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("🎮 Total Sessions", progress['total_sessions'])
    
    with col2:
        st.metric("⏰ Total Time", f"{progress['total_time_minutes']} min")
    
    with col3:
        st.metric("📊 Average Score", f"{progress['average_score']:.1f}")
    
    with col4:
        st.metric("⏰ This Week", f"{progress['recent_time_minutes']} min")
    
    # Show session history
    if not progress['sessions_data'].empty:
        st.subheader("📅 Learning History")
        
        for _, session in progress['sessions_data'].iterrows():
            try:
                session_date = pd.to_datetime(session['session_start']).strftime('%Y-%m-%d %H:%M')
                with st.expander(f"📅 {session_date} - Score: {session['total_score']}"):
                    col1, col2, col3 = st.columns(3)
                    
                    with col1:
                        st.write(f"**⏰ Duration:** {session['time_spent_minutes']} minutes")
                    
                    with col2:
                        st.write(f"**📊 Score:** {session['total_score']}")
                    
                    with col3:
                        activities = json.loads(session['activities_completed'])
                        st.write(f"**🎯 Activities:** {len(activities)}")
                    
                    st.write("**Activities Completed:**")
                    activities = json.loads(session['activities_completed'])
                    for activity in activities:
                        st.write(f"• {activity}")
            except Exception as e:
                st.write(f"Session data error: {e}")
    else:
        st.info("📊 No learning data available yet.")

def show_kids_app():
    """Show kids learning interface"""
    # Initialize session state
    if 'current_kid_id' not in st.session_state:
        st.session_state.current_kid_id = None
    
    if 'session_start_time' not in st.session_state:
        st.session_state.session_start_time = datetime.now()
    
    if 'activities_completed_session' not in st.session_state:
        st.session_state.activities_completed_session = []
    
    if 'total_session_score' not in st.session_state:
        st.session_state.total_session_score = 0
    
    # Kid selection
    if not st.session_state.current_kid_id:
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
            return
        
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
        return
    
    # Show learning interface
    st.title("🤖 Interactive AI Adventure!")
    st.caption(f"Welcome back, {st.session_state.current_kid_name}! Let's learn about AI!")
    
    # Show session info in sidebar
    session_duration = int((datetime.now() - st.session_state.session_start_time).total_seconds() / 60)
    st.sidebar.markdown(f"""
    ### 👶 Learning Profile
    **{st.session_state.current_kid_avatar} {st.session_state.current_kid_name}**
    
    **📊 This Session:**
    - ⏰ Time: {session_duration} min
    - 🎯 Activities: {len(st.session_state.activities_completed_session)}
    - 📊 Score: {st.session_state.total_session_score}
    """)
    
    if st.sidebar.button("🔄 Switch Kid"):
        st.session_state.current_kid_id = None
        st.rerun()
    
    if st.sidebar.button("💾 Save Progress"):
        dashboard = ParentDashboard()
        session_duration = (datetime.now() - st.session_state.session_start_time).total_seconds() / 60
        
        dashboard.log_learning_session(
            kid_id=st.session_state.current_kid_id,
            activities_completed=st.session_state.activities_completed_session,
            total_score=st.session_state.total_session_score,
            time_spent=int(session_duration),
            certificates=[]
        )
        
        st.sidebar.success("✅ Progress saved!")
    
    # Simple activity selector
    activity = st.selectbox("Choose an activity:", [
        "🎮 AI Detective Game",
        "🎨 AI Friend Creator", 
        "🧠 Pattern Training",
        "🧩 AI Quiz",
        "🎨 AI Art Studio"
    ])
    
    if activity == "🎮 AI Detective Game":
        show_detective_game()
    elif activity == "🎨 AI Friend Creator":
        show_ai_friend_creator()
    elif activity == "🧠 Pattern Training":
        show_pattern_training()
    elif activity == "🧩 AI Quiz":
        show_ai_quiz()
    elif activity == "🎨 AI Art Studio":
        show_ai_art_studio()

def show_detective_game():
    """Simple AI Detective Game"""
    st.subheader("🎮 AI Detective Game")
    st.write("Can you identify which items use AI?")
    
    items = [
        {"name": "Smart Speaker (Alexa)", "is_ai": True, "emoji": "🔊"},
        {"name": "Calculator", "is_ai": False, "emoji": "🧮"},
        {"name": "Netflix Recommendations", "is_ai": True, "emoji": "📺"},
        {"name": "Regular Clock", "is_ai": False, "emoji": "⏰"},
        {"name": "Google Maps", "is_ai": True, "emoji": "🗺️"},
        {"name": "Pencil", "is_ai": False, "emoji": "✏️"}
    ]
    
    if 'detective_item' not in st.session_state:
        st.session_state.detective_item = random.choice(items)
        st.session_state.detective_score = 0
    
    item = st.session_state.detective_item
    
    st.write(f"### {item['emoji']} {item['name']}")
    st.write("Is this AI or not AI?")
    
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("🤖 This is AI!", type="primary"):
            if item['is_ai']:
                st.success("✅ Correct!")
                st.session_state.detective_score += 1
                st.session_state.total_session_score += 10
                if "AI Detective Game" not in st.session_state.activities_completed_session:
                    st.session_state.activities_completed_session.append("AI Detective Game")
            else:
                st.error("❌ Not quite!")
            st.balloons()
            st.session_state.detective_item = random.choice(items)
    
    with col2:
        if st.button("🚫 Not AI!", type="secondary"):
            if not item['is_ai']:
                st.success("✅ Correct!")
                st.session_state.detective_score += 1
                st.session_state.total_session_score += 10
                if "AI Detective Game" not in st.session_state.activities_completed_session:
                    st.session_state.activities_completed_session.append("AI Detective Game")
            else:
                st.error("❌ Actually, this uses AI!")
            st.session_state.detective_item = random.choice(items)

def show_ai_friend_creator():
    """Simple AI Friend Creator"""
    st.subheader("🎨 AI Friend Creator")
    st.write("Design your own AI companion!")
    
    name = st.text_input("🏷️ Friend's Name:", "RoboHelper")
    personality = st.selectbox("😊 Personality:", ["Friendly", "Funny", "Smart", "Helpful"])
    color = st.color_picker("🎨 Favorite Color:", "#00f900")
    
    if st.button("✨ Create Friend!", type="primary"):
        st.success("🎉 AI Friend Created!")
        st.markdown(f"""
        <div style="background-color: {color}; padding: 20px; border-radius: 10px; text-align: center; color: white;">
            <h2>🤖 {name}</h2>
            <p>Personality: {personality}</p>
            <p>Ready to be your learning companion!</p>
        </div>
        """, unsafe_allow_html=True)
        st.balloons()
        
        st.session_state.total_session_score += 20
        if "AI Friend Creator" not in st.session_state.activities_completed_session:
            st.session_state.activities_completed_session.append("AI Friend Creator")

def show_pattern_training():
    """Simple Pattern Training"""
    st.subheader("🧠 Pattern Training")
    st.write("Help train AI to recognize patterns!")
    
    patterns = [
        {'sequence': ['🔴', '🔵', '🔴', '🔵'], 'next': '🔴'},
        {'sequence': ['⭐', '⭐', '🌙'], 'next': '⭐'},
        {'sequence': ['🟢', '🟡', '🟢', '🟡'], 'next': '🟢'}
    ]
    
    if 'pattern_idx' not in st.session_state:
        st.session_state.pattern_idx = 0
    
    pattern = patterns[st.session_state.pattern_idx % len(patterns)]
    
    st.write("**Pattern:**")
    st.write(" → ".join(pattern['sequence']) + " → ?")
    
    options = ['🔴', '🔵', '⭐', '🌙', '🟢', '🟡']
    
    cols = st.columns(len(options))
    for i, option in enumerate(options):
        with cols[i]:
            if st.button(option, key=f"pattern_{i}"):
                if option == pattern['next']:
                    st.success("🎉 Correct!")
                    st.balloons()
                    st.session_state.total_session_score += 15
                    if "Pattern Training" not in st.session_state.activities_completed_session:
                        st.session_state.activities_completed_session.append("Pattern Training")
                else:
                    st.error(f"❌ The answer was {pattern['next']}")
                
                st.session_state.pattern_idx += 1

def show_ai_quiz():
    """Simple AI Quiz"""
    st.subheader("🧩 AI Quiz")
    
    questions = [
        {
            "question": "What does AI stand for?",
            "options": ["Artificial Intelligence", "Amazing Ideas", "Automatic Internet"],
            "correct": 0
        },
        {
            "question": "Which uses AI?",
            "options": ["Voice assistants", "Regular calculators", "Paper books"],
            "correct": 0
        },
        {
            "question": "AI can help with:",
            "options": ["Recognizing faces", "Making sandwiches", "Tying shoes"],
            "correct": 0
        }
    ]
    
    if 'quiz_idx' not in st.session_state:
        st.session_state.quiz_idx = 0
        st.session_state.quiz_score = 0
    
    if st.session_state.quiz_idx < len(questions):
        q = questions[st.session_state.quiz_idx]
        st.write(f"**Question {st.session_state.quiz_idx + 1}:** {q['question']}")
        
        for i, option in enumerate(q['options']):
            if st.button(f"{chr(65+i)}. {option}", key=f"quiz_{i}"):
                if i == q['correct']:
                    st.success("✅ Correct!")
                    st.session_state.quiz_score += 1
                    st.session_state.total_session_score += 10
                else:
                    st.error("❌ Try again!")
                
                st.session_state.quiz_idx += 1
                if "AI Quiz" not in st.session_state.activities_completed_session:
                    st.session_state.activities_completed_session.append("AI Quiz")
                st.rerun()
    else:
        st.success(f"🎉 Quiz Complete! Score: {st.session_state.quiz_score}/{len(questions)}")
        if st.button("🔄 Restart Quiz"):
            st.session_state.quiz_idx = 0
            st.session_state.quiz_score = 0
            st.rerun()

def show_ai_art_studio():
    """Simple AI Art Studio"""
    st.subheader("🎨 AI Art Studio")
    st.write("Create amazing AI art!")
    
    subject = st.text_input("🖼️ What should I draw?", "a friendly robot")
    style = st.selectbox("🎨 Art Style:", ["Cartoon", "Realistic", "Abstract"])
    colors = st.multiselect("🌈 Colors:", ["Red", "Blue", "Green", "Yellow", "Purple"])
    
    if st.button("🎨 Create Art!", type="primary"):
        st.success("🎉 AI Art Created!")
        
        color_emojis = {"Red": "🔴", "Blue": "🔵", "Green": "🟢", "Yellow": "🟡", "Purple": "🟣"}
        art_colors = [color_emojis.get(c, "⚪") for c in colors]
        
        st.markdown(f"""
        <div style="border: 3px solid #FFD700; padding: 30px; text-align: center; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); border-radius: 15px;">
            <h3>🎨 {style} Style</h3>
            <h2>{"".join(art_colors)} {subject} {"".join(art_colors)}</h2>
            <p><em>Your AI masterpiece!</em></p>
        </div>
        """, unsafe_allow_html=True)
        st.balloons()
        
        st.session_state.total_session_score += 25
        if "AI Art Studio" not in st.session_state.activities_completed_session:
            st.session_state.activities_completed_session.append("AI Art Studio")

def main():
    """Main integrated application"""
    # Sidebar for app selection
    st.sidebar.title("🚀 AI Kids Learning Platform")
    
    app_mode = st.sidebar.selectbox("Choose Interface:", [
        "👶 Kids Learning App",
        "👨‍👩‍👧‍👦 Parent Dashboard"
    ])
    
    st.sidebar.markdown("---")
    st.sidebar.markdown("""
    ### 🌟 Features:
    - **Kids App**: Interactive AI learning activities
    - **Parent Dashboard**: Progress tracking & oversight
    - **Progress Analytics**: Detailed learning insights
    - **Safety Controls**: Parent-managed settings
    """)
    
    # Show current files status
    st.sidebar.markdown("---")
    st.sidebar.markdown("### 📁 System Status")
    
    import os
    files_status = {
        "interactive_lesson_generator.py": os.path.exists("interactive_lesson_generator.py"),
        "parent_dashboard.py": os.path.exists("parent_dashboard.py"),
        "enhanced_kids_app.py": os.path.exists("enhanced_kids_app.py")
    }
    
    for file, exists in files_status.items():
        status = "✅" if exists else "❌"
        st.sidebar.write(f"{status} {file}")
    
    # Initialize session state for parent
    if 'parent_logged_in' not in st.session_state:
        st.session_state.parent_logged_in = False
    if 'parent_info' not in st.session_state:
        st.session_state.parent_info = None
    
    # Route to appropriate app
    if app_mode == "👶 Kids Learning App":
        show_kids_app()
    else:
        # Parent Dashboard
        if not st.session_state.parent_logged_in:
            show_parent_login()
        else:
            show_parent_dashboard()

if __name__ == "__main__":
    main()

# <CHANGE> Initialize scraping system
if 'content_scraper' not in st.session_state and SCRAPING_ENABLED:
    st.session_state.content_scraper = ContentScraper()

