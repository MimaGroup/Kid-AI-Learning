import streamlit as st
from components.robot_guide import display_robot_guide
from utils.helpers import initialize_session_state
import pandas as pd
import os

# Configure page
st.set_page_config(
    page_title="KidAI Academy",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load external CSS
def load_css(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Load main CSS file
load_css("assets/css/main.css")

# Custom inline styles
st.markdown("""
<style>
    /* Main content area */
    .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    
    /* Card styling */
    .feature-card {
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        padding: 1.5rem;
        transition: transform 0.3s, box-shadow 0.3s;
        background-color: white;
        height: 100%;
    }
    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
    
    /* Button styling */
    .stButton>button {
        width: 100%;
        border-radius: 20px;
        font-weight: bold;
    }
    
    /* Tab styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        padding: 10px 20px;
        border-radius: 5px 5px 0 0;
    }
    
    /* Background pattern */
    .main {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8IS0tIEJhY2tncm91bmQgLS0+CiAgPHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmMGY4ZmYiLz4KICAKICA8IS0tIENpcmN1aXQgUGF0dGVybiAtLT4KICA8ZyBzdHJva2U9IiNlMGUwZTAiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgIDwhLS0gSG9yaXpvbnRhbCBMaW5lcyAtLT4KICAgIDxsaW5lIHgxPSIwIiB5MT0iNTAiIHgyPSI1MDAiIHkyPSI1MCIvPgogICAgPGxpbmUgeDE9IjAiIHkxPSIxNTAiIHgyPSI1MDAiIHkyPSIxNTAiLz4KICAgIDxsaW5lIHgxPSIwIiB5MT0iMjUwIiB4Mj0iNTAwIiB5Mj0iMjUwIi8+CiAgICA8bGluZSB4MT0iMCIgeTE9IjM1MCIgeDI9IjUwMCIgeTI9IjM1MCIvPgogICAgPGxpbmUgeDE9IjAiIHkxPSI0NTAiIHgyPSI1MDAiIHkyPSI0NTAiLz4KICAgIAogICAgPCEtLSBWZXJ0aWNhbCBMaW5lcyAtLT4KICAgIDxsaW5lIHgxPSI1MCIgeTE9IjAiIHgyPSI1MCIgeTI9IjUwMCIvPgogICAgPGxpbmUgeDE9IjE1MCIgeTE9IjAiIHgyPSIxNTAiIHkyPSI1MDAiLz4KICAgIDxsaW5lIHgxPSIyNTAiIHkxPSIwIiB4Mj0iMjUwIiB5Mj0iNTAwIi8+CiAgICA8bGluZSB4MT0iMzUwIiB5MT0iMCIgeDI9IjM1MCIgeTI9IjUwMCIvPgogICAgPGxpbmUgeDE9IjQ1MCIgeTE9IjAiIHgyPSI0NTAiIHkyPSI1MDAiLz4KICA8L2c+CiAgCiAgPCEtLSBOb2RlcyAtLT4KICA8ZyBmaWxsPSIjZDBkMGZmIiBzdHJva2U9IiNiMGIwZmYiIHN0cm9rZS13aWR0aD0iMSI+CiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSI1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iNTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjM1MCIgY3k9IjUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSI0NTAiIGN5PSI1MCIgcj0iNSIvPgogICAgCiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjE1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjM1MCIgY3k9IjE1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iNDUwIiBjeT0iMTUwIiByPSI1Ii8+CiAgICAKICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iMjUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyNTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iMzUwIiBjeT0iMjUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSI0NTAiIGN5PSIyNTAiIHI9IjUiLz4KICAgIAogICAgPGNpcmNsZSBjeD0iNTAiIGN5PSIzNTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjM1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iMzUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSIzNTAiIGN5PSIzNTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjQ1MCIgY3k9IjM1MCIgcj0iNSIvPgogICAgCiAgICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjQ1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iNDUwIiByPSI1Ii8+CiAgICA8Y2lyY2xlIGN4PSIyNTAiIGN5PSI0NTAiIHI9IjUiLz4KICAgIDxjaXJjbGUgY3g9IjM1MCIgY3k9IjQ1MCIgcj0iNSIvPgogICAgPGNpcmNsZSBjeD0iNDUwIiBjeT0iNDUwIiByPSI1Ii8+CiAgPC9nPgogIAogIDwhLS0gSGlnaGxpZ2h0ZWQgQ29ubmVjdGlvbnMgLS0+CiAgPGcgc3Ryb2tlPSIjNDI4N2Y1IiBzdHJva2Utd2lkdGg9IjIiPgogICAgPHBhdGggZD0iTTUwLDUwIEwxNTAsNTAgTDE1MCwxNTAgTDI1MCwxNTAgTDI1MCwyNTAiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0zNTAsMTUwIEw0NTAsMTUwIEw0NTAsMjUwIEwzNTAsMjUwIEwzNTAsMzUwIEwyNTAsMzUwIiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMTUwLDI1MCBMNTAsMjUwIEw1MCwzNTAgTDE1MCwzNTAgTDE1MCw0NTAgTDI1MCw0NTAgTDM1MCw0NTAiIGZpbGw9Im5vbmUiLz4KICA8L2c+CiAgCiAgPCEtLSBCaW5hcnkgRWxlbWVudHMgLS0+CiAgPGcgZm9udC1mYW1pbHk9IkNvdXJpZXIsIG1vbm9zcGFjZSIgZm9udC1zaXplPSI4IiBmaWxsPSIjYWFhYWFhIj4KICAgIDx0ZXh0IHg9IjIwMCIgeT0iMjUiPjAxMDAxPC90ZXh0PgogICAgPHRleHQgeD0iNDAwIiB5PSIxMjUiPjEwMTEwPC90ZXh0PgogICAgPHRleHQgeD0iMTAwIiB5PSIyMjUiPjAwMTAxPC90ZXh0PgogICAgPHRleHQgeD0iMzAwIiB5PSIzMjUiPjExMDEwPC90ZXh0PgogICAgPHRleHQgeD0iMjAwIiB5PSI0MjUiPjEwMDAxPC90ZXh0PgogIDwvZz4KPC9zdmc+");
        background-repeat: repeat;
        background-size: 500px 500px;
        background-position: center;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
initialize_session_state()

# Main page 
def main():
    # Header with robot mascot
    col1, col2 = st.columns([1, 3])
    
    with col1:
        if os.path.exists("assets/images/robot_mascot.svg"):
            with open("assets/images/robot_mascot.svg", "r") as f:
                robot_svg = f.read()
                st.markdown(f"""
                <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                    {robot_svg}
                </div>
                """, unsafe_allow_html=True)
        else:
            st.image("https://via.placeholder.com/200x240.png?text=Byte", width=200)
    
    with col2:
        st.title("Welcome to KidAI Academy!")
        st.markdown("""
        <div style="background-color: rgba(255, 255, 255, 0.7); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Discover the amazing world of Artificial Intelligence through fun games and adventures!</h3>
            <p style="font-size: 18px;">👋 Hello, future AI experts! I'm <b>Byte</b>, your robot guide to the world of AI.</p>
            <p>At KidAI Academy, we make complex AI concepts simple and fun! Learn about machine learning, neural networks, computer vision, and more through interactive games and challenges.</p>
        </div>
        """, unsafe_allow_html=True)
    
    # Display robot guide welcome message
    display_robot_guide("Welcome to KidAI Academy! Let's learn about AI together!")
    
    # Main content
    st.markdown("## Start Your AI Adventure!")
    
    # Feature boxes
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="feature-card">
            <h3 style="color: #4287f5;">🧠 Learn AI Basics</h3>
            <p>Discover what AI is and how it works through fun, interactive lessons.</p>
            <ul>
                <li>Explore AI Algorithms</li>
                <li>Understand Machine Learning</li>
                <li>Dive into Neural Networks</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        st.button("Start Learning", key="learn_basics", on_click=lambda: st.switch_page("pages/1_Learn_AI_Basics.py"))
    
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h3 style="color: #4287f5;">🎮 Fun Coding Games</h3>
            <p>Play games that teach you how to code and create your own AI!</p>
            <ul>
                <li>Sorting Game Challenge</li>
                <li>Pattern Recognition</li>
                <li>Robot Maze Programming</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        st.button("Play Games", key="coding_games", on_click=lambda: st.switch_page("pages/2_Fun_Coding_Games.py"))
    
    with col3:
        st.markdown("""
        <div class="feature-card">
            <h3 style="color: #4287f5;">🚀 AI Adventures</h3>
            <p>Join Byte on exciting adventures to solve problems using AI.</p>
            <ul>
                <li>Image Detective Challenge</li>
                <li>Smart City Builder</li>
                <li>Robot Friend Designer</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
        st.button("Start Adventure", key="ai_adventures", on_click=lambda: st.switch_page("pages/3_AI_Adventures.py"))
    
    # Featured content
    st.markdown("## What You'll Learn")
    
    tab1, tab2, tab3, tab4 = st.tabs(["AI Algorithms", "Machine Learning", "AI Safety", "Deep Learning"])
    
    with tab1:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### What are AI Algorithms?
            
            An algorithm is a set of rules or instructions that a computer follows to solve a problem.
            
            In AI, algorithms help computers make decisions and learn from information!
            
            #### Examples of AI Algorithms:
            - Decision Trees - Help make choices step by step
            - Clustering - Group similar things together
            - Neural Networks - Brain-inspired computing
            """)
        with col2:
            if os.path.exists("assets/images/ai_algorithms.svg"):
                with open("assets/images/ai_algorithms.svg", "r") as f:
                    svg_content = f.read()
                    st.markdown(f"""
                    <div style="display: flex; justify-content: center; height: 100%;">
                        {svg_content}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.image("https://via.placeholder.com/400x200.png?text=AI+Algorithms", use_column_width=True)
    
    with tab2:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### Machine Learning
            
            Machine Learning is how computers learn from examples instead of being explicitly programmed.
            
            It's like how you learn to recognize cats after seeing many pictures of cats!
            
            #### Types of Machine Learning:
            - Supervised Learning - Learning with a teacher
            - Unsupervised Learning - Finding patterns without guidance
            - Reinforcement Learning - Learning through trial and error
            """)
        with col2:
            if os.path.exists("assets/images/badge_ml_master.svg"):
                with open("assets/images/badge_ml_master.svg", "r") as f:
                    svg_content = f.read()
                    st.markdown(f"""
                    <div style="display: flex; justify-content: center; height: 100%;">
                        {svg_content}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.image("https://via.placeholder.com/400x200.png?text=Machine+Learning", use_column_width=True)
    
    with tab3:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### AI Safety
            
            Learn why it's important to create AI that is helpful, harmless, and honest.
            
            Discover the rules that help keep AI safe for everyone!
            
            #### AI Safety Principles:
            - Transparency - Understanding how AI makes decisions
            - Privacy - Protecting personal information
            - Fairness - Ensuring AI treats everyone equally
            - Human Control - Keeping humans in charge of AI systems
            """)
        with col2:
            if os.path.exists("assets/images/badge_code_genius.svg"):
                with open("assets/images/badge_code_genius.svg", "r") as f:
                    svg_content = f.read()
                    st.markdown(f"""
                    <div style="display: flex; justify-content: center; height: 100%;">
                        {svg_content}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.image("https://via.placeholder.com/400x200.png?text=AI+Safety", use_column_width=True)
    
    with tab4:
        col1, col2 = st.columns([1, 1])
        with col1:
            st.markdown("""
            ### Deep Learning
            
            Deep Learning uses special computer networks that work a bit like the human brain!
            
            These networks can recognize patterns in images, sounds, and text.
            
            #### Deep Learning Applications:
            - Image Recognition - Identifying objects in pictures
            - Natural Language Processing - Understanding human language
            - Speech Recognition - Converting spoken words to text
            - Game Playing - Mastering complex games like chess
            """)
        with col2:
            if os.path.exists("assets/images/badge_vision_hero.svg"):
                with open("assets/images/badge_vision_hero.svg", "r") as f:
                    svg_content = f.read()
                    st.markdown(f"""
                    <div style="display: flex; justify-content: center; height: 100%;">
                        {svg_content}
                    </div>
                    """, unsafe_allow_html=True)
            else:
                st.image("https://via.placeholder.com/400x200.png?text=Deep+Learning", use_column_width=True)
    
    # Featured books
    st.markdown("## AI Books for Kids")
    
    # Book data
    books = [
        {
            "title": "Introduction to AI",
            "cover_color": "#4287f5",
            "description": "A fun introduction to AI concepts for beginners."
        },
        {
            "title": "Brainy Bots",
            "cover_color": "#f542a7",
            "description": "20+ AI algorithm adventures for curious minds."
        },
        {
            "title": "Fantastic Futures",
            "cover_color": "#42f59e",
            "description": "The adventures of AI in our changing world."
        },
        {
            "title": "Building AI",
            "cover_color": "#f5a742",
            "description": "A block-by-block adventure in coding."
        }
    ]
    
    # Display books in columns
    book_cols = st.columns(4)
    
    for i, book in enumerate(books):
        with book_cols[i]:
            st.markdown(f"""
            <div class="book-card">
                <div class="book-cover" style="background-color: {book['cover_color']}; height: 180px; display: flex; justify-content: center; align-items: center;">
                    <h3 style="color: white; margin: 0; padding: 10px; text-align: center;">{book['title']}</h3>
                </div>
                <h4>{book['title']}</h4>
                <p>{book['description']}</p>
            </div>
            """, unsafe_allow_html=True)
    
    # Footer
    st.markdown("---")
    st.markdown("© 2025 KidAI Academy | Made with ❤️ for young learners")

# Sidebar
with st.sidebar:
    # Logo
    if os.path.exists("assets/images/kidai_logo.svg"):
        with open("assets/images/kidai_logo.svg", "r") as f:
            logo_svg = f.read()
            st.markdown(f"""
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                {logo_svg}
            </div>
            """, unsafe_allow_html=True)
    else:
        st.image("https://via.placeholder.com/150x150.png?text=KidAI+Logo", use_column_width=True)
    
    # User welcome or login
    if "user_name" not in st.session_state or not st.session_state["user_name"]:
        st.markdown("""
        <div style="background-color: #e6f2ff; padding: 15px; border-radius: 10px; margin-bottom: 15px; text-align: center;">
            <h3 style="margin-top: 0;">Welcome, Explorer!</h3>
            <p>Join our AI adventure by entering your name below.</p>
        </div>
        """, unsafe_allow_html=True)
        
        with st.form("name_form"):
            name = st.text_input("What's your name?")
            submit = st.form_submit_button("Let's Go!")
            if submit and name:
                st.session_state["user_name"] = name
                # Add "Beginner" badge automatically
                if "badges" not in st.session_state:
                    st.session_state["badges"] = []
                if "badges_count" not in st.session_state:
                    st.session_state["badges_count"] = 0
                if "Beginner" not in st.session_state["badges"]:
                    st.session_state["badges"].append("Beginner")
                    st.session_state["badges_count"] = len(st.session_state["badges"])
                st.rerun()
    else:
        # User profile section
        st.markdown(f"""
        <div style="background-color: #e6f2ff; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <h3 style="margin-top: 0;">Hi, {st.session_state['user_name']}! 👋</h3>
        </div>
        """, unsafe_allow_html=True)
        
        # Display user level and progress
        st.markdown("### Your Progress")
        st.progress(st.session_state.get("progress", 0), "Learning Progress")
        
        # Level and badges summary
        level_colors = {
            "Beginner": "#4CAF50",
            "Learner": "#2196F3",
            "Explorer": "#FF9800",
            "Genius": "#9C27B0"
        }
        current_level = st.session_state.get("level", "Beginner")
        level_color = level_colors.get(current_level, "#607D8B")
        
        st.markdown(f"""
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
            <div>
                <span style="font-weight: bold;">Level:</span>
            </div>
            <div style="background-color: {level_color}; color: white; padding: 3px 10px; border-radius: 15px; font-size: 14px;">
                {current_level}
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
            <div>
                <span style="font-weight: bold;">Badges:</span>
            </div>
            <div style="background-color: #4287f5; color: white; padding: 3px 10px; border-radius: 15px; font-size: 14px;">
                {st.session_state.get('badges_count', 0)}/10
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        # Show earned badges
        if st.session_state.get("badges_count", 0) > 0:
            st.markdown("### Your Badges")
            badges = st.session_state.get("badges", [])
            
            # Display badges using SVG images if available
            badge_paths = {
                "Beginner": None,  # Default style
                "Learner": None,  # Default style
                "Explorer": "assets/images/badge_ai_explorer.svg",
                "Genius": None,  # Default style
                "Sorting Master": None,  # Default style
                "Pattern Spotter": None,  # Default style
                "Robot Programmer": None,  # Default style
                "AI Basics Expert": None,  # Default style
                "Machine Learning Pro": "assets/images/badge_ml_master.svg",
                "Computer Vision Expert": "assets/images/badge_vision_hero.svg",
                "NLP Wizard": "assets/images/badge_nlp_wizard.svg",
                "Code Genius": "assets/images/badge_code_genius.svg"
            }
            
            # Create badge display using 2 columns grid
            badge_cols = st.columns(2)
            
            # Default badge style function
            def get_default_badge_style(badge_name):
                badge_styles = {
                    "Beginner": {"color": "#4CAF50", "icon": "🌱"},
                    "Learner": {"color": "#2196F3", "icon": "📚"},
                    "Explorer": {"color": "#FF9800", "icon": "🔍"},
                    "Genius": {"color": "#9C27B0", "icon": "🧠"},
                    "Sorting Master": {"color": "#E91E63", "icon": "🔄"},
                    "Pattern Spotter": {"color": "#3F51B5", "icon": "👁️"},
                    "Robot Programmer": {"color": "#FF5722", "icon": "🤖"},
                    "AI Basics Expert": {"color": "#009688", "icon": "🎓"},
                    "Machine Learning Pro": {"color": "#673AB7", "icon": "📊"},
                    "Creative Coder": {"color": "#795548", "icon": "💻"}
                }
                
                style = badge_styles.get(badge_name, {"color": "#607D8B", "icon": "🏆"})
                return f"""
                <div style="background-color: {style['color']}; 
                            border-radius: 50%; 
                            width: 40px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 18px;
                            margin: 0 auto 5px auto;">
                    {style['icon']}
                </div>
                <div style="text-align: center; font-size: 10px; margin-bottom: 10px;">{badge_name}</div>
                """
            
            # Display each badge
            for i, badge in enumerate(badges):
                with badge_cols[i % 2]:
                    badge_path = badge_paths.get(badge, None)
                    
                    if badge_path and os.path.exists(badge_path):
                        # Display SVG badge
                        with open(badge_path, "r") as f:
                            badge_svg = f.read()
                            st.markdown(f"""
                            <div style="text-align: center; margin-bottom: 10px;">
                                <div style="max-width: 60px; margin: 0 auto;">
                                    {badge_svg}
                                </div>
                                <div style="font-size: 10px; margin-top: 5px;">{badge}</div>
                            </div>
                            """, unsafe_allow_html=True)
                    else:
                        # Display default style badge
                        st.markdown(get_default_badge_style(badge), unsafe_allow_html=True)
        
        # Navigation
        st.markdown("## Navigate")
        st.page_link("app.py", label="🏠 Home", icon="house")
        st.page_link("pages/1_Learn_AI_Basics.py", label="🧠 Learn AI Basics", icon="book")
        st.page_link("pages/2_Fun_Coding_Games.py", label="🎮 Coding Games", icon="joystick")
        st.page_link("pages/3_AI_Adventures.py", label="🚀 AI Adventures", icon="rocket")
        st.page_link("pages/5_AI_Playground.py", label="🎯 AI Playground", icon="lightbulb")
        
        # For parents and teachers
        st.markdown("---")
        st.page_link("pages/4_Parent_Dashboard.py", label="👨‍👩‍👧‍👦 Parent Dashboard", icon="people")
        
        # Reset option (for testing)
        with st.expander("Developer Options"):
            if st.button("Reset Progress"):
                for key in list(st.session_state.keys()):
                    if key != "user_name":
                        if key in st.session_state:
                            del st.session_state[key]
                st.session_state["progress"] = 0
                st.session_state["level"] = "Beginner"
                st.session_state["badges"] = ["Beginner"]
                st.session_state["badges_count"] = 1
                st.rerun()

if __name__ == "__main__":
    main()
