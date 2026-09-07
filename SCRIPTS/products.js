/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });

}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("skillora-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    if (themeIcon) {
        themeIcon.textContent = "☾";
    }

}


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLightMode =
            document.body.classList.contains("light-mode");


        if (isLightMode) {

            themeIcon.textContent = "☾";

            localStorage.setItem(
                "skillora-theme",
                "light"
            );

        } else {

            themeIcon.textContent = "☀";

            localStorage.setItem(
                "skillora-theme",
                "dark"
            );

        }

    });

}


/* =========================================================
   PRODUCT ELEMENTS
========================================================= */

const productGrid =
    document.getElementById("productGrid");

const productSearch =
    document.getElementById("productSearch");

const productSearchBtn =
    document.getElementById("productSearchBtn");

const sortProducts =
    document.getElementById("sortProducts");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const resetProducts =
    document.getElementById("resetProducts");


let currentCategory = "All";
let currentSearch = "";


/* =========================================================
   GET PRODUCTS
========================================================= */

function getProducts() {

    return Array.from(
        productGrid.querySelectorAll(".product-card")
    );

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function filterProducts() {

    const products = getProducts();

    let visibleProducts = 0;

    products.forEach(product => {

        const category =
            product.dataset.category;

        const title =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        const description =
            product.querySelector(".product-description")
                .textContent
                .toLowerCase();


        const matchesCategory =
            currentCategory === "All" ||
            category === currentCategory;


        const matchesSearch =
            !currentSearch ||
            title.includes(currentSearch) ||
            description.includes(currentSearch) ||
            category.toLowerCase().includes(currentSearch);


        if (matchesCategory && matchesSearch) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    /* Update product count */

    if (productCount) {

        productCount.textContent =
            `${visibleProducts} ${
                visibleProducts === 1
                    ? "product"
                    : "products"
            }`;

    }


    /* Show / hide no results */

    if (noProducts) {

        noProducts.style.display =
            visibleProducts === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   CATEGORY FILTER
========================================================= */

document
    .querySelectorAll("[data-category]")
    .forEach(button => {

        button.addEventListener("click", () => {

            currentCategory =
                button.dataset.category;


            /* Update active category */

            document
                .querySelectorAll(".product-category-card")
                .forEach(card => {

                    card.classList.remove("active");

                });


            const activeCard =
                document.querySelector(
                    `.product-category-card[data-category="${currentCategory}"]`
                );


            if (activeCard) {
                activeCard.classList.add("active");
            }


            filterProducts();

        });

    });


/* =========================================================
   SEARCH
========================================================= */

function performProductSearch() {

    currentSearch =
        productSearch.value
            .trim()
            .toLowerCase();

    filterProducts();

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


if (productSearchBtn) {

    productSearchBtn.addEventListener(
        "click",
        performProductSearch
    );

}


if (productSearch) {

    productSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                performProductSearch();
            }

        }
    );

}


/* =========================================================
   SORT PRODUCTS
========================================================= */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            const products =
                getProducts();


            const sortType =
                sortProducts.value;


            products.sort((a, b) => {

                const priceA =
                    Number(a.dataset.price);

                const priceB =
                    Number(b.dataset.price);

                const ratingA =
                    Number(a.dataset.rating);

                const ratingB =
                    Number(b.dataset.rating);


                if (sortType === "low") {
                    return priceA - priceB;
                }

                if (sortType === "high") {
                    return priceB - priceA;
                }

                if (sortType === "rating") {
                    return ratingB - ratingA;
                }

                return 0;

            });


            products.forEach(product => {
                productGrid.appendChild(product);
            });


            filterProducts();

        }
    );

}


/* =========================================================
   RESET PRODUCTS
========================================================= */

if (resetProducts) {

    resetProducts.addEventListener(
        "click",
        () => {

            currentCategory = "All";
            currentSearch = "";

            productSearch.value = "";

            sortProducts.value = "default";


            document
                .querySelectorAll(".product-category-card")
                .forEach(card => {

                    card.classList.remove("active");

                });


            const allCard =
                document.querySelector(
                    '.product-category-card[data-category="All"]'
                );


            if (allCard) {
                allCard.classList.add("active");
            }


            filterProducts();

        }
    );

}


/* =========================================================
   FEATURED PRODUCT
========================================================= */

document
    .querySelector(".product-view-btn")
    ?.addEventListener("click", () => {

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================================
   SELL PRODUCT
========================================================= */

document
    .getElementById("sellProductBtn")
    ?.addEventListener("click", () => {

        alert(
            "Seller registration will be connected soon."
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

filterProducts();