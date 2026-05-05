// ⭐ ESTRELLAS
document.querySelectorAll(".stars").forEach(container => {
  const rating = parseInt(container.dataset.rating);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.src = "img/star.jpg";

    if (i <= rating) star.classList.add("active");

    container.appendChild(star);
  }
});

// 🎬 CARRUSEL INFINITO FAKE
const right = document.querySelector(".right");
const track = document.querySelector(".movie-track");

right.addEventListener("wheel", (e) => {
  e.preventDefault();
  right.scrollTop += e.deltaY;

  const first = track.firstElementChild;
  const last = track.lastElementChild;

  // si baja mucho → mueve el primero al final
  if (right.scrollTop > 150) {
    track.appendChild(first);
    right.scrollTop -= 150;
  }

  // si sube mucho → mueve el último arriba
  if (right.scrollTop < 0) {
    track.prepend(last);
    right.scrollTop += 150;
  }
});

// 🖱️ DRAG SCROLL
let isDown = false;
let startY, scrollTop;

right.addEventListener("mousedown", (e) => {
  isDown = true;
  startY = e.pageY;
  scrollTop = right.scrollTop;
});

right.addEventListener("mouseup", () => isDown = false);

right.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  const y = e.pageY;
  right.scrollTop = scrollTop - (y - startY);
});
