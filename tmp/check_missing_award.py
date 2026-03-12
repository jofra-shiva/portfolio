
import os
import re

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find <Award
                if '<Award' in content:
                    # Check if Award is imported
                    if 'Award' not in content.split('import')[1].split('from')[0] if 'import' in content else True:
                         # This logic is flawed, let's use a better one
                         pass

                # Better logic:
                # Find all occurrences of Award that are NOT in an import statement
                # and NOT in a string
                
                # Let's just grep for <Award and see if it's in the file
                if '<Award' in content:
                    # Check if 'Award' is in any import line
                    has_import = False
                    for line in content.splitlines():
                        if 'import' in line and 'Award' in line:
                            has_import = True
                            break
                    if not has_import:
                        print(f"MISSING IMPORT: {path}")
