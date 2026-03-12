
import os

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'Award' in content:
                    print(f"File: {path}")
                    # Print first 10 lines to see imports
                    # print("".join(f.readlines()[:10]))
                    # simpler:
                    lines = content.splitlines()
                    for i, line in enumerate(lines[:10]):
                        if 'import' in line:
                            print(f"  Line {i+1}: {line}")
                    if '<Award' in content:
                         print(f"  Contains <Award")
