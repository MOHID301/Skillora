
/* =========================================================
   SKILLORA — ABOUT PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");
            menuBtn.classList.toggle("active");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("mobile-open");
                menuBtn.classList.remove("active");

            });

        });

    }


    /* =====================================================
       THEME
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("skillora-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            localStorage.setItem(
                "skillora-theme",
                isLight ? "light" : "dark"
            );

        });

    }


    /* =====================================================
       AUTH BUTTONS
    ===================================================== */

   
    const joinCta = document.getElementById("joinCta");

   

    if (joinCta) {

        joinCta.addEventListener("click", (event) => {

            event.preventDefault();

            alert("Skillora registration will be available soon.");

        });

    }


    /* =====================================================
       SIMPLE HERO PARALLAX
    ===================================================== */

    const visual = document.querySelector(".about-hero-visual");

    if (visual && window.innerWidth > 760) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 10;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 10;

            visual.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".mission-card, .value-card, .connection-item, .about-stat"
    );

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("about-reveal");

        revealObserver.observe(element);

    });

});
/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");
        menuBtn.classList.toggle("active");

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");
            menuBtn.classList.remove("active");

        });

    });

}


/* =========================================================
   THEME
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

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "skillora-theme",
            isLight ? "light" : "dark"
        );

        if (themeIcon) {
            themeIcon.textContent = isLight ? "☾" : "☀";
        }

    });

}
console.log("Supabase client initialized successfully:", supabaseClient);