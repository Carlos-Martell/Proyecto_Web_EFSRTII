document.addEventListener('DOMContentLoaded', () => {

    const handleLikeClick = (event) => {
        const button = event.target;
        const artworkId = button.getAttribute('data-id');
        let likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];

        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            button.textContent = 'Me Gusta';
            likedArtworks = likedArtworks.filter(id => id !== artworkId);
        } else {
            button.classList.add('liked');
            button.textContent = 'Me Gusta ✔';
            likedArtworks.push(artworkId);
        }

        localStorage.setItem('likedArtworks', JSON.stringify(likedArtworks));
        console.log(`Artwork ${artworkId} liked/unliked.`);
    };


    const handleSaveClick = (event) => {
        const button = event.target;
        const artworkId = button.getAttribute('data-id');
        const artworkSection = button.closest('section');
        const imageSrc = artworkSection.querySelector('img').src;
        const title = artworkSection.querySelector('h2').textContent;
        const description = artworkSection.querySelector('p').textContent;

        let savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];

        if (button.classList.contains('saved')) {
            button.classList.remove('saved');
            button.textContent = 'Guardar';
            savedArtworks = savedArtworks.filter(artwork => artwork.id !== artworkId);
        } else {
            button.classList.add('saved');
            button.textContent = 'Guardado ✔';
            savedArtworks.push({ id: artworkId, imageSrc, title, description });
        }

        localStorage.setItem('savedArtworks', JSON.stringify(savedArtworks));
        console.log(`Artwork ${artworkId} saved/unsaved.`);
    };


    const initializeButtonStates = () => {
        const likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];
        const savedArtworks = JSON.parse(localStorage.getItem('savedArtworks')) || [];

        document.querySelectorAll('.like-btn').forEach(button => {
            const artworkId = button.getAttribute('data-id');
            if (likedArtworks.includes(artworkId)) {
                button.classList.add('liked');
                button.textContent = 'Me Gusta ✔';
            }
            button.addEventListener('click', handleLikeClick);
        });

        document.querySelectorAll('.save-btn').forEach(button => {
            const artworkId = button.getAttribute('data-id');
            if (savedArtworks.some(artwork => artwork.id === artworkId)) {
                button.classList.add('saved');
                button.textContent = 'Guardado ✔';
            }
            button.addEventListener('click', handleSaveClick);
        });
    };


    const loadMoreButton = document.getElementById('load-more');
    const additionalArtworksContainer = document.getElementById('additional-artworks');
    let isArtworksVisible = false;

    loadMoreButton.addEventListener('click', () => {
        if (isArtworksVisible) {
            additionalArtworksContainer.innerHTML = '';
            loadMoreButton.textContent = 'Ver Más';
        } else {
            const additionalArtworks = `
                <!-- Noveno Artwork Details Section -->
                <section class="py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="./img/IMG 12.png" class="img-fluid" alt="Obra de Arte 3">
                            </div>
                            <div class="col-md-6">
                                <h2 class="mb-4">PETS BEACH</h2>
                                <p class="mb-4">Descripción breve.</p>
                                <h5 class="mb-3">Detalles:</h5>
                                <ul class="list-unstyled">
                                    <li><strong>Artista:</strong> Nombre del Artista </li>
                                    <li><strong>Año:</strong> Año de Creación </li>
                                    <li><strong>Técnica:</strong> Técnica Utilizada </li>
                                    <li><strong>Dimensiones:</strong> Dimensiones</li>
                                </ul>
                                <div class="mt-3">
                                    <button class="btn btn-outline-primary me-2 like-btn" data-id="9">Me Gusta</button>
                                    <button class="btn btn-outline-secondary save-btn" data-id="9">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Décimo Artwork Details Section -->
                <section class="py-5 bg-light">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 order-md-2">
                                <img src="./img/IMG 13.png" class="img-fluid" alt="Obra de Arte 2">
                            </div>
                            <div class="col-md-6 order-md-1">
                                <h2 class="mb-4">BLUE BROTHER</h2>
                                <p class="mb-4">Descripción breve.</p>
                                <h5 class="mb-3">Detalles:</h5>
                                <ul class="list-unstyled">
                                    <li><strong>Artista:</strong> Nombre del Artista </li>
                                    <li><strong>Año:</strong> Año de Creación </li>
                                    <li><strong>Técnica:</strong> Técnica Utilizada </li>
                                    <li><strong>Dimensiones:</strong> Dimensiones</li>
                                </ul>
                                <div class="mt-3">
                                    <button class="btn btn-outline-primary me-2 like-btn" data-id="10">Me Gusta</button>
                                    <button class="btn btn-outline-secondary save-btn" data-id="10">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            additionalArtworksContainer.innerHTML = additionalArtworks;
            loadMoreButton.textContent = 'Ocultar';
        }

        isArtworksVisible = !isArtworksVisible;


        initializeButtonStates();
    });


    initializeButtonStates();
});
