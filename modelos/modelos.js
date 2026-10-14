/* =========================================
   LATWUN — MOTOR DE GALERÍA DE MODELOS 3D
   Archivo: modelos/modelos.js (Edición Sketchfab)
========================================= */

// 1. BASE DE DATOS DE LOS MODELOS (Tus 5 modelos reales vinculados a Sketchfab)
const LISTA_MODELOS = [
    {
        id: "001",
        titulo: "Tostadora Cartoon Retro",
        descripcion: "Un asset tridimensional low poly con texturas estilizadas a mano. Diseñado y optimizado especialmente para entornos interactivos, cocinas de horror psicológico o juegos casuales.",
        sketchfabId: "fa98413ce9184ae89cc9071e9b5d0b2e", // ID de tu tostadora
        slug: "tostadora-low-poly-cartoon-fa98413ce9184ae89cc9071e9b5d0b2e",
        gifPortada: "001/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "002",
        titulo: "Mansion Terror Low Poly",
        descripcion: "Estructura modular de una mansión victoriana abandonada. Mapeado UV optimizado listo para usarse directamente en motores gráficos como Unity o Unreal Engine.",
        sketchfabId: "tu-id-mansion-aqui", // Reemplaza por el ID real de tu mansión en Sketchfab
        slug: "mansion-terror-low-poly",
        gifPortada: "002/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "" 
    },
    {
        id: "003",
        titulo: "Maquina Expendedora Retro",
        descripcion: "Asset clásico de una vending machine desgastada con iluminación interna emisiva. Ideal para pasillos oscuros, estaciones de metro o estéticas survival horror.",
        sketchfabId: "tu-id-vending-aqui", // Reemplaza por el ID real de tu expendedora en Sketchfab
        slug: "vending-machine-low-poly",
        gifPortada: "003/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "004",
        titulo: "Lagarto Demonio Mutante",
        descripcion: "Criatura hostil diseñada bajo limitaciones de polígonos estrictas. Incluye mapas de normales y texturas detalladas para preservar el aspecto terrorífico retro.",
        sketchfabId: "tu-id-lagarto-aqui", // Reemplaza por el ID real de tu lagarto en Sketchfab
        slug: "lagarto-demonio-low-poly",
        gifPortada: "004/portada.gif",
        linkItch: "https://itch.io",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "005",
        titulo: "Cocina Abandonada Pack",
        descripcion: "Conjunto de muebles, electrodomésticos y utensilios corroídos listos para ambientar juegos interactivos experimentales o simuladores de horror.",
        sketchfabId: "tu-id-cocina-aqui", // Reemplaza por el ID real de tu cocina en Sketchfab
        slug: "kitchen-low-poly-game-asset",
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

    if (!LISTA_MODELOS || LISTA_MODELOS.length === 0) {
        if (contenedorVacio) contenedorVacio.removeAttribute("hidden");
        return;
    }

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

        tarjeta.addEventListener("click", (e) => {
            e.preventDefault();
            abrirVisor3D(modelo);
        });

        contenedorGaleria.appendChild(tarjeta);
    });

    crearEstructuraModal();
});

// 3. CONSTRUCTOR DEL MODAL EN EL DOM
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
                <!-- Zona izquierda: Renderizador de Sketchfab -->
                <div class="visor-render" id="zonaRender3D"></div>
                <!-- Zona derecha: Datos -->
                <div class="visor-info">
                    <span class="visor-numero" id="visorNumero">#000</span>
                    <h2 class="visor-titulo" id="visorTitulo">Nombre del Asset</h2>
                    <p class="visor-descripcion" id="visorDescripcion">Cargando detalles...</p>
                    <div class="visor-acciones">
                        <a href="#" target="_blank" id="btnItch" class="btn-cgtrader btn-platform-itch">ADQUIRIR EN ITCH.IO</a>
                        <a href="#" target="_blank" id="btnCGTrader" class="btn-cgtrader btn-platform-cg">ADQUIRIR EN CGTRADER</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".visor-cerrar").addEventListener("click", cerrarVisor3D);
    modal.querySelector(".visor-overlay").addEventListener("click", cerrarVisor3D);
    
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarVisor3D();
    });
}

// 4. INYECCIÓN DEL IFRAME NATIVO DE SKETCHFAB
function abrirVisor3D(modelo) {
    const modal = document.getElementById("visor3DModal");
    const zonaRender = document.getElementById("zonaRender3D");
    
    if (!modal || !zonaRender) return;

    document.getElementById("visorNumero").textContent = `#${modelo.id}`;
    document.getElementById("visorTitulo").textContent = modelo.titulo;
    document.getElementById("visorDescripcion").textContent = modelo.descripcion;

    const btnItch = document.getElementById("btnItch");
    if (modelo.linkItch && modelo.linkItch.trim() !== "") {
        btnItch.href = modelo.linkItch;
        btnItch.style.display = "inline-flex";
    } else {
        btnItch.style.display = "none";
    }

    const btnCGTrader = document.getElementById("btnCGTrader");
    if (modelo.linkCGTrader && modelo.linkCGTrader.trim() !== "") {
        btnCGTrader.href = modelo.linkCGTrader;
        btnCGTrader.style.display = "inline-flex";
    } else {
        btnCGTrader.style.display = "none";
    }

    // Inyectamos el Embed de Sketchfab de forma dinámica usando el ID correspondiente
    zonaRender.innerHTML = `
        <div class="sketchfab-embed-wrapper" style="width: 100%; height: 100%;">
            <iframe 
                title="${modelo.titulo}" 
                frameborder="0" 
                allowfullscreen 
                mozallowfullscreen="true" 
                webkitallowfullscreen="true" 
                allow="autoplay; fullscreen; xr-spatial-tracking" 
                xr-spatial-tracking 
                execution-while-out-of-viewport 
                execution-while-not-rendered 
                web-share 
                src="https://sketchfab.com{modelo.sketchfabId}/embed?autostart=1&ui_theme=dark"
                style="width: 100%; height: 100%; border: none;">
            </iframe>
        </div>
    `;

    modal.classList.add("visor-activo");
    document.body.style.overflow = "hidden";
}

function cerrarVisor3D() {
    const modal = document.getElementById("visor3DModal");
    if (modal) {
        modal.classList.remove("visor-activo");
        const zonaRender = document.getElementById("zonaRender3D");
        if (zonaRender) zonaRender.innerHTML = ""; // Detiene el iframe inmediatamente
        document.body.style.overflow = "";
    }
}
