import streamlit as st

def display_badge(badge_name):
    """Display a badge with the given name
    
    Args:
        badge_name (str): The name of the badge to display
    """
    # Define badge colors and icons based on name
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
    
    # Get style for badge or use default
    style = badge_styles.get(badge_name, {"color": "#607D8B", "icon": "🏆"})
    
    # Display the badge
    st.markdown(f"""
    <div style="background-color: {style['color']}; 
                border-radius: 20px; 
                padding: 10px; 
                margin: 5px 0;
                display: inline-block;
                color: white;
                font-weight: bold;
                text-align: center;">
        {style['icon']} {badge_name}
    </div>
    """, unsafe_allow_html=True)

def display_all_badges():
    """Display all earned badges"""
    
    badges = st.session_state.get("badges", [])
    
    if not badges:
        st.markdown("*You haven't earned any badges yet. Keep learning!*")
        return
    
    st.markdown("### Your Badges:")
    
    # Create columns for badges
    cols = st.columns(3)
    
    # Display badges in columns
    for i, badge in enumerate(badges):
        with cols[i % 3]:
            display_badge(badge)

def display_badge_showcase(badge_name, description):
    """Display a badge showcase with name, icon, and description
    
    Args:
        badge_name (str): The name of the badge
        description (str): Description of how to earn the badge
    """
    # Define badge colors and icons based on name
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
    
    # Get style for badge or use default
    style = badge_styles.get(badge_name, {"color": "#607D8B", "icon": "🏆"})
    
    # Check if user has this badge
    has_badge = badge_name in st.session_state.get("badges", [])
    
    # Display badge with opacity based on whether it's earned
    opacity = "1.0" if has_badge else "0.5"
    
    st.markdown(f"""
    <div style="display: flex; align-items: center; margin: 10px 0; opacity: {opacity};">
        <div style="background-color: {style['color']}; 
                    border-radius: 50%; 
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    margin-right: 15px;">
            {style['icon']}
        </div>
        <div>
            <div style="font-weight: bold;">{badge_name}</div>
            <div style="font-size: 14px; color: #666;">{description}</div>
        </div>
    </div>
    """, unsafe_allow_html=True)

def display_badge_gallery():
    """Display a gallery of available badges with descriptions"""
    
    st.markdown("## Badge Gallery")
    st.markdown("Complete activities and challenges to earn these badges!")
    
    # List of available badges with descriptions
    badges = [
        {
            "name": "Beginner",
            "description": "Start your AI learning journey by creating an account."
        },
        {
            "name": "Learner",
            "description": "Complete your first AI lesson."
        },
        {
            "name": "Explorer",
            "description": "Complete at least 5 different lessons."
        },
        {
            "name": "Genius",
            "description": "Reach the highest level by completing all activities."
        },
        {
            "name": "Sorting Master",
            "description": "Score 30+ points in the AI Sorting Game."
        },
        {
            "name": "Pattern Spotter",
            "description": "Reach level 5 in the Pattern Finder Game."
        },
        {
            "name": "Robot Programmer",
            "description": "Complete level 3 of the Robot Maze."
        },
        {
            "name": "AI Basics Expert",
            "description": "Score 100% in the AI Basics quiz."
        },
        {
            "name": "Machine Learning Pro",
            "description": "Complete all Machine Learning lessons."
        },
        {
            "name": "Creative Coder",
            "description": "Create your own AI project in the sandbox."
        }
    ]
    
    # Display badges in an attractive layout
    for badge in badges:
        display_badge_showcase(badge["name"], badge["description"])
