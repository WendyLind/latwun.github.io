/* ========================= */
/* PROJECT SCROLL */
/* ========================= */

const track =
  document.getElementById("track");

const projectScroll =
  document.getElementById("projectScroll");

if(track && projectScroll){

  track.innerHTML += track.innerHTML;

  setInterval(() => {

    if(!projectScroll.matches(":hover")){

      projectScroll.scrollTop += 0.4;

      if(
        projectScroll.scrollTop >=
        track.scrollHeight / 2
      ){

        projectScroll.scrollTop = 0;

      }

    }

  },16);

}

/* ========================= */
/* MUSIC PLAYER */
/* ========================= */

const bgMusic =
  document.getElementById("bgMusic");

const musicBtn =
  document.getElementById("musicBtn");

if(bgMusic){

  bgMusic.volume = 0.35;

  bgMusic.play().catch(() => {

    console.log(
      "Autoplay bloqueado por el navegador."
    );

  });

}

if(musicBtn && bgMusic){

  musicBtn.addEventListener("click", () => {

    if(bgMusic.paused){

      bgMusic.play();

      musicBtn.textContent =
        "⏸ PAUSE";

    }else{

      bgMusic.pause();

      musicBtn.textContent =
        "▶ PLAY";

    }

  });

}
