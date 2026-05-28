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

const track = document.getElementById("track");

const container = document.getElementById("movieContainer");

track.innerHTML += track.innerHTML;

function autoScrollMovies() {

  container.scrollTop += 0.45;

  if (container.scrollTop >= track.scrollHeight / 2) {

    container.scrollTop = 0;
  }
}

let autoScroll = setInterval(autoScrollMovies, 16);

container.addEventListener("mouseenter", () => {

  clearInterval(autoScroll);
});

container.addEventListener("mouseleave", () => {

  autoScroll = setInterval(autoScrollMovies, 16);
});

const bottomPanel = document.getElementById("bottomPanel");

const centerColumn = document.querySelector(".center-column");

bottomPanel.addEventListener("scroll", () => {

  if (bottomPanel.scrollTop > 40) {

    centerColumn.classList.add("scrolled");

  } else {

    centerColumn.classList.remove("scrolled");
  }
});

const crtButton = document.getElementById("crt-toggle");

const overlay = document.querySelector(".vhs-overlay");

let crtEnabled = true;

crtButton.addEventListener("click", () => {

  crtEnabled = !crtEnabled;

  if (crtEnabled) {

    overlay.style.display = "block";

    crtButton.innerText = "CRT: ON";

  } else {

    overlay.style.display = "none";

    crtButton.innerText = "CRT: OFF";
  }
});
