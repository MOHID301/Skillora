// ============================================
// SKILLORA SIGNUP
// ============================================

const signupForm = document.getElementById("signupForm");
const signupSubmit = document.getElementById("signupSubmit");
const authMessage = document.getElementById("authMessage");


function showAuthMessage(message, type) {

    authMessage.textContent = message;

    authMessage.className = `auth-message show ${type}`;
}


signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const fullName =
        document.getElementById("fullName").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // Basic validation

    if (!fullName || !username || !email || !password) {

        showAuthMessage(
            "Please fill in all fields.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        showAuthMessage(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }


    // Disable button

    signupSubmit.disabled = true;

    signupSubmit.textContent = "Creating account...";


    try {

        const result = await signUp(
            email,
            password,
            username,
            fullName
        );


        if (!result.success) {

            showAuthMessage(
                result.message,
                "error"
            );

            signupSubmit.disabled = false;
            signupSubmit.textContent = "Create account";

            return;
        }


        // Success

        showAuthMessage(
            "Account created successfully! Check your email if confirmation is required.",
            "success"
        );


        signupForm.reset();


        signupSubmit.textContent = "Account created";


    } catch (error) {

        console.error("Signup error:", error);

        showAuthMessage(
            "Something went wrong. Please try again.",
            "error"
        );

        signupSubmit.disabled = false;

        signupSubmit.textContent = "Create account";
    }

});