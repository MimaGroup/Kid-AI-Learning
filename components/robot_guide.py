import streamlit as st

def display_robot_guide(message, position="center"):
    """Display the robot guide with a speech bubble containing a message.
    
    Args:
        message (str): The message the robot will display
        position (str): Position of the robot ('left', 'center', 'right')
    """
    # CSS for the robot guide
    st.markdown(f"""
    <div style="display: flex; align-items: center; justify-content: {position}; 
                background-color: #e6f2ff; padding: 10px; border-radius: 10px; margin: 10px 0;">
        <div style="min-width: 60px; margin-right: 15px;">
            <svg width="60" height="60" viewBox="0 0 100 100">
                <circle cx="50" cy="30" r="20" fill="#4287f5" />
                <rect x="30" y="50" width="40" height="40" fill="#4287f5" rx="5" />
                <circle cx="40" cy="25" r="5" fill="white" />
                <circle cx="60" cy="25" r="5" fill="white" />
                <circle cx="40" cy="25" r="2" fill="black" />
                <circle cx="60" cy="25" r="2" fill="black" />
                <path d="M 40 40 Q 50 50 60 40" stroke="white" stroke-width="2" fill="none" />
                <rect x="20" y="60" width="10" height="25" fill="#4287f5" rx="5" />
                <rect x="70" y="60" width="10" height="25" fill="#4287f5" rx="5" />
            </svg>
        </div>
        <div style="position: relative; background-color: white; padding: 10px 15px; 
                    border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); max-width: 80%;">
            <div style="position: absolute; top: 50%; left: -10px; transform: translateY(-50%); 
                        width: 0; height: 0; border-top: 10px solid transparent; 
                        border-right: 10px solid white; border-bottom: 10px solid transparent;"></div>
            <p style="margin: 0; font-size: 16px; color: #333;">{message}</p>
        </div>
    </div>
    """, unsafe_allow_html=True)

def display_robot_celebration():
    """Display the robot in a celebration pose with confetti"""
    
    st.markdown("""
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <div style="position: relative; width: 100px; height: 100px;">
            <!-- Robot with raised arms -->
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="30" r="20" fill="#4287f5" />
                <rect x="30" y="50" width="40" height="40" fill="#4287f5" rx="5" />
                <circle cx="40" cy="25" r="5" fill="white" />
                <circle cx="60" cy="25" r="5" fill="white" />
                <circle cx="40" cy="25" r="2" fill="black" />
                <circle cx="60" cy="25" r="2" fill="black" />
                <!-- Happy mouth -->
                <path d="M 40 35 Q 50 45 60 35" stroke="white" stroke-width="2" fill="none" />
                <!-- Arms raised -->
                <rect x="10" y="40" width="10" height="30" fill="#4287f5" rx="5" transform="rotate(-30, 10, 40)" />
                <rect x="80" y="40" width="10" height="30" fill="#4287f5" rx="5" transform="rotate(30, 80, 40)" />
                <rect x="20" y="60" width="10" height="25" fill="#4287f5" rx="5" />
                <rect x="70" y="60" width="10" height="25" fill="#4287f5" rx="5" />
            </svg>
            
            <!-- Confetti animation (simplified for static SVG) -->
            <svg width="100" height="100" viewBox="0 0 100 100" style="position: absolute; top: 0; left: 0;">
                <!-- Confetti pieces -->
                <rect x="10" y="10" width="5" height="5" fill="#FF5252" />
                <rect x="80" y="15" width="5" height="5" fill="#FFEB3B" />
                <rect x="30" y="5" width="5" height="5" fill="#2196F3" />
                <rect x="60" y="10" width="5" height="5" fill="#4CAF50" />
                <rect x="20" y="30" width="5" height="5" fill="#9C27B0" />
                <rect x="70" y="25" width="5" height="5" fill="#FF9800" />
                <circle cx="15" cy="20" r="3" fill="#E91E63" />
                <circle cx="85" cy="30" r="3" fill="#3F51B5" />
                <circle cx="40" cy="15" r="3" fill="#009688" />
                <circle cx="65" cy="20" r="3" fill="#FFC107" />
            </svg>
        </div>
    </div>
    
    <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #4287f5;">Great Job! 🎉</h2>
    </div>
    """, unsafe_allow_html=True)

def display_robot_thinking():
    """Display the robot in a thinking pose"""
    
    st.markdown("""
    <div style="display: flex; justify-content: center; margin: 20px 0;">
        <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="30" r="20" fill="#4287f5" />
            <rect x="30" y="50" width="40" height="40" fill="#4287f5" rx="5" />
            <circle cx="40" cy="25" r="5" fill="white" />
            <circle cx="60" cy="25" r="5" fill="white" />
            <circle cx="40" cy="25" r="2" fill="black" />
            <circle cx="60" cy="25" r="2" fill="black" />
            <!-- Thinking mouth (straight line) -->
            <line x1="40" y1="40" x2="60" y2="40" stroke="white" stroke-width="2" />
            <!-- Hand on chin -->
            <rect x="70" y="30" width="10" height="30" fill="#4287f5" rx="5" transform="rotate(60, 70, 30)" />
            <rect x="20" y="60" width="10" height="25" fill="#4287f5" rx="5" />
            <rect x="70" y="60" width="10" height="25" fill="#4287f5" rx="5" />
            <!-- Thought bubble -->
            <circle cx="75" cy="15" r="3" fill="white" />
            <circle cx="80" cy="10" r="5" fill="white" />
            <circle cx="90" cy="5" r="7" fill="white" />
        </svg>
    </div>
    """, unsafe_allow_html=True)
