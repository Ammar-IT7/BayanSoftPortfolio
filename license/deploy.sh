#!/bin/bash

# Build the React app
npm run build

# Create a new branch for deployment (if using GitHub Pages)
git add .
git commit -m "Deploy license website to subdomain"
git push origin main

echo "License website deployed to license.bayansoft-ye.com" 