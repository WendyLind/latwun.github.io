/* =========================================
   LATWUN — MOTOR AUTOMATIZADO DEL BLOG
   Archivo: blogs/blog.js
========================================= */

// 1. BASE DE DATOS DE ARTÍCULOS (3 Entradas de Prueba)
const LISTA_ARTICULOS = [
    {
        id: "001",
        fecha: "14 OCT 2026",
        categoria: "DEVLOG",
        titulo: "Iniciando en el Horror Retro: Estética PS1",
        extracto: "Un análisis profundo sobre cómo replicar las limitaciones técnicas de la era de los 32 bits. Hablamos de texturas sin filtrar, vertex jittering y la psicología del miedo mediante la niebla densa.",
        imagenPortada: "../img/project4.jpg", // Puedes cambiarlo por la miniatura de tu artículo
        linkLectura: "entrada-horror-ps1.html" // Ruta al archivo HTML individual de la entrada
    },
    {
        id: "002",
        fecha: "28 SEP 2026",
        categoria: "DISEÑO 3D",
        titulo: "El Arte del Low Poly Optimizado",
        extracto: "Aprende metodologías eficientes para reducir el recuento de polígonos (polycount) en tus assets sin sacrificar la silueta ni la identidad visual cartoon de tus modelos tridimensionales.",
        imagenPortada: "../img/project3.jpg",
        linkLectura: "entrada-low-poly.html"
    },
    {
        id: "003",
        fecha: "10 SEP 2026",
        categoria: "EXPERIMENTAL",
        titulo: "Mecánicas Arcade y Narrativa Surrealista",
        extracto: "Bitácora sobre nuestro último prototipo jugable. Cómo fusionar loops de juego rápidos de los salones recreativos de los 90 con hilos narrativos oscuros e inconexos.",
        imagenPortada: "../img/project2.jpg",
        linkLectura: "entrada-mecanicas-surrealistas.html"
    }
];

// 2. MOTOR DE RENDERIZADO DINÁMICO
document.addEventListener("DOMContentLoaded", () => {
    const contenedorGaleria = document.getElementById("blogGaleria");
    const contenedorVacio = document.getElementById("blogVacio");

    if (!contenedorGaleria) return;

    // Verificar si existen artículos cargados en la base de datos anterior
    if (!LISTA_ARTICULOS || LISTA_ARTICULOS.length === 0) {
        if (contenedorVacio) contenedorVacio.removeAttribute("hidden");
        return;
    }

    // Inyectar las tarjetas en la cuadrícula de 3 columnas
    LISTA_ARTICULOS.forEach(articulo => {
        const tarjeta = document.createElement("a");
        tarjeta.href = articulo.linkLectura;
        tarjeta.className = "blog-card";
        tarjeta.dataset.id = articulo.id;

        tarjeta.innerHTML = `
            <div class="blog-card-imagen">
                <img src="${articulo.imagenPortada}" alt="${articulo.titulo}" loading="lazy">
            </div>
            <div class="blog-card-info">
                <div class="blog-card-meta">
                    <span class="blog-meta-categoria">${articulo.categoria}</span>
                    <span class="blog-meta-fecha">${articulo.fecha}</span>
                </div>
                <h3 class="blog-card-titulo">${articulo.titulo}</h3>
                <p class="blog-card-extracto">${articulo.extracto}</p>
                <div class="blog-card-footer">
                    <span class="blog-btn-link">LEER MÁS</span>
                    <span class="blog-flecha">→</span>
                </div>
            </div>
        `;

        contenedorGaleria.appendChild(tarjeta);
    });
});
