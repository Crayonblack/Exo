#!/bin/bash
# Export built HTML for import to Figma

echo "Building production version..."
cd /workspaces/default/code

# The built output should be accessible
# html.to.design can import from:
# 1. Live URL (best)
# 2. HTML file upload
# 3. HTML code paste

echo "Your dashboard is running at the Figma Make preview URL"
echo "Use that URL with html.to.design plugin in Figma"
