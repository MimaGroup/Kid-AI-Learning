import pandas as pd
import streamlit as st
import json
import os
from datetime import datetime

def get_user_progress():
    """Get the current user's progress data
    
    Returns:
        dict: A dictionary containing the user's progress
    """
    progress_data = {
        "user_name": st.session_state.get("user_name", ""),
        "progress": st.session_state.get("progress", 0),
        "level": st.session_state.get("level", "Beginner"),
        "badges": st.session_state.get("badges", []),
        "completed_lessons": st.session_state.get("completed_lessons", []),
        "completed_games": st.session_state.get("completed_games", []),
        "completed_adventures": st.session_state.get("completed_adventures", []),
        "quiz_scores": st.session_state.get("quiz_scores", {})
    }
    
    return progress_data

def save_user_progress():
    """Save the current user's progress to a file
    
    In a real application, this would save to a database.
    For this example, we'll simulate saving the data.
    """
    user_data = get_user_progress()
    
    # In a real app, you'd save this to a file or database
    # For now, just print that it's saved
    st.success(f"Progress saved for {user_data['user_name']}!")
    
    # In a full implementation, you might save to a CSV or JSON file:
    # with open(f"user_data/{user_data['user_name']}.json", "w") as f:
    #     json.dump(user_data, f)

def get_progress_summary():
    """Generate a summary of the user's progress for the dashboard
    
    Returns:
        dict: A dictionary with summary statistics
    """
    progress_data = get_user_progress()
    
    # Calculate statistics
    total_lessons = len(progress_data["completed_lessons"])
    total_games = len(progress_data["completed_games"])
    total_adventures = len(progress_data["completed_adventures"])
    total_badges = len(progress_data["badges"])
    
    # Calculate average quiz score
    quiz_scores = progress_data["quiz_scores"]
    if quiz_scores:
        avg_score = sum(score["percentage"] for score in quiz_scores.values()) / len(quiz_scores)
    else:
        avg_score = 0
    
    # Package the summary
    summary = {
        "total_activities": total_lessons + total_games + total_adventures,
        "total_lessons": total_lessons,
        "total_games": total_games,
        "total_adventures": total_adventures,
        "total_badges": total_badges,
        "avg_quiz_score": avg_score,
        "progress_percentage": progress_data["progress"] * 100,
        "level": progress_data["level"]
    }
    
    return summary

def generate_progress_chart_data():
    """Generate data for progress charts
    
    Returns:
        pandas.DataFrame: A DataFrame with activity data for charting
    """
    # Get activities with timestamps
    # In a real app, you'd have actual timestamps
    # For now, we'll simulate some data
    
    activities = []
    
    # Add lessons
    for i, lesson in enumerate(st.session_state.get("completed_lessons", [])):
        activities.append({
            "activity_type": "Lesson",
            "name": lesson,
            "date": datetime.now().strftime("%Y-%m-%d"),  # In real app, this would be the actual completion date
            "day": i,  # For x-axis ordering in chart
            "points": 5
        })
    
    # Add games
    for i, game in enumerate(st.session_state.get("completed_games", [])):
        activities.append({
            "activity_type": "Game",
            "name": game,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "day": len(activities) + i,
            "points": 10
        })
    
    # Add adventures
    for i, adventure in enumerate(st.session_state.get("completed_adventures", [])):
        activities.append({
            "activity_type": "Adventure",
            "name": adventure,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "day": len(activities) + i,
            "points": 15
        })
    
    # Convert to DataFrame
    if activities:
        df = pd.DataFrame(activities)
    else:
        # Create empty DataFrame with the right columns
        df = pd.DataFrame(columns=["activity_type", "name", "date", "day", "points"])
    
    return df
