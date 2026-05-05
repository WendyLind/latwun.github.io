// ⭐ GENERAR ESTRELLAS
document.querySelectorAll(".stars").forEach(container => {
  const rating = parseInt(container.dataset.rating);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.src = "img/star.jpg";

    if (i <= rating) {
      star.classList.add("active");
    }

    container.appendChild(star);
  }
});

// 🖱️ SCROLL MANUAL + DRAG
const right = document.querySelector(".right");
const track = document.querySelector(".movie-track");

// pausa animación
right.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

right.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});

// drag scroll
let isDown = false;
let startY;
let scrollTop;

right.addEventListener("mousedown", (e) => {
  isDown = true;
  startY = e.pageY - right.offsetTop;
  scrollTop = right.scrollTop;
});

right.addEventListener("mouseleave", () => isDown = false);
right.addEventListener("mouseup", () => isDown = false);

right.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const y = e.pageY - right.offsetTop;
  const walk = (y - startY) * 2;
  right.scrollTop = scrollTop - walk;
});
