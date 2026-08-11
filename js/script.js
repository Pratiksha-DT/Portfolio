document.addEventListener('DOMContentLoaded', function () {

    // AOS Animation
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80
        });
    }

    // Typing Effect
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const roles = [
            'Software Developer',
            'Front-End Developer',
            'Web Developer',
            'Tech Enthusiast'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 60;
            } else {
                typedElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 150;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500;
            }

            setTimeout(type, typingDelay);
        }

        setTimeout(type, 1000);
    }

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar & Scroll Effects
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const progressBar = document.getElementById('progress-bar');

    function handleScroll() {
        const scrollPos = window.scrollY;

        if (navbar) {
            if (scrollPos > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (backToTop) {
            if (scrollPos > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }

        if (progressBar) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollHeight > 0 ? (scrollPos / scrollHeight) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Back to Top
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Active Nav Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill in all required fields.';
                    formStatus.style.color = '#ef4444';
                }
                return;
            }

            if (formStatus) {
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                formStatus.style.color = 'var(--primary)';
            }

            contactForm.reset();

            setTimeout(() => {
                if (formStatus) {
                    formStatus.textContent = '';
                }
            }, 5000);
        });
    }

    // Reveal Animation Fallback
    const handleAOSFallback = () => {
        if (typeof AOS === 'undefined') {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    };

    setTimeout(handleAOSFallback, 2000);
});
