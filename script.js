// ========================================
// config tmdb with gpt le goat
// ========================================

// ⚠️ Mets ton token TMDB entre les guillemets
// NE PUBLIE PAS ce fichier avec ton vrai token sur GitHub.
const TMDB_TOKEN = "COLLE_TON_TOKEN_ICI";


// ========================================
// recup les donne html
// ========================================

const moviesGrid = document.getElementById("moviesGrid");

const movieTitle = document.getElementById("movieTitle");
const movieYear = document.getElementById("movieYear");

const addMovieButton = document.getElementById("addMovie");

const openForm = document.getElementById("openForm");
const openFormHero = document.getElementById("openFormHero");

const addSection = document.getElementById("addSection");

const movieCount = document.getElementById("movieCount");


// ========================================
// ouvre le formulaire
// ========================================

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


// ========================================
// cherche le film sur tmdb
// ========================================

async function rechercherFilm(titre, annee) {

    const url = new URL(
        "https://api.themoviedb.org/3/search/movie"
    );

    // Nom du film
    url.searchParams.set("query", titre);

    // Langue française
    url.searchParams.set("language", "fr-FR");

    // Région française
    url.searchParams.set("region", "FR");

    // Évite les contenus adultes
    url.searchParams.set("include_adult", "false");

    // Si une année est renseignée
    if (annee !== "") {
        url.searchParams.set("year", annee);
    }


    const response = await fetch(url, {

        method: "GET",

        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            accept: "application/json"
        }

    });


    if (!response.ok) {
        throw new Error("Erreur avec TMDB");
    }


    const data = await response.json();

    return data.results;
}


// ========================================
// ajoute le film a la page
// ========================================

function afficherFilm(film) {

    const carte = document.createElement("article");

    carte.classList.add("movie-card");


    // Construire l'URL de l'affiche
    let imageHTML;

    if (film.poster_path) {

        const imageURL =
            `https://image.tmdb.org/t/p/w500${film.poster_path}`;

        imageHTML = `
            <img
                src="${imageURL}"
                alt="Affiche de ${film.title}"
            >
        `;

    } else {

        imageHTML = `
            <div class="poster-placeholder">
                🎬
            </div>
        `;

    }


    // année du film
    let annee = "Année inconnue";

    if (film.release_date) {
        annee = film.release_date.substring(0, 4);
    }


    // créer la carte
    carte.innerHTML = `

        <div class="movie-poster">

            ${imageHTML}

        </div>


        <div class="movie-info">

            <h3>${film.title}</h3>

            <p>${annee}</p>

        </div>

    `;


    moviesGrid.appendChild(carte);


    updateMovieCount();
}


// ========================================
// bouton ajouter
// ========================================

addMovieButton.addEventListener("click", async function () {

    const titre = movieTitle.value.trim();
    const annee = movieYear.value.trim();


    // vérifier le nom
    if (titre === "") {

        alert("Écris le nom du film.");

        return;
    }


    // vérifier le token
    if (
        TMDB_TOKEN === "" ||
        TMDB_TOKEN === "COLLE_TON_TOKEN_ICI"
    ) {

        alert("Tu dois mettre ton token TMDB dans script.js.");

        return;
    }


    // modifier le bouton pendant la recherche
    addMovieButton.textContent = "Recherche...";

    addMovieButton.disabled = true;


    try {

        // rechercher du film
        const films = await rechercherFilm(titre, annee);


        // aucun résultat(force bg)
        if (films.length === 0) {

            alert("Film introuvable sur TMDB.");

            return;
        }


        // prend le premier résultat
        const film = films[0];


        // afficher le film
        afficherFilm(film);


        // vider les champs
        movieTitle.value = "";
        movieYear.value = "";


    } catch (error) {

        console.error(error);

        alert(
            "Impossible de contacter TMDB. Vérifie ton token et ta connexion."
        );


    } finally {

        // remet le bouton normal
        addMovieButton.textContent = "Ajouter";

        addMovieButton.disabled = false;

    }

});


// ========================================
// compte
// ========================================

function updateMovieCount() {

    const numberOfMovies =
        moviesGrid.querySelectorAll(".movie-card").length;

    movieCount.textContent = numberOfMovies;

}
