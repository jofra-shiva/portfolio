
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
jsx_files = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            jsx_files.append(path)

for path in jsx_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Find all component usages like <Something
        components = re.findall(r'<([A-Z][a-zA-Z0-9]*)', content)
        # Find all object property usages like icon: <Something
        components += re.findall(r'icon:\s*<([A-Z][a-zA-Z0-9]*)', content)
        
        for comp in set(components):
            # Skip common HTML-like things or already checked things
            if comp in ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'a', 'img', 'button', 'input', 'textarea', 'label', 'form', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'select', 'option', 'section', 'footer', 'nav', 'aside', 'main', 'header', 'small', 'br', 'hr', 'i', 'b', 'strong', 'em', 'Fragment', 'StrictMode']:
                continue
                
            # Check if comp is imported or defined in the file
            if f'import' in content and re.search(fr'\b{comp}\b', content.split('const')[0].split('function')[0]):
                 continue
            
            # If not in imports, check if defined as const/function
            if re.search(fr'\b(const|function|class)\s+{comp}\b', content):
                continue
                
            print(f"POTENTIAL MISSING IMPORT: {comp} in {path}")
