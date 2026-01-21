// ============================================
// Main JavaScript for MFM CAASO Youth Church Website
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');

      // Change icon based on menu state
      const icon = mobileMenuBtn.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        // Check if icon exists before manipulating
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ============================================
  // Form Submission (Testimony)
  // ============================================
  const testimonyForm = document.getElementById('testimonyForm');
  if (testimonyForm) {
    testimonyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const testimony = document.getElementById('testimony').value;

      // Validate form
      if (!name || !email || !testimony) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      // In a real application, you would send this data to a server
      // For now, we'll just show a confirmation message
      showAlert(`Thank you, ${name}! Your testimony has been submitted. We appreciate you sharing what God has done in your life.`, 'success');

      // Reset form
      testimonyForm.reset();
    });
  }

  // ============================================
  // Contact Form Submission
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;

      if (!name || !email || !message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      showAlert(`Message sent! Thanks for reaching out, ${name}. We will get back to you shortly.`, 'success');
      contactForm.reset();
    });
  }

  // ============================================
  // Scroll Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ============================================
  // Active Navigation Link on Scroll
  // ============================================
  const sections = document.querySelectorAll('section[id]');

  // Function to update active nav link
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all links first
          document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateActiveNavLink);

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  // ============================================
  // Utility Functions
  // ============================================

  // Show alert message
  function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
      existingAlert.remove();
    }

    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = `custom-alert alert-${type}`;
    alertEl.innerHTML = `
      <span>${message}</span>
      <button class="alert-close">&times;</button>
    `;

    // Add styles for alert
    const alertStyles = `
      .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
      }
      .alert-success {
        background: #10b981;
      }
      .alert-error {
        background: #ef4444;
      }
      .alert-info {
        background: #3b82f6;
      }
      .alert-close {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
        line-height: 1;
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;

    // Add styles if not already added
    if (!document.querySelector('#alert-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'alert-styles';
      styleEl.textContent = alertStyles;
      document.head.appendChild(styleEl);
    }

    // Add to document
    document.body.appendChild(alertEl);

    // Close button functionality
    alertEl.querySelector('.alert-close').addEventListener('click', () => {
      alertEl.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => {
        alertEl.remove();
      }, 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alertEl.parentNode) {
        alertEl.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
          alertEl.remove();
        }, 300);
      }
    }, 5000);
  }

  // ============================================
  // Initialize on page load
  // ============================================
  updateActiveNavLink(); // Set initial active nav link

  // Add loading animation for page elements
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Add CSS for loading state
  const loadingStyles = `
    body:not(.loaded) .animate-on-scroll {
      opacity: 0;
    }
    body.loaded .animate-on-scroll {
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = loadingStyles;
  document.head.appendChild(styleEl);
});