# Option 2 Setup: Same Repository (Static Files)

This guide will help you add your license website as static files to your main GitHub Pages repository.

## Current Configuration

- **Main Domain**: `www.bayansoft-ye.com` (GitHub Pages)
- **License Path**: `www.bayansoft-ye.com/license`
- **Technology**: React.js with TypeScript
- **Hosting**: GitHub Pages (same repository)

## Step-by-Step Implementation

### Step 1: Build the License Website

First, build your React application:

```bash
cd license
npm install
npm run build
```

This will create a `build` folder with all the static files.

### Step 2: Update Package.json for Subdirectory

Update the homepage in `package.json`:

```json
{
  "homepage": "https://www.bayansoft-ye.com/license"
}
```

### Step 3: Prepare Files for Main Repository

1. **Copy build files** to your main repository:
   ```
   Your-Main-Repository/
   ├── index.html (main website)
   ├── images/
   ├── style.css
   ├── script.js
   ├── CNAME
   └── license/ (license website files)
       ├── index.html
       ├── static/
       │   ├── css/
       │   ├── js/
       │   └── media/
       └── asset-manifest.json
   ```

2. **Upload to main repository**:
   - Copy all files from `license/build/` to `license/` folder in your main repo
   - Ensure the structure matches exactly

### Step 4: Deploy to GitHub Pages

1. **Add files to main repository**:
   ```bash
   git add .
   git commit -m "Add license website as subdirectory"
   git push origin main
   ```

2. **GitHub Pages will automatically deploy** the changes

### Step 5: Test the Setup

After deployment, test:
- [ ] Main website: `https://www.bayansoft-ye.com`
- [ ] License subdirectory: `https://www.bayansoft-ye.com/license`
- [ ] All functionality works correctly

## File Structure After Setup

```
Your-Main-Repository/
├── index.html (main portfolio)
├── images/
├── style.css
├── script.js
├── CNAME
└── license/
    ├── index.html (license website)
    ├── static/
    │   ├── css/
    │   ├── js/
    │   └── media/
    ├── asset-manifest.json
    └── favicon.ico
```

## Important Notes

### React Router Limitations

GitHub Pages doesn't support React Router's BrowserRouter in subdirectories. You have two options:

#### Option A: Use HashRouter (Recommended)
Update your React Router configuration:

```jsx
// Instead of BrowserRouter
import { HashRouter as Router } from 'react-router-dom';

// Use HashRouter
<Router>
  {/* Your routes */}
</Router>
```

#### Option B: Use 404.html Redirect
Create a `404.html` file in your license directory:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>License Management</title>
</head>
<body>
    <script>
        // Single Page Apps for GitHub Pages
        // https://github.com/rafgraph/spa-github-pages
        var pathSegmentsToKeep = 1;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
            l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</body>
</html>
```

## Testing Checklist

After setup, verify:
- [ ] Main website: `https://www.bayansoft-ye.com`
- [ ] License subdirectory: `https://www.bayansoft-ye.com/license`
- [ ] SSL certificate is working
- [ ] All license website functionality works
- [ ] Navigation between pages works (if using React Router)
- [ ] File uploads and data processing work

## Troubleshooting

### Common Issues:

1. **404 errors on refresh**:
   - Use HashRouter instead of BrowserRouter
   - Or implement 404.html redirect

2. **License page not loading**:
   - Check that all files are in the correct `license/` directory
   - Verify `index.html` is in the `license/` folder
   - Check GitHub Pages deployment status

3. **Build errors**:
   - Ensure Node.js version is compatible
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

4. **Assets not loading**:
   - Check that all static files are uploaded
   - Verify file paths in the build output

## Maintenance

### Updating the License Website:
1. Make changes to your React code
2. Run `npm run build`
3. Copy new build files to the `license/` directory in your main repository
4. Commit and push changes
5. Test the updated functionality

### Backup:
- Keep a copy of your source code in version control
- Regularly backup your license website files

## Advantages of This Approach

- ✅ **No DNS configuration needed**
- ✅ **SSL works automatically**
- ✅ **Easier to manage**
- ✅ **No additional hosting costs**
- ✅ **Faster setup**
- ✅ **Better SEO (same domain)**
- ✅ **Immediate availability**

## Next Steps

1. Build your license website
2. Copy files to main repository
3. Push to GitHub
4. Test the deployment
5. Configure React Router if needed 