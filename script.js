// =========================================================
// INICIALIZACIÓN
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Activar iconos Lucide
    lucide.createIcons();

    // Inicializar funciones
    initializeGameSelector();
    initializeSearch();
    initializeNavigation();

});


// =========================================================
// ELEMENTOS DEL DOM
// =========================================================

const body =
    document.body;


const gameButtons =
    document.querySelectorAll(
        "[data-game-select]"
    );


const welcomeTitle =
    document.getElementById(
        "welcomeTitle"
    );


const welcomeDescription =
    document.getElementById(
        "welcomeDescription"
    );


const gameImage =
    document.getElementById(
        "gameImage"
    );


const mainPanel =
    document.querySelector(
        ".main-panel"
    );


// =========================================================
// DATOS DE LOS JUEGOS
// =========================================================

const games = {

    botw: {

        title:
            "Breath of the Wild",

        description:
            "Descubre armas, enemigos, lugares, materiales y secretos de Hyrule.",

        image:
            "images/botw.jpg"

    },


    totk: {

        title:
            "Tears of the Kingdom",

        description:
            "Explora Hyrule, las islas del cielo y las profundidades en una nueva aventura.",

        image:
            "images/totk.jpg"

    },


    all: {

        title:
            "Hyrule",

        description:
            "Explora todo el contenido de Breath of the Wild y Tears of the Kingdom.",

        image:
            "images/botw-totk.jpg"

    }

};


// =========================================================
// DATOS DEL BUSCADOR
// =========================================================

const searchData = [

    // =====================================================
    // ARMAS
    // =====================================================

    {
        name: "Espada Maestra",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },

    {
        name: "Espada de la Guardia",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },

    {
        name: "Espada de Caballero",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },

    {
        name: "Espada de la Llama",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },

    {
        name: "Espada de Hielo",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },

    {
        name: "Espada del Trueno",
        category: "Armas",
        icon: "swords",
        games: ["botw", "totk"]
    },


    // =====================================================
    // ESCUDOS
    // =====================================================

    {
        name: "Escudo Hyliano",
        category: "Escudos",
        icon: "shield",
        games: ["botw", "totk"]
    },

    {
        name: "Escudo de Caballero",
        category: "Escudos",
        icon: "shield",
        games: ["botw", "totk"]
    },

    {
        name: "Escudo de la Guardia",
        category: "Escudos",
        icon: "shield",
        games: ["botw", "totk"]
    },


    // =====================================================
    // ARCOS
    // =====================================================

    {
        name: "Arco de Luz",
        category: "Arcos",
        icon: "crosshair",
        games: ["botw", "totk"]
    },

    {
        name: "Arco de Caballero",
        category: "Arcos",
        icon: "crosshair",
        games: ["botw", "totk"]
    },

    {
        name: "Arco de la Guardia",
        category: "Arcos",
        icon: "crosshair",
        games: ["botw", "totk"]
    },

    {
        name: "Arco de Águila",
        category: "Arcos",
        icon: "crosshair",
        games: ["botw"]
    },


    // =====================================================
    // ARMADURAS
    // =====================================================

    {
        name: "Túnica del Héroe",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },

    {
        name: "Armadura Hyliana",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },

    {
        name: "Armadura de Bárbaro",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },

    {
        name: "Armadura Zora",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },

    {
        name: "Armadura Sheikah",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },

    {
        name: "Armadura del Desierto",
        category: "Armaduras",
        icon: "shirt",
        games: ["botw", "totk"]
    },


    // =====================================================
    // INGREDIENTES
    // =====================================================

    {
        name: "Manzana",
        category: "Ingredientes",
        icon: "apple",
        games: ["botw", "totk"]
    },

    {
        name: "Hada",
        category: "Ingredientes",
        icon: "sparkles",
        games: ["botw", "totk"]
    },

    {
        name: "Trufa Vivaz",
        category: "Ingredientes",
        icon: "circle-dot",
        games: ["botw", "totk"]
    },

    {
        name: "Durian Vivaz",
        category: "Ingredientes",
        icon: "circle-dot",
        games: ["botw"]
    },

    {
        name: "Plátano recio",
        category: "Ingredientes",
        icon: "banana",
        games: ["botw", "totk"]
    },


    // =====================================================
    // ENEMIGOS
    // =====================================================

    {
        name: "Bokoblin",
        category: "Enemigos",
        icon: "skull",
        games: ["botw", "totk"]
    },

    {
        name: "Moblin",
        category: "Enemigos",
        icon: "skull",
        games: ["botw", "totk"]
    },

    {
        name: "Lizalfos",
        category: "Enemigos",
        icon: "skull",
        games: ["botw", "totk"]
    },

    {
        name: "Hinox",
        category: "Enemigos",
        icon: "skull",
        games: ["botw", "totk"]
    },

    {
        name: "Talus",
        category: "Enemigos",
        icon: "mountain",
        games: ["botw", "totk"]
    },

    {
        name: "Guardian",
        category: "Enemigos",
        icon: "bot",
        games: ["botw"]
    },

    {
        name: "Gleeok",
        category: "Enemigos",
        icon: "skull",
        games: ["totk"]
    },

    {
        name: "Centaleón",
        category: "Enemigos",
        icon: "skull",
        games: ["botw", "totk"]
    },


    // =====================================================
    // LUGARES
    // =====================================================

    {
        name: "Castillo de Hyrule",
        category: "Lugares",
        icon: "castle",
        games: ["botw", "totk"]
    },

    {
        name: "Aldea Kakariko",
        category: "Lugares",
        icon: "home",
        games: ["botw", "totk"]
    },

    {
        name: "Aldea Hateno",
        category: "Lugares",
        icon: "home",
        games: ["botw", "totk"]
    },

    {
        name: "Aldea Gerudo",
        category: "Lugares",
        icon: "home",
        games: ["botw", "totk"]
    },

    {
        name: "Aldea Zora",
        category: "Lugares",
        icon: "waves",
        games: ["botw", "totk"]
    },

    {
        name: "Bosque Kolog",
        category: "Lugares",
        icon: "trees",
        games: ["botw", "totk"]
    },

    {
        name: "Isla del Cielo",
        category: "Lugares",
        icon: "cloud",
        games: ["totk"]
    },

    {
        name: "Las Profundidades",
        category: "Lugares",
        icon: "layers",
        games: ["totk"]
    }

];


// =========================================================
// SELECTOR DE JUEGO
// =========================================================

function initializeGameSelector() {

    gameButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedGame =
                    button.dataset.gameSelect;

                changeGame(
                    selectedGame
                );

                // Actualizar resultados si el buscador
                // ya tiene algo escrito
                updateSearchResults();

            }
        );

    });

}


// =========================================================
// CAMBIAR JUEGO
// =========================================================

function changeGame(game) {

    // Evitar repetir el mismo juego

    if (
        body.dataset.game === game
    ) {

        return;

    }


    // Obtener información

    const data =
        games[game];


    if (!data) {

        return;

    }


    // Animación de salida

    mainPanel.classList.add(
        "changing"
    );


    // Desvanecer imagen

    gameImage.style.opacity =
        "0";


    setTimeout(() => {

        // =============================================
        // CAMBIAR TEMA
        // =============================================

        body.dataset.game =
            game;


        // =============================================
        // CAMBIAR BOTÓN ACTIVO
        // =============================================

        gameButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.gameSelect === game
            );

        });


        // =============================================
        // CAMBIAR TEXTO
        // =============================================

        welcomeTitle.textContent =
            data.title;


        welcomeDescription.textContent =
            data.description;


        // =============================================
        // CAMBIAR IMAGEN
        // =============================================

        gameImage.src =
            data.image;


        gameImage.alt =
            data.title;


        // =============================================
        // ANIMACIÓN DE ENTRADA
        // =============================================

        setTimeout(() => {

            gameImage.style.opacity =
                "1";

        }, 80);


        mainPanel.classList.remove(
            "changing"
        );


    }, 300);

}


// =========================================================
// NORMALIZAR TEXTO
// =========================================================

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim();

}


// =========================================================
// BUSCADOR
// =========================================================

function initializeSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    // Crear contenedor de resultados

    createSearchResults();


    // Agregar estilos del buscador

    createSearchStyles();


    // =============================================
    // ESCRIBIR
    // =============================================

    searchInput.addEventListener(
        "input",
        () => {

            updateSearchResults();

        }
    );


    // =============================================
    // FOCUS
    // =============================================

    searchInput.addEventListener(
        "focus",
        () => {

            if (
                searchInput.value.trim()
            ) {

                updateSearchResults();

            }

        }
    );


    // =============================================
    // CTRL + K / CMD + K
    // =============================================

    document.addEventListener(
        "keydown",
        event => {

            if (

                (
                    event.metaKey ||
                    event.ctrlKey
                )

                &&

                event.key.toLowerCase() === "k"

            ) {

                event.preventDefault();

                searchInput.focus();

            }

        }
    );


    // =============================================
    // TECLADO
    // =============================================

    searchInput.addEventListener(
        "keydown",
        event => {

            const results =
                document.querySelectorAll(
                    ".search-result-item"
                );


            if (!results.length) {

                return;

            }


            const active =
                document.querySelector(
                    ".search-result-item.keyboard-active"
                );


            let index = -1;


            if (active) {

                index =
                    Array.from(results)
                        .indexOf(active);

            }


            // -----------------------------------------
            // FLECHA ABAJO
            // -----------------------------------------

            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                index++;

                if (
                    index >= results.length
                ) {

                    index = 0;

                }

                activateSearchResult(
                    results,
                    index
                );

            }


            // -----------------------------------------
            // FLECHA ARRIBA
            // -----------------------------------------

            if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                index--;

                if (
                    index < 0
                ) {

                    index =
                        results.length - 1;

                }

                activateSearchResult(
                    results,
                    index
                );

            }


            // -----------------------------------------
            // ENTER
            // -----------------------------------------

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                if (
                    active
                ) {

                    active.click();

                }

            }


            // -----------------------------------------
            // ESC
            // -----------------------------------------

            if (
                event.key === "Escape"
            ) {

                closeSearchResults();

                searchInput.blur();

            }

        }
    );


    // =============================================
    // CLICK FUERA
    // =============================================

    document.addEventListener(
        "click",
        event => {

            const searchBox =
                document.querySelector(
                    ".search-box"
                );


            if (
                searchBox &&
                !searchBox.contains(
                    event.target
                )
            ) {

                closeSearchResults();

            }

        }
    );

}


// =========================================================
// CREAR CONTENEDOR DE RESULTADOS
// =========================================================

function createSearchResults() {

    const searchBox =
        document.querySelector(
            ".search-box"
        );


    if (!searchBox) {

        return;

    }


    // Evitar duplicarlo

    if (
        document.getElementById(
            "searchResults"
        )
    ) {

        return;

    }


    const results =
        document.createElement(
            "div"
        );


    results.id =
        "searchResults";


    results.className =
        "search-results";


    searchBox.appendChild(
        results
    );

}


// =========================================================
// CREAR ESTILOS DEL BUSCADOR
// =========================================================

function createSearchStyles() {

    if (
        document.getElementById(
            "searchDynamicStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "searchDynamicStyles";


    style.textContent = `

        .search-box {
            position: relative;
            z-index: 100;
        }


        .search-results {

            position: absolute;

            top: calc(100% + 10px);

            left: 0;
            right: 0;

            padding: 8px;

            border-radius: 20px;

            background:
                color-mix(
                    in srgb,
                    var(--glass) 94%,
                    var(--bg-secondary)
                );

            border:
                1px solid
                var(--border);

            box-shadow:
                0 24px 60px
                rgba(0, 0, 0, 0.35),

                0 8px 25px
                rgba(0, 0, 0, 0.20);

            backdrop-filter:
                blur(25px)
                saturate(150%);

            -webkit-backdrop-filter:
                blur(25px)
                saturate(150%);

            display: none;

            max-height: 420px;

            overflow-y: auto;

            transform-origin:
                top center;

            animation:
                searchResultsIn
                0.18s
                ease-out;

        }


        .search-results.visible {
            display: block;
        }


        .search-result-item {

            width: 100%;

            display: flex;

            align-items: center;

            gap: 12px;

            padding: 11px;

            border: 0;

            border-radius: 14px;

            background: transparent;

            color: var(--text);

            text-align: left;

            cursor: pointer;

            transition:
                background 0.18s ease,
                transform 0.18s ease;

        }


        .search-result-item:hover,
        .search-result-item.keyboard-active {

            background:
                color-mix(
                    in srgb,
                    var(--accent) 12%,
                    transparent
                );

            transform:
                translateX(3px);

        }


        .search-result-icon {

            flex:
                0 0 40px;

            width: 40px;
            height: 40px;

            display: grid;

            place-items: center;

            border-radius: 12px;

            color: var(--accent);

            background:
                color-mix(
                    in srgb,
                    var(--accent) 10%,
                    transparent
                );

            border:
                1px solid
                color-mix(
                    in srgb,
                    var(--accent) 18%,
                    transparent
                );

        }


        .search-result-icon svg {

            width: 19px;
            height: 19px;

        }


        .search-result-info {

            min-width: 0;

            display: flex;

            flex-direction: column;

            gap: 3px;

        }


        .search-result-name {

            font-size: 14px;

            font-weight: 600;

            white-space: nowrap;

            overflow: hidden;

            text-overflow: ellipsis;

        }


        .search-result-category {

            font-size: 11px;

            color: var(--text-muted);

        }


        .search-result-game {

            margin-left: auto;

            padding: 4px 8px;

            border-radius: 8px;

            font-size: 10px;

            color: var(--text-muted);

            background:
                rgba(255,255,255,0.04);

            white-space: nowrap;

        }


        .search-empty {

            padding: 25px 15px;

            text-align: center;

            color: var(--text-muted);

        }


        .search-empty-icon {

            width: 38px;
            height: 38px;

            margin:
                0 auto 10px;

            display: grid;

            place-items: center;

            border-radius: 12px;

            color: var(--text-muted);

            background:
                rgba(255,255,255,0.04);

        }


        .search-empty p {

            margin: 0;

            font-size: 13px;

        }


        @keyframes searchResultsIn {

            from {

                opacity: 0;

                transform:
                    translateY(-7px)
                    scale(0.98);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        .search-results::-webkit-scrollbar {
            width: 5px;
        }


        .search-results::-webkit-scrollbar-track {
            background: transparent;
        }


        .search-results::-webkit-scrollbar-thumb {

            background:
                color-mix(
                    in srgb,
                    var(--accent) 35%,
                    transparent
                );

            border-radius: 10px;

        }

    `;


    document.head.appendChild(
        style
    );

}


// =========================================================
// ACTUALIZAR RESULTADOS
// =========================================================

function updateSearchResults() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const resultsContainer =
        document.getElementById(
            "searchResults"
        );


    if (
        !searchInput ||
        !resultsContainer
    ) {

        return;

    }


    const value =
        normalizeText(
            searchInput.value
        );


    // Si no hay búsqueda, ocultar

    if (!value) {

        closeSearchResults();

        return;

    }


    const currentGame =
        body.dataset.game ||
        "botw";


    // =============================================
    // FILTRAR
    // =============================================

    const results =
        searchData
            .filter(item => {

                // Comprobar juego

                const gameMatches =
                    currentGame === "all" ||
                    item.games.includes(
                        currentGame
                    );


                if (!gameMatches) {

                    return false;

                }


                // Comprobar nombre

                const name =
                    normalizeText(
                        item.name
                    );


                const category =
                    normalizeText(
                        item.category
                    );


                return (
                    name.includes(value) ||
                    category.includes(value)
                );

            })
            .slice(0, 10);


    // =============================================
    // LIMPIAR
    // =============================================

    resultsContainer.innerHTML =
        "";


    // =============================================
    // SIN RESULTADOS
    // =============================================

    if (
        results.length === 0
    ) {

        resultsContainer.innerHTML = `

            <div class="search-empty">

                <div class="search-empty-icon">

                    <i data-lucide="search-x"></i>

                </div>

                <p>
                    No encontramos nada para
                    "<strong>${escapeHTML(searchInput.value)}</strong>"
                </p>

            </div>

        `;


        resultsContainer.classList.add(
            "visible"
        );


        lucide.createIcons();

        return;

    }


    // =============================================
    // CREAR RESULTADOS
    // =============================================

    results.forEach(item => {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "search-result-item";


        const gameText =
            item.games.length > 1
                ? "Ambos"
                : item.games[0] === "botw"
                    ? "BOTW"
                    : "TOTK";


        button.innerHTML = `

            <span class="search-result-icon">

                <i data-lucide="${item.icon}"></i>

            </span>


            <span class="search-result-info">

                <span class="search-result-name">
                    ${highlightMatch(
                        item.name,
                        searchInput.value
                    )}
                </span>

                <span class="search-result-category">
                    ${item.category}
                </span>

            </span>


            <span class="search-result-game">
                ${gameText}
            </span>

        `;


        // =========================================
        // CLICK EN RESULTADO
        // =========================================

        button.addEventListener(
            "click",
            () => {

                selectSearchResult(
                    item
                );

            }
        );


        resultsContainer.appendChild(
            button
        );

    });


    resultsContainer.classList.add(
        "visible"
    );


    // Activar Lucide

    lucide.createIcons();

}


// =========================================================
// SELECCIONAR RESULTADO
// =========================================================

function selectSearchResult(item) {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {

        return;

    }


    // Poner el nombre seleccionado
    // en el buscador

    searchInput.value =
        item.name;


    closeSearchResults();


    // =============================================
    // AQUÍ PODREMOS ABRIR LA FICHA
    // DEL OBJETO MÁS ADELANTE
    // =============================================

    console.log(
        "Elemento seleccionado:",
        item
    );

}


// =========================================================
// ACTIVAR RESULTADO CON TECLADO
// =========================================================

function activateSearchResult(
    results,
    index
) {

    results.forEach(
        result => {

            result.classList.remove(
                "keyboard-active"
            );

        }
    );


    if (
        results[index]
    ) {

        results[index].classList.add(
            "keyboard-active"
        );


        results[index].scrollIntoView({
            block: "nearest"
        });

    }

}


// =========================================================
// CERRAR RESULTADOS
// =========================================================

function closeSearchResults() {

    const results =
        document.getElementById(
            "searchResults"
        );


    if (!results) {

        return;

    }


    results.classList.remove(
        "visible"
    );


    results
        .querySelectorAll(
            ".keyboard-active"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "keyboard-active"
                );

            }
        );

}


// =========================================================
// RESALTAR COINCIDENCIA
// =========================================================

function highlightMatch(
    text,
    search
) {

    const normalizedSearch =
        normalizeText(
            search
        );


    if (
        !normalizedSearch
    ) {

        return escapeHTML(
            text
        );

    }


    const normalizedText =
        normalizeText(
            text
        );


    const index =
        normalizedText.indexOf(
            normalizedSearch
        );


    if (
        index === -1
    ) {

        return escapeHTML(
            text
        );

    }


    const before =
        text.substring(
            0,
            index
        );


    const match =
        text.substring(
            index,
            index +
            search.length
        );


    const after =
        text.substring(
            index +
            search.length
        );


    return `

        ${escapeHTML(before)}

        <mark>
            ${escapeHTML(match)}
        </mark>

        ${escapeHTML(after)}

    `;

}


// =========================================================
// SEGURIDAD HTML
// =========================================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

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

            }
        );

    });

}