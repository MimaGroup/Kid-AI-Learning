import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

def display_learning_insights():
    """Display enhanced learning insights for parents and educators"""
    st.markdown("""
    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
        <h3 style="margin-top: 0;">Enhanced Learning Insights</h3>
        <p>Detailed analytics on learning progress, strengths, and growth opportunities.</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Initialize data if needed
    initialize_insights_data()
    
    # Insights overview
    st.markdown("### Learning Progress Overview")
    
    # Time spent by category
    col1, col2 = st.columns([2, 1])
    
    with col1:
        # Create time spent chart
        fig = px.pie(
            values=list(st.session_state.time_spent.values()),
            names=list(st.session_state.time_spent.keys()),
            title="Time Spent by Learning Category",
            color_discrete_sequence=px.colors.qualitative.Pastel,
            hole=0.4
        )
        fig.update_traces(textposition='inside', textinfo='percent+label')
        fig.update_layout(height=350)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown("#### Learning Summary")
        total_time = sum(st.session_state.time_spent.values())
        st.markdown(f"**Total Learning Time:** {total_time} minutes")
        
        # Display session count and average time
        st.markdown(f"**Total Sessions:** {st.session_state.total_sessions}")
        st.markdown(f"**Avg. Session Length:** {int(total_time / st.session_state.total_sessions)} minutes")
        
        # Display completion metrics
        completed = sum(1 for v in st.session_state.activity_completion.values() if v >= 1.0)
        total = len(st.session_state.activity_completion)
        st.markdown(f"**Activities Completed:** {completed}/{total}")
        
        # Show learning streak
        st.markdown(f"**Current Learning Streak:** {st.session_state.learning_streak} days")
    
    # Show weekly activity chart
    st.markdown("### Weekly Learning Activity")
    
    # Create weekly activity data
    weekly_data = generate_weekly_activity_data()
    
    # Create heatmap for weekly activity
    fig = px.imshow(
        weekly_data, 
        labels=dict(x="Day of Week", y="Week", color="Minutes"),
        x=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        y=['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        color_continuous_scale='YlGnBu'
    )
    
    fig.update_layout(height=250)
    st.plotly_chart(fig, use_container_width=True)
    
    # Skills development radar chart
    st.markdown("### Skills Development")
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        # Create radar chart of skills
        categories = list(st.session_state.skills_development.keys())
        values = list(st.session_state.skills_development.values())
        
        # Add the first value at the end to close the loop
        categories.append(categories[0])
        values.append(values[0])
        
        fig = go.Figure()
        
        fig.add_trace(go.Scatterpolar(
            r=values,
            theta=categories,
            fill='toself',
            fillcolor='rgba(64, 224, 208, 0.5)',
            line=dict(color='rgb(64, 224, 208)', width=2),
            name='Current Skills'
        ))
        
        # Add a reference level to show ideal growth
        ideal_values = [0.8] * len(values)
        fig.add_trace(go.Scatterpolar(
            r=ideal_values,
            theta=categories,
            line=dict(color='rgba(255, 99, 132, 0.8)', width=1, dash='dot'),
            name='Target Level'
        ))
        
        fig.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 1]
                )
            ),
            showlegend=True,
            legend=dict(orientation="h", yanchor="bottom", y=1.1, xanchor="center", x=0.5),
            height=350
        )
        
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown("#### Skill Breakdown")
        skills_sorted = sorted(st.session_state.skills_development.items(), key=lambda x: x[1], reverse=True)
        
        # List skills from strongest to weakest
        st.markdown("**Strengths:**")
        for skill, value in skills_sorted[:3]:
            st.markdown(f"- {skill}: {int(value * 100)}%")
        
        st.markdown("**Growth Areas:**")
        for skill, value in skills_sorted[-2:]:
            st.markdown(f"- {skill}: {int(value * 100)}%")
        
        # Growth recommendations
        st.markdown("#### Growth Recommendations")
        if skills_sorted[-1][0] == "Problem Solving":
            st.markdown("• Try more puzzle-based activities to build problem-solving skills")
        elif skills_sorted[-1][0] == "Creativity":
            st.markdown("• Engage with more open-ended design activities")
        elif skills_sorted[-1][0] == "Critical Thinking":
            st.markdown("• Explore activities that involve evaluating AI decisions")
        
        # Progress trajectory
        st.markdown("#### Learning Progress")
        progress_status = "on track" if sum(st.session_state.skills_development.values()) / len(st.session_state.skills_development) > 0.5 else "needs attention"
        st.markdown(f"Overall progress is **{progress_status}**")
    
    # Activity completion details
    st.markdown("### Activity Completion Details")
    
    # Create bar chart for activity completion
    activities = list(st.session_state.activity_completion.keys())
    completion_values = list(st.session_state.activity_completion.values())
    
    completion_df = pd.DataFrame({
        'Activity': activities,
        'Completion': [min(v, 1.0) for v in completion_values]
    })
    
    fig = px.bar(
        completion_df, 
        x='Activity', 
        y='Completion', 
        color='Completion',
        color_continuous_scale='blues',
        range_y=[0, 1],
        labels={'Completion': 'Completion Rate'},
        title="Activity Completion Rates"
    )
    
    fig.update_layout(height=350)
    st.plotly_chart(fig, use_container_width=True)
    
    # Show learning paths and recommendations
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Recommended Learning Path")
        
        current_level = "Intermediate" if sum(st.session_state.skills_development.values()) / len(st.session_state.skills_development) > 0.5 else "Beginner"
        
        # Display recommendations based on current level
        if current_level == "Beginner":
            st.markdown("""
            1. **Foundation Building:** Complete the AI Basics lessons
            2. **Interactive Games:** Try the Sorting Game and Pattern Game
            3. **Simple Projects:** Build a basic chatbot in the AI Playground
            4. **Reflection Activities:** Complete the quizzes in the lessons
            """)
        else:
            st.markdown("""
            1. **Advanced Concepts:** Explore Neural Networks and Computer Vision
            2. **Creative Projects:** Create your own AI art or stories
            3. **Challenge Activities:** Try the more advanced simulation games
            4. **Integration Learning:** Connect AI concepts to other subjects
            """)
    
    with col2:
        st.markdown("### Parent/Teacher Support")
        
        # Display tips for parents/teachers
        st.markdown("""
        **Discussion Prompts:**
        - Ask about AI examples they notice in daily life
        - Discuss what they found most interesting in recent lessons
        - Explore how they might use AI tools creatively
        
        **Support Activities:**
        - Help connect online learning to physical activities
        - Encourage "teaching back" what they've learned
        - Celebrate learning milestones together
        """)

def initialize_insights_data():
    """Initialize sample insights data for demonstration"""
    if "time_spent" not in st.session_state:
        st.session_state.time_spent = {
            "AI Basics": 120,
            "Games & Activities": 95,
            "Creative Projects": 60,
            "Challenges": 45,
            "Quizzes & Reflection": 30
        }
    
    if "skills_development" not in st.session_state:
        st.session_state.skills_development = {
            "Computational Thinking": 0.75,
            "Creativity": 0.62,
            "Critical Thinking": 0.58,
            "Problem Solving": 0.70,
            "Collaboration": 0.45,
            "Technical Knowledge": 0.65
        }
    
    if "activity_completion" not in st.session_state:
        st.session_state.activity_completion = {
            "AI Basics Lessons": 0.9,
            "Pattern Recognition": 1.0,
            "Sorting Game": 0.7,
            "Robot Maze": 0.5,
            "Neural Networks": 0.3,
            "Computer Vision": 0.2,
            "Creative AI Projects": 0.6,
            "AI Ethics": 0.4
        }
    
    if "total_sessions" not in st.session_state:
        st.session_state.total_sessions = 12
    
    if "learning_streak" not in st.session_state:
        st.session_state.learning_streak = 5

def generate_weekly_activity_data():
    """Generate weekly activity heatmap data for demonstration"""
    # Create a 4x7 array for 4 weeks and 7 days
    data = [
        [15, 30, 20, 5, 25, 40, 10],   # Week 1
        [25, 0, 35, 15, 10, 30, 20],   # Week 2
        [10, 20, 0, 30, 25, 15, 45],   # Week 3
        [20, 15, 30, 0, 40, 25, 35]    # Week 4
    ]
    
    return data