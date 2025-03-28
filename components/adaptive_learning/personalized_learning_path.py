import streamlit as st
import plotly.graph_objects as go

def display_personalized_learning_path():
    """
    Display personalized learning paths based on child's progress
    including customized recommendations and adaptive content difficulty
    """
    st.markdown("""
    <div style="background-color: #f5e6ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <p>Your personalized learning journey, tailored to your interests and learning style!</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Initialize learning path data if not already present
    initialize_learning_path_data()
    
    # Display learning journey map
    display_learning_journey_map()
    
    # Display next steps
    display_next_steps()
    
    # Learning style and interests
    st.markdown("### Your Learning Profile")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Learning Style")
        learning_style = st.session_state.learning_style
        st.selectbox(
            "How do you prefer to learn?",
            ["Visual", "Hands-on", "Reading/Writing", "Social"],
            index=["Visual", "Hands-on", "Reading/Writing", "Social"].index(learning_style),
            key="learning_style_select",
            on_change=update_learning_style
        )
        
        st.markdown("#### Learning Speed")
        learning_speed = st.session_state.learning_speed
        st.select_slider(
            "How quickly do you like to move through lessons?",
            options=["Very Gradually", "Gradually", "Moderate", "Quickly", "Very Quickly"],
            value=learning_speed,
            key="learning_speed_select",
            on_change=update_learning_speed
        )
    
    with col2:
        st.markdown("#### Focus Areas")
        interests = st.session_state.interests
        
        all_interests = ["Robotics", "Games", "Art", "Science", "Stories", "Nature", "Space", "Animals"]
        selected_interests = st.multiselect(
            "What topics interest you the most?",
            all_interests,
            default=interests,
            key="interests_select",
            on_change=update_interests
        )
        
        st.markdown("#### Preferred Activities")
        activity_preference = st.session_state.activity_preference
        st.radio(
            "What kind of activities do you prefer?",
            ["Creative Building", "Puzzles & Challenges", "Games", "Stories & Reading", "Mixed"],
            index=["Creative Building", "Puzzles & Challenges", "Games", "Stories & Reading", "Mixed"].index(activity_preference),
            key="activity_preference_select", 
            horizontal=True,
            on_change=update_activity_preference
        )
    
    # Display learning stats
    display_learning_stats()
    
    # Display badge progress
    display_badge_progress()
    
    # Display custom recommendations
    display_custom_recommendations()

def initialize_learning_path_data():
    """Initialize sample learning path data if not present"""
    if "learning_path_progress" not in st.session_state:
        st.session_state.learning_path_progress = {
            "AI Basics": 0.8,
            "Machine Learning": 0.4,
            "Computer Vision": 0.2,
            "Natural Language": 0.1,
            "Robotics": 0.3,
            "Creative AI": 0.15
        }
    
    if "learning_style" not in st.session_state:
        st.session_state.learning_style = "Visual"
    
    if "learning_speed" not in st.session_state:
        st.session_state.learning_speed = "Moderate"
    
    if "interests" not in st.session_state:
        st.session_state.interests = ["Robotics", "Games", "Space"]
    
    if "activity_preference" not in st.session_state:
        st.session_state.activity_preference = "Mixed"
    
    if "badge_progress" not in st.session_state:
        st.session_state.badge_progress = {
            "AI Explorer": 0.7,
            "Code Genius": 0.4,
            "ML Master": 0.3,
            "Vision Hero": 0.2,
            "NLP Wizard": 0.1
        }
    
    if "learning_stats" not in st.session_state:
        st.session_state.learning_stats = {
            "lessons_completed": 8,
            "lessons_total": 20,
            "avg_time_per_lesson": 15,  # minutes
            "favorite_topic": "Robotics",
            "challenge_topic": "Natural Language"
        }

def display_learning_journey_map():
    """Display an interactive map of the learning journey"""
    st.markdown("### Your Learning Journey Map")
    
    # Create a progress gauge chart to show overall progress
    fig = go.Figure(go.Indicator(
        mode = "gauge+number",
        value = 35,
        title = {'text': "Overall Learning Progress"},
        gauge = {
            'axis': {'range': [0, 100], 'tickwidth': 1},
            'bar': {'color': "#9C6DF2"},
            'steps': [
                {'range': [0, 33], 'color': "#e6e6ff"},
                {'range': [33, 66], 'color': "#d9d9ff"},
                {'range': [66, 100], 'color': "#ccccff"}
            ]
        }
    ))
    
    fig.update_layout(height=250)
    st.plotly_chart(fig, use_container_width=True)
    
    # Display a progress bar for each learning path area
    st.markdown("#### Progress by Topic Area")
    
    for topic, progress in st.session_state.learning_path_progress.items():
        col1, col2, col3 = st.columns([3, 6, 1])
        with col1:
            st.markdown(f"**{topic}**")
        with col2:
            st.progress(progress)
        with col3:
            st.markdown(f"**{int(progress*100)}%**")

def display_next_steps():
    """Display recommended next steps on the learning path"""
    st.markdown("### Recommended Next Steps")
    
    # Identify next steps based on progress and interests
    progress = st.session_state.learning_path_progress
    interests = st.session_state.interests
    learning_style = st.session_state.learning_style
    
    # Find the area with moderate progress for next focus
    next_topics = []
    for topic, prog in progress.items():
        if 0.1 < prog < 0.7:
            next_topics.append((topic, prog))
    
    # Sort by progress (focus on areas started but not completed)
    next_topics.sort(key=lambda x: x[1])
    
    # Display recommendations
    if next_topics:
        # Display the top 3 recommended next activities
        for i, (topic, prog) in enumerate(next_topics[:3]):
            activity_type = get_activity_type(learning_style)
            
            st.markdown(f"""
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 10px; background-color: #f8f9fa;">
                <h4 style="margin-top: 0;">Step {i+1}: Continue with {topic}</h4>
                <p>Try a <strong>{activity_type}</strong> activity to explore {topic} concepts</p>
                <div style="display: flex; align-items: center;">
                    <div style="background-color: #9C6DF2; color: white; border-radius: 20px; padding: 5px 15px; font-size: 14px;">
                        {int(prog*100)}% Complete
                    </div>
                    <div style="margin-left: 15px;">
                        <button style="background-color: #4CAF50; color: white; border: none; padding: 5px 15px; border-radius: 5px; cursor: pointer;">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("Complete some activities to get personalized recommendations!")

def display_learning_stats():
    """Display learning statistics"""
    st.markdown("### Your Learning Stats")
    
    stats = st.session_state.learning_stats
    
    # Create metrics in columns
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Lessons Completed", f"{stats['lessons_completed']}/{stats['lessons_total']}")
    
    with col2:
        st.metric("Average Time per Lesson", f"{stats['avg_time_per_lesson']} min")
    
    with col3:
        st.metric("Favorite Topic", stats['favorite_topic'])
    
    # Add a note about strengths and areas to work on
    st.markdown(f"""
    <div style="background-color: #e6fffa; padding: 15px; border-radius: 10px; margin-top: 15px;">
        <p><strong>💪 Your Strength:</strong> You're doing great with {stats['favorite_topic']}!</p>
        <p><strong>🌱 Area to Grow:</strong> Try spending more time on {stats['challenge_topic']} activities.</p>
    </div>
    """, unsafe_allow_html=True)

def display_badge_progress():
    """Display badge collection progress"""
    st.markdown("### Your Badge Collection Progress")
    
    # Create badge progress bars
    badge_cols = st.columns(len(st.session_state.badge_progress))
    
    for i, (badge, progress) in enumerate(st.session_state.badge_progress.items()):
        with badge_cols[i]:
            # Badge circle with progress
            if progress >= 1.0:
                circle_color = "#4CAF50"  # green for completed
                icon = "✅"
            elif progress >= 0.5:
                circle_color = "#FF9800"  # orange for in progress
                icon = "🔶"
            else:
                circle_color = "#9E9E9E"  # gray for just started
                icon = "⭐"
            
            st.markdown(f"""
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: {circle_color}; display: flex; justify-content: center; align-items: center; font-size: 24px;">
                    {icon}
                </div>
                <p style="margin-top: 5px; font-weight: bold;">{badge}</p>
                <div style="width: 100%; background-color: #f0f0f0; border-radius: 10px; height: 10px; margin-top: 5px;">
                    <div style="width: {int(progress*100)}%; height: 100%; background-color: {circle_color}; border-radius: 10px;"></div>
                </div>
                <p style="margin-top: 5px;">{int(progress*100)}%</p>
            </div>
            """, unsafe_allow_html=True)

def display_custom_recommendations():
    """Display custom recommendations based on learning style and interests"""
    st.markdown("### Personalized Activity Suggestions")
    
    learning_style = st.session_state.learning_style
    interests = st.session_state.interests
    progress = st.session_state.learning_path_progress
    
    # Generate suggestions based on learning style and interests
    suggestions = generate_personalized_suggestions(learning_style, interests, progress)
    
    # Display suggestions
    for i, suggestion in enumerate(suggestions[:3]):  # Show top 3 suggestions
        st.markdown(f"""
        <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 15px; background-color: {suggestion.get('color', '#f8f9fa')};">
            <h4 style="margin-top: 0;">{suggestion['title']}</h4>
            <p>{suggestion['description']}</p>
            <div style="margin-top: 10px;">
                <span style="background-color: rgba(0,0,0,0.1); padding: 3px 10px; border-radius: 15px; font-size: 12px; margin-right: 5px;">
                    {suggestion['category']}
                </span>
                <span style="background-color: rgba(0,0,0,0.1); padding: 3px 10px; border-radius: 15px; font-size: 12px;">
                    {suggestion['time']}
                </span>
            </div>
        </div>
        """, unsafe_allow_html=True)

def generate_personalized_suggestions(learning_style, focus_areas, progress):
    """
    Generate personalized activity suggestions based on learning preferences
    
    Args:
        learning_style (str): The user's preferred learning style
        focus_areas (list): List of the user's focus areas/interests
        progress (dict): The user's current progress data
        
    Returns:
        list: List of suggested activities
    """
    suggestions = []
    
    # Add style-based recommendation
    style_rec = get_style_based_recommendation(learning_style)
    if style_rec:
        suggestions.append(style_rec)
    
    # Add interest-based recommendations
    if focus_areas:
        primary_interest = focus_areas[0]
        interest_rec = get_interest_based_recommendation(primary_interest)
        if interest_rec:
            suggestions.append(interest_rec)
    
    # Add recommendation for area with lowest progress
    lowest_topic = min(progress.items(), key=lambda x: x[1])
    if lowest_topic:
        suggestions.append({
            'title': f"Explore {lowest_topic[0]} Fundamentals",
            'description': f"Build your knowledge in {lowest_topic[0]} with this beginner-friendly activity designed to help you master the basics.",
            'category': lowest_topic[0],
            'time': "15-20 min",
            'color': '#e6f9ff'
        })
    
    # Add some general recommendations
    general_suggestions = [
        {
            'title': "AI Ethics Challenge",
            'description': "Test your understanding of ethical AI use through a series of scenario-based questions.",
            'category': "Ethics",
            'time': "10-15 min",
            'color': '#fff9e6'
        },
        {
            'title': "Create Your AI Story",
            'description': "Use our AI story generator to craft a tale about robots and technology.",
            'category': "Creative",
            'time': "20-25 min",
            'color': '#f9e6ff'
        },
        {
            'title': "Sorting Algorithm Race",
            'description': "Race different sorting algorithms to see which is fastest with different data sets.",
            'category': "Algorithms",
            'time': "10-15 min",
            'color': '#e6ffe6'
        }
    ]
    
    # Add remaining general suggestions as needed
    for suggestion in general_suggestions:
        if len(suggestions) < 5:  # Ensure we have up to 5 suggestions
            suggestions.append(suggestion)
    
    return suggestions

def get_style_based_recommendation(learning_style):
    """
    Get a recommendation based on learning style
    
    Args:
        learning_style (str): The user's preferred learning style
        
    Returns:
        dict: A recommendation tailored to the learning style
    """
    style_recommendations = {
        "Visual": {
            'title': "Neural Network Visualizer",
            'description': "See how neural networks process information through an interactive visualization tool.",
            'category': "Visual Learning",
            'time': "15-20 min",
            'color': '#e6f5ff'
        },
        "Hands-on": {
            'title': "Build Your Own Chatbot",
            'description': "Create a simple chatbot that can answer questions about your favorite topics.",
            'category': "Interactive",
            'time': "25-30 min",
            'color': '#ffe6e6'
        },
        "Reading/Writing": {
            'title': "AI Concepts Journal",
            'description': "Document your understanding of key AI concepts and create your own explanations.",
            'category': "Writing",
            'time': "15-20 min",
            'color': '#f0f0f0'
        },
        "Social": {
            'title': "AI Debate Club",
            'description': "Join a virtual discussion about the benefits and challenges of AI in everyday life.",
            'category': "Discussion",
            'time': "20-25 min",
            'color': '#e6ffe6'
        }
    }
    
    return style_recommendations.get(learning_style, None)

def get_interest_based_recommendation(interest):
    """
    Get a recommendation based on primary interest
    
    Args:
        interest (str): The user's primary interest area
        
    Returns:
        dict: A recommendation tailored to the interest
    """
    interest_recommendations = {
        "Robotics": {
            'title': "Virtual Robot Programming",
            'description': "Program a virtual robot to navigate through an obstacle course using simple commands.",
            'category': "Robotics",
            'time': "20-25 min",
            'color': '#e6f9ff'
        },
        "Games": {
            'title': "AI Game Character Design",
            'description': "Design a game character with AI-powered abilities and test it in a simple game environment.",
            'category': "Game Design",
            'time': "25-30 min",
            'color': '#ffe6f9'
        },
        "Art": {
            'title': "AI Art Generator",
            'description': "Create digital artwork using a simplified AI art generation tool based on your descriptions.",
            'category': "Creative",
            'time': "15-20 min",
            'color': '#fff5e6'
        },
        "Science": {
            'title': "AI in Scientific Discovery",
            'description': "Explore how AI helps scientists analyze data and make predictions through interactive simulations.",
            'category': "Science",
            'time': "20-25 min",
            'color': '#e6fffa'
        },
        "Space": {
            'title': "Space Exploration with AI",
            'description': "See how AI helps astronauts and spacecraft navigate and make discoveries in space.",
            'category': "Space",
            'time': "15-20 min",
            'color': '#e6e6ff'
        },
        "Animals": {
            'title': "Wildlife Classification Challenge",
            'description': "Help train an AI to recognize different animal species from photos and sounds.",
            'category': "Classification",
            'time': "15-20 min",
            'color': '#f0ffe6'
        }
    }
    
    return interest_recommendations.get(interest, None)

def get_activity_type(learning_style):
    """Get a suggested activity type based on learning style"""
    activity_types = {
        "Visual": "visual interactive",
        "Hands-on": "hands-on building",
        "Reading/Writing": "guided reading and reflection",
        "Social": "collaborative discussion"
    }
    
    return activity_types.get(learning_style, "interactive")

# Session state updater functions
def update_learning_style():
    st.session_state.learning_style = st.session_state.learning_style_select

def update_learning_speed():
    st.session_state.learning_speed = st.session_state.learning_speed_select

def update_interests():
    st.session_state.interests = st.session_state.interests_select

def update_activity_preference():
    st.session_state.activity_preference = st.session_state.activity_preference_select