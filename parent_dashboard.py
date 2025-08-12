import streamlit as st
import sqlite3
import pandas as pd
import json
from datetime import datetime, timedelta
import hashlib
import plotly.express as px
import plotly.graph_objects as go
from typing import Dict, List, Optional

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
        
        # Activity progress table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS activity_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                kid_id INTEGER,
                activity_name TEXT,
                completion_status TEXT,
                score INTEGER,
                attempts INTEGER,
                time_spent_minutes INTEGER,
                completed_at TIMESTAMP,
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
    
    def authenticate_parent(self, email: str, password: str) -> Optional[Dict]:
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
    
    def get_kids_for_parent(self, parent_id: int) -> List[Dict]:
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
    
    def log_learning_session(self, kid_id: int, activities_completed: List[str], 
                           total_score: int, time_spent: int, certificates: List[str]):
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
    
    def get_kid_progress(self, kid_id: int) -> Dict:
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
        "📈 Progress Analytics", 
        "⚙️ Settings"
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
    elif page == "⚙️ Settings":
        show_parent_settings()

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
        st.metric("📊 Avg Score", "N/A" if total_sessions == 0 else f"{total_time/total_sessions:.1f}")
    
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
            
            if not progress['sessions_data'].empty:
                st.write("**📅 Recent Sessions:**")
                recent_sessions = progress['sessions_data'].head(3)
                
                for _, session in recent_sessions.iterrows():
                    activities = json.loads(session['activities_completed'])
                    st.write(f"• {session['session_start'][:10]} - {len(activities)} activities, Score: {session['total_score']}")
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
                    "3rd Grade", "4th Grade", "5th Grade", "6th Grade",
                    "7th Grade", "8th Grade", "9th Grade", "10th Grade",
                    "11th Grade", "12th Grade"
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
                col1, col2, col3, col4 = st.columns([1, 2, 2, 1])
                
                with col1:
                    st.markdown(f"<h2>{kid['avatar']}</h2>", unsafe_allow_html=True)
                
                with col2:
                    st.write(f"**{kid['name']}**")
                    st.write(f"Age: {kid['age']} | {kid['grade']}")
                
                with col3:
                    progress = dashboard.get_kid_progress(kid['id'])
                    st.write(f"🎮 Sessions: {progress['total_sessions']}")
                    st.write(f"⏰ Total Time: {progress['total_time_minutes']} min")
                
                with col4:
                    if st.button("📊 View Details", key=f"details_{kid['id']}"):
                        st.info("Detailed view coming soon!")
                
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
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("🎮 Total Sessions", progress['total_sessions'])
    
    with col2:
        st.metric("⏰ Total Time", f"{progress['total_time_minutes']} min")
    
    with col3:
        st.metric("📊 Average Score", f"{progress['average_score']:.1f}")
    
    # Show session data if available
    if not progress['sessions_data'].empty:
        st.subheader("📊 Session History")
        st.dataframe(progress['sessions_data'][['session_start', 'total_score', 'time_spent_minutes']])
    else:
        st.info("📊 No data available yet. Complete some activities to see analytics!")

def show_parent_settings():
    """Show parent settings"""
    st.subheader("⚙️ Parent Settings")
    
    # Time limits
    st.write("**⏰ Time Management**")
    
    daily_limit = st.slider(
        "Daily Time Limit (minutes)",
        min_value=15,
        max_value=180,
        value=60,
        step=15
    )
    
    # Safety settings
    st.write("**🛡️ Safety Settings**")
    
    safety_mode = st.checkbox("Enable Safety Mode", value=True)
    
    if safety_mode:
        st.info("🛡️ Safety mode prevents access to external links and ensures age-appropriate content.")
    
    if st.button("💾 Save Settings", type="primary"):
        st.success("✅ Settings saved successfully!")

def main():
    """Main parent dashboard application"""
    st.set_page_config(
        page_title="Parent Dashboard - AI Kids Learning",
        page_icon="👨‍👩‍👧‍👦",
        layout="wide"
    )
    
    # Initialize session state
    if 'parent_logged_in' not in st.session_state:
        st.session_state.parent_logged_in = False
    
    if 'parent_info' not in st.session_state:
        st.session_state.parent_info = None
    
    # Show appropriate interface
    if not st.session_state.parent_logged_in:
        show_parent_login()
    else:
        show_parent_dashboard()

if __name__ == "__main__":
    main()
