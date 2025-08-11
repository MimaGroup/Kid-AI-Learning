import streamlit as st
from components.robot_guide import display_robot_guide, display_robot_celebration, display_robot_thinking
from utils.helpers import initialize_session_state, get_adventure_content, complete_adventure, award_badge
import random
import time

# Configure page
st.set_page_config(
    page_title="AI Adventures - KidAI Academy",
    page_icon="🚀",
    layout="wide"
)

# Initialize session state
initialize_session_state()

# Main content
def main():
    st.title("🚀 AI Adventures")
    
    # Robot guide introduction
    display_robot_guide("Welcome to AI Adventures! Go on exciting journeys to solve real-world problems using AI.")
    
    # If an adventure is selected, show that adventure
    if "current_adventure" in st.session_state:
        show_adventure(st.session_state["current_adventure"])
        return
    
    # Available adventures
    adventures = [
        {
            "id": "image_detective",
            "title": "Image Detective",
            "description": "Help an AI learn to recognize objects in images and understand the world!",
            "difficulty": "Beginner",
            "theme": "Computer Vision",
            "image": "https://via.placeholder.com/100x100.png?text=Image+Detective"
        },
        {
            "id": "smart_city",
            "title": "Smart City Builder",
            "description": "Design a futuristic city that uses AI to solve problems and help people!",
            "difficulty": "Intermediate",
            "theme": "AI Applications",
            "image": "https://via.placeholder.com/100x100.png?text=Smart+City"
        },
        {
            "id": "robot_friend",
            "title": "Design Your Robot Friend",
            "description": "Create and program your own AI robot companion that can help and play with you!",
            "difficulty": "Intermediate",
            "theme": "Robotics & AI",
            "image": "https://via.placeholder.com/100x100.png?text=Robot+Friend"
        },
        {
            "id": "voice_adventure",
            "title": "Voice Command Adventure",
            "description": "Explore how AI understands human language and responds to voice commands!",
            "difficulty": "Advanced",
            "theme": "Natural Language Processing",
            "image": "https://via.placeholder.com/100x100.png?text=Voice+Adventure"
        }
    ]
    
    # Adventure selection - display as cards in a grid
    st.markdown("## Choose an Adventure")
    
    # Create two columns for the adventure cards
    cols = st.columns(2)
    
    # Display adventure cards
    for i, adventure in enumerate(adventures):
        with cols[i % 2]:
            # Check if adventure is completed
            completed = adventure["id"] in st.session_state.get("completed_adventures", [])
            
            # Card container
            st.markdown(f"""
            <div style="border: 1px solid #ddd; border-radius: 10px; padding: 15px; margin-bottom: 20px; 
                       background-color: {'#f0f8ff' if not completed else '#e6ffec'};">
                <h3 style="margin-top: 0;">{adventure["title"]} {' ✅' if completed else ''}</h3>
                <p>{adventure["description"]}</p>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        {adventure["difficulty"]}
                    </span>
                    <span style="background-color: #e1e1e1; padding: 3px 8px; border-radius: 10px; font-size: 12px;">
                        Theme: {adventure["theme"]}
                    </span>
                </div>
            </div>
            """, unsafe_allow_html=True)
            
            # Button to start the adventure
            button_label = "Start Adventure" if not completed else "Play Again"
            if st.button(button_label, key=f"adventure_{adventure['id']}"):
                st.session_state["current_adventure"] = adventure["id"]
                st.rerun()

def show_adventure(adventure_id):
    """Show a specific adventure based on ID"""
    
    # Go back button
    if st.button("← Back to Adventures", key="back_to_adventures"):
        if "current_adventure" in st.session_state:
            del st.session_state["current_adventure"]
        if "adventure_stage" in st.session_state:
            del st.session_state["adventure_stage"]
        if "adventure_progress" in st.session_state:
            del st.session_state["adventure_progress"]
        if "adventure_choices" in st.session_state:
            del st.session_state["adventure_choices"]
        st.rerun()
    
    # Get adventure content
    adventure_content = get_adventure_content(adventure_id)
    
    # Display adventure title
    st.header(adventure_content["title"])
    
    # Initialize adventure stage if not set
    if "adventure_stage" not in st.session_state:
        st.session_state["adventure_stage"] = "intro"
    
    # Initialize adventure progress
    if "adventure_progress" not in st.session_state:
        st.session_state["adventure_progress"] = 0
    
    # Initialize adventure choices
    if "adventure_choices" not in st.session_state:
        st.session_state["adventure_choices"] = {}
    
    # Display the appropriate stage
    if st.session_state["adventure_stage"] == "intro":
        display_adventure_intro(adventure_content)
    elif st.session_state["adventure_stage"] == "task1":
        display_adventure_task1(adventure_id, adventure_content)
    elif st.session_state["adventure_stage"] == "task2":
        display_adventure_task2(adventure_id, adventure_content)
    elif st.session_state["adventure_stage"] == "task3":
        display_adventure_task3(adventure_id, adventure_content)
    elif st.session_state["adventure_stage"] == "conclusion":
        display_adventure_conclusion(adventure_id, adventure_content)

def display_adventure_intro(adventure_content):
    """Display the introduction for an adventure"""
    
    st.markdown("## Introduction")
    
    # Display story with robot guide
    display_robot_guide(adventure_content["story"])
    
    st.markdown("### Your Mission")
    
    # List the tasks
    for i, task in enumerate(adventure_content["tasks"]):
        st.markdown(f"{i+1}. {task}")
    
    # Start adventure button
    if st.button("Start the Adventure!", key="start_adventure"):
        st.session_state["adventure_stage"] = "task1"
        st.rerun()

def display_adventure_task1(adventure_id, adventure_content):
    """Display the first task of the adventure"""
    
    # Update progress
    st.session_state["adventure_progress"] = 25
    st.progress(st.session_state["adventure_progress"] / 100)
    
    st.markdown("## Task 1")
    
    if adventure_id == "image_detective":
        display_image_detective_task1()
    elif adventure_id == "smart_city":
        display_smart_city_task1()
    elif adventure_id == "robot_friend":
        display_robot_friend_task1()
    elif adventure_id == "voice_adventure":
        display_voice_adventure_task1()

def display_adventure_task2(adventure_id, adventure_content):
    """Display the second task of the adventure"""
    
    # Update progress
    st.session_state["adventure_progress"] = 50
    st.progress(st.session_state["adventure_progress"] / 100)
    
    st.markdown("## Task 2")
    
    if adventure_id == "image_detective":
        display_image_detective_task2()
    elif adventure_id == "smart_city":
        display_smart_city_task2()
    elif adventure_id == "robot_friend":
        display_robot_friend_task2()
    elif adventure_id == "voice_adventure":
        display_voice_adventure_task2()

def display_adventure_task3(adventure_id, adventure_content):
    """Display the third task of the adventure"""
    
    # Update progress
    st.session_state["adventure_progress"] = 75
    st.progress(st.session_state["adventure_progress"] / 100)
    
    st.markdown("## Task 3")
    
    if adventure_id == "image_detective":
        display_image_detective_task3()
    elif adventure_id == "smart_city":
        display_smart_city_task3()
    elif adventure_id == "robot_friend":
        display_robot_friend_task3()
    elif adventure_id == "voice_adventure":
        display_voice_adventure_task3()

def display_adventure_conclusion(adventure_id, adventure_content):
    """Display the conclusion of the adventure"""
    
    # Update progress
    st.session_state["adventure_progress"] = 100
    st.progress(st.session_state["adventure_progress"] / 100)
    
    st.markdown("## Adventure Complete!")
    
    display_robot_celebration()
    
    st.markdown("### Congratulations!")
    st.markdown(f"You have successfully completed the **{adventure_content['title']}** adventure!")
    
    # Display different conclusion based on adventure
    if adventure_id == "image_detective":
        st.markdown("""
        Thanks to your help, PixelPal can now recognize different objects in images! 
        
        You've learned how AI computer vision works:
        1. AI needs lots of examples to learn from
        2. It looks for patterns in the images
        3. It can then recognize new images it hasn't seen before
        
        This is how computers can "see" and understand the world around them!
        """)
    elif adventure_id == "smart_city":
        st.markdown("""
        Your smart city design is incredible! The mayor of Futureville is very impressed.
        
        You've learned how AI can improve city life:
        1. Smart traffic systems can reduce congestion
        2. AI can help manage energy use more efficiently
        3. AI assistants can help citizens access services
        
        These technologies are being developed right now for real cities!
        """)
    elif adventure_id == "robot_friend":
        st.markdown("""
        Your robot friend is ready to help and play with you!
        
        You've learned about AI and robotics:
        1. Robots need sensors to understand their environment
        2. AI helps robots make decisions
        3. Programming tells robots how to respond to different situations
        
        Modern robots use these same principles to navigate and interact with people!
        """)
    elif adventure_id == "voice_adventure":
        st.markdown("""
        Your voice assistant is now ready to understand and respond to commands!
        
        You've learned about Natural Language Processing:
        1. Computers need to understand the words we say
        2. They also need to understand what we mean
        3. AI helps them respond in a helpful way
        
        This is how voice assistants like Siri, Alexa, and Google Assistant work!
        """)
    
    # Mark adventure as completed
    if adventure_id not in st.session_state.get("completed_adventures", []):
        complete_adventure(adventure_id)
        
        # Award adventure-specific badge
        badge_name = f"{adventure_content['title'].split()[0]} Explorer"
        if award_badge(badge_name):
            st.balloons()
            st.success(f"🏆 You earned the {badge_name} badge!")
    
    # Return to adventures button
    if st.button("Return to Adventures", key="return_to_adventures"):
        if "current_adventure" in st.session_state:
            del st.session_state["current_adventure"]
        if "adventure_stage" in st.session_state:
            del st.session_state["adventure_stage"]
        if "adventure_progress" in st.session_state:
            del st.session_state["adventure_progress"]
        if "adventure_choices" in st.session_state:
            del st.session_state["adventure_choices"]
        st.rerun()

# Image Detective Tasks
def display_image_detective_task1():
    """Display the first task for the Image Detective adventure"""
    
    display_robot_guide("First, we need to understand what makes objects recognizable. Let's look at some animals!")
    
    st.markdown("""
    ### Identifying Features
    
    AI learns to recognize objects by looking at their features. For example, a cat has:
    - Pointy ears
    - Whiskers
    - Four legs
    - A tail
    
    Let's help PixelPal learn about animals!
    """)
    
    # Interactive component - matching features to animals
    st.markdown("### Match the features to the correct animal")
    
    with st.form("feature_matching"):
        # Feature sets
        features = {
            "Dog": ["Barks", "Has a wet nose", "Can have different sizes", "Wags its tail"],
            "Bird": ["Has feathers", "Has a beak", "Can fly", "Lays eggs"],
            "Fish": ["Has scales", "Lives in water", "Has fins", "Can have bright colors"],
            "Elephant": ["Has a trunk", "Large ears", "Gray skin", "Very big"]
        }
        
        correct_answers = 0
        for animal, animal_features in features.items():
            st.markdown(f"**Features of a {animal}:**")
            
            # Shuffle a copy of the features for all animals
            all_features = []
            for a, f in features.items():
                if a != animal:  # Don't include the current animal's features
                    all_features.extend(f[:2])  # Add just 2 features from each other animal
            
            # Add the correct features and shuffle
            all_features.extend(animal_features)
            random.shuffle(all_features)
            
            # Create checkboxes for each feature
            selected_features = []
            for feature in all_features:
                if st.checkbox(feature, key=f"{animal}_{feature}"):
                    selected_features.append(feature)
            
            # Store selections in session state
            st.session_state["adventure_choices"][animal] = selected_features
            
            st.markdown("---")
        
        submitted = st.form_submit_button("Check My Answers")
    
    if submitted:
        # Calculate score
        total_score = 0
        feedback = []
        
        for animal, animal_features in features.items():
            selected = st.session_state["adventure_choices"].get(animal, [])
            correct = [f for f in selected if f in animal_features]
            incorrect = [f for f in selected if f not in animal_features]
            missed = [f for f in animal_features if f not in selected]
            
            score = len(correct) - len(incorrect)
            score = max(0, score)  # No negative scores
            
            feedback.append(f"**{animal}**: You got {len(correct)} features correct and {len(incorrect)} incorrect. Score: {score}/4")
            total_score += score
        
        # Display feedback
        st.markdown("### Results")
        for item in feedback:
            st.markdown(item)
        
        st.markdown(f"**Total Score: {total_score}/{len(features) * 4}**")
        
        # Proceed to next task if score is adequate
        if total_score >= len(features) * 2:  # Half or better
            st.success("Great job! You've helped PixelPal identify key features of animals.")
            if st.button("Continue to the next task", key="next_task1"):
                st.session_state["adventure_stage"] = "task2"
                st.rerun()
        else:
            st.warning("Let's try again. PixelPal needs to learn the correct features.")

def display_image_detective_task2():
    """Display the second task for the Image Detective adventure"""
    
    display_robot_guide("Now, let's help PixelPal understand similar objects. Sometimes things in the same category can look different!")
    
    st.markdown("""
    ### Categorizing Objects
    
    AI needs to learn that objects in the same category can look very different!
    
    For example, "vehicles" can include cars, buses, bicycles, and airplanes - which all look very different but are all used for transportation.
    """)
    
    # Interactive component - categorizing objects
    st.markdown("### Help PixelPal categorize these objects")
    
    categories = {
        "Fruits": ["apple", "banana", "grapes", "watermelon", "strawberry", "orange"],
        "Vehicles": ["car", "bus", "bicycle", "airplane", "train", "boat"],
        "Furniture": ["chair", "table", "bed", "sofa", "desk", "bookshelf"],
        "Clothes": ["shirt", "pants", "dress", "hat", "shoes", "jacket"]
    }
    
    # Create a list of all objects and shuffle them
    all_objects = []
    for category, objects in categories.items():
        for obj in objects:
            all_objects.append({"name": obj, "category": category})
    
    random.shuffle(all_objects)
    
    # Select 12 random objects for the exercise
    selected_objects = all_objects[:12]
    
    with st.form("categorization_form"):
        # Initialize responses
        if "categorization_responses" not in st.session_state:
            st.session_state["categorization_responses"] = {}
        
        for i, obj in enumerate(selected_objects):
            options = list(categories.keys())
            selected_category = st.selectbox(
                f"What category does **{obj['name']}** belong to?",
                options=options,
                key=f"categorize_{i}"
            )
            
            # Store the answer
            st.session_state["categorization_responses"][obj["name"]] = {
                "correct_category": obj["category"],
                "selected_category": selected_category
            }
        
        submitted = st.form_submit_button("Check My Answers")
    
    if submitted:
        # Calculate results
        correct_count = 0
        for obj_name, response in st.session_state["categorization_responses"].items():
            if response["selected_category"] == response["correct_category"]:
                correct_count += 1
        
        # Display feedback
        st.markdown("### Results")
        st.markdown(f"You correctly categorized **{correct_count}** out of **{len(selected_objects)}** objects!")
        
        if correct_count >= len(selected_objects) * 0.75:  # 75% or better
            st.success("Excellent work! PixelPal is getting good at categorizing objects.")
            display_robot_celebration()
            if st.button("Continue to the next task", key="next_task2"):
                st.session_state["adventure_stage"] = "task3"
                st.rerun()
        else:
            st.warning("Let's try again. PixelPal needs more practice categorizing objects.")
            display_robot_thinking()

def display_image_detective_task3():
    """Display the third task for the Image Detective adventure"""
    
    display_robot_guide("Now let's see if PixelPal can recognize objects it hasn't seen before!")
    
    st.markdown("""
    ### Testing the AI
    
    After learning from many examples, an AI should be able to recognize new images it hasn't seen before.
    
    Let's test PixelPal's ability to identify objects in new scenarios!
    """)
    
    # Create a simulated image recognition test
    test_images = [
        {"description": "A dog playing in a park", "contains": ["dog", "tree", "grass"]},
        {"description": "A dining room with a table and chairs", "contains": ["table", "chair", "lamp"]},
        {"description": "A beach scene with people swimming", "contains": ["beach", "water", "person"]},
        {"description": "A street with cars and traffic lights", "contains": ["car", "road", "traffic light"]},
        {"description": "A kitchen with appliances", "contains": ["refrigerator", "stove", "sink"]}
    ]
    
    # Randomize order
    random.shuffle(test_images)
    
    # Select 3 test images
    selected_tests = test_images[:3]
    
    st.markdown("### Test PixelPal's Vision")
    
    with st.form("vision_test"):
        # For each test image
        for i, test in enumerate(selected_tests):
            st.markdown(f"**Image {i+1}**: {test['description']}")
            st.image(f"https://via.placeholder.com/400x200.png?text=Image+{i+1}", use_column_width=True)
            
            st.markdown("What objects do you think PixelPal should recognize in this image? (Select all that apply)")
            
            # Create a list of possible objects (correct + distractors)
            possible_objects = test["contains"].copy()
            
            # Add some distractors
            distractors = ["book", "phone", "cup", "computer", "flower", "bicycle", "clock", "shoe"]
            random.shuffle(distractors)
            possible_objects.extend(distractors[:4])
            random.shuffle(possible_objects)
            
            # Create checkboxes for each object
            selected_objects = []
            cols = st.columns(3)
            for j, obj in enumerate(possible_objects):
                with cols[j % 3]:
                    if st.checkbox(obj, key=f"image{i}_obj{j}"):
                        selected_objects.append(obj)
            
            # Store selections
            st.session_state[f"test_image_{i}_selections"] = selected_objects
            st.session_state[f"test_image_{i}_correct"] = test["contains"]
            
            st.markdown("---")
        
        submitted = st.form_submit_button("Process Images")
    
    if submitted:
        # Simulate AI processing with a spinner
        with st.spinner("PixelPal is analyzing the images..."):
            time.sleep(2)  # Simulate processing time
        
        # Calculate results
        results = []
        total_accuracy = 0
        
        for i in range(len(selected_tests)):
            selected = st.session_state.get(f"test_image_{i}_selections", [])
            correct = st.session_state.get(f"test_image_{i}_correct", [])
            
            # Calculate true positives, false positives, false negatives
            true_positives = [obj for obj in selected if obj in correct]
            false_positives = [obj for obj in selected if obj not in correct]
            false_negatives = [obj for obj in correct if obj not in selected]
            
            # Calculate accuracy (simplified)
            if len(selected) > 0:
                precision = len(true_positives) / len(selected)
            else:
                precision = 0
                
            if len(correct) > 0:
                recall = len(true_positives) / len(correct)
            else:
                recall = 0
                
            if precision + recall > 0:
                f1_score = 2 * (precision * recall) / (precision + recall)
            else:
                f1_score = 0
            
            # Store results
            results.append({
                "image_index": i,
                "true_positives": true_positives,
                "false_positives": false_positives,
                "false_negatives": false_negatives,
                "accuracy": f1_score * 100
            })
            
            total_accuracy += f1_score * 100
        
        # Display results
        st.markdown("### PixelPal's Vision Test Results")
        
        for res in results:
            st.markdown(f"**Image {res['image_index']+1}**")
            st.markdown(f"- Correctly identified: {', '.join(res['true_positives'])}")
            if res['false_positives']:
                st.markdown(f"- Incorrectly identified: {', '.join(res['false_positives'])}")
            if res['false_negatives']:
                st.markdown(f"- Missed: {', '.join(res['false_negatives'])}")
            st.markdown(f"- Accuracy: {res['accuracy']:.1f}%")
            
            st.markdown("---")
        
        # Calculate average accuracy
        avg_accuracy = total_accuracy / len(results)
        
        st.markdown(f"**Overall Accuracy: {avg_accuracy:.1f}%**")
        
        if avg_accuracy >= 70:
            st.success("Great job! PixelPal has learned to recognize objects in images!")
            display_robot_celebration()
            if st.button("Complete the Adventure", key="complete_adventure"):
                st.session_state["adventure_stage"] = "conclusion"
                st.rerun()
        else:
            st.warning("PixelPal needs more training to improve its vision.")
            if st.button("Try Again", key="retry_task3"):
                st.rerun()
            if st.button("Complete Anyway", key="complete_anyway"):
                st.session_state["adventure_stage"] = "conclusion"
                st.rerun()

# Smart City Tasks
def display_smart_city_task1():
    """Display the first task for the Smart City adventure"""
    
    display_robot_guide("Let's start by designing smart traffic systems to reduce congestion in Futureville!")
    
    st.markdown("""
    ### Smart Traffic Systems
    
    Traffic congestion is a big problem in many cities. AI can help by:
    
    - Analyzing traffic patterns
    - Adjusting traffic light timing based on demand
    - Suggesting alternate routes to drivers
    - Coordinating public transportation
    """)
    
    # Interactive component - designing a traffic system
    st.markdown("### Design your smart traffic system")
    
    traffic_features = [
        "AI-controlled traffic lights that adapt to traffic conditions",
        "Smart road sensors that detect traffic volume",
        "Connected vehicles that communicate with traffic infrastructure",
        "Traffic prediction algorithms that anticipate congestion",
        "Automatic accident detection and emergency response",
        "Smart parking systems that show available spaces",
        "Public transportation priority at intersections",
        "Dynamic lane allocation that changes based on traffic flow"
    ]
    
    st.markdown("Select the features you want to include in your smart traffic system (choose 3-5):")
    
    # Create checkboxes for each feature
    selected_features = []
    for feature in traffic_features:
        if st.checkbox(feature, key=f"traffic_{feature}"):
            selected_features.append(feature)
    
    # Store selections
    st.session_state["traffic_system_features"] = selected_features
    
    # City map visualization placeholder
    if selected_features:
        st.markdown("### Your Smart Traffic System")
        
        # Display text description of the system
        st.markdown("Your smart traffic system includes:")
        for feature in selected_features:
            st.markdown(f"- {feature}")
        
        # Map visualization (placeholder)
        st.image("https://via.placeholder.com/600x300.png?text=Smart+Traffic+System+Map", use_column_width=True)
        
        # City simulation description
        st.markdown("### Simulation Results")
        
        # Different feedback based on selections
        if len(selected_features) >= 3:
            reduction = random.randint(25, 40)
            st.success(f"Your smart traffic system reduces congestion by approximately {reduction}%!")
            
            # Additional benefits
            st.markdown("Additional benefits:")
            benefits = [
                f"Commute times reduced by {random.randint(15, 30)}%",
                f"Fuel consumption reduced by {random.randint(10, 25)}%",
                f"Traffic accidents reduced by {random.randint(20, 35)}%"
            ]
            for benefit in benefits:
                st.markdown(f"- {benefit}")
            
            # Continue button
            if st.button("Continue to the next task", key="traffic_next"):
                st.session_state["adventure_stage"] = "task2"
                st.rerun()
        else:
            st.warning("Please select at least 3 features for your smart traffic system.")

def display_smart_city_task2():
    """Display the second task for the Smart City adventure"""
    
    display_robot_guide("Now, let's design smart energy systems to make Futureville more environmentally friendly!")
    
    st.markdown("""
    ### Smart Energy Systems
    
    Cities use a lot of energy for buildings, transportation, and services. AI can help make energy use more efficient:
    
    - Smart grids that balance electricity distribution
    - Intelligent buildings that optimize heating and cooling
    - Renewable energy integration and management
    - Predictive maintenance for energy infrastructure
    """)
    
    # Interactive component - designing an energy system
    st.markdown("### Design your smart energy system")
    
    # Create options for different aspects of the energy system
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Energy Sources")
        energy_sources = st.multiselect(
            "Select energy sources for your city:",
            options=["Solar panels", "Wind turbines", "Hydroelectric power", "Geothermal energy", "Biomass energy"],
            default=["Solar panels"]
        )
        
        st.markdown("#### Building Management")
        building_systems = st.multiselect(
            "Select smart building features:",
            options=[
                "Automated lighting control",
                "Smart thermostats",
                "Energy usage monitoring",
                "Window shading optimization",
                "Occupancy-based climate control"
            ],
            default=["Smart thermostats"]
        )
    
    with col2:
        st.markdown("#### Grid Management")
        grid_features = st.multiselect(
            "Select smart grid features:",
            options=[
                "AI load balancing",
                "Energy storage systems",
                "Predictive demand forecasting",
                "Automated fault detection",
                "Microgrid integration"
            ],
            default=["Energy storage systems"]
        )
        
        st.markdown("#### Consumer Engagement")
        consumer_features = st.multiselect(
            "Select consumer engagement features:",
            options=[
                "Real-time energy usage apps",
                "Smart home integration",
                "Time-of-use pricing",
                "Energy-saving recommendations",
                "Community energy challenges"
            ],
            default=["Real-time energy usage apps"]
        )
    
    # Store selections
    st.session_state["energy_system"] = {
        "sources": energy_sources,
        "building": building_systems,
        "grid": grid_features,
        "consumer": consumer_features
    }
    
    # Energy system visualization
    st.markdown("### Your Smart Energy System")
    
    # System visualization placeholder
    st.image("https://via.placeholder.com/600x300.png?text=Smart+Energy+System", use_column_width=True)
    
    # Calculate system efficiency based on selections
    total_selections = len(energy_sources) + len(building_systems) + len(grid_features) + len(consumer_features)
    
    if total_selections >= 8:
        efficiency = random.randint(85, 95)
        sustainability = "Excellent"
    elif total_selections >= 6:
        efficiency = random.randint(70, 84)
        sustainability = "Good"
    else:
        efficiency = random.randint(50, 69)
        sustainability = "Moderate"
    
    # Display efficiency rating
    st.markdown("### System Performance")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Energy Efficiency", f"{efficiency}%")
    
    with col2:
        st.metric("Sustainability Rating", sustainability)
    
    with col3:
        carbon_reduction = int(efficiency * 0.8)
        st.metric("Carbon Footprint Reduction", f"{carbon_reduction}%")
    
    # Continue button
    if total_selections >= 4:
        if st.button("Continue to the next task", key="energy_next"):
            st.session_state["adventure_stage"] = "task3"
            st.rerun()
    else:
        st.warning("Please select more components for your energy system (at least 4 in total).")

def display_smart_city_task3():
    """Display the third task for the Smart City adventure"""
    
    display_robot_guide("Finally, let's create AI assistants to help the citizens of Futureville!")
    
    st.markdown("""
    ### AI City Assistants
    
    AI assistants can help citizens access information, services, and support in a smart city.
    
    These assistants can be available through mobile apps, public kiosks, smart speakers, or even robots!
    """)
    
    # Interactive component - creating AI assistants
    st.markdown("### Design your AI city assistant")
    
    # Assistant platforms
    platforms = ["Mobile App", "Public Kiosks", "Smart Speakers", "Service Robots"]
    selected_platform = st.radio("How will citizens access your AI assistant?", platforms)
    
    # Assistant name
    assistant_name = st.text_input("What will you name your AI assistant?", "CityHelper")
    
    # Assistant personality
    personalities = ["Friendly and Helpful", "Professional and Efficient", "Fun and Enthusiastic", "Calm and Reassuring"]
    selected_personality = st.select_slider("What personality will your assistant have?", personalities)
    
    # Assistant services
    st.markdown("#### Services Offered")
    st.markdown("Select the services your AI assistant will provide (choose at least 5):")
    
    services = [
        "Public transportation information and navigation",
        "Emergency services and first aid guidance",
        "City event listings and tickets",
        "Restaurant recommendations and reservations",
        "Garbage collection schedules and recycling information",
        "Utility payment and service requests",
        "Tourist information and city guides",
        "Public facility locations and hours",
        "Weather forecasts and alerts",
        "Traffic updates and alternative routes",
        "Parking availability and reservations",
        "City government services and document requests"
    ]
    
    # Create service selection with checkboxes
    selected_services = []
    cols = st.columns(2)
    for i, service in enumerate(services):
        with cols[i % 2]:
            if st.checkbox(service, key=f"service_{i}"):
                selected_services.append(service)
    
    # Store selections
    st.session_state["city_assistant"] = {
        "name": assistant_name,
        "platform": selected_platform,
        "personality": selected_personality,
        "services": selected_services
    }
    
    # Assistant visualization based on platform
    if selected_platform and assistant_name and selected_personality and len(selected_services) >= 5:
        st.markdown(f"### Meet {assistant_name}!")
        
        # Display assistant image based on platform
        st.image(f"https://via.placeholder.com/600x300.png?text={assistant_name}+on+{selected_platform}", use_column_width=True)
        
        # Assistant description
        st.markdown(f"""
        **{assistant_name}** is a {selected_personality.lower()} AI assistant available via {selected_platform}.
        
        It helps citizens with:
        """)
        
        for service in selected_services:
            st.markdown(f"- {service}")
        
        # Citizen satisfaction
        satisfaction = 70 + min(len(selected_services) * 3, 25)
        
        st.markdown("### Citizen Satisfaction Projection")
        st.progress(satisfaction / 100)
        st.markdown(f"Projected citizen satisfaction: {satisfaction}%")
        
        # Additional insights
        st.markdown("### Impact Analysis")
        
        col1, col2 = st.columns(2)
        
        with col1:
            daily_users = random.randint(5, 20) * 1000
            st.metric("Estimated Daily Users", f"{daily_users:,}")
            
            efficiency = random.randint(20, 40)
            st.metric("Service Efficiency Improvement", f"{efficiency}%")
        
        with col2:
            cost_reduction = random.randint(15, 30)
            st.metric("Administrative Cost Reduction", f"{cost_reduction}%")
            
            inclusion = random.randint(70, 95)
            st.metric("Digital Inclusion Rate", f"{inclusion}%")
        
        # Complete button
        if st.button("Complete Smart City Design", key="complete_city"):
            st.session_state["adventure_stage"] = "conclusion"
            st.rerun()
    else:
        if len(selected_services) < 5:
            st.warning("Please select at least 5 services for your AI assistant.")

# Robot Friend Tasks
def display_robot_friend_task1():
    """Display the first task for the Robot Friend adventure"""
    
    display_robot_guide("Let's start by designing how your robot friend will look!")
    
    st.markdown("""
    ### Design Your Robot's Appearance
    
    Your robot's appearance affects how people interact with it. You can customize:
    
    - Body shape and size
    - Colors and materials
    - Face and expressions
    - Mobility features
    """)
    
    # Interactive component - robot appearance design
    st.markdown("### Customize your robot")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Robot body style
        body_style = st.radio(
            "Choose a body style:",
            options=["Humanoid", "Animal-like", "Vehicle-like", "Abstract/Geometric"]
        )
        
        # Size
        size = st.select_slider(
            "Choose your robot's size:",
            options=["Tiny (toy-sized)", "Small (cat-sized)", "Medium (dog-sized)", "Large (child-sized)", "Very Large (adult-sized)"]
        )
        
        # Mobility
        mobility = st.multiselect(
            "How will your robot move?",
            options=["Wheels", "Legs/Walking", "Arms/Climbing", "Hovering", "Rolling", "Transforming"],
            default=["Wheels"]
        )
    
    with col2:
        # Color scheme
        primary_color = st.color_picker("Primary color:", "#4287f5")
        secondary_color = st.color_picker("Secondary color:", "#f54242")
        
        # Face options
        face_style = st.radio(
            "Choose a face style:",
            options=["Digital Screen Face", "Simple LED Expressions", "Human-like Features", "Animal-like Features", "No Face"]
        )
        
        # Special features
        special_features = st.multiselect(
            "Special design features:",
            options=["Light-up parts", "Sound effects", "Extendable arms", "Hidden compartments", "Customizable displays", "Detachable components"],
            default=[]
        )
    
    # Store design choices
    st.session_state["robot_design"] = {
        "body_style": body_style,
        "size": size,
        "mobility": mobility,
        "primary_color": primary_color,
        "secondary_color": secondary_color,
        "face_style": face_style,
        "special_features": special_features
    }
    
    # Robot visualization
    st.markdown("### Your Robot Design")
    
    # Robot visualization placeholder
    st.image(f"https://via.placeholder.com/600x300.png?text=Custom+Robot+Design", use_column_width=True)
    
    # Robot description
    if body_style and size and mobility and face_style:
        # Generate description based on selections
        description = f"""
        Your robot has a {body_style.lower()} body that is {size.lower()}. 
        It moves using {' and '.join(mobility).lower()}.
        Its primary color is {primary_color} with {secondary_color} accents.
        It has a {face_style.lower()} that can display different expressions.
        """
        
        if special_features:
            description += f"\nSpecial features include: {', '.join(special_features).lower()}."
        
        st.markdown(description)
        
        # Continue button
        if st.button("Continue to the next task", key="design_next"):
            st.session_state["adventure_stage"] = "task2"
            st.rerun()
    else:
        st.warning("Please complete all design aspects of your robot.")

def display_robot_friend_task2():
    """Display the second task for the Robot Friend adventure"""
    
    display_robot_guide("Now, let's select your robot's abilities! What will your robot friend be able to do?")
    
    st.markdown("""
    ### Choose Your Robot's Abilities
    
    Your robot can have different sensors, tools, and AI capabilities:
    
    - Sensors help the robot understand its environment
    - Tools let the robot interact with objects
    - AI capabilities enable the robot to make decisions and learn
    """)
    
    # Interactive component - selecting robot abilities
    st.markdown("### Select your robot's capabilities")
    
    tab1, tab2, tab3 = st.tabs(["Sensors", "Tools", "AI Capabilities"])
    
    with tab1:
        st.markdown("#### Sensors")
        st.markdown("Select the sensors your robot will have (choose at least 3):")
        
        sensors = [
            "Cameras (vision)",
            "Microphones (hearing)",
            "Touch sensors (pressure detection)",
            "Distance sensors (proximity detection)",
            "Temperature sensors",
            "Motion sensors",
            "Light sensors",
            "GPS/location tracking"
        ]
        
        # Create sensor selection with checkboxes
        selected_sensors = []
        for sensor in sensors:
            if st.checkbox(sensor, key=f"sensor_{sensor}"):
                selected_sensors.append(sensor)
    
    with tab2:
        st.markdown("#### Tools")
        st.markdown("Select the tools your robot will have (choose at least 2):")
        
        tools = [
            "Grabber arm/hand",
            "Speaker/voice",
            "Screen display",
            "Projector",
            "Storage compartment",
            "Vacuum/cleaning tool",
            "Drawing/writing tool",
            "Game controller"
        ]
        
        # Create tool selection with checkboxes
        selected_tools = []
        for tool in tools:
            if st.checkbox(tool, key=f"tool_{tool}"):
                selected_tools.append(tool)
    
    with tab3:
        st.markdown("#### AI Capabilities")
        st.markdown("Select the AI capabilities your robot will have (choose at least 3):")
        
        capabilities = [
            "Voice recognition",
            "Object recognition",
            "Face recognition",
            "Natural language understanding",
            "Path finding/navigation",
            "Learning from examples",
            "Emotion recognition",
            "Game playing",
            "Storytelling",
            "Music creation"
        ]
        
        # Create capability selection with checkboxes
        selected_capabilities = []
        for capability in capabilities:
            if st.checkbox(capability, key=f"capability_{capability}"):
                selected_capabilities.append(capability)
    
    # Store selections
    st.session_state["robot_abilities"] = {
        "sensors": selected_sensors,
        "tools": selected_tools,
        "capabilities": selected_capabilities
    }
    
    # Robot capabilities visualization
    if len(selected_sensors) >= 3 and len(selected_tools) >= 2 and len(selected_capabilities) >= 3:
        st.markdown("### Your Robot's Capabilities")
        
        # Robot skills visualization
        st.image("https://via.placeholder.com/600x300.png?text=Robot+Capabilities+Map", use_column_width=True)
        
        # Generate description of what the robot can do
        st.markdown("#### What Your Robot Can Do")
        
        # Generate potential activities based on selected capabilities
        activities = []
        
        if "Cameras (vision)" in selected_sensors and "Object recognition" in selected_capabilities:
            activities.append("Identify and find objects for you")
        
        if "Microphones (hearing)" in selected_sensors and "Voice recognition" in selected_capabilities:
            activities.append("Listen and respond to your voice commands")
        
        if "Grabber arm/hand" in selected_tools:
            activities.append("Pick up and move small objects")
        
        if "Speaker/voice" in selected_tools and "Natural language understanding" in selected_capabilities:
            activities.append("Have conversations with you")
        
        if "GPS/location tracking" in selected_sensors and "Path finding/navigation" in selected_capabilities:
            activities.append("Navigate around your home without bumping into things")
        
        if "Game playing" in selected_capabilities:
            activities.append("Play games with you")
        
        if "Storytelling" in selected_capabilities:
            activities.append("Tell you interesting stories")
        
        if "Learning from examples" in selected_capabilities:
            activities.append("Learn from you and adapt to your preferences")
        
        # Add more generic activities if needed
        if len(activities) < 5:
            generic_activities = [
                "Help you with homework",
                "Remind you of important events",
                "Keep you company when you're alone",
                "Send messages to your friends and family",
                "Take photos and videos",
                "Play your favorite music"
            ]
            
            # Add enough generic activities to have at least 5 total
            needed = 5 - len(activities)
            activities.extend(generic_activities[:needed])
        
        # Display activities
        st.markdown("Your robot can:")
        for activity in activities:
            st.markdown(f"- {activity}")
        
        # Continue button
        if st.button("Continue to the next task", key="abilities_next"):
            st.session_state["adventure_stage"] = "task3"
            st.rerun()
    else:
        missing = []
        if len(selected_sensors) < 3:
            missing.append("at least 3 sensors")
        if len(selected_tools) < 2:
            missing.append("at least 2 tools")
        if len(selected_capabilities) < 3:
            missing.append("at least 3 AI capabilities")
        
        st.warning(f"Please select {' and '.join(missing)}.")

def display_robot_friend_task3():
    """Display the third task for the Robot Friend adventure"""
    
    display_robot_guide("Let's teach your robot how to help people! What will your robot friend do?")
    
    st.markdown("""
    ### Programming Your Robot's Behavior
    
    Your robot needs to know how to behave in different situations. Let's create some simple rules and behaviors!
    """)
    
    # Interactive component - programming robot behaviors
    st.markdown("### Program your robot")
    
    # Get robot name
    robot_name = st.text_input("What will you name your robot?", "Buddy")
    
    # Behavior programming with if-then rules
    st.markdown("#### Behavior Rules")
    st.markdown("Create simple 'if-then' rules to tell your robot how to behave:")
    
    # Pre-defined scenarios
    scenarios = [
        "Someone says 'Hello'",
        "Someone looks sad",
        "It's time for bed",
        "The weather is sunny",
        "It's your birthday",
        "Someone needs help finding something"
    ]
    
    # Create response inputs for each scenario
    robot_responses = {}
    
    for i, scenario in enumerate(scenarios):
        st.markdown(f"**If {scenario}, then your robot will:**")
        response = st.text_area(
            f"Response for scenario {i+1}",
            key=f"response_{i}",
            height=80,
            help="Write what your robot should do or say in this situation"
        )
        robot_responses[scenario] = response
    
    # Advanced behavior options
    st.markdown("#### Advanced Behavior Settings")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Robot personality traits
        st.markdown("**Personality Balance**")
        friendly_level = st.slider("Friendly vs Reserved", 1, 10, 7, help="Higher values make your robot more outgoing and talkative")
        playful_level = st.slider("Playful vs Serious", 1, 10, 6, help="Higher values make your robot more fun and silly")
    
    with col2:
        # Learning preferences
        st.markdown("**Learning Preferences**")
        learning_speed = st.slider("Learning Speed", 1, 10, 5, help="How quickly your robot adapts to new situations")
        memory_duration = st.slider("Memory Duration", 1, 10, 7, help="How long your robot remembers past interactions")
    
    # Store programming choices
    st.session_state["robot_programming"] = {
        "name": robot_name,
        "responses": robot_responses,
        "personality": {
            "friendly_level": friendly_level,
            "playful_level": playful_level
        },
        "learning": {
            "speed": learning_speed,
            "memory": memory_duration
        }
    }
    
    # Robot behavior visualization
    if robot_name and all(robot_responses.values()):
        st.markdown(f"### Meet {robot_name}!")
        
        # Robot visualization with name
        st.image(f"https://via.placeholder.com/600x300.png?text={robot_name}+the+Robot", use_column_width=True)
        
        # Generate personality description
        personality_traits = []
        
        if friendly_level >= 7:
            personality_traits.append("very friendly and outgoing")
        elif friendly_level >= 4:
            personality_traits.append("moderately friendly")
        else:
            personality_traits.append("reserved and calm")
        
        if playful_level >= 7:
            personality_traits.append("playful and fun-loving")
        elif playful_level >= 4:
            personality_traits.append("balanced between playful and serious")
        else:
            personality_traits.append("serious and focused")
        
        if learning_speed >= 7:
            personality_traits.append("learns quickly")
        else:
            personality_traits.append("learns carefully and thoroughly")
        
        if memory_duration >= 7:
            personality_traits.append("has an excellent memory")
        else:
            personality_traits.append("focuses more on the present")
        
        # Display personality description
        st.markdown(f"{robot_name} is {', '.join(personality_traits)}.")
        
        # Sample interactions based on programming
        st.markdown("### Sample Interactions")
        
        # Select 3 random scenarios to showcase
        sample_scenarios = random.sample(scenarios, 3)
        
        for scenario in sample_scenarios:
            response = robot_responses[scenario]
            
            st.markdown(f"""
            <div style="border-left: 3px solid #4287f5; padding-left: 10px; margin: 10px 0;">
                <p><strong>Human:</strong> {scenario}</p>
                <p><strong>{robot_name}:</strong> {response}</p>
            </div>
            """, unsafe_allow_html=True)
        
        # Complete button
        if st.button("Complete Your Robot Friend", key="complete_robot"):
            st.session_state["adventure_stage"] = "conclusion"
            st.rerun()
    else:
        st.warning("Please name your robot and complete all the responses.")

# Voice Adventure Tasks
def display_voice_adventure_task1():
    """Display the first task for the Voice Command Adventure"""
    
    display_robot_guide("Let's start by learning how AI understands human language!")
    
    st.markdown("""
    ### Understanding Language
    
    Voice assistants like Siri, Alexa, and Google Assistant need to:
    
    1. Hear the sounds you make (speech recognition)
    2. Understand the words you say (language processing)
    3. Figure out what you want (intent recognition)
    4. Respond appropriately (response generation)
    """)
    
    # Interactive component - speech recognition exploration
    st.markdown("### Speech Recognition Challenge")
    
    st.markdown("""
    First, let's see how computers convert speech to text.
    
    When you speak, your voice creates sound waves. The computer breaks these down into small pieces,
    analyzes the patterns, and matches them to known words in its dictionary.
    """)
    
    # Simulate speech recognition with a game
    st.markdown("#### Decode these sound patterns to words")
    
    # Create some sample "sound patterns" for kids to decode
    sound_patterns = [
        {"pattern": "▁▂▄▅▆▇█▇▆▅▄▁", "word": "hello"},
        {"pattern": "▁▁▂▃▄▄▄▃▂▁▁", "word": "computer"},
        {"pattern": "▃▄▅▆▇█▇▆▅▄▃", "word": "robot"},
        {"pattern": "▁▂▄▅▆▆▆▅▄▁", "word": "voice"},
        {"pattern": "▇█▇▆▅▄▃▂▁▁▂▄", "word": "assistant"}
    ]
    
    # Randomly select 3 patterns
    selected_patterns = random.sample(sound_patterns, 3)
    
    with st.form("speech_recognition_game"):
        correct_count = 0
        user_answers = []
        
        for i, pattern in enumerate(selected_patterns):
            st.markdown(f"**Sound Pattern {i+1}:** `{pattern['pattern']}`")
            user_word = st.text_input(f"What word is this? (Pattern {i+1})", key=f"pattern_{i}")
            user_answers.append({"user_input": user_word, "correct_word": pattern["word"]})
        
        submitted = st.form_submit_button("Check My Answers")
    
    if submitted:
        # Check answers
        for i, answer in enumerate(user_answers):
            if answer["user_input"].lower() == answer["correct_word"]:
                st.success(f"Pattern {i+1}: Correct! The word is '{answer['correct_word']}'")
                correct_count += 1
            else:
                st.error(f"Pattern {i+1}: Not quite. The word is '{answer['correct_word']}'")
        
        # Overall feedback
        if correct_count == len(selected_patterns):
            st.success("Amazing! You got all the patterns correct!")
        elif correct_count > 0:
            st.warning(f"You got {correct_count} out of {len(selected_patterns)} patterns correct.")
        else:
            st.error("Keep trying! Speech recognition can be challenging.")
        
        # Store results
        st.session_state["speech_recognition_score"] = correct_count
        
        # Continue button appears after submission
        if st.button("Continue to the next part", key="speech_next"):
            st.session_state["voice_adventure_part"] = "intent"
            st.rerun()
    
    # Second part - intent recognition
    if "voice_adventure_part" in st.session_state and st.session_state["voice_adventure_part"] == "intent":
        st.markdown("### Intent Recognition")
        
        st.markdown("""
        After understanding the words, AI needs to figure out what you want (your 'intent').
        
        For example, "What's the weather like?" and "Do I need an umbrella today?" have different words,
        but both are asking about the weather.
        """)
        
        # Intent matching game
        st.markdown("#### Match these phrases to the correct intent")
        
        intents = {
            "Weather": [
                "What's the temperature outside?",
                "Will it rain tomorrow?",
                "Should I wear a jacket today?"
            ],
            "Music": [
                "Play my favorite song",
                "Turn up the volume",
                "What's this song called?"
            ],
            "Timer": [
                "Set a timer for 10 minutes",
                "How much time is left?",
                "Remind me when the pizza is ready"
            ],
            "Information": [
                "How tall is Mount Everest?",
                "Who invented the telephone?",
                "What's the capital of France?"
            ]
        }
        
        # Create a list of phrases from all intents
        all_phrases = []
        for intent, phrases in intents.items():
            for phrase in phrases:
                all_phrases.append({"phrase": phrase, "intent": intent})
        
        # Randomly select 6 phrases
        selected_phrases = random.sample(all_phrases, 6)
        
        with st.form("intent_recognition_game"):
            correct_intent_count = 0
            intent_answers = []
            
            for i, item in enumerate(selected_phrases):
                st.markdown(f"**Phrase {i+1}:** '{item['phrase']}'")
                selected_intent = st.radio(
                    f"What is the user asking for? (Phrase {i+1})",
                    options=list(intents.keys()),
                    key=f"intent_{i}"
                )
                intent_answers.append({
                    "phrase": item["phrase"],
                    "user_intent": selected_intent,
                    "correct_intent": item["intent"]
                })
            
            intent_submitted = st.form_submit_button("Check My Answers")
        
        if intent_submitted:
            # Check intent answers
            for i, answer in enumerate(intent_answers):
                if answer["user_intent"] == answer["correct_intent"]:
                    st.success(f"Phrase {i+1}: Correct! The intent is '{answer['correct_intent']}'")
                    correct_intent_count += 1
                else:
                    st.error(f"Phrase {i+1}: Not quite. The intent is '{answer['correct_intent']}'")
            
            # Overall feedback
            if correct_intent_count >= len(intent_answers) * 0.8:
                st.success(f"Excellent! You correctly identified {correct_intent_count} out of {len(intent_answers)} intents!")
            elif correct_intent_count >= len(intent_answers) * 0.5:
                st.warning(f"Good job! You identified {correct_intent_count} out of {len(intent_answers)} intents correctly.")
            else:
                st.error(f"You identified {correct_intent_count} out of {len(intent_answers)} intents correctly. Intent recognition can be tricky!")
            
            # Store results and proceed to next task
            st.session_state["intent_recognition_score"] = correct_intent_count
            
            # Continue button
            if st.button("Continue to the next task", key="intent_next"):
                st.session_state["adventure_stage"] = "task2"
                st.rerun()

def display_voice_adventure_task2():
    """Display the second task for the Voice Command Adventure"""
    
    display_robot_guide("Now let's create responses to voice commands!")
    
    st.markdown("""
    ### Responding to Commands
    
    After understanding what the user wants, a voice assistant needs to:
    
    1. Find the relevant information or perform the action
    2. Generate a helpful and natural-sounding response
    3. Speak the response in a way that sounds human-like
    """)
    
    # Interactive component - creating responses
    st.markdown("### Response Generator")
    
    st.markdown("""
    Let's create a voice assistant that responds to different commands.
    
    For each command, write a helpful and friendly response that your voice assistant would say.
    """)
    
    # Sample commands
    commands = [
        "What's the weather like today?",
        "Tell me a joke",
        "What time is it?",
        "Set an alarm for 7 AM tomorrow",
        "How do I make chocolate chip cookies?",
        "What's the capital of Japan?"
    ]
    
    # Randomly select 4 commands
    selected_commands = random.sample(commands, 4)
    
    # Let user create responses
    responses = {}
    
    for i, command in enumerate(selected_commands):
        st.markdown(f"**Command {i+1}:** '{command}'")
        response = st.text_area(
            f"How should your voice assistant respond? (Command {i+1})",
            key=f"response_{i}",
            height=80
        )
        responses[command] = response
    
    # Name the assistant
    assistant_name = st.text_input("What's your voice assistant's name?", "Echo")
    
    # Store responses
    st.session_state["voice_assistant"] = {
        "name": assistant_name,
        "responses": responses
    }
    
    # Display assistant with responses if all fields are filled
    if assistant_name and all(responses.values()):
        st.markdown(f"### Meet {assistant_name}!")
        
        # Assistant visualization
        st.image(f"https://via.placeholder.com/400x200.png?text={assistant_name}+Voice+Assistant", use_column_width=True)
        
        # Sample conversation
        st.markdown("#### Sample Conversation")
        
        for command, response in responses.items():
            st.markdown(f"""
            <div style="border-left: 3px solid #4287f5; padding-left: 10px; margin: 10px 0;">
                <p><strong>User:</strong> {command}</p>
                <p><strong>{assistant_name}:</strong> {response}</p>
            </div>
            """, unsafe_allow_html=True)
        
        # Rate the responses
        st.markdown("### Response Quality")
        
        # Simulate AI evaluation of responses
        clarity_score = random.randint(70, 100)
        helpfulness_score = random.randint(70, 100)
        personality_score = random.randint(70, 100)
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("Clarity", f"{clarity_score}%")
        
        with col2:
            st.metric("Helpfulness", f"{helpfulness_score}%")
        
        with col3:
            st.metric("Personality", f"{personality_score}%")
        
        # Feedback based on scores
        average_score = (clarity_score + helpfulness_score + personality_score) / 3
        
        if average_score >= 90:
            st.success(f"{assistant_name} provides excellent responses! Users would love interacting with this voice assistant.")
        elif average_score >= 80:
            st.success(f"{assistant_name} gives very good responses. With a little refinement, this could be an excellent voice assistant.")
        elif average_score >= 70:
            st.warning(f"{assistant_name} provides good responses, but there's room for improvement in clarity and helpfulness.")
        
        # Continue button
        if st.button("Continue to the next task", key="response_next"):
            st.session_state["adventure_stage"] = "task3"
            st.rerun()
    else:
        st.warning("Please name your assistant and complete all the responses.")

def display_voice_adventure_task3():
    """Display the third task for the Voice Command Adventure"""
    
    display_robot_guide("Let's put everything together and create a voice command system!")
    
    st.markdown("""
    ### Building a Voice Command System
    
    Now we'll combine everything we've learned to create a complete voice command system.
    
    Your system will need to:
    1. Recognize different types of commands
    2. Process different information based on the command type
    3. Generate appropriate responses
    """)
    
    # Interactive component - creating a complete system
    st.markdown("### Design Your Voice Command System")
    
    # Get assistant name from previous task
    assistant_name = st.session_state.get("voice_assistant", {}).get("name", "Echo")
    
    # Command categories to implement
    command_categories = [
        "Weather Information",
        "Time and Scheduling",
        "Entertainment",
        "Knowledge Questions",
        "Home Control",
        "Navigation and Directions"
    ]
    
    # Let user select categories to implement
    st.markdown("#### Select command categories to implement (choose at least 3):")
    
    selected_categories = []
    for category in command_categories:
        if st.checkbox(category, key=f"category_{category}"):
            selected_categories.append(category)
    
    # Advanced settings for the assistant
    st.markdown("#### Voice Settings")
    
    col1, col2 = st.columns(2)
    
    with col1:
        voice_gender = st.radio("Voice Type:", ["Female", "Male", "Neutral/Robotic"])
        voice_speed = st.slider("Speaking Speed:", 1, 10, 5)
    
    with col2:
        accent = st.selectbox("Accent:", ["American", "British", "Australian", "No accent"])
        personality = st.select_slider(
            "Personality Style:",
            options=["Very Professional", "Friendly Professional", "Casual and Friendly", "Fun and Playful"]
        )
    
    # Privacy and data settings
    st.markdown("#### Privacy Settings")
    
    data_collection = st.radio(
        "Data Collection:",
        ["Minimal (essential functions only)", "Moderate (improve assistant over time)", "Extensive (personalized experience)"]
    )
    
    wake_word = st.text_input("Wake Word/Phrase:", f"Hey {assistant_name}")
    
    # Store system design
    st.session_state["voice_system"] = {
        "name": assistant_name,
        "categories": selected_categories,
        "voice": {
            "gender": voice_gender,
            "speed": voice_speed,
            "accent": accent,
            "personality": personality
        },
        "privacy": {
            "data_collection": data_collection,
            "wake_word": wake_word
        }
    }
    
    # System demonstration
    if len(selected_categories) >= 3 and wake_word:
        st.markdown("### Your Voice Command System")
        
        # System visualization
        st.image(f"https://via.placeholder.com/600x300.png?text={assistant_name}+Voice+System", use_column_width=True)
        
        # System description
        st.markdown(f"""
        **{assistant_name}** is a voice command system that responds to the wake phrase "{wake_word}".
        
        It uses a {voice_gender.lower()} voice with a{' ' + accent.lower() if accent != "No accent" else "n unaccented"} accent, 
        speaking at {speed_description(voice_speed)} pace. The assistant's personality is {personality.lower()}.
        
        {assistant_name} can help with:
        """)
        
        for category in selected_categories:
            st.markdown(f"- {category}")
        
        st.markdown(f"Privacy level: {data_collection}")
        
        # Sample interactions
        st.markdown("### Sample Interactions")
        
        # Generate sample interactions based on selected categories
        sample_commands = {
            "Weather Information": [
                f"{wake_word}, what's the weather like today?",
                f"{wake_word}, will I need an umbrella tomorrow?"
            ],
            "Time and Scheduling": [
                f"{wake_word}, set an alarm for 7 AM",
                f"{wake_word}, what's on my calendar today?"
            ],
            "Entertainment": [
                f"{wake_word}, play some jazz music",
                f"{wake_word}, tell me a joke"
            ],
            "Knowledge Questions": [
                f"{wake_word}, who was the first person on the moon?",
                f"{wake_word}, how far is the sun from Earth?"
            ],
            "Home Control": [
                f"{wake_word}, turn off the living room lights",
                f"{wake_word}, set the thermostat to 72 degrees"
            ],
            "Navigation and Directions": [
                f"{wake_word}, how do I get to the nearest grocery store?",
                f"{wake_word}, what's the traffic like on my route to school?"
            ]
        }
        
        # Select one sample command from each selected category
        interactions = []
        for category in selected_categories:
            if category in sample_commands:
                interactions.append(sample_commands[category][0])
        
        # Display 3 sample interactions
        sample_interactions = interactions[:3]
        
        for i, interaction in enumerate(sample_interactions):
            # Generate a plausible response based on the command
            response = generate_assistant_response(interaction, assistant_name, personality)
            
            st.markdown(f"""
            <div style="border-left: 3px solid #4287f5; padding-left: 10px; margin: 10px 0;">
                <p><strong>User:</strong> {interaction}</p>
                <p><strong>{assistant_name}:</strong> {response}</p>
            </div>
            """, unsafe_allow_html=True)
        
        # System evaluation
        st.markdown("### System Evaluation")
        
        # Calculate scores based on selections
        features_score = min(100, len(selected_categories) * 15)
        
        # Voice customization score
        voice_custom_score = 60
        if voice_gender != "Neutral/Robotic":
            voice_custom_score += 10
        if accent != "No accent":
            voice_custom_score += 10
        if voice_speed != 5:
            voice_custom_score += 10
        if personality != "Friendly Professional":
            voice_custom_score += 10
        
        # Privacy score (higher for more privacy)
        privacy_score = 60
        if data_collection == "Minimal (essential functions only)":
            privacy_score += 30
        elif data_collection == "Moderate (improve assistant over time)":
            privacy_score += 20
        else:
            privacy_score += 10
        
        # Wake word score
        wake_score = 70
        if len(wake_word.split()) > 1:
            wake_score += 15  # Multi-word wake phrases reduce false activations
        if len(wake_word) > 5:
            wake_score += 15  # Longer wake words are more distinctive
        
        # Display scores
        col1, col2 = st.columns(2)
        
        with col1:
            st.metric("Features Coverage", f"{features_score}%")
            st.metric("Voice Customization", f"{voice_custom_score}%")
        
        with col2:
            st.metric("Privacy Protection", f"{privacy_score}%")
            st.metric("Wake Word Effectiveness", f"{wake_score}%")
        
        # Overall evaluation
        average_score = (features_score + voice_custom_score + privacy_score + wake_score) / 4
        
        if average_score >= 85:
            st.success(f"Excellent design! {assistant_name} is a comprehensive voice assistant with great features and usability.")
        elif average_score >= 75:
            st.success(f"Very good design! {assistant_name} is a capable voice assistant that users would enjoy.")
        else:
            st.warning(f"Good design. {assistant_name} covers the basics but could use more features or customization.")
        
        # Complete button
        if st.button("Complete Voice Adventure", key="complete_voice"):
            st.session_state["adventure_stage"] = "conclusion"
            st.rerun()
    else:
        if len(selected_categories) < 3:
            st.warning("Please select at least 3 command categories.")
        if not wake_word:
            st.warning("Please enter a wake word or phrase.")

# Helper function to describe speed
def speed_description(speed_value):
    if speed_value <= 3:
        return "a slow"
    elif speed_value <= 7:
        return "a moderate"
    else:
        return "a fast"

# Helper function to generate assistant responses
def generate_assistant_response(command, assistant_name, personality):
    # Extract the command type from the wake word
    command_lower = command.lower()
    
    if "weather" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "It's looking bright and sunny today with a high of 75°F. Perfect weather for some outdoor fun!"
        else:
            return "Today's forecast is sunny with a high of 75°F and a low of 58°F. There's a 10% chance of precipitation."
    
    elif "alarm" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "You got it! Alarm set for 7 AM. Don't hit snooze too many times!"
        else:
            return "I've set your alarm for 7:00 AM tomorrow morning."
    
    elif "joke" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "Why don't scientists trust atoms? Because they make up everything! 😄"
        else:
            return "Here's a joke: Why don't scientists trust atoms? Because they make up everything."
    
    elif "moon" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "Neil Armstrong was the first human to step on the moon in 1969. One small step for man, one giant leap for mankind!"
        else:
            return "The first person on the moon was Neil Armstrong on July 20, 1969, during the Apollo 11 mission."
    
    elif "light" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "Lights out in the living room! Anything else you'd like me to do?"
        else:
            return "I've turned off the living room lights for you."
    
    elif "grocery" in command_lower or "store" in command_lower:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return "The nearest grocery store is Freshmart, just 0.8 miles away. Take a right at the next intersection and you'll see it on your left!"
        else:
            return "The nearest grocery store is Freshmart at 0.8 miles away. I'll display directions on your device."
    
    else:
        if personality in ["Fun and Playful", "Casual and Friendly"]:
            return f"I'm on it! I'll help you with that right away."
        else:
            return f"I'll assist you with that request immediately."

# Run the main function
if __name__ == "__main__":
    main()
