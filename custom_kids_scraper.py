import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time
import re
from urllib.parse import urljoin, urlparse
import os

class KidsEducationScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Custom selectors for each website
        self.site_configs = {
            'cococoders.com': {
                'name': 'CocoCoders',
                'selectors': {
                    'title': 'h1, .hero-title, [class*="title"]',
                    'content': 'p, .content, .description, .hero-subtitle',
                    'lessons': 'a[href*="lesson"], a[href*="course"]',
                    'category': 'coding-lessons'
                }
            },
            'tynker.com': {
                'name': 'Tynker',
                'selectors': {
                    'title': 'h1, h2, .course-title, [class*="title"]',
                    'content': 'p, .description, .course-description, .content',
                    'lessons': 'a[href*="course"], a[href*="lesson"], a[href*="activity"]',
                    'category': 'visual-programming'
                }
            },
            'chatgpt4kids.com': {
                'name': 'ChatGPT for Kids',
                'selectors': {
                    'title': 'h1, h2, .feature-title',
                    'content': 'p, .feature-description, .content, .text',
                    'lessons': 'a[href*="feature"], a[href*="learn"]',
                    'category': 'ai-learning'
                }
            },
            'codemonkey.com': {
                'name': 'CodeMonkey',
                'selectors': {
                    'title': 'h1, h2, .game-title, [class*="title"]',
                    'content': 'p, .description, .game-description, .content',
                    'lessons': 'a[href*="game"], a[href*="course"], a[href*="challenge"]',
                    'category': 'game-based-coding'
                }
            },
            'littlelit.ai': {
                'name': 'LittleLit AI',
                'selectors': {
                    'title': 'h1, h2, .feature-title',
                    'content': 'p, .description, .feature-text',
                    'lessons': 'a[href*="story"], a[href*="lesson"]',
                    'category': 'ai-literacy'
                }
            },
            'scratch.mit.edu': {
                'name': 'Scratch',
                'selectors': {
                    'title': 'h1, h2, .project-title, [class*="title"]',
                    'content': 'p, .description, .project-description',
                    'lessons': 'a[href*="project"], a[href*="tutorial"], a[href*="idea"]',
                    'category': 'visual-programming'
                }
            }
        }
    
    def get_site_config(self, url):
        """Get configuration for specific website"""
        domain = urlparse(url).netloc.replace('www.', '')
        return self.site_configs.get(domain, {
            'name': domain,
            'selectors': {
                'title': 'h1, h2, title',
                'content': 'p, .content, .description',
                'lessons': 'a[href*="lesson"], a[href*="course"]',
                'category': 'general'
            }
        })
    
    def extract_content(self, soup, selectors):
        """Extract content using site-specific selectors"""
        content = {
            'title': '',
            'description': '',
            'main_content': [],
            'lesson_links': []
        }
        
        # Extract title
        title_elem = soup.select_one(selectors['title'])
        if title_elem:
            content['title'] = title_elem.get_text().strip()
        
        # Extract main content
        content_elems = soup.select(selectors['content'])
        for elem in content_elems:
            text = elem.get_text().strip()
            if len(text) > 30:  # Only meaningful content
                content['main_content'].append(text)
        
        # Extract lesson links
        lesson_links = soup.select(selectors['lessons'])
        for link in lesson_links[:10]:  # Limit to 10 links
            href = link.get('href')
            if href:
                content['lesson_links'].append({
                    'text': link.get_text().strip(),
                    'url': href
                })
        
        return content
    
    def scrape_website(self, url):
        """Scrape a single website with custom configuration"""
        try:
            print(f"🕷️ Scraping: {url}")
            
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            config = self.get_site_config(url)
            
            # Extract content using site-specific selectors
            content = self.extract_content(soup, config['selectors'])
            
            # Combine all text content
            all_text = ' '.join([
                content['title'],
                ' '.join(content['main_content'][:5])  # First 5 paragraphs
            ])
            
            # Extract age information
            age_info = self.extract_age_info(all_text)
            
            result = {
                'url': url,
                'site_name': config['name'],
                'title': content['title'],
                'description': content['main_content'][0] if content['main_content'] else '',
                'full_content': ' '.join(content['main_content']),
                'lesson_links': content['lesson_links'],
                'category': config['selectors']['category'],
                'age_range': age_info,
                'scraped_at': datetime.now().isoformat(),
                'word_count': len(all_text.split()),
                'educational_focus': self.identify_focus(all_text)
            }
            
            return result
            
        except Exception as e:
            print(f"❌ Error scraping {url}: {e}")
            return None
    
    def extract_age_info(self, text):
        """Extract age information from content"""
        age_patterns = [
            r'ages?\s+(\d+)[-–](\d+)',
            r'(\d+)[-–](\d+)\s+years?\s+old',
            r'kids?\s+aged?\s+(\d+)[-–](\d+)',
            r'children\s+(\d+)[-–](\d+)',
            r'(\d+)\+\s+years?'
        ]
        
        text_lower = text.lower()
        for pattern in age_patterns:
            match = re.search(pattern, text_lower)
            if match:
                if len(match.groups()) == 2:
                    return f"{match.group(1)}-{match.group(2)}"
                else:
                    return f"{match.group(1)}+"
        
        return "All ages"
    
    def identify_focus(self, text):
        """Identify educational focus areas"""
        focus_keywords = {
            'programming': ['coding', 'programming', 'python', 'javascript', 'code'],
            'ai_ml': ['artificial intelligence', 'ai', 'machine learning', 'chatgpt'],
            'visual_programming': ['scratch', 'blocks', 'drag', 'visual'],
            'game_based': ['game', 'play', 'fun', 'adventure', 'quest'],
            'literacy': ['reading', 'writing', 'stories', 'books', 'literature'],
            'stem': ['science', 'technology', 'engineering', 'math', 'stem']
        }
        
        text_lower = text.lower()
        focuses = []
        
        for focus, keywords in focus_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                focuses.append(focus)
        
        return focuses if focuses else ['general']
    
    def scrape_all_sites(self):
        """Scrape all configured educational websites"""
        target_urls = [
            'https://www.cococoders.com/',
            'https://www.tynker.com/',
            'https://chatgpt4kids.com/',
            'https://www.codemonkey.com/',
            'https://www.littlelit.ai/',
            'https://scratch.mit.edu/'
        ]
        
        results = []
        
        for url in target_urls:
            result = self.scrape_website(url)
            if result:
                results.append(result)
            
            # Be respectful - wait between requests
            time.sleep(3)
        
        return results
    
    def save_results(self, results, filename=None):
        """Save results to JSON file"""
        if not filename:
            filename = f"scraped_data/kids_education_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        # Create directory if it doesn't exist
        os.makedirs('scraped_data', exist_ok=True)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Saved {len(results)} educational sites to {filename}")
        return filename

def main():
    """Main execution function"""
    print("🎓 Starting Kids Education Websites Scraping...")
    print("Target sites: CocoCoders, Tynker, ChatGPT4Kids, CodeMonkey, LittleLit.ai, Scratch")
    
    scraper = KidsEducationScraper()
    
    # Scrape all sites
    print("\n🕷️ Scraping educational websites...")
    results = scraper.scrape_all_sites()
    
    if results:
        # Save results
        filename = scraper.save_results(results)
        
        print(f"\n📊 Summary:")
        print(f"✅ Successfully scraped {len(results)} educational websites")
        print(f"📁 Data saved to: {filename}")
        
        for result in results:
            print(f"  • {result['site_name']}: {result['word_count']} words, Age: {result['age_range']}")
        
    else:
        print("❌ No data was successfully scraped")

if __name__ == "__main__":
    main()
