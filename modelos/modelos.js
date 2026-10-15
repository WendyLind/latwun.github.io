
/* =========================================
   LATWUN — GALERÍA DE MODELOS 3D
   Archivo: modelos/modelos.js
   Visor: Sketchfab
========================================= */


/* =========================================
   1. BASE DE DATOS DE MODELOS
========================================= */

const LISTA_MODELOS = [
    {
        id: "001",
        titulo: "Tostadora Cartoon Retro",
        descripcion:
            "Un asset tridimensional low poly con texturas estilizadas a mano. Diseñado para entornos interactivos, cocinas de horror psicológico o juegos casuales.",
        sketchfabId: "fa98413ce9184ae89cc9071e9b5d0b2e",
        slug: "tostadora-low-poly-cartoon",
        gifPortada: "001/portada.gif",
        linkItch: "https://latwun.itch.io/tostadora-low-poly-cartoon",
        linkCGTrader: "https://www.cgtrader.com/free-3d-models/furniture/kitchen-furniture/tostadora-low-poly-cartoon"
    },
    {
        id: "002",
        titulo: "Mansion - Low Poly",
        descripcion:
            "Estructura modular de una mansión victoriana abandonada. Pensada para proyectos de terror, exploración y videojuegos de estética retro.",
        sketchfabId: "c0c94a6d56f441dbb698afe67029ba2c",
        slug: "mansion-terror-low-poly",
        gifPortada: "002/portada.gif",
        linkItch: "https://latwun.itch.io/low-poly-cartoon-mansion-game-ready-3d",
        linkCGTrader: "https://www.cgtrader.com/3d-models/exterior/house/low-poly-cartoon-mansion-game-ready-3d-environment"
    },
    {
        id: "003",
        titulo: "Máquina Expendedora Retro",
        descripcion:
            "Asset clásico de una máquina expendedora desgastada, con iluminación interna emisiva. Ideal para pasillos oscuros, estaciones de metro y juegos survival horror.",
        sketchfabId: "3431ef085f0a40b3941bdda61491b597",
        slug: "vending-machine-low-poly",
        gifPortada: "003/portada.gif",
        linkItch: "https://latwun.itch.io/vending-machine-low-poly-game-ready-3d-model-low-poly-3d-model",
        linkCGTrader: "https://www.cgtrader.com/3d-models/furniture/other/vending-machine-low-poly-game-ready-3d-model"
    },
    {
        id: "004",
        titulo: "Lagarto Demonio Mutante",
        descripcion:
            "Criatura hostil de estética low poly, diseñada para videojuegos de terror retro y escenarios con limitaciones gráficas.",
        sketchfabId: "a2e4920dbb214a42b228a6d8aa5264b1",
        slug: "lagarto-demonio-low-poly",
        gifPortada: "004/portada.gif",
        linkItch: "https://latwun.itch.io/lagarto-demonio-low-poly-game-ready",
        linkCGTrader: "https://www.cgtrader.com/free-3d-models/animal/other/lagarto-demonio-low-poly-game-ready"
    },
    {
        id: "005",
        titulo: "Cocina Abandonada Pack",
        descripcion:
            "Conjunto de muebles, electrodomésticos y utensilios corroídos para ambientar videojuegos experimentales, simuladores y escenarios de horror.",
        sketchfabId: "0650902787074a3989f00e684bc309a6",
        slug: "kitchen-low-poly-game-asset",
        gifPortada: "005/portada.gif",
        linkItch: "https://latwun.itch.io/kitchen-low-poly-game-asset",
        linkCGTrader: "https://www.cgtrader.com/3d-models/exterior/house/kitchen-low-poly-game-asset"
    }
];


/* =========================================
   2. ESTILOS DE LA GALERÍA Y EL VISOR
========================================= */

function agregarEstilosModelos() {
    if (document.getElementById("estilosModelosDinamicos")) return;

    const estilos = document.createElement("style");
    estilos.id = "estilosModelosDinamicos";

    estilos.textContent = `
        :root {
            --modelos-acento: #c7ff3d;
            --modelos-fondo: #080808;
            --modelos-panel: #111111;
            --modelos-texto: #f5f5f5;
            --modelos-secundario: #a5a5a5;
            --modelos-borde: #292929;
        }

        #modelosGaleria {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 24px;
            width: 100%;
        }

        .modelo-card {
            display: flex;
            flex-direction: column;
            min-width: 0;
            color: var(--modelos-texto);
            background: var(--modelos-panel);
            border: 1px solid var(--modelos-borde);
            border-radius: 10px;
            overflow: hidden;
            text-decoration: none;
            cursor: pointer;
            transition:
                transform .25s ease,
                border-color .25s ease,
                box-shadow .25s ease;
        }

        .modelo-card:hover {
            transform: translateY(-5px);
            border-color: var(--modelos-acento);
            box-shadow: 0 8px 30px #c7ff3d12;
        }

        .modelo-card-imagen {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 3;
            overflow: hidden;
            background:
                radial-gradient(ellipse at center, #202020, #090909);
        }

        .modelo-card-imagen img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            transition: transform .4s ease;
        }

        .modelo-card:hover .modelo-card-imagen img {
            transform: scale(1.045);
        }

        .modelo-card-fallback {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            padding: 20px;
            color: var(--modelos-secundario);
            text-align: center;
            background:
                repeating-linear-gradient(
                    135deg,
                    #ffffff05 0,
                    #ffffff05 1px,
                    transparent 1px,
                    transparent 12px
                );
        }

        .modelo-card-fallback strong {
            color: var(--modelos-acento);
            font-size: 1.5rem;
        }

        .modelo-card-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 17px;
        }

        .modelo-card-texto {
            min-width: 0;
        }

        .modelo-card-numero {
            display: block;
            margin-bottom: 7px;
            color: var(--modelos-acento);
            font-size: .75rem;
            letter-spacing: 2px;
        }

        .modelo-card-titulo {
            margin: 0;
            color: var(--modelos-texto);
            font-size: 1rem;
            line-height: 1.4;
            overflow-wrap: anywhere;
        }

        .modelo-card-flecha {
            flex-shrink: 0;
            color: var(--modelos-acento);
            font-size: 1.5rem;
            transition: transform .2s ease;
        }

        .modelo-card:hover .modelo-card-flecha {
            transform: translate(3px, -3px);
        }

        #modelosVacio {
            color: var(--modelos-secundario);
            text-align: center;
        }

        /* MODAL */

        .visor-modal {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .visor-modal.visor-activo {
            display: flex;
        }

        .visor-overlay {
            position: absolute;
            inset: 0;
            background: #000000e8;
            backdrop-filter: blur(8px);
        }

        .visor-contenedor {
            position: relative;
            z-index: 1;
            width: min(1200px, 100%);
            max-height: 90vh;
            overflow: auto;
            color: var(--modelos-texto);
            background: var(--modelos-fondo);
            border: 1px solid #383838;
            border-radius: 12px;
            box-shadow: 0 25px 90px #00000090;
        }

        .visor-cerrar {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            padding: 0;
            color: white;
            background: #111111dd;
            border: 1px solid #444;
            border-radius: 50%;
            font-size: 1.8rem;
            cursor: pointer;
            transition: color .2s, border-color .2s;
        }

        .visor-cerrar:hover {
            color: var(--modelos-acento);
            border-color: var(--modelos-acento);
        }

        .visor-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
            min-height: 500px;
        }

        .visor-render {
            position: relative;
            min-width: 0;
            min-height: 500px;
            background: #050505;
        }

        .visor-render iframe {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 500px;
            border: 0;
        }

        .visor-render-mensaje {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            min-height: 500px;
            padding: 32px;
            color: var(--modelos-secundario);
            text-align: center;
        }

        .visor-render-mensaje strong {
            color: var(--modelos-acento);
            font-size: 1.2rem;
        }

        .visor-render-mensaje img {
            display: block;
            width: min(100%, 350px);
            max-height: 220px;
            object-fit: contain;
        }

        .visor-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 64px 28px 28px;
            border-left: 1px solid var(--modelos-borde);
        }

        .visor-numero {
            margin-bottom: 12px;
            color: var(--modelos-acento);
            font-size: .8rem;
            letter-spacing: 3px;
        }

        .visor-titulo {
            margin: 0 0 18px;
            font-size: clamp(1.4rem, 3vw, 2rem);
            line-height: 1.25;
            overflow-wrap: anywhere;
        }

        .visor-descripcion {
            margin: 0;
            color: #bdbdbd;
            font-size: .95rem;
            line-height: 1.8;
            white-space: pre-line;
        }

        .visor-acciones {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            margin-top: auto;
            padding-top: 30px;
        }

        .visor-acciones a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 46px;
            padding: 12px 15px;
            color: #080808;
            background: var(--modelos-acento);
            border: 1px solid var(--modelos-acento);
            border-radius: 5px;
            font-size: .78rem;
            font-weight: 800;
            letter-spacing: .6px;
            text-align: center;
            text-decoration: none;
            transition: background .2s, color .2s;
        }

        .visor-acciones a:hover {
            color: var(--modelos-acento);
            background: transparent;
        }

        .visor-acciones a[hidden] {
            display: none !important;
        }

        @media (max-width: 900px) {
            #modelosGaleria {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 18px;
            }

            .visor-layout {
                grid-template-columns: 1fr;
            }

            .visor-render,
            .visor-render iframe {
                min-height: 380px;
            }

            .visor-info {
                min-height: 300px;
                padding: 30px 24px 24px;
                border-top: 1px solid var(--modelos-borde);
                border-left: 0;
            }

            .visor-acciones {
                margin-top: 25px;
            }
        }

        @media (max-width: 560px) {
            #modelosGaleria {
                grid-template-columns: 1fr;
                gap: 16px;
            }

            .visor-modal {
                padding: 10px;
            }

            .visor-contenedor {
                max-height: 95vh;
            }

            .visor-render,
            .visor-render iframe {
                min-height: 270px;
            }

            .visor-info {
                padding: 28px 18px 20px;
            }
        }
    `;

    document.head.appendChild(estilos);
}


/* =========================================
   3. INICIALIZAR LA GALERÍA
========================================= */

function inicializarGaleriaModelos() {
    const contenedorGaleria =
        document.getElementById("modelosGaleria");

    const contenedorVacio =
        document.getElementById("modelosVacio");

    if (!contenedorGaleria) {
        console.warn(
            "LATWUN: No se encontró #modelosGaleria en el HTML."
        );
        return;
    }

    agregarEstilosModelos();

    if (LISTA_MODELOS.length === 0) {
        if (contenedorVacio) {
            contenedorVacio.hidden = false;
        }
        return;
    }

    contenedorGaleria.replaceChildren();

    LISTA_MODELOS.forEach(modelo => {
        const tarjeta = document.createElement("a");

        tarjeta.href = "#";
        tarjeta.className = "modelo-card";
        tarjeta.dataset.id = modelo.id;
        tarjeta.setAttribute(
            "aria-label",
            `Ver modelo 3D: ${modelo.titulo}`
        );

        tarjeta.innerHTML = `
            <div class="modelo-card-imagen">
                <div class="modelo-card-fallback">
                    <strong>3D</strong>
                    <span>Vista previa no disponible</span>
                </div>

                <img
                    src="${modelo.gifPortada}"
                    alt="${modelo.titulo}"
                    loading="lazy"
                >
            </div>

            <div class="modelo-card-info">
                <div class="modelo-card-texto">
                    <span class="modelo-card-numero">
                        #${modelo.id}
                    </span>

                    <h3 class="modelo-card-titulo">
                        ${modelo.titulo}
                    </h3>
                </div>

                <span class="modelo-card-flecha" aria-hidden="true">
                    ↗
                </span>
            </div>
        `;

        const imagen = tarjeta.querySelector("img");

        imagen.addEventListener("error", () => {
            imagen.remove();
        });

        tarjeta.addEventListener("click", evento => {
            evento.preventDefault();
            abrirVisor3D(modelo);
        });

        contenedorGaleria.appendChild(tarjeta);
    });

    if (contenedorVacio) {
        contenedorVacio.hidden = true;
    }

    crearEstructuraModal();
}


/* =========================================
   4. CONSTRUIR EL MODAL
========================================= */

function crearEstructuraModal() {
    if (document.getElementById("visor3DModal")) return;

    const modal = document.createElement("div");

    modal.id = "visor3DModal";
    modal.className = "visor-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "visorTitulo");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="visor-overlay"></div>

        <div class="visor-contenedor">
            <button
                class="visor-cerrar"
                type="button"
                aria-label="Cerrar visor"
            >&times;</button>

            <div class="visor-layout">
                <div
                    class="visor-render"
                    id="zonaRender3D"
                ></div>

                <div class="visor-info">
                    <span
                        class="visor-numero"
                        id="visorNumero"
                    >#000</span>

                    <h2
                        class="visor-titulo"
                        id="visorTitulo"
                    >Nombre del modelo</h2>

                    <p
                        class="visor-descripcion"
                        id="visorDescripcion"
                    ></p>

                    <div class="visor-acciones">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="btnItch"
                            hidden
                        >VER EN ITCH.IO ↗</a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="btnCGTrader"
                            hidden
                        >VER EN CGTRADER ↗</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".visor-cerrar")
        .addEventListener("click", cerrarVisor3D);

    modal.querySelector(".visor-overlay")
        .addEventListener("click", cerrarVisor3D);

    modal.querySelector(".visor-contenedor")
        .addEventListener("click", evento => {
            evento.stopPropagation();
        });

    document.addEventListener("keydown", evento => {
        if (
            evento.key === "Escape" &&
            modal.classList.contains("visor-activo")
        ) {
            cerrarVisor3D();
        }
    });
}


/* =========================================
   5. COMPROBAR EL ID DE SKETCHFAB
========================================= */

function tieneSketchfabValido(modelo) {
    if (!modelo.sketchfabId) return false;

    const id = modelo.sketchfabId.trim();

    if (
        !id ||
        id.startsWith("tu-id-") ||
        id.includes("aqui") ||
        id.includes(" ")
    ) {
        return false;
    }

    return /^[a-zA-Z0-9_-]+$/.test(id);
}


/* =========================================
   6. ABRIR EL VISOR 3D
========================================= */

function abrirVisor3D(modelo) {
    crearEstructuraModal();

    const modal = document.getElementById("visor3DModal");
    const zonaRender = document.getElementById("zonaRender3D");

    if (!modal || !zonaRender) return;

    document.getElementById("visorNumero").textContent =
        `#${modelo.id}`;

    document.getElementById("visorTitulo").textContent =
        modelo.titulo;

    document.getElementById("visorDescripcion").textContent =
        modelo.descripcion;

    configurarBoton(
        "btnItch",
        modelo.linkItch
    );

    configurarBoton(
        "btnCGTrader",
        modelo.linkCGTrader
    );

    zonaRender.replaceChildren();

    if (tieneSketchfabValido(modelo)) {
        const iframe = document.createElement("iframe");

        iframe.title = modelo.titulo;
        iframe.src =
            `https://sketchfab.com/models/${encodeURIComponent(
                modelo.sketchfabId
            )}/embed?autostart=1&ui_theme=dark`;

        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute(
            "allow",
            "autoplay; fullscreen; xr-spatial-tracking"
        );

        iframe.loading = "lazy";

        zonaRender.appendChild(iframe);
    } else {
        const mensaje = document.createElement("div");
        mensaje.className = "visor-render-mensaje";

        const titulo = document.createElement("strong");
        titulo.textContent = "Visor 3D pendiente";

        const texto = document.createElement("p");
        texto.textContent =
            "Añade el ID real de este modelo de Sketchfab para activar la vista interactiva.";

        mensaje.append(titulo, texto);

        if (modelo.gifPortada) {
            const imagen = document.createElement("img");
            imagen.src = modelo.gifPortada;
            imagen.alt = `Vista previa de ${modelo.titulo}`;

            imagen.addEventListener("error", () => {
                imagen.remove();
            });

            mensaje.prepend(imagen);
        }

        zonaRender.appendChild(mensaje);
    }

    modal.classList.add("visor-activo");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    modal.querySelector(".visor-cerrar").focus();
}


/* =========================================
   7. CONFIGURAR BOTONES EXTERNOS
========================================= */

function configurarBoton(id, url) {
    const boton = document.getElementById(id);

    if (!boton) return;

    const direccion = (url || "").trim();

    const esUrlValida =
        /^https?:\/\/[^\s]+$/i.test(direccion);

    if (esUrlValida) {
        boton.href = direccion;
        boton.hidden = false;
    } else {
        boton.removeAttribute("href");
        boton.hidden = true;
    }
}


/* =========================================
   8. CERRAR EL VISOR
========================================= */

function cerrarVisor3D() {
    const modal = document.getElementById("visor3DModal");

    if (!modal) return;

    modal.classList.remove("visor-activo");
    modal.setAttribute("aria-hidden", "true");

    // Elimina el iframe para detener el modelo y su audio.
    const zonaRender = document.getElementById("zonaRender3D");

    if (zonaRender) {
        zonaRender.replaceChildren();
    }

    document.body.style.overflow = "";
}


/* =========================================
   9. ARRANCAR
========================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        inicializarGaleriaModelos
    );
} else {
    inicializarGaleriaModelos();
}
