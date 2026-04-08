/* ============================================================
   P3 AUTOCARE - JAVASCRIPT FUNCTIONALITY
   ============================================================ */

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// ============================================================
// SMOOTH SCROLLING
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.className.includes('fade-in') 
                ? getAnimationDelay(entry.target) 
                : 'none';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

function getAnimationDelay(element) {
    const index = Array.from(element.parentElement.children).indexOf(element);
    const delay = Math.min(index * 0.1, 0.7);
    return `fadeInUp 0.6s ease ${delay}s forwards`;
}

// ============================================================
// LIGHTBOX GALLERY
// ============================================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('[data-lightbox]');

let currentImageIndex = 0;
const allGalleryImages = Array.from(galleryItems).map(item => 
    item.querySelector('img').src
);

if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Navigation
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            updateLightboxImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
            updateLightboxImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
            updateLightboxImage();
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox() {
    if (lightbox) {
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function updateLightboxImage() {
    if (lightboxImage) {
        lightboxImage.src = allGalleryImages[currentImageIndex];
    }
}

// ============================================================
// ONSITE REVIEWS HANDLING
// ============================================================

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const container = document.getElementById('reviewsList');
    if (!container) return;
    container.innerHTML = reviews.map(r => `
        <div class="testimonial fade-in">
            <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
            <p class="testimonial-text">"${r.text}"</p>
            <p class="testimonial-author">— ${r.author}</p>
            <p class="testimonial-meta">${r.meta || 'Customer'}</p>
        </div>
    `).join('');
}

function saveReview(review) {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviews);
} else {
    initReviews();
}

function initReviews() {
    loadReviews();
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target;
            const author = form.elements['author'].value.trim();
            const text = form.elements['text'].value.trim();
            const rating = form.elements['rating'].value;
            const meta = form.elements['meta'].value.trim();
            if (!author || !text) return;
            saveReview({ author, text, rating: parseInt(rating), meta });
            loadReviews();
            form.reset();
            alert('Review submitted successfully!');
        });
    }
}

// ============================================================
// FORM VALIDATION & SUBMISSION
// ============================================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Try FormSubmit.co first
            const response = await fetch('https://formsubmit.co/info@p3autocare.co.za', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showMessage('Thank you! Your quote request has been sent successfully. We\'ll contact you within 24 hours.', 'success');
                contactForm.reset();
            } else {
                showMessage('Error sending form. Please try again or call us directly.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Error sending form. Please try again or call us directly.', 'error');
        }
    });
}

function validateForm() {
    const name = document.getElementById('name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const service = document.getElementById('service')?.value;
    const message = document.getElementById('message')?.value.trim();

    // Check required fields
    if (!name || !phone || !email || !service || !message) {
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }

    // Validate phone (basic check)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 7) {
        return false;
    }

    return true;
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ============================================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================================

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveNav);

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================

let scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Create scroll to top button
function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        background-color: #FFE200;
        color: #001F3F;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#ffc800';
        btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '#FFE200';
        btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(btn);
    return btn;
}

scrollToTopBtn = createScrollToTopButton();

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// ============================================================
// PAGE LOAD ANIMATIONS
// ============================================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================================
// LAZY LOAD IMAGES (Simple Implementation)
// ============================================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================

const header = document.querySelector('header');

if (header) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });
}

// ============================================================
// PRINT STYLESHEET HELPERS
// ============================================================

window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = 'white';
});

// ============================================================
// UTILITY FUNCTION: Debounce
// ============================================================

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ============================================================
// PERFORMANCE: Minimize Reflows
// ============================================================

// Use requestAnimationFrame for smooth animations
function smoothScroll(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
        currentTime += increment;
        const ease = easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = ease;

        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// ============================================================
// INITIALIZATION
// ============================================================

console.log('P3 AutoCare website loaded successfully!');
