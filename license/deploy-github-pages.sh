#!/bin/bash

echo "🚀 Building License Website for GitHub Pages..."

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
    echo "📋 Next steps for GitHub Pages deployment:"
    echo ""
    echo "Option 1: Separate Repository (Recommended)"
    echo "1. Create new GitHub repository: bayansoft-license"
    echo "2. Copy all files to the new repository"
    echo "3. Push to GitHub: git add . && git commit -m 'Initial setup' && git push"
    echo "4. Configure GitHub Pages in repository settings"
    echo "5. Add DNS CNAME: license → yourusername.github.io"
    echo ""
    echo "Option 2: Same Repository (Static Files)"
    echo "1. Copy build files to your main repository's license/ folder"
    echo "2. Push to main repository"
    echo "3. Access at: https://www.bayansoft-ye.com/license"
    echo ""
    echo "🌐 Your license website will be available at:"
    echo "   Option 1: https://license.bayansoft-ye.com"
    echo "   Option 2: https://www.bayansoft-ye.com/license"
    echo ""
    echo "📖 See GITHUB_PAGES_SETUP.md for detailed instructions"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 