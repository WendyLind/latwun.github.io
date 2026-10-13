/* =========================================
   CARRUSEL DE PROYECTOS DESTACADOS
   Archivo: js/projects.js (Corregido)
========================================= */

const track = document.getElementById("projectTrack");
const prevButton = document.getElementById("projectPrev");
const nextButton = document.getElementById("projectNext");
const indicators = document.getElementById("projectIndicators");
const projects = document.querySelectorAll(".project-card");

let currentPosition = 0;
let totalPositions = 0;

// Determina cuántos pasos dar según el tamaño de la pantalla
function calculatePositions() {
    const isMobile = window.innerWidth <= 800;
    
    if (isMobile) {
        // En celular vas de 1 en 1, necesitas tantas posiciones como tarjetas haya
        totalPositions = projects.length;
    } else {
        // En escritorio se muestran de a 2 tarjetas simultáneamente
        totalPositions = Math.ceil(projects.length / 2);
    }
    
    // Si al cambiar de tamaño la posición actual queda fuera de rango, la reseteamos
    if (currentPosition >= totalPositions) {
        currentPosition = totalPositions - 1;
    }
    
    // Regenerar los puntitos indicadores para que coincidan con los pasos reales
    createIndicators();
    updateProjects();
}

function updateProjects() {
    const isMobile = window.innerWidth <= 800;

    if (isMobile) {
        // En celular cada tarjeta mide el 100% del contenedor ancho
        track.style.transform = `translateX(-${currentPosition * 100}%)`;
    } else {
        // En escritorio avanzas de 2 en 2 tarjetas (cada paso desplaza el 100% del contenedor)
        track.style.transform = `translateX(-${currentPosition * 100}%)`;
    }

    // Actualizar el estado activo visual de los indicadores (.project-dot)
    document.querySelectorAll(".project-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPosition);
    });
}

function createIndicators() {
    indicators.innerHTML = "";

    for (let i = 0; i < totalPositions; i++) {
        const dot = document.createElement("span");
        dot.classList.add("project-dot");

        if (i === currentPosition) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            currentPosition = i;
            updateProjects();
        });

        indicators.appendChild(dot);
    }
}

// Botón Siguiente
nextButton.addEventListener("click", () => {
    currentPosition++;
    if (currentPosition >= totalPositions) {
        currentPosition = 0; // Regresa al principio si llega al final
    }
    updateProjects();
});

// Botón Anterior
prevButton.addEventListener("click", () => {
    currentPosition--;
    if (currentPosition < 0) {
        currentPosition = totalPositions - 1; // Va al último si retrocede desde el inicio
    }
    updateProjects();
});

// Escucha activa cuando el usuario cambia el tamaño de la ventana (para recalcular PC/Celular)
window.addEventListener("resize", calculatePositions);

// Inicialización de arranque
calculatePositions();
