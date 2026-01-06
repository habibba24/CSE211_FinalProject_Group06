/*
ID & Name: [ضع رقمك الجامعي واسمك هنا]
Course: CSE211 Web Programming
Assignment: Course Project - Bonus Feature
Description: JavaScript file to handle AJAX calls to PHP processors
*/

document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scroll to hash on page load
    handleHashScroll();
    
    // Load events from database via AJAX
    loadEventsFromDatabase();
    
    // Handle registration form submission via AJAX
    const registrationForm = document.querySelector('#registration-form form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
    
    // Handle login form submission via AJAX
    const loginForm = document.querySelector('#login-form form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Initialize search functionality
    initSearchFunctionality();
});

// Handle smooth scroll to hash on page load
function handleHashScroll() {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1); // Remove the # symbol
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Add a small delay to ensure page is fully loaded
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the target element
                targetElement.style.transition = 'background-color 0.5s ease';
                targetElement.style.backgroundColor = 'rgba(255, 71, 87, 0.15)';
                
                // Remove highlight after 2 seconds
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 2000);
            }, 100);
        }
    }
}

// Load events from database
function loadEventsFromDatabase() {
    fetch('get_events.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.events.length > 0) {
                displayEventsFromDatabase(data.events);
            }
        })
        .catch(error => {
            console.log('Using static events data');
        });
}

// Display events from database in the table
function displayEventsFromDatabase(events) {
    const tbody = document.querySelector('#events-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = ''; // Clear existing content
    
    events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="event-name">${event.event_name}</td>
            <td class="event-date">${event.event_date}</td>
            <td class="event-location">${event.location}</td>
            <td class="event-cost">${event.cost_min} - ${event.cost_max} EGP</td>
            <td>${event.event_type}</td>
            <td><a href="#${event.id}-details">View Details</a></td>
            <td><a href="Budget_Calculator.html" class="book-button">Book Now</a></td>
        `;
        tbody.appendChild(row);
    });
    
    // Re-initialize event booking
    initEventBooking();
}

// Handle registration form submission
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch('register_process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(data.message);
            setTimeout(() => {
                window.location.href = 'Thank.html';
            }, 1500);
        } else {
            if (data.errors && data.errors.length > 0) {
                clearFormErrors();
                data.errors.forEach(error => {
                    showFieldErrorByMessage(error);
                });
            } else {
                showErrorMessage(data.message);
            }
        }
    })
    .catch(error => {
        showErrorMessage('An error occurred. Please try again.');
    });
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch('login_process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(data.message);
            setTimeout(() => {
                window.location.href = 'Event.html';
            }, 1500);
        } else {
            showErrorMessage(data.message);
        }
    })
    .catch(error => {
        showErrorMessage('An error occurred. Please try again.');
    });
}

// Show error message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ff4757; color: white; padding: 15px 25px; border-radius: 5px; z-index: 9999;';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 3000);
}

// Show field error by message
function showFieldErrorByMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: #ff4757; font-size: 0.85rem; margin-top: 5px;';
    errorDiv.textContent = message;
    
    // Find the first input and show error
    const inputs = document.querySelectorAll('.form-input');
    if (inputs.length > 0) {
        const parent = inputs[0].closest('.form-group');
        if (parent) {
            parent.appendChild(errorDiv);
        }
    }
}
