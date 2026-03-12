
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if '<Award' in content or '{Award}' in content or ': Award' in content:
                    # Find all import statements
                    imports = re.findall(r'import\s+\{([^}]*)\}\s+from\s+[\'"]lucide-react[\'"]', content)
                    has_award = any('Award' in imp for imp in imports)
                    if not has_award:
                         print(f"MISSING: {path}")
                    else:
                         print(f"OK: {path}")
