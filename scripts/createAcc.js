const loginContainer = document.querySelector('.login-container');

document.addEventListener('DOMContentLoaded', () => {
    const eyeIcons = document.querySelectorAll('.fa-eye');
    eyeIcons.forEach((eyeIcon) => {
        eyeIcon.style.display = 'none';
    });
});

document.addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {

        const inputBox = event.target.parentNode;
        const inputField = inputBox.querySelector('input');
        const visibleEye = inputBox.querySelector('.fa-eye');
        const invisibleEye = inputBox.querySelector('.fa-eye-slash');

        if (event.target.classList.contains('fa-eye')) {
            // makes password hidden
            visibleEye.style.display = 'none';
            invisibleEye.style.display = 'block';
            inputField.type = 'password';
        } else {
            // makes password visible
            visibleEye.style.display = 'block';
            invisibleEye.style.display = 'none';
            inputField.type = 'text';
        }
    }
})

function createAccount() {
    alert('Creating Acc!');
}