/* =========================================
   CARRUSEL DE PROYECTOS DESTACADOS
   Archivo: script.js (Ubicación: Raíz)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("projectTrack");
    const prevButton = document.getElementById("projectPrev");
    const nextButton = document.getElementById("projectNext");
    const indicators = document.getElementById("projectIndicators");
    const projects = document.querySelectorAll(".project-card");

    // Si los elementos esenciales no existen en la página, detenemos el script de forma segura
    if (!track || !prevButton || !nextButton || !indicators || projects.length === 0) return;

    let currentPosition = 0;
    let totalPositions = 0;

    function calculatePositions() {
        const isMobile = window.innerWidth <= 800;
        
        if (isMobile) {
            totalPositions = projects.length; // En celular vas de 1 en 1 tarjeta
        } else {
            totalPositions = Math.ceil(projects.length / 2); // En PC vas de 2 en 2 tarjetas
        }
        
        if (currentPosition >= totalPositions) {
            currentPosition = totalPositions - 1;
        }
        
        createIndicators();
        updateProjects();
    }

    function updateProjects() {
        // Multiplicamos por 100 para desplazar bloques de contenido completos
        const percentageToMove = currentPosition * 100;
        track.style.transform = `translateX(-${percentageToMove}%)`;

        // Sincronizar el estado visual de los puntos (.project-dot)
        const dots = document.querySelectorAll(".project-dot");
        dots.forEach((dot, index) => {
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

            dot.addEventListener("click", (e) => {
                e.stopPropagation(); // Evita interferencias con las tarjetas contenedoras
                currentPosition = i;
                updateProjects();
            });

            indicators.appendChild(dot);
        }
    }

    // Eventos de los botones de control con soporte de detención
    nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentPosition++;
        if (currentPosition >= totalPositions) {
            currentPosition = 0; // Regresar al primer bloque
        }
        updateProjects();
    });

    prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = totalPositions - 1; // Ir al último bloque
        }
        updateProjects();
    });

    // Escuchar el cambio de tamaño para recalcular en vivo sin congelarse
    window.addEventListener("resize", calculatePositions);
    
    // Encendido inicial
    calculatePositions();
});
