// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    // تأثير ظهور تدريجي للأعضاء
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(member);
    });

    // تأثيرات hover للصور
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.querySelector('.member-image').style.transform = 'scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.querySelector('.member-image').style.transform = 'scale(1)';
        });
    });

    // تحميل الصور بشكل متدرج
    document.querySelectorAll('.member-image img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.animation = 'fadeIn 1s ease-in';
        });
    });
});

// Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}

// Close menu when clicking links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('nav-menu');
        nav.classList.remove('active');
    });
});

// Scroll to Top Button
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
};

document.getElementById("scrollTop").onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hover Effects Enhancement
document.querySelectorAll('.member-social a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Image Loading Error Handler
document.querySelectorAll('.member-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'images/default-avatar.jpg'; // صورة افتراضية في حالة فشل تحميل الصورة الأصلية
    });
});

// Add Dynamic Background Effect
const teamSection = document.querySelector('.team-section');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    teamSection.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
});

// Performance Optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize Scroll Events
const optimizedScroll = debounce(() => {
    const scrollBtn = document.getElementById("scrollTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Add Touch Support for Mobile
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 100) { // Minimum swipe distance
        if (diff > 0) {
            // Swipe Up
            document.getElementById("scrollTop").style.display = "flex";
        } else {
            // Swipe Down
            document.getElementById("scrollTop").style.display = "none";
        }
    }
});

// Add Loading State for Images
document.querySelectorAll('.member-image').forEach(container => {
    const img = container.querySelector('img');
    container.classList.add('loading');
    
    img.onload = function() {
        container.classList.remove('loading');
        container.classList.add('loaded');
    };
});
