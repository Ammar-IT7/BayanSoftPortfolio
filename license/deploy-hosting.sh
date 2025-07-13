#!/bin/bash

echo "🚀 Building License Website for Hosting Provider..."

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
    echo "1. Upload all files from 'build/' folder to your hosting provider"
    echo "2. Create subdomain 'license' in your hosting control panel"
    echo "3. Upload .htaccess file to the subdomain directory"
    echo "4. Configure DNS CNAME record: license → www.bayansoft-ye.com"
    echo "5. Wait 24-48 hours for DNS propagation"
    echo ""
    echo "🌐 Your license website will be available at:"
    echo "   https://license.bayansoft-ye.com"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 