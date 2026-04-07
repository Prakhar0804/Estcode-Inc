// Inquiry page functionality

// API Configuration - update this with your backend URL
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'
    : 'https://estcode-inc-backend.vercel.app'; // Backend API URL

document.addEventListener('DOMContentLoaded', function() {
    // Valid countries list
    const validCountries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
        'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
        'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
        'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
        'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador',
        'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
        'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
        'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
        'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
        'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
        'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
        'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
        'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
        'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
        'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo',
        'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
        'Zambia', 'Zimbabwe'
    ];

    // Get product name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    // Display selected product
    const selectedProductElement = document.getElementById('selectedProduct');
    if (selectedProductElement && productName) {
        selectedProductElement.textContent = productName;
    }

    // Handle form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const requiredFields = ['companyName', 'email', 'country', 'orderQuantity', 'hsCode', 'specificProduct'];
            let isValid = true;

            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field && !field.value.trim()) {
                    field.style.borderColor = '#ff4757';
                    isValid = false;
                } else if (field) {
                    field.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }

            // Validate country name
            const countryField = document.getElementById('country');
            const enteredCountry = countryField.value.trim();
            const isValidCountry = validCountries.some(country => country.toLowerCase() === enteredCountry.toLowerCase());

            if (!isValidCountry) {
                countryField.style.borderColor = '#ff4757';
                alert('Incorrect country name. Please select a valid country from the suggestions.');
                return;
            }

            countryField.style.borderColor = 'rgba(255, 255, 255, 0.08)';

            // Get form data
            const formData = new FormData(this);
            const inquiryData = {
                product: productName || 'Not specified',
                companyName: formData.get('companyName'),
                email: formData.get('email'),
                country: formData.get('country'),
                orderQuantity: formData.get('orderQuantity'),
                hsCode: formData.get('hsCode'),
                specificProduct: formData.get('specificProduct'),
                additionalInfo: formData.get('additionalInfo'),
                timestamp: new Date().toISOString()
            };

            console.log('Inquiry submitted:', inquiryData);

            // Show loading state
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Send to backend API
            fetch(`${API_BASE_URL}/api/product-enquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inquiryData.companyName,
                    email: inquiryData.email,
                    product: inquiryData.product,
                    quantity: inquiryData.orderQuantity,
                    message: `
Country: ${inquiryData.country}
HS Code: ${inquiryData.hsCode || 'Not provided'}
Specific Product: ${inquiryData.specificProduct}
Additional Info: ${inquiryData.additionalInfo || 'None'}
                    `.trim()
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Show success message
                    alert(`✓ Thank you for your inquiry!\n\nCompany: ${inquiryData.companyName}\nEmail: ${inquiryData.email}\nProduct: ${inquiryData.product}\n\nWe will contact you within 24 hours.\n\nYour inquiry has been saved.`);

                    // Reset form
                    inquiryForm.reset();

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                } else {
                    throw new Error(data.error || 'Unknown error occurred');
                }
            })
            .catch(error => {
                console.error('Error submitting inquiry:', error);
                alert(`Error: ${error.message}\n\nPlease try again or contact us directly.`);

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Add form field validation feedback
    const formInputs = document.querySelectorAll('#inquiryForm input, #inquiryForm textarea, #inquiryForm select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--primary-gold)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        });

        input.addEventListener('change', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--primary-gold)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }
        });

        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4757';
            }
        });
    });
});

// Function to go back to previous page
function goBack() {
    window.history.back();
}