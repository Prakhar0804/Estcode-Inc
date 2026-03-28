const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Helper function to read inquiries
function readInquiries(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        return [];
    } catch (error) {
        console.error('Error reading file:', error);
        return [];
    }
}

// Helper function to write inquiries
function writeInquiries(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing file:', error);
        return false;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', port: PORT });
});

// Handle product enquiry submissions
app.post('/api/product-enquiry', (req, res) => {
    try {
        const { name, email, product, quantity, message } = req.body;
        
        // Validation
        if (!name || !email || !product || !message) {
            return res.status(400).json({ 
                success: false,
                error: 'Name, email, product, and message are required.' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                error: 'Please provide a valid email address.' 
            });
        }

        // Create enquiry object
        const enquiry = {
            id: `ENQ-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            product: product.trim(),
            quantity: quantity || 'Not specified',
            message: message.trim(),
            submittedAt: new Date().toISOString(),
            status: 'New'
        };

        // File path for product enquiries
        const filePath = path.join(dataDir, 'product_enquiries.json');
        
        // Read existing enquiries
        let enquiries = readInquiries(filePath);
        
        // Add new enquiry
        enquiries.push(enquiry);
        
        // Write back to file
        const writeSuccess = writeInquiries(filePath, enquiries);
        
        if (writeSuccess) {
            console.log(`✓ New enquiry saved: ${enquiry.id}`);
            console.log(`  Company: ${enquiry.name}`);
            console.log(`  Email: ${enquiry.email}`);
            console.log(`  Product: ${enquiry.product}`);
            
            res.json({ 
                success: true,
                id: enquiry.id,
                message: 'Enquiry received successfully'
            });
        } else {
            throw new Error('Failed to save enquiry');
        }
    } catch (error) {
        console.error('Error processing enquiry:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error: Could not process your enquiry. Please try again.' 
        });
    }
});

// Handle general contact form submissions
app.post('/api/inquiry', (req, res) => {
    try {
        const { name, email, company, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false,
                error: 'Name, email, and message are required.' 
            });
        }

        const inquiry = {
            id: `INQ-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            company: company?.trim() || 'Not provided',
            message: message.trim(),
            submittedAt: new Date().toISOString(),
            status: 'New'
        };

        const filePath = path.join(dataDir, 'inquiries.json');
        let inquiries = readInquiries(filePath);
        inquiries.push(inquiry);
        const writeSuccess = writeInquiries(filePath, inquiries);

        if (writeSuccess) {
            console.log(`✓ New inquiry saved: ${inquiry.id}`);
            res.json({ 
                success: true,
                id: inquiry.id,
                message: 'Inquiry received successfully'
            });
        } else {
            throw new Error('Failed to save inquiry');
        }
    } catch (error) {
        console.error('Error processing inquiry:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error: Could not process your inquiry.' 
        });
    }
});

// Get all enquiries (for admin/dashboard - add authentication in production)
app.get('/api/enquiries', (req, res) => {
    try {
        const filePath = path.join(dataDir, 'product_enquiries.json');
        const enquiries = readInquiries(filePath);
        res.json({ 
            success: true,
            count: enquiries.length,
            enquiries: enquiries 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to retrieve enquiries' 
        });
    }
});

// Get all inquiries (for admin/dashboard)
app.get('/api/inquiries', (req, res) => {
    try {
        const filePath = path.join(dataDir, 'inquiries.json');
        const inquiries = readInquiries(filePath);
        res.json({ 
            success: true,
            count: inquiries.length,
            inquiries: inquiries 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: 'Failed to retrieve inquiries' 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   Estcode Server Running Successfully   ║
╚════════════════════════════════════════╝
Server running at: http://localhost:${PORT}
Data directory: ${dataDir}
Static files: ${path.join(__dirname)}

Available endpoints:
  GET  /                           - Main website
  POST /api/product-enquiry        - Submit product enquiry
  POST /api/inquiry                - Submit general inquiry
  GET  /api/enquiries              - Get all product enquiries
  GET  /api/inquiries              - Get all general inquiries
  GET  /api/health                 - Health check

Press Ctrl+C to stop the server
    `.trim());
});
