import streamlit as st
import json
import glob
import os

def load_fresh_educational_content():
    files = glob.glob("scraped_data/kids_education_*.json")
    if not files:
        return []
    
    latest_file = max(files, key=os.path.getctime)
    
    try:
        with open(latest_file, 'r') as f:
            return json.load(f)
    except:
        return []

def display_fresh_resources():
    st.subheader("🆕 Fresh Educational Resources")
    
    content = load_fresh_educational_content()
    if not content:
        st.info("Run the scraper to get fresh educational content!")
        return
    
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("New Sites", len(content))
    with col2:
        total_words = sum(item['word_count'] for item in content)
        st.metric("Total Content", f"{total_words:,} words")
    with col3:
        categories = len(set(item['category'] for item in content))
        st.metric("Categories", categories)
    
    for item in content:
        with st.expander(f"🌟 {item['site_name']} - Age: {item['age_range']}"):
            st.write(f"**Focus:** {', '.join(item['educational_focus'])}")
            st.write(f"**Description:** {item['description']}")
            st.write(f"🔗 [Visit Site]({item['url']})")

if __name__ == "__main__":
    st.title("🎓 Fresh Educational Content")
    display_fresh_resources()
