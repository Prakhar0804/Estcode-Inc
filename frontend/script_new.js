// Product subparts toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Find the subparts list within this card
            const subparts = this.querySelector('.subparts');
            const title = this.querySelector('.product-title');

            if (subparts) {
                // Toggle visibility
                if (subparts.style.display === 'none' || subparts.style.display === '') {
                    subparts.style.display = 'block';
                    // Add smooth animation
                    subparts.style.opacity = '0';
                    setTimeout(() => {
                        subparts.style.opacity = '1';
                        subparts.style.transition = 'opacity 0.3s ease';
                    }, 10);
                } else {
                    subparts.style.opacity = '0';
                    setTimeout(() => {
                        subparts.style.display = 'none';
                    }, 300);
                }

                // Toggle active class for styling on the title
                if (title) {
                    title.classList.toggle('active');
                }
            }
        });

        // Add cursor pointer to indicate clickable
        card.style.cursor = 'pointer';
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});