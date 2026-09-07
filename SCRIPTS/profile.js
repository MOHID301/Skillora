// ============================================
// SKILLORA PROFILE
// ============================================


document.addEventListener("DOMContentLoaded", async () => {

    const loading =
        document.getElementById("profileLoading");

    const profileCard =
        document.getElementById("profileCard");


    // ========================================
    // GET LOGGED-IN USER
    // ========================================

    const user = await getCurrentUser();


    // ========================================
    // NOT LOGGED IN
    // ========================================

    if (!user) {

        window.location.href =
            "/HTML/login.html";

        return;
    }


    // ========================================
    // GET PROFILE
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

        loading.textContent =
            "Unable to load your profile.";

        return;
    }


    console.log(
        "Profile loaded:",
        profile
    );


    // ========================================
    // DISPLAY PROFILE
    // ========================================

    const fullName =
        profile.full_name ||
        "User";

    const username =
        profile.username ||
        "username";

    const role =
        profile.role ||
        "buyer";


    // ========================================
    // NAME
    // ========================================

    document.getElementById(
        "profileDisplayName"
    ).textContent = fullName;


    // ========================================
    // USERNAME
    // ========================================

    document.getElementById(
        "profileDisplayUsername"
    ).textContent = `@${username}`;


    document.getElementById(
        "profileUsername"
    ).textContent = username;


    // ========================================
    // FULL NAME
    // ========================================

    document.getElementById(
        "profileFullName"
    ).textContent = fullName;


    // ========================================
    // EMAIL
    // ========================================

    document.getElementById(
        "profileEmail"
    ).textContent = user.email || "—";


    // ========================================
    // ROLE
    // ========================================

    document.getElementById(
        "profileRole"
    ).textContent = role;


    // ========================================
    // AVATAR INITIAL
    // ========================================

    const avatar =
        document.getElementById("profileAvatar");

    avatar.textContent =
        fullName.charAt(0).toUpperCase();


    // ========================================
    // MEMBER SINCE
    // ========================================

    if (profile.created_at) {

        const date =
            new Date(profile.created_at);

        document.getElementById(
            "profileCreatedAt"
        ).textContent =
            date.toLocaleDateString(
                "en-US",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );
    }


    // ========================================
    // SHOW PROFILE
    // ========================================

    loading.style.display = "none";

    profileCard.style.display = "block";


    // ========================================
    // EDIT PROFILE
    // ========================================

    document
        .getElementById("editProfileBtn")
        .addEventListener("click", () => {

            window.location.href =
                "/HTML/edit-profile.html";

        });

});