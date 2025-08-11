import importlib
import os
import sys
import streamlit as st

def load_lesson(lesson_id):
    """
    Load a lesson by its ID.
    
    Args:
        lesson_id: The ID of the lesson to load (e.g., 'neural_networks')
        
    Returns:
        The lesson content dictionary or None if not found
    """
    try:
        # Add the current directory to the path
        current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if current_dir not in sys.path:
            sys.path.append(current_dir)
            
        # Convert lesson_id to the expected module name
        if lesson_id == "Neural Networks: Brain-Inspired Computing":
            module_name = "neural_networks"
        elif lesson_id == "AI Ethics: Making Good Choices":
            module_name = "ai_ethics"
        elif lesson_id == "The Future of AI":
            module_name = "future_of_ai"
        elif lesson_id == "What is AI?":
            module_name = "what_is_ai"
        elif lesson_id == "Machine Learning Fundamentals":
            module_name = "machine_learning_fundamentals"
        elif lesson_id == "Natural Language Processing":
            module_name = "natural_language_processing"
        else:
            # Handle other lesson IDs
            module_name = lesson_id.lower().replace(" ", "_").replace(":", "").replace("-", "_")
        
        # Print debug info
        print(f"Trying to load lesson: {lesson_id} from module: lessons.{module_name}")
        
        # Try to import the module
        try:
            module = importlib.import_module(f"lessons.{module_name}")
            content = module.get_lesson_content()
            print(f"Successfully loaded lesson: {lesson_id}")
            return content
        except (ImportError, AttributeError) as e:
            print(f"Error loading lesson {lesson_id}: {e}")
            # Return a placeholder for lessons under development
            return {
                "title": lesson_id,
                "difficulty": "Beginner" if "What is AI" in lesson_id or "Machine Learning" in lesson_id or "Natural Language" in lesson_id else 
                             "Intermediate" if "Neural Networks" in lesson_id else "Advanced",
                "duration": "10 min" if "What is AI" in lesson_id or "Machine Learning" in lesson_id or "Natural Language" in lesson_id else 
                           "25 min" if "Neural Networks" in lesson_id else 
                           "20 min" if "AI Ethics" in lesson_id else "15 min",
                "sections": [
                    {
                        "title": "Coming Soon",
                        "content": "This lesson is under development and will be available soon!"
                    }
                ],
                "quiz": []
            }
    except Exception as e:
        print(f"Exception in load_lesson: {e}")
        return None