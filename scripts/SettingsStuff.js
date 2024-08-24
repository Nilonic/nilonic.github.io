document.addEventListener("DOMContentLoaded", () => {
    // Get the toggles
    const accessibleFontToggle = document.getElementById("accessible-font-toggle");
    const fetchGithubStarsToggle = document.getElementById("fetch-github-stars-toggle");
    const darkModeToggle = document.getElementById("Dark-Mode");

    // Retrieve settings from LocalStorage
    const accessibleFontSetting = localStorage.getItem("accessibleFontEnabled");
    const fetchGithubStarsSetting = localStorage.getItem("fetchGithubStarsEnabled");
    const darkModeSetting = localStorage.getItem("darkMode");

    // Set toggles based on LocalStorage values
    if (accessibleFontSetting !== null) {
        accessibleFontToggle.checked = accessibleFontSetting === "true";
    }

    if (fetchGithubStarsSetting !== null) {
        fetchGithubStarsToggle.checked = fetchGithubStarsSetting === "true";
    }

    if (darkModeSetting !== null) {
        darkModeToggle.checked = darkModeSetting === "true";
    }

    // Apply accessible font if the toggle is set
    if (accessibleFontToggle.checked) {
        document.body.style.fontFamily = '"Arial", "Helvetica", sans-serif'; // Use an accessible font
    }

    if (darkModeToggle.checked) {
        enableDarkMode()
    }

    // Event listeners to update LocalStorage when toggles are changed
    accessibleFontToggle.addEventListener("change", () => {
        localStorage.setItem("accessibleFontEnabled", accessibleFontToggle.checked);
        // Apply or remove the accessible font
        if (accessibleFontToggle.checked) {
            document.body.style.fontFamily = '"Arial", "Helvetica", sans-serif';
        } else {
            document.body.style.fontFamily = ""; // Reset to default font
        }
    });

    fetchGithubStarsToggle.addEventListener("change", () => {
        localStorage.setItem("fetchGithubStarsEnabled", fetchGithubStarsToggle.checked);
    });

    darkModeToggle.addEventListener("change", () => {
        localStorage.setItem("darkMode", darkModeToggle.checked)
        if (darkModeToggle.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    })

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
    }
});
