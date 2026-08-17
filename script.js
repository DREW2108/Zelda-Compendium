// =========================================================
// HYRULE COMPENDIUM
// API + BUSCADOR + CATEGORÍAS + IMÁGENES
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    lucide.createIcons();

    initializeGameSelector();
    initializeSearch();
    initializeNavigation();

    loadCompendium();

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

const mainContent =
    document.querySelector(".main-content");


// =========================================================
// API
// =========================================================

// API actual del Hyrule Compendium
const API_URL =
    "https://api.hyrule-compendium.com/v3/compendium/all";


// =========================================================
// DATOS
// =========================================================

let compendium = [];


// =========================================================
// JUEGOS
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
// CARGAR COMPENDIO
// =========================================================

async function loadCompendium() {

    try {

        console.log("Cargando Hyrule Compendium...");

        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        console.log("Datos recibidos:", result);

        // La API devuelve los datos dentro de "data"
        compendium =
            Array.isArray(result.data)
                ? result.data
                : [];

        if (!compendium.length) {
            throw new Error(
                "La API no devolvió objetos."
            );
        }

        console.log(
            `Objetos cargados: ${compendium.length}`
        );

    }

    catch (error) {

        console.error(
            "Error cargando el compendio:",
            error
        );

        showApiError();

    }

}


// =========================================================
// ERROR DE API
// =========================================================

function showApiError() {

    if (!mainContent) return;

    mainContent.innerHTML = `

        <section class="welcome-panel main-panel">

            <div class="welcome-icon">
                <i data-lucide="wifi-off"></i>
            </div>

            <span class="eyebrow">
                <i data-lucide="alert-triangle"></i>
                HYRULE COMPENDIUM
            </span>

            <h2>
                No se pudo cargar el compendio
            </h2>

            <p>
                La conexión con la API no está disponible
                en este momento. Comprueba tu conexión
                a Internet e inténtalo nuevamente.
            </p>

        </section>

    `;

    lucide.createIcons();

}


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

    const data =
        games[game];

    if (!data) return;


    body.dataset.game =
        game;


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
// NORMALIZAR NOMBRE
// =========================================================

function normalizeText(text) {

    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


// =========================================================
// TRADUCIR CATEGORÍAS
// =========================================================

function translateCategory(category) {

    const categories = {

        creatures: "Criaturas",
        monsters: "Enemigos",
        equipment: "Armas",
        materials: "Materiales",
        treasure: "Tesoros",
        food: "Ingredientes"

    };

    return categories[
        normalizeText(category)
    ] || category;

}


// =========================================================
// FILTRAR POR JUEGO
// =========================================================

function isItemAvailableForCurrentGame(item) {

    const currentGame =
        body.dataset.game;

    if (currentGame === "all") {
        return true;
    }


    // Algunos registros de la API
    // contienen game_versions.

    if (
        item.game_versions &&
        Array.isArray(item.game_versions)
    ) {

        const versions =
            item.game_versions
                .map(version =>
                    normalizeText(version)
                );

        if (currentGame === "botw") {

            return versions.some(version =>
                version.includes("breath") ||
                version.includes("botw")
            );

        }

        if (currentGame === "totk") {

            return versions.some(version =>
                version.includes("tears") ||
                version.includes("totk")
            );

        }

    }


    // Si no existe información específica,
    // mostramos el objeto.

    return true;

}


// =========================================================
// BUSCADOR
// =========================================================

function initializeSearch() {

    const searchInput =
        document.getElementById("searchInput");

    const searchResults =
        document.getElementById("searchResults");


    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        event => {

            const value =
                normalizeText(
                    event.target.value
                );


            if (!value) {

                searchResults.innerHTML =
                    "";

                searchResults.classList.remove(
                    "visible"
                );

                return;

            }


            const results =
                compendium
                    .filter(item => {

                        if (
                            !isItemAvailableForCurrentGame(
                                item
                            )
                        ) {
                            return false;
                        }


                        const name =
                            normalizeText(
                                item.name
                            );

                        const category =
                            normalizeText(
                                item.category
                            );

                        const description =
                            normalizeText(
                                item.description
                            );


                        return (

                            name.includes(value) ||

                            category.includes(value) ||

                            description.includes(value)

                        );

                    })
                    .slice(0, 10);


            renderSearchResults(
                results,
                searchResults
            );

        }
    );


    // CTRL + K / CMD + K

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                searchInput.focus();

                searchInput.select();

            }

        }
    );


    // CLICK FUERA

    document.addEventListener(
        "click",
        event => {

            if (
                !event.target.closest(
                    ".search-wrapper"
                )
            ) {

                searchResults.classList.remove(
                    "visible"
                );

            }

        }
    );

}


// =========================================================
// RESULTADOS DEL BUSCADOR
// =========================================================

function renderSearchResults(
    results,
    container
) {

    container.innerHTML = "";


    if (!results.length) {

        container.innerHTML = `

            <div class="search-empty">

                <i data-lucide="search-x"></i>

                <p>
                    No encontramos ese objeto.
                </p>

            </div>

        `;

        container.classList.add(
            "visible"
        );

        lucide.createIcons();

        return;

    }


    results.forEach(item => {

        const result =
            document.createElement(
                "button"
            );


        result.className =
            "search-result";


        result.innerHTML = `

            <div class="result-icon">

                ${
                    item.image
                    ? `
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            style="
                                width:100%;
                                height:100%;
                                object-fit:contain;
                                border-radius:8px;
                            "
                        >
                    `
                    :
                    `
                        <i data-lucide="package"></i>
                    `
                }

            </div>


            <div class="result-info">

                <div class="result-name">
                    ${item.name}
                </div>

                <div class="result-type">
                    ${translateCategory(item.category)}
                </div>

            </div>


        `;


        result.addEventListener(
            "click",
            () => {

                openItem(item);

                container.classList.remove(
                    "visible"
                );

            }
        );


        container.appendChild(
            result
        );

    });


    container.classList.add(
        "visible"
    );


    lucide.createIcons();

}


// =========================================================
// NAVEGACIÓN
// =========================================================

function initializeNavigation() {

    const navigationItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navigationItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                navigationItems.forEach(
                    nav => {
                        nav.classList.remove(
                            "active"
                        );
                    }
                );


                item.classList.add(
                    "active"
                );


                const category =
                    item.textContent.trim();


                if (
                    category === "Resumen"
                ) {

                    showHome();

                    return;

                }


                openCategory(
                    category
                );

            }
        );

    });

}


// =========================================================
// CONVERTIR CATEGORÍA DE LA APP A API
// =========================================================

function categoryToApiCategory(
    category
) {

    const map = {

        "Armas": [
            "equipment"
        ],

        "Escudos": [
            "equipment"
        ],

        "Arcos": [
            "equipment"
        ],

        "Armaduras": [
            "equipment"
        ],

        "Ingredientes": [
            "food"
        ],

        "Enemigos": [
            "monsters"
        ],

        "Materiales": [
            "materials"
        ]

    };


    return map[category] || [];

}


// =========================================================
// FILTRAR CATEGORÍA
// =========================================================

function getItemsByCategory(
    category
) {

    const apiCategories =
        categoryToApiCategory(
            category
        );


    return compendium.filter(
        item => {

            const itemCategory =
                normalizeText(
                    item.category
                );


            if (
                !apiCategories.includes(
                    itemCategory
                )
            ) {
                return false;
            }


            // Filtrado especial
            // para separar armas,
            // escudos, arcos y armaduras.

            if (
                category === "Escudos"
            ) {

                return normalizeText(
                    item.name
                ).includes("shield") ||
                normalizeText(
                    item.name
                ).includes("escudo");

            }


            if (
                category === "Arcos"
            ) {

                return normalizeText(
                    item.name
                ).includes("bow") ||
                normalizeText(
                    item.name
                ).includes("arco");

            }


            if (
                category === "Armaduras"
            ) {

                return (
                    item.name &&
                    (
                        normalizeText(
                            item.name
                        ).includes("armor") ||

                        normalizeText(
                            item.name
                        ).includes("armour") ||

                        normalizeText(
                            item.name
                        ).includes("tunic") ||

                        normalizeText(
                            item.name
                        ).includes("hood") ||

                        normalizeText(
                            item.name
                        ).includes("cap") ||

                        normalizeText(
                            item.name
                        ).includes("helm")
                    )
                );

            }


            if (
                category === "Armas"
            ) {

                const name =
                    normalizeText(
                        item.name
                    );


                return !(
                    name.includes("shield") ||
                    name.includes("escudo") ||
                    name.includes("bow") ||
                    name.includes("arco") ||
                    name.includes("armor") ||
                    name.includes("armour") ||
                    name.includes("tunic") ||
                    name.includes("hood") ||
                    name.includes("helm")
                );

            }


            return true;

        }
    );

}


// =========================================================
// ABRIR CATEGORÍA
// =========================================================

function openCategory(
    category
) {

    const items =
        getItemsByCategory(
            category
        );


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
                    Explora los elementos de esta categoría.
                </p>

            </div>


            <div class="items-grid">

                ${
                    items.length

                    ?

                    items.map(
                        item => `

                        <button
                            class="item-card"
                            data-item-id="${item.id}"
                        >

                            <div class="item-card-image">

                                ${
                                    item.image

                                    ?

                                    `
                                    <img
                                        src="${item.image}"
                                        alt="${item.name}"
                                        loading="lazy"
                                    >
                                    `

                                    :

                                    `
                                    <i data-lucide="package"></i>
                                    `
                                }

                            </div>


                            <div class="item-card-info">

                                <h3>
                                    ${item.name}
                                </h3>

                                <p>
                                    ${translateCategory(
                                        item.category
                                    )}
                                </p>

                            </div>


                            <i
                                data-lucide="chevron-right"
                                class="item-arrow"
                            ></i>

                        </button>

                        `
                    ).join("")

                    :

                    `

                    <div class="no-items">

                        <i
                            data-lucide="package-open"
                        ></i>

                        <h3>
                            No hay objetos disponibles
                        </h3>

                        <p>
                            No encontramos elementos
                            para esta categoría.
                        </p>

                    </div>

                    `
                }

            </div>

        </section>

    `;


    lucide.createIcons();


    // =====================================================
    // CLICK EN OBJETO
    // =====================================================

    document
        .querySelectorAll(".item-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            card.dataset.itemId
                        );


                    const item =
                        compendium.find(
                            element =>
                                Number(
                                    element.id
                                ) === id
                        );


                    if (item) {

                        openItem(
                            item
                        );

                    }

                }
            );

        });

}


// =========================================================
// ABRIR OBJETO
// =========================================================

function openItem(
    item
) {

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


                <!-- IMAGEN -->

                <div class="item-detail-image">

                    ${
                        item.image

                        ?

                        `
                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >
                        `

                        :

                        `
                        <div class="item-no-image">

                            <i
                                data-lucide="image-off"
                            ></i>

                            <span>
                                Imagen no disponible
                            </span>

                        </div>
                        `
                    }

                </div>



                <!-- INFORMACIÓN -->

                <div class="item-detail-content">

                    <span class="eyebrow">

                        ${translateCategory(
                            item.category
                        )}

                    </span>


                    <h2>
                        ${item.name}
                    </h2>


                    <p class="item-description">

                        ${
                            item.description ||
                            "No hay descripción disponible."
                        }

                    </p>


                    ${
                        item.common_locations &&
                        item.common_locations.length

                        ?

                        `
                        <div class="item-info-block">

                            <h3>
                                Ubicaciones
                            </h3>

                            <p>
                                ${
                                    item.common_locations
                                        .join(", ")
                                }
                            </p>

                        </div>
                        `

                        :

                        ""
                    }


                    ${
                        item.drops &&
                        item.drops.length

                        ?

                        `
                        <div class="item-info-block">

                            <h3>
                                Objetos que deja
                            </h3>

                            <p>
                                ${
                                    item.drops
                                        .join(", ")
                                }
                            </p>

                        </div>
                        `

                        :

                        ""
                    }


                </div>

            </div>

        </section>

    `;


    lucide.createIcons();


    // =====================================================
    // VOLVER
    // =====================================================

    document
        .getElementById(
            "backButton"
        )
        .addEventListener(
            "click",
            () => {

                const category =
                    translateCategory(
                        item.category
                    );


                openCategory(
                    category
                );

            }
        );

}


// =========================================================
// INICIO
// =========================================================

function showHome() {

    location.reload();

}