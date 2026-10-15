/* =========================================
   LATWUN — BLOG Y BITÁCORA
   blog.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galeria = document.getElementById("blogGaleria");
    const avisoVacio = document.getElementById("blogVacio");

    if (!galeria) {
        console.error("No se encontró #blogGaleria en el HTML.");
        return;
    }

    /* =========================================
       PUBLICACIONES

       Para añadir una entrada, copia un objeto.
       Puedes usar 1 o 2 imágenes por artículo.
    ========================================= */

    const publicaciones = [

        {
            id: "001",

            titulo: "Bienvenido a la bitácora de LATWUN",

            fecha: "2026-10-14",

            categoria: "Anuncios",

            resumen:
                "Este es el primer artículo de prueba. Aquí compartiré avances, ideas y novedades sobre mis proyectos.",

            contenido: `
¡Bienvenido a la bitácora de LATWUN!

Este espacio estará dedicado al desarrollo de videojuegos independientes, el modelado 3D low poly y los experimentos creativos que surjan durante el proceso.

Aquí podrás encontrar:

• Avances de mis videojuegos.
• Capturas y pruebas de desarrollo.
• Modelos 3D y experimentos visuales.
• Reflexiones sobre el proceso creativo.

La idea es documentar tanto los resultados como el proceso que hay detrás de cada proyecto.

Esta es una publicación de prueba. Puedes reemplazar su texto, fecha e imágenes por tu propio contenido.
            `,

            imagenes: [
                "img/blog-prueba-01.jpg",
                "img/blog-prueba-02.jpg"
            ],

            imagenesAlt: [
                "Imagen principal de la bitácora de LATWUN",
                "Segunda imagen de la publicación de prueba"
            ]
        }

    ];


    /* =========================================
       ESTILOS DE LAS PUBLICACIONES
    ========================================= */

    const estilos = document.createElement("style");

    estilos.textContent = `
        .blog-galeria {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
            padding: 35px 0;
        }

        .blog-tarjeta {
            display: flex;
            flex-direction: column;
            min-width: 0;
            border: 1px solid #292929;
            background: #101010;
            color: #fff;
            overflow: hidden;
            cursor: pointer;
            text-align: left;
            padding: 0;
            font: inherit;
            transition: transform .25s ease, border-color .25s ease;
        }

        .blog-tarjeta:hover,
        .blog-tarjeta:focus-visible {
            transform: translateY(-5px);
            border-color: #4caa75;
            outline: none;
        }

        .blog-tarjeta-imagen {
            position: relative;
            aspect-ratio: 16 / 10;
            overflow: hidden;
            background: #171717;
        }

        .blog-tarjeta-imagen img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .35s ease;
        }

        .blog-tarjeta:hover .blog-tarjeta-imagen img {
            transform: scale(1.04);
        }

        .blog-imagen-placeholder {
            display: flex;
            width: 100%;
            height: 100%;
            min-height: 150px;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            background:
                linear-gradient(135deg, #4caa7530, transparent),
                #151515;
            color: #4caa75;
            font-family: "Josefin Sans", sans-serif;
            font-size: 13px;
            letter-spacing: 3px;
            text-align: center;
        }

        .blog-tarjeta-cuerpo {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 22px;
        }

        .blog-tarjeta-meta {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            color: #999;
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .blog-tarjeta-categoria {
            color: #4caa75;
            font-weight: 700;
        }

        .blog-tarjeta-titulo {
            margin: 15px 0 10px;
            font-family: "Josefin Sans", sans-serif;
            font-size: 22px;
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        .blog-tarjeta-resumen {
            margin: 0;
            color: #aaa;
            font-size: 13px;
            line-height: 1.8;
        }

        .blog-tarjeta-enlace {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            margin-top: auto;
            padding-top: 20px;
            color: #ddd;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .blog-tarjeta-enlace span:last-child {
            color: #4caa75;
            font-size: 18px;
        }

        /* VENTANA DEL ARTÍCULO */

        .blog-modal {
            position: fixed;
            z-index: 99999;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 22px;
            box-sizing: border-box;
        }

        .blog-modal.activo {
            display: flex;
        }

        .blog-modal-fondo {
            position: absolute;
            inset: 0;
            background: #000e;
            backdrop-filter: blur(6px);
        }

        .blog-modal-contenido {
            position: relative;
            z-index: 1;
            width: min(850px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            padding: 35px;
            border: 1px solid #333;
            background: #0b0b0b;
            box-shadow: 0 20px 80px #000;
        }

        .blog-modal-cerrar {
            position: sticky;
            z-index: 2;
            float: right;
            top: 0;
            width: 38px;
            height: 38px;
            margin: -15px -15px 0 15px;
            border: 1px solid #444;
            background: #111;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
        }

        .blog-modal-cerrar:hover {
            border-color: #4caa75;
            color: #4caa75;
        }

        .blog-modal-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            color: #999;
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .blog-modal-categoria {
            color: #4caa75;
            font-weight: 700;
        }

        .blog-modal-titulo {
            margin: 20px 0;
            font-family: "Josefin Sans", sans-serif;
            font-size: clamp(28px, 5vw, 44px);
            line-height: 1.15;
            overflow-wrap: anywhere;
        }

        .blog-modal-imagenes {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin: 25px 0;
        }

        .blog-modal-imagenes:empty {
            display: none;
        }

        .blog-modal-imagenes img {
            display: block;
            width: 100%;
            max-height: 450px;
            object-fit: contain;
            background: #151515;
            border: 1px solid #292929;
        }

        .blog-modal-texto {
            color: #ccc;
            font-size: 14px;
            line-height: 1.9;
            overflow-wrap: anywhere;
        }

        .blog-modal-parrafo {
            margin: 0 0 18px;
            white-space: pre-line;
        }

        .blog-sin-publicaciones {
            grid-column: 1 / -1;
            padding: 50px 20px;
            border: 1px dashed #333;
            color: #888;
            text-align: center;
        }

        @media (max-width: 950px) {
            .blog-galeria {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 600px) {
            .blog-galeria {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .blog-tarjeta-cuerpo {
                padding: 18px;
            }

            .blog-modal {
                padding: 10px;
            }

            .blog-modal-contenido {
                padding: 25px 20px;
            }

            .blog-modal-imagenes {
                grid-template-columns: 1fr;
            }

            .blog-modal-imagenes img {
                max-height: 350px;
            }
        }
    `;

    document.head.appendChild(estilos);


    /* =========================================
       FUNCIONES AUXILIARES
    ========================================= */

    function formatearFecha(fecha) {
        if (!fecha) return "Sin fecha";

        const partes = fecha.split("-");

        if (partes.length !== 3) return fecha;

        const fechaLocal = new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

        if (Number.isNaN(fechaLocal.getTime())) return fecha;

        return new Intl.DateTimeFormat("es", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(fechaLocal);
    }

    function crearPlaceholder() {
        const placeholder = document.createElement("div");
        placeholder.className = "blog-imagen-placeholder";
        placeholder.textContent = "LATWUN / BITÁCORA";
        return placeholder;
    }

    function crearImagen(src, alt, clase = "") {
        const imagen = document.createElement("img");

        imagen.src = src;
        imagen.alt = alt || "Imagen de la publicación";
        imagen.loading = "lazy";

        if (clase) imagen.className = clase;

        return imagen;
    }


    /* =========================================
       GENERAR TARJETAS
    ========================================= */

    galeria.classList.add("blog-galeria");
    galeria.replaceChildren();

    if (avisoVacio) avisoVacio.hidden = true;

    if (publicaciones.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "blog-sin-publicaciones";
        aviso.textContent = "Próximamente habrá nuevas publicaciones.";

        galeria.appendChild(aviso);
        return;
    }

    publicaciones.forEach((post) => {

        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = "blog-tarjeta";
        tarjeta.setAttribute(
            "aria-label",
            `Leer artículo: ${post.titulo}`
        );

        const imagenContenedor = document.createElement("div");
        imagenContenedor.className = "blog-tarjeta-imagen";

        const primeraImagen = post.imagenes?.[0];

        if (primeraImagen) {
            const imagen = crearImagen(
                primeraImagen,
                post.imagenesAlt?.[0] || post.titulo
            );

            imagen.addEventListener("error", () => {
                imagen.replaceWith(crearPlaceholder());
            });

            imagenContenedor.appendChild(imagen);
        } else {
            imagenContenedor.appendChild(crearPlaceholder());
        }

        const cuerpo = document.createElement("div");
        cuerpo.className = "blog-tarjeta-cuerpo";

        const meta = document.createElement("div");
        meta.className = "blog-tarjeta-meta";

        const categoria = document.createElement("span");
        categoria.className = "blog-tarjeta-categoria";
        categoria.textContent = post.categoria || "Bitácora";

        const fecha = document.createElement("span");
        fecha.textContent = formatearFecha(post.fecha);

        meta.append(categoria, fecha);

        const titulo = document.createElement("h2");
        titulo.className = "blog-tarjeta-titulo";
        titulo.textContent = post.titulo;

        const resumen = document.createElement("p");
        resumen.className = "blog-tarjeta-resumen";
        resumen.textContent = post.resumen;

        const enlace = document.createElement("div");
        enlace.className = "blog-tarjeta-enlace";
        enlace.innerHTML = "<span>Leer publicación</span><span>↗</span>";

        cuerpo.append(meta, titulo, resumen, enlace);
        tarjeta.append(imagenContenedor, cuerpo);

        tarjeta.addEventListener("click", () => abrirArticulo(post));

        galeria.appendChild(tarjeta);
    });


    /* =========================================
       VENTANA DEL ARTÍCULO COMPLETO
    ========================================= */

    const modal = document.createElement("div");

    modal.className = "blog-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Artículo del blog");

    modal.innerHTML = `
        <div class="blog-modal-fondo"></div>

        <article class="blog-modal-contenido">
            <button
                class="blog-modal-cerrar"
                type="button"
                aria-label="Cerrar artículo"
            >×</button>

            <div class="blog-modal-meta">
                <span class="blog-modal-categoria"></span>
                <span class="blog-modal-fecha"></span>
            </div>

            <h2 class="blog-modal-titulo"></h2>

            <div class="blog-modal-imagenes"></div>

            <div class="blog-modal-texto"></div>
        </article>
    `;

    document.body.appendChild(modal);

    const cerrar = modal.querySelector(".blog-modal-cerrar");
    const fondo = modal.querySelector(".blog-modal-fondo");
    const metaCategoria = modal.querySelector(".blog-modal-categoria");
    const metaFecha = modal.querySelector(".blog-modal-fecha");
    const modalTitulo = modal.querySelector(".blog-modal-titulo");
    const modalImagenes = modal.querySelector(".blog-modal-imagenes");
    const modalTexto = modal.querySelector(".blog-modal-texto");

    let ultimoElemento = null;

    function abrirArticulo(post) {
        ultimoElemento = document.activeElement;

        metaCategoria.textContent = post.categoria || "Bitácora";
        metaFecha.textContent = formatearFecha(post.fecha);
        modalTitulo.textContent = post.titulo;

        /* Imágenes: máximo dos por publicación */

        modalImagenes.replaceChildren();

        (post.imagenes || []).slice(0, 2).forEach((src, indice) => {
            if (!src) return;

            const imagen = crearImagen(
                src,
                post.imagenesAlt?.[indice] || post.titulo
            );

            imagen.addEventListener("error", () => {
                imagen.remove();
            });

            modalImagenes.appendChild(imagen);
        });

        /* Texto del artículo */

        modalTexto.replaceChildren();

        const parrafos = (post.contenido || "").trim().split(/\n\s*\n/);

        parrafos.forEach((texto) => {
            const limpio = texto.trim();

            if (!limpio) return;

            const parrafo = document.createElement("p");
            parrafo.className = "blog-modal-parrafo";
            parrafo.textContent = limpio;

            modalTexto.appendChild(parrafo);
        });

        modal.classList.add("activo");
        document.body.style.overflow = "hidden";
        cerrar.focus();
    }

    function cerrarArticulo() {
        modal.classList.remove("activo");
        document.body.style.overflow = "";

        if (ultimoElemento && typeof ultimoElemento.focus === "function") {
            ultimoElemento.focus();
        }
    }

    cerrar.addEventListener("click", cerrarArticulo);
    fondo.addEventListener("click", cerrarArticulo);

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            modal.classList.contains("activo")
        ) {
            cerrarArticulo();
        }
    });

});
