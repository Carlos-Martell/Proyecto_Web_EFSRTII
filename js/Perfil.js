document.addEventListener("DOMContentLoaded", function () {
    loadProfile();
    const profileForm = document.getElementById("custom-profile-form");
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();
        saveProfile();
    });

    const profileImageInput = document.getElementById("custom-profileImage");
    profileImageInput.addEventListener("change", updateProfileImage);

    displayRecentActivity();
    loadFavoriteArts();
});

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem("profile")) || {
        username: "Usuario",
        fullname: "Nombre",
        email: "correo",
        profileImage: "https://via.placeholder.com/150"
    };

    document.getElementById("custom-username").value = profile.username;
    document.getElementById("custom-fullname").value = profile.fullname;
    document.getElementById("custom-email").value = profile.email;
    document.getElementById("custom-profile-image").src = profile.profileImage;
}

function saveProfile() {
    const profile = {
        username: document.getElementById("custom-username").value,
        fullname: document.getElementById("custom-fullname").value,
        email: document.getElementById("custom-email").value,
        profileImage: document.getElementById("custom-profile-image").src
    };

    localStorage.setItem("profile", JSON.stringify(profile));
    showNotification("Perfil actualizado con éxito.");
    addActivity("Ha actualizado su perfil.");
}

function updateProfileImage(event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const profileImage = document.getElementById("custom-profile-image");
        profileImage.src = e.target.result;
        saveProfileImage(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
}

function saveProfileImage(imageSrc) {
    const profile = JSON.parse(localStorage.getItem("profile")) || {};
    profile.profileImage = imageSrc;
    localStorage.setItem("profile", JSON.stringify(profile));
    addActivity("Ha cambiado su imagen de perfil.");
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "alert alert-success position-fixed top-0 end-0 mt-3 me-3";
    notification.style.zIndex = 1051; 
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function addActivity(activity) {
    const activityList = JSON.parse(localStorage.getItem("recentActivity")) || [];
    activityList.unshift(activity);
    localStorage.setItem("recentActivity", JSON.stringify(activityList));
    displayRecentActivity();
}

function displayRecentActivity() {
    const activityList = JSON.parse(localStorage.getItem("recentActivity")) || [];
    const activityContainer = document.getElementById("custom-recent-activity");
    activityContainer.innerHTML = "";
    activityList.forEach(activity => {
        const newActivity = document.createElement("li");
        newActivity.className = "list-group-item";
        newActivity.textContent = activity;
        activityContainer.appendChild(newActivity);
    });
}

function loadFavoriteArts() {
    const favoriteArts = JSON.parse(localStorage.getItem("favoriteArts")) || [];
    const favoriteArtworksContainer = document.getElementById("custom-favorite-artworks");

    favoriteArts.forEach(art => {
        const artCard = document.createElement("div");
        artCard.className = "col-md-4 mb-4";
        artCard.innerHTML = `
            <div class="card">
                <img src="${art.image}" class="card-img-top" alt="${art.title}">
                <div class="card-body">
                    <h6 class="card-title">${art.title}</h6>
                    <p class="card-text">${art.description}</p>
                    <a href="#" class="btn btn-primary">Ver Detalles</a>
                </div>
            </div>
        `;
        favoriteArtworksContainer.appendChild(artCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const favoriteArtworksContainer = document.getElementById('custom-favorite-artworks');
    let savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];

    savedArtworks.forEach(artwork => {
        
        if (artwork.imageSrc && artwork.title && artwork.description) {
            const artworkCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${artwork.imageSrc}" class="card-img-top" alt="${artwork.title}">
                        <div class="card-body">
                            <h6 class="card-title">${artwork.title}</h6>
                            <p class="card-text">${artwork.description}</p>
                            <a href="#" class="btn btn-primary">Ver Detalles</a>
                        </div>
                    </div>
                </div>
            `;
            favoriteArtworksContainer.insertAdjacentHTML('beforeend', artworkCard);
        }
    });
});
