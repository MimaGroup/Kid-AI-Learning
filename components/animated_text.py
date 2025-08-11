import streamlit as st
import time

def animated_text(text, delay=0.03):
    """Display text with a typewriter animation effect"""
    placeholder = st.empty()
    full_text = ""
    
    for char in text:
        full_text += char
        placeholder.markdown(full_text)
        time.sleep(delay)
    
    return placeholder

def bouncing_text(text):
    """Display text with a bouncing animation effect"""
    st.markdown(f"""
    <div style="text-align: center;">
        <h2 class="bouncing-text">{text}</h2>
    </div>
    <style>
    .bouncing-text {{
        animation: bounce 1.5s infinite;
    }}
    @keyframes bounce {{
        0%, 100% {{ transform: translateY(0); }}
        50% {{ transform: translateY(-15px); }}
    }}
    </style>
    """, unsafe_allow_html=True)
