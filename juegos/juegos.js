
/* =========================================
   LATWUN — COLECCIÓN DE VIDEOJUEGOS
   juegos.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const galeria = document.getElementById("juegosGaleria");
    const avisoVacio = document.getElementById("juegosVacio");

    if (!galeria) {
        console.error("No se encontró el elemento #juegosGaleria");
        return;
    }

    /* =========================================
       CATÁLOGO DE JUEGOS

       Cambia los ejemplos por tus juegos.
       Las imágenes van en juegos/img/
    ========================================= */

    const juegos = [
        {
            id: "001",
            titulo: "PROYECTO 01",
            subtitulo: "Un juego de LATWUN",
            genero: "Terror psicológico",
            plataforma: "PC / Windows",
            estado: "En desarrollo",
            descripcion:
                "Una experiencia independiente desarrollada por LATWUN. Próximamente encontrarás aquí más información sobre este proyecto.",
            portada: "img/juego-01.jpg",
            tienda: "",
            color: "#8b1010",
            textoBoton: "Próximamente"
        },

        {
            id: "002",
            titulo: "Look Back: Backrooms",
            subtitulo: "Un fan game basado en Look Back en los Backrooms.",
            genero: "RPG / Pixel Art",
            plataforma: "PC / Windows",
            estado: "DEMO",
            descripcion: "Look Back: Backrooms es un juego indie en pixel art que fusiona Look Back con The Backrooms.",
            portada: "portadas/002.gif",
            tienda: "https://latwun.itch.io/look-back-backrooms",
            color: "#45205f",
            textoBoton: "Demo Disponible"
        },

        {
            id: "003",
            titulo: "TU PRÓXIMO JUEGO",
            subtitulo: "Añade aquí tu próximo lanzamiento",
            genero: "Indie",
            plataforma: "PC / Windows",
            estado: "En preparación",
            descripcion:
                "Utiliza este espacio para presentar otro videojuego de tu colección.",
            portada: "portadas/002.jpg",
            tienda: "https://latwun.itch.io/look-back-backrooms",
            color: "#164b40",
            textoBoton: "Demo Disponible"
        }
    ];


    /* =========================================
       ESTILOS DE LA COLECCIÓN
    ========================================= */

    const estilos = document.createElement("style");

    estilos.textContent = `
        .juegos-galeria {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 32px 22px;
            padding: 35px 0;
        }

        .juego-card {
            position: relative;
            min-width: 0;
            cursor: pointer;
            border: 1px solid #292929;
            background: #101010;
            color: #fff;
            text-align: left;
            padding: 0;
            font: inherit;
            transition:
                transform .25s ease,
                border-color .25s ease,
                box-shadow .25s ease;
        }

        .juego-card:hover,
        .juego-card:focus-visible {
            transform: translateY(-7px);
            border-color: #c7ff3d;
            box-shadow: 0 12px 30px #0009;
            outline: none;
        }

        .juego-caja {
            position: relative;
            aspect-ratio: 3 / 4;
            overflow: hidden;
            background: #171717;
            border-bottom: 1px solid #292929;
        }

        .juego-lomo {
            position: absolute;
            z-index: 2;
            inset: 0 auto 0 0;
            width: 22px;
            background: #080808d9;
            border-right: 1px solid #ffffff24;
            display: flex;
            align-items: center;
            justify-content: center;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            color: #fff;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 2px;
            text-shadow: 1px 1px #000;
        }

        .juego-etiqueta {
            position: absolute;
            z-index: 3;
            top: 12px;
            left: 31px;
            padding: 5px 7px;
            background: #080808d9;
            color: #c7ff3d;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .juego-portada {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform .35s ease;
        }

        .juego-card:hover .juego-portada {
            transform: scale(1.045);
        }

        .juego-portada-fallback {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px 20px 25px 38px;
            background:
                linear-gradient(0deg, #000 0%, #0003 75%),
                var(--juego-color, #252525);
        }

        .juego-portada-fallback::before {
            content: "";
            position: absolute;
            width: 190px;
            height: 190px;
            right: -60px;
            top: 18%;
            border: 1px solid #ffffff30;
            transform: rotate(35deg);
            box-shadow:
                0 0 0 18px #ffffff08,
                0 0 0 38px #ffffff05;
        }

        .juego-fallback-numero {
            position: relative;
            z-index: 1;
            font-size: clamp(34px, 5vw, 65px);
            font-weight: 900;
            letter-spacing: -4px;
            color: #ffffff24;
        }

        .juego-fallback-titulo {
            position: relative;
            z-index: 1;
            margin-top: 12px;
            font-family: "Josefin Sans", sans-serif;
            font-size: clamp(19px, 2vw, 29px);
            font-weight: 700;
            line-height: 1.05;
            overflow-wrap: anywhere;
        }

        .juego-datos {
            padding: 17px 15px 18px;
        }

        .juego-categoria {
            color: #c7ff3d;
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .juego-titulo {
            margin: 9px 0 7px;
            font-family: "Josefin Sans", sans-serif;
            font-size: 19px;
            line-height: 1.2;
            overflow-wrap: anywhere;
        }

        .juego-subtitulo {
            margin: 0;
            color: #999;
            font-size: 12px;
            line-height: 1.5;
        }

        .juego-abrir {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            margin-top: 17px;
            padding-top: 12px;
            border-top: 1px solid #292929;
            color: #ddd;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .juego-abrir span:last-child {
            color: #c7ff3d;
            font-size: 17px;
        }

        /* VENTANA DE INFORMACIÓN */

        .juego-modal {
            position: fixed;
            z-index: 99999;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .juego-modal.activo {
            display: flex;
        }

        .juego-modal-fondo {
            position: absolute;
            inset: 0;
            background: #000e;
            backdrop-filter: blur(7px);
        }

        .juego-modal-contenido {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: minmax(180px, .8fr) 1.2fr;
            gap: 30px;
            width: min(850px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            border: 1px solid #383838;
            background: #0c0c0c;
            box-shadow: 0 20px 80px #000;
        }

        .juego-modal-cerrar {
            position: absolute;
            top: 9px;
            right: 12px;
            width: 38px;
            height: 38px;
            border: 1px solid #444;
            background: #111;
            color: #fff;
            cursor: pointer;
            font-size: 24px;
        }

        .juego-modal-cerrar:hover {
            color: #c7ff3d;
            border-color: #c7ff3d;
        }

        .juego-modal-imagen {
            position: relative;
            min-height: 250px;
            aspect-ratio: 3 / 4;
            overflow: hidden;
            background: #181818;
        }

        .juego-modal-imagen img {
            width: 100%;
            height: 100%;
            position: absolute;
            inset: 0;
            object-fit: cover;
        }

        .juego-modal-imagen .juego-portada-fallback {
            padding: 25px;
        }

        .juego-modal-info {
            padding: 15px 0;
        }

        .juego-modal-numero {
            color: #c7ff3d;
            font-size: 11px;
            letter-spacing: 3px;
        }

        .juego-modal-titulo {
            margin: 15px 0 10px;
            font-family: "Josefin Sans", sans-serif;
            font-size: clamp(28px, 4vw, 42px);
            line-height: 1.1;
            overflow-wrap: anywhere;
        }

        .juego-modal-subtitulo {
            color: #aaa;
            font-size: 13px;
        }

        .juego-modal-descripcion {
            margin: 25px 0;
            color: #ccc;
            font-size: 14px;
            line-height: 1.8;
            white-space: pre-line;
        }

        .juego-modal-metadatos {
            display: grid;
            gap: 12px;
            padding: 18px 0;
            border-top: 1px solid #292929;
            border-bottom: 1px solid #292929;
        }

        .juego-modal-metadatos p {
            display: flex;
            justify-content: space-between;
            gap: 15px;
            margin: 0;
            font-size: 12px;
        }

        .juego-modal-metadatos span:first-child {
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .juego-modal-metadatos span:last-child {
            text-align: right;
            color: #eee;
        }

        .juego-modal-acciones {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 24px;
        }

        .juego-btn-tienda {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 45px;
            padding: 12px 18px;
            border: 1px solid #c7ff3d;
            background: #c7ff3d;
            color: #080808;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1px;
            text-decoration: none;
            text-transform: uppercase;
            transition: .2s ease;
        }

        .juego-btn-tienda:hover {
            background: transparent;
            color: #c7ff3d;
        }

        .juego-btn-no-disponible {
            display: inline-flex;
            align-items: center;
            min-height: 45px;
            padding: 12px 18px;
            border: 1px solid #383838;
            color: #777;
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .juegos-sin-resultados {
            grid-column: 1 / -1;
            padding: 50px 20px;
            border: 1px dashed #333;
            color: #888;
            text-align: center;
        }

        @media (max-width: 1024px) {
            .juegos-galeria {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (max-width: 700px) {
            .juegos-galeria {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 20px 13px;
            }

            .juego-datos {
                padding: 13px 10px;
            }

            .juego-titulo {
                font-size: 16px;
            }

            .juego-subtitulo {
                font-size: 11px;
            }

            .juego-modal-contenido {
                grid-template-columns: 1fr;
                gap: 15px;
                padding: 22px;
            }

            .juego-modal-imagen {
                width: min(240px, 100%);
                margin: 10px auto 0;
                min-height: 0;
            }

            .juego-modal-info {
                padding-top: 0;
            }

            .juego-modal-descripcion {
                margin: 17px 0;
            }
        }

        @media (max-width: 380px) {
            .juegos-galeria {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(estilos);


    /* =========================================
       CREAR PORTADAS
    ========================================= */

    function crearPortada(juego, clase = "") {
        const contenedor = document.createElement("div");
        contenedor.className = clase;

        const fallback = document.createElement("div");
        fallback.className = "juego-portada-fallback";
        fallback.style.setProperty("--juego-color", juego.color);

        const numero = document.createElement("span");
        numero.className = "juego-fallback-numero";
        numero.textContent = juego.id;

        const titulo = document.createElement("span");
        titulo.className = "juego-fallback-titulo";
        titulo.textContent = juego.titulo;

        fallback.append(numero, titulo);
        contenedor.appendChild(fallback);

        if (juego.portada) {
            const imagen = document.createElement("img");
            imagen.className = "juego-portada";
            imagen.src = juego.portada;
            imagen.alt = `Carátula de ${juego.titulo}`;

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

    galeria.classList.add("juegos-galeria");
    galeria.replaceChildren();

    if (juegos.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "juegos-sin-resultados";
        aviso.textContent = "Próximamente habrá nuevos juegos disponibles.";
        galeria.appendChild(aviso);

        if (avisoVacio) avisoVacio.hidden = true;
        return;
    }

    if (avisoVacio) avisoVacio.hidden = true;

    juegos.forEach((juego) => {
        const tarjeta = document.createElement("button");
        tarjeta.type = "button";
        tarjeta.className = "juego-card";
        tarjeta.setAttribute(
            "aria-label",
            `Ver información de ${juego.titulo}`
        );

        const caja = crearPortada(juego, "juego-caja");

        const lomo = document.createElement("span");
        lomo.className = "juego-lomo";
        lomo.textContent = `LATWUN • ${juego.id}`;
        caja.appendChild(lomo);

        const etiqueta = document.createElement("span");
        etiqueta.className = "juego-etiqueta";
        etiqueta.textContent = juego.estado;
        caja.appendChild(etiqueta);

        const datos = document.createElement("div");
        datos.className = "juego-datos";

        const categoria = document.createElement("span");
        categoria.className = "juego-categoria";
        categoria.textContent = juego.genero;

        const titulo = document.createElement("h2");
        titulo.className = "juego-titulo";
        titulo.textContent = juego.titulo;

        const subtitulo = document.createElement("p");
        subtitulo.className = "juego-subtitulo";
        subtitulo.textContent = juego.subtitulo;

        const abrir = document.createElement("div");
        abrir.className = "juego-abrir";
        abrir.innerHTML = "<span>Ver juego</span><span>↗</span>";

        datos.append(categoria, titulo, subtitulo, abrir);
        tarjeta.append(caja, datos);

        tarjeta.addEventListener("click", () => abrirFicha(juego));

        galeria.appendChild(tarjeta);
    });


    /* =========================================
       VENTANA EMERGENTE
    ========================================= */

    const modal = document.createElement("div");
    modal.className = "juego-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Información del videojuego");

    modal.innerHTML = `
        <div class="juego-modal-fondo"></div>
        <div class="juego-modal-contenido">
            <button
                class="juego-modal-cerrar"
                type="button"
                aria-label="Cerrar ventana"
            >×</button>
            <div class="juego-modal-imagen"></div>
            <div class="juego-modal-info">
                <span class="juego-modal-numero"></span>
                <h2 class="juego-modal-titulo"></h2>
                <p class="juego-modal-subtitulo"></p>
                <p class="juego-modal-descripcion"></p>
                <div class="juego-modal-metadatos"></div>
                <div class="juego-modal-acciones"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const cerrar = modal.querySelector(".juego-modal-cerrar");
    const fondo = modal.querySelector(".juego-modal-fondo");
    const imagenModal = modal.querySelector(".juego-modal-imagen");
    const numeroModal = modal.querySelector(".juego-modal-numero");
    const tituloModal = modal.querySelector(".juego-modal-titulo");
    const subtituloModal = modal.querySelector(".juego-modal-subtitulo");
    const descripcionModal = modal.querySelector(".juego-modal-descripcion");
    const metadatosModal = modal.querySelector(".juego-modal-metadatos");
    const accionesModal = modal.querySelector(".juego-modal-acciones");

    let ultimoElemento = null;

    function abrirFicha(juego) {
        ultimoElemento = document.activeElement;

        imagenModal.replaceChildren();
        imagenModal.appendChild(crearPortada(juego).firstElementChild);

        // Si la portada existe, se muestra encima del diseño de reserva.
        if (juego.portada) {
            const img = document.createElement("img");
            img.src = juego.portada;
            img.alt = `Carátula de ${juego.titulo}`;

            img.addEventListener("error", () => {
                img.remove();
            });

            imagenModal.appendChild(img);
        }

        numeroModal.textContent = `LATWUN / GAME ${juego.id}`;
        tituloModal.textContent = juego.titulo;
        subtituloModal.textContent = juego.subtitulo;
        descripcionModal.textContent = juego.descripcion;

        metadatosModal.replaceChildren();

        [
            ["Género", juego.genero],
            ["Plataforma", juego.plataforma],
            ["Estado", juego.estado]
        ].forEach(([etiqueta, valor]) => {
            const fila = document.createElement("p");
            const nombre = document.createElement("span");
            const dato = document.createElement("span");

            nombre.textContent = etiqueta;
            dato.textContent = valor;

            fila.append(nombre, dato);
            metadatosModal.appendChild(fila);
        });

        accionesModal.replaceChildren();

        if (juego.tienda && juego.tienda.trim() !== "") {
            const boton = document.createElement("a");
            boton.className = "juego-btn-tienda";
            boton.href = juego.tienda;
            boton.target = "_blank";
            boton.rel = "noopener noreferrer";
            boton.textContent = juego.textoBoton || "Ver en la tienda";

            accionesModal.appendChild(boton);
        } else {
            const mensaje = document.createElement("span");
            mensaje.className = "juego-btn-no-disponible";
            mensaje.textContent = juego.textoBoton || "Próximamente";

            accionesModal.appendChild(mensaje);
        }

        modal.classList.add("activo");
        document.body.style.overflow = "hidden";
        cerrar.focus();
    }

    function cerrarFicha() {
        modal.classList.remove("activo");
        document.body.style.overflow = "";

        if (ultimoElemento && typeof ultimoElemento.focus === "function") {
            ultimoElemento.focus();
        }
    }

    cerrar.addEventListener("click", cerrarFicha);
    fondo.addEventListener("click", cerrarFicha);

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && modal.classList.contains("activo")) {
            cerrarFicha();
        }
    });

});
