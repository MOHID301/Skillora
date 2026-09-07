// ============================================
// SKILLORA LOGIN
// ============================================

const loginForm = document.getElementById("loginForm");
const loginSubmit = document.getElementById("loginSubmit");
const authMessage = document.getElementById("authMessage");


function showMessage(message, type) {

    authMessage.textContent = message;

    authMessage.className = `auth-message ${type}`;
}


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // ========================================
    // VALIDATION
    // ========================================

    if (!email || !password) {

        showMessage(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    // ========================================
    // DISABLE BUTTON
    // ========================================

    loginSubmit.disabled = true;
    loginSubmit.textContent = "Logging in...";


    try {

        // ====================================
        // LOGIN
        // ====================================

        const result = await login(
            email,
            password
        );


        // ====================================
        // LOGIN FAILED
        // ====================================

        if (!result.success) {

            showMessage(
                result.message ||
                "Login failed. Please check your credentials.",
                "error"
            );

            loginSubmit.disabled = false;
            loginSubmit.textContent = "Log in";

            return;
        }


        // ====================================
        // SUCCESS
        // ====================================

        console.log(
            "Login successful:",
            result.data
        );


        showMessage(
            "Login successful! Redirecting...",
            "success"
        );


        setTimeout(() => {

            window.location.href =
                "/HTML/index.html";

        }, 800);


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        showMessage(
            "Something went wrong. Please try again.",
            "error"
        );


        loginSubmit.disabled = false;
        loginSubmit.textContent = "Log in";

    }

});