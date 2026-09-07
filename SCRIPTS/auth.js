
// ============================================
// SIGN UP
// ============================================

async function signUp(email, password, username, fullName) {

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
                full_name: fullName
            }
        }
    });

    if (error) {
        console.error("Signup error:", error);

        return {
            success: false,
            message: error.message
        };
    }

    console.log("Signup successful:", data);

    return {
        success: true,
        data: data
    };
}


// ============================================
// LOGIN
// ============================================

async function login(email, password) {

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error("Login error:", error);

        return {
            success: false,
            message: error.message
        };
    }

    console.log("Login successful:", data);

    return {
        success: true,
        data: data
    };
}


// ============================================
// LOGOUT
// ============================================

async function logout() {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        return false;
    }

    console.log("Logged out successfully.");

    return true;
}


// ============================================
// GET CURRENT USER
// ============================================

async function getCurrentUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {
        console.error("User error:", error);
        return null;
    }

    return user;
}


// ============================================
// UPDATE NAVBAR
// ============================================

// ============================================
// UPDATE NAVBAR
// ============================================

async function updateNavbar() {

    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");

    const userMenu = document.getElementById("userMenu");

    const navUsername = document.getElementById("navUsername");
    const dropdownUsername =
        document.getElementById("dropdownUsername");

    const dropdownEmail =
        document.getElementById("dropdownEmail");


    // If this page does not have the navbar
    // elements, simply stop.
    if (!loginBtn || !signupBtn) {
        return;
    }


    const user = await getCurrentUser();


    // ========================================
    // USER NOT LOGGED IN
    // ========================================

    if (!user) {

        loginBtn.style.display = "";
        signupBtn.style.display = "";

        if (userMenu) {
            userMenu.style.display = "none";
            userMenu.classList.remove("active");
        }

        loginBtn.href = "/HTML/login.html";
        signupBtn.href = "/HTML/signup.html";

        loginBtn.textContent = "Log in";
        signupBtn.textContent = "Join Skillora";

        return;
    }


    // ========================================
    // USER LOGGED IN
    // ========================================

    loginBtn.style.display = "none";
    signupBtn.style.display = "none";


    if (userMenu) {

        userMenu.style.display = "block";

    }


    // ========================================
    // GET LATEST NAME FROM PROFILES TABLE
    // (not from stale auth metadata)
    // ========================================

    let displayName = "User";

    const { data: profile, error } =
        await supabaseClient
            .from("profiles")
            .select("full_name, username")
            .eq("id", user.id)
            .single();

    if (error) {

        console.error(
            "Navbar profile fetch error:",
            error
        );

        // Fallback to auth metadata if profile fetch fails
        displayName =
            user.user_metadata?.username ||
            user.user_metadata?.full_name ||
            "User";

    } else {

        displayName =
            profile.full_name ||
            profile.username ||
            "User";
    }


    // Navbar username

    if (navUsername) {
        navUsername.textContent = displayName;
    }


    // Dropdown username

    if (dropdownUsername) {
        dropdownUsername.textContent = displayName;
    }


    // Dropdown email

    if (dropdownEmail) {
        dropdownEmail.textContent = user.email || "";
    }
}


// ============================================
// USER DROPDOWN
// ============================================

document.addEventListener("click", function (event) {

    const userMenu =
        document.getElementById("userMenu");

    const userBtn =
        document.getElementById("userBtn");


    if (!userMenu || !userBtn) {
        return;
    }


    // User clicked the Welcome button

    if (userBtn.contains(event.target)) {

        userMenu.classList.toggle("active");

        return;
    }


    // User clicked outside

    if (!userMenu.contains(event.target)) {

        userMenu.classList.remove("active");

    }

});


// ============================================
// LOGOUT BUTTON
// ============================================

document.addEventListener("click", async function (event) {

    const logoutButton =
        event.target.closest("#logoutBtn");


    if (!logoutButton) {
        return;
    }


    logoutButton.disabled = true;
    logoutButton.textContent = "Logging out...";


    const success = await logout();


    if (success) {

        window.location.href = "/HTML/index.html";

    } else {

        logoutButton.disabled = false;
        logoutButton.textContent = "Log out";

    }

});


// ============================================
// AUTH STATE LISTENER
// ============================================

supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        console.log("Auth event:", event);

        if (session) {

            console.log(
                "Logged-in user:",
                session.user
            );

        } else {

            console.log(
                "No user logged in."
            );

        }

        updateNavbar();
    }
);


// ============================================
// INITIAL NAVBAR CHECK
// ============================================

updateNavbar();