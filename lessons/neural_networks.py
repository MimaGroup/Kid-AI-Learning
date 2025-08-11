def get_lesson_content():
    """
    Neural Networks: Brain-Inspired Computing lesson content
    """
    content = {
        "title": "Neural Networks: Brain-Inspired Computing",
        "difficulty": "Intermediate",
        "duration": "25 min",
        "sections": [
            {
                "title": "What are Neural Networks?",
                "content": """
                Neural networks are computing systems inspired by the biological neural networks in human brains.
                
                They are the foundation of many modern AI systems and can learn to perform tasks by analyzing examples.
                
                Just like the neurons in our brain, artificial neural networks consist of connected nodes (artificial neurons) that work together to process information.
                """
            },
            {
                "title": "How Neural Networks Work",
                "content": """
                Neural networks have layers of connected nodes:
                
                1. **Input Layer**: Receives the initial data (like pixels of an image)
                2. **Hidden Layers**: Process the information through weighted connections
                3. **Output Layer**: Provides the final result (like recognizing a cat in a photo)
                
                Each connection between neurons has a "weight" that strengthens or weakens the signal, and these weights are adjusted during learning.
                """
            },
            {
                "title": "Training Neural Networks",
                "content": """
                Neural networks learn through a process called "training":
                
                1. The network makes a prediction based on input data
                2. The prediction is compared to the correct answer
                3. The difference (error) is used to adjust the network's weights
                4. This process repeats many times with many examples
                
                This is similar to how our brains learn from experience!
                """
            },
            {
                "title": "Types of Neural Networks",
                "content": """
                There are many types of neural networks for different tasks:
                
                - **Convolutional Neural Networks (CNNs)**: Great for images and visual recognition
                - **Recurrent Neural Networks (RNNs)**: Good for sequences like text or time series
                - **Transformers**: Powerful for language understanding and generation
                
                Each type has a structure specialized for certain kinds of patterns.
                """
            }
        ],
        "quiz": [
            {
                "question": "What are neural networks inspired by?",
                "options": [
                    "Computer circuits",
                    "Biological neural networks in human brains",
                    "Electronic calculators",
                    "Steam engines"
                ],
                "correct_answer": 1
            },
            {
                "question": "Which of these is NOT a standard layer in a neural network?",
                "options": [
                    "Input Layer",
                    "Hidden Layer",
                    "Memory Layer",
                    "Output Layer"
                ],
                "correct_answer": 2
            },
            {
                "question": "How do neural networks learn?",
                "options": [
                    "By memorizing all possible answers",
                    "By being explicitly programmed with rules",
                    "By adjusting connection weights based on errors",
                    "They don't learn, they're pre-programmed"
                ],
                "correct_answer": 2
            }
        ]
    }
    return content