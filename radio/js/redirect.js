// Функция для определения типа устройства и перенаправления с задержкой
function redirectBasedOnDeviceWithDelay() {
    // Проверяем юзер-агент на наличие мобильных устройств
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Если пользователь зашел с мобильного устройства, перенаправляем на мобильную версию
        setTimeout(function() {
            window.location.href = "mobile/index.html";
        }, 2000); // 2000 миллисекунд = 2 секунды
    } else {
        // Если пользователь зашел с десктопного устройства, перенаправляем на десктопную версию
        setTimeout(function() {
            window.location.href = "web/index.html";
        }, 2000); // 2000 миллисекунд = 2 секунды
    }
}

// Вызываем функцию перенаправления после загрузки страницы с задержкой
window.onload = redirectBasedOnDeviceWithDelay;
