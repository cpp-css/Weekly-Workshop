document.addEventListener('DOMContentLoaded', () => {
    const eyeIcons = document.querySelectorAll('.fa-eye');
    eyeIcons.forEach((eyeIcon) => {
        eyeIcon.style.display = 'none';
    });
});

function togglePasswordVisibility(element) {
    const inputBox = element.parentNode;

    const inputField = inputBox.querySelector('input');

    const visibleEye = inputBox.querySelector('.fa-eye');
    const invisibleEye = inputBox.querySelector('.fa-eye-slash');

    const computedStyleVisible = window.getComputedStyle(visibleEye);
    const computedStyleInvisible = window.getComputedStyle(invisibleEye);

    if (computedStyleVisible.display === 'none' || computedStyleInvisible.display === 'block') {
        // makes password visible
        visibleEye.style.display = 'block';
        invisibleEye.style.display = 'none';
        inputField.type = 'text';
    } else {
        // makes password hidden
        visibleEye.style.display = 'none';
        invisibleEye.style.display = 'block';
        inputField.type = 'password';
    }
}

function login() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    alert(`Attempting login with email: ${email} and password: ${password}!`);

    if (password.length < 8) {
        console.log('Password is too short');
    }
}