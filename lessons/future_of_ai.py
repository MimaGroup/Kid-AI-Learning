def get_lesson_content():
    """
    The Future of AI lesson content
    """
    content = {
        "title": "The Future of AI",
        "difficulty": "Advanced",
        "duration": "15 min",
        "sections": [
            {
                "title": "AI Today and Tomorrow",
                "content": """
                Artificial Intelligence has already changed how we live, work, and play.
                
                Today's AI can:
                - Recognize speech and images
                - Translate languages
                - Recommend products and content
                - Play games at superhuman levels
                
                But the future of AI holds even more exciting possibilities!
                """
            },
            {
                "title": "AI in Healthcare",
                "content": """
                In the future, AI could revolutionize healthcare by:
                
                - Detecting diseases earlier and more accurately than human doctors
                - Designing new medicines and treatments tailored to individual patients
                - Monitoring patients remotely through wearable devices
                - Making healthcare more accessible to people everywhere
                
                Imagine having an AI health assistant that knows your medical history and can spot potential health issues before they become serious!
                """
            },
            {
                "title": "AI and the Environment",
                "content": """
                AI could help us solve some of our biggest environmental challenges:
                
                - Optimizing energy usage in buildings and cities
                - Predicting and responding to natural disasters
                - Monitoring ecosystems and protecting endangered species
                - Finding new solutions for renewable energy and recycling
                
                Smart systems could help us live more sustainably and protect our planet.
                """
            },
            {
                "title": "Challenges and Responsibilities",
                "content": """
                With great power comes great responsibility. The future of AI also brings challenges:
                
                - Ensuring AI benefits everyone, not just a few
                - Protecting jobs and helping people adapt to changes
                - Keeping AI safe and preventing misuse
                - Maintaining human connection in an automated world
                
                The choices we make today about AI will shape the world of tomorrow!
                """
            }
        ],
        "quiz": [
            {
                "question": "Which of these is NOT something today's AI can do well?",
                "options": [
                    "Recognize images",
                    "Translate languages",
                    "Feel emotions",
                    "Play complex games"
                ],
                "correct_answer": 2
            },
            {
                "question": "How might AI help with environmental challenges?",
                "options": [
                    "By creating more pollution",
                    "By optimizing energy usage and monitoring ecosystems",
                    "By replacing all humans with robots",
                    "By building more factories"
                ],
                "correct_answer": 1
            },
            {
                "question": "What is an important responsibility when developing future AI?",
                "options": [
                    "Making AI as expensive as possible",
                    "Keeping AI secret from most people",
                    "Ensuring AI benefits everyone, not just a few",
                    "Making AI completely independent from human control"
                ],
                "correct_answer": 2
            }
        ]
    }
    return content
        