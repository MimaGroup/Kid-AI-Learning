import openai
import json
import os
from dotenv import load_dotenv

load_dotenv()

def summarize_content(content, age_group="9-12"):
    """Summarize content for kids"""
    client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    prompt = f"Explain this educational content for kids aged {age_group} in simple, fun language:\n\n{content[:1000]}"
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a fun teacher who explains things simply for kids."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

# Process scraped data
def process_scraped_file(filename):
    """Add summaries to scraped data"""
    with open(filename, 'r') as f:
        data = json.load(f)
    
    for item in data:
        print(f"Summarizing: {item['title'][:50]}...")
        item['kid_summary'] = summarize_content(item['content'])
    
    # Save processed data
    processed_filename = filename.replace('.json', '_processed.json')
    with open(processed_filename, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Processed data saved to {processed_filename}")

if __name__ == "__main__":
    # Find the latest scraped file
    import glob
    files = glob.glob("scraped_data/content_*.json")
    if files:
        latest_file = max(files, key=os.path.getctime)
        print(f"Processing {latest_file}...")
        process_scraped_file(latest_file)
    else:
        print("No scraped files found. Run simple_scraper.py first!")
