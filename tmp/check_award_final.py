
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'Award' in content:
                    # Check for Award usage
                    if '<Award' in content or '{Award}' in content or ': Award' in content:
                        # Check for import
                        if 'Award' not in content.split('import')[1].split('from')[0] if 'import' in content else True:
                             print(f"MISSING IMPORT IN {path}")
                        else:
                             print(f"FOUND IMPORT IN {path}")
