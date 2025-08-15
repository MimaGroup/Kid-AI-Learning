from content_scraper import ContentScraper

class ContentManager:
    def __init__(self):
        self.scraper = ContentScraper()
        
    def get_content_stats(self):
        return {"status": "Active", "questions": 5}
