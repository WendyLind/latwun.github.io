/* =========================================
   LATWUN — GALERÍA DE MODELAJE 3D
   modelos.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galeria = document.getElementById("modelosGaleria");
    const avisoVacio = document.getElementById("modelosVacio");

    if (!galeria) {
        console.error("LATWUN: No se encontró #modelosGaleria.");
        return;
    }

    /* =========================================
       CATÁLOGO DE MODELOS

       Las rutas son relativas a index_modelos.html.
       Puedes añadir tantos modelos como quieras.
    ========================================= */

    const modelos = [
        {
            id: "001",
            titulo: "Primer modelo",
            categoria: "Personaje",
            subtitulo: "Modelo low poly de prueba",
            software: "Blender",
            estilo: "Low poly",
            estado: "Disponible",
            descripcion:
                "Este es un modelo de prueba de LATWUN. Aquí puedes describir el diseño, la inspiración, el proceso de modelado y los detalles técnicos de la pieza.",

            preview: "001/preview.jpg",

            // Pega aquí una URL de inserción de Sketchfab si tienes una.
            visor: "",

            sketchfab: "",
            tienda: "",
            itch: "",

            color: "#35204f"
        },

        {
            id: "002",
            titulo: "Asset de videojuego",
            categoria: "Asset 3D",
            subtitulo: "Objeto estilizado para videojuegos",
            software: "Blender",
            estilo: "Low poly",
            estado: "En desarrollo",
            descripcion:
                "Un asset pensado para videojuegos independientes. Puedes utilizar este espacio para explicar su topología, texturas, materiales y posibles usos.",

            preview: "002/preview.jpg",
            visor: "",
            sketchfab: "",
            tienda: "",
            itch: "",

            color: "#164b40"
        },

        {
            id: "003",
            titulo: "Experimento retro",
            categoria: "Escenario",
            subtitulo: "Estética de videojuegos clásicos",
            software: "Blender",
            estilo: "Retro / Low poly",
            estado: "En desarrollo",
            descripcion:
                "Experimento visual inspirado en los gráficos de videojuegos clásicos. Aquí podrás mostrar escenarios, objetos, personajes y otras piezas de tu proceso creativo.",

            preview: "003/preview.jpg",
            visor: "",
            sketchfab: "",
            tienda: "",
            itch: "",

            color: "#61252e"
        }
    ];


    /* =========================================
       ESTILOS
    ========================================= */

    const estilos = document.createElement("style");

    estilos.textContent = `
        .modelos-galeria {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 25px;
            padding: 35px 0;
        }

        .modelo-card {
            min-width: 0;
            padding: 0;
            overflow: hidden;
            border: 1px solid #292929;
            background: #101010;
            color: #fff;
            font: inherit;
            text-align: left;
            cursor: pointer;
            transition:
                transform .25s ease,
                border-color .25s ease,
                box-shadow .25s ease;
        }

        .modelo-card:hover,
        .modelo-card:focus-visible {
            transform: translateY(-6px);
            border-color: #c7ff3d;
            box-shadow: 0 12px 30px #0009;
            outline: none;
        }

        .modelo-card-imagen {
            position: relative;
            aspect-ratio: 4 / 3;
            overflow: hidden;
            background: #171717;
            border-bottom: 1px solid #292929;
        }

        .modelo-card-imagen img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .35s ease;
        }

        .modelo-card:hover .modelo-card-imagen img {
            transform: scale(1.05);
        }

        .modelo-imagen-fallback {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            overflow: hidden;
            background:
                linear-gradient(145deg, transparent, #0008),
                var(--modelo-color, #252525);
        }

        .modelo-imagen-fallback::before,
        .modelo-imagen-fallback::after {
            content: "";
            position: absolute;
            width: 150px;
            height: 150px;
            border: 1px solid #ffffff30;
            transform: rotate(35deg);
        }

        .modelo-imagen-fallback::before {
            top: -70px;
            right: -30px;
            box-shadow:
                0 0 0 18px #ffffff08,
                0 0 0 38px #ffffff05;
        }

        .modelo-imagen-fallback::after {
            bottom: -110px;
            left: 20px;
        }

        .modelo-fallback-numero {
            position: relative;
            z-index: 1;
            color: #ffffff35;
            font-size: clamp(40px, 5vw, 70px);
            font-weight: 900;
            letter-spacing: -4px;
        }

        .modelo-fallback-texto {
            position: relative;
            z-index: 1;
            color: #fff;
            font-family: "Josefin Sans", sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3px;
        }

        .modelo-card-numero {
            position: absolute;
            z-index: 2;
            top: 12px;
            left: 12px;
            padding: 6px 8px;
            background: #080808d9;
            color: #c7ff3d;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
        }

        .modelo-card-estado {
            position: absolute;
            z-index: 2;
            right: 12px;
            bottom: 12px;
            padding: 6px 8px;
            border: 1px solid #ffffff25;
            background: #080808d9;
            color: #ddd;
            font-size: 9px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .modelo-card-info {
            padding: 20px;
        }

        .modelo-card-categoria {
            color: #c7ff3d;
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .modelo-card-titulo {
            margin: 11px 0 8px;
            font-family: "Josefin Sans", sans-serif;
            font-size: 22px;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .modelo-card-subtitulo {
            margin: 0;
            color: #999;
            font-size: 12px;
            line-height: 1.7;
        }

        .modelo-card-flecha {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            margin-top: 18px;
            padding-top: 13px;
            border-top: 1px solid #292929;
            color: #ddd;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .modelo-card-flecha span:last-child {
            color: #c7ff3d;
            font-size: 18px;
        }

        /* VENTANA DEL MODELO */

        .visor-modal {
            position: fixed;
            z-index: 99999;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 22px;
            box-sizing: border-box;
        }

        .visor-modal.visor-activo {
            display: flex;
        }

        .visor-overlay {
            position: absolute;
            inset: 0;
            background: #000e;
            backdrop-filter: blur(7px);
        }

        .visor-contenedor {
            position: relative;
            z-index: 1;
            width: min(1000px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            border: 1px solid #383838;
            background: #0c0c0c;
            box-shadow: 0 20px 80px #000;
        }

        .visor-cerrar {
            position: sticky;
            z-index: 5;
            top: 10px;
            float: right;
            width: 38px;
            height: 38px;
            margin: 10px 10px -48px 0;
            border: 1px solid #444;
            background: #111;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
        }

        .visor-cerrar:hover {
            border-color: #c7ff3d;
            color: #c7ff3d;
        }

        .visor-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.2fr) minmax(260px, .8fr);
            gap: 0;
        }

        .visor-render {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 350px;
            aspect-ratio: 4 / 3;
            overflow: hidden;
            background: #151515;
            border-right: 1px solid #292929;
        }

        .visor-render img,
        .visor-render iframe {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border: 0;
            object-fit: contain;
        }

        .visor-render .modelo-imagen-fallback {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        .visor-info {
            padding: 38px 28px 28px;
        }

        .visor-numero {
            color: #c7ff3d;
            font-size: 11px;
            letter-spacing: 3px;
        }

        .visor-titulo {
            margin: 16px 0 10px;
            font-family: "Josefin Sans", sans-serif;
            font-size: clamp(26px, 3vw, 40px);
            line-height: 1.15;
            overflow-wrap: anywhere;
        }

        .visor-descripcion {
            margin: 22px 0;
            color: #bbb;
            font-size: 13px;
            line-height: 1.9;
            white-space: pre-line;
            overflow-wrap: anywhere;
        }

        .visor-datos {
            display: grid;
            gap: 12px;
            padding: 18px 0;
            border-top: 1px solid #292929;
            border-bottom: 1px solid #292929;
        }

        .visor-datos p {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin: 0;
            font-size: 11px;
        }

        .visor-datos span:first-child {
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .visor-datos span:last-child {
            color: #eee;
            text-align: right;
        }

        .visor-acciones {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 22px;
        }

        .visor-acciones a {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 42px;
            padding: 10px 14px;
            border: 1px solid #383838;
            color: #ddd;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1px;
            text-align: center;
            text-decoration: none;
            text-transform: uppercase;
            transition: .2s ease;
        }

        .visor-acciones a:hover {
            border-color: #c7ff3d;
            color: #c7ff3d;
        }

        .visor-acciones a.btn-cgtrader,
        .visor-acciones a.btn-platform-itch {
            border-color: #c7ff3d;
            background: #c7ff3d;
            color: #080808;
        }

        .visor-acciones a.btn-cgtrader:hover,
        .visor-acciones a.btn-platform-itch:hover {
            background: transparent;
            color: #c7ff3d;
        }

        .modelos-sin-resultados {
            grid-column: 1 / -1;
            padding: 50px 20px;
            border: 1px dashed #333;
            color: #888;
            text-align: center;
        }

        @media (max-width: 950px) {
            .modelos-galeria {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .visor-layout {
                grid-template-columns: 1fr;
            }

            .visor-render {
                min-height: 0;
                aspect-ratio: 16 / 10;
                border-right: 0;
                border-bottom: 1px solid #292929;
            }

            .visor-info {
                padding: 25px;
            }
        }

        @media (max-width: 550px) {
            .modelos-galeria {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .modelo-card-info {
                padding: 17px;
            }

            .visor-modal {
                padding: 9px;
            }

            .visor-info {
                padding: 22px 18px;
            }
        }
    `;

    document.head.appendChild(estilos);


    /* =========================================
       CREAR VISTA PREVIA
    ========================================= */

    function crearFallback(modelo) {
        const fondo = document.createElement("div");
        fondo.className = "modelo-imagen-fallback";
        fondo.style.setProperty("--modelo-color", modelo.color || "#252525");

        const numero = document.createElement("span");
        numero.className = "modelo-fallback-numero";
        numero.textContent = modelo.id;

        const texto = document.createElement("span");
        texto.className = "modelo-fallback-texto";
        texto.textContent = "LATWUN / 3D ASSET";

        fondo.append(numero, texto);

        return fondo;
    }

    function crearPreview(modelo, clase = "") {
        const contenedor = document.createElement("div");
        contenedor.className = clase;

        contenedor.appendChild(crearFallback(modelo));

        if (modelo.preview) {
            const imagen = document.createElement("img");
            imagen.src = modelo.preview;
            imagen.alt = `Vista previa de ${modelo.titulo}`;
            imagen.loading = "lazy";

            imagen.addEventListener("error", () => {
                imagen.remove();
            });

            contenedor.appendChild(imagen);
        }

        return contenedor;
    }


    /* =========================================
       CREAR GALERÍA
    ========================================= */

    galeria.classList.add("modelos-galeria");
    galeria.replaceChildren();

    if (avisoVacio) avisoVacio.hidden = true;

    if (modelos.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "modelos-sin-resultados";
        aviso.textContent =
            "Próximamente habrá nuevos modelos disponibles.";

        galeria.appendChild(aviso);
        return;
    }

    modelos.forEach((modelo) => {
        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = "modelo-card";
        tarjeta.setAttribute(
            "aria-label",
            `Ver detalles de ${modelo.titulo}`
        );

        const imagen = crearPreview(modelo, "modelo-card-imagen");

        const numero = document.createElement("span");
        numero.className = "modelo-card-numero";
        numero.textContent = `ID / ${modelo.id}`;

        const estado = document.createElement("span");
        estado.className = "modelo-card-estado";
        estado.textContent = modelo.estado;

        imagen.append(numero, estado);

        const info = document.createElement("div");
        info.className = "modelo-card-info";

        const categoria = document.createElement("span");
        categoria.className = "modelo-card-categoria";
        categoria.textContent = modelo.categoria;

        const titulo = document.createElement("h2");
        titulo.className = "modelo-card-titulo";
        titulo.textContent = modelo.titulo;

        const subtitulo = document.createElement("p");
        subtitulo.className = "modelo-card-subtitulo";
        subtitulo.textContent = modelo.subtitulo;

        const flecha = document.createElement("div");
        flecha.className = "modelo-card-flecha";
        flecha.innerHTML =
            "<span>Explorar modelo</span><span>↗</span>";

        info.append(categoria, titulo, subtitulo, flecha);
        tarjeta.append(imagen, info);

        tarjeta.addEventListener("click", () => abrirModelo(modelo));

        galeria.appendChild(tarjeta);
    });


    /* =========================================
       CREAR VENTANA DE DETALLES
    ========================================= */

    const modal = document.createElement("div");
    modal.className = "visor-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Detalles del modelo 3D");

    modal.innerHTML = `
        <div class="visor-overlay"></div>

        <section class="visor-contenedor">
            <button
                class="visor-cerrar"
                type="button"
                aria-label="Cerrar ventana"
            >×</button>

            <div class="visor-layout">
                <div class="visor-render"></div>

                <div class="visor-info">
                    <span class="visor-numero"></span>
                    <h2 class="visor-titulo"></h2>
                    <p class="visor-descripcion"></p>
                    <div class="visor-datos"></div>
                    <div class="visor-acciones"></div>
                </div>
            </div>
        </section>
    `;

    document.body.appendChild(modal);

    const cerrar = modal.querySelector(".visor-cerrar");
    const overlay = modal.querySelector(".visor-overlay");
    const render = modal.querySelector(".visor-render");
    const numeroModal = modal.querySelector(".visor-numero");
    const tituloModal = modal.querySelector(".visor-titulo");
    const descripcionModal = modal.querySelector(".visor-descripcion");
    const datosModal = modal.querySelector(".visor-datos");
    const accionesModal = modal.querySelector(".visor-acciones");

    let ultimoElemento = null;

    function agregarDato(etiqueta, valor) {
        const fila = document.createElement("p");
        const nombre = document.createElement("span");
        const dato = document.createElement("span");

        nombre.textContent = etiqueta;
        dato.textContent = valor || "No especificado";

        fila.append(nombre, dato);
        datosModal.appendChild(fila);
    }

    function agregarEnlace(texto, url, clase = "") {
        if (!url || !url.trim()) return;

        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = texto;

        if (clase) enlace.className = clase;

        accionesModal.appendChild(enlace);
    }

    function abrirModelo(modelo) {
        ultimoElemento = document.activeElement;

        render.replaceChildren();

        // Si hay un visor 3D, se muestra. Si no, se usa la imagen.
        if (modelo.visor && modelo.visor.trim()) {
            const iframe = document.createElement("iframe");
            iframe.src = modelo.visor;
            iframe.title = `Visor 3D de ${modelo.titulo}`;
            iframe.loading = "lazy";
            iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
            iframe.allowFullscreen = true;

            render.appendChild(iframe);
        } else {
            const preview = crearPreview(modelo);
            render.appendChild(preview.firstElementChild);

            if (modelo.preview) {
                const imagen = document.createElement("img");
                imagen.src = modelo.preview;
                imagen.alt = `Vista previa de ${modelo.titulo}`;

                imagen.addEventListener("error", () => {
                    imagen.remove();
                });

                render.appendChild(imagen);
            }
        }

        numeroModal.textContent = `LATWUN / MODEL ${modelo.id}`;
        tituloModal.textContent = modelo.titulo;
        descripcionModal.textContent = modelo.descripcion;

        datosModal.replaceChildren();
        agregarDato("Categoría", modelo.categoria);
        agregarDato("Estilo", modelo.estilo);
        agregarDato("Software", modelo.software);
        agregarDato("Estado", modelo.estado);

        accionesModal.replaceChildren();

        agregarEnlace(
            "Ver modelo en Sketchfab ↗",
            modelo.sketchfab,
            "btn-platform-itch"
        );

        agregarEnlace(
            "Ver en la tienda ↗",
            modelo.tienda,
            "btn-cgtrader"
        );

        agregarEnlace(
            "Descargar en itch.io ↗",
            modelo.itch,
            "btn-platform-cg"
        );

        if (!accionesModal.children.length) {
            const aviso = document.createElement("p");
            aviso.className = "modelo-card-subtitulo";
            aviso.textContent =
                "Los enlaces de este modelo estarán disponibles próximamente.";

            accionesModal.appendChild(aviso);
        }

        modal.classList.add("visor-activo");
        document.body.style.overflow = "hidden";
        cerrar.focus();
    }

    function cerrarModelo() {
        modal.classList.remove("visor-activo");
        document.body.style.overflow = "";

        // Detener el visor 3D cuando se cierra la ventana.
        render.replaceChildren();

        if (ultimoElemento && typeof ultimoElemento.focus === "function") {
            ultimoElemento.focus();
        }
    }

    cerrar.addEventListener("click", cerrarModelo);
    overlay.addEventListener("click", cerrarModelo);

    document.addEventListener("keydown", (evento) => {
        if (
            evento.key === "Escape" &&
            modal.classList.contains("visor-activo")
        ) {
            cerrarModelo();
        }
    });

});
