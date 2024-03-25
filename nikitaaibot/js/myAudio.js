const audio = document.getElementById('myAudio');
const playerWrapper = document.getElementById('playerWrapper');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeControl = document.getElementById('volumeControl');
const trackName = document.getElementById('trackName');

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('myAudio');
    
    // Воспроизведение аудио при загрузке страницы (Не работает)
    audio.play().then(function() {
        console.log('Аудио начало воспроизводиться');
    }).catch(function(error) {
        console.log('Ошибка воспроизведения аудио: ', error);
    });
});

let timeoutId; // Переменная для хранения идентификатора таймера

// Обработчик события наведения курсора на плеер
playerWrapper.addEventListener('mouseover', function() {
    clearTimeout(timeoutId);
    playerWrapper.classList.add('expanded'); 
    volumeControl.style.display = 'block'; 
    volumePercentage.style.display = 'inline'; 
});

// Обработчик события удаления курсора с плеера
playerWrapper.addEventListener('mouseout', function() {
    timeoutId = setTimeout(function() {
        playerWrapper.classList.remove('expanded'); 
        volumeControl.style.display = 'none'; 
        volumePercentage.style.display = 'none'; 
    }, 3000);
});

// Устанавливаем начальную громкость аудио
audio.volume = 0.1;

// Устанавливаем начальное значение процента громкости
document.getElementById('volumePercentage').textContent = '10%';

// Обработчик события клика на кнопке Play/Pause
playPauseBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸'; 
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️'; 
    }
});

// Обработчик события изменения громкости
volumeControl.addEventListener('input', function() {
    audio.volume = volumeControl.value;
});

// Обработчик события начала воспроизведения трека
audio.addEventListener('playing', function() {
    console.log('Трек начал воспроизводиться:', audio.src);
    trackName.textContent = getFileName(audio.src); // Отображаем название трека (Зависит от URL) 

    // Запускаем функцию для перемещения текста
    moveTrackName();
});

// Обработчик события паузы воспроизведения трека
audio.addEventListener('pause', function() {
    console.log('Трек приостановлен:', audio.src);
    clearInterval(moveInterval);
});

// Обработчик события окончания воспроизведения трека
audio.addEventListener('ended', function() {
    console.log('Трек завершен:', audio.src);
    trackName.textContent = ''; 
});

// Обработчик события изменения громкости
volumeControl.addEventListener('input', function() {
    const volumePercentage = Math.round(volumeControl.value * 100);
    audio.volume = volumeControl.value; 
    document.getElementById('volumePercentage').textContent = volumePercentage + '%'; 
});


// Функция для получения названия файла из URL (Toщё не робит но может когда нибуть будет)
function getFileName(url) {
    return url.split('/').pop(); 
}

// Функция для перемещения текста с названием трека
function moveTrackName() {
    let xPos = 0;
    const maxWidth = document.getElementById('playerWrapper').offsetWidth - trackName.offsetWidth - 10;
    const moveInterval = setInterval(function() {
        if (xPos < maxWidth) {
            xPos += 1; 
            trackName.style.transform = `translateX(-${xPos}px)`; 
        } else {
            clearInterval(moveInterval); 
        }
    }, 30); // Частота обновления 30 мс (примерно 33 кадра в секунду но хз)


    return moveInterval;
}


audio.addEventListener('playing', function() {
    console.log('Трек начал воспроизводиться:', audio.src);
    trackName.textContent = getFileName(audio.src); // Отображаем название трека

    // Очищает предыдущий интервал, если он есть
    clearInterval(moveInterval);
    // Запускает функцию для перемещения текста
    moveInterval = moveTrackName();
});

