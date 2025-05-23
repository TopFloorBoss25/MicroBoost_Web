// guiltypleasure_script.js
document.addEventListener('DOMContentLoaded', () => {
    const promiseModal = document.getElementById('promiseModal');
    const closePromiseModalButton = document.getElementById('closePromiseModal');
    const agreeButton = document.getElementById('agreeButton');
    const shakeButton = document.getElementById('shakeButton');
    const shakerBox = document.getElementById('shakerBox');
    const shakeCountDisplay = document.getElementById('shakeCount');
    const resultDisplay = document.getElementById('resultDisplay');
    const resultTextElement = document.getElementById('resultText');
    const resultGifElement = document.getElementById('resultGif');

    const shakeSound = document.getElementById('shakeSound'); // Zorg dat dit audio element bestaat in HTML
    const openBoxSound = document.getElementById('openBoxSound'); // Zorg dat dit audio element bestaat in HTML

    const SHAKES_NEEDED = 10;
    let currentShakes = 0;
    let pactAgreed = false;
    let alreadyOpenedToday = false;

    // Lijst van Guilty Pleasures (kortere lijst voor dit concept is prima)
    // In guiltypleasure_script.js

const pleasures = [
    // Korte & Snelle Verwennerijen
    { text: "Enjoy your favorite sugary drink right now!" },
    { text: "Eat that one cookie/chocolate bar you've been saving." },
    { text: "Savor a piece of fruit you really love, slowly." },
    { text: "Make a cup of your fanciest tea or coffee." },
    { text: "Have an extra scoop of ice cream." },
    { text: "Put extra cheese on whatever you're eating next." },
    { text: "A little online window shopping (no buying necessary!)." },
    { text: "Listen to your absolute favorite cheesy pop song on repeat." },
    { text: "Watch 2-3 super funny short videos online." },
    { text: "Take 5 minutes to just stare out the window and daydream." },
    { text: "Wear your comfiest, most ridiculous socks all day." },
    { text: "Give yourself a 5-minute hand massage with nice lotion." },
    { text: "Sing out loud (badly if you want!) to one song." },
    { text: "Read one chapter of a purely for-fun book." },
    { text: "Send a funny meme to a friend." },

    // Iets Meer Tijd / Ontspanning
    { text: "Take a 15-minute 'do absolutely nothing' break." },
    { text: "Scroll endlessly on your favorite social media for 10-15 minutes (guilt-free!)." },
    { text: "Watch ONE episode of that show you're currently binging." },
    { text: "Take a slightly longer shower or a quick relaxing bath." },
    { text: "Browse dream vacation destinations online for 20 minutes." },
    { text: "Play a casual game on your phone/computer for 15 minutes." },
    { text: "Spend 15 minutes on a simple, fun craft or doodle." },
    { text: "Look through old photos that make you happy." },
    { text: "Sit in a comfy chair and just listen to music for 15 minutes." },
    { text: "Put on a face mask and relax." },
    { text: "Light a scented candle you love." },
    { text: "Watch the sunset or sunrise (if applicable)." },
    { text: "Re-watch a favorite scene from a beloved movie." },
    { text: "Order that specific coffee drink you rarely get." },

    // "Verdient" / Iets Grotere Beloningen
    { text: "Order takeout for your next meal instead of cooking." },
    { text: "Eat that specific food you've been craving all week!" },
    { text: "Allow yourself an extra 30 minutes of sleep or a short nap." },
    { text: "Buy that small, inexpensive item you've had your eye on." },
    { text: "Dedicate 30 minutes to a hobby you've neglected." },
    { text: "Take a 'no chores' hour where you completely ignore responsibilities." },
    { text: "Watch an entire movie in one sitting." },
    { text: "Have breakfast for dinner (or dinner for breakfast!)." },
    { text: "Spend an hour reading a book purely for pleasure." },
    { text: "Call a friend just to chat and laugh for a good while." },
    { text: "Wear your absolute favorite (but maybe impractical) outfit just because." },
    { text: "Take a scenic drive or walk with no particular destination." },
    { text: "Go to bed 30 minutes earlier than usual, just to lounge." },

    // Speels & Silly
    { text: "Build a pillow fort (yes, even as an adult!)." },
    { text: "Have a solo dance party to 3 of your favorite songs." },
    { text: "Try to learn a new, useless but fun skill from a 5-minute tutorial (like a magic trick)." },
    { text: "Speak in a silly accent for the next 10 minutes (if you're alone!)." },
    { text: "Write a ridiculous short poem or story." },
    { text: "Look up a list of 'dad jokes' and tell one to someone (or yourself)." },
    { text: "Spend 10 minutes just people-watching (if you can do so safely)." },
    { text: "Try to juggle (with soft items if you're a beginner!)." },
    { text: "Make a funny face at yourself in the mirror until you laugh." }
    ];

    function updateShakeCountDisplay() {
        if (shakeCountDisplay) shakeCountDisplay.textContent = currentShakes;
    }

    // In guiltypleasure_script.js
function triggerShakeAnimation() {
    if (!shakerBox) return;
    shakerBox.classList.remove('shaking'); // Eerst verwijderen als het er nog op zat
    void shakerBox.offsetWidth; // Forceer reflow
    shakerBox.classList.add('shaking');

    if (shakeSound && shakeSound.readyState >= 2) {
        shakeSound.currentTime = 0;
        shakeSound.play().catch(e => console.warn("Shake sound error:", e));
    }
    // De CSS animatie duurt nu 0.4s en speelt 2x.
    // Het is niet strikt nodig om te wachten tot de animatie volledig klaar is met het verwijderen van de class,
    // maar als je wilt dat de class pas na de animatie wordt verwijderd:
    // setTimeout(() => {
    //     shakerBox.classList.remove('shaking');
    // }, 800); // 0.4s * 2 = 800ms
}

    function openTheBox() {
    if (!shakerBox || !resultDisplay || !resultTextElement) return;

    shakerBox.classList.add('open'); // CSS animatie voor openen
    if (openBoxSound && openBoxSound.readyState >= 2) {
        openBoxSound.play().catch(e => console.warn("Open box sound error:", e));
    }

    // De 'pleasures' array bevat nu objecten met alleen een 'text' eigenschap
    const randomPleasure = pleasures[Math.floor(Math.random() * pleasures.length)];
    
    resultTextElement.textContent = `Woohoo! You got: "${randomPleasure.text}"`; // Toon alleen de tekst


   if (resultGifElement) { // Verberg de GIF container altijd als we geen GIFs gebruiken
       resultGifElement.style.display = 'none';
       resultGifElement.src = ''; // Maak src leeg
   }


    resultDisplay.classList.add('show'); // Fade in het resultaat

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.3 }, angle: 90, scalar: 1.3, drift: 0, ticks: 300 });
    }

    if(shakeButton) shakeButton.disabled = true;
    if(shakeButton) shakeButton.innerHTML = '<i class="fas fa-check"></i> Treat Claimed!';
    localStorage.setItem('guiltyPleasureLastOpenDate', new Date().toLocaleDateString());
    alreadyOpenedToday = true;
}

    function handleShake() {
        if (!pactAgreed || alreadyOpenedToday || !shakeButton || shakeButton.disabled) return;

        currentShakes++;
        updateShakeCountDisplay();
        triggerShakeAnimation();

        if (currentShakes >= SHAKES_NEEDED) {
            openTheBox();
        }
    }

    // Modal & Dagelijkse Limiet Logica
    function checkDailyLimitAndPact() {
        updateShakeCountDisplay(); // Initiele count (0)
        const lastOpenDate = localStorage.getItem('guiltyPleasureLastOpenDate');
        const today = new Date().toLocaleDateString();

        if (lastOpenDate === today) {
            alreadyOpenedToday = true;
            if(shakeButton) shakeButton.disabled = true;
            if(shakeButton) shakeButton.innerHTML = '<i class="fas fa-hourglass-end"></i> Opened for Today!';
            if(resultTextElement) resultTextElement.textContent = "You've already claimed your treat today. See you tomorrow!";
            if(resultDisplay) resultDisplay.classList.add('show'); // Toon het bericht direct
            if (promiseModal) promiseModal.style.display = "none";
        } else {
            alreadyOpenedToday = false;
            if (promiseModal) promiseModal.style.display = "flex"; // Toon modal
            if(shakeButton) shakeButton.disabled = true; // Blijft disabled tot pact geaccepteerd is
            if(resultTextElement) resultTextElement.textContent = "Accept the pact to start shaking!";
            if(resultDisplay) resultDisplay.classList.remove('show');
        }
    }

    if (closePromiseModalButton) {
        closePromiseModalButton.onclick = function() {
            if (promiseModal) promiseModal.style.display = "none";
        }
    }

    if (agreeButton) {
        agreeButton.onclick = function() {
            pactAgreed = true;
            if (promiseModal) promiseModal.style.display = "none";
            if (shakeButton && !alreadyOpenedToday) { // Alleen enablen als nog niet geopend
                 shakeButton.disabled = false;
                 if(resultTextElement) resultTextElement.textContent = "Keep shaking the box!";
            }
        }
    }
    
    window.onclick = function(event) { // Sluit modal als buiten geklikt wordt
        if (event.target == promiseModal) {
            promiseModal.style.display = "none";
        }
    }

    if (shakeButton) {
        shakeButton.addEventListener('click', handleShake);
    }
    if (shakerBox) { // Maak de doos zelf ook klikbaar
        shakerBox.addEventListener('click', handleShake);
    }

    // Initialisatie
    checkDailyLimitAndPact();
});