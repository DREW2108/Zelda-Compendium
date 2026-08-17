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


// =========================================================
// DATOS DE LOS JUEGOS
// =========================================================

const games = {

    botw: {
        title: "Breath of the Wild",
        description:
            "Descubre armas, enemigos, materiales y secretos de Hyrule."
    },

    totk: {
        title: "Tears of the Kingdom",
        description:
            "Explora Hyrule, las islas del cielo y las profundidades."
    },

    all: {
        title: "Hyrule",
        description:
            "Explora todo el contenido de Breath of the Wild y Tears of the Kingdom."
    }

};


// =========================================================
// DATOS DEL COMPENDIO
// =========================================================

const compendium = [

    // ARMAS

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


    // ESCUDOS

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


    // ARCOS

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


    // ARMADURAS

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


    // INGREDIENTES

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


    // ENEMIGOS

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


    // MATERIALES

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

    const data = games[game];

    if (!data) return;


    body.dataset.game = game;


    gameButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.gameSelect === game
        );

    });


    welcomeTitle.textContent =
        data.title;

    welcomeDescription.textContent =
        data.description;

}


// =========================================================
// BUSCADOR
// =========================================================

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    searchInput.addEventListener("input", event => {

        const value =
            event.target.value
                .trim()
                .toLowerCase();


        if (!value) {

            searchResults.innerHTML = "";

            searchResults.classList.remove("visible");

            return;

        }


        const currentGame =
            body.dataset.game;


        const results =
            compendium.filter(item => {

                const matchesText =
                    item.name
                        .toLowerCase()
                        .includes(value) ||

                    item.type
                        .toLowerCase()
                        .includes(value);


                if (!matchesText) {
                    return false;
                }


                if (currentGame === "all") {
                    return true;
                }


                if (currentGame === "botw") {

                    return (
                        item.game === "Ambos juegos" ||
                        item.game === "Breath of the Wild"
                    );

                }


                if (currentGame === "totk") {

                    return (
                        item.game === "Ambos juegos" ||
                        item.game === "Tears of the Kingdom"
                    );

                }


                return true;

            });


        renderSearchResults(
            results,
            searchResults
        );

    });


    // CTRL + K / CMD + K

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

            searchInput.select();

        }

    });


    // CLICK FUERA

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
// RESULTADOS DEL BUSCADOR
// =========================================================

function renderSearchResults(
    results,
    container
) {

    container.innerHTML = "";


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

                    openItem(item);

                }
            );


            container.appendChild(result);

        });


    container.classList.add("visible");

    lucide.createIcons();

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


            const category =
                item.textContent.trim();


            if (category === "Resumen") {

                showHome();

                return;

            }


            openCategory(category);

        });

    });

}


// =========================================================
// ABRIR CATEGORÍA
// =========================================================

function openCategory(category) {

    const mainContent =
        document.querySelector(".main-content");


    const currentGame =
        body.dataset.game;


    let items =
        compendium.filter(item => {

            if (item.type !== category) {
                return false;
            }


            if (currentGame === "all") {
                return true;
            }


            if (currentGame === "botw") {

                return (
                    item.game === "Ambos juegos" ||
                    item.game === "Breath of the Wild"
                );

            }


            if (currentGame === "totk") {

                return (
                    item.game === "Ambos juegos" ||
                    item.game === "Tears of the Kingdom"
                );

            }


            return true;

        });


    mainContent.innerHTML = `

        <section class="category-page">

            <div class="category-page-header">

                <span class="eyebrow">

                    <i data-lucide="library"></i>

                    COMPENDIO

                </span>

                <h2>
                    ${category}
                </h2>

                <p>
                    Explora todos los elementos de esta categoría.
                </p>

            </div>


            <div class="items-grid">

                ${
                    items.length
                    ? items.map(item => `

                        <button
                            class="item-card"
                            data-item-name="${item.name}"
                        >

                            <div class="item-card-icon">

                                <i data-lucide="${item.icon}"></i>

                            </div>


                            <div class="item-card-info">

                                <h3>
                                    ${item.name}
                                </h3>

                                <p>
                                    ${item.game}
                                </p>

                            </div>

                            <i
                                data-lucide="chevron-right"
                                class="item-arrow"
                            ></i>

                        </button>

                    `).join("")

                    :

                    `

                        <div class="no-items">

                            <i data-lucide="package-open"></i>

                            <h3>
                                No hay objetos disponibles
                            </h3>

                            <p>
                                Todavía no tenemos información
                                para esta categoría.
                            </p>

                        </div>

                    `
                }

            </div>

        </section>

    `;


    lucide.createIcons();


    // Click en cada objeto

    document
        .querySelectorAll(".item-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                const itemName =
                    card.dataset.itemName;

                const item =
                    compendium.find(
                        element =>
                            element.name === itemName
                    );


                if (item) {
                    openItem(item);
                }

            });

        });

}


// =========================================================
// ABRIR OBJETO
// =========================================================

function openItem(item) {

    const mainContent =
        document.querySelector(".main-content");


    mainContent.innerHTML = `

        <section class="item-detail">

            <button
                class="back-button"
                id="backButton"
                type="button"
            >

                <i data-lucide="arrow-left"></i>

                Volver

            </button>


            <div class="item-detail-card">

                <div class="item-detail-icon">

                    <i data-lucide="${item.icon}"></i>

                </div>


                <div class="item-detail-content">

                    <span class="eyebrow">

                        ${item.type}

                    </span>


                    <h2>
                        ${item.name}
                    </h2>


                    <p class="item-game">

                        <strong>
                            Juego:
                        </strong>

                        ${item.game}

                    </p>


                    <div class="item-description">

                        <h3>
                            Información
                        </h3>

                        <p>
                            Aquí aparecerá toda la información
                            de este objeto.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `;


    lucide.createIcons();


    document
        .getElementById("backButton")
        .addEventListener(
            "click",
            () => {

                openCategory(item.type);

            }
        );

}


// =========================================================
// VOLVER AL INICIO
// =========================================================

function showHome() {

    location.reload();

}