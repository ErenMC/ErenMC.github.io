document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const container = document.querySelector(".container");

    function toggleTheme() {
        body.classList.toggle("dark-mode");
        container.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            body.style.backgroundImage = "url('images/dark-background.jpg')";
            body.style.backgroundColor = "#333";
            container.style.backgroundColor = "#222";
            themeToggle.textContent = "🌙";
        } else {
            body.style.backgroundImage = "url('images/light-background.jpg')";
            body.style.backgroundColor = "#fff";
            container.style.backgroundColor = "#f9f9f9";
            themeToggle.textContent = "☀️";
        }
    }

    body.style.backgroundImage = "url('images/light-background.jpg')";
    themeToggle.textContent = "☀️";

    themeToggle.addEventListener("click", toggleTheme);
});
