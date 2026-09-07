const track = document.getElementById("projectTrack");

const prevButton = document.getElementById("projectPrev");

const nextButton = document.getElementById("projectNext");

const indicators = document.getElementById("projectIndicators");

const projects = document.querySelectorAll(".project-card");

let currentPosition = 0;

const totalPositions = Math.ceil(projects.length / 2);



function updateProjects() {

    const isMobile = window.innerWidth <= 800;

    if (isMobile) {

        track.style.transform =
            `translateX(-${currentPosition * 100}%)`;

    } else {

        track.style.transform =
            `translateX(-${currentPosition * 100}%)`;

    }


    document
        .querySelectorAll(".project-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPosition
            );

        });

}



function createIndicators() {

    indicators.innerHTML = "";


    for (let i = 0; i < totalPositions; i++) {

        const dot = document.createElement("span");

        dot.classList.add("project-dot");


        if (i === 0) {

            dot.classList.add("active");

        }


        dot.addEventListener("click", () => {

            currentPosition = i;

            updateProjects();

        });


        indicators.appendChild(dot);

    }

}



nextButton.addEventListener("click", () => {

    currentPosition++;

    if (currentPosition >= totalPositions) {

        currentPosition = 0;

    }

    updateProjects();

});



prevButton.addEventListener("click", () => {

    currentPosition--;

    if (currentPosition < 0) {

        currentPosition = totalPositions - 1;

    }

    updateProjects();

});



createIndicators();

updateProjects();
