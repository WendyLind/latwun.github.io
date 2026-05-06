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

// 🔁 LOOP SUAVE SIN ROMPER ORDEN
const track = document.getElementById("track");

setInterval(() => {
  const first = track.firstElementChild;

  track.style.transition = "transform 0.5s ease";
  track.style.transform = "translateY(-180px)";

  setTimeout(() => {
    track.appendChild(first);
    track.style.transition = "none";
    track.style.transform = "translateY(0)";
  }, 500);

}, 3000);
