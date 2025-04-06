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
        const duration = 4000; // 2 seconds
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

    // Category filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter cards
            partnerCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 100);
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

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

    // Add swipe functionality for mobile
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateSlider();
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateSlider();
        }
    }

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }, 5000);

    // Pause auto slide on hover
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
    
    // Stats counter
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                
                const updateCount = () => {
                    const increment = count / 50; // Adjust for speed
                    if (current < count) {
                        current += increment;
                        if (current > count) current = count;
                        target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = count;
                    }
                };
                
                updateCount();
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(number => {
        statsObserver.observe(number);
    });
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
                    "value": "#D03f4C"
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
                    "color": "#D03f4C",
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
            setTimeout(updateCounter, 5);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCounter();
};
// About section
document.addEventListener("DOMContentLoaded", function() {
    // Initialize counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    // Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter')) {
                    const target = parseInt(entry.target.innerText);
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / speed;
                        if (count < target) {
                            count += increment;
                            entry.target.innerText = Math.ceil(count);
                            setTimeout(updateCount, 10);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCount();
                } else {
                    entry.target.classList.add('show-items');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    document.querySelectorAll('.scroll-top, .scroll-bottom, .scroll-left, .scroll-right, .scroll-scale, .counter').forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation for features
    const features = document.querySelectorAll('.about-feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.animation = `fadeInRight 0.6s ease forwards ${0.2 + index * 0.1}s`;
    });
});

// Team section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the filter system
    initFilterSystem();
    
    // Initialize the card animations
    initCardAnimations();
    
    // Handle mobile carousel
    initMobileCarousel();
    
    // Position the filter indicator
    positionFilterIndicator();
    
    // 3D tilt effect for cards
    initCardTiltEffect();
});

function initFilterSystem() {
    const filterButtons = document.querySelectorAll('.team-filter-btn');
    const teamCards = document.querySelectorAll('.team-member-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter indicator position
            positionFilterIndicator();
            
            // Filter the team members
            const filterValue = button.getAttribute('data-filter');
            
            teamCards.forEach(card => {
                // Reset animation for all cards
                card.style.animation = 'none';
                void card.offsetWidth; // Trigger reflow
                
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    
                    // Apply staggered animation with custom delay
                    const index = Array.from(teamCards).indexOf(card);
                    card.style.animation = `fadeInUp 0.8s forwards ${index * 0.1}s`;
                } else {
                    // Fade out cards that don't match the filter
                    card.style.animation = 'fadeOut 0.4s forwards';
                    setTimeout(() => {
                        if (card.getAttribute('data-category') !== filterValue) {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });
}

function positionFilterIndicator() {
    const activeButton = document.querySelector('.team-filter-btn.active');
    const indicator = document.querySelector('.team-filter-indicator');
    
    if (activeButton && indicator) {
        indicator.style.width = `${activeButton.offsetWidth}px`;
        indicator.style.height = `${activeButton.offsetHeight}px`;
        indicator.style.left = `${activeButton.offsetLeft}px`;
    }
}

function initCardAnimations() {
    const teamCards = document.querySelectorAll('.team-member-card');
    
    // Initial entry animation
    teamCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.8s forwards ${index * 0.1}s`;
    });
    
    // Handle card flip on hover or touch (for mobile)
    teamCards.forEach(card => {
        const flipIcon = card.querySelector('.member-flip-icon');
        const cardInner = card.querySelector('.team-card-inner');
        
        flipIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            cardInner.style.transform = 
                cardInner.style.transform === 'rotateY(180deg)' ? 
                'rotateY(0deg)' : 'rotateY(180deg)';
        });
        
        // Reset flip on mouse leave
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                cardInner.style.transform = 'rotateY(0deg)';
            }
        });
    });
}

function initMobileCarousel() {
    const carouselControls = document.querySelector('.team-carousel-controls');
    const teamGrid = document.querySelector('.team-members-grid');
    const prevBtn = document.querySelector('.team-carousel-control.prev');
    const nextBtn = document.querySelector('.team-carousel-control.next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (carouselControls && teamGrid && window.innerWidth <= 768) {
        let currentPage = 0;
        const cards = document.querySelectorAll('.team-member-card');
        const totalPages = Math.ceil(cards.length / 2);
        
        // Update the view based on current page
        function updateCarouselView() {
            cards.forEach((card, index) => {
                if (index >= currentPage * 2 && index < (currentPage + 1) * 2) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPage);
            });
        }
        
        // Initialize the carousel
        updateCarouselView();
        
        // Handle navigation
        prevBtn.addEventListener('click', () => {
            currentPage = (currentPage > 0) ? currentPage - 1 : totalPages - 1;
            updateCarouselView();
        });
        
        nextBtn.addEventListener('click', () => {
            currentPage = (currentPage + 1) % totalPages;
            updateCarouselView();
        });
        
        // Handle dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPage = index;
                updateCarouselView();
            });
        });
    }
}

function initCardTiltEffect() {
    const cards = document.querySelectorAll('.team-card-front');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 992) { // Only on large screens
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const xMid = cardRect.width / 2;
                const yMid = cardRect.height / 2;
                
                // Calculate the percentage of movement through the card
                const xPercent = (x - xMid) / xMid;
                const yPercent = (y - yMid) / yMid;
                
                // Apply subtle tilt effect
                card.style.transform = `perspective(1000px) rotateY(${xPercent * 3}deg) rotateX(${yPercent * -3}deg) scale(1.02)`;
                
                // Add a subtle shadow based on mouse position
                card.style.boxShadow = `
                    ${-xPercent * 10}px ${-yPercent * 10}px 20px rgba(0,0,0,0.05),
                    0 10px 20px rgba(0,0,0,0.1)
                `;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transform and shadow
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Add this for responsive
window.addEventListener('resize', () => {
    positionFilterIndicator();
    
    // Reinitialize mobile carousel if needed
    if (window.innerWidth <= 768) {
        initMobileCarousel();
    }
});

// Add fade out animation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    </style>
`);
// Portfolio Section - Advanced Implementation
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-buttons .button');
    const portfolioItems = document.querySelectorAll('.port-box');
    const portfolioGallery = document.getElementById('portfolioGallery');
    const searchInput = document.getElementById('portfolioSearch');
    const resetSearch = document.getElementById('resetSearch');
    const emptyState = document.getElementById('emptyState');
    const visibleProjectsCount = document.getElementById('visibleProjectsCount');
    const totalProjectsCount = document.getElementById('totalProjectsCount');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewClose = document.getElementById('quickViewClose');
    const quickViewBody = document.getElementById('quickViewBody');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose1');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const prevProject = document.getElementById('prevProject');
    const nextProject = document.getElementById('nextProject');
    
    // State variables
    let currentFilter = 'all';
    let currentPage = 1;
    let currentProjectId = null;
    let itemsPerPage = 6;
    let allItems = Array.from(portfolioItems);
    let filteredItems = allItems; // Keep track of currently filtered items
    let likeBtns, quickViewBtns, portfolioDetailsLinks;
    
    // Initialize event listeners for dynamic elements
    function initializeEventListeners() {
        // Get fresh references to these elements as they might have changed
        likeBtns = document.querySelectorAll('.port-like-btn');
        quickViewBtns = document.querySelectorAll('.quickview-btn');
        portfolioDetailsLinks = document.querySelectorAll('.portfolio-details-link');
        
        // Use event delegation instead of attaching to each element
        portfolioGallery.addEventListener('click', function(event) {
            // Handle like button clicks
            if (event.target.closest('.port-like-btn')) {
                const likeBtn = event.target.closest('.port-like-btn');
                handleLikeButtonClick(likeBtn);
            }
            
            // Handle quick view button clicks
            if (event.target.closest('.quickview-btn')) {
                const quickViewBtn = event.target.closest('.quickview-btn');
                const projectId = quickViewBtn.getAttribute('data-id');
                openQuickView(projectId);
            }
            
            // Handle portfolio details link clicks
            if (event.target.closest('.portfolio-details-link')) {
                event.preventDefault();
                const link = event.target.closest('.portfolio-details-link');
                const projectId = link.getAttribute('data-id');
                openProjectDetails(projectId);
            }
        });
    }
    
    function handleLikeButtonClick(btn) {
        btn.classList.toggle('liked');
        const likeCount = btn.querySelector('.like-count');
        let currentLikes = parseInt(likeCount.textContent);
        
        if (btn.classList.contains('liked')) {
            likeCount.textContent = currentLikes + 1;
            btn.querySelector('i').classList.remove('bx-heart');
            btn.querySelector('i').classList.add('bxs-heart');
            
            // Show notification
            showNotification('تم الإعجاب بالنظام', 'success');
        } else {
            likeCount.textContent = currentLikes - 1;
            btn.querySelector('i').classList.remove('bxs-heart');
            btn.querySelector('i').classList.add('bx-heart');
        }
    }
    
    // Initialize counter
    if (totalProjectsCount) {
        totalProjectsCount.textContent = portfolioItems.length;
    }
    updateVisibleCount();
    
    // Initialize items
    animatePortfolioItems();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            currentFilter = filterValue;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Reset search
            if (searchInput && searchInput.value) {
                searchInput.value = '';
            }
            
            // Reset pagination
            currentPage = 1;
            
            // Filter items
            filterItems();
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            // No need to run full filtering logic if search term is unchanged
            filterItems();
        }, 300));
    }
    
    // Reset search
    if (resetSearch) {
        resetSearch.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
            }
            filterItems();
        });
    }
    
    // Improved filter function that handles both category and search filtering
    function filterItems() {
        if (!portfolioGallery) return;
        
        // Get search term if present
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        
        // Filter by category and search term
        filteredItems = allItems.filter(item => {
            // Category filter
            const passesCategoryFilter = currentFilter === 'all' || 
                item.classList.contains(currentFilter.substring(1));
            
            // If no search term, just use category filter
            if (!searchTerm) return passesCategoryFilter;
            
            // Otherwise, apply search filter too
            const title = item.getAttribute('data-title') ? 
                item.getAttribute('data-title').toLowerCase() : '';
            const description = item.querySelector('.port-content p') ? 
                item.querySelector('.port-content p').textContent.toLowerCase() : '';
            
            const passesSearchFilter = title.includes(searchTerm) || 
                description.includes(searchTerm);
            
            // Item must pass both filters
            return passesCategoryFilter && passesSearchFilter;
        });
        
        // Show/hide empty state
        if (filteredItems.length === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
        
        // Apply visibility using CSS classes instead of inline styles
        allItems.forEach(item => {
            if (filteredItems.includes(item)) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
        
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            // Animate visible items
            filteredItems.forEach((item, index) => {
                // Stagger animations for better visual effect
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * (index % 10)); // Limit staggering to avoid long delays
            });
        });
        
        updateVisibleCount();
        updateNavButtons();
        updateLoadMoreButton();
    }
    
    // Update the load more button visibility based on filtered items
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const itemsToShow = currentPage * itemsPerPage;
        
        if (filteredItems.length > itemsToShow) {
            loadMoreBtn.style.display = 'inline-flex';
            loadMoreBtn.innerHTML = '<span>عرض المزيد من الأنظمة</span> <i class="bx bx-chevron-down btn-icon"></i>';
            loadMoreBtn.disabled = false;
            loadMoreBtn.classList.remove('btn-disabled');
        } else {
            if (filteredItems.length === 0) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.innerHTML = '<span>تم تحميل جميع الأنظمة</span> <i class="bx bx-check"></i>';
                loadMoreBtn.classList.add('btn-disabled');
                loadMoreBtn.disabled = true;
            }
        }
    }
    
    // Load more functionality with virtual rendering
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Change button state
            this.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> <span>جاري التحميل...</span>';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                currentPage++;
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
                
                // If no more items to load
                if (startIndex >= filteredItems.length) {
                    this.innerHTML = '<span>تم تحميل جميع الأنظمة</span> <i class="bx bx-check"></i>';
                    this.classList.add('btn-disabled');
                    
                    // Show notification
                    showNotification('تم تحميل جميع الأنظمة المتاحة', 'info');
                    return;
                }
                
                // Get next batch of items
                const nextItems = filteredItems.slice(startIndex, endIndex);
                
                // Make next batch of filtered items visible
                nextItems.forEach((item, index) => {
                    item.style.display = 'block';
                    // Stagger animations
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 * (index % 6)); // Limit staggering
                });
                
                // Update counters
                updateVisibleCount();
                
                // Reset button state
                if (endIndex >= filteredItems.length) {
                    this.innerHTML = '<span>تم تحميل جميع الأنظمة</span> <i class="bx bx-check"></i>';
                    this.classList.add('btn-disabled');
                    this.disabled = true;
                } else {
                    this.innerHTML = '<span>عرض المزيد من الأنظمة</span> <i class="bx bx-chevron-down btn-icon"></i>';
                    this.disabled = false;
                }
                
                // Show notification
                showNotification(`تم تحميل ${nextItems.length} أنظمة جديدة`, 'success');
            }, 800);
        });
    }
    
    // Quick View close
    if (quickViewClose && quickViewModal) {
        quickViewClose.addEventListener('click', closeQuickView);
        
        // Close on click outside
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    }
    
    // Modal navigation
    if (prevProject) {
        prevProject.addEventListener('click', function() {
            navigateProject('prev');
        });
    }
    
    if (nextProject) {
        nextProject.addEventListener('click', function() {
            navigateProject('next');
        });
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close on click outside
    if (portfolioModal) {
        portfolioModal.addEventListener('click', function(e) {
            if (e.target === portfolioModal) {
                closeModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (portfolioModal && portfolioModal.classList.contains('show')) {
                closeModal();
            }
            if (quickViewModal && quickViewModal.classList.contains('show')) {
                closeQuickView();
            }
        }
    });
    
    // Sample portfolio details data - updated to match the systems in HTML
    const portfolioDetails = {
        1: {
            title: "نظام المطاعم 🍽️🥘",
            client: "المطاعم والمؤسسات الغذائية",
            date: "2024",
            category: "المطاعم والكافيهات",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام متكامل لإدارة المطاعم بكافة أنواعها مع سهولة الاستخدام وتنظيم وضبط الحسابات بأقل التكاليف وتوفير الوقت والجهد. يساعد على إدارة الطلبات والمخزون وتتبع المبيعات وإدارة الموظفين بكفاءة عالية.",
            services: ["إدارة المبيعات والفواتير", "إدارة المخزون والمشتريات", "إدارة طلبات الطاولات", "إدارة طلبات التوصيل", "تقارير مفصلة للمبيعات", "إدارة الموظفين والصلاحيات"],
            technologies: ["قواعد بيانات متطورة", "واجهة مستخدم سهلة", "تطبيقات متعددة المنصات", "أنظمة أمان متقدمة", "تكامل مع أنظمة نقاط البيع"],
            results: [
                { label: "تحسين الكفاءة", value: "65%" },
                { label: "توفير الوقت", value: "45%" },
                { label: "زيادة المبيعات", value: "30%" },
                { label: "رضا العملاء", value: "95%" }
            ],
            gallery: [
                "images/portfolio1.svg",
                "images/portfolio2.svg",
                "images/portfolio3.svg",
                "images/portfolio4.svg"
            ]
        },
        2: {
            title: "نظام الكافيهات والكافتيريا ☕",
            client: "الكافيهات ومحلات المشروبات",
            date: "2024",
            category: "المطاعم والكافيهات",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام خاص بالكافيهات والكافتيريا يساعد على إدارة المشروبات والوجبات السريعة مع تتبع المخزون وتنظيم الحسابات بكفاءة عالية. يوفر حلولاً متكاملة لتتبع الطلبات وإدارة المخزون وتحليل المبيعات لتحسين الأداء.",
            services: ["إدارة قائمة المشروبات والمنتجات", "متابعة المخزون والتنبيه عند النفاد", "إدارة الطلبات الداخلية والخارجية", "نظام الولاء والخصومات", "تقارير تحليلية للمبيعات", "إدارة الحسابات المالية"],
            technologies: ["قواعد بيانات مركزية", "واجهة سهلة الاستخدام", "تطبيقات للهواتف الذكية", "تكامل مع خدمات التوصيل", "نظام الفواتير الإلكترونية"],
            results: [
                { label: "سرعة الخدمة", value: "+60%" },
                { label: "تقليل الأخطاء", value: "80%" },
                { label: "زيادة المبيعات", value: "25%" },
                { label: "رضا العملاء", value: "90%" }
            ],
            gallery: [
                "images/portfolio2.svg",
                "images/portfolio1.svg",
                "images/portfolio3.svg",
                "images/portfolio5.svg"
            ]
        },
        3: {
            title: "نظام الصيدليات 💊",
            client: "الصيدليات ومخازن الأدوية",
            date: "2024",
            category: "البيع بالتجزئة",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام متكامل لإدارة الصيدليات يساعد على تنظيم المخزون وتتبع تواريخ الصلاحية وإدارة المبيعات وتوفير التقارير الدقيقة. يساعد على متابعة المخزون الدوائي بدقة ويوفر تنبيهات آلية لتواريخ الصلاحية والكميات المنخفضة.",
            services: ["إدارة مخزون الأدوية والمستحضرات", "تتبع تواريخ الصلاحية", "إدارة الوصفات الطبية", "ربط مع التأمين الصحي", "تقارير المبيعات والمخزون", "إدارة الحسابات المالية"],
            technologies: ["قواعد بيانات دوائية متخصصة", "واجهة مستخدم سهلة", "نظام باركود متكامل", "تكامل مع الأنظمة الصحية", "نظام تنبيهات متطور"],
            results: [
                { label: "تقليل المنتهي صلاحيته", value: "95%" },
                { label: "توفير الوقت", value: "70%" },
                { label: "دقة المخزون", value: "99%" },
                { label: "سرعة خدمة العملاء", value: "+50%" }
            ],
            gallery: [
                "images/portfolio3.svg",
                "images/portfolio5.svg",
                "images/portfolio2.svg",
                "images/portfolio6.svg"
            ]
        },
        4: {
            title: "نظام الفنادق 🏨",
            client: "الفنادق والمنتجعات السياحية",
            date: "2024",
            category: "الخدمات والإدارة",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام شامل لإدارة الفنادق يمكن من خلاله إدارة الحجوزات والغرف والخدمات الفندقية ومتابعة الحسابات وإصدار الفواتير والتقارير. يتيح إدارة كاملة لعمليات الفندق من حجوزات وخدمات وصيانة وموارد بشرية.",
            services: ["إدارة الحجوزات والإلغاءات", "إدارة الغرف والمرافق", "نظام الخدمات الفندقية", "إدارة المطاعم والمبيعات", "نظام تقارير متكامل", "إدارة الموارد البشرية"],
            technologies: ["قواعد بيانات مركزية", "واجهات متعددة اللغات", "تطبيقات للهواتف الذكية", "تكامل مع منصات الحجز العالمية", "نظام أمان متطور"],
            results: [
                { label: "زيادة نسبة الإشغال", value: "40%" },
                { label: "تحسين تجربة النزلاء", value: "85%" },
                { label: "تقليل وقت الانتظار", value: "60%" },
                { label: "توفير في التكاليف", value: "30%" }
            ],
            gallery: [
                "images/portfolio4.svg",
                "images/portfolio6.svg",
                "images/portfolio2.svg",
                "images/portfolio1.svg"
            ]
        },
        5: {
            title: "نظام سوبر ماركت أو البقالات 🍫",
            client: "محلات البقالة والسوبرماركت",
            date: "2024",
            category: "البيع بالتجزئة",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام كامل للسوبر ماركت والبقالات يساعد على تنظيم المخزون وإدارة المشتريات والمبيعات مع تقارير تفصيلية وشاملة. يدعم إدارة المخزون بدقة عالية ويوفر نظاماً متكاملاً للمشتريات والمبيعات.",
            services: ["إدارة المخزون والمنتجات", "نظام نقاط البيع المتعددة", "إدارة المشتريات والموردين", "برامج الولاء والعروض", "تقارير المبيعات والمخزون", "إدارة الحسابات المالية"],
            technologies: ["قواعد بيانات موزعة", "واجهة مستخدم بسيطة", "نظام باركود متكامل", "أجهزة نقاط بيع متطورة", "تكامل مع تطبيقات التوصيل"],
            results: [
                { label: "تحسين دقة المخزون", value: "98%" },
                { label: "تقليل وقت المعاملات", value: "65%" },
                { label: "زيادة المبيعات", value: "35%" },
                { label: "التحكم في المخزون", value: "90%" }
            ],
            gallery: [
                "images/portfolio5.svg",
                "images/portfolio3.svg",
                "images/portfolio1.svg",
                "images/portfolio6.svg"
            ]
        },
        6: {
            title: "نظام الموارد البشرية 🫵 (البصمة)",
            client: "الشركات والمؤسسات",
            date: "2024",
            category: "الخدمات والإدارة",
            duration: "تطوير مستمر",
            budget: "حسب احتياجات العميل",
            status: "متاح",
            description: "نظام متكامل لإدارة الموارد البشرية وشؤون الموظفين مع نظام البصمة لمتابعة الحضور والانصراف وحساب الرواتب والمستحقات. يساعد على إدارة كاملة لشؤون الموظفين من التوظيف وحتى نهاية الخدمة.",
            services: ["إدارة بيانات الموظفين", "نظام البصمة والحضور", "إدارة الإجازات والمغادرات", "حساب الرواتب والبدلات", "تقييم الأداء والحوافز", "التقارير الإدارية والإحصائية"],
            technologies: ["أجهزة بصمة متطورة", "قواعد بيانات آمنة", "واجهة مستخدم سهلة", "تطبيقات للجوال", "تكامل مع الأنظمة المالية"],
            results: [
                { label: "تقليل الأخطاء", value: "95%" },
                { label: "توفير الوقت", value: "80%" },
                { label: "رضا الموظفين", value: "85%" },
                { label: "أتمتة العمليات", value: "75%" }
            ],
            gallery: [
                "images/portfolio6.svg",
                "images/portfolio4.svg",
                "images/portfolio1.svg",
                "images/portfolio2.svg"
            ]
        }
    };
    
    // Helper Functions
    function animatePortfolioItems() {
        const items = document.querySelectorAll('.port-box');
        if (!items.length) return;
        
        // Use Intersection Observer for more efficient animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Animate the item when it comes into view
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 50 * (index % 8));
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Set up initial state and observe
        items.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.5s ease';
            observer.observe(item);
        });
    }
    
    function showEmptyState() {
        if (emptyState) {
            emptyState.style.display = 'flex';
        }
    }
    
    function hideEmptyState() {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
    
    function updateVisibleCount() {
        if (!visibleProjectsCount) return;
        
        const visibleCount = document.querySelectorAll('.port-box:not(.hidden)').length;
        visibleProjectsCount.textContent = visibleCount;
    }
    
    function sortProjects(sortType) {
        if (!portfolioGallery) return;
        
        // Sort based on the selected sort type
        allItems.sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    return parseInt(b.getAttribute('data-order') || 0) - parseInt(a.getAttribute('data-order') || 0);
                case 'oldest':
                    return parseInt(a.getAttribute('data-order') || 0) - parseInt(b.getAttribute('data-order') || 0);
                case 'name-asc':
                    return (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || '');
                case 'name-desc':
                    return (b.getAttribute('data-title') || '').localeCompare(a.getAttribute('data-title') || '');
                case 'popular':
                    const likesA = parseInt(a.querySelector('.like-count')?.textContent || '0');
                    const likesB = parseInt(b.querySelector('.like-count')?.textContent || '0');
                    return likesB - likesA;
                default:
                    return 0;
            }
        });
        
        // Reapply visible/hidden status
        const visibleItems = allItems.filter(item => !item.classList.contains('hidden'));
        
        // Re-attach items in sorted order
        allItems.forEach(item => {
            // Remove from DOM
            if (item.parentNode) {
                item.parentNode.removeChild(item);
            }
        });
        
        // Re-add sorted items
        allItems.forEach(item => {
            portfolioGallery.appendChild(item);
        });
        
        // Re-filter to maintain current filter state
        filteredItems = visibleItems;
        allItems.forEach(item => {
            if (filteredItems.includes(item)) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
        
        // Apply animations
        requestAnimationFrame(() => {
            filteredItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * (index % 10));
            });
        });
        
        // Update counters
        updateVisibleCount();
    }
    
    function openQuickView(projectId) {
        const project = portfolioDetails[projectId];
        
        if (project && quickViewBody && quickViewModal) {
            // Create quick view content
            const content = `
                <div class="quick-view-image">
                    <img src="${project.gallery[0]}" alt="${project.title}">
                </div>
                <div class="quick-view-info">
                    <h3>${project.title}</h3>
                    <div class="quick-view-meta">
                        <div class="meta-item">
                            <i class='bx bx-calendar'></i>
                            <span>${project.date}</span>
                        </div>
                        <div class="meta-item">
                            <i class='bx bx-folder'></i>
                            <span>${project.category}</span>
                        </div>
                        <div class="meta-item">
                            <i class='bx bx-user'></i>
                            <span>${project.client}</span>
                        </div>
                    </div>
                    <p>${project.description.substring(0, 150)}...</p>
                    <a href="#" class="view-full-details btn primary-btn" data-id="${projectId}">عرض التفاصيل الكاملة</a>
                </div>
            `;
            
            quickViewBody.innerHTML = content;
            
            // Add event listener to view details button using event delegation
            quickViewBody.addEventListener('click', function(e) {
                if (e.target.closest('.view-full-details')) {
                    e.preventDefault();
                    const btn = e.target.closest('.view-full-details');
                    const pid = btn.getAttribute('data-id');
                    closeQuickView();
                    setTimeout(() => {
                        openProjectDetails(pid);
                    }, 300);
                }
            }, { once: true }); // Use once option to avoid duplicate listeners
            
            // Show modal
            quickViewModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeQuickView() {
        if (quickViewModal) {
            quickViewModal.classList.remove('show');
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                if (quickViewBody) {
                    quickViewBody.innerHTML = '';
                }
            }, 300);
        }
    }
    
    function openProjectDetails(projectId) {
        const project = portfolioDetails[projectId];
        currentProjectId = projectId;
        
        if (project && modalTitle && modalBody && portfolioModal) {
            // Update modal title
            modalTitle.textContent = project.title;
            
            // Create modal content
            modalBody.innerHTML = `
                <div class="project-details">
                    <div class="project-gallery">
                        <div class="gallery-main">
                            <img src="${project.gallery[0]}" alt="${project.title}" id="mainImage">
                        </div>
                        <div class="gallery-navigation">
                            <button class="gallery-nav-btn prev-btn" aria-label="الصورة السابقة"><i class='bx bx-chevron-right'></i></button>
                            <button class="gallery-nav-btn next-btn" aria-label="الصورة التالية"><i class='bx bx-chevron-left'></i></button>
                        </div>
                        <div class="gallery-thumbs">
                            ${project.gallery.map((img, index) => `
                                <div class="gallery-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
                                    <img src="${img}" alt="صورة مصغرة ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="project-info">
                        <div class="project-info-item">
                            <h4><i class='bx bx-user'></i> العميل</h4>
                            <p>${project.client}</p>
                        </div>
                        <div class="project-info-item">
                            <h4><i class='bx bx-calendar'></i> تاريخ النظام</h4>
                            <p>${project.date}</p>
                        </div>
                        <div class="project-info-item">
                            <h4><i class='bx bx-time'></i> مدة التطوير</h4>
                            <p>${project.duration}</p>
                        </div>
                        <div class="project-info-item">
                            <h4><i class='bx bx-check-circle'></i> حالة النظام</h4>
                            <p>${project.status}</p>
                        </div>
                    </div>
                    
                    <div class="project-description">
                        <h4>وصف النظام</h4>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-services">
                        <h4>المميزات والخدمات</h4>
                        <ul>
                            ${project.services.map(service => `<li><i class='bx bx-check'></i> ${service}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-tech">
                        <h4>التقنيات المستخدمة</h4>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag"><i class='bx bx-code-alt'></i> ${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-results">
                        <h4>مزايا النظام</h4>
                        <div class="results-grid">
                            ${project.results.map(result => `
                                <div class="result-item">
                                    <div class="result-icon"><i class='bx bx-line-chart'></i></div>
                                    <div class="result-number">${result.value}</div>
                                    <div class="result-label">${result.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Setup gallery functionality using event delegation
            setupGallery();
            
            // Show modal
            portfolioModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Update navigation buttons
            updateNavButtons();
        }
    }
    
    function setupGallery() {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;
        
        // Use event delegation for gallery interactions
        modalBody.addEventListener('click', function(e) {
            const mainImage = document.getElementById('mainImage');
            if (!mainImage) return;
            
            // Handle thumbnail clicks
            const thumbClicked = e.target.closest('.gallery-thumb');
            if (thumbClicked) {
                const index = parseInt(thumbClicked.getAttribute('data-index') || '0');
                updateGalleryImage(mainImage, index);
                return;
            }
            
            // Handle navigation button clicks
            if (e.target.closest('.next-btn')) {
                navigateGallery(mainImage, 'next');
                return;
            }
            
            if (e.target.closest('.prev-btn')) {
                navigateGallery(mainImage, 'prev');
                return;
            }
        });
    }
    
    function updateGalleryImage(mainImage, index) {
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        if (!galleryThumbs.length) return;
        
        // Update main image with smooth transition
        mainImage.style.opacity = '0';
        setTimeout(() => {
            if (galleryThumbs[index] && galleryThumbs[index].querySelector('img')) {
                mainImage.src = galleryThumbs[index].querySelector('img').src;
                mainImage.style.opacity = '1';
            }
        }, 300);
        
        // Update active thumbnail
        galleryThumbs.forEach(thumb => thumb.classList.remove('active'));
        if (galleryThumbs[index]) {
            galleryThumbs[index].classList.add('active');
            
            // Scroll thumbnail into view if possible
            galleryThumbs[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        
        // Store current index as a data attribute for navigation
        mainImage.setAttribute('data-current-index', index.toString());
    }
    
    function navigateGallery(mainImage, direction) {
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        if (!galleryThumbs.length) return;
        
        const currentIndex = parseInt(mainImage.getAttribute('data-current-index') || '0');
        let newIndex;
        
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryThumbs.length;
        } else {
            newIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
        }
        
        updateGalleryImage(mainImage, newIndex);
    }
    
    function closeModal() {
        if (portfolioModal) {
            portfolioModal.classList.remove('show');
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    function navigateProject(direction) {
        // Get all visible portfolio items
        const visibleItems = filteredItems;
        const projectIds = visibleItems.map(item => {
            const link = item.querySelector('.portfolio-details-link');
            return link ? link.getAttribute('data-id') : null;
        }).filter(id => id !== null);
        
        // If no projects or only one project is visible, return
        if (projectIds.length <= 1) return;
        
        // Find current project index
        const currentIndex = projectIds.indexOf(currentProjectId);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (direction === 'next') {
                nextIndex = (currentIndex + 1) % projectIds.length;
            } else {
                nextIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
            }
            
            // Get next project ID
            const nextProjectId = projectIds[nextIndex];
            
            // Open next project
            openProjectDetails(nextProjectId);
        }
    }
    
    function updateNavButtons() {
        if (!prevProject || !nextProject) return;
        
        // If only one project is visible, disable navigation buttons
        if (filteredItems.length <= 1) {
            prevProject.disabled = true;
            prevProject.classList.add('disabled');
            nextProject.disabled = true;
            nextProject.classList.add('disabled');
        } else {
            prevProject.disabled = false;
            prevProject.classList.remove('disabled');
            nextProject.disabled = false;
            nextProject.classList.remove('disabled');
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        // Use notification queue to prevent overlap
        if (!window.notificationQueue) {
            window.notificationQueue = [];
        }
        
        // Add to queue
        window.notificationQueue.push({ message, type });
        
        // Process queue if not already processing
        if (!window.processingNotifications) {
            processNotificationQueue();
        }
    }
    
    function processNotificationQueue() {
        if (!window.notificationQueue || window.notificationQueue.length === 0) {
            window.processingNotifications = false;
            return;
        }
        
        window.processingNotifications = true;
        const notification = window.notificationQueue.shift();
        displayNotification(notification.message, notification.type);
    }
    
    function displayNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.portfolio-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `portfolio-notification ${type}`;
        
        // Icon based on type
        let icon = 'bx-info-circle';
        if (type === 'success') icon = 'bx-check-circle';
        if (type === 'error') icon = 'bx-error-circle';
        if (type === 'warning') icon = 'bx-error';
        
        notification.innerHTML = `
            <i class='bx ${icon}'></i>
            <span>${message}</span>
            <button class="notification-close"><i class='bx bx-x'></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Add classes for animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                    processNotificationQueue(); // Process next notification
                }, 300);
            });
        }
        
        // Auto close after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                    processNotificationQueue(); // Process next notification
                }, 300);
            }
        }, 3000);
    }
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add necessary CSS styles
    const portfolioStyles = `
        /* Visibility classes for better transitions */
        .port-box {
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        .port-box.hidden {
            display: none;
            opacity: 0;
            transform: translateY(20px);
        }
        
        .port-box.visible {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Rest of the styles remain the same */
        .portfolio-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 15px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 99999;
            max-width: 350px;
            direction: rtl;
        }
        
        .portfolio-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .portfolio-notification i {
            font-size: 1.5rem;
        }
        
        .portfolio-notification span {
            flex: 1;
            font-size: 0.95rem;
        }
        
        .portfolio-notification button {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-color-light);
            transition: all 0.3s ease;
        }
        
        .portfolio-notification button:hover {
            color: var(--primary-color);
            transform: scale(1.2);
        }
        
        .portfolio-notification.info i {
            color: #3498db;
        }
        
        .portfolio-notification.success i {
            color: #2ecc71;
        }
        
        .portfolio-notification.error i {
            color: #e74c3c;
        }
        
        .portfolio-notification.warning i {
            color: #f39c12;
        }
        
        @media (max-width: 576px) {
            .portfolio-notification {
                left: 20px;
                right: 20px;
                bottom: 20px;
                max-width: none;
            }
        }
    `;
    
    // Add styles to head
    const styleElement = document.createElement('style');
    styleElement.textContent = portfolioStyles;
    document.head.appendChild(styleElement);
});

// =======================OFFERS SECTION=================================
document.addEventListener('DOMContentLoaded', function () {
    const subscriptionSection = document.getElementById('subscription-plans');
    const cards = document.querySelectorAll('.plan-card');
  
    // Set card and feature indices for staggered animations
    cards.forEach((card, index) => {
      card.style.setProperty('--card-index', index);
  
      const features = card.querySelectorAll('.subs-features li');
      features.forEach((feature, featureIndex) => {
        feature.style.setProperty('--feature-index', featureIndex);
      });
    });
  
    // Intersection Observer for subscription section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When section becomes visible
            subscriptionSection.classList.add('visible');
  
            // Add animation class to cards
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate');
              }, index * 200); // Staggered animation for cards
            });
          } else {
            // When section goes out of view
            subscriptionSection.classList.remove('visible');
  
            // Remove animation class from cards
            cards.forEach((card) => {
              card.classList.remove('animate');
            });
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.1, // 10% of the section must be visible
        rootMargin: '0px',
      }
    );
  
    // Start observing the subscription section
    sectionObserver.observe(subscriptionSection);
  
    // Card 3D hover effect
    cards.forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const maxRotation = 5; // max rotation in degrees
  
        const rotateY = -maxRotation * (x - centerX) / centerX; // Reversed for RTL
        const rotateX = -maxRotation * (y - centerY) / centerY;
  
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
  
      card.addEventListener('mouseleave', function () {
        // Reset transform based on card type
        if (this.classList.contains('featured')) {
          this.style.transform = 'translateY(-15px) rotateY(0deg) scale(1.05)';
        } else {
          this.style.transform = 'rotateY(0deg) scale(1)';
        }
      });
    });
  });

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