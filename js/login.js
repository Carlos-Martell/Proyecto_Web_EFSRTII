document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        
        console.log('Usuarios almacenados:', users);

        const user = users.find(user => user.email === email && user.password === password);

        
        console.log('Usuario encontrado:', user);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Inicio de sesión exitoso');
            window.location.href = 'index.html'; 
        } else {
            alert('Correo electrónico o contraseña incorrectos');
        }
    });
});
