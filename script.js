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

    // Si los elementos no existen en el HTML actual, detenemos el script para evitar errores de consola
    if (!track || !prevButton || !nextButton || !indicators || projects.length === 0) return;

    let currentPosition = 0;
    let totalPositions = 0;

    function calculatePositions() {
        const isMobile = window.innerWidth <= 800;
        
        if (isMobile) {
            totalPositions = projects.length; // 1 tarjeta por vista
        } else {
            totalPositions = Math.ceil(projects.length / 2); // 2 tarjetas por vista
        }
        
        if (currentPosition >= totalPositions) {
            currentPosition = totalPositions - 1;
        }
        
        createIndicators();
        updateProjects();
    }

    function updateProjects() {
        const isMobile = window.innerWidth <= 800;
        
        // Calculamos el desplazamiento porcentual exacto
        // En móvil avanza de 100% en 100%. En PC avanza de 100% (que equivale a mover 2 tarjetas de golpe)
        const percentageToMove = currentPosition * 100;
        track.style.transform = `translateX(-${percentageToMove}%)`;

        // Actualizar puntitos
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

            dot.addEventListener("click", () => {
                currentPosition = i;
                updateProjects();
            });

            indicators.appendChild(dot);
        }
    }

    nextButton.addEventListener("click", () => {
        currentPosition++;
        if (currentPosition >= totalPositions) {
            currentPosition = 0; // Bucle al inicio
        }
        updateProjects();
    });

    prevButton.addEventListener("click", () => {
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition = totalPositions - 1; // Bucle al final
        }
        updateProjects();
    });

    // Recalcular posiciones si el usuario rota o escala la ventana
    window.addEventListener("resize", calculatePositions);
    
    // Inicialización del carrusel
    calculatePositions();
});
