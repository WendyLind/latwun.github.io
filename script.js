// 🎬 MODAL
function openMovie(title, desc, rating) {
  movieModal.style.display = "flex";
  movieTitle.innerText = title;
  movieDesc.innerText = desc;
  movieRating.innerText = rating;
}

function closeMovie() {
  movieModal.style.display = "none";
}

// ⭐ ESTRELLAS DINÁMICAS
document.querySelectorAll(".stars").forEach(container => {
  const rating = parseInt(container.dataset.rating);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("img");
    star.src = "img/star.jpg";
    star.classList.add("star");

    if (i <= rating) star.classList.add("active");

    container.appendChild(star);
  }
});

// 🎬 CONTROL SCROLL + PAUSA
const right = document.querySelector(".right");
const track = document.querySelector(".movie-track");

right.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

right.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});

// 🖱 DRAG SCROLL
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

// 🎵 PLAYER
const songs = ["music/song1.mp3"];
let index = 0;
const audio = document.getElementById("audio");

function loadSong() {
  audio.src = songs[index];
  songName.innerText = songs[index];
}

function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong();
  audio.play();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
  audio.play();
}

loadSong();

// 🖱 DRAG PLAYER
const player = document.getElementById("musicPlayer");

player.onmousedown = function(e) {
  let shiftX = e.clientX - player.offsetLeft;
  let shiftY = e.clientY - player.offsetTop;

  function move(e) {
    player.style.left = e.pageX - shiftX + "px";
    player.style.top = e.pageY - shiftY + "px";
  }

  document.addEventListener("mousemove", move);

  document.onmouseup = () => {
    document.removeEventListener("mousemove", move);
  };
};
