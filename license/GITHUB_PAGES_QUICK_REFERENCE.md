# 🚀 Quick Setup Guide - GitHub Pages

Since your main website is on GitHub Pages, here are the best options:

## 📋 Pre-Deployment Checklist

- [ ] Node.js installed on your computer
- [ ] GitHub account
- [ ] Access to your domain DNS settings
- [ ] React project ready

## 🔧 Step 1: Build the Website

**Windows:**
```cmd
cd license
deploy-github-pages.bat
```

**Mac/Linux:**
```bash
cd license
chmod +x deploy-github-pages.sh
./deploy-github-pages.sh
```

## 🎯 Choose Your Approach

### Option 1: Separate Repository (Recommended)

**Best for**: Full React functionality, custom subdomain

1. **Create new GitHub repository**: `bayansoft-license`
2. **Copy all license files** to the new repository
3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial license website setup"
   git push origin main
   ```
4. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Custom domain: `license.bayansoft-ye.com`
5. **Add DNS CNAME record**:
   ```
   Type: CNAME
   Name: license
   Value: yourusername.github.io
   ```
6. **Result**: `https://license.bayansoft-ye.com`

### Option 2: Same Repository (Static Files)

**Best for**: Simple setup, same domain

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
2. **Push to main repository**:
   ```bash
   git add .
   git commit -m "Add license website"
   git push origin main
   ```
3. **Result**: `https://www.bayansoft-ye.com/license`

## ✅ Testing Checklist

After setup, verify:
- [ ] Main website: `https://www.bayansoft-ye.com`
- [ ] License website loads correctly
- [ ] SSL certificate is working
- [ ] All functionality works
- [ ] Navigation between pages works

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 errors on refresh | GitHub Pages limitation - use HashRouter |
| Custom domain not working | Check DNS propagation (24-48 hours) |
| Build errors | Check Node.js version compatibility |
| React Router broken | Use HashRouter instead of BrowserRouter |

## ✨ Advantages by Option

### Option 1 (Separate Repository):
- ✅ **Full React functionality**
- ✅ **Custom subdomain**
- ✅ **Independent deployment**
- ✅ **Better for complex apps**

### Option 2 (Same Repository):
- ✅ **Simpler setup**
- ✅ **Same domain**
- ✅ **Easier management**
- ✅ **No DNS configuration needed**

## 📞 Support

If you need help:
1. Check the detailed guide: `GITHUB_PAGES_SETUP.md`
2. GitHub Pages documentation
3. Test the URL after deployment

## 🎯 Recommendation

**For your license management system**, I recommend **Option 1 (Separate Repository)** because:
- Your license website has complex functionality
- You'll want a custom subdomain
- It's more professional and scalable
- Better for future maintenance 