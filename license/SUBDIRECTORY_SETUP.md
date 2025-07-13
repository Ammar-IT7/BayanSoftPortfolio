# License Website Subdirectory Setup

This guide explains how to set up the license website as a subdirectory of your main website: `www.bayansoft-ye.com/license`

## Current Configuration

- **Main Domain**: `www.bayansoft-ye.com`
- **License Path**: `www.bayansoft-ye.com/license`
- **Technology**: React.js with TypeScript
- **Hosting**: Same provider as main website

## Step-by-Step Setup

### 1. Build the License Website

First, build your React application:

```bash
cd license
npm install
npm run build
```

This will create a `build` folder with all the static files.

### 2. Update Package.json for Subdirectory

The homepage in `package.json` should be set to the subdirectory:

```json
{
  "homepage": "https://www.bayansoft-ye.com/license"
}
```

### 3. Hosting Provider Configuration

#### Option A: cPanel File Manager
1. **Create Directory**:
   - Log into your hosting control panel (cPanel)
   - Go to "File Manager"
   - Navigate to `public_html/`
   - Create a new folder called `license`

2. **Upload Files**:
   - Upload all contents of the `build` folder to `public_html/license/`
   - Ensure `index.html` is in the `license` folder

3. **Configure .htaccess**:
   - Upload the provided `.htaccess` file to the `license` folder
   - This handles React Router and security headers

#### Option B: Direct File Upload
1. **Create Directory Structure**:
   ```
   public_html/
   ├── index.html (main website)
   ├── images/
   ├── style.css
   ├── script.js
   └── license/ (subdirectory)
       ├── index.html (license website)
       ├── static/
       ├── .htaccess
       └── ... (other build files)
   ```

2. **Upload Build Files**:
   - Upload all files from `license/build/` to `public_html/license/`

### 4. No DNS Configuration Needed

Since you're using a subdirectory, no additional DNS configuration is required!

### 5. SSL Certificate

SSL will work automatically since it's part of your main domain.

## File Structure After Setup

```
Your Hosting Root/
├── index.html (main portfolio)
├── images/
├── style.css
├── script.js
└── license/ (subdirectory)
    ├── index.html
    ├── static/
    │   ├── css/
    │   ├── js/
    │   └── media/
    ├── .htaccess
    └── asset-manifest.json
```

## Testing Checklist

After setup, verify:
- [ ] Main website: `https://www.bayansoft-ye.com`
- [ ] License subdirectory: `https://www.bayansoft-ye.com/license`
- [ ] SSL certificate is working (green lock)
- [ ] All license website functionality works
- [ ] Navigation between pages works correctly
- [ ] File uploads and data processing work

## Troubleshooting

### Common Issues:

1. **License page not loading**:
   - Check that all files are uploaded to the correct directory
   - Verify `index.html` is in the `license` folder
   - Check file permissions (usually 644 for files, 755 for directories)

2. **React Router not working**:
   - Ensure `.htaccess` file is uploaded to the `license` directory
   - Check that mod_rewrite is enabled on your hosting

3. **Build errors**:
   - Ensure Node.js version is compatible (check package.json)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

4. **404 errors on refresh**:
   - Make sure `.htaccess` is properly configured
   - Check that your hosting supports `.htaccess` files

## Maintenance

### Updating the License Website:
1. Make changes to your React code
2. Run `npm run build`
3. Upload new build files to the `license` directory
4. Test the updated functionality

### Backup:
- Regularly backup your license website files
- Keep a copy of your source code in version control (Git)

## Performance Optimization

1. **Enable Gzip compression** (usually automatic in cPanel)
2. **Set proper cache headers** (handled by .htaccess)
3. **Optimize images** before uploading
4. **Minify CSS/JS** (handled by React build process)

## Advantages of Subdirectory Approach

- ✅ **No DNS configuration needed**
- ✅ **SSL works automatically**
- ✅ **Easier to manage**
- ✅ **No additional hosting costs**
- ✅ **Faster setup**
- ✅ **Better SEO (same domain)** 