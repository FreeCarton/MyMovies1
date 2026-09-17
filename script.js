// =========================
// RÉCUPÉRER LES ÉLÉMENTS HTML
// =========================

const moviesGrid = document.getElementById("moviesGrid");

const movieTitle = document.getElementById("movieTitle");
const movieYear = document.getElementById("movieYear");
const movieImage = document.getElementById("movieImage");

const addMovieButton = document.getElementById("addMovie");

const openForm = document.getElementById("openForm");
const openFormHero = document.getElementById("openFormHero");

const addSection = document.getElementById("addSection");

const movieCount = document.getElementById("movieCount");


// =========================
// ouvre le formulaire
// =========================

openForm.addEventListener("click", function () {

    addSection.scrollIntoView({
        behavior: "smooth"
    });

});


openFormHero.addEventListener("click", function () {

    addSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// ajout du fiml
// =========================

addMovieButton.addEventListener("click", function () {

    const titre = movieTitle.value.trim();
    const annee = movieYear.value.trim();
    const image = movieImage.value.trim();


    // vérifier que le titre est complet

    if (titre === "") {

        alert("Écris le nom du film.");

        return;
    }


    // créer la carte du film

    const carte = document.createElement("article");

    carte.classList.add("movie-card");


    // créer le contenu ce celle-ci

    carte.innerHTML = `

        <div class="movie-poster">

            ${
                image
                ? `<img src="${image}" alt="${titre}">`
                : `<div class="poster-placeholder">🎬</div>`
            }

        </div>


        <div class="movie-info">

            <h3>${titre}</h3>

            <p>${annee || "Année inconnue"}</p>

        </div>

    `;


    // ajouter la carte à la grille

    moviesGrid.appendChild(carte);


    // Mets à jour le nombre de film

    updateMovieCount();


    // vide les champs

    movieTitle.value = "";
    movieYear.value = "";
    movieImage.value = "";

});


// =========================
// compte les films
// =========================

function updateMovieCount() {

    const numberOfMovies =
        moviesGrid.querySelectorAll(".movie-card").length;

    movieCount.textContent = numberOfMovies;

}
