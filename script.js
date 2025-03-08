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
    const viewOptionsBtn = document.getElementById('viewOptionsBtn');
    const viewOptionsMenu = document.getElementById('viewOptionsMenu');
    const closeViewOptions = document.getElementById('closeViewOptions');
    const resetViewOptions = document.getElementById('resetViewOptions');
    const applyViewOptions = document.getElementById('applyViewOptions');
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
    const viewButtons = document.querySelectorAll('.toggle-btn[data-view]');
    const cardSizeSlider = document.getElementById('cardSizeSlider');
    const sortSelect = document.getElementById('sortProjects');
    const animationsToggle = document.getElementById('animationsToggle');
    
    // State variables
    let currentFilter = 'all';
    let currentPage = 1;
    let currentProjectId = null;
    let itemsPerPage = 6;
    let animationsEnabled = true;
    let allItems = Array.from(portfolioItems);
    let likeBtns, quickViewBtns, portfolioDetailsLinks;
    
    // Initialize event listeners for dynamic elements
    function initializeEventListeners() {
        // Get fresh references to these elements as they might have changed
        likeBtns = document.querySelectorAll('.port-like-btn');
        quickViewBtns = document.querySelectorAll('.quickview-btn');
        portfolioDetailsLinks = document.querySelectorAll('.portfolio-details-link');
        
        // Like button functionality
        likeBtns.forEach(btn => {
            // Remove existing listeners first to avoid duplicates
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                this.classList.toggle('liked');
                const likeCount = this.querySelector('.like-count');
                let currentLikes = parseInt(likeCount.textContent);
                
                if (this.classList.contains('liked')) {
                    likeCount.textContent = currentLikes + 1;
                    this.querySelector('i').classList.remove('bx-heart');
                    this.querySelector('i').classList.add('bxs-heart');
                    
                    // Show notification
                    showNotification('تم الإعجاب بالمشروع', 'success');
                } else {
                    likeCount.textContent = currentLikes - 1;
                    this.querySelector('i').classList.remove('bxs-heart');
                    this.querySelector('i').classList.add('bx-heart');
                }
            });
        });
        
        // Quick View functionality
        quickViewBtns.forEach(btn => {
            // Remove existing listeners first to avoid duplicates
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-id');
                openQuickView(projectId);
            });
        });
        
        // Portfolio Details Modal
        portfolioDetailsLinks.forEach(link => {
            // Remove existing listeners first to avoid duplicates
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-id');
                openProjectDetails(projectId);
            });
        });
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
            
            // Filter items
            filterItems(filterValue);
        });
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm) {
                const filteredItems = Array.from(portfolioItems).filter(item => {
                    const title = item.getAttribute('data-title') ? item.getAttribute('data-title').toLowerCase() : '';
                    const description = item.querySelector('.port-content p') ? 
                        item.querySelector('.port-content p').textContent.toLowerCase() : '';
                    
                    return title.includes(searchTerm) || description.includes(searchTerm);
                });
                
                if (filteredItems.length === 0) {
                    showEmptyState();
                } else {
                    hideEmptyState();
                    showItems(filteredItems);
                }
            } else {
                hideEmptyState();
                filterItems(currentFilter);
            }
            
            updateVisibleCount();
        }, 300));
    }
    
    // Reset search
    if (resetSearch) {
        resetSearch.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
            }
            hideEmptyState();
            filterItems(currentFilter);
            updateVisibleCount();
        });
    }
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Change button state
            this.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> <span>جاري التحميل...</span>';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                currentPage++;
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = Math.min(startIndex + itemsPerPage, allItems.length);
                
                // If no more items to load
                if (startIndex >= allItems.length) {
                    this.innerHTML = '<span>تم تحميل جميع المشاريع</span> <i class="bx bx-check"></i>';
                    this.classList.add('btn-disabled');
                    
                    // Show notification
                    showNotification('تم تحميل جميع المشاريع المتاحة', 'info');
                    return;
                }
                
                // Get next batch of items
                const nextItems = allItems.slice(startIndex, endIndex);
                
                // Add new items with animation
                nextItems.forEach((item, index) => {
                    // Clone the item
                    const newItem = item.cloneNode(true);
                    newItem.style.opacity = '0';
                    newItem.style.transform = 'translateY(30px)';
                    
                    // Append to gallery
                    portfolioGallery.appendChild(newItem);
                    
                    // Animate in
                    setTimeout(() => {
                        newItem.style.transition = 'all 0.5s ease';
                        newItem.style.opacity = '1';
                        newItem.style.transform = 'translateY(0)';
                    }, 100 + (index * 100));
                });
                
                // Reinitialize event listeners for new items
                initializeEventListeners();
                
                // Update counters
                updateVisibleCount();
                
                // Reset button state
                if (endIndex >= allItems.length) {
                    this.innerHTML = '<span>تم تحميل جميع المشاريع</span> <i class="bx bx-check"></i>';
                    this.classList.add('btn-disabled');
                } else {
                    this.innerHTML = '<span>عرض المزيد من المشاريع</span> <i class="bx bx-chevron-down"></i>';
                    this.disabled = false;
                }
                
                // Show notification
                showNotification(`تم تحميل ${nextItems.length} مشاريع جديدة`, 'success');
            }, 1200);
        });
    }
    
    // View options menu
    if (viewOptionsBtn && viewOptionsMenu) {
        viewOptionsBtn.addEventListener('click', function() {
            viewOptionsMenu.classList.add('show');
            document.body.classList.add('menu-open');
        });
        
        if (closeViewOptions) {
            closeViewOptions.addEventListener('click', function() {
                viewOptionsMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            });
        }
        
        // Change view (grid/list)
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                viewButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const viewType = this.getAttribute('data-view');
                if (viewType === 'grid') {
                    if (portfolioGallery) {
                        portfolioGallery.classList.remove('list-view');
                    }
                } else {
                    if (portfolioGallery) {
                        portfolioGallery.classList.add('list-view');
                    }
                }
            });
        });
        
        // Card size slider
        if (cardSizeSlider && portfolioGallery) {
            cardSizeSlider.addEventListener('input', function() {
                portfolioGallery.classList.remove('size-small', 'size-large');
                
                if (this.value == 1) {
                    portfolioGallery.classList.add('size-small');
                } else if (this.value == 3) {
                    portfolioGallery.classList.add('size-large');
                }
            });
        }
        
        // Sorting projects
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const sortType = this.value;
                sortProjects(sortType);
            });
        }
        
        // Toggle animations
        if (animationsToggle) {
            animationsToggle.addEventListener('change', function() {
                animationsEnabled = this.checked;
                
                if (animationsEnabled) {
                    document.body.classList.remove('animations-disabled');
                    if (portfolioGallery) {
                        portfolioGallery.classList.remove('animations-disabled');
                    }
                } else {
                    document.body.classList.add('animations-disabled');
                    if (portfolioGallery) {
                        portfolioGallery.classList.add('animations-disabled');
                    }
                }
            });
        }
        
        // Reset view options
        if (resetViewOptions) {
            resetViewOptions.addEventListener('click', function() {
                // Reset view type
                viewButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-view') === 'grid') {
                        btn.classList.add('active');
                    }
                });
                if (portfolioGallery) {
                    portfolioGallery.classList.remove('list-view');
                }
                
                // Reset card size
                if (cardSizeSlider) {
                    cardSizeSlider.value = 2;
                }
                if (portfolioGallery) {
                    portfolioGallery.classList.remove('size-small', 'size-large');
                }
                
                // Reset sort
                if (sortSelect) {
                    sortSelect.value = 'newest';
                    sortProjects('newest');
                }
                
                // Reset animations
                if (animationsToggle) {
                    animationsToggle.checked = true;
                }
                animationsEnabled = true;
                document.body.classList.remove('animations-disabled');
                if (portfolioGallery) {
                    portfolioGallery.classList.remove('animations-disabled');
                }
                
                showNotification('تم إعادة ضبط خيارات العرض', 'info');
            });
        }
        
        // Apply view options
        if (applyViewOptions) {
            applyViewOptions.addEventListener('click', function() {
                viewOptionsMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
                
                showNotification('تم تطبيق خيارات العرض', 'success');
            });
        }
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
            if (viewOptionsMenu && viewOptionsMenu.classList.contains('show')) {
                viewOptionsMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Sample portfolio details data
    const portfolioDetails = {
        1: {
            title: "تطبيق المتجر الذكي",
            client: "شركة التقنية المتطورة",
            date: "أغسطس 2024",
            category: "تطبيقات الجوال",
            duration: "3 أشهر",
            budget: "$25,000",
            status: "مكتمل",
            description: "تطبيق للتسوق الإلكتروني يوفر تجربة تسوق سلسة وسهلة للمستخدمين مع نظام دفع آمن ومتعدد الخيارات. تم تطوير التطبيق باستخدام تقنيات حديثة تضمن سرعة الأداء وتجربة مستخدم متميزة. يتميز التطبيق بواجهة سهلة الاستخدام ونظام بحث متقدم يساعد المستخدمين على العثور بسرعة على المنتجات التي يبحثون عنها. كما يتضمن نظام توصيات ذكي مبني على سلوك المستخدم وتفضيلاته.",
            services: ["تصميم واجهة المستخدم", "تطوير تطبيق iOS وأندرويد", "تكامل نظام الدفع", "لوحة تحكم إدارية", "نظام إشعارات متقدم", "تحليلات المستخدم"],
            technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Stripe API", "Redux"],
            results: [
                { label: "تنزيلات", value: "25K+" },
                { label: "تقييم المستخدمين", value: "4.8/5" },
                { label: "معدل التحويل", value: "18%" },
                { label: "زيادة المبيعات", value: "35%" }
            ],
            gallery: [
                "images/portfolio1.svg",
                "images/portfolio2.svg",
                "images/portfolio3.svg",
                "images/portfolio4.svg"
            ]
        },
        2: {
            title: "منصة الخدمات الرقمية",
            client: "مؤسسة الأفق الجديد",
            date: "يوليو 2024",
            category: "تطوير الويب",
            duration: "4 أشهر",
            budget: "$30,000",
            status: "مكتمل",
            description: "منصة متكاملة تقدم مجموعة من الخدمات الرقمية للشركات والأفراد مع واجهة مستخدم بسيطة وسهلة الاستخدام. تتيح المنصة للمستخدمين طلب الخدمات ومتابعة حالتها بشكل مباشر. تم تصميم المنصة بطريقة تتيح التخصيص حسب احتياجات كل عميل، مع لوحة تحكم متطورة تمكن المسؤولين من إدارة المحتوى وتتبع الطلبات ومراقبة أداء المنصة.",
            services: ["تطوير منصة ويب", "تصميم واجهة مستخدم", "بناء نظام إدارة محتوى", "تكامل بوابة الدفع", "تطوير واجهة برمجة التطبيقات (API)", "تحسين محركات البحث"],
            technologies: ["Vue.js", "Laravel", "MySQL", "AWS", "Docker", "Redis"],
            results: [
                { label: "مستخدمين نشطين", value: "10K+" },
                { label: "معدل الاحتفاظ", value: "85%" },
                { label: "وقت التحميل", value: "1.2s" },
                { label: "طلبات شهرية", value: "5000+" }
            ],
            gallery: [
                "images/portfolio2.svg",
                "images/portfolio3.svg",
                "images/portfolio4.svg",
                "images/portfolio5.svg"
            ]
        },
        3: {
            title: "هوية بصرية لشركة ناشئة",
            client: "شركة التكنولوجيا الحديثة",
            date: "يونيو 2024",
            category: "تصميم واجهات",
            duration: "2 أشهر",
            budget: "$15,000",
            status: "مكتمل",
            description: "تصميم هوية بصرية كاملة لشركة ناشئة في مجال التكنولوجيا تشمل الشعار والألوان والخطوط وعناصر التصميم. تم إنشاء هوية تعكس قيم العلامة التجارية وتميزها في السوق المستهدفة.",
            services: ["تصميم الشعار", "تحديد الألوان", "اختيار الخطوط", "التطبيقات المطبوعة", "التطبيقات الرقمية"],
            technologies: ["Figma", "Illustrator", "InDesign", "Photoshop"],
            results: [
                { label: "تعزيز الوعي بالعلامة", value: "45%" },
                { label: "رضا العملاء", value: "98%" },
                { label: "تحسين المبيعات", value: "30%" },
                { label: "زيادة التفاعل", value: "60%" }
            ],
            gallery: [
                "images/portfolio3.svg",
                "images/portfolio4.svg",
                "images/portfolio5.svg",
                "images/portfolio6.svg"
            ]
        },
        4: {
            title: "تطبيق إدارة المهام",
            client: "شركة أفكار للخدمات",
            date: "مايو 2024",
            category: "تطبيقات الجوال",
            duration: "3 أشهر",
            budget: "$20,000",
            status: "قيد التنفيذ",
            description: "تطبيق ذكي لإدارة المهام والمشاريع يساعد المستخدمين على تنظيم وقتهم وزيادة إنتاجيتهم بطريقة سهلة وفعالة. يتميز بواجهة بسيطة وسهلة الاستخدام مع إمكانيات متقدمة.",
            services: ["تصميم واجهة المستخدم", "تطوير تطبيق متعدد المنصات", "تكامل الخدمات السحابية", "مزامنة البيانات"],
            technologies: ["Flutter", "Firebase", "Google Cloud", "RESTful API"],
            results: [
                { label: "تنزيلات", value: "15K+" },
                { label: "تقييم المستخدمين", value: "4.5/5" },
                { label: "معدل الاحتفاظ", value: "75%" },
                { label: "وقت المهمة", value: "-40%" }
            ],
            gallery: [
                "images/portfolio4.svg",
                "images/portfolio5.svg",
                "images/portfolio6.svg",
                "images/portfolio1.svg"
            ]
        },
        5: {
            title: "لوحة تحكم إحصائية",
            client: "مؤسسة البيانات المتقدمة",
            date: "أبريل 2024",
            category: "تطوير الويب",
            duration: "4 أشهر",
            budget: "$35,000",
            status: "قيد التنفيذ",
            description: "منصة تحليلية متكاملة تساعد الشركات على متابعة أدائها وتحليل البيانات وعرض المؤشرات الرئيسية بطريقة سهلة. توفر رؤى عميقة للبيانات من خلال رسوم بيانية تفاعلية وتقارير مخصصة.",
            services: ["تطوير منصة تحليلات", "تصميم لوحات معلومات", "معالجة بيانات متقدمة", "تكامل مصادر البيانات", "تقارير مخصصة"],
            technologies: ["React.js", "D3.js", "Node.js", "MongoDB", "GraphQL", "AWS"],
            results: [
                { label: "تحسين اتخاذ القرار", value: "60%" },
                { label: "توفير الوقت", value: "75%" },
                { label: "دقة التنبؤات", value: "85%" },
                { label: "تقليل التكاليف", value: "30%" }
            ],
            gallery: [
                "images/portfolio5.svg",
                "images/portfolio6.svg",
                "images/portfolio1.svg",
                "images/portfolio2.svg"
            ]
        },
        6: {
            title: "تصميم موقع شركة استشارات",
            client: "مجموعة الحلول المالية",
            date: "مارس 2024",
            category: "تصميم واجهات",
            duration: "2 أشهر",
            budget: "$18,000",
            status: "مكتمل",
            description: "تصميم موقع إلكتروني احترافي لشركة استشارات مالية مع هوية بصرية متكاملة تعكس قيم الشركة وتعزز ثقة العملاء. يتميز الموقع بتجربة مستخدم سلسة وسهولة الوصول إلى المعلومات.",
            services: ["تصميم واجهة المستخدم", "تطوير WordPress", "تحسين محركات البحث", "تكامل وسائل التواصل", "استضافة وصيانة"],
            technologies: ["WordPress", "CSS3", "JavaScript", "PHP", "MySQL", "AWS"],
            results: [
                { label: "زيادة الزيارات", value: "120%" },
                { label: "معدل التحويل", value: "15%" },
                { label: "وقت التصفح", value: "+45%" },
                { label: "عملاء جدد", value: "40+" }
            ],
            gallery: [
                "images/portfolio6.svg",
                "images/portfolio1.svg",
                "images/portfolio2.svg",
                "images/portfolio3.svg"
            ]
        }
    };
    
    // Helper Functions
    function animatePortfolioItems() {
        const items = document.querySelectorAll('.port-box');
        if (!items.length) return;
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    function filterItems(filterValue) {
        if (!portfolioGallery) return;
        
        const items = Array.from(document.querySelectorAll('.port-box'));
        let visibleCount = 0;
        
        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue.substring(1))) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
                visibleCount++;
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        if (visibleCount === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
        
        updateVisibleCount();
        // Make sure to update navigation buttons after filtering
        updateNavButtons();
    }
    
    function showItems(items) {
        if (!portfolioGallery) return;
        
        const allItems = Array.from(document.querySelectorAll('.port-box'));
        
        allItems.forEach(item => {
            if (items.includes(item)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Update navigation buttons after changing visible items
        updateNavButtons();
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
        const visibleItems = document.querySelectorAll('.port-box[style*="display: block"], .port-box:not([style*="display: none"])');
        if (visibleProjectsCount) {
            visibleProjectsCount.textContent = visibleItems.length;
        }
    }
    
    function sortProjects(sortType) {
        if (!portfolioGallery) return;
        
        const items = Array.from(document.querySelectorAll('.port-box'));
        
        // Remove items from DOM
        items.forEach(item => {
            if (item.parentNode === portfolioGallery) {
                portfolioGallery.removeChild(item);
            }
        });
        
        // Sort items
        const sortedItems = items.sort((a, b) => {
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
        
        // Re-add sorted items with animation
        sortedItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            portfolioGallery.appendChild(item);
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 + (index * 50));
        });
        
        // Update all items array for pagination
        allItems = sortedItems;
        
        // Reinitialize event listeners for sorted items
        initializeEventListeners();
        
        // Update visible count after sorting
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
            
            // Add event listener to view details button
            const viewDetailsBtn = quickViewBody.querySelector('.view-full-details');
            if (viewDetailsBtn) {
                viewDetailsBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    closeQuickView();
                    setTimeout(() => {
                        openProjectDetails(this.getAttribute('data-id'));
                    }, 300);
                });
            }
            
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
            let html = `
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
                            <h4><i class='bx bx-calendar'></i> تاريخ المشروع</h4>
                            <p>${project.date}</p>
                        </div>
                        <div class="project-info-item">
                            <h4><i class='bx bx-time'></i> مدة التنفيذ</h4>
                            <p>${project.duration}</p>
                        </div>
                        <div class="project-info-item">
                            <h4><i class='bx bx-check-circle'></i> حالة المشروع</h4>
                            <p>${project.status}</p>
                        </div>
                    </div>
                    
                    <div class="project-description">
                        <h4>وصف المشروع</h4>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-services">
                        <h4>الخدمات</h4>
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
                        <h4>نتائج المشروع</h4>
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
            
            modalBody.innerHTML = html;
            
            // Setup gallery functionality
            setupGallery();
            
            // Show modal
            portfolioModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Update navigation buttons
            updateNavButtons();
        }
    }
    
    function setupGallery() {
        const galleryThumbs = document.querySelectorAll('.gallery-thumb');
        const mainImage = document.getElementById('mainImage');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentIndex = 0;
        
        if (!mainImage) return; // Exit if no main image found
        
        // Set up thumbnail clicks
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index') || '0');
                currentIndex = index;
                updateGallery();
            });
        });
        
        // Navigation buttons
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % galleryThumbs.length;
                updateGallery();
            });
            
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
                updateGallery();
            });
        }
        
        // Function to update gallery
        function updateGallery() {
            // Update main image with smooth transition
            mainImage.style.opacity = '0';
            setTimeout(() => {
                if (galleryThumbs[currentIndex] && galleryThumbs[currentIndex].querySelector('img')) {
                    mainImage.src = galleryThumbs[currentIndex].querySelector('img').src;
                    mainImage.style.opacity = '1';
                }
            }, 300);
            
            // Update active thumbnail
            galleryThumbs.forEach(thumb => thumb.classList.remove('active'));
            if (galleryThumbs[currentIndex]) {
                galleryThumbs[currentIndex].classList.add('active');
            }
            
            // Scroll thumbnail into view if possible
            if (galleryThumbs[currentIndex] && galleryThumbs[currentIndex].scrollIntoView) {
                galleryThumbs[currentIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
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
        const visibleItems = Array.from(document.querySelectorAll('.port-box:not([style*="display: none"])'));
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
        // Get all visible portfolio items
        const visibleItems = Array.from(document.querySelectorAll('.port-box:not([style*="display: none"])'));
        
        // If only one project is visible, disable navigation buttons
        if (visibleItems.length <= 1) {
            if (prevProject) {
                prevProject.disabled = true;
                prevProject.classList.add('disabled');
            }
            if (nextProject) {
                nextProject.disabled = true;
                nextProject.classList.add('disabled');
            }
        } else {
            if (prevProject) {
                prevProject.disabled = false;
                prevProject.classList.remove('disabled');
            }
            if (nextProject) {
                nextProject.disabled = false;
                nextProject.classList.remove('disabled');
            }
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
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
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
        
        // Auto close after 4 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
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
    
    // Add notification styles
    const notificationStyles = `
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
        
        /* Quick View Styles */
        .quick-view-image {
            width: 100%;
            height: 300px;
            overflow: hidden;
        }
        
        .quick-view-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .quick-view-info {
            padding: 25px;
        }
        
        .quick-view-info h3 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: var(--text-color);
        }
        
        .quick-view-meta {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-color-light);
        }
        
        .meta-item i {
            color: var(--primary-color);
            font-size: 1.1rem;
        }
        
        .quick-view-info p {
            color: var(--text-color-light);
            line-height: 1.7;
            margin-bottom: 25px;
        }
        
        .view-full-details {
            display: inline-flex;
            align-items: center;
            background: var(--primary-color);
            color: white;
            padding: 10px 25px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .view-full-details:hover {
            background: var(--accent-color);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    
    // Add styles to head
    const styleElement = document.createElement('style');
    styleElement.textContent = notificationStyles;
    document.head.appendChild(styleElement);
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