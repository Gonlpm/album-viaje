```javascript
/* =====================================================
   CONFIGURACIÓN DEL ÁLBUM
===================================================== */


/*
    ESCRIBE AQUÍ LOS NOMBRES EXACTOS DE TUS FOTOS.

    Ejemplo:

    "foto1.jpg"
    "foto2.jpg"

    Si una foto se llama:
        IMG_4587.jpg

    tienes que escribir:
        "IMG_4587.jpg"
*/

const fotos = [

    "foto1.jpg",
    "foto2.jpg",
    "foto3.jpg",
    "foto4.jpg",
    "foto5.jpg",
    "foto6.jpg",
    "foto7.jpg",
    "foto8.jpg",
    "foto9.jpg",
    "foto10.jpg"

];


/* =====================================================
   ELEMENTOS
===================================================== */

const galeria = document.getElementById("galeria");

const visor = document.getElementById("visor");

const fotoGrande = document.getElementById("fotoGrande");

const contador = document.getElementById("contador");

const numeroFotos = document.getElementById("numeroFotos");

const cerrar = document.getElementById("cerrar");

const anterior = document.getElementById("anterior");

const siguiente = document.getElementById("siguiente");


/* =====================================================
   VARIABLES
===================================================== */

let fotoActual = 0;


/* =====================================================
   NÚMERO DE FOTOS
===================================================== */

numeroFotos.textContent = fotos.length;


/* =====================================================
   CREAR GALERÍA
===================================================== */

fotos.forEach((nombreFoto, indice) => {

    const imagen = document.createElement("img");

    imagen.src = "fotos/" + nombreFoto;

    imagen.alt = "Foto " + (indice + 1);

    imagen.classList.add("foto");

    imagen.loading = "lazy";

    imagen.addEventListener("click", () => {

        abrirFoto(indice);

    });

    galeria.appendChild(imagen);

});


/* =====================================================
   ABRIR FOTO
===================================================== */

function abrirFoto(indice) {

    fotoActual = indice;

    actualizarFoto();

    visor.classList.add("activo");

    document.body.style.overflow = "hidden";

}


/* =====================================================
   ACTUALIZAR FOTO
===================================================== */

function actualizarFoto() {

    fotoGrande.src =
        "fotos/" + fotos[fotoActual];

    contador.textContent =
        (fotoActual + 1) + " / " + fotos.length;

}


/* =====================================================
   SIGUIENTE FOTO
===================================================== */

function fotoSiguiente() {

    fotoActual++;

    if (fotoActual >= fotos.length) {

        fotoActual = 0;

    }

    actualizarFoto();

}


/* =====================================================
   FOTO ANTERIOR
===================================================== */

function fotoAnterior() {

    fotoActual--;

    if (fotoActual < 0) {

        fotoActual = fotos.length - 1;

    }

    actualizarFoto();

}


/* =====================================================
   BOTONES
===================================================== */

siguiente.addEventListener(
    "click",
    fotoSiguiente
);

anterior.addEventListener(
    "click",
    fotoAnterior
);


/* =====================================================
   CERRAR VISOR
===================================================== */

cerrar.addEventListener(
    "click",
    cerrarVisor
);


function cerrarVisor() {

    visor.classList.remove("activo");

    document.body.style.overflow = "";

}


/* =====================================================
   CLIC FUERA DE LA FOTO
===================================================== */

visor.addEventListener("click", (evento) => {

    if (evento.target === visor) {

        cerrarVisor();

    }

});


/* =====================================================
   TECLADO
===================================================== */

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


/* =====================================================
   DESLIZAR EN MÓVIL
===================================================== */

let inicioX = 0;

let finX = 0;


fotoGrande.addEventListener("touchstart", (evento) => {

    inicioX = evento.touches[0].clientX;

});


fotoGrande.addEventListener("touchend", (evento) => {

    finX = evento.changedTouches[0].clientX;

    const diferencia = finX - inicioX;


    /*
        Deslizar hacia la izquierda
        → siguiente foto
    */

    if (diferencia < -50) {

        fotoSiguiente();

    }


    /*
        Deslizar hacia la derecha
        → foto anterior
    */

    if (diferencia > 50) {

        fotoAnterior();

    }

});
```
