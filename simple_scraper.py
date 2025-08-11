import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time

class SimpleEducationScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def scrape_website(self, url):
        """Scrape a single website"""
        try:
            print(f"Scraping: {url}")
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract title
            title = soup.find('title')
            title_text = title.get_text().strip() if title else "No title"
            
            # Extract main content
            content_selectors = ['p', '.content', '.article-body', 'main']
            content = []
            
            for selector in content_selectors:
                elements = soup.select(selector)
                for element in elements:
                    text = element.get_text().strip()
                    if len(text) > 50:  # Only meaningful content
                        content.append(text)
            
            return {
                'url': url,
                'title': title_text,
                'content': ' '.join(content[:10]),  # First 10 paragraphs
                'scraped_at': datetime.now().isoformat(),
                'word_count': len(' '.join(content).split())
            }
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return None
    
    def scrape_multiple_sites(self, urls):
        """Scrape multiple websites"""
        results = []
        
        for url in urls:
            result = self.scrape_website(url)
            if result:
                results.append(result)
            time.sleep(2)  # Be respectful
        
        return results
    
    def save_results(self, results, filename=None):
        """Save results to JSON file"""
        if not filename:
            filename = f"scraped_data/content_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Saved {len(results)} items to {filename}")
        return filename

# Example usage
if __name__ == "__main__":
    # Add your target URLs here
    target_urls = [
        "https://www.khanacademy.org/computing/intro-to-programming",
        "https://code.org/learn",
        "https://scratch.mit.edu/ideas",
        # Add your specific websites here
    ]
    
    scraper = SimpleEducationScraper()
    results = scraper.scrape_multiple_sites(target_urls)
    
    if results:
        filename = scraper.save_results(results)
        print(f"🎉 Scraping complete! Check {filename}")
    else:
        print("❌ No results obtained")
