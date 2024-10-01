const form = document.querySelector('form');

function formValidaton(event) {
    event.preventDefault();

    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const subject = document.querySelector('input[name="subject"]')
    const message = document.querySelector('textarea');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    let isValid = true;

    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        input.classList.add('invalid');
    }

    function clearError(input) {
        const errorSpan = input.nextElementSibling; 
        errorSpan.textContent = '';
        input.classList.remove('invalid');
    }

    if (name.value.trim() === "" || name.value.length < 3) {
        showError(name, "Please enter name longer than 3 lettters");
        isValid = false;
    } else {
        clearError(name);
    }

    if (!emailPattern.test(email.value)) {
        showError(email, "Please enter a valid email");
        isValid = false;
    } else {
        clearError(email)
    }

    if (subject.value.trim() === '' || subject.value.length < 5) {
        showError(subject, "Please enter a message at least 5 characters long")
        isValid = false;
    } else {
        clearError(subject)
    }

    if (message.value.trim() === "" || message.value.length < 10) {
        showError(message, "Please enter a message at least 10 characters long")
        isValid = false;
    } else {
        clearError(message);
    }

    if (isValid) {
        return isValid;
    }
}

function realTimeValidation() {
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', formValidaton)
    })
}

form.addEventListener('submit', () => {
    formValidaton(); 
    if (isValid) {
        form.submit();
    }
 })

realTimeValidation();

function toggleMenu() {
    const header = document.querySelector('header');
    const menu = document.getElementById('burger-menu');
    menu.classList.toggle('active');

    if ( header.style.left === '0px') {
         header.style.left = '-300px'
    } else {
         header.style.left = '0px'
         
    }
}