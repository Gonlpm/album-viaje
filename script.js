const fotos = [
    "IMG_0967.JPG",
    "IMG_0968.JPG",
    "IMG_0969.JPG",
    "IMG_0978.JPG",
    "IMG_0979.JPG",
    "IMG_0981.JPG",
    "IMG_0985.JPG",
    "IMG_0986.JPG",
    "IMG_0993.JPG",
    "IMG_0995.JPG",
    "IMG_0996.JPG",
    "IMG_0997.JPG",
    "IMG_0998.JPG",
    "IMG_0999.JPG",
    "IMG_1000.JPG",
    "IMG_1001.JPG",
    "IMG_1002.JPG",
    "IMG_1003.JPG",
    "IMG_1014.JPG",
    "IMG_1015.JPG",
    "IMG_1026.JPG",
    "IMG_1027.JPG",
    "IMG_1031.JPG",
    "IMG_1032.JPG",
    "IMG_1033.JPG",
    "IMG_1055.JPG",
    "IMG_1056.JPG",
    "IMG_1059.JPG",
    "IMG_1064.JPG",
    "IMG_1065.JPG",
    "IMG_1071.JPG",
    "IMG_1073.JPG"
];

const galeria = document.getElementById("galeria");
const numeroFotos = document.getElementById("numeroFotos");
const visor = document.getElementById("visor");
const fotoGrande = document.getElementById("fotoGrande");
const contador = document.getElementById("contador");
const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let fotoActual = 0;

// Mostrar número de fotos
numeroFotos.textContent = fotos.length;

// Crear la galería
fotos.forEach(function(nombre, indice) {
    const img = document.createElement("img");

    img.src = "./" + nombre;
    img.alt = "Foto del viaje " + (indice + 1);
    img.loading = "lazy";

    img.onclick = function() {
        abrirFoto(indice);
    };

    galeria.appendChild(img);
});

// Abrir visor
function abrirFoto(indice) {
    fotoActual = indice;
    actualizarFoto();
    visor.classList.add("activo");
    document.body.style.overflow = "hidden";
}

// Actualizar foto grande
function actualizarFoto() {
    fotoGrande.src = "./" + fotos[fotoActual];
    contador.textContent =
        (fotoActual + 1) + " / " + fotos.length;
}

// Siguiente foto
function siguienteFoto() {
    fotoActual++;

    if (fotoActual >= fotos.length) {
        fotoActual = 0;
    }

    actualizarFoto();
}

// Foto anterior
function anteriorFoto() {
    fotoActual--;

    if (fotoActual < 0) {
        fotoActual = fotos.length - 1;
    }

    actualizarFoto();
}

// Botones
siguiente.onclick = siguienteFoto;
anterior.onclick = anteriorFoto;

cerrar.onclick = function() {
    visor.classList.remove("activo");
    document.body.style.overflow = "";
};

// Cerrar pulsando el fondo
visor.onclick = function(evento) {
    if (evento.target === visor) {
        visor.classList.remove("activo");
        document.body.style.overflow = "";
    }
};

// Teclado
document.addEventListener("keydown", function(evento) {
    if (!visor.classList.contains("activo")) return;

    if (evento.key === "ArrowRight") siguienteFoto();
    if (evento.key === "ArrowLeft") anteriorFoto();

    if (evento.key === "Escape") {
        visor.classList.remove("activo");
        document.body.style.overflow = "";
    }
});

// Deslizar en móvil
let inicioX = 0;

fotoGrande.addEventListener("touchstart", function(evento) {
    inicioX = evento.touches[0].clientX;
});

fotoGrande.addEventListener("touchend", function(evento) {
    const finX = evento.changedTouches[0].clientX;
    const diferencia = finX - inicioX;

    if (diferencia < -50) siguienteFoto();
    if (diferencia > 50) anteriorFoto();
});
