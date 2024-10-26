document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(user => user.email === email)) {
            alert('El correo electrónico ya está registrado');
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso');
        window.location.href = 'login.html'; 
    });
});
