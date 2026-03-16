const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle contact form submissions
app.post('/api/inquiry', (req, res) => {
  const { name, email, company, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  const inquiry = { name, email, company, message, date: new Date().toISOString() };
  const filePath = path.join(__dirname, 'inquiries.json');
  let inquiries = [];
  if (fs.existsSync(filePath)) {
    inquiries = JSON.parse(fs.readFileSync(filePath));
  }
  inquiries.push(inquiry);
  fs.writeFileSync(filePath, JSON.stringify(inquiries, null, 2));
  res.json({ success: true });
});

// Handle product enquiry submissions
app.post('/api/product-enquiry', (req, res) => {
  const { name, email, product, quantity, message } = req.body;
  if (!name || !email || !product || !message) {
    return res.status(400).json({ error: 'Name, email, product, and message are required.' });
  }
  const enquiry = { name, email, product, quantity, message, date: new Date().toISOString() };
  const filePath = path.join(__dirname, 'product_enquiries.json');
  let enquiries = [];
  if (fs.existsSync(filePath)) {
    enquiries = JSON.parse(fs.readFileSync(filePath));
  }
  enquiries.push(enquiry);
  fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
