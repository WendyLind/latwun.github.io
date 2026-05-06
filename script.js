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

// 🔁 LOOP INFINITO SUAVE
const track = document.getElementById("track");
const container = document.querySelector(".right");

// duplicamos contenido una vez
track.innerHTML += track.innerHTML;

let auto = setInterval(() => {
  container.scrollTop += 0.5;

  if (container.scrollTop >= track.scrollHeight / 2) {
    container.scrollTop = 0;
  }
}, 16);

// pausa al interactuar
container.addEventListener("mouseenter", () => clearInterval(auto));
container.addEventListener("mouseleave", () => {
  auto = setInterval(() => {
    container.scrollTop += 0.5;
    if (container.scrollTop >= track.scrollHeight / 2) {
      container.scrollTop = 0;
    }
  }, 16);
});
