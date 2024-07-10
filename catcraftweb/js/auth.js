
function authorizeDiscord() {
    console.log('Кнопка "Войти" нажата, начинается авторизация через Discord...');
    fetch('athorization_process.php') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при авторизации через Discord');
            }
            return response.json();
        })
        .then(user => {
            console.log('Пользователь успешно авторизован:', user);
            updateUserInfo(user);
        })
        .catch(error => {
            console.error('Ошибка при авторизации через Discord:', error);
        });
}

window.onload = function() {
    loadUserInfo();
};

function updateUserInfo(user) {
    document.getElementById('login-button').classList.add('hidden');
    const userInfo = document.getElementById('user-info');
    userInfo.classList.remove('hidden');
    document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
    document.getElementById('discord-name').textContent = `Discord: ${user.discordName}`;
    document.getElementById('minecraft-name').textContent = `Minecraft: ${user.minecraftName}`;
    document.getElementById('balance').textContent = `Баланс: ${user.balance}`;

    document.getElementById('avatar').addEventListener('click', () => {
        const userMenu = document.getElementById('user-menu');
        userMenu.classList.toggle('hidden');
    });
}

function loadUserInfo() {
    const cookies = document.cookie.split('; ');
    let sessionToken = null;
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name === 'session_token') {
            sessionToken = value;
        }
    });

    if (sessionToken) {
        fetch('get_user_info.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session_token: sessionToken })
        })
        .then(response => response.json())
        .then(user => {
            if (user) {
                updateUserInfo(user);
            } else {
                document.getElementById('login-button').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Ошибка при получении информации о пользователе:', error);
            document.getElementById('login-button').classList.remove('hidden');
        });
    } else {
        document.getElementById('login-button').classList.remove('hidden');
    }
}

function updateUserInfo(user) {
    document.getElementById('login-button').classList.add('hidden'); 
    const userInfo = document.getElementById('user-info');
    userInfo.classList.remove('hidden'); 
    document.getElementById('avatar').src = user.avatar; 
    document.getElementById('discord-name').textContent = `Discord: ${user.discordName}`; 
    document.getElementById('minecraft-name').textContent = `Minecraft: ${user.minecraftName}`; 
    document.getElementById('balance').textContent = `Баланс: ${user.balance}`; 

    document.getElementById('avatar').addEventListener('click', () => {
        const userMenu = document.getElementById('user-menu');
        userMenu.classList.toggle('hidden');
    });
}

function gotoSocialNetwork() {
    window.location.href = 'https://example.com/social-network';
}

function logout() {
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.reload();
}

window.onload = function() {
    loadUserInfo();
};
