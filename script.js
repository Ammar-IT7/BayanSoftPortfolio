document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1200);

});

// Premium Home Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Animations
    initTextAnimations();
    initCounter();
    initTypingEffect();
    init3DImageEffect();
    initParticles();
    
    // Add scroll-based animations
    initScrollObserver();
});



// Split Text Animation
function initTextAnimations() {
    const title = document.querySelector('.split-text');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    // Split text into characters
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'char';
        span.style.transitionDelay = `${i * 0.03}s`;
        title.appendChild(span);
    });
    
    // Trigger animation after a small delay
    setTimeout(() => {
        title.classList.add('animated');
    }, 500);
}

// Counter Animation
function initCounter() {
    const counterElements = document.querySelectorAll('.counter');
    
    function animateCounter(el) {
        const target = parseInt(el.closest('.stat-item').getAttribute('data-stat'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 30)); // Update every 30ms
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current;
        }, 30);
    }
    
    // Create observer to start counter when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => observer.observe(el));
}

// best clients section
document.addEventListener('DOMContentLoaded', () => {
    // Partner cards hover effect
    const partnerCards = document.querySelectorAll('.partner-card');
    
partnerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
    partnerCards.forEach(c => {
        if (c !== card) c.classList.add('dimmed');
    });
    });
    
    card.addEventListener('mouseleave', () => {
    partnerCards.forEach(c => c.classList.remove('dimmed'));
    });
});

// Testimonials slider
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
const prevBtn = document.querySelector('.testimonial-arrow.prev');
const nextBtn = document.querySelector('.testimonial-arrow.next');
let currentIndex = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
    });
    dotsContainer.appendChild(dot);
});

// Update slider function
function updateSlider() {
    testimonials.forEach((testimonial, index) => {
    testimonial.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === currentIndex);
    });
    });
}

// Initialize slider
updateSlider();

// Event listeners for controls
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
});

// Auto slide
let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
}, 5000);

// Pause auto slide on hover
const sliderContainer = document.querySelector('.testimonials-slider');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlider();
    }, 5000);
});

// Partner cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    }
    });
}, observerOptions);

partnerCards.forEach(card => {
    observer.observe(card);
});

// Animation for ticker
const tickerTrack = document.querySelector('.ticker-track');
tickerTrack.style.animationPlayState = 'running';
});

// Advanced Typing Effect
function initTypingEffect() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const systems = [
        "نظام المطاعم",
        "نظام الكافيهات والكفتيريا",
        "نظام الصيدليات",
        "نظام الموارد البشرية",
        "نظام سوبر ماركت وبقالات",
        "نظام الخضار والفواكه",
        "نظام الملابس الجاهزة",
        "نظام مواد البناء",
        "نظام الأجهزة والإلكترونيات",
        "نظام الهواتف والصيانة",
        "نظام الأدوات المنزلية",
        "نظام التصنيع والورش",
        "نظام نقاط البيع",
        "نظام حسب الطلب"
    ];
    
    let currentIndex = 0;
    let currentText = "";
    let letterIndex = 0;
    let typingSpeed = 80; // ms per character
    let eraseSpeed = 40; // ms per character
    let pauseTime = 1500; // ms to wait after typing
    let isTyping = true;
    
    function type() {
        if (isTyping) {
            // Still typing current phrase
            if (letterIndex < systems[currentIndex].length) {
                currentText += systems[currentIndex].charAt(letterIndex);
                typedTextElement.textContent = currentText;
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // Finished typing, pause before erasing
                isTyping = false;
                setTimeout(type, pauseTime);
            }
        } else {
            // Erasing
            if (letterIndex > 0) {
                currentText = systems[currentIndex].substring(0, letterIndex - 1);
                typedTextElement.textContent = currentText;
                letterIndex--;
                setTimeout(type, eraseSpeed);
            } else {
                // Finished erasing, move to next phrase
                isTyping = true;
                currentIndex = (currentIndex + 1) % systems.length;
                setTimeout(type, typingSpeed * 2);
            }
        }
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// 3D Image Effect with Parallax
function init3DImageEffect() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const logo = document.getElementById('animated-logo');
    const cards = document.querySelectorAll('.img-card');
    const homeSection = document.querySelector('.home');
    
    if (!imageWrapper || !homeSection) return;
    
    const maxRotation = 10; // max rotation in degrees
    
    homeSection.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        // Calculate mouse position relative to the center of the container
        const rect = imageWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate rotation and movement based on mouse position
        const rotateY = maxRotation * ((e.clientX - centerX) / (rect.width / 2));
        const rotateX = -maxRotation * ((e.clientY - centerY) / (rect.height / 2));
        
        // Apply transform with easing
        imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
        
        if (logo) {
            logo.style.transform = `translateZ(50px) rotateX(${rotateX * 0.1}deg) rotateY(${rotateY * 0.1}deg)`;
        }
        
        // Parallax effect for cards
        cards.forEach(card => {
            const depth = parseFloat(card.getAttribute('data-depth') || 0.1);
            const moveX = (e.clientX - centerX) * depth;
            const moveY = (e.clientY - centerY) * depth;
            card.style.transform = `translate(${moveX * 0.05}px, ${moveY * 0.05}px)`;
        });
    });
    
    // Reset on mouse leave
    homeSection.addEventListener('mouseleave', () => {
        if (window.innerWidth < 768) return;
        
        imageWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        
        if (logo) {
            logo.style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
        }
        
        cards.forEach(card => {
            card.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // Add subtle floating animation
    function animateLogo() {
        if (!logo) return;
        
        let floatY = 0;
        let floatDirection = 1;
        
        setInterval(() => {
            floatY += 0.05 * floatDirection;
            if (floatY > 10) floatDirection = -1;
            if (floatY < 0) floatDirection = 1;
            
            logo.style.transform = `translateZ(50px) translateY(${floatY}px)`;
        }, 50);
    }
    
    animateLogo();
}

// Particles Background
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    
    // Load particles.js library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 15,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#e28c1d"
                },
                "shape": {
                    "type": ["circle", "triangle", "edge"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.1,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.05,
                        "sync": false
                    }
                },
                "size": {
                    "value": 8,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e28c1d",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "bubble": {
                        "distance": 200,
                        "size": 12,
                        "duration": 2,
                        "opacity": 0.2,
                        "speed": 3
                    },
                    "push": {
                        "particles_nb": 3
                    }
                }
            },
            "retina_detect": true
        });
    };
    
    document.body.appendChild(script);
}

// Scroll-Based Animations
function initScrollObserver() {
    const elementsToAnimate = document.querySelectorAll('.feature-item, .img-card, .stat-item, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
        
        // Add staggered animation delay
        const index = Array.from(elementsToAnimate).indexOf(el);
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
// Initialize Swiper for testimonials
const testimonialSwiper = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Counter animation
const counters = document.querySelectorAll('.counter-number');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
};


// Create an Intersection Observer to trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// تصفية عناصر المعرض
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons .button');
    const portfolioItems = document.querySelectorAll('.port-box');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // إزالة الفئة النشطة من جميع الأزرار وإضافتها إلى الزر الحالي
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 300);
                } else if (item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 300);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Portfolio Modal
const portfolioLinks = document.querySelectorAll('.portfolio-details');
const modal = document.getElementById('portfolioModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Sample portfolio details data
const portfolioDetails = {
    1: {
        title: "تطبيق المتجر الذكي",
        client: "شركة التقنية المتطورة",
        date: "أغسطس 2024",
        description: "تطبيق للتسوق الإلكتروني يوفر تجربة تسوق سلسة وسهلة للمستخدمين مع نظام دفع آمن ومتعدد الخيارات. تم تطوير التطبيق باستخدام تقنيات حديثة تضمن سرعة الأداء وتجربة مستخدم متميزة.",
        services: ["تصميم واجهة المستخدم", "تطوير تطبيق iOS وأندرويد", "تكامل نظام الدفع", "لوحة تحكم إدارية"],
        technologies: ["React Native", "Node.js", "MongoDB", "Firebase"]
    },
    2: {
        title: "منصة الخدمات الرقمية",
        client: "مؤسسة الأفق الجديد",
        date: "يوليو 2024",
        description: "منصة متكاملة تقدم مجموعة من الخدمات الرقمية للشركات والأفراد مع واجهة مستخدم بسيطة وسهلة الاستخدام. تتيح المنصة للمستخدمين طلب الخدمات ومتابعة حالتها بشكل مباشر.",
        services: ["تطوير منصة ويب", "تصميم واجهة مستخدم", "بناء نظام إدارة محتوى", "تكامل بوابة الدفع"],
        technologies: ["Vue.js", "Laravel", "MySQL", "AWS"]
    },
    // Add more project details as needed
};

portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-id');
        const project = portfolioDetails[projectId];
        
        if (project) {
            let html = `
                <div class="project-details">
                    <div class="project-info">
                        <div class="project-info-item">
                            <h4>العميل:</h4>
                            <p>${project.client}</p>
                        </div>
                        <div class="project-info-item">
                            <h4>تاريخ المشروع:</h4>
                            <p>${project.date}</p>
                        </div>
                    </div>
                    <div class="project-description">
                        <h4>وصف المشروع:</h4>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-services">
                        <h4>الخدمات:</h4>
                        <ul>
                            ${project.services.map(service => `<li><i class='bx bx-check'></i> ${service}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-tech">
                        <h4>التقنيات المستخدمة:</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            modalBody.innerHTML = html;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// القائمة النشطة
const menuLinks = document.querySelectorAll('header ul li a');
const sections = document.querySelectorAll('section');

function activeMenu() {
    let len = sections.length;
    while(--len && window.scrollY + 97 < sections[len].offsetTop){}
    menuLinks.forEach(sec => sec.classList.remove("active"));
    menuLinks[len].classList.add("active");
}

activeMenu();
window.addEventListener('scroll', activeMenu);

// شريط التنقل الثابت
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// أيقونة تبديل شريط التنقل
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
};

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
};

// تأثيرات التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
}, {
    threshold: 0.1
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));

const scrollRight = document.querySelectorAll(".scroll-right");
scrollRight.forEach((el) => observer.observe(el));

const scrollLeft = document.querySelectorAll(".scroll-left");
scrollLeft.forEach((el) => observer.observe(el));

// Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset validation
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        group.classList.remove('error');
        group.classList.remove('success');
    });
    
    // Validate form
    let isValid = true;
    
    // Name validation
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'يرجى إدخال اسمك');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'يرجى إدخال بريدك الإلكتروني');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    // Phone validation (optional)
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value.trim() !== '' && !isValidPhone(phoneInput.value)) {
        showError(phoneInput, 'يرجى إدخال رقم هاتف صحيح');
        isValid = false;
    } else if (phoneInput.value.trim() !== '') {
        showSuccess(phoneInput);
    }
    
    // Subject validation
    const subjectInput = document.getElementById('subject');
    if (subjectInput.value.trim() === '') {
        showError(subjectInput, 'يرجى إدخال موضوع الرسالة');
        isValid = false;
    } else {
        showSuccess(subjectInput);
    }
    
    // Message validation
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'يرجى كتابة رسالتك');
        isValid = false;
    } else {
        showSuccess(messageInput);
    }
    
    // Submit the form if valid
    if (isValid) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Simulate form submission (AJAX would be used in production)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset validation UI
            inputGroups.forEach(group => {
                group.classList.remove('success');
            });
            
            // Show toast notification
            showToast('success', 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.innerText = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.add('success');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidPhone(phone) {
    const re = /^\+?[0-9]{8,15}$/;
    return re.test(phone);
}

function showToast(type, message) {
    const toast = document.querySelector('.toast');
    const toastIcon = toast.querySelector('.toast-icon i');
    const toastContent = toast.querySelector('.toast-content');
    
    // Set toast type
    toast.className = 'toast';
    toast.classList.add(`toast-${type}`);
    
    // Set icon
    if (type === 'success') {
        toastIcon.className = 'bx bx-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'bx bx-error-circle';
    }
    
    // Set message
    toastContent.textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const submitBtn = this.querySelector('button');
    
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        // Show error toast
        showToast('error', 'يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Show loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate subscription (AJAX would be used in production)
    setTimeout(() => {
        emailInput.value = '';
        
        // Show success toast
        showToast('success', 'تم الاشتراك بنجاح في النشرة البريدية');
        
        // Reset button
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
    }, 1500);
});

// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease',
    once: true,
    offset: 50,
});