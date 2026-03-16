// Product subparts toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic navbar color matching
    const sections = document.querySelectorAll('#about, #products, #markets, .why-choose, #contact');
    const navbar = document.querySelector('.navbar');
    const root = document.documentElement;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                const computedStyle = getComputedStyle(section);
                let bgColor = computedStyle.backgroundColor;
                // Parse rgb(r, g, b) or rgba
                const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/) || bgColor.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/);
                if (rgbMatch) {
                    const [, r, g, b] = rgbMatch;
                    root.style.setProperty('--section-bg-rgb', `${r}, ${g}, ${b}`);
                }
            }
        });
    }, { threshold: 0.3, rootMargin: '-100px 0px 0px 0px' });

    sections.forEach(section => sectionObserver.observe(section));

    // Existing scroll listener enhancement
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    // Make subparts clickable to open inquiry page
    const subparts = document.querySelectorAll('.subparts li');
    subparts.forEach(subpart => {
        subpart.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the product card click
            const productName = this.textContent.trim();
            // Redirect to inquiry page with product name as parameter
            window.location.href = `inquiry.html?product=${encodeURIComponent(productName)}`;
        });

        // Add visual feedback and accessibility
        subpart.style.cursor = 'pointer';
        subpart.setAttribute('role', 'button');
        subpart.setAttribute('tabindex', '0');
        subpart.setAttribute('aria-label', `Inquire about ${subpart.textContent.trim()}`);

        // Add keyboard support
        subpart.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
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