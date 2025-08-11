import streamlit as st
import json

st.title("🎓 Scraped Educational Content")

# Load the data
with open("scraped_data/kids_education_20250804_164235.json", "r") as f:
    data = json.load(f)

st.success(f"✅ Loaded {len(data)} educational websites!")

for item in data:
    with st.expander(f"🌟 {item['site_name']} - Age: {item['age_range']}"):
        st.write(f"**URL:** {item['url']}")
        st.write(f"**Category:** {item['category']}")
        st.write(f"**Word Count:** {item['word_count']}")
        st.write(f"**Educational Focus:** {', '.join(item['educational_focus'])}")
        
        if item['description']:
            st.write("**Description:**")
            st.write(item['description'])
        
        if item['lesson_links']:
            st.write(f"**Found {len(item['lesson_links'])} lesson links**")
