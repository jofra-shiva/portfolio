
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
jsx_files = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            jsx_files.append(os.path.join(root, file))

for path in jsx_files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        if 'Award' in content:
            # Check if it's imported
            # Look for: import { ... Award ... } from 'lucide-react'
            # Or: import Award from ...
            import_pattern = re.compile(r'import\s+\{.*?\bAward\b.*?\}\s+from\s+[\'"]lucide-react[\'"]')
            if '<Award' in content or '{Award}' in content or ': Award' in content or '{ icon: <Award' in content:
                if not import_pattern.search(content):
                    print(f"MISSING OR INVALID IMPORT in {path}")
                    # Print the first few lines
                    print(content[:500])
                    print("-" * 40)
