#!/bin/bash
# Backend Setup & Testing Guide for Estcode

echo "╔════════════════════════════════════════╗"
echo "║  Estcode Backend Diagnostic Tool       ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Install from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✓ npm installed: $(npm --version)"

# Check if required files exist
echo ""
echo "📋 Checking required files..."

files=("server.js" "inquiry.js" "inquiry.html" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file found"
    else
        echo "❌ $file NOT found"
    fi
done

# Check Node modules
echo ""
if [ -d "node_modules" ]; then
    echo "✓ node_modules directory exists"
else
    echo "⚠️  node_modules not found. Run: npm install"
fi

# Display next steps
echo ""
echo "═══════════════════════════════════════"
echo "🚀 NEXT STEPS TO START SERVER"
echo "═══════════════════════════════════════"
echo ""
echo "1️⃣  Make sure you're in the project directory:"
echo "   cd c:\\web\ dev"
echo ""
echo "2️⃣  Install dependencies (if not done):"
echo "   npm install express"
echo ""
echo "3️⃣  Start the server:"
echo "   npm start"
echo "   OR"
echo "   node server.js"
echo ""
echo "4️⃣  Server will run at:"
echo "   http://localhost:3000"
echo ""
echo "═══════════════════════════════════════"
echo "✅ API ENDPOINTS AVAILABLE"
echo "═══════════════════════════════════════"
echo ""
echo "Health Check:"
echo "  GET http://localhost:3000/api/health"
echo ""
echo "Submit Product Enquiry:"
echo "  POST http://localhost:3000/api/product-enquiry"
echo "  Body: { name, email, product, quantity, message }"
echo ""
echo "View All Product Enquiries:"
echo "  GET http://localhost:3000/api/enquiries"
echo ""
echo "═══════════════════════════════════════"
echo "🧪 TESTING THE BACKEND"
echo "═══════════════════════════════════════"
echo ""
echo "After starting the server, test with:"
echo ""
echo "curl http://localhost:3000/api/health"
echo ""
echo "Or use the inquiry form in inquiry.html"
echo ""
echo "✓ Data saved in: data/product_enquiries.json"
echo ""
