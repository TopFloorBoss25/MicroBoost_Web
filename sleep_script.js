document.addEventListener('DOMContentLoaded', () => {
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingInstruction = document.getElementById('breathingInstruction');
    const startStopButton = document.getElementById('startStopButton');
    const soundToggleButton = document.getElementById('soundToggleButton');
    const calmSound = document.getElementById('calmSound');
    const sleepTipText = document.getElementById('sleepTipText');
    const nextTipButton = document.getElementById('nextTipButton');

    let isBreathing = false;
    let breathInterval;
    let currentStep = 0; // 0: inhale, 1: hold_full, 2: exhale, 3: hold_empty
    const stepDuration = 4000; // 4 seconds per step

    // Engelse instructies voor de ademhaling
    const instructions = ["Breathe In...", "Hold...", "Breathe Out...", "Hold..."];

    // Engelse slaaptips
    const sleepTips = [
        "Try to go to bed and wake up around the same time every day, even on weekends.",
        "Ensure your bedroom is dark, quiet, and cool for optimal sleep.",
        "Avoid large meals, caffeine, and alcohol close to bedtime.",
        "Get some natural light exposure during the day, especially in the morning.",
        "Limit screen time (phones, tablets, computers) at least an hour before bed.",
        "Regular physical activity can help you sleep better, but avoid intense workouts close to bedtime.",
        "If you can't sleep after 20 minutes, get out of bed and do something relaxing until you feel tired.",
        "Create a relaxing bedtime routine, like reading a book or taking a warm bath.",
        "Consider writing down your worries or to-do list before bed to clear your mind.",
        "Make sure your mattress and pillows are comfortable and supportive.",
        "Avoid drinking too many fluids before bed to prevent nighttime awakenings.",
        "If you take naps, try to keep them short (20-30 minutes) and not too late in the day.",
        "Use your bed only for sleep and intimacy to strengthen the mental association between your bed and sleep."
    ];
    let currentTipIndex = 0;

    function updateBreathingGuide() {
        if (!breathingInstruction || !breathingCircle) return; // Veiligheidscheck

        breathingInstruction.textContent = instructions[currentStep];
        
        // Reset classes voor de zekerheid, behalve de basis class
        breathingCircle.className = 'breathing-circle';

        if (currentStep === 0) { // Inhale
            breathingCircle.classList.add('inhale');
        } else if (currentStep === 1) { // Hold full - blijft groot (met .inhale class)
            breathingCircle.classList.add('inhale');
        } else if (currentStep === 2) { // Exhale
            breathingCircle.classList.add('exhale'); // Krimpt terug (met .exhale class)
        } else if (currentStep === 3) { // Hold empty - blijft klein (met .exhale class)
            breathingCircle.classList.add('exhale');
        }

        currentStep = (currentStep + 1) % 4; // Ga naar de volgende stap in de cyclus
    }

    function startBreathing() {
        isBreathing = true;
        if (startStopButton) {
            startStopButton.innerHTML = '<i class="fas fa-pause"></i> Pause Breathing';
        }
        currentStep = 0; // Start altijd met inademen
        updateBreathingGuide(); // Direct eerste stap tonen en animatie starten
        breathInterval = setInterval(updateBreathingGuide, stepDuration);
    }

    function stopBreathing() {
        isBreathing = false;
        if (startStopButton) {
            startStopButton.innerHTML = '<i class="fas fa-play"></i> Start Breathing';
        }
        clearInterval(breathInterval);
        if (breathingInstruction) {
            breathingInstruction.textContent = "Press Start to Begin";
        }
        if (breathingCircle) {
            breathingCircle.className = 'breathing-circle'; // Reset cirkel naar neutrale staat
        }
        currentStep = 0; // Reset stap voor volgende start
    }

    if (startStopButton) {
        startStopButton.addEventListener('click', () => {
            if (isBreathing) {
                stopBreathing();
            } else {
                startBreathing();
            }
        });
    }

    if (soundToggleButton && calmSound) {
        soundToggleButton.addEventListener('click', () => {
            if (calmSound.paused) {
                calmSound.play().catch(e => console.warn("Could not play sound:", e)); // Foutafhandeling voor afspelen
                soundToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                soundToggleButton.classList.add('sound-on');
            } else {
                calmSound.pause();
                soundToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
                soundToggleButton.classList.remove('sound-on');
            }
        });
    }

    function showNextSleepTip() {
        if (!sleepTipText || sleepTips.length === 0) return;

        currentTipIndex = (currentTipIndex + 1) % sleepTips.length;
        sleepTipText.style.opacity = '0'; // Start fade out
        setTimeout(() => {
            sleepTipText.textContent = sleepTips[currentTipIndex];
            sleepTipText.style.opacity = '1'; // Start fade in
        }, 300); // Wacht op de duur van de fade-out (of iets korter dan de CSS transitie)
    }

    if (nextTipButton && sleepTipText) {
        nextTipButton.addEventListener('click', showNextSleepTip);
        // Toon direct een eerste tip
        if (sleepTips.length > 0) {
            sleepTipText.textContent = sleepTips[currentTipIndex]; // Toon de eerste tip
            sleepTipText.style.opacity = '1'; // Zorg dat het direct zichtbaar is
        }
    } else if (sleepTipText && sleepTips.length > 0) {
        // Fallback als nextTipButton er niet is, maar we wel tips willen tonen
        sleepTipText.textContent = sleepTips[currentTipIndex];
        sleepTipText.style.opacity = '1';
    }
});