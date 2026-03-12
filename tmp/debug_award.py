
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
pattern = re.compile(r'\bAward\b')
import_pattern = re.compile(r'import\s+{[^}]*Award[^}]*}\s+from\s+[\'"]lucide-react[\'"]')

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if pattern.search(content) and not import_pattern.search(content):
                    # Check if it's used as a component <Award or {icon: <Award
                    if '<Award' in content or '{Award}' in content or ': Award' in content:
                        print(f"Potential issue in {path}")
