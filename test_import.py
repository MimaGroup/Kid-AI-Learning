import streamlit as st

st.title("Test Import")

try:
    from components.interactive_games.image_detective import display_image_detective_game
    st.success("Successfully imported display_image_detective_game")
    
    # Try calling the function
    st.subheader("Calling the function:")
    display_image_detective_game()
    
except Exception as e:
    st.error(f"Error importing: {str(e)}")
    import traceback
    st.code(traceback.format_exc())
