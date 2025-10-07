// Theme Switcher
const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// On page load, check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    
    // Change hamburger icon to X when menu is open
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('show')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        navToggle.querySelector('i').className = 'fas fa-bars';
    }
});
