import streamlit as st
import pandas as pd
import os
import json
from datetime import datetime

def initialize_session_state():
    """Initialize session state variables if they don't exist"""
    
    # User info
    if "user_name" not in st.session_state:
        st.session_state["user_name"] = ""
    
    # Progress tracking
    if "progress" not in st.session_state:
        st.session_state["progress"] = 0
    
    if "level" not in st.session_state:
        st.session_state["level"] = "Beginner"
    
    if "badges" not in st.session_state:
        st.session_state["badges"] = []
    
    if "badges_count" not in st.session_state:
        st.session_state["badges_count"] = 0
    
    # Learning tracking
    if "completed_lessons" not in st.session_state:
        st.session_state["completed_lessons"] = []
    
    if "completed_games" not in st.session_state:
        st.session_state["completed_games"] = []
    
    if "completed_adventures" not in st.session_state:
        st.session_state["completed_adventures"] = []
    
    # Quiz scores
    if "quiz_scores" not in st.session_state:
        st.session_state["quiz_scores"] = {}

def update_progress(increment=0.1):
    """Update user progress and level based on activities"""
    
    # Update progress
    st.session_state["progress"] = min(1.0, st.session_state["progress"] + increment)
    
    # Update level based on progress
    if st.session_state["progress"] >= 0.8:
        st.session_state["level"] = "Genius"
    elif st.session_state["progress"] >= 0.5:
        st.session_state["level"] = "Explorer"
    elif st.session_state["progress"] >= 0.2:
        st.session_state["level"] = "Learner"
    else:
        st.session_state["level"] = "Beginner"

def award_badge(badge_name):
    """Award a badge to the user and update the badge count"""
    
    if badge_name not in st.session_state["badges"]:
        st.session_state["badges"].append(badge_name)
        st.session_state["badges_count"] = len(st.session_state["badges"])
        return True
    return False

def complete_lesson(lesson_name):
    """Mark a lesson as completed and update progress"""
    
    if lesson_name not in st.session_state["completed_lessons"]:
        st.session_state["completed_lessons"].append(lesson_name)
        update_progress(0.05)
        return True
    return False

def complete_game(game_name):
    """Mark a game as completed and update progress"""
    
    if game_name not in st.session_state["completed_games"]:
        st.session_state["completed_games"].append(game_name)
        update_progress(0.1)
        return True
    return False

def complete_adventure(adventure_name):
    """Mark an adventure as completed and update progress"""
    
    if adventure_name not in st.session_state["completed_adventures"]:
        st.session_state["completed_adventures"].append(adventure_name)
        update_progress(0.15)
        return True
    return False

def save_quiz_score(quiz_name, score, max_score):
    """Save a quiz score and award badges based on performance"""
    
    st.session_state["quiz_scores"][quiz_name] = {
        "score": score,
        "max_score": max_score,
        "percentage": (score / max_score) * 100,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M")
    }
    
    # Award badges based on performance
    if (score / max_score) >= 0.9:
        award_badge(f"{quiz_name} Expert")
    elif (score / max_score) >= 0.7:
        award_badge(f"{quiz_name} Pro")
    
    update_progress(0.05)

def get_lesson_content(lesson_id):
    """Get content for a specific lesson"""
    
    # In a real app, this would fetch from a database or file storage
    # For now, we're hardcoding some sample content
    
    lessons = {
        "what_is_ai": {
            "title": "What is Artificial Intelligence?",
            "content": """
            # What is Artificial Intelligence?
            
            Artificial Intelligence (AI) is when computers can think and learn a bit like humans do!
            
            AI can:
            - Recognize pictures
            - Understand words
            - Play games
            - Solve problems
            
            AI is all around us! It helps recommend videos, recognize faces in photos, and even helps robots navigate.
            """,
            "quiz": [
                {
                    "question": "What does AI stand for?",
                    "options": ["Automatic Intelligence", "Artificial Intelligence", "Amazing Intelligence", "Algorithm Intelligence"],
                    "correct": 1
                },
                {
                    "question": "Which of these is NOT something AI can do?",
                    "options": ["Recognize pictures", "Feel emotions", "Play games", "Solve math problems"],
                    "correct": 1
                }
            ]
        },
        "ai_algorithms": {
            "title": "AI Algorithms: The Recipe for Intelligence",
            "content": """
            # AI Algorithms: The Recipe for Intelligence
            
            An algorithm is like a recipe that tells a computer what steps to follow.
            
            AI algorithms are special recipes that help computers:
            - Make decisions
            - Find patterns
            - Learn from examples
            - Improve over time
            
            Just like following a recipe to bake cookies, computers follow algorithms to solve problems!
            """,
            "quiz": [
                {
                    "question": "What is an algorithm?",
                    "options": ["A type of robot", "A set of instructions", "A computer game", "A type of AI"],
                    "correct": 1
                },
                {
                    "question": "Algorithms are like:",
                    "options": ["Pizza", "Recipes", "Toys", "Books"],
                    "correct": 1
                }
            ]
        },
        "machine_learning": {
            "title": "Machine Learning: How Computers Learn",
            "content": """
            # Machine Learning: How Computers Learn
            
            Machine Learning is how computers learn from examples instead of being told exactly what to do.
            
            It's like how you learn to recognize dogs after seeing many pictures of dogs!
            
            There are three main types:
            - Supervised Learning (learning with a teacher)
            - Unsupervised Learning (learning without a teacher)
            - Reinforcement Learning (learning by trial and error)
            
            With Machine Learning, computers can improve on their own!
            """,
            "quiz": [
                {
                    "question": "What is Machine Learning?",
                    "options": ["When machines exercise", "When computers learn from examples", "When robots build other robots", "When people program computers"],
                    "correct": 1
                },
                {
                    "question": "Which is NOT a type of Machine Learning?",
                    "options": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Automatic Learning"],
                    "correct": 3
                }
            ]
        }
    }
    
    return lessons.get(lesson_id, {"title": "Lesson Not Found", "content": "Sorry, this lesson doesn't exist yet."})

def get_game_content(game_id):
    """Get content for a specific game"""
    
    # Sample game content
    games = {
        "sorting_game": {
            "title": "AI Sorting Game",
            "description": "Help the AI learn to sort items by dragging them to the correct category.",
            "instructions": "Drag the items on the left to the correct category on the right."
        },
        "pattern_finder": {
            "title": "Pattern Finder",
            "description": "Find patterns in the data just like an AI would!",
            "instructions": "Look at the sequence and predict what comes next."
        },
        "robot_maze": {
            "title": "Robot Maze",
            "description": "Program your robot to navigate through the maze.",
            "instructions": "Use the arrow buttons to create a sequence of moves for your robot."
        }
    }
    
    return games.get(game_id, {"title": "Game Not Found", "description": "Sorry, this game doesn't exist yet."})

def get_adventure_content(adventure_id):
    """Get content for a specific adventure"""
    
    # Sample adventure content
    adventures = {
        "image_detective": {
            "title": "Image Detective",
            "description": "Help an AI learn to recognize objects in images!",
            "story": "A new AI called PixelPal needs your help! It's learning to recognize objects in pictures, but needs your guidance.",
            "tasks": [
                "Identify what's in each image",
                "Help the AI understand similar objects",
                "Test the AI's learning with new images"
            ]
        },
        "smart_city": {
            "title": "Smart City Builder",
            "description": "Design a city that uses AI to solve problems!",
            "story": "The mayor of Futureville has asked you to help make the city smarter using AI technology.",
            "tasks": [
                "Add AI traffic lights that reduce congestion",
                "Design smart energy systems that save power",
                "Create AI assistants to help citizens"
            ]
        },
        "robot_friend": {
            "title": "Design Your Robot Friend",
            "description": "Create and program your own AI robot companion!",
            "story": "You've been given special parts to build your own robot friend. How will you design it?",
            "tasks": [
                "Choose your robot's appearance",
                "Select your robot's abilities",
                "Teach your robot how to help people"
            ]
        }
    }
    
    return adventures.get(adventure_id, {"title": "Adventure Not Found", "description": "Sorry, this adventure doesn't exist yet."})
