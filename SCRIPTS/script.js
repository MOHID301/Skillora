/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});

/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");


/*
    Load saved theme
*/

const savedTheme = localStorage.getItem("skillora-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeIcon.textContent = "☾";

}


/*
    Toggle theme
*/

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


/* =========================================================
   SEARCH
========================================================= */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function performSearch() {

    const query = searchInput.value.trim();

    if (!query) {
        searchInput.focus();
        return;
    }

    alert(`Searching for: ${query}`);

    // Later we will replace this with:
    // Supabase search functionality.
}


searchBtn.addEventListener("click", performSearch);


searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        performSearch();
    }

});


/* =========================================================
   POPULAR SEARCHES
========================================================= */

document.querySelectorAll(".popular-searches button")
    .forEach(button => {

        button.addEventListener("click", () => {

            searchInput.value = button.textContent;

            performSearch();

        });

    });


document.querySelector(".cta-btn")
    .addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });