import streamlit as st
import random

def initialize_rewards():
    """Initialize the reward system in session state"""
    if 'points' not in st.session_state:
        st.session_state.points = 0
    if 'badges' not in st.session_state:
        st.session_state.badges = []
    if 'level' not in st.session_state:
        st.session_state.level = 1

def display_rewards():
    """Display the user's rewards and progress"""
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col1:
        st.metric("Points", st.session_state.points)
    
    with col2:
        progress = (st.session_state.points % 100) / 100
        st.progress(progress)
        st.caption(f"Level {st.session_state.level}: {int(progress * 100)}% to next level")
    
    with col3:
        if st.session_state.badges:
            st.write("Badges:")
            badges_text = " ".join(st.session_state.badges)
            st.markdown(f"<h3 style='text-align: center;'>{badges_text}</h3>", unsafe_allow_html=True)
        else:
            st.write("Complete activities to earn badges!")

def award_points(points, reason=""):
    """Award points to the user with animation"""
    st.session_state.points += points
    
    # Level up if reached 100 points
    if st.session_state.points >= st.session_state.level * 100:
        st.session_state.level += 1
        st.balloons()
        st.success(f"🎉 LEVEL UP! You're now level {st.session_state.level}!")
    
    st.success(f"🌟 You earned {points} points! {reason}")

def award_badge(badge_emoji, badge_name):
    """Award a badge to the user"""
    if badge_emoji not in st.session_state.badges:
        st.session_state.badges.append(badge_emoji)
        st.balloons()
        st.success(f"🏆 NEW BADGE! You earned the {badge_name} badge!")
