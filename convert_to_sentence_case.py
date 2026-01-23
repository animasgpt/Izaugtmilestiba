import json

file_path = r'c:\Users\GatisRomanovskis\SIA Anima\ANIMAS - Documents\Projekti\izaugt-milestiba\data\site-texts.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def to_sentence_case(text):
    if not text:
        return text
    # Only capitalize the first letter of the first word, lowercase the rest
    # But wait, some texts might have multiple sentences.
    # The user said "Lielais burts ir tikai pirmais teikumā" (Capital letter is only the first in the sentence).
    # This implies that if there are multiple sentences, each should start with a capital.
    
    sentences = text.split('. ')
    processed_sentences = []
    for s in sentences:
        if not s:
            processed_sentences.append(s)
            continue
        # Find the first letter to capitalize
        first_char_idx = -1
        for i, char in enumerate(s):
            if char.isalpha():
                first_char_idx = i
                break
        
        if first_char_idx != -1:
            new_s = s[:first_char_idx] + s[first_char_idx].upper() + s[first_char_idx+1:].lower()
            processed_sentences.append(new_s)
        else:
            processed_sentences.append(s.lower())
    
    return '. '.join(processed_sentences)

for item in data:
    if 'value' in item and item['value']:
        item['value'] = to_sentence_case(item['value'])

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
