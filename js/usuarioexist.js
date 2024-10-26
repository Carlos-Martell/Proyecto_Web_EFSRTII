document.addEventListener("DOMContentLoaded", function () {
  const authButtonsContainer = document.getElementById("auth-buttons");
  const profileNavItem = document.getElementById("profile-nav-item");
  const createArtNavItem = document.getElementById("create-art-nav-item");

  function actualizarBotones() {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      authButtonsContainer.innerHTML = `
                <button id="logout-button" class="btn btn-outline-light me-2">Logout</button>
            `;
      document
        .getElementById("logout-button")
        .addEventListener("click", handleLogout);

      profileNavItem.style.display = "block";
      createArtNavItem.style.display = "block";
    } else {
      authButtonsContainer.innerHTML = `
                <a href="login.html" class="btn btn-outline-light me-2" id="login-button">Login</a>
                <a href="signin.html" class="btn btn-primary" id="register-button">Registrarse</a>
            `;

      profileNavItem.style.display = "none";
      createArtNavItem.style.display = "none";
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  }

  actualizarBotones();
});
