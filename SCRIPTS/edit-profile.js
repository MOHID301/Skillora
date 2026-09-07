// ============================================
// SKILLORA EDIT PROFILE
// ============================================


document.addEventListener("DOMContentLoaded", async () => {

    const form =
        document.getElementById("editProfileForm");

    const formMessage =
        document.getElementById("formMessage");

    const fullNameInput =
        document.getElementById("fullNameInput");

    const usernameInput =
        document.getElementById("usernameInput");

    const emailInput =
        document.getElementById("emailInput");

    const saveBtn =
        document.getElementById("saveBtn");

    const cancelBtn =
        document.getElementById("cancelBtn");


    // ========================================
    // GET LOGGED-IN USER
    // ========================================

    const user = await getCurrentUser();


    if (!user) {

        window.location.href =
            "/HTML/login.html";

        return;
    }


    // ========================================
    // LOAD CURRENT PROFILE
    // ========================================

    const { data: profile, error } =
        await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();


    if (error) {

        console.error(
            "Profile loading error:",
            error
        );

        showMessage(
            "Unable to load your profile.",
            "error"
        );

        return;
    }


    // ========================================
    // PRE-FILL FORM
    // ========================================

    fullNameInput.value =
        profile.full_name || "";

    usernameInput.value =
        profile.username || "";

    emailInput.value =
        user.email || "";


    // ========================================
    // CANCEL BUTTON
    // ========================================

    cancelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "/HTML/profile.html";

        }
    );


    // ========================================
    // FORM SUBMIT
    // ========================================

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            hideMessage();


            const fullName =
                fullNameInput.value.trim();

            const username =
                usernameInput.value.trim();


            // ====================================
            // VALIDATION
            // ====================================

            if (!fullName) {

                showMessage(
                    "Full name is required.",
                    "error"
                );

                return;
            }


            const usernamePattern =
                /^[a-zA-Z0-9_]+$/;

            if (!usernamePattern.test(username)) {

                showMessage(
                    "Username can only contain letters, numbers and underscores.",
                    "error"
                );

                return;
            }


            // ====================================
            // CHECK USERNAME NOT TAKEN
            // (skip check if unchanged)
            // ====================================

            if (username !== profile.username) {

                const { data: existing } =
                    await supabaseClient
                        .from("profiles")
                        .select("id")
                        .eq("username", username)
                        .neq("id", user.id)
                        .maybeSingle();


                if (existing) {

                    showMessage(
                        "This username is already taken.",
                        "error"
                    );

                    return;
                }
            }


            // ====================================
            // DISABLE BUTTON
            // ====================================

            saveBtn.disabled = true;

            saveBtn.textContent =
                "Saving...";


            // ====================================
            // UPDATE PROFILE
            // ====================================

            const { error: updateError } =
                await supabaseClient
                    .from("profiles")
                    .update({
                        full_name: fullName,
                        username: username
                    })
                    .eq("id", user.id);


            saveBtn.disabled = false;

            saveBtn.textContent =
                "Save Changes";


            if (updateError) {

                console.error(
                    "Profile update error:",
                    updateError
                );

                showMessage(
                    "Something went wrong. Please try again.",
                    "error"
                );

                return;
            }


            // ====================================
            // SUCCESS
            // ====================================

            showMessage(
                "Profile updated successfully!",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "/HTML/profile.html";

            }, 1200);

        }
    );


    // ========================================
    // HELPERS
    // ========================================

    function showMessage(text, type) {

        formMessage.textContent = text;

        formMessage.className =
            `form-message ${type}`;
    }


    function hideMessage() {

        formMessage.textContent = "";

        formMessage.className =
            "form-message";
    }

});