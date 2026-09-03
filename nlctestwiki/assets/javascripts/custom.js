/* Плавное появление контента и доп. улучшения NLCloud wiki */
document.addEventListener("DOMContentLoaded", function () {
  var content = document.querySelector(".md-content__inner");
  if (content) {
    content.style.animation = "none";
    requestAnimationFrame(function () {
      content.style.animation = "";
    });
  }

  /* Кнопка «К началу»: постоянная видимость,
     появляется после прокрутки вниз на заданный порог. */
  var topBtn = document.querySelector(".md-top");
  var TOP_THRESHOLD = 300; /* высота, после которой кнопка видна */

  if (topBtn) {
    function updateTopButton() {
      if (window.scrollY > TOP_THRESHOLD) {
        topBtn.classList.add("md-top--visible");
      } else {
        topBtn.classList.remove("md-top--visible");
      }
    }

    /* Пассивный слушатель — не блокирует прокрутку */
    window.addEventListener("scroll", updateTopButton, { passive: true });
    window.addEventListener("resize", updateTopButton);
    updateTopButton();
  }
});
