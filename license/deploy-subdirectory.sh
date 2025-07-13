#!/bin/bash

echo "🚀 Building License Website for Subdirectory..."

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
    echo "📋 Next steps:"
    echo "1. Create 'license' folder in your hosting public_html directory"
    echo "2. Upload all files from 'build/' folder to public_html/license/"
    echo "3. Upload 'htaccess' file as '.htaccess' in the license folder"
    echo "4. No DNS configuration needed!"
    echo ""
    echo "🌐 Your license website will be available at:"
    echo "   https://www.bayansoft-ye.com/license"
    echo ""
    echo "✨ Advantages of this approach:"
    echo "   - No DNS configuration needed"
    echo "   - SSL works automatically"
    echo "   - Easier to manage"
    echo "   - Better SEO (same domain)"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 