document.querySelectorAll(".stars").forEach(container => {

    const rating =
    parseInt(container.dataset.rating);

    for(let i = 1; i <= 5; i++){

        const star =
        document.createElement("img");

        star.src = "img/star.jpg";

        if(i <= rating){

            star.classList.add("active");

        }

        container.appendChild(star);
    }

});

const track =
document.getElementById("track");

const movieScroll =
document.getElementById("movieScroll");

track.innerHTML += track.innerHTML;

setInterval(() => {

    if(!movieScroll.matches(":hover")){

        movieScroll.scrollTop += 0.4;

        if(
            movieScroll.scrollTop >=
            track.scrollHeight / 2
        ){

            movieScroll.scrollTop = 0;

        }

    }

},16);
