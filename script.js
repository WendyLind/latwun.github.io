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

track.innerHTML += track.innerHTML;

let auto = setInterval(() => {

track.scrollTop += 0.5;

if (track.scrollTop >= track.scrollHeight / 2) {

track.scrollTop = 0;
}

}, 16);

track.addEventListener("mouseenter", () => {

clearInterval(auto);

});

track.addEventListener("mouseleave", () => {

auto = setInterval(() => {

track.scrollTop += 0.5;

if (track.scrollTop >= track.scrollHeight / 2) {

track.scrollTop = 0;
}

}, 16);

});

function showTab(tabId, event) {

document.querySelectorAll(".tab-page")
.forEach(page => {

page.classList.remove("active");

});

document.querySelectorAll(".tab-btn")
.forEach(btn => {

btn.classList.remove("active");

});

document.getElementById(tabId)
.classList.add("active");

event.target.classList.add("active");
}

const center = document.querySelector(".center");

const topPanel = document.querySelector(".center-top");

const tabPages = document.querySelectorAll(".tab-page");

tabPages.forEach(page => {

page.addEventListener("scroll", () => {

if (page.scrollTop > 30) {

topPanel.classList.add("hidden");

center.classList.add("expanded");

} else {

topPanel.classList.remove("hidden");

center.classList.remove("expanded");

}

});

});

});
