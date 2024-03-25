window.addEventListener('load', function(){
    setTimeout(function() {
        var loader = document.getElementById('loader');
        loader.style.display = 'none';
    }, Math.random() * 5000 + 3000);
});

