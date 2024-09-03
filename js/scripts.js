// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav ul');
    const toggleButton = document.createElement('div');
    toggleButton.innerHTML = '☰';
    toggleButton.style.fontSize = '2rem';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.color = '#fff';

    document.querySelector('nav').insertBefore(toggleButton, nav);

    toggleButton.addEventListener('click', function () {
        nav.classList.toggle('show');
    });
});

// Cyber Threat Animation
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    let animating = false;

    function createThreatAnimation() {
        if (animating) return;
        animating = true;

        const threatElement = document.createElement('div');
        threatElement.classList.add('cyber-threat');
        threatElement.style.position = 'absolute';
        threatElement.style.backgroundColor = '#00ff00';
        threatElement.style.width = '5px';
        threatElement.style.height = '5px';
        threatElement.style.borderRadius = '50%';
        threatElement.style.zIndex = '1';

        const randomStartX = Math.random() * window.innerWidth;
        const randomStartY = Math.random() * window.innerHeight;
        threatElement.style.left = `${randomStartX}px`;
        threatElement.style.top = `${randomStartY}px`;

        heroSection.appendChild(threatElement);

        const randomEndX = Math.random() * window.innerWidth;
        const randomEndY = Math.random() * window.innerHeight;

        threatElement.animate(
            [
                { transform: `translate(0, 0)` },
                { transform: `translate(${randomEndX - randomStartX}px, ${randomEndY - randomStartY}px)` },
            ],
            {
                duration: 2000,
                easing: 'ease-in-out',
            }
        ).onfinish = () => {
            heroSection.removeChild(threatElement);
            animating = false;
        };
    }

    setInterval(createThreatAnimation, 500);
});
