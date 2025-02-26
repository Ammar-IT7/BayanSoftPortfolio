// Preloader
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
    }, 1000);
});

(function() {
    var themeColor = '#e28c1d';
    var metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = themeColor;
})();
// تبديل الكلمات المتحركة
let words = document.querySelectorAll(".word");

// لم نعد بحاجة إلى تقسيم الكلمات إلى حروف
// بدلاً من ذلك سنجعل كل كلمة كاملة متحركة
words.forEach((word) => {
// إضافة صنف إضافي لكل كلمة لتسهيل التنسيق
word.classList.add("word-animated");

// جعل جميع الكلمات مخفية في البداية
word.style.opacity = "0";
word.style.display = "none";
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// إظهار الكلمة الأولى
words[currentWordIndex].style.opacity = "1";
words[currentWordIndex].style.display = "block";
words[currentWordIndex].classList.add("visible");

let changeText = () => {
let currentWord = words[currentWordIndex];
let nextWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
let nextWord = words[nextWordIndex];

// تأثير خروج الكلمة الحالية
currentWord.classList.remove("visible");
currentWord.classList.add("exit");

// تأثير انتظار قبل إظهار الكلمة التالية
setTimeout(() => {
// إخفاء الكلمة الحالية تماماً
currentWord.style.opacity = "0";
currentWord.style.display = "none";
currentWord.classList.remove("exit");

// إظهار الكلمة التالية
nextWord.style.display = "block";
nextWord.classList.add("enter");

// التأكد من أن الكلمة مرئية
setTimeout(() => {
    nextWord.style.opacity = "1";
    nextWord.classList.remove("enter");
    nextWord.classList.add("visible");
}, 50);
}, 600);

// تحديث المؤشر إلى الكلمة التالية
currentWordIndex = nextWordIndex;
};

// بدء التغيير الأول
changeText();

// تعيين فاصل زمني للتغيير المستمر (تم زيادة الوقت قليلاً)
setInterval(changeText, 4500);
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