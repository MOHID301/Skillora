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

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

            localStorage.setItem(
                "skillora-theme",
                "light"
            );

        } else {

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }

            localStorage.setItem(
                "skillora-theme",
                "dark"
            );

        }

    });

}


/* =========================================================
   ARTICLE ELEMENTS
========================================================= */

const articleGrid =
    document.getElementById("articleGrid");

const articleSearch =
    document.getElementById("articleSearch");

const articleSearchBtn =
    document.getElementById("articleSearchBtn");

const articleCount =
    document.getElementById("articleCount");

const noArticles =
    document.getElementById("noArticles");

const resetArticles =
    document.getElementById("resetArticles");


let currentTopic = "All";
let currentSearch = "";


/* =========================================================
   GET ARTICLES
========================================================= */

function getArticles() {

    if (!articleGrid) {
        return [];
    }

    return Array.from(
        articleGrid.querySelectorAll(".article-card")
    );

}


/* =========================================================
   FILTER ARTICLES
========================================================= */

function filterArticles() {

    const articles = getArticles();

    let visibleArticles = 0;

    articles.forEach(article => {

        const topic =
            article.dataset.topic || "";

        const title =
            article.querySelector("h3")
                ?.textContent
                .toLowerCase() || "";

        const description =
            article.querySelector(".article-description")
                ?.textContent
                .toLowerCase() || "";

        const category =
            article.querySelector(".article-category")
                ?.textContent
                .toLowerCase() || "";


        const matchesTopic =
            currentTopic === "All" ||
            topic === currentTopic;


        const matchesSearch =
            !currentSearch ||
            title.includes(currentSearch) ||
            description.includes(currentSearch) ||
            topic.toLowerCase().includes(currentSearch) ||
            category.includes(currentSearch);


        if (matchesTopic && matchesSearch) {

            article.style.display = "";

            visibleArticles++;

        } else {

            article.style.display = "none";

        }

    });


    /* Update article count */

    if (articleCount) {

        articleCount.textContent =
            `${visibleArticles} ${
                visibleArticles === 1
                    ? "article"
                    : "articles"
            }`;

    }


    /* No results */

    if (noArticles) {

        noArticles.style.display =
            visibleArticles === 0
                ? "block"
                : "none";

    }

}


/* =========================================================
   TOPIC FILTER
========================================================= */

document
    .querySelectorAll("[data-topic]")
    .forEach(button => {

        button.addEventListener("click", () => {

            currentTopic =
                button.dataset.topic;


            /* Update active topic */

            document
                .querySelectorAll(".article-topic-card")
                .forEach(card => {

                    card.classList.remove("active");

                });


            const activeCard =
                document.querySelector(
                    `.article-topic-card[data-topic="${currentTopic}"]`
                );


            if (activeCard) {
                activeCard.classList.add("active");
            }


            filterArticles();


            /* Scroll to articles when using topic cards */

            if (
                button.classList.contains(
                    "article-topic-card"
                )
            ) {

                document
                    .getElementById("articles")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }

        });

    });


/* =========================================================
   SEARCH
========================================================= */

function performArticleSearch() {

    if (!articleSearch) {
        return;
    }

    currentSearch =
        articleSearch.value
            .trim()
            .toLowerCase();


    filterArticles();


    document
        .getElementById("articles")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


if (articleSearchBtn) {

    articleSearchBtn.addEventListener(
        "click",
        performArticleSearch
    );

}


if (articleSearch) {

    articleSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                performArticleSearch();
            }

        }
    );

}


/* =========================================================
   RESET ARTICLES
========================================================= */

if (resetArticles) {

    resetArticles.addEventListener(
        "click",
        () => {

            currentTopic = "All";
            currentSearch = "";


            if (articleSearch) {
                articleSearch.value = "";
            }


            /* Reset active topic */

            document
                .querySelectorAll(".article-topic-card")
                .forEach(card => {

                    card.classList.remove("active");

                });


            const allCard =
                document.querySelector(
                    '.article-topic-card[data-topic="All"]'
                );


            if (allCard) {
                allCard.classList.add("active");
            }


            filterArticles();

        }
    );

}


/* =========================================================
   POPULAR TOPICS
========================================================= */

document
    .querySelectorAll(".article-popular button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const topic =
                button.dataset.topic;

            if (articleSearch) {
                articleSearch.value = "";
            }

            currentSearch = "";
            currentTopic = topic;


            document
                .querySelectorAll(".article-topic-card")
                .forEach(card => {

                    card.classList.remove("active");

                });


            const matchingCard =
                document.querySelector(
                    `.article-topic-card[data-topic="${topic}"]`
                );


            if (matchingCard) {
                matchingCard.classList.add("active");
            }


            filterArticles();


            document
                .getElementById("articles")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================================================
   FEATURED ARTICLE
========================================================= */

document
    .querySelector(".featured-article")
    ?.addEventListener("click", () => {

        document
            .getElementById("articles")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });




/* =========================================================
   BECOME A CONTRIBUTOR
========================================================= */

document
    .getElementById("writeArticleBtn")
    ?.addEventListener("click", () => {

        alert(
            "Contributor registration will be connected soon."
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

filterArticles();