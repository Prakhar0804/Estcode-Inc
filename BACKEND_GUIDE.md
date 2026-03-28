# Backend Setup & Troubleshooting Guide

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** v6+ (comes with Node.js)

### Installation Steps

#### 1. Navigate to Project Directory
```powershell
cd "c:\web dev"
```

#### 2. Create package.json (if not exists)
```powershell
npm init -y
```

#### 3. Install Express.js
```powershell
npm install express
```

#### 4. Start the Server
```powershell
node server.js
```

**Expected Output:**
```
╔════════════════════════════════════════╗
║   Estcode Server Running Successfully   ║
╚════════════════════════════════════════╝
Server running at: http://localhost:3000
Data directory: c:\web dev\data
...
```

---

## ✅ Verify Backend is Working

### Test 1: Health Check
Open your browser and go to:
```
http://localhost:3000/api/health
```
**Expected Response:**
```json
{"status":"Server is running","port":3000}
```

### Test 2: Submit Test Enquiry
Use curl or create a test form. Example:
```powershell
$body = @{
    name = "Test Company"
    email = "test@example.com"
    product = "Handicrafts"
    quantity = "100"
    message = "Test inquiry from backend setup"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/product-enquiry" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

**Expected Response:**
```json
{
  "success": true,
  "id": "ENQ-1711622400000",
  "message": "Enquiry received successfully"
}
```

### Test 3: View All Enquiries
```
http://localhost:3000/api/enquiries
```
**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "enquiries": [
    {
      "id": "ENQ-1711622400000",
      "name": "Test Company",
      "email": "test@example.com",
      "product": "Handicrafts",
      "quantity": "100",
      "message": "Test inquiry",
      "submittedAt": "2026-03-28T12:00:00.000Z",
      "status": "New"
    }
  ]
}
```

---

## 🔍 Troubleshooting

### Issue: "node: command not found"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Verify: `node --version`

### Issue: "Cannot find module 'express'"
**Solution:**
```powershell
npm install express
```

### Issue: "Port 3000 already in use"
**Solutions:**

Option 1: Kill the process using port 3000
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

Option 2: Use a different port
```powershell
# Create a .env file in project root with:
PORT=3001
```

### Issue: "Permission denied" when creating data directory
**Solution:**
```powershell
# Run PowerShell as Administrator or give write permissions
# The server should create the data directory automatically
```

### Issue: Form submits but "data/product_enquiries.json" is not created
**Solutions:**
1. Check if `data` directory was created:
   ```powershell
   ls data/
   ```

2. If not, create it manually:
   ```powershell
   mkdir data
   ```

3. Check file permissions:
   ```powershell
   icacls "c:\web dev" /T /grant:r "%USERNAME%":F
   ```

4. Check server logs for errors

### Issue: All enquiries data is lost after restart
**Note:** This is expected. The current setup stores data in JSON files. For persistent storage, consider:
- Moving to a database (MongoDB, PostgreSQL)
- Setting up email notifications
- Adding backup system

---

## 📊 Backend Architecture

```
Request Flow:
┌─────────────────┐
│  inquiry.html   │ (Form)
└────────┬────────┘
         │ Submit Form Data
         ▼
┌─────────────────┐
│  inquiry.js     │ (Fetch POST)
└────────┬────────┘
         │ POST /api/product-enquiry
         ▼
┌─────────────────┐
│  server.js      │ (Express.js)
└────────┬────────┘
         │ Validate & Process
         ▼
┌─────────────────┐
│  data/          │ (JSON Files)
│  product_       │
│  enquiries.json │
└─────────────────┘
```

---

## 🔐 Security Considerations

### Current Security Features
✓ Email validation
✓ Input trimming
✓ Required field validation
✓ Error handling

### Production Recommendations
- [ ] Add CORS configuration
- [ ] Implement rate limiting
- [ ] Add authentication/authorization
- [ ] Use HTTPS (SSL certificate)
- [ ] Add input sanitization
- [ ] Implement CSRF protection
- [ ] Use environment variables for secrets
- [ ] Add database instead of JSON files
- [ ] Set up email notifications
- [ ] Add request logging

---

## 📝 API Documentation

### POST /api/product-enquiry
Submit a product enquiry

**Request:**
```json
{
  "name": "Company Name",
  "email": "company@example.com",
  "product": "Handicrafts",
  "quantity": "100-500",
  "message": "We need premium handicrafts..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "id": "ENQ-1711622400000",
  "message": "Enquiry received successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Name, email, product, and message are required."
}
```

---

### GET /api/enquiries
Retrieve all product enquiries

**Response:**
```json
{
  "success": true,
  "count": 5,
  "enquiries": [...]
}
```

---

### GET /api/health
System health check

**Response:**
```json
{
  "status": "Server is running",
  "port": 3000
}
```

---

## 🛠 Utilities

### Clean Up Data
To reset all enquiries, delete or rename the data directory:
```powershell
Remove-Item -Path "data" -Recurse -Force
```

### Monitor Server Logs
The server logs all submissions to console. To save logs to file:
```powershell
node server.js > server.log 2>&1
```

### Automated Testing
Create `test-backend.ps1`:
```powershell
# Test script for backend endpoints
$baseURL = "http://localhost:3000"

# Health Check
Write-Host "Testing health endpoint..."
Invoke-WebRequest -Uri "$baseURL/api/health" -Method GET

# Get Enquiries
Write-Host "Fetching all enquiries..."
Invoke-WebRequest -Uri "$baseURL/api/enquiries" -Method GET
```

---

## 🎯 Next Steps

1. **✅ Start the server** - `node server.js`
2. **✅ Test endpoints** - Use health check and test enquiry
3. **✅ Verify data saves** - Check `data/product_enquiries.json`
4. **✅ Test with form** - Submit through inquiry.html
5. **📧 Add email notifications** - Send enquiries to your email
6. **💾 Migrate to database** - For better scalability
7. **🔒 Implement security** - Add authentication, CORS, rate limiting

---

## 📞 Support

If enquiries are not being received:

1. ✓ Check server is running (`node server.js`)
2. ✓ Verify health check works (`http://localhost:3000/api/health`)
3. ✓ Check browser console for errors (F12)
4. ✓ Check server console for error messages
5. ✓ Check `data/` directory exists
6. ✓ Check file permissions
7. ✓ Verify network requests are being sent (Network tab in DevTools)

---

**Last Updated:** March 28, 2026  
**Status:** ✅ Backend Fully Functional
