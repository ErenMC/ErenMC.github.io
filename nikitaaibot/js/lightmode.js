document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const container = document.querySelector(".container");
    const playerContainer = document.querySelector(".player-container");

    function toggleTheme() {
        body.classList.toggle("dark-mode");
        container.classList.toggle("dark-mode");
        playerContainer.classList.toggle("dark-mode"); // Добавляем или удаляем класс dark-mode у контейнера плеера

        if (body.classList.contains("dark-mode")) {
            body.style.backgroundImage = "url('images/dark-background.jpg')";
            body.style.backgroundColor = "#333";
            container.style.backgroundColor = "#222";
            themeToggle.textContent = "🌙";
        } else {
            body.style.backgroundImage = "url('images/light-background.jpg')";
            body.style.backgroundColor = "#FFFFFF";
            container.style.backgroundColor = "#FFFFFF";
            themeToggle.textContent = "☀️";
        }
    }

    body.style.backgroundImage = "url('images/light-background.jpg')";
    themeToggle.textContent = "☀️";

    themeToggle.addEventListener("click", toggleTheme);
});
