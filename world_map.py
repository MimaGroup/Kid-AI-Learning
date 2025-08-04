import streamlit as st
import numpy as np
import math

def display_world_map():
    """
    Display an interactive AI world map showing the learning journey
    with unlocked and locked zones
    """
    st.markdown("## AI Adventure World")
    
    # Get user progress
    progress = st.session_state.get("progress", 0)
    level = st.session_state.get("level", "Beginner")
    
    # Determine which zones are unlocked based on progress
    unlocked_zones = math.floor(progress * 5) + 1  # Max 5 zones
    
    # World map container with custom styling
    st.markdown("""
    <div style="background: linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%); 
                border-radius: 15px; 
                padding: 20px; 
                margin-bottom: 20px;
                box-shadow: 0 6px 24px rgba(0,0,0,0.1);
                border: 2px dashed #42a5f5;
                position: relative;
                overflow: hidden;">
        <h3 style="text-align: center; margin-bottom: 20px; color: #0277bd;">Your AI Adventure Journey</h3>
        <div style="position: absolute; top: 15px; right: 15px; background-color: #42a5f5; color: white; border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: bold;">
            Level: {level}
        </div>
    """, unsafe_allow_html=True)
    
    # Create a grid for the map zones
    col1, col2, col3 = st.columns(3)
    
    # Zone details
    zones = [
        {
            "name": "AI Basics Bay", 
            "icon": "🧠", 
            "color": "#4CAF50",
            "description": "Start your journey learning about AI fundamentals",
            "unlocked": unlocked_zones >= 1
        },
        {
            "name": "Machine Learning Mountain", 
            "icon": "⛰️", 
            "color": "#2196F3",
            "description": "Climb the peaks of machine learning algorithms",
            "unlocked": unlocked_zones >= 2
        },
        {
            "name": "Computer Vision Valley", 
            "icon": "👁️", 
            "color": "#9C27B0",
            "description": "Explore how computers can see and understand images",
            "unlocked": unlocked_zones >= 3
        },
        {
            "name": "Robotics Rapids", 
            "icon": "🤖", 
            "color": "#FF9800",
            "description": "Navigate the exciting waters of robotics",
            "unlocked": unlocked_zones >= 4
        },
        {
            "name": "AI Genius Galaxy", 
            "icon": "🌟", 
            "color": "#E91E63",
            "description": "The ultimate destination for AI masterminds",
            "unlocked": unlocked_zones >= 5
        }
    ]
    
    # Display the first row of zones
    with col1:
        display_zone(zones[0])
    with col2:
        display_zone(zones[1])
    with col3:
        display_zone(zones[2])
    
    # Display the second row of zones
    col4, col5, _ = st.columns(3)
    with col4:
        display_zone(zones[3])
    with col5:
        display_zone(zones[4])
    
    # Close the world map container
    st.markdown("</div>", unsafe_allow_html=True)
    
    # Display progress path
    st.markdown("""
    <div style="height: 8px; 
                background-color: #e0e0e0; 
                border-radius: 4px; 
                margin: 20px 0; 
                position: relative;
                overflow: hidden;">
        <div style="height: 100%; 
                    width: {}%; 
                    background: linear-gradient(90deg, #4CAF50, #2196F3, #9C27B0, #FF9800, #E91E63); 
                    border-radius: 4px;
                    transition: width 1s ease;">
        </div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #616161;">
        <div>Start</div>
        <div>AI Genius</div>
    </div>
    """.format(progress * 100), unsafe_allow_html=True)

def display_zone(zone):
    """Display a single zone on the world map"""
    locked_style = ""
    if not zone["unlocked"]:
        locked_style = """
            filter: grayscale(100%);
            opacity: 0.7;
            """
    
    st.markdown(f"""
    <div style="background-color: white;
                border-radius: 12px;
                padding: 15px;
                margin: 10px 0;
                text-align: center;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                border: 2px solid {zone['color']};
                transition: transform 0.3s, box-shadow 0.3s;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                {locked_style}">
        <div style="font-size: 40px; margin: 10px 0;">{zone['icon']}</div>
        <h4 style="margin: 10px 0; color: {zone['color']};">{zone['name']}</h4>
        <p style="font-size: 12px; color: #616161; margin-bottom: 5px;">{zone['description']}</p>
        <div style="position: absolute; 
                    bottom: 0; 
                    left: 0; 
                    width: 100%; 
                    height: 5px; 
                    background: linear-gradient(90deg, {zone['color']} 0%, rgba(255,255,255,0) 100%);">
        </div>
        {('<div style="position: absolute; top: 10px; right: 10px; color: #9e9e9e; font-size: 18px;">🔒</div>' if not zone['unlocked'] else '')}
    </div>
    """, unsafe_allow_html=True)

def start_adventure(zone_name):
    """Start an adventure in the selected zone"""
    st.session_state["current_adventure"] = zone_name
    
    # Different content based on the zone
    if zone_name == "AI Basics Bay":
        display_basics_adventure()
    elif zone_name == "Machine Learning Mountain":
        display_ml_adventure()
    elif zone_name == "Computer Vision Valley":
        display_cv_adventure()
    elif zone_name == "Robotics Rapids":
        display_robotics_adventure()
    elif zone_name == "AI Genius Galaxy":
        display_genius_adventure()

def display_basics_adventure():
    """Display content for AI Basics Bay adventure"""
    st.markdown("""
    <div class="animated-fade-in">
        <h2>Welcome to AI Basics Bay! 🧠</h2>
        <p>This is where your AI journey begins!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Adventure content here...

def display_ml_adventure():
    """Display content for Machine Learning Mountain adventure"""
    st.markdown("""
    <div class="animated-fade-in">
        <h2>Welcome to Machine Learning Mountain! ⛰️</h2>
        <p>Climb the peaks of knowledge and discover how machines learn!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Adventure content here...

def display_cv_adventure():
    """Display content for Computer Vision Valley adventure"""
    st.markdown("""
    <div class="animated-fade-in">
        <h2>Welcome to Computer Vision Valley! 👁️</h2>
        <p>Explore how computers can see and understand images!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Adventure content here...

def display_robotics_adventure():
    """Display content for Robotics Rapids adventure"""
    st.markdown("""
    <div class="animated-fade-in">
        <h2>Welcome to Robotics Rapids! 🤖</h2>
        <p>Navigate the exciting waters of robotics and automation!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Adventure content here...

def display_genius_adventure():
    """Display content for AI Genius Galaxy adventure"""
    st.markdown("""
    <div class="animated-fade-in">
        <h2>Welcome to AI Genius Galaxy! 🌟</h2>
        <p>The ultimate destination for AI masterminds!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Adventure content here...