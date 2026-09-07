// ============================================
// SKILLORA ADD / EDIT SERVICE
// ============================================


document.addEventListener("DOMContentLoaded", async () => {

    const form =
        document.getElementById("serviceForm");

    const formMessage =
        document.getElementById("formMessage");

    const formHeading =
        document.getElementById("formHeading");

    const pageTitle =
        document.getElementById("pageTitle");

    const titleInput =
        document.getElementById("titleInput");

    const descriptionInput =
        document.getElementById("descriptionInput");

    const categoryInput =
        document.getElementById("categoryInput");

    const priceInput =
        document.getElementById("priceInput");

    const imageUrlInput =
        document.getElementById("imageUrlInput");

    const statusInput =
        document.getElementById("statusInput");

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
    // CHECK EDIT MODE (via ?id=)
    // ========================================

    const params =
        new URLSearchParams(window.location.search);

    const serviceId =
        params.get("id");

    const isEditMode =
        Boolean(serviceId);


    if (isEditMode) {

        formHeading.textContent = "Edit Service";
        pageTitle.textContent = "Edit Service — Skillora";
        saveBtn.textContent = "Update Service";

        await loadServiceForEdit(serviceId);
    }


    // ========================================
    // LOAD EXISTING SERVICE (EDIT MODE)
    // ========================================

    async function loadServiceForEdit(id) {

        const { data: service, error } =
            await supabaseClient
                .from("services")
                .select("*")
                .eq("id", id)
                .eq("user_id", user.id)
                .single();

        if (error || !service) {

            console.error(
                "Service loading error:",
                error
            );

            showMessage(
                "Unable to load this service. It may not exist or you don't have access to it.",
                "error"
            );

            saveBtn.disabled = true;

            return;
        }

        titleInput.value = service.title || "";
        descriptionInput.value = service.description || "";
        categoryInput.value = service.category || "";
        priceInput.value = service.price || "";
        imageUrlInput.value = service.image_url || "";
        statusInput.value = service.status || "active";
    }


    // ========================================
    // CANCEL BUTTON
    // ========================================

    cancelBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "/HTML/my-services.html";

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


            const title =
                titleInput.value.trim();

            const description =
                descriptionInput.value.trim();

            const category =
                categoryInput.value;

            const price =
                parseFloat(priceInput.value);

            const imageUrl =
                imageUrlInput.value.trim();

            const status =
                statusInput.value;


            // ====================================
            // VALIDATION
            // ====================================

            if (!title) {

                showMessage(
                    "Service title is required.",
                    "error"
                );

                return;
            }

            if (!description) {

                showMessage(
                    "Description is required.",
                    "error"
                );

                return;
            }

            if (!category) {

                showMessage(
                    "Please select a category.",
                    "error"
                );

                return;
            }

            if (isNaN(price) || price <= 0) {

                showMessage(
                    "Please enter a valid price greater than 0.",
                    "error"
                );

                return;
            }


            // ====================================
            // DISABLE BUTTON
            // ====================================

            saveBtn.disabled = true;

            saveBtn.textContent =
                isEditMode ? "Updating..." : "Saving...";


            const payload = {
                title: title,
                description: description,
                category: category,
                price: price,
                image_url: imageUrl || null,
                status: status,
                updated_at: new Date().toISOString()
            };


            let dbError = null;


            // ====================================
            // UPDATE (EDIT MODE)
            // ====================================

            if (isEditMode) {

                const { error } =
                    await supabaseClient
                        .from("services")
                        .update(payload)
                        .eq("id", serviceId)
                        .eq("user_id", user.id);

                dbError = error;

            } else {


                // ====================================
                // INSERT (ADD MODE)
                // ====================================

                payload.user_id = user.id;

                const { error } =
                    await supabaseClient
                        .from("services")
                        .insert(payload);

                dbError = error;
            }


            saveBtn.disabled = false;

            saveBtn.textContent =
                isEditMode ? "Update Service" : "Save Service";


            if (dbError) {

                console.error(
                    "Service save error:",
                    dbError
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
                isEditMode
                    ? "Service updated successfully!"
                    : "Service added successfully!",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "/HTML/my-services.html";

            }, 1000);

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