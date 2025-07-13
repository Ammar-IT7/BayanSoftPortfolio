# 🚀 Quick Setup Guide - Same Hosting Provider

## 📋 Pre-Deployment Checklist

- [ ] Node.js installed on your computer
- [ ] Access to your hosting control panel
- [ ] Domain DNS access
- [ ] React project ready

## 🔧 Step 1: Build the Website

**Windows:**
```cmd
cd license
deploy-hosting.bat
```

**Mac/Linux:**
```bash
cd license
chmod +x deploy-hosting.sh
./deploy-hosting.sh
```

## 📤 Step 2: Upload to Hosting

### cPanel Method:
1. **Create Subdomain:**
   - Login to cPanel
   - Go to "Subdomains"
   - Create: `license`
   - Document root: `public_html/license`

2. **Upload Files:**
   - Go to File Manager
   - Navigate to `public_html/license/`
   - Upload ALL files from `license/build/` folder
   - Upload `license/htaccess` as `.htaccess`

### Direct Upload Method:
1. **Create Directory:**
   ```
   public_html/license/
   ```

2. **Upload Build Files:**
   - Upload everything from `license/build/` to `public_html/license/`
   - Upload `license/htaccess` as `.htaccess` in the same directory

## 🌐 Step 3: DNS Configuration

Add this CNAME record in your domain DNS:

```
Type: CNAME
Name: license
Value: www.bayansoft-ye.com
TTL: 3600
```

## ✅ Step 4: Testing

After 24-48 hours, test:
- [ ] `https://license.bayansoft-ye.com` loads
- [ ] SSL certificate works (green lock)
- [ ] All functionality works
- [ ] Navigation between pages works

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Subdomain not loading | Check DNS propagation (24-48 hours) |
| SSL not working | Contact hosting provider for SSL |
| React Router broken | Ensure `.htaccess` is uploaded |
| Build errors | Check Node.js version compatibility |

## 📞 Support

If you need help:
1. Check the detailed guide: `SUBDOMAIN_SETUP.md`
2. Contact your hosting provider for subdomain/SSL issues
3. Check DNS propagation with: `nslookup license.bayansoft-ye.com` 