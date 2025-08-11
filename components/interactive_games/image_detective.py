import streamlit as st
import random

def display_image_detective_game():
    """
    Display an image recognition game where kids help train an AI to recognize objects
    """
    st.subheader("AI Image Detective")
    
    # Initialize game state if not exists
    if "current_round" not in st.session_state:
        st.session_state.current_round = 1
        st.session_state.total_score = 0
        st.session_state.current_images = generate_test_images()
        st.session_state.user_answers = {}
        st.session_state.show_results = False
    
    # Display instructions
    st.markdown("""
    Help train an AI to recognize objects in pictures!
    """)
    
    if not st.session_state.show_results:
        # Display the testing interface
        st.header(f"Testing Round {st.session_state.current_round}")
        
        st.chat_message("assistant").write("Now test me! For each picture, tell me if it's a vehicles or not.")
        
        # Display images and get user input
        for img_id, img_data in st.session_state.current_images.items():
            st.subheader(f"Is this a Vehicles?")
            
            # Display image
            st.image(img_data["url"], width=200)
            
            # Ask for classification
            st.write("Is this a Vehicles?")
            col1, col2 = st.columns(2)
            with col1:
                yes = st.radio("Yes", [True, False], key=f"yes_{img_id}", label_visibility="hidden", 
                              index=0 if st.session_state.user_answers.get(img_id, None) == True else 1)
            with col2:
                no = st.radio("No", [True, False], key=f"no_{img_id}", label_visibility="hidden",
                             index=0 if st.session_state.user_answers.get(img_id, None) == False else 1)
            
            # Store the answer
            if yes:
                st.session_state.user_answers[img_id] = True
            else:
                st.session_state.user_answers[img_id] = False
            
            st.divider()
        
        # Submit button
        if st.button("Submit Answers"):
            st.session_state.show_results = True
            st.rerun()
    
    else:
        # Display results
        st.header(f"Results - Round {st.session_state.current_round}")
        
        # Calculate score
        correct_answers = 0
        for img_id, img_data in st.session_state.current_images.items():
            if st.session_state.user_answers.get(img_id, None) == img_data["is_vehicle"]:
                correct_answers += 1
        
        accuracy = (correct_answers / len(st.session_state.current_images)) * 100
        points = correct_answers
        
        # Display accuracy
        if accuracy < 60:
            st.warning(f"The AI is only {int(accuracy)}% accurate. It needs more training!")
        elif accuracy < 80:
            st.info(f"The AI is {int(accuracy)}% accurate. Getting better!")
        else:
            st.success(f"The AI is {int(accuracy)}% accurate. Great job training it!")
        
        # Display detailed results
        st.header("Detailed Results")
        
        for img_id, img_data in st.session_state.current_images.items():
            user_answer = st.session_state.user_answers.get(img_id, None)
            correct = user_answer == img_data["is_vehicle"]
            
            if correct:
                st.markdown(f"✅ {img_data['name']}: You said {'YES' if user_answer else 'NO'}. This {'IS' if img_data['is_vehicle'] else 'is NOT'} a vehicles.")
            else:
                st.markdown(f"❌ {img_data['name']}: You said {'YES' if user_answer else 'NO'}. This {'IS' if img_data['is_vehicle'] else 'is NOT'} a vehicles.")
        
        # Update total score
        st.session_state.total_score += points
        
        st.write(f"Points earned: {points}")
        st.write(f"Total score: {st.session_state.total_score}")
        
        # Next round button
        if st.button("Train on a New Category"):
            st.session_state.current_round += 1
            st.session_state.current_images = generate_test_images()
            st.session_state.user_answers = {}
            st.session_state.show_results = False
            st.rerun()

def generate_test_images():
    """Generate a set of test images with labels"""
    # In a real app, you'd use real images. Here we're using placeholders
    vehicles = [
        {"name": "Car", "url": "https://via.placeholder.com/200x150/4285F4/FFFFFF?text=Car", "is_vehicle": True},
        {"name": "Bus", "url": "https://via.placeholder.com/200x150/4285F4/FFFFFF?text=Bus", "is_vehicle": True},
        {"name": "Airplane", "url": "https://via.placeholder.com/200x150/4285F4/FFFFFF?text=Airplane", "is_vehicle": True},
        {"name": "Bicycle", "url": "https://via.placeholder.com/200x150/4285F4/FFFFFF?text=Bicycle", "is_vehicle": True}
    ]
    
    non_vehicles = [
        {"name": "Hat", "url": "https://via.placeholder.com/200x150/DB4437/FFFFFF?text=Hat", "is_vehicle": False},
        {"name": "Dress", "url": "https://via.placeholder.com/200x150/DB4437/FFFFFF?text=Dress", "is_vehicle": False},
        {"name": "Tree", "url": "https://via.placeholder.com/200x150/DB4437/FFFFFF?text=Tree", "is_vehicle": False},
        {"name": "Book", "url": "https://via.placeholder.com/200x150/DB4437/FFFFFF?text=Book", "is_vehicle": False}
    ]
    
    # Select 2 vehicles and 2 non-vehicles randomly
    selected_vehicles = random.sample(vehicles, 2)
    selected_non_vehicles = random.sample(non_vehicles, 2)
    
    # Combine and shuffle
    all_images = selected_vehicles + selected_non_vehicles
    random.shuffle(all_images)
    
    # Create a dictionary with IDs
    images_dict = {i: img for i, img in enumerate(all_images)}
    
    return images_dict
