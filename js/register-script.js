// Form submission
function submitForm(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.submit-btn');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Submitting...';
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    fetch('https://script.google.com/macros/s/AKfycbxBqVPcvNBb3vvytGtisLxeZL2-js3D-bdrhkhjAuQvFTCuVQ_xQJIo4Z5G9Wf54KssaQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        showSuccessMessage();
        event.target.reset();
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });
}

// Success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'message success-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <h3>Registration Successful!</h3>
            <p>Your team has been registered successfully.</p>
            <p>You will receive a confirmation email shortly.</p>
        </div>
    `;
    showMessage(message);
}

// Error message
function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'message error-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Registration Failed</h3>
            <p>There was an error submitting your registration.</p>
            <p>Please try again or contact support.</p>
        </div>
    `;
    showMessage(message);
}

function showMessage(messageElement) {
    document.body.appendChild(messageElement);
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Phone number validation
    const phoneInput = document.querySelector('input[name="leader_phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let phone = e.target.value.replace(/\D/g, '');
            if (phone.length > 11) phone = phone.slice(0, 11);
            e.target.value = phone;
        });
    }

    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    // Category select enhancement
    const categorySelect = document.querySelector('.category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            this.style.borderColor = '#EC008C';
            const selectedOption = this.options[this.selectedIndex];
            const categoryClass = selectedOption.className.split(' ')[1];
            this.className = `category-select ${categoryClass}`;
        });
    }

    // Form animation
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Email validation helper
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form field animations
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading animation to form submission
const form = document.getElementById('registrationForm');
form.addEventListener('submit', function() {
    this.classList.add('submitting');
});

// Smooth scroll to form sections
document.querySelectorAll('.form-section').forEach(section => {
    section.addEventListener('click', function() {
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
