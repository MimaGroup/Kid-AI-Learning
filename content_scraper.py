import sqlite3
import logging
from datetime import datetime
from typing import List, Dict

class ContentScraper:
    def __init__(self, db_path="kids_learning.db"):
        self.db_path = db_path
        self.setup_database()
        
    def setup_database(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scraped_content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content_type TEXT NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()
        
    def get_dynamic_questions(self):
        return [
            {
                "question": "What does AI stand for?",
                "options": ["Artificial Intelligence", "Advanced Internet", "Automatic Information"],
                "correct": "Artificial Intelligence",
                "explanation": "AI stands for Artificial Intelligence!"
            }
        ]
