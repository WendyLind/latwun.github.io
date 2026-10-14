/* =========================================
   LATWUN — MOTOR DE GALERÍA DE MODELOS 3D
   Archivo: modelos/modelos.js
========================================= */

// 1. BASE DE DATOS DE LOS MODELOS (5 Modelos de Prueba)
const LISTA_MODELOS = [
    {
        id: "001",
        titulo: "Tostadora Cartoon Retro",
        descripcion: "Un asset tridimensional low poly con texturas estilizadas a mano. Diseñado y optimizado especialmente para entornos interactivos, cocinas de horror psicológico o juegos casuales.",
        archivo3d: "001/modelo.gltf", 
        gifPortada: "001/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "002",
        titulo: "Mansion Terror Low Poly",
        descripcion: "Estructura modular de una mansión victoriana abandonada. Mapeado UV optimizado listo para usarse directamente en motores gráficos como Unity o Unreal Engine.",
        archivo3d: "002/modelo.glb",
        gifPortada: "002/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "" // Al estar vacío, este botón se ocultará automáticamente en el visor
    },
    {
        id: "003",
        titulo: "Maquina Expendedora Retro",
        descripcion: "Asset clásico de una vending machine desgastada con iluminación interna emisiva. Ideal para pasillos oscuros, estaciones de metro o estéticas survival horror.",
        archivo3d: "003/modelo.glb",
        gifPortada: "003/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "004",
        titulo: "Lagarto Demonio Mutante",
        descripcion: "Criatura hostil diseñada bajo limitaciones de polígonos estrictas. Incluye mapas de normales y texturas detalladas para preservar el aspecto terrorífico retro.",
        archivo3d: "004/modelo.gltf",
        gifPortada: "004/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "005",
        titulo: "Cocina Abandonada Pack",
        descripcion: "Conjunto de muebles, electrodomésticos y utensilios corroídos listos para ambientar juegos interactivos experimentales o simuladores de horror.",
        archivo3d: "005/modelo.glb",
        gifPortada: "005/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    }
];

// 2. INICIALIZADOR DE LA GALERÍA DE TARJETAS
document.addEventListener("DOMContentLoaded", () => {
    const contenedorGaleria = document.getElementById("modelosGaleria");
    const contenedorVacio = document.getElementById("modelosVacio");

    if (!contenedorGaleria) return;

    // Verificar si la lista tiene elementos para mostrar
    if (!LISTA_MODELOS || LISTA_MODELOS.length === 0) {
        if (contenedorVacio) contenedorVacio.removeAttribute("hidden");
        return;
    }

    // Inyectar tarjetas dinámicamente en la cuadrícula HTML
    LISTA_MODELOS.forEach(modelo => {
        const tarjeta = document.createElement("a");
        tarjeta.href = "#";
        tarjeta.className = "modelo-card";
        tarjeta.dataset.id = modelo.id;

        tarjeta.innerHTML = `
            <div class="modelo-card-imagen">
                <img src="${modelo.gifPortada}" alt="${modelo.titulo}" loading="lazy">
            </div>
            <div class="modelo-card-info">
                <div class="modelo-card-texto">
                    <span class="modelo-card-numero">#${modelo.id}</span>
                    <h3 class="modelo-card-titulo">${modelo.titulo}</h3>
                </div>
                <div class="modelo-card-flecha">↗</div>
            </div>
        `;

        // Evento de escucha para desplegar el visor 3D al hacer clic
        tarjeta.addEventListener("click", (e) => {
            e.preventDefault();
            abrirVisor3D(modelo);
        });

        contenedorGaleria.appendChild(tarjeta);
    });

    // Crear y preparar la estructura oculta del Modal/Visor interactivo
    crearEstructuraModal();
});

// 3. CONSTRUCTOR DINÁMICO DEL MODAL EN EL DOM
function crearEstructuraModal() {
    if (document.getElementById("visor3DModal")) return;

    const modal = document.createElement("div");
    modal.id = "visor3DModal";
    modal.className = "visor-modal";
    modal.innerHTML = `
        <div class="visor-overlay"></div>
        <div class="visor-contenedor">
            <button class="visor-cerrar" aria-label="Cerrar visor">&times;</button>
            
            <div class="visor-layout">
                <!-- Zona del renderizador interactivo (Izquierda) -->
                <div class="visor-render" id="zonaRender3D"></div>
                
                <!-- Zona informativa y botones comerciales (Derecha) -->
                <div class="visor-info">
                    <span class="visor-numero" id="visorNumero">#000</span>
                    <h2 class="visor-titulo" id="visorTitulo">Nombre del Elemento</h2>
                    <p class="visor-descripcion" id="visorDescripcion">Cargando detalles del modelo...</p>
                    
                    <div class="visor-acciones">
                        <!-- Enlace dinámico: Itch.io -->
                        <a href="#" target="_blank" id="btnItch" class="btn-cgtrader btn-platform-itch">
                            ADQUIRIR EN ITCH.IO
                        </a>
                        <!-- Enlace dinámico: CGTrader -->
                        <a href="#" target="_blank" id="btnCGTrader" class="btn-cgtrader btn-platform-cg">
                            ADQUIRIR EN CGTRADER
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Eventos de control para cerrar la interfaz modal
    modal.querySelector(".visor-cerrar").addEventListener("click", cerrarVisor3D);
    modal.querySelector(".visor-overlay").addEventListener("click", cerrarVisor3D);
    
    // Soporte nativo para cerrar con la tecla de escape (ESC)
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarVisor3D();
    });
}

// 4. FUNCIONES DE CONTROL (ENCENDIDO Y APAGADO DEL MODEL-VIEWER)
function abrirVisor3D(modelo) {
    const modal = document.getElementById("visor3DModal");
    const zonaRender = document.getElementById("zonaRender3D");
    
    if (!modal || !zonaRender) return;

    // Poblar textos informativos
    document.getElementById("visorNumero").textContent = `#${modelo.id}`;
    document.getElementById("visorTitulo").textContent = modelo.titulo;
    document.getElementById("visorDescripcion").textContent = modelo.descripcion;

    // Configuración condicional del botón de Itch.io
    const btnItch = document.getElementById("btnItch");
    if (modelo.linkItch && modelo.linkItch.trim() !== "") {
        btnItch.href = modelo.linkItch;
        btnItch.style.display = "inline-flex";
    } else {
        btnItch.style.display = "none";
    }

    // Configuración condicional del botón de CGTrader
    const btnCGTrader = document.getElementById("btnCGTrader");
    if (modelo.linkCGTrader && modelo.linkCGTrader.trim() !== "") {
        btnCGTrader.href = modelo.linkCGTrader;
        btnCGTrader.style.display = "inline-flex";
    } else {
        btnCGTrader.style.display = "none";
    }

    // Inyectar y prender el motor 3D oficial de Google (model-viewer)
    zonaRender.innerHTML = `
        <model-viewer 
            src="${modelo.archivo3d}" 
            alt="Render interactivo de ${modelo.titulo}"
            auto-rotate 
            camera-controls 
            background-color="#080808"
            shadow-intensity="1"
            exposure="1.1"
            interaction-prompt="auto">
        </model-viewer>
    `;

    // Activar clases visuales de CSS y congelar el scroll del body
    modal.classList.add("visor-activo");
    document.body.style.overflow = "hidden";
}

function cerrarVisor3D() {
    const modal = document.getElementById("visor3DModal");
    if (modal) {
        modal.classList.remove("visor-activo");
        
        // Vaciamos el contenedor del render al apagar el modal.
        // Esto libera inmediatamente el consumo de memoria RAM y GPU del navegador.
        const zonaRender = document.getElementById("zonaRender3D");
        if (zonaRender) zonaRender.innerHTML = "";
        
        document.body.style.overflow = "";
    }
}
