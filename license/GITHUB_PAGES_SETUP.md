# License Website Setup for GitHub Pages

Since your main website is hosted on GitHub Pages, we need to use a different approach. GitHub Pages has specific limitations and requirements.

## Current Configuration

- **Main Domain**: `www.bayansoft-ye.com` (GitHub Pages)
- **License Path**: `www.bayansoft-ye.com/license`
- **Technology**: React.js with TypeScript
- **Hosting**: GitHub Pages

## GitHub Pages Limitations

1. **No subdirectories for React apps**: GitHub Pages doesn't support React Router in subdirectories
2. **Single repository per site**: Each GitHub Pages site needs its own repository
3. **Custom domains**: Limited to one custom domain per repository

## Solution Options

### Option 1: Separate Repository (Recommended)

Create a separate GitHub repository for the license website:

1. **Create new repository**: `bayansoft-license`
2. **Deploy license website** to this repository
3. **Configure custom domain**: `license.bayansoft-ye.com`

### Option 2: Same Repository, Different Branch

Use a different branch for the license website:

1. **Create `license` branch** in your main repository
2. **Configure GitHub Pages** to serve from this branch
3. **Set up subdomain**: `license.bayansoft-ye.com`

### Option 3: Static Files in Main Repository

Add the license website as static files in your main repository:

1. **Build the React app**
2. **Add build files** to a `license` folder in your main repository
3. **Access via**: `www.bayansoft-ye.com/license`

## Recommended Approach: Option 1 (Separate Repository)

### Step 1: Create New Repository

1. **Create GitHub repository**: `bayansoft-license`
2. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/bayansoft-license.git
   cd bayansoft-license
   ```

### Step 2: Configure License Website

1. **Copy license files** to the new repository
2. **Update package.json**:
   ```json
   {
     "homepage": "https://license.bayansoft-ye.com",
     "name": "bayansoft-license",
     "version": "1.0.0"
   }
   ```

3. **Create CNAME file**:
   ```
   license.bayansoft-ye.com
   ```

### Step 3: Deploy to GitHub Pages

1. **Build the website**:
   ```bash
   npm install
   npm run build
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial license website setup"
   git push origin main
   ```

3. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Custom domain: `license.bayansoft-ye.com`

### Step 4: DNS Configuration

Add CNAME record in your domain DNS:

```
Type: CNAME
Name: license
Value: yourusername.github.io
TTL: 3600
```

## Alternative: Option 3 (Static Files)

If you prefer to keep everything in one repository:

### Step 1: Build License Website

```bash
cd license
npm install
npm run build
```

### Step 2: Add to Main Repository

1. **Copy build files** to your main repository:
   ```
   your-main-repo/
   ├── index.html (main website)
   ├── images/
   ├── style.css
   ├── script.js
   └── license/ (license website files)
       ├── index.html
       ├── static/
       └── ...
   ```

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add license website"
   git push origin main
   ```

### Step 3: Access License Website

The license website will be available at:
`https://www.bayansoft-ye.com/license`

## Testing Checklist

After setup, verify:
- [ ] Main website: `https://www.bayansoft-ye.com`
- [ ] License website loads correctly
- [ ] SSL certificate is working
- [ ] All functionality works
- [ ] Navigation between pages works

## Troubleshooting

### Common Issues:

1. **404 errors on refresh**:
   - GitHub Pages doesn't support React Router by default
   - Use HashRouter instead of BrowserRouter
   - Or use a 404.html redirect

2. **Custom domain not working**:
   - Check DNS propagation (24-48 hours)
   - Verify CNAME record is correct
   - Check GitHub Pages settings

3. **Build errors**:
   - Ensure Node.js version is compatible
   - Check package.json dependencies
   - Clear npm cache if needed

## Recommended File Structure

### Option 1 (Separate Repository):
```
bayansoft-license/
├── src/
├── public/
│   ├── index.html
│   └── CNAME
├── package.json
└── README.md
```

### Option 3 (Same Repository):
```
your-main-repo/
├── index.html
├── images/
├── style.css
├── script.js
└── license/
    ├── index.html
    ├── static/
    └── ...
```

## Next Steps

Choose your preferred approach and I'll help you implement it step by step! 