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
