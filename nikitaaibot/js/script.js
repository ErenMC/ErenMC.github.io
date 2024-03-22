document.addEventListener("DOMContentLoaded", function() {
    const commands = document.querySelectorAll(".command");
    const tooltip = document.querySelector(".tooltip");
    const tooltipImage = document.querySelector(".tooltip-image");

    document.addEventListener("mousemove", function(event) {
        const mouseX = event.clientX + window.pageXOffset;
        const mouseY = event.clientY + window.pageYOffset;

        tooltip.style.top = mouseY + 10 + "px";
        tooltip.style.left = mouseX + 10 + "px";
    });

    commands.forEach(command => {
        command.addEventListener("mouseover", function() {
            const imageUrl = command.getAttribute("data-tooltip");
            if (imageUrl) {
                tooltipImage.setAttribute("src", imageUrl);
                tooltip.style.display = "block";
            }
        });

        command.addEventListener("mouseout", function() {
            tooltip.style.display = "none";
        });
    });

    const footerButton = document.querySelector(".footer-button");
    footerButton.addEventListener("mouseover", function() {
        const tooltipContent = footerButton.querySelector(".tooltip");
        if (tooltipContent) {
            tooltipImage.setAttribute("src", tooltipContent.getAttribute("data-tooltip"));
            tooltip.style.display = "block";
        }
    });

    footerButton.addEventListener("mouseout", function() {
        tooltip.style.display = "none";
    });
});
