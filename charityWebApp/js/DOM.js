//search filters clean
document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clearBtn");
    const form = document.getElementById("searchForm");

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            form.reset();
            document.getElementById("upcoming").innerHTML = "";
        });
    }
});

