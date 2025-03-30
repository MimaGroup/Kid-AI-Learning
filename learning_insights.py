import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import random
from datetime import datetime, timedelta

def display_learning_insights():
    """Display parent dashboard with learning insights"""
    st.markdown("## Learning Progress Insights")
    
    # Generate sample data
    if "learning_insights_data" not in st.session_state:
        generate_sample_data()
    
    # Display summary metrics
    display_summary_metrics()
    
    # Display progress over time
    display_progress_chart()
    
    # Display strength areas and focus areas
    col1, col2 = st.columns(2)
    
    with col1:
        display_strength_areas()
    
    with col2:
        display_focus_areas()
    
    # Display recent activities
    display_recent_activities()
    
    # Display personalized recommendations
    display_recommendations()

def generate_sample_data():
    """Generate sample data for learning insights"""
    # Progress over time (last 30 days)
    progress_dates = []
    progress_values = []
    
    base_value = 0.3
    for i in range(30):
        date = (datetime.now() - timedelta(days=30-i)).strftime('%Y-%m-%d')
        # Add some randomness but ensure overall upward trend
        increment = random.uniform(0.001, 0.015) if random.random() > 0.3 else -0.002
        base_value = min(1.0, max(0.3, base_value + increment))
        
        progress_dates.append(date)
        progress_values.append(base_value)
    
    # Subject area proficiency
    subject_areas = [
        "AI Basics", "Machine Learning", "Computer Vision", 
        "Robotics", "Natural Language", "AI Ethics"
    ]
    
    subject_proficiency = {}
    for area in subject_areas:
        subject_proficiency[area] = random.uniform(0.2, 0.9)
    
    # Learning style effectiveness
    learning_styles = {
        "Visual": random.uniform(0.6, 0.9),
        "Auditory": random.uniform(0.4, 0.7),
        "Reading/Writing": random.uniform(0.5, 0.8),
        "Kinesthetic": random.uniform(0.3, 0.6)
    }
    
    # Recent activities
    activities = []
    activity_types = ["Lesson", "Game", "Quiz", "Project", "Adventure"]
    activity_names = {
        "Lesson": ["AI Basics: Introduction", "Machine Learning Fundamentals", "Computer Vision Basics", "How AI Makes Decisions"],
        "Game": ["Pattern Finder", "Robot Maze", "Image Detective", "Neural Network Builder"],
        "Quiz": ["AI Ethics Quiz", "Machine Learning Concepts", "Robotics Knowledge Test", "Computer Vision Challenge"],
        "Project": ["Build a Simple Chatbot", "Create an AI Art Generator", "Design a Decision Tree", "Train a Classifier"],
        "Adventure": ["Space AI Mission", "Robot Friend Quest", "Smart City Adventure", "Voice Command Challenge"]
    }
    
    for i in range(10):
        activity_type = random.choice(activity_types)
        activity_name = random.choice(activity_names[activity_type])
        date = (datetime.now() - timedelta(days=random.randint(0, 10))).strftime('%Y-%m-%d')
        
        activities.append({
            "date": date,
            "type": activity_type,
            "name": activity_name,
            "duration": random.randint(5, 30),
            "score": random.randint(70, 100) if activity_type in ["Quiz", "Game"] else None
        })
    
    # Sort activities by date, newest first
    activities.sort(key=lambda x: x["date"], reverse=True)
    
    # Save data to session state
    st.session_state.learning_insights_data = {
        "progress_dates": progress_dates,
        "progress_values": progress_values,
        "subject_proficiency": subject_proficiency,
        "learning_styles": learning_styles,
        "activities": activities
    }

def display_summary_metrics():
    """Display summary metrics at the top of the dashboard"""
    # Create 4 columns for key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    # Get relevant data
    progress_values = st.session_state.learning_insights_data["progress_values"]
    subject_proficiency = st.session_state.learning_insights_data["subject_proficiency"]
    activities = st.session_state.learning_insights_data["activities"]
    
    # Calculate metrics
    current_progress = progress_values[-1]
    progress_change = progress_values[-1] - progress_values[-7]  # Week-over-week change
    completed_activities = len(activities)
    avg_score = sum([a["score"] for a in activities if a["score"] is not None]) / len([a for a in activities if a["score"] is not None])
    top_subject = max(subject_proficiency, key=subject_proficiency.get)
    
    # Display metrics
    with col1:
        st.markdown("""
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; text-align: center;">
            <div style="font-size: 28px; font-weight: bold; color: #4287f5;">
                {:.0%}
            </div>
            <div style="font-size: 14px; color: #666;">
                Overall Progress
            </div>
            <div style="font-size: 12px; color: {};  margin-top: 5px;">
                {:.1%} {}
            </div>
        </div>
        """.format(
            current_progress, 
            "#4CAF50" if progress_change >= 0 else "#F44336",
            abs(progress_change),
            "increase" if progress_change >= 0 else "decrease"
        ), unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; text-align: center;">
            <div style="font-size: 28px; font-weight: bold; color: #9542f5;">
                {}
            </div>
            <div style="font-size: 14px; color: #666;">
                Completed Activities
            </div>
            <div style="font-size: 12px; color: #888; margin-top: 5px;">
                Last 10 days
            </div>
        </div>
        """.format(completed_activities), unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; text-align: center;">
            <div style="font-size: 28px; font-weight: bold; color: #f5426a;">
                {:.0f}%
            </div>
            <div style="font-size: 14px; color: #666;">
                Average Score
            </div>
            <div style="font-size: 12px; color: #888; margin-top: 5px;">
                Quizzes & Games
            </div>
        </div>
        """.format(avg_score), unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div style="border: 1px solid #e0e0e0; border-radius: 10px; padding: 15px; text-align: center;">
            <div style="font-size: 28px; font-weight: bold; color: #42f5b3;">
                {}
            </div>
            <div style="font-size: 14px; color: #666;">
                Top Subject
            </div>
            <div style="font-size: 12px; color: #888; margin-top: 5px;">
                {:.0%} Proficiency
            </div>
        </div>
        """.format(top_subject, subject_proficiency[top_subject]), unsafe_allow_html=True)

def display_progress_chart():
    """Display progress over time chart"""
    st.markdown("### Learning Progress Over Time")
    
    # Get progress data
    dates = st.session_state.learning_insights_data["progress_dates"]
    values = st.session_state.learning_insights_data["progress_values"]
    
    # Create a pandas DataFrame
    df = pd.DataFrame({
        "Date": dates,
        "Progress": values
    })
    
    # Create plot
    fig = px.line(
        df, 
        x="Date", 
        y="Progress", 
        markers=True,
        title="Progress Over Last 30 Days",
        template="plotly_white"
    )
    
    # Update layout for better appearance
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Progress",
        yaxis_tickformat=".0%",
        hovermode="x unified",
        height=350,
        margin=dict(l=40, r=40, t=40, b=40)
    )
    
    # Update line appearance
    fig.update_traces(
        line=dict(width=3, color="#4287f5"),
        marker=dict(size=8, color="#4287f5")
    )
    
    # Add a trend line
    fig.add_traces(
        px.scatter(
            df, x="Date", y="Progress", trendline="lowess"
        ).data[1]
    )
    
    # Display the chart
    st.plotly_chart(fig, use_container_width=True)
    
    # Add an explanation
    with st.expander("About This Chart"):
        st.markdown("""
        This chart shows your child's learning progress over the last 30 days.
        
        - The **blue line** shows daily progress measurements
        - The **red line** shows the overall trend
        
        Progress is calculated based on completed activities, quiz scores, and engagement time.
        """)

def display_strength_areas():
    """Display child's strength areas"""
    st.markdown("### Strength Areas")
    
    # Get subject proficiency data
    subject_proficiency = st.session_state.learning_insights_data["subject_proficiency"]
    
    # Sort subjects by proficiency
    sorted_subjects = sorted(
        subject_proficiency.items(), 
        key=lambda x: x[1], 
        reverse=True
    )
    
    # Display top 3 as strengths
    for i, (subject, proficiency) in enumerate(sorted_subjects[:3]):
        # Generate color gradient based on proficiency
        color_r = int(66 + (proficiency * 189))
        color_g = int(133 + (proficiency * 122))
        color_b = int(244 - (proficiency * 100))
        color = f"rgb({color_r}, {color_g}, {color_b})"
        
        st.markdown(f"""
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 5px solid {color};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: bold;">{subject}</div>
                <div style="font-size: 14px;">{proficiency:.0%}</div>
            </div>
            <div style="margin-top: 10px; background-color: #e9ecef; height: 8px; border-radius: 4px;">
                <div style="background-color: {color}; width: {proficiency*100:.0f}%; height: 100%; border-radius: 4px;"></div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Add an insight box
    st.markdown(f"""
    <div style="background-color: #e6f7ff; padding: 15px; border-radius: 10px; margin-top: 15px;">
        <div style="font-weight: bold; margin-bottom: 5px;">Insight:</div>
        <p style="margin: 0; font-size: 14px;">
            {sorted_subjects[0][0]} is a strong area for your child. 
            Consider exploring more advanced topics in this area to maintain engagement.
        </p>
    </div>
    """, unsafe_allow_html=True)

def display_focus_areas():
    """Display recommended focus areas"""
    st.markdown("### Recommended Focus Areas")
    
    # Get subject proficiency data
    subject_proficiency = st.session_state.learning_insights_data["subject_proficiency"]
    
    # Sort subjects by proficiency (ascending for focus areas)
    sorted_subjects = sorted(
        subject_proficiency.items(), 
        key=lambda x: x[1]
    )
    
    # Display bottom 3 as focus areas
    for i, (subject, proficiency) in enumerate(sorted_subjects[:3]):
        # Generate color for focus areas
        color = "#f5426a"  # Pinkish red for areas needing focus
        
        st.markdown(f"""
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 5px solid {color};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: bold;">{subject}</div>
                <div style="font-size: 14px;">{proficiency:.0%}</div>
            </div>
            <div style="margin-top: 10px; background-color: #e9ecef; height: 8px; border-radius: 4px;">
                <div style="background-color: {color}; width: {proficiency*100:.0f}%; height: 100%; border-radius: 4px;"></div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Add a recommendation box
    st.markdown(f"""
    <div style="background-color: #fff4e6; padding: 15px; border-radius: 10px; margin-top: 15px;">
        <div style="font-weight: bold; margin-bottom: 5px;">Recommendation:</div>
        <p style="margin: 0; font-size: 14px;">
            Encourage more activities in {sorted_subjects[0][0]} to build confidence.
            The interactive games and visual lessons would be particularly helpful.
        </p>
    </div>
    """, unsafe_allow_html=True)

def display_recent_activities():
    """Display recent learning activities"""
    st.markdown("### Recent Learning Activities")
    
    # Get activities data
    activities = st.session_state.learning_insights_data["activities"]
    
    # Create a table
    table_data = []
    for activity in activities[:5]:  # Show only 5 most recent
        date_obj = datetime.strptime(activity["date"], '%Y-%m-%d')
        formatted_date = date_obj.strftime("%b %d")
        
        # Format the score display
        score_display = f"{activity['score']}%" if activity["score"] is not None else "—"
        
        table_data.append([
            formatted_date,
            activity["type"],
            activity["name"],
            f"{activity['duration']} min",
            score_display
        ])
    
    # Create the table with Plotly
    fig = go.Figure(
        data=[
            go.Table(
                header=dict(
                    values=["Date", "Type", "Activity", "Duration", "Score"],
                    fill_color="#f0f4f8",
                    align="left",
                    font=dict(size=13)
                ),
                cells=dict(
                    values=list(map(list, zip(*table_data))),
                    fill_color="#ffffff",
                    align="left",
                    font=dict(size=12),
                    height=30
                )
            )
        ]
    )
    
    # Update layout
    fig.update_layout(
        margin=dict(l=0, r=0, t=0, b=0),
        height=30 * (len(table_data) + 1) + 30
    )
    
    # Display the table
    st.plotly_chart(fig, use_container_width=True)
    
    # View all activities button
    st.button("View All Activities", key="view_all_activities")

def display_learning_style_insights():
    """Display insights about effective learning styles"""
    st.markdown("### Learning Style Effectiveness")
    
    # Get learning style data
    learning_styles = st.session_state.learning_insights_data["learning_styles"]
    
    # Sort styles by effectiveness
    sorted_styles = sorted(
        learning_styles.items(), 
        key=lambda x: x[1], 
        reverse=True
    )
    
    # Create a radar chart
    categories = [style for style, _ in sorted_styles]
    values = [effectiveness for _, effectiveness in sorted_styles]
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatterpolar(
        r=values,
        theta=categories,
        fill='toself',
        fillcolor='rgba(66, 135, 245, 0.2)',
        line=dict(color='#4287f5', width=2),
        name='Effectiveness'
    ))
    
    fig.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 1]
            )
        ),
        showlegend=False,
        height=300,
        margin=dict(l=70, r=70, t=20, b=40)
    )
    
    # Display the chart
    st.plotly_chart(fig, use_container_width=True)
    
    # Display recommendation based on top learning style
    top_style = sorted_styles[0][0]
    
    style_recommendations = {
        "Visual": "Your child learns best through visual content. Encourage them to use diagrams, charts, and videos when learning new concepts. The AI Image Detective and Neural Network Builder games are great matches.",
        "Auditory": "Your child learns best through listening. Try having them explain concepts out loud, use voice notes, or discuss what they've learned. The Voice Command Adventure would be particularly engaging.",
        "Reading/Writing": "Your child learns best through reading and writing. Encourage note-taking, writing summaries, and reading explanations. The Code Snippet Playground is perfect for this learning style.",
        "Kinesthetic": "Your child learns best through hands-on activities. Look for interactive games and projects that involve physical movement or manipulation. Robot Maze and the AI Project Builder are ideal matches."
    }
    
    st.info(style_recommendations[top_style])

def display_recommendations():
    """Display personalized recommendations for parents"""
    st.markdown("### Parent Recommendations")
    
    # Create tabs for different recommendation types
    tabs = st.tabs(["Activities", "Engagement Tips", "Learning Style"])
    
    with tabs[0]:
        st.markdown("#### Recommended Activities")
        
        # Get subject proficiency data
        subject_proficiency = st.session_state.learning_insights_data["subject_proficiency"]
        
        # Find lowest proficiency subject
        focus_subject = min(subject_proficiency.items(), key=lambda x: x[1])[0]
        
        # Generate recommendations based on focus area
        recommendations = {
            "AI Basics": [
                "Try the 'What is AI?' lesson together",
                "Play the 'AI or Not AI' sorting game",
                "Watch a kid-friendly video about how AI works"
            ],
            "Machine Learning": [
                "Play the Pattern Finder game to understand pattern recognition",
                "Try the Neural Network Builder together",
                "Do the 'Teaching Computers' activity"
            ],
            "Computer Vision": [
                "Play the Image Detective game",
                "Try the 'How Computers See' interactive demo",
                "Create a simple image classifier project"
            ],
            "Robotics": [
                "Complete the Robot Maze challenge together",
                "Try the Robot Friend programming activity",
                "Discuss real-world robots and their uses"
            ],
            "Natural Language": [
                "Try the Voice Command Adventure",
                "Play with the AI Chatbot Builder",
                "Do the 'Teaching Words' activity"
            ],
            "AI Ethics": [
                "Discuss the 'AI Decision Maker' scenarios",
                "Play the Fairness Detective game",
                "Talk about how AI should be used responsibly"
            ]
        }
        
        # Display recommendations
        for i, recommendation in enumerate(recommendations.get(focus_subject, recommendations["AI Basics"])):
            st.markdown(f"""
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="background-color: #4287f5; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                    {i+1}
                </div>
                <div>{recommendation}</div>
            </div>
            """, unsafe_allow_html=True)
    
    with tabs[1]:
        st.markdown("#### Engagement Tips")
        
        engagement_tips = [
            {
                "title": "Ask open-ended questions",
                "description": "Instead of 'Did you like that activity?', try 'What was the most interesting thing you learned today?'"
            },
            {
                "title": "Connect to real-world examples",
                "description": "Point out AI in daily life, like voice assistants, recommendations, or smart devices"
            },
            {
                "title": "Celebrate progress, not just achievement",
                "description": "Acknowledge effort and improvement, not just high scores or completed lessons"
            },
            {
                "title": "Learn together",
                "description": "Show interest by trying activities together - this reinforces that learning is valuable at any age"
            }
        ]
        
        for tip in engagement_tips:
            st.markdown(f"""
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <div style="font-weight: bold; margin-bottom: 5px;">{tip['title']}</div>
                <div style="font-size: 14px;">{tip['description']}</div>
            </div>
            """, unsafe_allow_html=True)
    
    with tabs[2]:
        # Display learning style insights and recommendations
        display_learning_style_insights()