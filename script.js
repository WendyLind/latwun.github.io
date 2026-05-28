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

const moviesContainer =
  document.querySelector(".movies-container");

track.innerHTML += track.innerHTML;

setInterval(() => {

  if (!moviesContainer.matches(":hover")) {

    moviesContainer.scrollTop += 0.4;

    if (
      moviesContainer.scrollTop >=
      track.scrollHeight / 2
    ) {

      moviesContainer.scrollTop = 0;
    }
  }

}, 16);

const topSection =
  document.querySelector(".top-section");

const contentSection =
  document.querySelector(".content-section");

contentSection.addEventListener("scroll", () => {

  if (contentSection.scrollTop > 40) {

    topSection.classList.add("collapsed");

  } else {

    topSection.classList.remove("collapsed");
  }

});

const tabs = document.querySelectorAll(".tab");

const contents =
  document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t =>
      t.classList.remove("active")
    );

    contents.forEach(c =>
      c.classList.remove("active")
    );

    tab.classList.add("active");

    document
      .getElementById(tab.dataset.tab)
      .classList.add("active");

  });

});
