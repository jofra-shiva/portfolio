
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all occurrences of the word Award
                matches = re.finditer(r'\bAward\b', content)
                for match in matches:
                    start = match.start()
                    # Check if it's in an import
                    line_start = content.rfind('\n', 0, start) + 1
                    line_end = content.find('\n', start)
                    line = content[line_start:line_end]
                    if 'import' in line:
                        continue
                    # Check if it's in a string
                    if ('"' in line and line.count('"', 0, line.find('Award')) % 2 != 0) or \
                       ("'" in line and line.count("'", 0, line.find('Award')) % 2 != 0):
                        continue
                    
                    print(f"Usage of Award found in {path}: {line.strip()}")
