console.log("Portfolio site loaded successfully!");

const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Light Mode" : "Dark Mode";
    toggleButton.setAttribute("aria-label", String(isDark));
})