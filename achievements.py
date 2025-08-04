import streamlit as st
import time
import random

def display_achievements():
    """Display the user's achievement dashboard"""
    st.markdown("## Your Achievements")
    
    # Get user achievements
    achievements = st.session_state.get("achievements", [])
    total_achievements = len(get_all_achievements())
    unlocked_achievements = len(achievements)
    
    # Display progress
    st.markdown(f"""
    <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div style="font-weight: bold; color: #333;">Achievement Progress</div>
            <div style="color: #4287f5; font-weight: bold;">{unlocked_achievements}/{total_achievements}</div>
        </div>
        <div style="height: 10px; background-color: #e0e0e0; border-radius: 5px; overflow: hidden;">
            <div style="height: 100%; width: {(unlocked_achievements/total_achievements)*100}%; background: linear-gradient(90deg, #4CAF50, #2196F3); border-radius: 5px;"></div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Display achievements in a grid
    col1, col2 = st.columns(2)
    
    all_achievements = get_all_achievements()
    for i, achievement in enumerate(all_achievements):
        is_unlocked = achievement["id"] in achievements
        if i % 2 == 0:
            with col1:
                display_achievement_card(achievement, is_unlocked)
        else:
            with col2:
                display_achievement_card(achievement, is_unlocked)
    
    # Display achievement tips
    st.markdown("""
    <div style="background-color: rgba(66, 135, 245, 0.1); 
                border-left: 4px solid #4287f5; 
                padding: 15px; 
                border-radius: 4px; 
                margin-top: 20px;">
        <div style="font-weight: bold; color: #4287f5; margin-bottom: 5px;">Achievement Tips</div>
        <p style="margin: 0; font-size: 14px; color: #333;">
            Keep learning and playing to unlock more achievements! 
            Complete lessons, games, and adventures to earn special badges and rewards.
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Add secret achievement feature
    if st.button("Hunt for Secret Achievements", type="primary"):
        with st.spinner("Searching for hidden achievements..."):
            time.sleep(2)
            unlock_random_achievement()

def display_achievement_card(achievement, is_unlocked):
    """Display a single achievement card"""
    card_style = """
        background-color: white;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        position: relative;
        overflow: hidden;
        border: 2px solid {border_color};
        transition: all 0.3s ease;
    """
    
    icon_style = """
        width: 50px;
        height: 50px;
        background-color: {bg_color};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        margin-right: 15px;
        color: white;
        flex-shrink: 0;
    """
    
    if is_unlocked:
        border_color = achievement["color"]
        bg_color = achievement["color"]
        opacity = "1"
        title_color = "#333"
        icon = achievement["icon"]
        grayscale = ""
        locked_icon = ""
    else:
        border_color = "#e0e0e0"
        bg_color = "#9e9e9e"
        opacity = "0.7"
        title_color = "#9e9e9e"
        icon = "❓"
        grayscale = "filter: grayscale(100%);"
        locked_icon = """
        <div style="position: absolute; top: 10px; right: 10px; color: #9e9e9e; font-size: 18px;">🔒</div>
        """
    
    st.markdown(f"""
    <div style="{card_style.format(border_color=border_color)}; {grayscale}; opacity: {opacity};">
        {locked_icon}
        <div style="display: flex; align-items: center;">
            <div style="{icon_style.format(bg_color=bg_color)}">
                {icon}
            </div>
            <div>
                <div style="font-weight: bold; color: {title_color}; margin-bottom: 5px;">{achievement["name"]}</div>
                <div style="font-size: 12px; color: #666;">{achievement["description"] if is_unlocked else "This achievement is still locked"}</div>
            </div>
        </div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, {achievement["color"]} 0%, rgba(255,255,255,0) 100%);"></div>
    </div>
    """, unsafe_allow_html=True)

def get_all_achievements():
    """Get all possible achievements"""
    return [
        {
            "id": "first_login",
            "name": "First Steps",
            "description": "Log in to the AI Academy for the first time",
            "icon": "👶",
            "color": "#4CAF50"
        },
        {
            "id": "complete_lesson",
            "name": "Curious Mind",
            "description": "Complete your first AI lesson",
            "icon": "📚",
            "color": "#2196F3"
        },
        {
            "id": "ace_quiz",
            "name": "Quiz Whiz",
            "description": "Get a perfect score on any quiz",
            "icon": "🎯",
            "color": "#FF9800"
        },
        {
            "id": "complete_game",
            "name": "Playful Learner",
            "description": "Complete your first coding game",
            "icon": "🎮",
            "color": "#9C27B0"
        },
        {
            "id": "complete_adventure",
            "name": "Adventurer",
            "description": "Finish your first AI adventure",
            "icon": "🚀",
            "color": "#E91E63"
        },
        {
            "id": "share_project",
            "name": "Proud Creator",
            "description": "Share one of your AI projects",
            "icon": "🌟",
            "color": "#3F51B5"
        },
        {
            "id": "login_streak",
            "name": "Dedicated Learner",
            "description": "Log in for 5 consecutive days",
            "icon": "🔥",
            "color": "#FF5722"
        },
        {
            "id": "all_lessons",
            "name": "Knowledge Seeker",
            "description": "Complete all basic AI lessons",
            "icon": "🧠",
            "color": "#009688"
        },
        {
            "id": "all_games",
            "name": "Game Master",
            "description": "Complete all coding games",
            "icon": "🏆",
            "color": "#FFC107"
        },
        {
            "id": "create_ai",
            "name": "AI Creator",
            "description": "Create your first AI model",
            "icon": "🤖",
            "color": "#607D8B"
        },
        {
            "id": "help_friend",
            "name": "AI Ambassador",
            "description": "Introduce a friend to AI concepts",
            "icon": "🤝",
            "color": "#8BC34A"
        },
        {
            "id": "secret_achievement",
            "name": "Curious Explorer",
            "description": "Discover a hidden feature in the academy",
            "icon": "🔍",
            "color": "#673AB7"
        }
    ]

def unlock_achievement(achievement_id):
    """Unlock a specific achievement for the user"""
    if "achievements" not in st.session_state:
        st.session_state["achievements"] = []
    
    if achievement_id not in st.session_state["achievements"]:
        st.session_state["achievements"].append(achievement_id)
        
        # Find achievement details
        all_achievements = get_all_achievements()
        achievement = next((a for a in all_achievements if a["id"] == achievement_id), None)
        
        if achievement:
            # Display achievement notification
            st.balloons()
            st.success(f"🎉 New Achievement Unlocked: {achievement['name']}!")
            
            # Update progress
            update_progress(0.05)  # Small progress boost for each achievement
            
            return True
    
    return False

def unlock_random_achievement():
    """Unlock a random achievement that the user doesn't already have"""
    if "achievements" not in st.session_state:
        st.session_state["achievements"] = []
    
    all_achievements = get_all_achievements()
    locked_achievements = [a for a in all_achievements if a["id"] not in st.session_state["achievements"]]
    
    if locked_achievements:
        # 30% chance of finding a secret achievement
        if random.random() < 0.3:
            random_achievement = random.choice(locked_achievements)
            unlock_achievement(random_achievement["id"])
        else:
            st.info("Keep exploring! You'll find a secret achievement soon.")
    else:
        st.success("Wow! You've already unlocked all achievements. You're an AI master!")

def update_progress(increment=0.1):
    """Update user progress based on achievements"""
    # Update current progress
    current_progress = st.session_state.get("progress", 0)
    new_progress = min(current_progress + increment, 1.0)  # Cap at 100%
    st.session_state["progress"] = new_progress
    
    # Update level based on progress
    if new_progress < 0.25:
        st.session_state["level"] = "Beginner"
    elif new_progress < 0.5:
        st.session_state["level"] = "Learner"
    elif new_progress < 0.75:
        st.session_state["level"] = "Explorer"
    else:
        st.session_state["level"] = "Genius"