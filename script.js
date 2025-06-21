// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Typing Effect
const typingEffect = () => {
    const words = ["Full Stack Developer", "Problem Solver", "Tech Enthusiast"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    const typing = () => {
        const currentWordFull = words[wordIndex];
        
        if (isDeleting) {
            currentWord = currentWordFull.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentWord = currentWordFull.substring(0, letterIndex + 1);
            letterIndex++;
        }

        document.querySelector('.dynamic-text').textContent = currentWord;

        let typingSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && letterIndex === currentWordFull.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typing, typingSpeed);
    };

    typing();
};

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    // Run typing effect
    typingEffect();
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to your backend
            // For now, we'll just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Reset form
            contactForm.reset();
            
            // Show success alert (you can replace this with a better UI notification)
            alert('Thank you! Your message has been sent successfully.');
        });
    }
});

// Navbar scroll effect - UPDATED FOR TRANSPARENCY
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    // Calculate opacity based on scroll position
    // Start with solid color at top, become more transparent as user scrolls
    const maxScroll = 300; // When to reach maximum transparency
    const minOpacity = 0.7; // Minimum opacity (maximum transparency)
    
    if (scrollPosition > 0) {
        // Calculate opacity between 1 and minOpacity based on scroll position
        const opacity = Math.max(minOpacity, 1 - (scrollPosition / maxScroll));
        navbar.style.background = `rgba(0, 0, 0, ${opacity})`;
        navbar.style.backdropFilter = 'blur(5px)'; // Add blur effect for better readability
        navbar.classList.add('scrolled');
    } else {
        // At the top of the page
        navbar.style.background = '#000000';
        navbar.style.backdropFilter = 'none';
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return; // Skip if target doesn't exist
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});