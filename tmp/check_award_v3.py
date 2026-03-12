
import os

search_dir = r'd:\Work\Projects\portfolio\client\src'
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if '<Award' in content:
                    # Check for 'Award' in ANY import line
                    import_lines = [line for line in content.splitlines() if 'import' in line and 'from' in line]
                    has_award_import = any('Award' in line for line in import_lines)
                    if not has_award_import:
                        print(f"MISSING: {path}")
                    else:
                        print(f"OK: {path}")
