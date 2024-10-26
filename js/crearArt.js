document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSizeButton = document.getElementById('brushSize');
    const eraserButton = document.getElementById('eraser');
    const fillButton = document.getElementById('fill');
    let painting = false;
    let currentColor = '#000000';
    let brushSize = 5;
    let undoStack = [];
    let isEraser = false;
    let isFilling = false;

    function resizeCanvas() {
        const canvasContainer = canvas.parentElement;
        const rect = canvasContainer.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 600;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (undoStack.length > 0) {
            let img = new Image();
            img.src = undoStack[undoStack.length - 1];
            img.onload = function () {
                ctx.drawImage(img, 0, 0);
            }
        }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById('clearCanvas').addEventListener('click', clearCanvas);
    document.getElementById('saveArt').addEventListener('click', saveCurrentArt);
    document.getElementById('undoAction').addEventListener('click', undoLastAction);
    colorPicker.addEventListener('input', () => currentColor = colorPicker.value);
    brushSizeButton.addEventListener('click', changeBrushSize);
    eraserButton.addEventListener('click', toggleEraser);
    fillButton.addEventListener('click', fillCanvas);

    function startPosition(e) {
        painting = true;
        saveState();
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = isEraser ? '#FFFFFF' : currentColor;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function clearCanvas() {
        saveState();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveCurrentArt() {
        const artData = canvas.toDataURL();
        saveArtToLocalStorage(artData);
    }

    function saveArtToLocalStorage(artData) {
        let artGallery = JSON.parse(localStorage.getItem('artGallery')) || [];
        artGallery.push(artData);
        localStorage.setItem('artGallery', JSON.stringify(artGallery));
        displayGallery();
    }

    function displayGallery() {
        const artGallery = JSON.parse(localStorage.getItem('artGallery')) || [];
        const galleryContainer = document.getElementById('artGallery');
        galleryContainer.innerHTML = '';

        artGallery.forEach((art, index) => {
            const artElement = document.createElement('div');
            artElement.className = 'col-md-4 mb-4';
            artElement.innerHTML = `
                <div class="card gallery-card">
                    <img src="${art}" class="card-img-top" alt="Obra de Arte ${index + 1}">
                    <div class="card-body text-center">
                        <button class="btn btn-danger btn-sm" onclick="deleteArt(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(artElement);
        });
    }

    window.deleteArt = function (index) {
        let artGallery = JSON.parse(localStorage.getItem('artGallery')) || [];
        artGallery.splice(index, 1);
        localStorage.setItem('artGallery', JSON.stringify(artGallery));
        displayGallery();
    };

    function saveState() {
        undoStack.push(canvas.toDataURL());
    }

    function undoLastAction() {
        if (undoStack.length > 0) {
            let img = new Image();
            img.src = undoStack.pop();
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        }
    }

    function changeBrushSize() {
        let newSize = prompt("Ingrese el tamaño del pincel (actual: " + brushSize + "):", brushSize);
        if (newSize !== null) {
            brushSize = parseInt(newSize, 10);
            if (isNaN(brushSize) || brushSize <= 0) {
                brushSize = 5; 
                alert("Tamaño de pincel no válido. Se ha restablecido a 5.");
            }
        }
    }

    function toggleEraser() {
        isEraser = !isEraser;
        eraserButton.classList.toggle('btn-outline-danger', !isEraser);
        eraserButton.classList.toggle('btn-danger', isEraser);
    }

    function fillCanvas() {
        saveState();
        ctx.fillStyle = currentColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    displayGallery();
});
