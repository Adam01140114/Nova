// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Create and append the inquiry form popup to the body
    const popupHTML = `
        <div id="inquiry-popup" class="popup-container">
            <div class="popup-content">
                <span class="close-popup">&times;</span>
                <h3>Service Inquiry</h3>
                <form id="inquiry-form">
                    <input type="hidden" id="service-name" name="service-name" value="">
                    <div class="form-group">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" name="full-name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="request-details">Request Details</label>
                        <textarea id="request-details" name="request-details" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Get the popup elements
    const inquiryPopup = document.getElementById('inquiry-popup');
    const closePopup = document.querySelector('.close-popup');
    const inquiryForm = document.getElementById('inquiry-form');
    const serviceNameInput = document.getElementById('service-name');
    
    // Get all "Get Started" buttons
    const getStartedButtons = document.querySelectorAll('.service-item .btn-secondary');
    
    // Add click event to all "Get Started" buttons
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Get the service name from the button's parent element
            const serviceItem = this.closest('.service-item');
            const serviceName = serviceItem.querySelector('h3').textContent;
            
            // Set the service name in the hidden input
            serviceNameInput.value = serviceName;
            
            // Show the popup
            inquiryPopup.style.display = 'flex';
        });
    });
    
    // Close the popup when clicking the close button
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            inquiryPopup.style.display = 'none';
        });
    }
    
    // Close the popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === inquiryPopup) {
            inquiryPopup.style.display = 'none';
        }
    });
    
    // Handle form submission
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const serviceName = serviceNameInput.value;
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const requestDetails = document.getElementById('request-details').value;
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // First, try to send via EmailJS
            sendViaEmailJS();
            
            function sendViaEmailJS() {
                // Check if EmailJS is available
                if (typeof emailjs !== 'undefined') {
                    // Prepare email parameters
                    const templateParams = {
                        to_email: 'adamchaabane1234@gmail.com',
                        from_name: fullName,
                        from_email: email,
                        service_name: serviceName,
                        message: requestDetails
                    };
                    
                    // Send email using EmailJS
                    emailjs.send('service_n2pvmwh', 'template_wa6i8jg', templateParams)
                        .then(function(response) {
                            console.log('Email sent successfully!', response.status, response.text);
                            showThankYouMessage();
                        })
                        .catch(function(error) {
                            console.error('EmailJS sending failed:', error);
                            // Try PHP fallback
                            sendViaPHP();
                        });
                } else {
                    // EmailJS not available, try PHP
                    sendViaPHP();
                }
            }
            
            function sendViaPHP() {
                // Create form data object to send to server
                const formData = new FormData();
                formData.append('service-name', serviceName);
                formData.append('full-name', fullName);
                formData.append('email', email);
                formData.append('request-details', requestDetails);
                
                // Send using XMLHttpRequest
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'send-email.php', true);
                
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                showThankYouMessage();
                            } else {
                                showError("Server error: " + response.message);
                            }
                        } catch(e) {
                            showError("Invalid server response");
                        }
                    } else {
                        showError("Request failed. Status: " + xhr.status);
                    }
                };
                
                xhr.onerror = function() {
                    showError("Network error occurred");
                };
                
                xhr.send(formData);
            }
            
            function showThankYouMessage() {
                // Display thank you message
                inquiryPopup.innerHTML = `
                    <div class="popup-content thank-you">
                        <h3>Thank You!</h3>
                        <p>Thank you for your request, we will email you soon.</p>
                        <button class="btn btn-primary close-thank-you">Close</button>
                    </div>
                `;
                
                // Add event listener to the close button
                const closeThankYou = document.querySelector('.close-thank-you');
                if (closeThankYou) {
                    closeThankYou.addEventListener('click', function() {
                        inquiryPopup.style.display = 'none';
                        // Reset the popup after it's hidden
                        setTimeout(() => {
                            window.location.reload();
                        }, 300);
                    });
                }
            }
            
            function showError(errorMessage) {
                console.error(errorMessage);
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Show error message
                alert('Sorry, there was an issue sending your request. Please try again later.');
            }
        });
    }

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
                
                // Toggle the + and - sign
                const toggle = this.querySelector('.faq-toggle');
                if (toggle) {
                    toggle.textContent = faqItem.classList.contains('active') ? '−' : '+';
                }
            });
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Form validation can be added here if needed
            // For now, the form will use the native mailto: functionality
            
            // Optional: Show a success message or redirect
            // This would be replaced with actual form handling in a production environment
            // event.preventDefault();
            // alert('Thank you for your message! We will get back to you soon.');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add back to top button styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            font-size: 24px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 99;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-3px);
            background-color: var(--dark-color);
        }
        
        /* Popup Styles */
        .popup-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .popup-content {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .close-popup {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #555;
        }
        
        .close-popup:hover {
            color: var(--primary-color);
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
        }
        
        .thank-you {
            text-align: center;
        }
        
        .thank-you p {
            margin: 1.5rem 0;
        }
    `;
    document.head.appendChild(style);

    // Image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add some subtle scroll animations
window.addEventListener('scroll', function() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
}); 