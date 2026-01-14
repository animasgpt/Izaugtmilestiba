import os
import json
import re
from pathlib import Path

def extract_metadata_from_md(content):
    """Extract metadata from markdown file"""
    lines = content.split('\n')
    
    # Extract title (first # heading)
    title = ""
    for line in lines:
        if line.startswith('# ') and not line.startswith('# _'):
            title = line.replace('# ', '').strip()
            break
    
    # Extract date and read time if present
    date = ""
    read_time = "5 min"
    author = "Laura Bērziņa"
    
    for i, line in enumerate(lines):
        # Look for date patterns
        if 'Aug' in line or 'Sep' in line or 'Oct' in line or any(month in line for month in ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Dec']):
            # Try to extract date
            date_match = re.search(r'([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})', line)
            if date_match:
                month_map = {
                    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
                    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
                    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
                }
                month = month_map.get(date_match.group(1), '01')
                day = date_match.group(2).zfill(2)
                year = date_match.group(3)
                date = f"{year}-{month}-{day}"
        
        # Look for read time
        if 'min read' in line:
            time_match = re.search(r'(\d+)\s+min', line)
            if time_match:
                read_time = f"{time_match.group(1)} min"
    
    # If no date found, use a default
    if not date:
        date = "2025-12-01"
    
    # Generate excerpt (first paragraph after title)
    excerpt = ""
    in_content = False
    for line in lines:
        if line.startswith('# ') and title in line:
            in_content = True
            continue
        if in_content and line.strip() and not line.startswith('#') and not line.startswith('*') and not line.startswith('!') and not line.startswith('['):
            # Clean up the line
            clean_line = re.sub(r'\*\*', '', line)
            clean_line = re.sub(r'\[.*?\]\(.*?\)', '', clean_line)
            if len(clean_line.strip()) > 50:
                excerpt = clean_line.strip()[:200]
                if len(clean_line.strip()) > 200:
                    excerpt += "..."
                break
    
    return {
        'title': title,
        'date': date,
        'read_time': read_time,
        'author': author,
        'excerpt': excerpt
    }

def determine_category(filename, content):
    """Determine category based on filename and content"""
    filename_lower = filename.lower()
    content_lower = content.lower()
    
    # Category mapping based on keywords
    if any(word in filename_lower or word in content_lower for word in ['gaidib', 'grūtniec', 'topošā', 'gaida']):
        return ('gaidibas', 'Gaidības')
    elif any(word in filename_lower or word in content_lower for word in ['jaundzimusa', 'zīdain', 'pirmie', '1. gads', 'dzīves gads']):
        return ('dzives-gads', 'Dzīves gads')
    elif any(word in filename_lower or word in content_lower for word in ['divgadniek', '2 gad', '3 gad', 'mazulis']):
        return ('2-3-gadi', '2.-3. gadi')
    elif any(word in filename_lower or word in content_lower for word in ['bērnudārz', 'bernudarz', 'pirmsskola']):
        return ('bernudarzs', 'Bērnudārzs')
    elif any(word in filename_lower or word in content_lower for word in ['saruna', 'komunikāc', 'runā', 'emocij']):
        return ('sarunas', 'Sarunas')
    else:
        return ('raksti', 'Raksti')

def clean_content(content):
    """Clean markdown content for JSON"""
    # Remove image tags
    content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
    # Remove source links
    content = re.sub(r'Source: https://.*?\n', '', content)
    # Remove multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)
    return content.strip()

def convert_md_to_json(input_dir, output_file):
    """Convert all MD files in directory to JSON array"""
    articles = []
    
    md_files = list(Path(input_dir).glob('*.md'))
    print(f"Found {len(md_files)} markdown files")
    
    for md_file in md_files:
        print(f"Processing: {md_file.name}")
        
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract metadata
            metadata = extract_metadata_from_md(content)
            
            # Determine category
            category_slug, category_name = determine_category(md_file.stem, content)
            
            # Clean content
            clean_text = clean_content(content)
            
            # Skip if no title
            if not metadata['title']:
                print(f"  ⚠️  Skipping {md_file.name} - no title found")
                continue
            
            # Create article object
            article = {
                'title': metadata['title'],
                'excerpt': metadata['excerpt'] or f"Raksts par {category_name.lower()}",
                'content': clean_text,
                'category': category_slug,
                'categoryName': category_name,
                'readTime': metadata['read_time'],
                'author': metadata['author'],
                'date': metadata['date'],
                'published': True
            }
            
            articles.append(article)
            print(f"  [OK] Added: {metadata['title'][:50]}...")
            
        except Exception as e:
            print(f"  [ERROR] Error processing {md_file.name}: {str(e)}")
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    
    print(f"\n[SUCCESS] Successfully converted {len(articles)} articles")
    print(f"[FILE] Saved to: {output_file}")
    
    # Print category breakdown
    categories = {}
    for article in articles:
        cat = article['categoryName']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\n[STATS] Category breakdown:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count} raksti")

if __name__ == '__main__':
    input_directory = r"c:\Users\GatisRomanovskis\SIA Anima\ANIMAS - Documents\Projekti\izaugt-milestiba\izaugt milestiba raksti"
    output_json = r"c:\Users\GatisRomanovskis\SIA Anima\ANIMAS - Documents\Projekti\izaugt-milestiba\raksti_bulk_upload.json"
    
    convert_md_to_json(input_directory, output_json)
    print("\n[DONE] You can now upload this JSON file via the admin panel.")
