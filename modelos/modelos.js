/* =========================================
   LATWUN — GALERÍA DE MODELAJE 3D
   Archivo: modelos/modelos.js
========================================= */

// 1. BASE DE DATOS DE LOS MODELOS
// Agrega, quita o edita los modelos desde aquí de forma limpia
const LISTA_MODELOS = [
    {
        id: "001",
        titulo: "Espada Low Poly",
        descripcion: "Un asset optimizado para videojuegos de aventura. Texturas estilizadas con mapas de emisión incluidos para un efecto de brillo místico en motores como Unity o Unreal Engine.",
        archivo3d: "modelos/001/modelo.gltf", // Puede ser .gltf o .glb
        gifPortada: "modelos/001/portada.gif",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "002",
        titulo: "Cofre del Tesoro",
        descripcion: "Cofre animado listo para mecánicas de loot. Incluye mapas de normales detallados manteniendo un recuento de polígonos extremadamente bajo.",
        archivo3d: "modelos/002/modelo.glb",
        gifPortada: "modelos/002/portada.gif",
        linkCGTrader: "https://cgtrader.com"
    },
    {
        id: "003",
        titulo: "Robot Centinela",
        descripcion: "Dron de seguridad Sci-Fi con diseño modular. Ideal para enemigos patrulleros en shooters en primera o tercera persona.",
        archivo3d: "modelos/003/modelo.glb",
        gifPortada: "modelos/003/portada.gif",
        linkCGTrader: "" // Si lo dejas vacío, el botón de compra no se mostrará
    }
];

// 2. INYECTAR LA GALERÍA AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    const contenedorGaleria = document.getElementById("modelosGaleria");
    const contenedorVacio = document.getElementById("modelosVacio");

    // Verificar si hay modelos en la lista
    if (!LISTA_MODELOS || LISTA_MODELOS.length === 0) {
        if (contenedorVacio) contenedorVacio.removeAttribute("hidden");
        return;
    }

    // Renderizar tarjetas
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

        // Evento para abrir el visor interactivo
        tarjeta.addEventListener("click", (e) => {
            e.preventDefault();
            abrirVisor3D(modelo);
        });

        contenedorGaleria.appendChild(tarjeta);
    });

    // Crear la estructura HTML del Modal/Visor dinámicamente si no existe
    crearEstructuraModal();
});

// 3. CREAR EL MODAL DEL VISOR EN EL HTML
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
                <!-- Zona del render 3D interactivo -->
                <div class="visor-render" id="zonaRender3D">
                    <!-- Aquí se inyectará el componente <model-viewer> -->
                </div>
                
                <!-- Zona de información lateral -->
                <div class="visor-info">
                    <span class="visor-numero" id="visorNumero">#000</span>
                    <h2 class="visor-titulo" id="visorTitulo">Título del Modelo</h2>
                    <p class="visor-descripcion" id="visorDescripcion">Descripción del elemento...</p>
                    
                    <div class="visor-acciones">
                        <a href="#" target="_blank" id="visorBtnCGTrader" class="btn-cgtrader">
                            ADQUIRIR EN CGTRADER
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Eventos para cerrar el modal
    modal.querySelector(".visor-cerrar").addEventListener("click", cerrarVisor3D);
    modal.querySelector(".visor-overlay").addEventListener("click", cerrarVisor3D);
    
    // Cerrar con la tecla Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarVisor3D();
    });
}

// 4. FUNCIONES DE CONTROL DEL VISOR (ABRIR / CERRAR)
function abrirVisor3D(modelo) {
    const modal = document.getElementById("visor3DModal");
    const zonaRender = document.getElementById("zonaRender3D");
    
    // Asignar textos e información
    document.getElementById("visorNumero").textContent = `#${modelo.id}`;
    document.getElementById("visorTitulo").textContent = modelo.titulo;
    document.getElementById("visorDescripcion").textContent = modelo.descripcion;

    // Configurar botón de CGTrader
    const btnCGTrader = document.getElementById("visorBtnCGTrader");
    if (modelo.linkCGTrader && modelo.linkCGTrader.trim() !== "") {
        btnCGTrader.href = modelo.linkCGTrader;
        btnCGTrader.style.display = "inline-flex";
    } else {
        btnCGTrader.style.display = "none";
    }

    // Inyectar el visualizador 3D oficial de Google optimizado
    // Atributos incluidos: auto-rotate (giro automático), camera-controls (rotar/zoom con mouse), ar (soporte realidad aumentada)
    zonaRender.innerHTML = `
        <model-viewer 
            src="${modelo.archivo3d}" 
            alt="Render 3D interactivo de ${modelo.titulo}"
            auto-rotate 
            camera-controls 
            background-color="#080808"
            shadow-intensity="1"
            exposure="1.2"
            interaction-prompt="auto">
        </model-viewer>
    `;

    // Mostrar el modal agregando la clase activa y bloquear scroll del body
    modal.classList.add("visor-activo");
    document.body.style.overflow = "hidden";
}

function cerrarVisor3D() {
    const modal = document.getElementById("visor3DModal");
    if (modal) {
        modal.classList.remove("visor-activo");
        
        // Limpiamos el visor 3D al cerrar para liberar memoria RAM/GPU del navegador inmediatamente
        const zonaRender = document.getElementById("zonaRender3D");
        if (zonaRender) zonaRender.innerHTML = "";
        
        document.body.style.overflow = "";
    }
}
