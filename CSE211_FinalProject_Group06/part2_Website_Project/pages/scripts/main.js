/*
ID & Name: [ضع رقمك الجامعي واسمك هنا]
Course: CSE211 Web Programming
Assignment: Course Project
Date: 2023-06-01
Description: Main JavaScript file - Form validation, DOM manipulation, and event booking
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFormValidation();
    initDOMManipulation();
    initEventBooking();
    initBudgetCalculator();
});

/* ========== FORM VALIDATION ========== */
function initFormValidation() {
    // Registration Form Validation
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        const form = registrationForm.querySelector('form');
        if (form) {
            form.addEventListener('submit', validateRegistrationForm);
        }
    }

    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const form = loginForm.querySelector('form');
        if (form) {
            form.addEventListener('submit', validateLoginForm);
        }
    }
}

function validateRegistrationForm(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const terms = document.getElementById('terms');
    
    let isValid = true;
    let errorMessages = [];

    // Reset previous errors
    clearFormErrors();

    // Validate Full Name
    if (!fullname.value.trim()) {
        showFieldError(fullname, 'Full name is required');
        isValid = false;
    } else if (fullname.value.trim().length < 3) {
        showFieldError(fullname, 'Full name must be at least 3 characters');
        isValid = false;
    }

    // Validate Email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    if (!phone.value.trim()) {
        showFieldError(phone, 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone.value.trim())) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate Password
    if (!password.value) {
        showFieldError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showFieldError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else if (!isStrongPassword(password.value)) {
        showFieldError(password, 'Password must contain uppercase, lowercase, and number');
        isValid = false;
    }

    // Validate Confirm Password
    if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    // Validate Terms
    if (!terms.checked) {
        showFieldError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    }

    if (isValid) {
        showSuccessMessage('Registration successful! Redirecting...');
        form.submit();
    }
}

function validateLoginForm(e) {
    e.preventDefault();
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let isValid = true;

    // Reset previous errors
    clearFormErrors();

    // Validate Email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Password
    if (!password.value) {
        showFieldError(password, 'Password is required');
        isValid = false;
    }

    if (isValid) {
        showSuccessMessage('Login successful! Redirecting...');
        e.target.submit();
    }
}

/* ========== DOM MANIPULATION - DYNAMIC CONTENT AND EVENTS ========== */
function initDOMManipulation() {
    // Add hover effects to events table rows
    const eventsTable = document.getElementById('events-table');
    if (eventsTable) {
        addTableRowEffects(eventsTable);
    }

    // Add smooth scrolling to event details
    initSmoothScroll();

    // Add dynamic button effects
    addDynamicButtonEffects();

    // Initialize any dynamic content loaders
    initDynamicContentLoaders();
}

function addTableRowEffects(table) {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

function initSmoothScroll() {
    const detailLinks = document.querySelectorAll('a[href^="#"][href$="-details"]');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the target section temporarily
                targetElement.style.transition = 'background-color 0.5s ease';
                targetElement.style.backgroundColor = 'rgba(255, 71, 87, 0.1)';
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}

function addDynamicButtonEffects() {
    const buttons = document.querySelectorAll('.book-button, .submit-button, .calculate-button, button[type="button"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

function initDynamicContentLoaders() {
    // Add loading spinner for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Trigger load if already cached
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Add fade-in effect for sections
    const sections = document.querySelectorAll('main section, article section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

/* ========== EVENT BOOKING - BOOK NOW TO BUDGET CALCULATOR ========== */
function initEventBooking() {
    // Find all "Book Now" links and add click handlers
    const bookLinks = document.querySelectorAll('a[href="Budget_Calculator.html"]');
    
    bookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if this is a book-tickets-btn with data attributes
            if (this.classList.contains('book-tickets-btn')) {
                // Use data attributes for event info
                const eventType = this.getAttribute('data-event-type');
                const eventDate = this.getAttribute('data-event-date');
                
                // Find event details from parent section
                const detailsSection = this.closest('[id$="-details"]');
                if (detailsSection) {
                    const eventName = detailsSection.querySelector('h3').textContent
                        .replace(/[^\w\s]/g, '') // Remove emojis and special chars
                        .replace(/\s+/g, ' ')
                        .trim();
                    
                    const eventCost = detailsSection.querySelector('p:nth-of-type(4)')?.textContent
                        .replace('Ticket Price Range:', '')
                        .trim() || '';
                    
                    // Store event data in sessionStorage for budget calculator
                    const eventData = {
                        name: eventName,
                        date: eventDate,
                        type: eventType,
                        cost: eventCost
                    };
                    sessionStorage.setItem('selectedEvent', JSON.stringify(eventData));
                }
            } else {
                // Find the parent row to get event details (original table row logic)
                const row = this.closest('tr');
                if (row) {
                    const eventName = row.querySelector('td:first-child').textContent;
                    const eventDate = row.querySelector('td:nth-child(2)').textContent;
                    const eventCost = row.querySelector('td:nth-child(4)').textContent;
                    const eventType = getEventType(row);
                    
                    // Store event data in sessionStorage for budget calculator
                    const eventData = {
                        name: eventName,
                        date: eventDate,
                        type: eventType,
                        cost: eventCost
                    };
                    sessionStorage.setItem('selectedEvent', JSON.stringify(eventData));
                }
            }
            
            // Navigate to budget calculator
            window.location.href = 'Budget_Calculator.html';
        });
    });
}

function getEventType(row) {
    const typeCell = row.querySelector('td:nth-child(5)');
    if (typeCell) {
        const typeText = typeCell.textContent.toLowerCase();
        if (typeText.includes('music') || typeText.includes('concert')) {
            return 'concert';
        } else if (typeText.includes('sports')) {
            return 'sports';
        } else if (typeText.includes('theater') || typeText.includes('performing')) {
            return 'conference';
        } else if (typeText.includes('workshop')) {
            return 'workshop';
        } else if (typeText.includes('festival')) {
            return 'festival';
        }
    }
    return '';
}

/* ========== BUDGET CALCULATOR - PRE-FILL FROM EVENT BOOKING ========== */
function initBudgetCalculator() {
    const eventTypeSelect = document.getElementById('eventType');
    const eventDateInput = document.getElementById('eventDate');
    
    // Check if there's event data from sessionStorage
    const savedEvent = sessionStorage.getItem('selectedEvent');
    if (savedEvent) {
        const eventData = JSON.parse(savedEvent);
        
        // Pre-select the event type
        if (eventTypeSelect && eventData.type) {
            const options = eventTypeSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value === eventData.type) {
                    eventTypeSelect.value = eventData.type;
                }
            });
        }
        
        // Pre-fill the event date
        if (eventDateInput && eventData.date) {
            eventDateInput.value = convertToDateInputFormat(eventData.date);
            eventDateInput.style.borderColor = '#ff4757';
            eventDateInput.style.borderWidth = '2px';
            setTimeout(() => {
                eventDateInput.style.borderColor = '';
                eventDateInput.style.borderWidth = '';
            }, 2000);
        }
        
        // Add visual feedback for event type
        if (eventTypeSelect && eventData.type) {
            eventTypeSelect.style.borderColor = '#ff4757';
            eventTypeSelect.style.borderWidth = '2px';
            setTimeout(() => {
                eventTypeSelect.style.borderColor = '';
                eventTypeSelect.style.borderWidth = '';
            }, 2000);
        }
        
        // Clear the saved event after using it
        sessionStorage.removeItem('selectedEvent');
    }

    // Add calculate button functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBudget);
    }

    // Add reset button functionality
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }

    // Add proceed to payment button functionality
    const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener('click', showPaymentModal);
    }

    // Add modal close functionality
    const modal = document.getElementById('paymentModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', hidePaymentModal);
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                hidePaymentModal();
            }
        });
    }

    // Initialize planning page functionality
    initPlanningPage();
}

function convertToDateInputFormat(dateString) {
    // Convert "4 January 2026" to "2026-01-04"
    const months = {
        'january': '01', 'february': '02', 'march': '03', 'april': '04',
        'may': '05', 'june': '06', 'july': '07', 'august': '08',
        'september': '09', 'october': '10', 'november': '11', 'december': '12'
    };
    
    const parts = dateString.toLowerCase().split(' ');
    if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = months[parts[1]];
        const year = parts[2];
        if (month) {
            return `${year}-${month}-${day}`;
        }
    }
    return '';
}

function calculateBudget() {
    // Get form values
    const eventType = document.getElementById('eventType').value;
    const ticketType = document.getElementById('ticketType').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const groupSize = parseInt(document.getElementById('groupSize').value) || 1;
    const promoCode = parseFloat(document.getElementById('promoCode').value) || 0;
    const paymentFee = parseFloat(document.querySelector('input[name="payment"]:checked')?.value) || 0;
    
    // Get additional services
    const services = {
        photoPrint: document.querySelector('input[name="photoPrint"]')?.checked || false,
        seatReservation: document.getElementById('seatReservation')?.checked || false,
        parking: document.getElementById('parking')?.checked || false,
        shuttleBus: document.querySelector('input[name="shuttleBus"]')?.checked || false
    };
    
    // Calculate prices
    const ticketPrice = parseFloat(ticketType) || 0;
    let baseTotal = ticketPrice * quantity;
    
    // Calculate services
    let servicesTotal = 0;
    if (services.photoPrint) servicesTotal += 40;
    if (services.seatReservation) servicesTotal += 50;
    if (services.parking) servicesTotal += 100;
    if (services.shuttleBus) servicesTotal += 40;
    
    const servicesTotalWithQuantity = servicesTotal * quantity;
    
    // Calculate discounts
    let groupDiscount = 0;
    if (groupSize >= 5) {
        groupDiscount = baseTotal * 0.05;
    }
    
    const promoDiscount = (baseTotal + servicesTotalWithQuantity) * promoCode;
    
    // Calculate payment fee
    const subtotal = baseTotal + servicesTotalWithQuantity - groupDiscount - promoDiscount;
    const paymentAdjustment = subtotal * paymentFee;
    
    // Calculate tax and fees
    const tax = subtotal * 0.14;
    const processingFee = 15;
    
    // Final total
    const finalTotal = subtotal + tax + processingFee + paymentAdjustment;
    
    // Update display
    updateDisplay({
        ticketPrice,
        quantity,
        baseTotal,
        servicesTotal: servicesTotalWithQuantity,
        groupDiscount,
        promoDiscount,
        paymentAdjustment,
        tax,
        processingFee,
        finalTotal
    });
}

function updateDisplay(data) {
    document.getElementById('basePrice').textContent = `EGP ${data.ticketPrice.toFixed(2)}`;
    document.getElementById('ticketQuantity').textContent = data.quantity;
    document.getElementById('ticketSubtotal').textContent = `EGP ${data.baseTotal.toFixed(2)}`;
    document.getElementById('servicesTotal').textContent = `EGP ${data.servicesTotal.toFixed(2)}`;
    document.getElementById('groupDiscount').textContent = `-EGP ${data.groupDiscount.toFixed(2)}`;
    document.getElementById('promoDiscount').textContent = `-EGP ${data.promoDiscount.toFixed(2)}`;
    document.getElementById('paymentAdjustment').textContent = data.paymentAdjustment >= 0 
        ? `+EGP ${data.paymentAdjustment.toFixed(2)}` 
        : `-EGP ${Math.abs(data.paymentAdjustment).toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `EGP ${data.tax.toFixed(2)}`;
    document.getElementById('finalTotal').innerHTML = `<strong>EGP ${data.finalTotal.toFixed(2)}</strong>`;
    
    // Update summary table
    document.getElementById('summaryQuantity').textContent = data.quantity;
    document.getElementById('unitPrice').textContent = `EGP ${data.ticketPrice.toFixed(2)}`;
    document.getElementById('itemTotal').textContent = `EGP ${data.baseTotal.toFixed(2)}`;
    document.getElementById('summaryServices').textContent = `EGP ${data.servicesTotal.toFixed(2)}`;
    document.getElementById('summaryFees').textContent = `EGP ${(data.tax + data.processingFee + data.paymentAdjustment).toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `EGP ${data.finalTotal.toFixed(2)}`;
}

function resetCalculator() {
    // Reset all display values
    document.getElementById('basePrice').textContent = 'EGP 0.00';
    document.getElementById('ticketQuantity').textContent = '0';
    document.getElementById('ticketSubtotal').textContent = 'EGP 0.00';
    document.getElementById('servicesTotal').textContent = 'EGP 0.00';
    document.getElementById('groupDiscount').textContent = 'EGP 0.00';
    document.getElementById('promoDiscount').textContent = 'EGP 0.00';
    document.getElementById('paymentAdjustment').textContent = 'EGP 0.00';
    document.getElementById('taxAmount').textContent = 'EGP 0.00';
    document.getElementById('finalTotal').innerHTML = '<strong>EGP 0.00</strong>';

    document.getElementById('summaryQuantity').textContent = '0';
    document.getElementById('unitPrice').textContent = 'EGP 0.00';
    document.getElementById('itemTotal').textContent = 'EGP 0.00';
    document.getElementById('summaryServices').textContent = 'EGP 0.00';
    document.getElementById('summaryFees').textContent = 'EGP 0.00';
    document.getElementById('grandTotal').textContent = 'EGP 0.00';
}

function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function hidePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/* ========== PLANNING PAGE - EVENT REQUEST FORM ========== */
function initPlanningPage() {
    const planningForm = document.getElementById('eventPlanningForm');
    if (planningForm) {
        planningForm.addEventListener('submit', handlePlanningFormSubmit);
    }

    // Handle venue selection toggle for custom venue input
    const venueOptions = document.querySelectorAll('input[name="venue"]');
    const customVenueLabel = document.getElementById('customVenueLabel');
    
    if (venueOptions.length > 0 && customVenueLabel) {
        venueOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'other') {
                    customVenueLabel.style.display = 'block';
                } else {
                    customVenueLabel.style.display = 'none';
                }
            });
        });
    }

    // Initialize planning success modal
    const planningModal = document.getElementById('planningSuccessModal');
    if (planningModal) {
        const closeBtn = planningModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                planningModal.style.display = 'none';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === planningModal) {
                planningModal.style.display = 'none';
            }
        });
    }
}

function handlePlanningFormSubmit(e) {
    e.preventDefault();
    
    const requesterEmail = document.getElementById('requesterEmail');
    
    if (requesterEmail) {
        const emailSpan = document.getElementById('contactEmail');
        if (emailSpan) {
            emailSpan.textContent = requesterEmail.value;
        }
    }

    // Show success modal
    const modal = document.getElementById('planningSuccessModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

/* ========== UTILITY FUNCTIONS ========== */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function isStrongPassword(password) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpper && hasLower && hasNumber;
}

function showFieldError(field, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    // Add error class to field
    field.classList.add('error');
    field.style.borderColor = '#ff4757';
    
    // Insert error message after field
    const parent = field.closest('.form-group') || field.parentElement;
    const existingError = parent.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    parent.appendChild(errorDiv);
}

function clearFormErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
}

function showSuccessMessage(message) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999; animation: slideIn 0.3s ease;';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 2000);
}

/* ========== ANIMATION STYLES ========== */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);
initSearchFunctionality();

//dareen
/* ========== SEARCH FUNCTIONALITY ========== */
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (!searchInput || !searchButton) return;
    
    // Create autocomplete suggestions dropdown - positioned below search bar
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'search-suggestions';
    suggestionsContainer.style.cssText = `
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        background: white;
        border: 2px solid #ff4757;
        border-top: none;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        display: none;
        left: 0;
    `;
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.style.zIndex = '100';
    searchInput.parentElement.appendChild(suggestionsContainer);
    
    // Define all pages for search
    const allPages = [
        { name: 'Amr Diab Concert', id: 'amr-diab-row', page: 'Event.html', isEvent: true },
        { name: 'Al Ahly vs Zamalek Match', id: 'ahly-zamalek-row', page: 'Event.html', isEvent: true },
        { name: 'Elissa Concert', id: 'elissa-row', page: 'Event.html', isEvent: true },
        { name: 'Cairokee Concert', id: 'cairokee-row', page: 'Event.html', isEvent: true },
        { name: 'Omar Khairat Concert', id: 'omar-khairat-row', page: 'Event.html', isEvent: true },
        { name: 'Budget Calculator', page: 'Budget_Calculator.html', isEvent: false },
        { name: 'Registration', page: 'Registration.html', isEvent: false },
        { name: 'Contact Us', page: 'Contact.html', isEvent: false },
        { name: 'About Us', page: 'About.html', isEvent: false },
        { name: 'Plan Event', page: 'Planning.html', isEvent: false },
        { name: 'Login', page: 'Login.html', isEvent: false }
    ];
    
    // Helper function to get current page name
    function getCurrentPageName() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        // Remove hash for page name detection
        const cleanPath = path.split('#')[0];
        const parts = cleanPath.split('/');
        return parts[parts.length - 1];
    }
    
    // Helper function to scroll to event row
    function scrollToEventRow(eventId) {
        const targetElement = document.getElementById(eventId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            // Highlight effect
            targetElement.style.transition = 'background-color 0.5s ease';
            const originalBg = targetElement.style.backgroundColor;
            targetElement.style.backgroundColor = 'rgba(255, 71, 87, 0.2)';
            setTimeout(() => {
                targetElement.style.backgroundColor = originalBg || '';
            }, 2000);
        }
    }
    
    // Helper function to navigate to page
    function navigateToPage(pageName, eventId) {
        // Build correct path from current location
        const currentPage = getCurrentPageName();
        
        // Check if we're already on the target page
        if (currentPage === pageName) {
            // Already on the page
            if (eventId) {
                scrollToEventRow(eventId);
            }
            return;
        }
        
        // Determine the correct path to navigate to
        let targetPath;
        if (currentPage === 'index.html' || currentPage === '') {
            // From root, use pages/filename
            targetPath = 'pages/' + pageName;
        } else if (currentPage.includes('.html')) {
            // From another page in pages/ folder, just use filename
            targetPath = pageName;
        } else {
            // Default to pages/filename
            targetPath = 'pages/' + pageName;
        }
        
        // Add hash if eventId provided
        if (eventId) {
            targetPath += '#' + eventId;
        }
        
        window.location.href = targetPath;
    }
    
    // Show suggestions on input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // Filter pages based on query
        const filteredPages = allPages.filter(page => 
            page.name.toLowerCase().includes(query)
        );
        
        if (filteredPages.length === 0) {
            suggestionsContainer.innerHTML = '<div style="padding: 15px; color: #666;">No results found</div>';
            suggestionsContainer.style.display = 'block';
            return;
        }
        
        // Create suggestion items
        suggestionsContainer.innerHTML = filteredPages.map(page => `
            <div class="search-suggestion-item" 
                 data-page="${page.page}"
                 data-id="${page.id || ''}"
                 style="
                    padding: 14px 20px;
                    cursor: pointer;
                    border-bottom: 1px solid #eee;
                    transition: all 0.2s ease;
                    color: #333;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                 "
                 onmouseenter="this.style.backgroundColor='#fff0f0'"
                 onmouseleave="this.style.backgroundColor='white'"
            >
                <span style="font-size: 1.1em;">${highlightMatch(page.name, query)}</span>
                <span style="margin-left: auto; color: #999; font-size: 0.85em;">${page.id ? 'Scroll to event' : 'Go to page'}</span>
            </div>
        `).join('');
        
        suggestionsContainer.style.display = 'block';
        
        // Add click handlers to suggestion items
        const suggestionItems = suggestionsContainer.querySelectorAll('.search-suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                const pageName = this.getAttribute('data-page');
                const eventId = this.getAttribute('data-id');
                const pageNameDisplay = this.querySelector('span').textContent;
                
                searchInput.value = pageNameDisplay;
                suggestionsContainer.style.display = 'none';
                
                navigateToPage(pageName, eventId);
            });
        });
    });
    
    // Highlight matching text
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return text.replace(regex, '<strong style="color: #ff4757;">$1</strong>');
    }
    
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Search button click handler
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query.length === 0) return;
        
        const matchedPage = allPages.find(page => 
            page.name.toLowerCase().includes(query)
        );
        
        if (matchedPage) {
            navigateToPage(matchedPage.page, matchedPage.id || '');
        } else {
            // Default to events page
            navigateToPage('Event.html', '');
        }
    });
    
    // Enter key handler
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Focus on input shows all pages
    searchInput.addEventListener('focus', function() {
        if (this.value.trim().length === 0) {
            suggestionsContainer.innerHTML = allPages.map(page => `
                <div class="search-suggestion-item" 
                     data-page="${page.page}"
                     data-id="${page.id || ''}"
                     style="
                        padding: 14px 20px;
                        cursor: pointer;
                        border-bottom: 1px solid #eee;
                        transition: all 0.2s ease;
                        color: #333;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                     "
                     onmouseenter="this.style.backgroundColor='#fff0f0'"
                     onmouseleave="this.style.backgroundColor='white'"
                >
                    <span style="font-size: 1.1em;">${page.name}</span>
                    <span style="margin-left: auto; color: #999; font-size: 0.85em;">${page.id ? 'Scroll to event' : 'Go to page'}</span>
                </div>
            `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            const suggestionItems = suggestionsContainer.querySelectorAll('.search-suggestion-item');
            suggestionItems.forEach(item => {
                item.addEventListener('click', function() {
                    const pageName = this.getAttribute('data-page');
                    const eventId = this.getAttribute('data-id');
                    
                    searchInput.value = this.querySelector('span').textContent;
                    suggestionsContainer.style.display = 'none';
                    
                    navigateToPage(pageName, eventId);
                });
            });
        }
    });
}

