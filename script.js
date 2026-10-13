/* =========================================
   LATWUN — MOTOR INTERACTIVO PRINCIPAL
   Archivo: script.js (Ubicación: Raíz)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------
    // LOGICA 1: CARRUSEL DE PROYECTOS
    // -------------------------------------
    const track = document.getElementById("projectTrack");
    const prevButton = document.getElementById("projectPrev");
    const nextButton = document.getElementById("projectNext");
    const indicators = document.getElementById("projectIndicators");
    const projects = document.querySelectorAll(".project-card");

    let currentPosition = 0;
    let totalPositions = 0;

    if (track && prevButton && nextButton && indicators && projects.length > 0) {
        
        function calculatePositions() {
            const isMobile = window.innerWidth <= 800;
            if (isMobile) {
                totalPositions = projects.length;
            } else {
                totalPositions = Math.ceil(projects.length / 2);
            }
            if (currentPosition >= totalPositions) {
                currentPosition = totalPositions - 1;
            }
            createIndicators();
            updateProjects();
        }

        function updateProjects() {
            const percentageToMove = currentPosition * 100;
            track.style.transform = `translateX(-${percentageToMove}%)`;

            const dots = document.querySelectorAll(".project-dot");
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentPosition);
            });
        }

        function createIndicators() {
            indicators.innerHTML = "";
            for (let i = 0; i < totalPositions; i++) {
                const dot = document.createElement("span");
                dot.createElement
                dot.classList.add("project-dot");
                if (i === currentPosition) dot.classList.add("active");

                dot.addEventListener("click", (e) => {
                    e.stopPropagation();
                    currentPosition = i;
                    updateProjects();
                });
                indicators.appendChild(dot);
            }
        }

        nextButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentPosition++;
            if (currentPosition >= totalPositions) currentPosition = 0;
            updateProjects();
        });

        prevButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentPosition--;
            if (currentPosition < 0) currentPosition = totalPositions - 1;
            updateProjects();
        });

        window.addEventListener("resize", calculatePositions);
        calculatePositions();
    }

    // -------------------------------------
    // LOGICA 2: PESTAÑAS DESPLEGABLES DE SERVICIOS
    // -------------------------------------
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const targetTabId = button.getAttribute("data-tab");

                // 1. Desactivar todos los botones anteriores
                tabButtons.forEach(btn => btn.classList.remove("active"));
                // 2. Ocultar todos los paneles informativos
                tabPanels.forEach(panel => panel.classList.remove("active"));

                // 3. Activar el botón presionado y liberar su respectivo panel
                button.classList.add("active");
                const targetPanel = document.getElementById(targetTabId);
                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            });
        });
    }
});
