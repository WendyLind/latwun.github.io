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
