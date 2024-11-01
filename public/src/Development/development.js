function goBack() {
    window.history.back();
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100; // Adjust the number of particles here

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1; // Random size
        this.speedX = Math.random() * 3 - 1.5; // Random speed in X
        this.speedY = Math.random() * 3 - 1.5; // Random speed in Y
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1; // Size reduction over time
    }

    draw() {
        ctx.fillStyle = document.body.classList.contains("dark-mode") 
            ? 'rgba(255, 255, 255, 0.5)' // White color for dark mode
            : 'rgba(0, 0, 0, 0.5)'; // Black color for light mode
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.3) {
            particlesArray.splice(index, 1);
            particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('mousemove', (event) => {
    const x = event.x;
    const y = event.y;
    particlesArray.push(new Particle(x, y));
});

initParticles();
animateParticles();

// Fade-in effect
document.addEventListener('DOMContentLoaded', function() {
    const chapters = document.querySelectorAll('.chapter');
    const changelogs = document.querySelectorAll('.changelog');

    // Function to toggle active class
    const toggleActiveClass = (element, others) => {
        element.classList.toggle('active');
        others.forEach(other => {
            if (other !== element) {
                other.classList.remove('active');
            }
        });
    };

    // Add click event listeners for chapters
    chapters.forEach(chapter => {
        chapter.addEventListener('click', () => {
            toggleActiveClass(chapter, chapters);
        });
    });

    // Add click event listeners for changelogs
    changelogs.forEach(changelog => {
        changelog.addEventListener('click', () => {
            toggleActiveClass(changelog, changelogs);
        });
    });

    // Fade-in effect
    const fadeInOnScroll = () => {
        [...chapters, ...changelogs].forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible'); // Add visible class
            } else {
                element.classList.remove('visible'); // Remove if out of view
            }
        });
    };

    // Initial check for fade-in
    fadeInOnScroll();
    // Listen for scroll events
    window.addEventListener('scroll', fadeInOnScroll);
});
