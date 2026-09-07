        // ============================================
// SKILLORA MY SERVICES
// ============================================


document.addEventListener("DOMContentLoaded", async () => {

    const loading =
        document.getElementById("servicesLoading");

    const emptyState =
        document.getElementById("servicesEmpty");

    const grid =
        document.getElementById("servicesGrid");


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
    // LOAD SERVICES
    // ========================================

    await loadServices();


    async function loadServices() {

        loading.style.display = "block";
        emptyState.style.display = "none";
        grid.style.display = "none";


        const { data: services, error } =
            await supabaseClient
                .from("services")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });


        loading.style.display = "none";


        if (error) {

            console.error(
                "Services loading error:",
                error
            );

            loading.style.display = "block";

            loading.textContent =
                "Unable to load your services.";

            return;
        }


        if (!services || services.length === 0) {

            emptyState.style.display = "block";

            return;
        }


        renderServices(services);

        grid.style.display = "grid";
    }


    // ========================================
    // RENDER SERVICES
    // ========================================

    function renderServices(services) {

        grid.innerHTML = "";

        services.forEach((service) => {

            const card =
                document.createElement("div");

            card.className = "service-card";

            card.innerHTML = `
                <div class="service-card-top">
                    <span class="service-status ${service.status}">
                        ${service.status}
                    </span>
                </div>

                <div class="service-category">
                    ${service.category || "Uncategorized"}
                </div>

                <h3>${escapeHtml(service.title)}</h3>

                <p class="service-desc">
                    ${escapeHtml(service.description || "No description provided.")}
                </p>

                <div class="service-card-price">
                    $${Number(service.price).toFixed(2)}
                    <span>starting price</span>
                </div>

                <div class="service-card-actions">
                    <button class="edit-btn" data-id="${service.id}">
                        Edit
                    </button>

                    <button class="toggle-btn" data-id="${service.id}" data-status="${service.status}">
                        ${service.status === "active" ? "Pause" : "Activate"}
                    </button>

                    <button class="delete-btn" data-id="${service.id}">
                        Delete
                    </button>
                </div>
            `;

            grid.appendChild(card);

        });
    }


    // ========================================
    // BUTTON CLICKS (event delegation)
    // ========================================

    grid.addEventListener("click", async (e) => {

        const editBtn = e.target.closest(".edit-btn");
        const toggleBtn = e.target.closest(".toggle-btn");
        const deleteBtn = e.target.closest(".delete-btn");


        // ====================================
        // EDIT
        // ====================================

        if (editBtn) {

            const id = editBtn.dataset.id;

            window.location.href =
                `/HTML/add-service.html?id=${id}`;

            return;
        }


        // ====================================
        // TOGGLE ACTIVE / PAUSED
        // ====================================

        if (toggleBtn) {

            const id = toggleBtn.dataset.id;

            const currentStatus =
                toggleBtn.dataset.status;

            const newStatus =
                currentStatus === "active"
                    ? "paused"
                    : "active";

            toggleBtn.disabled = true;

            const { error } =
                await supabaseClient
                    .from("services")
                    .update({
                        status: newStatus,
                        updated_at: new Date().toISOString()
                    })
                    .eq("id", id)
                    .eq("user_id", user.id);

            toggleBtn.disabled = false;

            if (error) {

                console.error(
                    "Status update error:",
                    error
                );

                alert(
                    "Unable to update status. Please try again."
                );

                return;
            }

            await loadServices();

            return;
        }


        // ====================================
        // DELETE
        // ====================================

        if (deleteBtn) {

            const id = deleteBtn.dataset.id;

            const confirmed = confirm(
                "Are you sure you want to delete this service? This cannot be undone."
            );

            if (!confirmed) {
                return;
            }

            deleteBtn.disabled = true;
            deleteBtn.textContent = "Deleting...";

            const { error } =
                await supabaseClient
                    .from("services")
                    .delete()
                    .eq("id", id)
                    .eq("user_id", user.id);

            if (error) {

                console.error(
                    "Delete error:",
                    error
                );

                alert(
                    "Unable to delete service. Please try again."
                );

                deleteBtn.disabled = false;
                deleteBtn.textContent = "Delete";

                return;
            }

            await loadServices();

            return;
        }

    });


    // ========================================
    // HELPER: ESCAPE HTML
    // (prevents XSS from title/description)
    // ========================================

    function escapeHtml(str) {

        const div = document.createElement("div");

        div.textContent = str;

        return div.innerHTML;
    }

});