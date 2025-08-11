# This file makes components/interactive_games a proper Python package
from components.interactive_games.sorting_game import display_sorting_game, display_pattern_game
from components.interactive_games.image_detective import display_image_detective_game

# Add a placeholder for the robot maze function until we implement it
def display_robot_maze():
    import streamlit as st
    st.subheader("Robot Maze Challenge")
    st.info("This feature is coming soon! Check back later for the Robot Maze Challenge.")
