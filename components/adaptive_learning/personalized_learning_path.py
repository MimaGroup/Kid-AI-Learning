import streamlit as st
import plotly.graph_objects as go
import random
from datetime import datetime, timedelta

def display_personalized_learning_path():
    """
    Display personalized learning paths based on child's progress
    including customized recommendations and adaptive content difficulty
    """
    # Initialize data if not present
    initialize_learning_path_data()
    
    st.markdown("## Your Personalized Learning Journey")
    
    # Create columns for personal info and learning style
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### Learning Profile")
        
        if "learning_style" not in st.session_state:
            st.session_state.learning_style = "Visual"
        
        learning_style = st.selectbox(
            "Your learning style:",
            ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"],
            index=["Visual", "Auditory", "Reading/Writing", "Kinesthetic"].index(st.session_state.learning_style),
            key="learning_style_selector",
            on_change=update_learning_style
        )
        
        st.markdown(f"""
        <div style="background-color: #f0f8ff; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <p style="margin: 0;">
                <strong>{learning_style} learners</strong> learn best through 
                {get_learning_style_description(learning_style)}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        # Learning focus areas
        if "focus_areas" not in st.session_state:
            st.session_state.focus_areas = ["AI Basics", "Robotics"]
        
        st.markdown("### Areas of Interest")
        focus_areas = st.multiselect(
            "Select your favorite topics:",
            ["AI Basics", "Machine Learning", "Computer Vision", "Robotics", 
             "Natural Language", "Game AI", "Creative AI", "AI Ethics"],
            default=st.session_state.focus_areas,
            key="focus_areas_selector",
            on_change=update_interests
        )
    
    with col2:
        st.markdown("### Learning Pace")
        
        if "learning_speed" not in st.session_state:
            st.session_state.learning_speed = "Medium"
        
        learning_speed = st.select_slider(
            "How quickly do you like to learn?",
            options=["Very Slow", "Slow", "Medium", "Fast", "Very Fast"],
            value=st.session_state.learning_speed,
            key="learning_speed_selector",
            on_change=update_learning_speed
        )
        
        st.markdown(f"""
        <div style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; margin-top: 10px;">
            <p style="margin: 0;">{get_learning_speed_description(learning_speed)}</p>
        </div>
        """, unsafe_allow_html=True)
        
        # Activity preference
        if "activity_preference" not in st.session_state:
            st.session_state.activity_preference = "Games"
        
        st.markdown("### Activity Preference")
        activity_preference = st.radio(
            "How do you prefer to learn?",
            ["Games", "Reading", "Videos", "Projects", "Quizzes"],
            index=["Games", "Reading", "Videos", "Projects", "Quizzes"].index(st.session_state.activity_preference),
            key="activity_preference_selector",
            horizontal=True,
            on_change=update_activity_preference
        )
    
    # Display learning journey map
    st.markdown("---")
    st.markdown("## Your Learning Journey Map")
    display_learning_journey_map()
    
    # Display next recommended steps
    st.markdown("## Recommended Next Steps")
    display_next_steps()
    
    # Display badge progress
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("## Your Learning Stats")
        display_learning_stats()
    
    with col2:
        st.markdown("## Badge Progress")
        display_badge_progress()
    
    # Display recommendations based on learning style and interests
    st.markdown("---")
    st.markdown("## Personalized Recommendations")
    display_custom_recommendations()

def initialize_learning_path_data():
    """Initialize sample learning path data if not present"""
    if "completed_modules" not in st.session_state:
        st.session_state.completed_modules = [
            "AI Basics: Introduction",
            "Robotics: Simple Commands",
            "Machine Learning: What is ML?"
        ]
    
    if "progress_per_area" not in st.session_state:
        st.session_state.progress_per_area = {
            "AI Basics": 0.7,
            "Machine Learning": 0.3,
            "Computer Vision": 0.1,
            "Robotics": 0.5,
            "Natural Language": 0.0,
            "Game AI": 0.2,
            "Creative AI": 0.0,
            "AI Ethics": 0.0
        }
    
    if "learning_path" not in st.session_state:
        st.session_state.learning_path = [
            {
                "id": 1,
                "name": "AI Basics: Introduction",
                "completed": True,
                "category": "AI Basics",
                "difficulty": "Beginner"
            },
            {
                "id": 2,
                "name": "Robotics: Simple Commands",
                "completed": True,
                "category": "Robotics",
                "difficulty": "Beginner"
            },
            {
                "id": 3,
                "name": "Machine Learning: What is ML?",
                "completed": True,
                "category": "Machine Learning",
                "difficulty": "Beginner"
            },
            {
                "id": 4,
                "name": "AI Basics: How Computers Think",
                "completed": False,
                "category": "AI Basics",
                "difficulty": "Beginner"
            },
            {
                "id": 5,
                "name": "Machine Learning: Training Data",
                "completed": False,
                "category": "Machine Learning",
                "difficulty": "Intermediate"
            },
            {
                "id": 6,
                "name": "Robotics: Sensors & Feedback",
                "completed": False,
                "category": "Robotics",
                "difficulty": "Intermediate"
            },
            {
                "id": 7,
                "name": "Computer Vision: Seeing Objects",
                "completed": False,
                "category": "Computer Vision",
                "difficulty": "Intermediate"
            },
            {
                "id": 8,
                "name": "AI Ethics: Fairness in AI",
                "completed": False,
                "category": "AI Ethics",
                "difficulty": "Advanced"
            }
        ]
    
    if "recent_activities" not in st.session_state:
        # Generate some sample activity data
        recent_days = 14
        activities = []
        
        for i in range(recent_days):
            date = (datetime.now() - timedelta(days=recent_days-i)).strftime('%Y-%m-%d')
            activities.append({
                "date": date,
                "minutes": random.randint(0, 45),
                "completed_items": random.randint(0, 3)
            })
        
        st.session_state.recent_activities = activities

def display_learning_journey_map():
    """Display an interactive map of the learning journey"""
    # Get learning path data
    learning_path = st.session_state.learning_path
    
    # Create nodes for the pathway visualization
    nodes = []
    
    for i, module in enumerate(learning_path):
        # Determine node color based on completion status
        color = "#4CAF50" if module["completed"] else "#B0BEC5"
        
        # Determine node size based on difficulty
        size = 30 if module["difficulty"] == "Beginner" else 40 if module["difficulty"] == "Intermediate" else 50
        
        # Create the node
        nodes.append(
            go.Scatter(
                x=[i], 
                y=[0],
                mode="markers+text",
                marker=dict(
                    size=size,
                    color=color,
                    line=dict(width=2, color="white")
                ),
                text=[str(module["id"])],
                textposition="middle center",
                textfont=dict(color="white", size=12),
                name=module["name"],
                hoverinfo="text",
                hovertext=f"{module['name']} ({module['category']} - {module['difficulty']})<br>{'Completed' if module['completed'] else 'Not completed yet'}"
            )
        )
    
    # Create path lines between nodes
    path_x = list(range(len(learning_path)))
    path_y = [0] * len(learning_path)
    
    path = go.Scatter(
        x=path_x,
        y=path_y,
        mode="lines",
        line=dict(width=3, color="#90CAF9"),
        hoverinfo="skip"
    )
    
    # Add path as the first layer, then nodes on top
    all_traces = [path] + nodes
    
    # Create the figure
    fig = go.Figure(data=all_traces)
    
    # Customize the layout
    fig.update_layout(
        title="Your Learning Pathway",
        showlegend=False,
        height=200,
        margin=dict(l=20, r=20, t=40, b=20),
        plot_bgcolor="#F8F9FA",
        xaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False
        ),
        yaxis=dict(
            showgrid=False,
            zeroline=False,
            showticklabels=False,
            scaleanchor="x",
            scaleratio=1
        ),
        hoverlabel=dict(
            bgcolor="white",
            font_size=12
        )
    )
    
    # Add annotations for module titles below the nodes
    for i, module in enumerate(learning_path):
        fig.add_annotation(
            x=i,
            y=-0.2,
            text=module["name"],
            showarrow=False,
            font=dict(
                size=10,
                color="black" if module["completed"] else "gray"
            ),
            yshift=-15,
            align="center"
        )
    
    # Display the figure
    st.plotly_chart(fig, use_container_width=True)
    
    # Legend explanation below chart
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="background-color: #4CAF50; width: 20px; height: 20px; border-radius: 50%; margin-right: 10px;"></div>
            <span>Completed modules</span>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="background-color: #B0BEC5; width: 20px; height: 20px; border-radius: 50%; margin-right: 10px;"></div>
            <span>Upcoming modules</span>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 20px; height: 20px; margin-right: 10px; display: flex; justify-content: center; align-items: center;">
                <div style="background-color: #B0BEC5; width: 15px; height: 15px; border-radius: 50%;"></div>
            </div>
            <span>Beginner</span>
            <div style="width: 25px; height: 25px; margin: 0 5px 0 15px; display: flex; justify-content: center; align-items: center;">
                <div style="background-color: #B0BEC5; width: 20px; height: 20px; border-radius: 50%;"></div>
            </div>
            <span>Intermediate</span>
            <div style="width: 30px; height: 30px; margin: 0 5px 0 15px; display: flex; justify-content: center; align-items: center;">
                <div style="background-color: #B0BEC5; width: 25px; height: 25px; border-radius: 50%;"></div>
            </div>
            <span>Advanced</span>
        </div>
        """, unsafe_allow_html=True)

def display_next_steps():
    """Display recommended next steps on the learning path"""
    # Get uncompleted modules
    learning_path = st.session_state.learning_path
    uncompleted_modules = [module for module in learning_path if not module["completed"]]
    
    # Sort by priority (matching interests and appropriate level)
    focus_areas = st.session_state.get("focus_areas", ["AI Basics", "Robotics"])
    
    # Simple priority algorithm:
    # 1. First prioritize modules in user's focus areas
    # 2. Then prioritize by appropriate difficulty level
    for module in uncompleted_modules:
        priority = 0
        if module["category"] in focus_areas:
            priority += 10
        
        # Appropriate difficulty based on progress in that category
        current_progress = st.session_state.progress_per_area.get(module["category"], 0)
        if (current_progress < 0.3 and module["difficulty"] == "Beginner") or \
           (0.3 <= current_progress < 0.7 and module["difficulty"] == "Intermediate") or \
           (current_progress >= 0.7 and module["difficulty"] == "Advanced"):
            priority += 5
        
        module["priority"] = priority
    
    # Sort by priority
    recommended_modules = sorted(uncompleted_modules, key=lambda x: x["priority"], reverse=True)[:3]
    
    # Display next steps in cards
    col1, col2, col3 = st.columns(3)
    columns = [col1, col2, col3]
    
    for i, module in enumerate(recommended_modules):
        # Get appropriate color based on category
        category_colors = {
            "AI Basics": "#4287f5",
            "Machine Learning": "#9942f5",
            "Computer Vision": "#42f5c4",
            "Robotics": "#f59e42",
            "Natural Language": "#f542a7",
            "Game AI": "#f54242",
            "Creative AI": "#42f545",
            "AI Ethics": "#f5e642"
        }
        
        color = category_colors.get(module["category"], "#4287f5")
        
        with columns[i]:
            st.markdown(f"""
            <div style="border: 2px solid {color}; border-radius: 10px; padding: 15px; height: 100%;">
                <div style="background-color: {color}; color: white; padding: 5px 10px; border-radius: 15px; display: inline-block; margin-bottom: 10px; font-size: 12px;">
                    {module["category"]}
                </div>
                <h4 style="margin-top: 0;">{module["name"]}</h4>
                <p style="font-size: 14px;">Difficulty: {module["difficulty"]}</p>
                <div style="background-color: #f0f4f8; padding: 10px; border-radius: 5px; font-size: 13px;">
                    <p style="margin: 0;">Good match for your {st.session_state.learning_style} learning style!</p>
                </div>
            </div>
            """, unsafe_allow_html=True)

def display_learning_stats():
    """Display learning statistics"""
    # Create a visualization of recent activity
    activities = st.session_state.recent_activities
    
    # Prepare data for visualization
    dates = [activity["date"] for activity in activities]
    minutes = [activity["minutes"] for activity in activities]
    completed = [activity["completed_items"] for activity in activities]
    
    # Create a bar chart using plotly
    fig = go.Figure()
    
    # Add time spent bars
    fig.add_trace(go.Bar(
        x=dates,
        y=minutes,
        name='Minutes Spent',
        marker_color='#4287f5',
        hovertemplate='%{y} minutes<extra></extra>'
    ))
    
    # Add completed items line
    fig.add_trace(go.Scatter(
        x=dates,
        y=completed,
        mode='lines+markers',
        name='Items Completed',
        marker=dict(size=8, color='#f542a7'),
        line=dict(width=2, color='#f542a7'),
        yaxis='y2',
        hovertemplate='%{y} items<extra></extra>'
    ))
    
    # Update layout for dual y-axis
    fig.update_layout(
        title='Your Recent Learning Activity',
        xaxis=dict(
            title='Date',
            tickangle=-45,
            tickformat='%b %d',
            tickmode='auto',
            nticks=7
        ),
        yaxis=dict(
            title='Minutes',
            titlefont=dict(color='#4287f5'),
            tickfont=dict(color='#4287f5'),
            side='left'
        ),
        yaxis2=dict(
            title='Items Completed',
            titlefont=dict(color='#f542a7'),
            tickfont=dict(color='#f542a7'),
            anchor='x',
            overlaying='y',
            side='right'
        ),
        legend=dict(
            orientation='h',
            yanchor='bottom',
            y=1.02,
            xanchor='center',
            x=0.5
        ),
        margin=dict(l=50, r=50, t=50, b=100),
        height=350
    )
    
    # Display the figure
    st.plotly_chart(fig, use_container_width=True)
    
    # Calculate and display overall stats
    total_minutes = sum(minutes)
    total_completed = sum(completed)
    avg_minutes = total_minutes / len(activities)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown(f"""
        <div style="background-color: #e6f2ff; padding: 15px; border-radius: 10px; text-align: center;">
            <h3 style="margin-top: 0; color: #4287f5;">{total_minutes}</h3>
            <p style="margin-bottom: 0;">Total Minutes</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div style="background-color: #ffe6f2; padding: 15px; border-radius: 10px; text-align: center;">
            <h3 style="margin-top: 0; color: #f542a7;">{total_completed}</h3>
            <p style="margin-bottom: 0;">Items Completed</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown(f"""
        <div style="background-color: #e6ffee; padding: 15px; border-radius: 10px; text-align: center;">
            <h3 style="margin-top: 0; color: #42f569;">{avg_minutes:.1f}</h3>
            <p style="margin-bottom: 0;">Avg. Minutes/Day</p>
        </div>
        """, unsafe_allow_html=True)

def display_badge_progress():
    """Display badge collection progress"""
    # Show progress towards the next badge
    next_badge_progress = 0.65  # Simulated progress (0-1)
    
    st.markdown("""
    ### Next Badge: AI Explorer
    
    Complete these steps to earn your badge:
    """)
    
    st.progress(next_badge_progress, text=f"{int(next_badge_progress * 100)}% Complete")
    
    # Display badge tasks
    tasks = [
        {"name": "Complete AI Basics", "done": True},
        {"name": "Finish 3 AI Games", "done": True},
        {"name": "Create an AI Project", "done": False},
        {"name": "Share your learning", "done": False}
    ]
    
    for task in tasks:
        if task["done"]:
            st.markdown(f"✅ {task['name']}")
        else:
            st.markdown(f"◻️ {task['name']}")
    
    # Available badges
    st.markdown("### Your Badge Collection")
    
    # Display badge icons in a grid
    badge_cols = st.columns(3)
    
    # Simple badge display
    badges = [
        {"name": "Beginner", "emoji": "🌱", "earned": True},
        {"name": "Code Genius", "emoji": "💻", "earned": True},
        {"name": "ML Master", "emoji": "📊", "earned": False},
        {"name": "AI Explorer", "emoji": "🔍", "earned": False},
        {"name": "Vision Hero", "emoji": "👁️", "earned": False},
        {"name": "NLP Wizard", "emoji": "🔤", "earned": False}
    ]
    
    for i, badge in enumerate(badges):
        with badge_cols[i % 3]:
            if badge["earned"]:
                st.markdown(f"""
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 24px;">{badge["emoji"]}</div>
                    <div style="font-size: 12px;">{badge["name"]}</div>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div style="text-align: center; opacity: 0.5; margin-bottom: 15px;">
                    <div style="font-size: 24px;">{badge["emoji"]}</div>
                    <div style="font-size: 12px;">{badge["name"]}</div>
                </div>
                """, unsafe_allow_html=True)

def display_custom_recommendations():
    """Display custom recommendations based on learning style and interests"""
    # Get user preferences
    learning_style = st.session_state.get("learning_style", "Visual")
    focus_areas = st.session_state.get("focus_areas", ["AI Basics", "Robotics"])
    activity_preference = st.session_state.get("activity_preference", "Games")
    
    # Generate personalized suggestions
    suggestions = generate_personalized_suggestions(
        learning_style, 
        focus_areas,
        st.session_state.progress_per_area
    )
    
    # Display recommendations in three categories
    st.markdown("### Recommended for Your Learning Style")
    style_recommendation = get_style_based_recommendation(learning_style)
    
    st.markdown(f"""
    <div style="background-color: #f0f4fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <div style="display: flex; align-items: flex-start;">
            <div style="font-size: 40px; margin-right: 20px;">{style_recommendation["emoji"]}</div>
            <div>
                <h4 style="margin-top: 0;">{style_recommendation["title"]}</h4>
                <p>{style_recommendation["description"]}</p>
                <div style="background-color: #e6f2ff; padding: 10px; border-radius: 5px; font-size: 14px;">
                    <strong>Why this works for you:</strong> {style_recommendation["explanation"]}
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Interest-based recommendations
    st.markdown("### Based on Your Interests")
    
    # Display up to 3 interest-based recommendations
    interest_cols = st.columns(len(focus_areas[:3]))
    
    for i, interest in enumerate(focus_areas[:3]):
        with interest_cols[i]:
            recommendation = get_interest_based_recommendation(interest)
            
            st.markdown(f"""
            <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; height: 100%;">
                <h4 style="margin-top: 0;">{recommendation["title"]}</h4>
                <p style="font-size: 14px;">{recommendation["description"]}</p>
                <div style="margin-top: 15px; font-size: 13px;">
                    <span style="background-color: #f0f4fa; padding: 5px 10px; border-radius: 15px;">
                        {get_activity_type(learning_style)}
                    </span>
                </div>
            </div>
            """, unsafe_allow_html=True)
    
    # Parent guidance section
    st.markdown("### For Parents")
    
    parent_guidance = f"""
    Based on your child's learning profile, here are some ways you can support their AI learning journey:
    
    1. **Learning Style Support**: Your child is a {learning_style} learner. They learn best through {get_learning_style_description(learning_style)}
    
    2. **Interest Areas**: Focus on {', '.join(focus_areas[:2])} to maintain engagement
    
    3. **Activity Suggestions**: {get_parent_activity_suggestions(learning_style, focus_areas)}
    """
    
    st.info(parent_guidance)

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
    # For demonstration purposes, we'll return a simple list
    suggestions = []
    
    # Add a learning style based suggestion
    style_suggestion = get_style_based_recommendation(learning_style)
    suggestions.append(style_suggestion)
    
    # Add interest-based suggestions
    for area in focus_areas[:2]:  # Take top 2 interests
        interest_suggestion = get_interest_based_recommendation(area)
        suggestions.append(interest_suggestion)
    
    return suggestions

def get_style_based_recommendation(learning_style):
    """
    Get a recommendation based on learning style
    
    Args:
        learning_style (str): The user's preferred learning style
        
    Returns:
        dict: A recommendation tailored to the learning style
    """
    recommendations = {
        "Visual": {
            "emoji": "👁️",
            "title": "AI Image Recognition Explorer",
            "description": "Explore how AI 'sees' images through interactive visualizations that highlight features, patterns, and classifications.",
            "explanation": "Visual learners benefit from seeing AI concepts in action through color-coded diagrams, interactive visualizations, and image-based examples."
        },
        "Auditory": {
            "emoji": "👂",
            "title": "Voice AI Lab",
            "description": "Experiment with voice recognition and audio processing AI through spoken commands and voice-controlled activities.",
            "explanation": "Auditory learners thrive when they can listen to explanations and talk through concepts, making voice-interactive AI activities ideal."
        },
        "Reading/Writing": {
            "emoji": "📝",
            "title": "AI Coding Journal",
            "description": "Document your learning journey with guided coding exercises and written explanations of key AI concepts.",
            "explanation": "Reading/writing learners excel by taking notes, following written instructions, and expressing concepts in their own words."
        },
        "Kinesthetic": {
            "emoji": "🤸",
            "title": "AI Motion & Robotics Workshop",
            "description": "Learn AI concepts through hands-on robot programming and physical computing activities that respond to movement.",
            "explanation": "Kinesthetic learners understand best through physical activities and hands-on experiences that connect AI concepts to real-world actions."
        }
    }
    
    return recommendations.get(learning_style, recommendations["Visual"])

def get_interest_based_recommendation(interest):
    """
    Get a recommendation based on primary interest
    
    Args:
        interest (str): The user's primary interest area
        
    Returns:
        dict: A recommendation tailored to the interest
    """
    recommendations = {
        "AI Basics": {
            "title": "AI Detective Challenge",
            "description": "Identify AI systems in everyday technology and learn how they make decisions."
        },
        "Machine Learning": {
            "title": "Teach a Computer to Play",
            "description": "Train a simple machine learning model to play a game by showing it examples."
        },
        "Computer Vision": {
            "title": "Build a Simple Image Classifier",
            "description": "Create a program that can tell the difference between different objects in photos."
        },
        "Robotics": {
            "title": "Program a Virtual Robot",
            "description": "Design instructions for a robot to navigate through an obstacle course."
        },
        "Natural Language": {
            "title": "Create a Smart Chatbot",
            "description": "Build a simple chatbot that can answer questions about a topic you choose."
        },
        "Game AI": {
            "title": "Design an AI Opponent",
            "description": "Create rules for an AI player that can compete against you in a simple game."
        },
        "Creative AI": {
            "title": "AI Art Generator",
            "description": "Experiment with AI tools that can help create original artwork based on your ideas."
        },
        "AI Ethics": {
            "title": "Fairness Detective",
            "description": "Investigate how AI decisions might affect different people and how to make them fair."
        }
    }
    
    return recommendations.get(interest, recommendations["AI Basics"])

def get_activity_type(learning_style):
    """Get a suggested activity type based on learning style"""
    activity_types = {
        "Visual": "Interactive Visualization",
        "Auditory": "Audio-based Activity",
        "Reading/Writing": "Guided Worksheet",
        "Kinesthetic": "Hands-on Project"
    }
    
    return activity_types.get(learning_style, "Interactive Activity")

def get_learning_style_description(style):
    """Get a description of a learning style"""
    descriptions = {
        "Visual": "images, diagrams, and visual demonstrations. Try using color-coding and mind maps when learning new concepts.",
        "Auditory": "listening and speaking. They benefit from discussions, verbal explanations, and audio content.",
        "Reading/Writing": "text-based materials and writing. They excel with written instructions and taking detailed notes.",
        "Kinesthetic": "hands-on activities and physical engagement. They learn best by doing, building, and experimenting."
    }
    
    return descriptions.get(style, "various methods of learning")

def get_learning_speed_description(speed):
    """Get a description for learning speed preference"""
    descriptions = {
        "Very Slow": "You prefer to take plenty of time to fully understand concepts before moving on.",
        "Slow": "You like to move carefully through new material to ensure solid understanding.",
        "Medium": "You prefer a balanced pace that allows for both thoroughness and steady progress.",
        "Fast": "You enjoy moving quickly through material once you've grasped the basic concepts.",
        "Very Fast": "You thrive on rapid learning and quickly connecting new ideas to what you already know."
    }
    
    return descriptions.get(speed, "You prefer a moderate pace of learning.")

def get_parent_activity_suggestions(learning_style, interests):
    """Get activity suggestions for parents based on child's learning profile"""
    primary_interest = interests[0] if interests else "AI Basics"
    
    suggestions = {
        "Visual": f"Try exploring {primary_interest} concepts through videos, diagrams, and color-coded notes.",
        "Auditory": f"Engage your child in discussions about {primary_interest} and try audio-based learning resources.",
        "Reading/Writing": f"Provide books and writing activities related to {primary_interest} to reinforce learning.",
        "Kinesthetic": f"Find hands-on projects related to {primary_interest} that allow your child to build and experiment."
    }
    
    return suggestions.get(learning_style, f"Explore {primary_interest} through varied activities that engage multiple senses.")

def update_learning_style():
    """Update the learning style in session state"""
    st.session_state.learning_style = st.session_state.learning_style_selector

def update_learning_speed():
    """Update the learning speed in session state"""
    st.session_state.learning_speed = st.session_state.learning_speed_selector

def update_interests():
    """Update the focus areas in session state"""
    st.session_state.focus_areas = st.session_state.focus_areas_selector

def update_activity_preference():
    """Update the activity preference in session state"""
    st.session_state.activity_preference = st.session_state.activity_preference_selector