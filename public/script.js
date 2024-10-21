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
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Particle color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.3) {
            particlesArray.splice(index, 1);
            particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (event) => {
    const x = event.x;
    const y = event.y;
    for (let i = 0; i < 1; i++) { // Number of particles to create per mouse move
        particlesArray.push(new Particle(x, y));
    }
});

init();
animate();

document.addEventListener('DOMContentLoaded', function() {
    const chapters = document.querySelectorAll('.chapter');

    // Function to handle adding/removing active class
    const handleChapterClick = (chapter) => {
        chapter.classList.toggle('active');

        // Remove active class from other chapters
        chapters.forEach(other => {
            if (other !== chapter) {
                other.classList.remove('active');
            }
        });
    };

    // Add click event listeners for chapters
    chapters.forEach(chapter => {
        chapter.addEventListener('click', function() {
            handleChapterClick(chapter);
        });
    });

    // JavaScript for fade-in effect
    const fadeInOnScroll = () => {
        chapters.forEach(chapter => {
            const rect = chapter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                chapter.classList.add('visible'); // Add visible class
            } else {
                chapter.classList.remove('visible'); // Remove if out of view
            }
        });
    };

    // Initial check for fade-in
    fadeInOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', fadeInOnScroll);
});
