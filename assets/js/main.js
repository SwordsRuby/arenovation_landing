//accardion
function accardion(element) {
    const icon = element.querySelector('.accordion-icon');
    const text = element.querySelector('.product_text');

    icon.classList.toggle('rotate');
    text.classList.toggle('product-active');
}

//slider
const slides = document.querySelectorAll('.slide');
let activeSlide = 0;
let width = 0;
let flag = true;

function slider(factor) {
    flag = false;
    width = 0;
    document.querySelector('.state-slider').style.width = width + '%';
    slides[activeSlide].classList.remove('active');

    activeSlide += factor;

    if (activeSlide < 0) {
        activeSlide = slides.length - 1;
    } else if (activeSlide > slides.length - 1) {
        activeSlide = 0;
    }

    slides[activeSlide].classList.add('active');

    setTimeout(() => {
        flag = true;
    }, 2000);
    clearTimeout();
}

setInterval(() => {
    if (flag) {
        width += 0.04;
        document.querySelector('.state-slider').style.width = width + '%';
        if (width >= 100) {
            slider(1);
            width = 0;
        }
    }
}, 1);

//tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('.tab');

function tab(index) {
    tabs.forEach(element => {
        element.classList.remove('active');
    });
    tabBtns.forEach(element => {
        element.classList.remove('active');
    });

    tabBtns[index].classList.add('active');
    tabs[index].classList.add('active');
}

//burger
function burgerMenu() {
    const burgerButton = document.querySelectorAll('.burger-button');
    burgerButton[0].classList.toggle('burger-close');
    burgerButton[1].classList.toggle('burger-close');

    document.querySelector('.burger').classList.toggle('burger-none');
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function validateName(name) {
    return name.trim().length >= 2;
}

function showError(input, message) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');

    input.classList.remove('success');
    input.classList.add('error');
    errorMessage.textContent = message;
}

function showSuccess(input) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');

    input.classList.remove('error');
    input.classList.add('success');
    errorMessage.textContent = '';
}

function validateField(input) {
    const value = input.value.trim();
    const name = input.getAttribute('name');

    if (!value) {
        showError(input, 'Это поле обязательно для заполнения');
        return false;
    }

    switch (name) {
        case 'name':
            if (!validateName(value)) {
                showError(input, 'Имя должно содержать минимум 2 символа');
                return false;
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                showError(input, 'Введите корректный email адрес');
                return false;
            }
            break;
        case 'phone':
            if (!validatePhone(value)) {
                showError(input, 'Введите корректный номер телефона');
                return false;
            }
            break;
    }

    showSuccess(input);
    return true;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function handleFormSubmit(form, event) {
    event.preventDefault();

    if (validateForm(form)) {
        alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        form.reset();

        form.querySelectorAll('.input').forEach(input => {
            input.classList.remove('success', 'error');
            input.parentElement.querySelector('.error-message').textContent = '';
        });

        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(contactForm, e));

        const inputs = contactForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error') || input.classList.contains('success')) {
                    validateField(input);
                }
            });
        });
    }

    const modalForm = document.getElementById('modalForm');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => handleFormSubmit(modalForm, e));

        const modalInputs = modalForm.querySelectorAll('input[required]');
        modalInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error') || input.classList.contains('success')) {
                    validateField(input);
                }
            });
        });
    }
});
