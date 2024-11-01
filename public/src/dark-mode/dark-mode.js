// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');

// Load dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Update title color based on mode
const updateTitleColor = () => {
    const titleSpans = document.querySelectorAll('#title span');
    titleSpans.forEach(span => {
        span.style.color = document.body.classList.contains('dark-mode') ? 'white' : 'black';
    });
};

// Initialize title color
updateTitleColor();

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    // Save the dark mode preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }

    // Update title color based on the current mode
    updateTitleColor();
});