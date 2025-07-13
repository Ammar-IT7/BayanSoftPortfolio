# 🚀 Quick Setup Guide - Subdirectory Approach

## 📋 Pre-Deployment Checklist

- [ ] Node.js installed on your computer
- [ ] Access to your hosting control panel
- [ ] React project ready

## 🔧 Step 1: Build the Website

**Windows:**
```cmd
cd license
deploy-subdirectory.bat
```

**Mac/Linux:**
```bash
cd license
chmod +x deploy-subdirectory.sh
./deploy-subdirectory.sh
```

## 📤 Step 2: Upload to Hosting

### cPanel Method:
1. **Create Directory:**
   - Login to cPanel
   - Go to "File Manager"
   - Navigate to `public_html/`
   - Create a new folder called `license`

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

## ✅ Step 3: Testing

Test immediately (no DNS wait needed):
- [ ] `https://www.bayansoft-ye.com/license` loads
- [ ] SSL certificate works (green lock)
- [ ] All functionality works
- [ ] Navigation between pages works

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| License page not loading | Check files are in correct directory |
| SSL not working | Should work automatically |
| React Router broken | Ensure `.htaccess` is uploaded |
| Build errors | Check Node.js version compatibility |

## ✨ Advantages of Subdirectory Approach

- ✅ **No DNS configuration needed**
- ✅ **SSL works automatically**
- ✅ **Easier to manage**
- ✅ **No additional hosting costs**
- ✅ **Faster setup**
- ✅ **Better SEO (same domain)**
- ✅ **Immediate availability**

## 📞 Support

If you need help:
1. Check the detailed guide: `SUBDIRECTORY_SETUP.md`
2. Contact your hosting provider for file upload issues
3. Test the URL: `https://www.bayansoft-ye.com/license`

## 🎯 Final Result

Your license website will be accessible at:
**https://www.bayansoft-ye.com/license** 