// Inquiry page functionality
document.addEventListener('DOMContentLoaded', function() {
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
            const requiredFields = ['companyName', 'email', 'country', 'orderQuantity', 'hsCode'];
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

            // Get form data
            const formData = new FormData(this);
            const inquiryData = {
                product: productName || 'Not specified',
                companyName: formData.get('companyName'),
                email: formData.get('email'),
                country: formData.get('country'),
                orderQuantity: formData.get('orderQuantity'),
                hsCode: formData.get('hsCode'),
                additionalInfo: formData.get('additionalInfo'),
                timestamp: new Date().toISOString()
            };

            console.log('Inquiry submitted:', inquiryData);

            // Show loading state
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // Show success message
                alert(`Thank you for your inquiry about ${inquiryData.product}!\n\nCompany: ${inquiryData.companyName}\nEmail: ${inquiryData.email}\nCountry: ${inquiryData.country}\n\nWe will contact you within 24 hours.`);

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Reset form
                inquiryForm.reset();

                // Optionally redirect back to home page
                // window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Add form field validation feedback
    const formInputs = document.querySelectorAll('#inquiryForm input, #inquiryForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
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