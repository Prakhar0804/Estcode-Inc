# 🚀 Estcode Backend - Quick Start Guide

## ❌ Problem Found & ✅ FIXED!

### What Was Wrong
Your form was **only showing an alert** but **never actually sending data to the server**. The inquiry submissions were being simulated, not saved.

### 🔧 What I Fixed

#### 1. **Updated `inquiry.js`** 
- Replaced fake setTimeout simulation with real API calls
- Now sends actual POST requests to `/api/product-enquiry` endpoint
- Proper error handling and user feedback

#### 2. **Enhanced `server.js`**
- Better validation and error handling
- Creates `data/` directory automatically
- Improved logging for debugging
- Added health check endpoint
- Added retrieval endpoints for viewing enquiries

#### 3. **Created `package.json`**
- Easy dependency management
- Simple npm start command

#### 4. **Added Testing & Documentation**
- `test-backend.js` - Automated backend testing
- `BACKEND_GUIDE.md` - Complete setup guide
- This file with quick start instructions

---

## ⚡ 5-Minute Setup

### Step 1: Open Terminal (PowerShell)
```powershell
cd "c:\web dev"
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Start Server
```powershell
npm start
```

**You should see:**
```
╔════════════════════════════════════════╗
║   Estcode Server Running Successfully   ║
╚════════════════════════════════════════╝
Server running at: http://localhost:3000
Data directory: ...
```

### Step 4: Test It Works
Open your browser:
```
http://localhost:3000/api/health
```

You should see:
```json
{"status":"Server is running","port":3000}
```

### Step 5: Submit Test Enquiry
1. Go to: http://localhost:3000/inquiry.html
2. Fill out the form
3. Click Submit
4. You should see a success message
5. Data is saved in: `data/product_enquiries.json`

---

## ✅ Verification Checklist

After starting the server, verify each point:

- [ ] Server starts without errors
- [ ] Health check works: http://localhost:3000/api/health
- [ ] `data/` directory exists
- [ ] Fill & submit inquiry form
- [ ] See success alert
- [ ] Check `data/product_enquiries.json` has your submission
- [ ] View all enquiries: http://localhost:3000/api/enquiries

---

## 📊 How It Now Works

```
User fills form in inquiry.html
         ↓
inquiry.js validates & prepares data
         ↓
SENDS POST request to: /api/product-enquiry
         ↓
server.js receives, validates, saves
         ↓
Creates: data/product_enquiries.json
         ↓
Returns success response
         ↓
User sees confirmation alert ✓
```

---

## 🧪 Automated Testing

Run the test suite to verify everything:
```powershell
node test-backend.js
```

This will test:
- ✓ Server health
- ✓ Submit enquiry
- ✓ Missing field validation
- ✓ Retrieve enquiries
- ✓ Email validation

---

## 📂 Project Structure

```
c:\web dev\
├── server.js              ← Backend (Express)
├── inquiry.js             ← Form handling (FIXED!)
├── inquiry.html           ← Inquiry form
├── package.json           ← Dependencies (NEW)
├── test-backend.js        ← Testing tool (NEW)
├── data/                  ← Enquiry storage (AUTO-CREATED)
│   └── product_enquiries.json
├── BACKEND_GUIDE.md       ← Full documentation (NEW)
└── BACKEND_SETUP.sh       ← Setup script (NEW)
```

---

## 🔍 Troubleshooting

### Issue: Server won't start
**Solution:**
```powershell
# Check if npm installed
npm --version

# Install dependencies if not done
npm install

# Try again
npm start
```

### Issue: "Port 3000 already in use"
**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace XXXX with PID)
taskkill /PID XXXX /F

# Start server again
npm start
```

### Issue: Form submits but no success message
**Check:**
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Submit form
4. Look for request to `/api/product-enquiry`
5. Check Response tab
6. Look for errors in Console tab

### Issue: "Cannot find data directory"
**Solution:**
The server creates it automatically. If it doesn't:
```powershell
# Create manually
mkdir data
```

---

## 📧 Next Steps - Email Integration

To receive enquiries via email, add this to `server.js`:

```javascript
const nodemailer = require('nodemailer');

// Configure email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

// Send email when enquiry received
// (Code in BACKEND_GUIDE.md)
```

---

## 📊 View Your Enquiries

### Option 1: In Browser
```
http://localhost:3000/api/enquiries
```

### Option 2: In JSON File
```
data/product_enquiries.json
```

### Option 3: In Browser DevTools
- Open Developer Tools (F12)
- Network tab → Check requests
- Application → Local Storage

---

## 🔒 Security Note

**Current setup** is good for development. **For production**, add:
- [ ] HTTPS/SSL encryption
- [ ] Database instead of JSON files
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Authentication
- [ ] Input sanitization
- [ ] Email verification

See `BACKEND_GUIDE.md` for details.

---

## 📞 Support

**Problem: Still not receiving enquiries?**

1. ✓ Is server running? (npm start)
2. ✓ Does health check work? (http://localhost:3000/api/health)
3. ✓ Any errors in console? (npm start output)
4. ✓ Did form submit show success alert?
5. ✓ Check Network tab in DevTools (F12)
6. ✓ Check `data/` folder exists
7. ✓ Check `data/product_enquiries.json` has data

**Check logs:**
```powershell
# Save server output to file
npm start > server.log

# View logs
Get-Content server.log
```

---

## 🎯 What's Different Now?

| Before | After |
|--------|-------|
| ❌ Form shows alert only | ✅ Form sends to server |
| ❌ No data saved | ✅ Saved in JSON file |
| ❌ Clients can't reach you | ✅ Full enquiry details logged |
| ❌ No retrieval system | ✅ View all enquiries via API |
| ❌ Manual testing | ✅ Automated test suite |

---

## 🚀 Your Workflow

1. **Start server:** `npm start`
2. **Test endpoints:** Use browser or `test-backend.js`
3. **Receive enquiries:** Via website form
4. **View enquiries:** Browser or JSON file
5. **Follow up:** Use the saved email & contact info

---

## 📈 Next Growth Steps

1. **Email Notifications** - Get notified of new enquiries
2. **Database** - Use MongoDB/PostgreSQL instead of JSON
3. **Admin Dashboard** - View/manage enquiries online
4. **SMS Alerts** - Get SMS when new enquiry arrives
5. **Auto Responses** - Send confirmation emails
6. **CRM Integration** - Connect to your CRM

---

## 💾 Backup Your Data

Important: Back up the `data/` directory regularly:
```powershell
# Copy data folder
Copy-Item -Path "data" -Destination "backup_data" -Recurse -Force

# Or create a backup
Compress-Archive -Path "data" -DestinationPath "data_backup.zip"
```

---

**Status:** ✅ Backend is NOW FULLY FUNCTIONAL!

**Your clients can now successfully submit enquiries and you will receive them! 🎉**

Start the server with: `npm start`
