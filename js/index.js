document.addEventListener("DOMContentLoaded", function () {

    console.log("¡Bienvenido a la Galería de Arte Digital!");


    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const name = document.getElementById("contact-name").value;
            const email = document.getElementById("contact-email").value;
            const message = document.getElementById("contact-message").value;

            if (!name || !email || !message) {
                alert("Todos los campos son obligatorios.");
                event.preventDefault();
            } else {
                alert("Mensaje enviado con éxito.");
            }
        });
    };


});
