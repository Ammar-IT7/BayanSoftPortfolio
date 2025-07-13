#!/bin/bash

echo "🚀 Building License Website for Option 2 (Same Repository)..."

# Navigate to license directory
cd "$(dirname "$0")"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the React application
echo "🔨 Building React application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📁 Build files are ready in the 'build' folder"
    echo ""
    echo "📋 Next steps for Option 2 deployment:"
    echo ""
    echo "1. Copy all files from 'build/' folder to your main repository's 'license/' folder"
    echo "2. Your main repository structure should look like:"
    echo "   Your-Main-Repository/"
    echo "   ├── index.html (main website)"
    echo "   ├── images/"
    echo "   ├── style.css"
    echo "   ├── script.js"
    echo "   ├── CNAME"
    echo "   └── license/ (copy build files here)"
    echo "       ├── index.html"
    echo "       ├── static/"
    echo "       └── ..."
    echo ""
    echo "3. Add files to your main repository:"
    echo "   git add ."
    echo "   git commit -m 'Add license website as subdirectory'"
    echo "   git push origin main"
    echo ""
    echo "4. GitHub Pages will automatically deploy"
    echo ""
    echo "🌐 Your license website will be available at:"
    echo "   https://www.bayansoft-ye.com/license"
    echo ""
    echo "📖 See OPTION2_SETUP.md for detailed instructions"
    echo ""
    echo "⚠️  Important: If using React Router, consider using HashRouter"
    echo "   or implement 404.html redirect for better compatibility"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 