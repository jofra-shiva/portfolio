
import os

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                for line_no, line in enumerate(f, 1):
                    if 'Award' in line:
                        print(f"{path}:{line_no}: {line.strip()}")
