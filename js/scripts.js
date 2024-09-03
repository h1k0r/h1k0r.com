document.addEventListener("DOMContentLoaded", function () {
    // Scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Glow effect on buttons on hover
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.classList.add('glow');
        });
        button.addEventListener('mouseleave', function () {
            this.classList.remove('glow');
        });
    });
    
    // Responsive adjustments for mobile devices
    if (window.innerWidth < 768) {
        // Example: Disable hover effects on mobile to avoid issues with touch screens
        buttons.forEach(button => {
            button.removeEventListener('mouseenter', function () {
                this.classList.add('glow');
            });
            button.removeEventListener('mouseleave', function () {
                this.classList.remove('glow');
            });
        });
    }
});
