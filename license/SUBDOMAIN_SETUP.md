# License Website Subdomain Setup - Same Hosting Provider

This guide explains how to set up the license website on the subdomain `license.bayansoft-ye.com` using the same hosting provider as your main website.

## Current Configuration

- **Main Domain**: `www.bayansoft-ye.com`
- **License Subdomain**: `license.bayansoft-ye.com`
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

### 2. Hosting Provider Configuration

#### Option A: cPanel Hosting
1. **Create Subdomain**:
   - Log into your hosting control panel (cPanel)
   - Go to "Subdomains" section
   - Create subdomain: `license`
   - Document root: `public_html/license` (or your preferred directory)

2. **Upload Files**:
   - Upload all contents of the `build` folder to the subdomain directory
   - Ensure `index.html` is in the root of the subdomain folder

3. **Configure .htaccess**:
   - Upload the provided `.htaccess` file to the subdomain directory
   - This handles React Router and security headers

#### Option B: Direct File Upload
1. **Create Directory Structure**:
   ```
   public_html/
   ├── index.html (main website)
   └── license/
       ├── index.html (license website)
       ├── static/
       ├── .htaccess
       └── ... (other build files)
   ```

2. **Upload Build Files**:
   - Upload all files from `license/build/` to `public_html/license/`

### 3. DNS Configuration

Add a CNAME record in your domain's DNS settings:

```
Type: CNAME
Name: license
Value: www.bayansoft-ye.com (or your hosting server)
TTL: 3600 (or default)
```

### 4. SSL Certificate

Most hosting providers automatically provide SSL for subdomains. If not:
- Contact your hosting provider to enable SSL for `license.bayansoft-ye.com`
- Or use Let's Encrypt if your hosting supports it

## File Structure After Setup

```
Your Hosting Root/
├── index.html (main portfolio)
├── images/
├── style.css
├── script.js
└── license/ (subdomain directory)
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
- [ ] License subdomain: `https://license.bayansoft-ye.com`
- [ ] SSL certificate is working (green lock)
- [ ] All license website functionality works
- [ ] Navigation between pages works correctly
- [ ] File uploads and data processing work

## Troubleshooting

### Common Issues:

1. **Subdomain not loading**:
   - Check DNS propagation (can take 24-48 hours)
   - Verify subdomain is created in hosting panel
   - Check file permissions (usually 644 for files, 755 for directories)

2. **React Router not working**:
   - Ensure `.htaccess` file is uploaded to subdomain directory
   - Check that mod_rewrite is enabled on your hosting

3. **SSL issues**:
   - Contact hosting provider to enable SSL for subdomain
   - Check if wildcard SSL certificate is available

4. **Build errors**:
   - Ensure Node.js version is compatible (check package.json)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Maintenance

### Updating the License Website:
1. Make changes to your React code
2. Run `npm run build`
3. Upload new build files to the subdomain directory
4. Test the updated functionality

### Backup:
- Regularly backup your license website files
- Keep a copy of your source code in version control (Git)

## Performance Optimization

1. **Enable Gzip compression** (usually automatic in cPanel)
2. **Set proper cache headers** (handled by .htaccess)
3. **Optimize images** before uploading
4. **Minify CSS/JS** (handled by React build process) 