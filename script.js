```javascript
// ============================================
// FOTOS DEL VIAJE
// ============================================

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


// ============================================
// ELEMENTOS DE LA PÁGINA
// ============================================

const galeria = document.getElementById("galeria");
const visor = document.getElementById("visor");
const fotoGrande = document.getElementById("fotoGrande");
const contador = document.getElementById("contador");
const numeroFotos = document.getElementById("numeroFotos");
const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let fotoActual = 0;


// ============================================
// NÚMERO DE FOTOS
// ============================================

numeroFotos.textContent = "32";


// ============================================
// CREAR GALERÍA
// ============================================

fotos.forEach((nombreFoto, indice) => {

    const imagen = document.createElement("img");

    // Las fotos están en la raíz del repositorio
    imagen.src = nombreFoto;

    imagen.alt = "Foto del viaje " + (indice + 1);

    imagen.classList.add("foto");

    imagen.loading = "lazy";

    imagen.addEventListener("click", () => {
        abrirFoto(indice);
    });

    galeria.appendChild(imagen);
});


// ============================================
// ABRIR FOTO
// ============================================

function abrirFoto(indice) {

    fotoActual = indice;

    actualizarFoto();

    visor.classList.add("activo");

    document.body.style.overflow = "hidden";
}


// ============================================
// ACTUALIZAR FOTO GRANDE
// ============================================

function actualizarFoto() {

    fotoGrande.src = fotos[fotoActual];

    fotoGrande.alt =
        "Foto " + (fotoActual + 1) +
        " del viaje";

    contador.textContent =
        (fotoActual + 1) +
        " / " +
        fotos.length;
}


// ============================================
// SIGUIENTE
// ============================================

function fotoSiguiente() {

    fotoActual++;

    if (fotoActual >= fotos.length) {
        fotoActual = 0;
    }

    actualizarFoto();
}


// ============================================
// ANTERIOR
// ============================================

function fotoAnterior() {

    fotoActual--;

    if (fotoActual < 0) {
        fotoActual = fotos.length - 1;
    }

    actualizarFoto();
}


// ============================================
// BOTONES
// ============================================

siguiente.addEventListener(
    "click",
    fotoSiguiente
);

anterior.addEventListener(
    "click",
    fotoAnterior
);


// ============================================
// CERRAR
// ============================================

cerrar.addEventListener(
    "click",
    cerrarVisor
);

function cerrarVisor() {

    visor.classList.remove("activo");

    document.body.style.overflow = "";
}


// ============================================
// CERRAR AL PULSAR FUERA
// ============================================

visor.addEventListener("click", (evento) => {

    if (evento.target === visor) {
        cerrarVisor();
    }

});


// ============================================
// TECLADO DEL ORDENADOR
// ============================================

document.addEventListener("keydown", (evento) => {

    if (!visor.classList.contains("activo")) {
        return;
    }

    if (evento.key === "ArrowRight") {
        fotoSiguiente();
    }

    if (evento.key === "ArrowLeft") {
        fotoAnterior();
    }

    if (evento.key === "Escape") {
        cerrarVisor();
    }

});


// ============================================
// DESLIZAR CON EL DEDO EN EL MÓVIL
// ============================================

let inicioX = 0;
let finX = 0;

fotoGrande.addEventListener("touchstart", (evento) => {

    inicioX = evento.touches[0].clientX;

});

fotoGrande.addEventListener("touchend", (evento) => {

    finX = evento.changedTouches[0].clientX;

    const diferencia = finX - inicioX;

    // Deslizar hacia la izquierda
    if (diferencia < -50) {
        fotoSiguiente();
    }

    // Deslizar hacia la derecha
    if (diferencia > 50) {
        fotoAnterior();
    }

});
```
