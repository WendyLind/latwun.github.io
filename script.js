// ⭐ ESTRELLAS

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

// =========================
// 🎬 CARRUSEL
// =========================

const track = document.getElementById("track");

// duplicar contenido

track.innerHTML += track.innerHTML;

// scroll automático

let auto = setInterval(() => {

  track.scrollTop += 0.5;

  // loop infinito

  if (track.scrollTop >= track.scrollHeight / 2) {

    track.scrollTop = 0;
  }

}, 16);

// pausa hover

track.addEventListener("mouseenter", () => {

  clearInterval(auto);

});

// reanudar

track.addEventListener("mouseleave", () => {

  auto = setInterval(() => {

    track.scrollTop += 0.5;

    if (track.scrollTop >= track.scrollHeight / 2) {

      track.scrollTop = 0;
    }

  }, 16);

});
