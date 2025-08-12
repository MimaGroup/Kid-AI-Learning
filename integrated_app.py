import streamlit as st
from parent_dashboard import main as parent_main
from enhanced_kids_app import main as kids_main

def main():
    """Integrated application with both parent and kids interfaces"""
    st.set_page_config(
        page_title="AI Kids Learning Platform",
        page_icon="🚀",
        layout="wide"
    )
    
    # Sidebar for app selection
    st.sidebar.title("🚀 AI Kids Learning Platform")
    
    app_mode = st.sidebar.selectbox("Choose Interface:", [
        "👶 Kids Learning App",
        "👨‍👩‍👧‍👦 Parent Dashboard"
    ])
    
    st.sidebar.markdown("---")
    st.sidebar.markdown("""
    ### 🌟 Features:
    - **Kids App**: Interactive AI learning activities
    - **Parent Dashboard**: Progress tracking & oversight
    - **Progress Analytics**: Detailed learning insights
    - **Safety Controls**: Parent-managed settings
    """)
    
    if app_mode == "👶 Kids Learning App":
        kids_main()
    else:
        parent_main()

if __name__ == "__main__":
    main()
