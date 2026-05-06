// ⭐ estrellas
document.querySelectorAll(".stars").forEach(container => {
  const rating = parseInt(container.dataset.rating);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.src = "img/star.jpg";

    if (i <= rating) star.classList.add("active");

    container.appendChild(star);
  }
});

// 🎬 AUTO SCROLL SUAVE
const right = document.querySelector(".right");

let autoScroll = setInterval(() => {
  right.scrollTop += 0.5;
}, 16);

// 🖱️ PAUSAR CUANDO INTERACTÚA
right.addEventListener("mouseenter", () => clearInterval(autoScroll));
right.addEventListener("mouseleave", () => {
  autoScroll = setInterval(() => {
    right.scrollTop += 0.5;
  }, 16);
});
// 🔁 LOOP INFINITO SUAVE
const trackEl = document.getElementById("track");
const container = document.querySelector(".right");

// duplicamos contenido UNA vez (no infinito)
trackEl.innerHTML += trackEl.innerHTML;

let scrolling = setInterval(() => {
  container.scrollTop += 0.5;

  // cuando llega a la mitad (fin del contenido original)
  if (container.scrollTop >= trackEl.scrollHeight / 2) {
    container.scrollTop = 0;
  }
}, 16);

// pausa al interactuar (mantiene lo que ya tenías)
container.addEventListener("mouseenter", () => clearInterval(scrolling));
container.addEventListener("mouseleave", () => {
  scrolling = setInterval(() => {
    container.scrollTop += 0.5;
    if (container.scrollTop >= trackEl.scrollHeight / 2) {
      container.scrollTop = 0;
    }
  }, 16);
});

/* VHS MÁS INTENSO */
.vhs-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;

  background:
    repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 1px,
      transparent 1px,
      transparent 3px
    ),
    linear-gradient(
      rgba(255,0,255,0.02),
      rgba(0,255,255,0.02)
    );

  animation: vhsFlicker 0.12s infinite;
}

@keyframes vhsFlicker {
  0% { opacity: 0.85; }
  50% { opacity: 1; }
  100% { opacity: 0.9; }
}

/* micro distorsión */
body {
  animation: vhsShift 5s infinite;
}

@keyframes vhsShift {
  0% { transform: translate(0,0); }
  50% { transform: translate(0.3px,-0.3px); }
  100% { transform: translate(0,0); }
}
