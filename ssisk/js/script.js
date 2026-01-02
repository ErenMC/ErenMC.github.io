document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    
    const fullText = "Ты тупое животное, а не человек";
    let currentText = "";
    let charIndex = 0;
    let typingSpeed = 100;

    function typeWriter() {
        if (charIndex < fullText.length) {
            currentText += fullText.charAt(charIndex);
            typingText.textContent = currentText;
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    setTimeout(typeWriter, 500);

    btn1.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
    });

    btn2.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
    });

    typingText.addEventListener('click', function() {
        currentText = "";
        charIndex = 0;
        typingText.textContent = "";
        
        typeWriter();
    });

});
