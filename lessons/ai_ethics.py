def get_lesson_content():
    """
    AI Ethics: Making Good Choices lesson content
    """
    content = {
        "title": "AI Ethics: Making Good Choices",
        "difficulty": "Advanced",
        "duration": "20 min",
        "sections": [
            {
                "title": "Why AI Ethics Matters",
                "content": """
                AI systems are becoming more powerful and are making decisions that affect people's lives.
                
                It's important that these systems are designed to be:
                - Fair and unbiased
                - Safe and reliable
                - Transparent and explainable
                - Respectful of privacy
                
                Without ethical guidelines, AI could cause harm even when that's not the intention.
                """
            },
            {
                "title": "Fairness and Bias",
                "content": """
                AI systems learn from data, and if that data contains biases, the AI will learn those biases too.
                
                For example, if a hiring AI is trained on data from a company that mostly hired men in the past, it might unfairly favor male candidates.
                
                Creating fair AI requires:
                - Diverse and representative training data
                - Testing for bias across different groups
                - Ongoing monitoring for fairness
                """
            },
            {
                "title": "Transparency and Explainability",
                "content": """
                Many AI systems (especially neural networks) work like "black boxes" - it's hard to understand why they make specific decisions.
                
                Explainable AI aims to make these decisions understandable to humans.
                
                This is especially important in areas like:
                - Healthcare (why did the AI recommend this treatment?)
                - Criminal justice (why did the AI assess this risk level?)
                - Financial services (why was this loan application denied?)
                """
            },
            {
                "title": "Privacy and Security",
                "content": """
                AI systems often need lots of data to work well, but this raises privacy concerns.
                
                Ethical AI development includes:
                - Only collecting necessary data
                - Securing data against breaches
                - Being transparent about data usage
                - Giving users control over their data
                
                New techniques like "federated learning" can help AI learn without sharing private data.
                """
            }
        ],
        "quiz": [
            {
                "question": "Why is it important for AI to be ethical?",
                "options": [
                    "Because it's the law",
                    "Because AI systems affect people's lives and could cause harm",
                    "Because it makes AI run faster",
                    "Because it uses less computer memory"
                ],
                "correct_answer": 1
            },
            {
                "question": "What can happen if AI is trained on biased data?",
                "options": [
                    "The AI will correct the bias automatically",
                    "The AI will learn and reproduce those biases",
                    "The AI will run more efficiently",
                    "Nothing, data bias doesn't affect AI"
                ],
                "correct_answer": 1
            },
            {
                "question": "What does 'explainable AI' refer to?",
                "options": [
                    "AI that can explain other AI systems",
                    "AI that can explain human behavior",
                    "AI whose decisions can be understood by humans",
                    "AI that explains itself to other machines"
                ],
                "correct_answer": 2
            }
        ]
    }
    return content