/* ==================== MENU TOGGLE ==================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show Menu
if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
        navToggle.setAttribute('aria-expanded', 'true');
    });
}

// Hide Menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ==================== CLOSE MENU ON LINK CLICK ==================== */
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!navMenu) return;
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

/* ==================== HEADER SCROLL EFFECT ==================== */
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
// Run on page load
handleHeaderScroll();

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

/* ==================== ACTIVE LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(
            `.nav__link[data-section="${sectionId}"], .nav__link[href*="${sectionId}"]`
        );

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

/* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==================== COUNTER ANIMATION ==================== */
function formatCounterValue(value, format, suffix) {
    let displayValue = Math.floor(value);
    let unit = '';

    if (format === 'k') {
        displayValue = Math.floor(value / 1000);
        unit = 'K';
    }

    return `${displayValue}${unit}${suffix || ''}`;
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const format = element.dataset.format;
    const suffix = element.dataset.suffix || '';

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = formatCounterValue(start, format, suffix);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = formatCounterValue(target, format, suffix);
        }
    }

    updateCounter();
}

// Observe stat numbers for counter animation
const statNumbers = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

/* ==================== PARALLAX EFFECT FOR HERO SHAPES ==================== */
function handleParallax() {
    const shapes = document.querySelectorAll('.hero__shape');
    const scrolled = window.pageYOffset;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Only apply parallax on desktop
if (window.innerWidth > 991) {
    window.addEventListener('scroll', handleParallax);
}

/* ==================== FORM HANDLING ==================== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields.');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = 'Message Sent! ✓';
            submitBtn.style.background = '#22c55e';

            // Reset form
            this.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

/* ==================== PRELOADER (Optional) ==================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    document.querySelectorAll('.hero .fade-in').forEach(el => {
        el.classList.add('visible');
    });
});

/* ==================== BACK TO TOP BUTTON ==================== */
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: linear-gradient(135deg, #ff6b35 0%, #e55a28 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 10px 40px -10px rgba(255, 107, 53, 0.4);
        z-index: 99;
    `;

    document.body.appendChild(backToTop);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
    });
}

createBackToTop();
/* ==================== ADDITIONS.JS ==================== */
/* Append this entire file to the bottom of script.js    */
/* ====================================================== */

/* ==================== STICKY CTA BAR ==================== */
(function () {
    const bar = document.getElementById('sticky-cta-bar');
    const barClose = document.getElementById('sticky-cta-close');
    if (!bar) return;

    // Show after scrolling 600px
    const showThreshold = 600;
    let barDismissed = sessionStorage.getItem('ctaBarDismissed');

    function updateBar() {
        if (barDismissed) return;
        if (window.scrollY > showThreshold) {
            bar.classList.add('visible');
            document.body.classList.add('cta-bar-visible');
        } else {
            bar.classList.remove('visible');
            document.body.classList.remove('cta-bar-visible');
        }
    }

    window.addEventListener('scroll', updateBar, { passive: true });

    if (barClose) {
        barClose.addEventListener('click', () => {
            bar.classList.remove('visible');
            document.body.classList.remove('cta-bar-visible');
            barDismissed = true;
            sessionStorage.setItem('ctaBarDismissed', '1');
        });
    }
})();

/* ==================== EXIT-INTENT POPUP ==================== */
(function () {
    const overlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const popupDismiss = document.getElementById('popup-dismiss');
    const popupForm = document.getElementById('popup-form');

    if (!overlay) return;

    let popupShown = sessionStorage.getItem('popupShown');
    let hasScrolled = false;

    // Track scroll - only trigger after user has engaged
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) hasScrolled = true;
    }, { passive: true, once: true });

    // Desktop: mouse leave top of viewport
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 10 && !popupShown && hasScrolled) {
            showPopup();
        }
    });

    // Mobile: trigger after 45 seconds on page
    setTimeout(() => {
        if (!popupShown && hasScrolled) showPopup();
    }, 45000);

    function showPopup() {
        overlay.classList.add('active');
        popupShown = true;
        sessionStorage.setItem('popupShown', '1');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (popupClose) popupClose.addEventListener('click', closePopup);
    if (popupDismiss) popupDismiss.addEventListener('click', closePopup);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    // Form submission - redirects to WhatsApp with message
    if (popupForm) {
        popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('popup-name')?.value || '';
            const destination = document.getElementById('popup-destination')?.value || '';
            const phone = document.getElementById('popup-phone')?.value || '';

            const waNumber = '2349010218984';
            const message = encodeURIComponent(
                `Hello Best Guide Travels! My name is ${name}. I'm interested in travelling to ${destination}. Please send me a free quote. My number: ${phone}`
            );
            const waUrl = `https://wa.me/${waNumber}?text=${message}`;

            closePopup();
            window.open(waUrl, '_blank');
        });
    }
})();

/* ==================== EMAILJS CONTACT FORM INTEGRATION ==================== */
// Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY with your EmailJS credentials
// Sign up free at emailjs.com
(function () {
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    };
    document.head.appendChild(script);

    // Override form handler
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Remove existing listeners by cloning
    const freshForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(freshForm, contactForm);

    freshForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;

        try {
            if (typeof emailjs !== 'undefined' && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
            } else {
                // Fallback: open WhatsApp with form data
                const waNumber = '2349010218984';
                const message = encodeURIComponent(
                    `New inquiry from website:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nService: ${data.service || 'Not specified'}\nMessage: ${data.message}`
                );
                window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
            }

            submitBtn.innerHTML = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
            this.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            submitBtn.innerHTML = 'Failed. Try WhatsApp Instead →';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            submitBtn.disabled = false;

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
})();
