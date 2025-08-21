// Main JavaScript file for Nest Secure
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initContactForm();
    initShopFunctionality();
    initCCTVWizard();
    initTestimonialFilters();
    initStatisticsCounter();
    initHeroSlideshow();
    
    // Set body to loaded state for smooth page transitions
    document.body.classList.add('loaded');
  } catch (error) {
    console.error('Error initializing Nest Secure:', error);
  }
});

// Hero Slideshow functionality
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  const slideContents = document.querySelectorAll('.slide-content');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;
  let isAutoPlaying = true;
  
  // Function to show slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slideContents.forEach(content => content.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      slideContents[index].classList.add('active');
    }
    
    currentSlide = index;
  }
  
  // Function to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  // Function to previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }
  
  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetInterval();
    });
  });
  
  // Add click events to navigation buttons
  const prevBtn = document.querySelector('.slide-btn.prev');
  const nextBtn = document.querySelector('.slide-btn.next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }
  
  // Auto slide function
  function startAutoSlide() {
    if (isAutoPlaying) {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
  }
  
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }
  
  function resetInterval() {
    stopAutoSlide();
    startAutoSlide();
  }
  
  // Start auto slideshow immediately
  startAutoSlide();
  
  // Pause on hover
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });
    
    heroSection.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
  }
  
  // Pause on focus (for accessibility)
  const slideButtons = document.querySelectorAll('.slide-btn, .slide-dot');
  slideButtons.forEach(button => {
    button.addEventListener('focus', () => {
      stopAutoSlide();
    });
    
    button.addEventListener('blur', () => {
      startAutoSlide();
    });
  });
  
  // Global functions for onclick handlers
  window.changeSlide = function(direction) {
    if (direction === 1) {
      nextSlide();
    } else {
      prevSlide();
    }
    resetInterval();
  };
  
  window.currentSlide = function(index) {
    showSlide(index - 1);
    resetInterval();
  };
}

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  // Mobile navigation toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Set active navigation link based on current page
  setActiveNavLink();
}

// Set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    // Check if this link matches the current page
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage.includes('shop') && linkHref.includes('shop')) ||
        (currentPage.includes('cctv-wizard') && linkHref.includes('cctv-wizard'))) {
      link.classList.add('active');
    }
  });
}

// Animation functionality
function initAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
      el.classList.add('animated');
    });
    return;
  }
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Special animations for specific elements
        if (entry.target.classList.contains('fade-in')) {
          entry.target.style.animationDelay = '0.1s';
        }
        
        if (entry.target.classList.contains('slide-up')) {
          entry.target.style.animationDelay = '0.2s';
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all animate-* elements and animation classes
  document.querySelectorAll('[class*="animate-"], .fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });
  
  // Animate elements with data-delay attribute
  document.querySelectorAll('[data-delay]').forEach(el => {
    const delay = el.getAttribute('data-delay');
    el.style.animationDelay = delay + 's';
  });
  
  // Run initial animation check
  animateOnScroll();
  
  // Add scroll listener for continuous animation checking
  window.addEventListener('scroll', animateOnScroll);
}

// Animation on scroll function
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-up');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !phone || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', { name, email, phone, subject, message });
      
      // Show success message
      showNotification('Thank you for your message! We will contact you soon.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Shop functionality
function initShopFunctionality() {
  // Product gallery for product pages
  if (document.querySelector('.product-gallery')) {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const newSrc = this.querySelector('img').src.replace('-thumb', '');
        mainImage.src = newSrc;
        
        // Update active thumbnail
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Quantity selector
  const quantityInput = document.querySelector('.quantity-selector input');
  const minusBtn = document.querySelector('.qty-minus');
  const plusBtn = document.querySelector('.qty-plus');
  
  if (quantityInput && minusBtn && plusBtn) {
    minusBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }
  
  // Add to cart functionality
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const product = {
        name: document.querySelector('.product-title')?.textContent || 'Product',
        price: document.querySelector('.product-price')?.textContent || '$0',
        quantity: quantityInput?.value || 1
      };
      
      // Here you would normally add to cart
      console.log('Added to cart:', product);
      
      // Show success message
      showNotification(`${product.quantity} ${product.name} added to cart!`, 'success');
    });
  }
  
  // Product tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length && tabPanes.length) {
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
}

// CCTV Wizard functionality
function initCCTVWizard() {
  const wizardContainer = document.querySelector('.cctv-wizard');
  
  if (wizardContainer) {
    // Wizard configuration
    const wizardSteps = [
      {
        title: "Choose Number of Cameras",
        key: "cameraCount",
        options: [
          { value: "4", label: "4 Cameras", price: 400 },
          { value: "8", label: "8 Cameras", price: 700 },
          { value: "16", label: "16 Cameras", price: 1200 },
          { value: "custom", label: "Custom Number", price: 0 }
        ],
        type: "radio",
        required: true
      },
      {
        title: "Select Camera Type",
        key: "cameraType",
        options: [
          { value: "indoor", label: "Indoor Cameras", price: 50 },
          { value: "outdoor", label: "Outdoor Cameras", price: 80 },
          { value: "night", label: "Night Vision", price: 60 },
          { value: "ptz", label: "PTZ Cameras", price: 150 }
        ],
        type: "checkbox",
        required: true
      },
      {
        title: "Choose Storage",
        key: "storage",
        options: [
          { value: "dvr", label: "DVR System", price: 200 },
          { value: "nvr", label: "NVR System", price: 300 },
          { value: "hybrid", label: "Hybrid System", price: 350 }
        ],
        type: "radio",
        required: true
      },
      {
        title: "Add Features",
        key: "features",
        options: [
          { value: "mobile", label: "Mobile Access", price: 50 },
          { value: "motion", label: "Motion Detection", price: 30 },
          { value: "install", label: "Professional Installation", price: 100 }
        ],
        type: "checkbox",
        required: false
      }
    ];
    
    let currentStep = 0;
    let wizardData = {};
    
    // Initialize wizard
    function initWizard() {
      renderWizard();
      setupEventListeners();
    }
    
    // Render wizard steps
    function renderWizard() {
      let wizardHTML = `
        <div class="wizard-header">
          <h3>Customize Your CCTV Package</h3>
          <div class="progress-container">
            ${wizardSteps.map((step, index) => `
              <div class="progress-step ${index === 0 ? 'active' : ''}" data-step="${index}">
                <div class="step-number">${index + 1}</div>
                <div class="step-title">${step.title}</div>
              </div>
            `).join('')}
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
          </div>
        </div>
        <div class="wizard-body"></div>
      `;
      
      wizardContainer.innerHTML = wizardHTML;
      renderCurrentStep(0);
    }
    
    // Render current step
    function renderCurrentStep(stepIndex) {
      const step = wizardSteps[stepIndex];
      const wizardBody = wizardContainer.querySelector('.wizard-body');
      
      const stepHTML = `
        <div class="wizard-step" data-step="${stepIndex}">
          <h4>${step.title}</h4>
          <div class="options-grid ${step.type}-options">
            ${step.options.map(option => `
              <label class="option-card">
                <input type="${step.type}" name="${step.key}" value="${option.value}">
                <div class="card-content">
                  <span class="option-label">${option.label}</span>
                  ${option.price ? `<span class="option-price">+$${option.price}</span>` : ''}
                </div>
              </label>
            `).join('')}
          </div>
          <div class="wizard-actions">
            ${stepIndex > 0 ? `<button class="btn btn-secondary wizard-prev">Previous</button>` : ''}
            <button class="btn btn-primary wizard-next">
              ${stepIndex === wizardSteps.length - 1 ? 'Review & Get Price' : 'Next'}
            </button>
          </div>
        </div>
      `;
      
      wizardBody.innerHTML = stepHTML;
      updateProgress(stepIndex);
    }
    
    // Update progress bar
    function updateProgress(stepIndex) {
      const progressPercent = (stepIndex / (wizardSteps.length - 1)) * 100;
      const progressFill = wizardContainer.querySelector('.progress-fill');
      
      if (progressFill) {
        progressFill.style.width = `${progressPercent}%`;
      }
      
      // Update step indicators
      const steps = wizardContainer.querySelectorAll('.progress-step');
      steps.forEach((step, index) => {
        step.classList.toggle('active', index <= stepIndex);
      });
    }
    
    // Event listeners
    function setupEventListeners() {
      // Next button
      wizardContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('wizard-next')) {
          const currentStepElement = document.querySelector('.wizard-step');
          const currentStepIndex = parseInt(currentStepElement.dataset.step);
          goToNextStep(currentStepIndex);
        }
        
        if (e.target.classList.contains('wizard-prev')) {
          const currentStepElement = document.querySelector('.wizard-step');
          const currentStepIndex = parseInt(currentStepElement.dataset.step);
          goToPrevStep(currentStepIndex);
        }
      });
    }
    
    // Go to next step
    function goToNextStep(currentStepIndex) {
      if (currentStepIndex < wizardSteps.length - 1) {
        renderCurrentStep(currentStepIndex + 1);
      } else {
        showSummary();
      }
    }
    
    // Go to previous step
    function goToPrevStep(currentStepIndex) {
      if (currentStepIndex > 0) {
        renderCurrentStep(currentStepIndex - 1);
      }
    }
    
    // Show summary
    function showSummary() {
      wizardContainer.querySelector('.wizard-body').innerHTML = `
        <div class="summary-container">
          <h3>Your CCTV Package Summary</h3>
          <div class="summary-details">
            <p>Thank you for using our CCTV Wizard! We'll review your selections and provide you with a customized quote.</p>
            <p>Our team will contact you within 24 hours to discuss your requirements and provide a detailed proposal.</p>
          </div>
          <div class="wizard-actions">
            <button class="btn btn-secondary wizard-edit">Edit Package</button>
            <a href="../contact.html" class="btn btn-primary">Contact Us for Quote</a>
          </div>
        </div>
      `;
      
      // Edit button
      wizardContainer.querySelector('.wizard-edit').addEventListener('click', function() {
        renderCurrentStep(0);
      });
    }
    
    // Initialize the wizard
    initWizard();
  }
}

// Utility functions
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Page transition handling
window.addEventListener('beforeunload', function() {
  document.body.classList.add('page-transition-out');
});

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', function() {
  // Add page transition class
  document.body.classList.add('page-transition');
  
  // Remove transition class after page loads
  setTimeout(() => {
    document.body.classList.remove('page-transition');
  }, 600);
});

// Testimonial filters functionality
function initTestimonialFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter testimonials
      testimonialCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });
}

// Statistics counter animation
function initStatisticsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  if (statNumbers.length === 0) return;
  
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    statNumbers.forEach(stat => {
      const count = parseInt(stat.getAttribute('data-count')) || 0;
      stat.textContent = count;
    });
    return;
  }
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count')) || 0;
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
  if (!element || target <= 0) return;
  
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}