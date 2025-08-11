import streamlit as st

def get_age_group():
    """Get the current age group from session state or prompt user"""
    if 'age_group' not in st.session_state:
        st.warning("Please select your age group first!")
        age = st.slider("How old are you?", 5, 12, 8)
        
        if age <= 7:
            st.session_state.age_group = "young"
        elif age <= 10:
            st.session_state.age_group = "middle"
        else:
            st.session_state.age_group = "older"
    
    return st.session_state.age_group

def adaptive_content(young_content, middle_content, older_content):
    """Display content appropriate for the user's age group"""
    age_group = get_age_group()
    
    if age_group == "young":
        return young_content
    elif age_group == "middle":
        return middle_content
    else:
        return older_content

def display_adaptive_explanation(topic, young_explanation, middle_explanation, older_explanation):
    """Display an age-appropriate explanation of a topic"""
    age_group = get_age_group()
    
    st.subheader(f"Let's learn about {topic}!")
    
    if age_group == "young":
        st.markdown(f"""
        <div style="background-color: #ffebee; padding: 15px; border-radius: 10px; border: 2px dashed #ff8a80;">
            <p style="font-size: 18px; font-family: 'Comic Sans MS', cursive;">{young_explanation}</p>
        </div>
        """, unsafe_allow_html=True)
    elif age_group == "middle":
        st.markdown(f"""
        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 10px; border: 2px dashed #82b1ff;">
            <p style="font-size: 16px;">{middle_explanation}</p>
        </div>
        """, unsafe_allow_html=True)
    else:
        st.markdown(f"""
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 10px; border: 2px dashed #66bb6a;">
            <p style="font-size: 16px;">{older_explanation}</p>
        </div>
        """, unsafe_allow_html=True)
