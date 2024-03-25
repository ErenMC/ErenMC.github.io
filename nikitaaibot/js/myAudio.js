const audio = document.getElementById('myAudio');
const playerWrapper = document.getElementById('playerWrapper');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const trackName = document.getElementById('trackName');

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('myAudio');
    
    // Воспроизведение аудио при загрузке страницы
    audio.play().then(function() {
        console.log('Аудио начало воспроизводиться');
    }).catch(function(error) {
        console.log('Ошибка воспроизведения аудио: ', error);
    });
});

let timeoutId; // Переменная для хранения идентификатора таймера

// Обработчик события наведения курсора на плеер
playerWrapper.addEventListener('mouseover', function() {
    clearTimeout(timeoutId); // Очищаем таймер, чтобы плеер оставался открытым
    playerWrapper.classList.add('expanded'); // Добавляем класс для развернутого плеера
    volumeControl.style.display = 'block'; // Показываем ползунок громкости
    volumePercentage.style.display = 'inline'; // Показываем проценты громкости
});

// Обработчик события удаления курсора с плеера
playerWrapper.addEventListener('mouseout', function() {
    timeoutId = setTimeout(function() {
        playerWrapper.classList.remove('expanded'); // Удаляем класс для свернутого плеера
        volumeControl.style.display = 'none'; // Скрываем ползунок громкости
        volumePercentage.style.display = 'none'; // Скрываем проценты громкости
    }, 5000); // Устанавливаем время задержки в 5 секунд (5000 миллисекунд)
});

// Устанавливаем начальную громкость аудио
audio.volume = 0.1;

// Устанавливаем начальное значение процента громкости
document.getElementById('volumePercentage').textContent = '10%';

// Обработчик события клика на кнопке Play/Pause
playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸'; // Изменяем иконку на паузу
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️'; // Изменяем иконку на плей
    }
});

// Обработчик события изменения громкости
volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
});

// Обработчик события начала воспроизведения трека
audio.addEventListener('playing', function() {
    console.log('Трек начал воспроизводиться:', audio.src);
    trackName.textContent = getFileName(audio.src); // Отображаем название трека

    // Запускаем функцию для перемещения текста
    moveTrackName();
});

// Обработчик события паузы воспроизведения трека
audio.addEventListener('pause', function() {
    console.log('Трек приостановлен:', audio.src);
    // Очищаем интервал, чтобы остановить движение текста
    clearInterval(moveInterval);
});

// Обработчик события окончания воспроизведения трека
audio.addEventListener('ended', function() {
    console.log('Трек завершен:', audio.src);
    trackName.textContent = ''; // Очищаем отображаемое название трека
});

// Обработчик события изменения громкости
volumeControl.addEventListener('input', function() {
    const volumePercentage = Math.round(volumeControl.value * 100); // Вычисляем процент громкости
    audio.volume = volumeControl.value; // Устанавливаем громкость аудио
    document.getElementById('volumePercentage').textContent = volumePercentage + '%'; // Обновляем отображение процента громкости
});


// Функция для получения названия файла из URL
function getFileName(url) {
    return url.split('/').pop(); // Получаем последний элемент после разделения URL по '/'
}

// Функция для перемещения текста с названием трека
function moveTrackName() {
    let xPos = 0;
    const maxWidth = document.getElementById('playerWrapper').offsetWidth - trackName.offsetWidth - 10; // Вычисляем максимальную ширину, учитывая отступы
    const moveInterval = setInterval(function() {
        if (xPos < maxWidth) {
            xPos += 1; // Увеличиваем позицию текста на 1 пиксель вправо
            trackName.style.transform = `translateX(-${xPos}px)`; // Применяем новую позицию
        } else {
            clearInterval(moveInterval); // Очищаем интервал
        }
    }, 30); // Частота обновления 30 мс (примерно 33 кадра в секунду)

    // Запоминаем интервал, чтобы можно было его остановить при необходимости
    return moveInterval;
}

// Вызываем функцию для перемещения текста при начале воспроизведения трека
audio.addEventListener('playing', function() {
    console.log('Трек начал воспроизводиться:', audio.src);
    trackName.textContent = getFileName(audio.src); // Отображаем название трека

    // Очищаем предыдущий интервал, если он есть
    clearInterval(moveInterval);
    // Запускаем функцию для перемещения текста
    moveInterval = moveTrackName();
});

