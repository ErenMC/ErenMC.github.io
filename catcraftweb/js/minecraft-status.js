function fetchServerStatus(address) {
    return new Promise((resolve, reject) => {
        const url = `https://api.mcsrvstat.us/2/${address}`;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(`Failed to fetch server status for ${address}`);
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
}

function renderServerList() {
    const serverListElement = document.getElementById('serverList');
    serverListElement.innerHTML = '';

    const servers = [
        'play.catcraftmc.ru'
    ];

    servers.forEach(server => {
        fetchServerStatus(server)
            .then(data => {
                const serverElement = document.createElement('div');
                serverElement.classList.add('server');
                serverElement.innerHTML = `
                    ${data.hostname} <strong>Онлайн:</strong> ${data.players.online}/${data.players.max}
                `;
                serverListElement.appendChild(serverElement);
            })
            .catch(error => {
                console.error(error);
                const errorElement = document.createElement('div');
                errorElement.classList.add('server');
                errorElement.innerHTML = `
                    <h2>Error</h2>
                    <p>Failed to fetch server status for ${server}</p>
                `;
                serverListElement.appendChild(errorElement);
            });
    });
}

function startAutoUpdate() {
    renderServerList();

    setInterval(() => {
        renderServerList();
    }, 30000);
}

document.addEventListener('DOMContentLoaded', () => {
    startAutoUpdate();
});
