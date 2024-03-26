function redirectBasedOnDeviceWithDelay() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(function() {
            window.location.href = "mobile/index.html";
        }, 2000);
    } else {
        setTimeout(function() {
            window.location.href = "web/index.html";
        }, 2000);
    }
}

window.onload = redirectBasedOnDeviceWithDelay;
