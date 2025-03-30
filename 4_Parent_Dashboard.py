import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
from components.robot_guide import display_robot_guide
from components.badges import display_all_badges, display_badge_gallery
from components.feature_cards.learning_insights import display_learning_insights
from utils.helpers import initialize_session_state
from data.user_progress import get_user_progress, get_progress_summary, generate_progress_chart_data

# Configure page
st.set_page_config(
    page_title="Parent Dashboard - KidAI Academy",
    page_icon="👨‍👩‍👧‍👦",
    layout="wide"
)

# Initialize session state
initialize_session_state()

# Main content
def main():
    st.title("👨‍👩‍👧‍👦 Parent Dashboard")
    
    # Check if user is logged in
    if not st.session_state.get("user_name"):
        st.warning("Please log in on the home page before accessing the Parent Dashboard.")
        if st.button("Go to Home Page"):
            st.switch_page("app.py")
        return
    
    # Dashboard introduction
    st.markdown(f"""
    ## Learning Progress for {st.session_state.get("user_name")}
    
    Welcome to the Parent Dashboard! Here you can monitor your child's progress in learning AI concepts.
    """)
    
    # Display tabs for different dashboard sections
    tab1, tab2, tab3, tab4 = st.tabs(["Summary", "Activity Details", "Achievements", "Resources"])
    
    with tab1:
        display_summary_tab()
    
    with tab2:
        display_activity_details_tab()
    
    with tab3:
        display_achievements_tab()
    
    with tab4:
        display_resources_tab()

def display_summary_tab():
    """Display the summary dashboard tab"""
    
    st.markdown("### Learning Summary")
    
    # Get progress summary
    summary = get_progress_summary()
    
    # Create metrics in columns
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Current Level", summary["level"])
    
    with col2:
        st.metric("Overall Progress", f"{summary['progress_percentage']:.1f}%")
    
    with col3:
        st.metric("Activities Completed", summary["total_activities"])
    
    with col4:
        st.metric("Badges Earned", summary["total_badges"])
    
    # Progress by category
    st.markdown("### Progress by Category")
    
    # Create progress bars for each category
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Learning Modules")
        lesson_percent = (summary["total_lessons"] / 6) * 100 if summary["total_lessons"] > 0 else 0
        st.progress(min(1.0, lesson_percent / 100))
        st.markdown(f"**{summary['total_lessons']}** out of **6** lessons completed")
        
        st.markdown("#### Adventures")
        adventure_percent = (summary["total_adventures"] / 4) * 100 if summary["total_adventures"] > 0 else 0
        st.progress(min(1.0, adventure_percent / 100))
        st.markdown(f"**{summary['total_adventures']}** out of **4** adventures completed")
    
    with col2:
        st.markdown("#### Coding Games")
        game_percent = (summary["total_games"] / 4) * 100 if summary["total_games"] > 0 else 0
        st.progress(min(1.0, game_percent / 100))
        st.markdown(f"**{summary['total_games']}** out of **4** games completed")
        
        st.markdown("#### Quiz Performance")
        st.progress(min(1.0, summary["avg_quiz_score"] / 100))
        st.markdown(f"**{summary['avg_quiz_score']:.1f}%** average quiz score")
    
    # Recent activity chart
    st.markdown("### Recent Activity")
    
    # Generate sample activity data
    activity_data = generate_progress_chart_data()
    
    if not activity_data.empty:
        # Create activity chart
        fig = px.bar(
            activity_data,
            x="day",
            y="points",
            color="activity_type",
            title="Points Earned by Activity",
            labels={"day": "Activity Number", "points": "Points Earned", "activity_type": "Activity Type"}
        )
        
        # Update layout
        fig.update_layout(
            xaxis_title="Activity Number",
            yaxis_title="Points Earned",
            legend_title="Activity Type",
            height=400
        )
        
        # Display the chart
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.info("No activity data available yet. Complete some activities to see your progress!")
    
    # Learning path visualization
    st.markdown("### Learning Path")
    
    # Create a learning path diagram
    create_learning_path_visual()

def display_activity_details_tab():
    """Display the activity details dashboard tab"""
    
    st.markdown("### Activity Details")
    
    # Get user progress data
    progress_data = get_user_progress()
    
    # Create tabs for different activity types
    activity_tab1, activity_tab2, activity_tab3 = st.tabs(["Lessons", "Games", "Adventures"])
    
    with activity_tab1:
        st.markdown("#### Completed Lessons")
        
        # Display completed lessons
        if progress_data["completed_lessons"]:
            for lesson in progress_data["completed_lessons"]:
                st.markdown(f"""
                <div style="
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 5px 0;
                    background-color: #e6ffec;
                ">
                    <span style="font-weight: bold;">✅ {lesson}</span>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.info("No lessons completed yet.")
        
        # Quiz scores if available
        if progress_data["quiz_scores"]:
            st.markdown("#### Quiz Scores")
            
            # Create a dataframe for quiz scores
            quiz_data = []
            for quiz_name, score_data in progress_data["quiz_scores"].items():
                quiz_data.append({
                    "Quiz": quiz_name,
                    "Score": f"{score_data['score']}/{score_data['max_score']}",
                    "Percentage": f"{score_data['percentage']:.1f}%",
                    "Date": score_data['date']
                })
            
            if quiz_data:
                quiz_df = pd.DataFrame(quiz_data)
                st.dataframe(quiz_df)
        
        # Lessons not yet completed
        all_lessons = [
            "What is Artificial Intelligence?",
            "AI Algorithms: The Recipe for Intelligence",
            "Machine Learning: How Computers Learn",
            "Neural Networks: Brain-Inspired Computing",
            "AI Ethics: Making Good Choices",
            "The Future of AI"
        ]
        
        incomplete_lessons = [lesson for lesson in all_lessons if lesson not in progress_data["completed_lessons"]]
        
        if incomplete_lessons:
            st.markdown("#### Lessons to Explore")
            for lesson in incomplete_lessons:
                st.markdown(f"- {lesson}")
    
    with activity_tab2:
        st.markdown("#### Completed Games")
        
        # Display completed games
        if progress_data["completed_games"]:
            for game in progress_data["completed_games"]:
                st.markdown(f"""
                <div style="
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 5px 0;
                    background-color: #e6ffec;
                ">
                    <span style="font-weight: bold;">🎮 {game}</span>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.info("No games completed yet.")
        
        # Games not yet completed
        all_games = [
            "sorting_game",
            "pattern_game",
            "robot_maze",
            "image_detective"
        ]
        
        incomplete_games = [game for game in all_games if game not in progress_data["completed_games"]]
        
        if incomplete_games:
            st.markdown("#### Games to Try")
            game_names = {
                "sorting_game": "AI Sorting Game",
                "pattern_game": "Pattern Finder",
                "robot_maze": "Robot Maze",
                "image_detective": "AI Image Detective"
            }
            for game in incomplete_games:
                st.markdown(f"- {game_names.get(game, game)}")
    
    with activity_tab3:
        st.markdown("#### Completed Adventures")
        
        # Display completed adventures
        if progress_data["completed_adventures"]:
            for adventure in progress_data["completed_adventures"]:
                st.markdown(f"""
                <div style="
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 5px 0;
                    background-color: #e6ffec;
                ">
                    <span style="font-weight: bold;">🚀 {adventure}</span>
                </div>
                """, unsafe_allow_html=True)
        else:
            st.info("No adventures completed yet.")
        
        # Adventures not yet completed
        all_adventures = [
            "image_detective",
            "smart_city",
            "robot_friend",
            "voice_adventure"
        ]
        
        incomplete_adventures = [adv for adv in all_adventures if adv not in progress_data["completed_adventures"]]
        
        if incomplete_adventures:
            st.markdown("#### Adventures to Explore")
            adventure_names = {
                "image_detective": "Image Detective",
                "smart_city": "Smart City Builder",
                "robot_friend": "Design Your Robot Friend",
                "voice_adventure": "Voice Command Adventure"
            }
            for adventure in incomplete_adventures:
                st.markdown(f"- {adventure_names.get(adventure, adventure)}")

def display_achievements_tab():
    """Display the achievements dashboard tab"""
    
    st.markdown("### Achievements and Badges")
    
    # Display all earned badges
    display_all_badges()
    
    # Display badge gallery
    display_badge_gallery()
    
    # Learning recommendations based on progress
    st.markdown("### Learning Recommendations")
    
    # Get progress summary
    summary = get_progress_summary()
    
    # Generate recommendations based on current progress
    st.markdown("#### Suggested Next Steps")
    
    if summary["total_lessons"] < 2:
        st.markdown("- Complete the basic AI lessons to build a foundation of knowledge")
    
    if summary["total_games"] < 1:
        st.markdown("- Try the AI Sorting Game to understand how AI classifies information")
    
    if summary["total_adventures"] < 1:
        st.markdown("- Start with the Image Detective adventure to learn about computer vision")
    
    if summary["avg_quiz_score"] < 80 and summary["total_lessons"] > 0:
        st.markdown("- Review the lesson materials and retake quizzes to improve scores")
    
    if summary["progress_percentage"] >= 50 and summary["total_adventures"] >= 2:
        st.markdown("- Try building your own AI project in the sandbox (coming soon!)")

def display_resources_tab():
    """Display the resources dashboard tab"""
    
    st.markdown("### Resources for Parents and Educators")
    
    # AI learning resources
    st.markdown("""
    #### Understanding AI for Kids
    
    Artificial Intelligence (AI) is becoming an increasingly important part of our world. Here are some resources to help you understand how kids can learn about AI:
    
    - **[AI for K-12 Initiative](https://ai4k12.org/)**: Guidelines and resources for teaching AI to K-12 students
    - **[MIT AI Education](https://raise.mit.edu/)**: MIT's resources for AI education
    - **[AI4All](https://ai-4-all.org/)**: Organization dedicated to increasing diversity in AI education
    - **[Google's Machine Learning for Kids](https://machinelearningforkids.co.uk/)**: Simple ML activities for children
    """)
    
    # Discussion topics
    st.markdown("""
    #### Discussion Topics
    
    Here are some topics you can discuss with your child to extend their learning:
    
    1. **AI in everyday life**: Where do we see AI being used at home or in public?
    2. **Benefits and challenges of AI**: How can AI help people? What problems might it cause?
    3. **AI ethics**: How do we make sure AI is fair and helpful to everyone?
    4. **Future careers**: What jobs might use AI in the future?
    """)
    
    # Offline activities
    st.markdown("""
    #### Offline Activities
    
    Try these hands-on activities away from the screen:
    
    1. **Human robot**: One person is the "programmer" giving instructions, the other is the "robot" following them exactly
    2. **Pattern hunt**: Find and identify patterns in nature, music, or art
    3. **Sorting game**: Sort household objects by different attributes (color, size, use) to understand classification
    4. **Decision trees**: Make a flowchart of yes/no questions to identify an animal or object
    """)
    
    # Book recommendations
    st.markdown("""
    #### Book Recommendations for Kids
    
    - **"Hello Ruby: Adventures in Coding"** by Linda Liukas
    - **"How to Train Your Robot"** by Blooma Goldberg
    - **"The Computer Science Activity Book"** by Christine Liu and Tera Johnson
    - **"Awesome Algorithms and Creative Coding"** by Clyde Hatter
    """)
    
    # Connect to the curriculum
    st.markdown("""
    #### Connecting to School Learning
    
    The concepts learned in KidAI Academy connect to these school subjects:
    
    - **Math**: Patterns, logic, statistics
    - **Science**: Scientific method, data analysis
    - **Technology**: Programming, digital literacy
    - **Language Arts**: Communicating instructions clearly
    - **Social Studies**: Ethical considerations, technology's impact on society
    """)

def create_learning_path_visual():
    """Create a visual representation of the learning path"""
    
    # Get user progress
    progress_data = get_user_progress()
    
    # Create nodes for the learning path
    nodes = [
        {"id": "start", "label": "Start", "level": 0, "completed": True},
        {"id": "basics", "label": "AI Basics", "level": 1, "completed": len(progress_data["completed_lessons"]) >= 2},
        {"id": "games", "label": "AI Games", "level": 1, "completed": len(progress_data["completed_games"]) >= 2},
        {"id": "algorithms", "label": "Algorithms", "level": 2, "completed": "AI Algorithms: The Recipe for Intelligence" in progress_data["completed_lessons"]},
        {"id": "machine_learning", "label": "Machine Learning", "level": 2, "completed": "Machine Learning: How Computers Learn" in progress_data["completed_lessons"]},
        {"id": "adventures", "label": "AI Adventures", "level": 2, "completed": len(progress_data["completed_adventures"]) >= 1},
        {"id": "advanced", "label": "Advanced AI", "level": 3, "completed": len(progress_data["completed_lessons"]) >= 4},
        {"id": "projects", "label": "AI Projects", "level": 3, "completed": len(progress_data["completed_adventures"]) >= 3},
        {"id": "expert", "label": "AI Expert", "level": 4, "completed": progress_data["progress"] >= 0.8}
    ]
    
    # Create edges between nodes
    edges = [
        {"from": "start", "to": "basics"},
        {"from": "start", "to": "games"},
        {"from": "basics", "to": "algorithms"},
        {"from": "basics", "to": "machine_learning"},
        {"from": "games", "to": "adventures"},
        {"from": "algorithms", "to": "advanced"},
        {"from": "machine_learning", "to": "advanced"},
        {"from": "adventures", "to": "projects"},
        {"from": "advanced", "to": "expert"},
        {"from": "projects", "to": "expert"}
    ]
    
    # Create a network diagram
    # Since we're not using a full network visualization library,
    # we'll create a simple horizontal flowchart using columns
    
    # Group nodes by level
    levels = {}
    for node in nodes:
        level = node["level"]
        if level not in levels:
            levels[level] = []
        levels[level].append(node)
    
    # Create columns for each level
    level_cols = st.columns(len(levels))
    
    # Display nodes in each level
    for level, col in enumerate(level_cols):
        with col:
            if level in levels:
                for node in levels[level]:
                    # Create a styled box for each node
                    background_color = "#e6ffec" if node["completed"] else "#f0f8ff"
                    border_color = "#4CAF50" if node["completed"] else "#2196F3"
                    icon = "✅" if node["completed"] else "🔄"
                    
                    st.markdown(f"""
                    <div style="
                        border: 2px solid {border_color};
                        border-radius: 10px;
                        padding: 10px;
                        margin: 10px 0;
                        text-align: center;
                        background-color: {background_color};
                    ">
                        <span style="font-weight: bold;">{node["label"]}</span><br>
                        <span>{icon}</span>
                    </div>
                    """, unsafe_allow_html=True)

# Run the main function
if __name__ == "__main__":
    main()
