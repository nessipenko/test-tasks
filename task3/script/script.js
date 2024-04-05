document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    const btn = document.querySelector('#btn');

    form.addEventListener('input', validateInput);

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', addFocusStyle);
        input.addEventListener('blur', removeFocusStyle);
    });

    function validateInput(e) {
        const target = e.target;
        const inputName = target.getAttribute('name');
        const value = target.value.trim();
        const error = document.querySelector(`#${inputName}-error`);

        switch (inputName) {
            case 'firstName':
            case 'lastName':
                validateName(inputName, value, error, target);
                break;
            case 'email':
                validateEmail(value, error, target);
                break;
            case 'password':
                validatePassword(value, error, target);
                break;
            case 'confirmPassword':
                validateConfirmPassword(value, error, target);
                break;
            case 'dob':
                validateDOB(value, error, target);
                break;
            default:
                break;
        }

        updateButtonState();
    }

    function validateName(inputName, value, error, target) {
        if (value === '') {
            clearErrorAndShadow(error, target);
        } else if (/^[a-zA-Zа-яА-Я]{1,15}$/.test(value)) {
            clearErrorAndShadow(error, target, '#0f766e');
        } else {
            showErrorAndShadow(error, target, 'Can only contain letters and must be no longer than 15 char.');
            target.style.boxShadow = '0 0 5px #dc2626';
        }
    }

    function validateEmail(value, error, target) {
        if (value === '') {
            clearErrorAndShadow(error, target);
        } else if (isValidEmail(value)) {
            clearErrorAndShadow(error, target, '#0f766e');
        } else {
            showErrorAndShadow(error, target, 'Please enter a valid email');
            target.style.boxShadow = '0 0 5px #dc2626';
        }
    }

    function validatePassword(value, error, target) {
        if (value === '') {
            clearErrorAndShadow(error, target);
            return;
        }

        let errorMessage = '';

        if (value.length < 8) {
            errorMessage = 'Password must be at least 8 characters long.';
        } else {
            if (!/[A-Z]/.test(value)) {
                errorMessage += 'Must contain an uppercase letter. ';
            }
            if (!/\d/.test(value)) {
                errorMessage += 'Must contain a digit. ';
            }
            if (!/[!@#$%^&*()_+}{":;'?/>.<,]/.test(value)) {
                errorMessage += 'Must contain a special char. ';
            }
        }

        if (errorMessage === '') {
            clearErrorAndShadow(error, target, '#0f766e');
        } else {
            showErrorAndShadow(error, target, errorMessage);
            target.style.boxShadow = '0 0 5px #dc2626';
        }
    }

    function validateConfirmPassword(value, error, target) {
        const passValue = document.querySelector('#password').value;
        if (value === passValue) {
            clearErrorAndShadow(error, target, '#0f766e');
        } else {
            showErrorAndShadow(error, target, 'Passwords do not match');
            target.style.boxShadow = '0 0 5px #dc2626';
        }
    }

    function validateDOB(value, error, target) {
        if (value === '') {
            clearErrorAndShadow(error, target);
            return;
        }

        if (isValidDOB(value)) {
            clearErrorAndShadow(error, target, '#0f766e');
        } else {
            showErrorAndShadow(error, target, 'You must be over 18');
            target.style.boxShadow = '0 0 5px #dc2626';
        }
    }


    function addFocusStyle() {
        this.style.boxShadow = '0 0 5px #075985';
    }

    function removeFocusStyle() {
        const input = this;
        const value = input.value.trim();
        const error = input.parentElement.querySelector('.error');
        if (value !== '' && error.textContent === '') {
            input.style.boxShadow = '0 0 5px #0f766e';
        } else {
            input.style.boxShadow = '0 0 5px #dc2626';
        }
    }

    function clearErrorAndShadow(error, target, shadowColor) {
        error.textContent = '';
        target.style.boxShadow = shadowColor ? `0 0 5px ${shadowColor}` : '';
    }

    function showErrorAndShadow(error, target, errorMessage) {
        error.textContent = errorMessage;
        target.style.boxShadow = '0 0 5px #dc2626';
    }

    function updateButtonState() {
        const errors = form.querySelectorAll('.error');
        let hasError = false;
        errors.forEach(error => {
            if (error.textContent !== '') {
                hasError = true;
            }
        });
        if (!hasError && form.querySelectorAll('input:invalid').length === 0) {
            btn.removeAttribute('disabled');
        } else {
            btn.setAttribute('disabled', 'disabled');
        }
    }
});

function togglePasswordVisibility(inputId) {
    const passwordInput = document.querySelector("#" + inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\w\d]).{8,}$/;
    return passwordRegex.test(password);
}

const isValidDOB = (dob) => {
    const currentDate = new Date();
    const userDOB = new Date(dob);
    const ageDiff = currentDate.getFullYear() - userDOB.getFullYear();
    return ageDiff >= 18;
}

