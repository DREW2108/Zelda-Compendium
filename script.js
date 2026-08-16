// =========================================================
// INICIALIZACIÓN
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    initializeGameSelector();

    initializeSearch();

    initializeNavigation();

});


// =========================================================
// ELEMENTOS
// =========================================================

const body = document.body;

const gameButtons =
    document.querySelectorAll("[data-game-select]");

const welcomeTitle =
    document.getElementById("welcomeTitle");

const welcomeDescription =
    document.getElementById("welcomeDescription");

const gameImage =
    document.getElementById("gameImage");

const mainPanel =
    document.querySelector(".main-panel");


// =========================================================
// DATOS DE LOS JUEGOS
// =========================================================

const games = {

    botw: {

        title: "Breath of the Wild",

        description:
            "Descubre armas, enemigos, lugares, materiales y secretos de Hyrule.",

        image: "images/botw.jpg"

    },


    totk: {

        title: "Tears of the Kingdom",

        description:
            "Explora Hyrule, las islas del cielo y las profundidades en una nueva aventura.",

        image: "images/totk.jpg"

    },


    all: {

        title: "Hyrule",

        description:
            "Explora todo el contenido de Breath of the Wild y Tears of the Kingdom.",

        image: "images/botw-totk.jpg"

    }

};


// =========================================================
// DATOS PARA EL BUSCADOR
// =========================================================

const compendium = [

    // =========================
    // ARMAS
    // =========================

    {
        name: "Espada Maestra",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },

    {
        name: "Espada de Soldado",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },

    {
        name: "Espada de Caballero",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },

    {
        name: "Espada de la Guardia Real",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },

    {
        name: "Espada de Boko",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },

    {
        name: "Espada de Lizalfos",
        type: "Armas",
        game: "Ambos juegos",
        icon: "swords"
    },


    // =========================
    // ESCUDOS
    // =========================

    {
        name: "Escudo Hyliano",
        type: "Escudos",
        game: "Ambos juegos",
        icon: "shield"
    },

    {
        name: "Escudo de Soldado",
        type: "Escudos",
        game: "Ambos juegos",
        icon: "shield"
    },

    {
        name: "Escudo de Caballero",
        type: "Escudos",
        game: "Ambos juegos",
        icon: "shield"
    },

    {
        name: "Escudo de Boko",
        type: "Escudos",
        game: "Ambos juegos",
        icon: "shield"
    },


    // =========================
    // ARCOS
    // =========================

    {
        name: "Arco de Soldado",
        type: "Arcos",
        game: "Ambos juegos",
        icon: "bow-arrow"
    },

    {
        name: "Arco de Caballero",
        type: "Arcos",
        game: "Ambos juegos",
        icon: "bow-arrow"
    },

    {
        name: "Arco de la Guardia Real",
        type: "Arcos",
        game: "Ambos juegos",
        icon: "bow-arrow"
    },

    {
        name: "Arco de Boko",
        type: "Arcos",
        game: "Ambos juegos",
        icon: "bow-arrow"
    },


    // =========================
    // ARMADURAS
    // =========================

    {
        name: "Túnica del Héroe",
        type: "Armaduras",
        game: "Ambos juegos",
        icon: "shirt"
    },

    {
        name: "Capucha Hyliana",
        type: "Armaduras",
        game: "Ambos juegos",
        icon: "shirt"
    },

    {
        name: "Armadura Hyliana",
        type: "Armaduras",
        game: "Ambos juegos",
        icon: "shirt"
    },

    {
        name: "Conjunto de Sigilo",
        type: "Armaduras",
        game: "Ambos juegos",
        icon: "shirt"
    },


    // =========================
    // ENEMIGOS
    // =========================

    {
        name: "Bokoblin",
        type: "Enemigos",
        game: "Ambos juegos",
        icon: "skull"
    },

    {
        name: "Moblin",
        type: "Enemigos",
        game: "Ambos juegos",
        icon: "skull"
    },

    {
        name: "Lizalfos",
        type: "Enemigos",
        game: "Ambos juegos",
        icon: "skull"
    },

    {
        name: "Guardian",
        type: "Enemigos",
        game: "Breath of the Wild",
        icon: "skull"
    },

    {
        name: "Gleeok",
        type: "Enemigos",
        game: "Tears of the Kingdom",
        icon: "skull"
    },

    {
        name: "Lynel",
        type: "Enemigos",
        game: "Ambos juegos",
        icon: "skull"
    },


    // =========================
    // MATERIALES
    // =========================

    {
        name: "Diamante",
        type: "Materiales",
        game: "Ambos juegos",
        icon: "gem"
    },

    {
        name: "Rubí",
        type: "Materiales",
        game: "Ambos juegos",
        icon: "gem"
    },

    {
        name: "Zafiro",
        type: "Materiales",
        game: "Ambos juegos",
        icon: "gem"
    },

    {
        name: "Topacio",
        type: "Materiales",
        game: "Ambos juegos",
        icon: "gem"
    },


    // =========================
    // INGREDIENTES
    // =========================

    {
        name: "Manzana",
        type: "Ingredientes",
        game: "Ambos juegos",
        icon: "apple"
    },

    {
        name: "Hongo Hyrule",
        type: "Ingredientes",
        game: "Ambos juegos",
        icon: "apple"
    },

    {
        name: "Hearty Radish",
        type: "Ingredientes",
        game: "Ambos juegos",
        icon: "apple"
    },


    // =========================
    // LUGARES
    // =========================

    {
        name: "Castillo de Hyrule",
        type: "Ubicaciones",
        game: "Ambos juegos",
        icon: "map-pin"
    },

    {
        name: "Aldea Kakariko",
        type: "Ubicaciones",
        game: "Ambos juegos",
        icon: "map-pin"
    },

    {
        name: "Aldea Hateno",
        type: "Ubicaciones",
        game: "Ambos juegos",
        icon: "map-pin"
    },

    {
        name: "Montaña de la Muerte",
        type: "Ubicaciones",
        game: "Ambos juegos",
        icon: "map-pin"
    },

    {
        name: "Islas del Cielo",
        type: "Ubicaciones",
        game: "Tears of the Kingdom",
        icon: "map-pin"
    },

    {
        name: "Las Profundidades",
        type: "Ubicaciones",
        game: "Tears of the Kingdom",
        icon: "map-pin"
    }

];


// =========================================================
// SELECTOR DE JUEGO
// =========================================================

function initializeGameSelector() {

    gameButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedGame =
                button.dataset.gameSelect;

            changeGame(selectedGame);

        });

    });

}


// =========================================================
// CAMBIAR JUEGO
// =========================================================

function changeGame(game) {

    if (body.dataset.game === game) {
        return;
    }


    const data = games[game];

    if (!data) {
        return;
    }


    mainPanel.classList.add("changing");


    setTimeout(() => {

        // Cambiar tema

        body.dataset.game = game;


        // Cambiar botón activo

        gameButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.gameSelect === game
            );

        });


        // Cambiar texto

        welcomeTitle.textContent =
            data.title;

        welcomeDescription.textContent =
            data.description;


        // Cambiar imagen

        gameImage.style.opacity = "0";


        setTimeout(() => {

            gameImage.src = data.image;

            gameImage.alt = data.title;

            gameImage.onload = () => {

                gameImage.style.opacity = "0.82";

            };

        }, 150);


        mainPanel.classList.remove("changing");

    }, 250);

}


// =========================================================
// BUSCADOR
// =========================================================

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    // ---------------------------------------------
    // ESCRIBIR
    // ---------------------------------------------

    searchInput.addEventListener("input", event => {

        const value =
            event.target.value
                .trim()
                .toLowerCase();


        // Si está vacío

        if (!value) {

            searchResults.innerHTML = "";

            searchResults.classList.remove("visible");

            return;

        }


        // Juego actual

        const currentGame =
            body.dataset.game;


        // Buscar coincidencias

        const results =
            compendium.filter(item => {

                const name =
                    item.name.toLowerCase();

                const type =
                    item.type.toLowerCase();

                const game =
                    item.game.toLowerCase();


                const matchesText =
                    name.includes(value) ||
                    type.includes(value) ||
                    game.includes(value);


                // Si está en "ambos"

                if (currentGame === "all") {

                    return matchesText;

                }


                // BOTW

                if (currentGame === "botw") {

                    return (
                        matchesText &&
                        (
                            item.game === "Ambos juegos" ||
                            item.game === "Breath of the Wild"
                        )
                    );

                }


                // TOTK

                if (currentGame === "totk") {

                    return (
                        matchesText &&
                        (
                            item.game === "Ambos juegos" ||
                            item.game === "Tears of the Kingdom"
                        )
                    );

                }


                return matchesText;

            });


        renderSearchResults(
            results,
            searchResults
        );

    });


    // ---------------------------------------------
    // ABRIR BUSCADOR CON CTRL + K / CMD + K
    // ---------------------------------------------

    document.addEventListener("keydown", event => {

        if (
            (
                event.ctrlKey ||
                event.metaKey
            ) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

            searchInput.select();

        }

    });


    // ---------------------------------------------
    // CLICK FUERA
    // ---------------------------------------------

    document.addEventListener("click", event => {

        if (
            !event.target.closest(".search-wrapper")
        ) {

            searchResults.classList.remove(
                "visible"
            );

        }

    });

}


// =========================================================
// MOSTRAR RESULTADOS
// =========================================================

function renderSearchResults(
    results,
    container
) {

    container.innerHTML = "";


    // No hay resultados

    if (results.length === 0) {

        container.innerHTML = `

            <div class="search-empty">

                <i data-lucide="search-x"></i>

                <p>
                    No encontramos nada con ese nombre.
                </p>

            </div>

        `;

        container.classList.add("visible");

        lucide.createIcons();

        return;

    }


    // Mostrar máximo 10

    results
        .slice(0, 10)
        .forEach(item => {

            const result =
                document.createElement("button");

            result.className =
                "search-result";


            result.innerHTML = `

                <div class="result-icon">

                    <i data-lucide="${item.icon}"></i>

                </div>


                <div class="result-info">

                    <div class="result-name">
                        ${item.name}
                    </div>

                    <div class="result-type">
                        ${item.type}
                    </div>

                </div>


                <div class="result-game">
                    ${item.game}
                </div>

            `;


            result.addEventListener(
                "click",
                () => {

                    selectSearchResult(item);

                }
            );


            container.appendChild(result);

        });


    container.classList.add("visible");

    lucide.createIcons();

}


// =========================================================
// SELECCIONAR RESULTADO
// =========================================================

function selectSearchResult(item) {

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    searchInput.value =
        item.name;


    searchResults.classList.remove(
        "visible"
    );


    console.log(
        "Elemento seleccionado:",
        item
    );

}


// =========================================================
// NAVEGACIÓN
// =========================================================

function initializeNavigation() {

    const navigationItems =
        document.querySelectorAll(".nav-item");


    navigationItems.forEach(item => {

        item.addEventListener("click", () => {

            navigationItems.forEach(nav => {

                nav.classList.remove("active");

            });


            item.classList.add("active");

        });

    });

}