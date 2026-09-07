/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

}


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});


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
   SERVICE SEARCH
========================================================= */

const serviceSearch =
    document.getElementById("serviceSearch");

const serviceSearchBtn =
    document.getElementById("serviceSearchBtn");


function searchServices() {

    if (!serviceSearch) {
        return;
    }

    const query =
        serviceSearch.value.trim();


    if (!query) {

        serviceSearch.focus();

        return;
    }


    alert(`Searching services for: ${query}`);

    /*
        Later this will connect to Supabase
        and return actual services.
    */

}


if (serviceSearchBtn) {

    serviceSearchBtn.addEventListener(
        "click",
        searchServices
    );

}


if (serviceSearch) {

    serviceSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                searchServices();
            }

        }
    );

}



/* =========================================================
   START SELLING
========================================================= */

const ctaBtn =
    document.querySelector(".cta-btn");


if (ctaBtn) {

    ctaBtn.addEventListener("click", () => {

        alert("Seller registration will be connected soon.");

    });

}