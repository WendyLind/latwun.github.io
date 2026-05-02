// 🎬 MODAL
function openMovie(title, desc, rating) {
  document.getElementById("movieModal").style.display = "flex";
  document.getElementById("movieTitle").innerText = title;
  document.getElementById("movieDesc").innerText = desc;
  document.getElementById("movieRating").innerText = rating;
}

function closeMovie() {
  document.getElementById("movieModal").style.display = "none";
}

// 🎵 MUSIC PLAYER
const songs = [
  "music/song1.mp3",
  "music/song2.mp3",
  "music/song3.mp3"
];

let index = 0;
const audio = document.getElementById("audio");

function loadSong() {
  audio.src = songs[index];
  document.getElementById("songName").innerText = songs[index];
}

function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
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

// 🖱️ DRAG PLAYER
const player = document.getElementById("musicPlayer");

player.onmousedown = function(e) {
  let shiftX = e.clientX - player.getBoundingClientRect().left;
  let shiftY = e.clientY - player.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    player.style.left = pageX - shiftX + 'px';
    player.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
};
