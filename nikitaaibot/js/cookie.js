// Функция для принятия куки
function acceptCookie() {
    document.getElementById('cookieConsent').style.display = 'none'; // Скрываем плашку
    saveCookie(true); // Сохраняем куки с согласием
}

// Функция для отказа от куки
function rejectCookie() {
    document.getElementById('cookieConsent').style.display = 'none'; // Скрываем плашку
    saveCookie(false); // Сохраняем куки с отказом
}

// Функция для сохранения куки
function saveCookie(accepted) {
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); // Срок действия куки - 1 год

    var expires = "expires=" + date.toUTCString();
    var cookieValue = "accepted=" + accepted + ";" + expires + ";path=/";
    
    document.cookie = cookieValue;

    if (accepted) {
        console.log("Куки приняты!");
    } else {
        console.log("Куки отклонены!");
    }
}

// Функция для получения значения куки
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Добавляем обработчики событий на кнопки "Принять" и "Отказаться" после загрузки документа
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('acceptCookie').addEventListener('click', acceptCookie);
    document.getElementById('rejectCookie').addEventListener('click', rejectCookie);

    // Показываем плашку подтверждения куки
    document.getElementById('cookieConsent').classList.add('show');

    // Проверяем, получается ли получить значение куки с именем "accepted"
    console.log("Значение куки 'accepted':", getCookie('accepted'));
});
