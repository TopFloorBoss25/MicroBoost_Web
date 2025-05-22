document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elementen ---
    const challengeTextElement = document.getElementById('challengeText');
    const doneButton = document.getElementById('doneButton');
    const nextOrNewButton = document.getElementById('nextOrNewButton');
    const feedbackTextElement = document.getElementById('feedbackText');
    const currentYearElement = document.getElementById('currentYear');
    const filterButtonsContainer = document.getElementById('filterButtons');
    const surpriseMeButton = document.getElementById('surpriseMeButton'); // Nieuw
    const motivationalQuoteElement = document.getElementById('motivationalQuote'); // Nieuw

    const streakDisplayElement = document.getElementById('streakDisplay');
    const totalBoostsDisplayElement = document.getElementById('totalBoostsDisplay');
    const favoriteButton = document.getElementById('favoriteButton');
    const showFavoritesButton = document.getElementById('showFavoritesButton');
    const favoritesPanel = document.getElementById('favoritesPanel');
    const favoritesListElement = document.getElementById('favoritesList');
    const closeFavoritesButton = document.getElementById('closeFavoritesButton');

    // --- Data & State ---
    const challenges = [ /* Jouw volledige lijst met challenge objecten (id, text, durationCategory, estimatedTime) */
        // Voorbeeld (zorg dat je je eigen lijst hier hebt)
        { id: "c1", text: "Have you made your bed today? If not, do it now! It only takes 2 minutes.", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c2", text: "Is there an empty glass or cup on your desk? Take it to the kitchen now!", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c3", text: "Drink a glass of water. Now. Your body will thank you.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c4", text: "Take 5 deep, conscious breaths. Feel the calm.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c5", text: "Put your phone face down for 5 minutes. Give your brain a break.", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c6", text: "Smile at yourself in the mirror. You're amazing!", durationCategory: 'short', estimatedTime: "<1 min" },
        { id: "c7", text: "Tidy up one thing that's been lying around on your desk or in your room.", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c8", text: "Send a 'thank you' message to someone who recently helped you.", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c9", text: "Do a minute of simple stretches: neck, shoulders, back.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c10", text: "Say three positive things out loud to yourself.", durationCategory: 'short', estimatedTime: "<1 min" },
        { id: "c11", text: "Do a quick 10-minute tidy-up session in one room or corner.", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c12", text: "Read for 10 minutes in a book (no social media!).", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c13", text: "Plan your meals for the rest of the day or for tomorrow.", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c14", text: "Call a friend or family member you haven't spoken to in a while, just to catch up.", durationCategory: 'medium', estimatedTime: "~10-15 min" },
        { id: "c15", text: "Do a short guided meditation for 5-10 minutes.", durationCategory: 'medium', estimatedTime: "~5-10 min" },
        { id: "c16", text: "Write continuously in a journal for 5 minutes (brain dump).", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c17", text: "Prepare a healthy snack for yourself (fruit, yogurt, nuts).", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c18", text: "Do a quick 10-minute workout (find a short routine online).", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c19", text: "Go for a 1-kilometer (or 15-20 minute) walk or jog.", durationCategory: 'long', estimatedTime: "~15-20 min" },
        { id: "c20", text: "Cook a healthy, fresh meal for yourself.", durationCategory: 'long', estimatedTime: "~30-60 min" },
        { id: "c21", text: "Spend half an hour on a hobby that makes you happy.", durationCategory: 'long', estimatedTime: "~30 min" },
        { id: "c22", text: "Follow a 20-minute online tutorial to learn something new.", durationCategory: 'long', estimatedTime: "~20 min" },
        { id: "c23", text: "Plan your week: note down important appointments and tasks.", durationCategory: 'long', estimatedTime: "~15-20 min" },
        { id: "c24", text: "Take a relaxing bath or a long shower.", durationCategory: 'long', estimatedTime: "~20-30 min" }
    ];

    const feedbackMessages = [ /* Jouw feedback messages */
        "Awesome job! 🎉", "High five! 🌟", "You're rocking it! 🚀", "Small step, big impact! ✨",
        "Feels good, right? 😊", "Great! On to the next! 👍", "Super work! 🥳",
        "You're a star! ⭐", "You totally nailed that! ✔️", "Fantastic! 🎊"
    ];

    // **NIEUWE ARRAY VOOR MOTIVERENDE QUOTES**
    const motivationalQuotes = [
        "The journey of a thousand miles begins with a single step.",
        "Believe you can and you're halfway there.",
        "Small progress is still progress.",
        "The secret of getting ahead is getting started.",
        "It does not matter how slowly you go as long as you do not stop.",
        "You are capable of amazing things.",
        "Every day is a new beginning. Take a deep breath and start again.",
        "The best way to predict the future is to create it.",
        "Be stronger than your excuses.",
        "Don't watch the clock; do what it does. Keep going."
    ];

    let currentChallenge = null;
    let currentFilter = 'all';
    let lastShownChallengeText = "";
    let lastShownQuote = ""; // Om directe herhaling van quote te voorkomen

    let streak = parseInt(localStorage.getItem('microBoostStreak')) || 0;
    let lastCompletedDate = localStorage.getItem('microBoostLastCompletedDate') || "";
    let totalBoosts = parseInt(localStorage.getItem('microBoostTotalBoosts')) || 0;
    let favoriteChallenges = JSON.parse(localStorage.getItem('microBoostFavorites')) || [];

    // --- Functies ---
    function getRandomElement(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function triggerConfetti() { /* Blijft hetzelfde */
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
            }, 100);
        }
    }

    function updateStatsDisplay() { /* Blijft hetzelfde */
        if (streakDisplayElement) streakDisplayElement.textContent = `🔥 Streak: ${streak} Days`;
        if (totalBoostsDisplayElement) totalBoostsDisplayElement.textContent = `🚀 Total Boosts: ${totalBoosts}`;
    }

    function updateFavoriteButtonUI() { /* Blijft hetzelfde */
        if (!currentChallenge || !favoriteButton) return;
        const isFav = favoriteChallenges.includes(currentChallenge.id);
        favoriteButton.innerHTML = isFav ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        favoriteButton.classList.toggle('is-favorite', isFav);
    }

    function setActiveFilterButton(activeFilterValue) { /* Blijft hetzelfde */
        if(filterButtonsContainer) {
            filterButtonsContainer.querySelectorAll('button.filter-button[data-filter]').forEach(btn => {
                if (btn.dataset.filter === activeFilterValue) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    }

    // **NIEUWE FUNCTIE VOOR QUOTES**
    function showMotivationalQuote() {
        if (!motivationalQuoteElement || motivationalQuotes.length === 0) return;

        let newQuote;
        do {
            newQuote = getRandomElement(motivationalQuotes);
        } while (newQuote === lastShownQuote && motivationalQuotes.length > 1);
        lastShownQuote = newQuote;

        motivationalQuoteElement.classList.remove('show'); // Eerst verbergen voor animatie
        setTimeout(() => {
            motivationalQuoteElement.textContent = `"${newQuote}"`;
            motivationalQuoteElement.classList.add('show');
        }, 100); // Kleine vertraging voor soepelere overgang
    }

    function showNewChallenge(isSurprise = false) { // Parameter toegevoegd
        let filteredChallenges;

        if (isSurprise) {
            filteredChallenges = challenges; // Negeer huidige filter voor "Surprise Me"
            setActiveFilterButton('all'); // Visueel kan 'all' actief worden, of geen (jouw keuze)
                                         // Voor nu zetten we het op 'all' om verwarring te voorkomen.
                                         // Als je wilt dat geen filter actief is, maak setActiveFilterButton(null)
            currentFilter = 'all'; // Intern resetten we ook het filter
        } else if (currentFilter === 'all') {
            filteredChallenges = challenges;
        } else {
            filteredChallenges = challenges.filter(ch => ch.durationCategory === currentFilter);
        }

        if (filteredChallenges.length === 0) {
            challengeTextElement.innerHTML = `No challenges found. Try another filter or "Surprise Me"!`;
            currentChallenge = null;
            if(doneButton) doneButton.disabled = true;
            if (favoriteButton) favoriteButton.style.display = 'none';
            return;
        }
        if (favoriteButton) favoriteButton.style.display = 'block';

        let newChallenge;
        let attempts = 0;
        do {
            newChallenge = getRandomElement(filteredChallenges);
            attempts++;
        } while (newChallenge && newChallenge.text === lastShownChallengeText && filteredChallenges.length > 1 && attempts < filteredChallenges.length * 2);
        
        if (!newChallenge) {
             challengeTextElement.innerHTML = `No more suitable challenges for "${currentFilter}". Try "Surprise Me"!`;
             currentChallenge = null;
             if(doneButton) doneButton.disabled = true;
             if (favoriteButton) favoriteButton.style.display = 'none';
             return;
        }

        currentChallenge = newChallenge;
        lastShownChallengeText = currentChallenge.text;

        challengeTextElement.classList.add('fade-out');
        setTimeout(() => {
            challengeTextElement.innerHTML = `${currentChallenge.text} <span class="estimated-time">(${currentChallenge.estimatedTime})</span>`;
            challengeTextElement.classList.remove('fade-out');
            challengeTextElement.classList.add('fade-in');
            setTimeout(() => challengeTextElement.classList.remove('fade-in'), 400);
            updateFavoriteButtonUI();
        }, 400);

        if(feedbackTextElement) feedbackTextElement.textContent = "";
        if(feedbackTextElement) feedbackTextElement.classList.remove('show');
        if(doneButton) doneButton.disabled = false;
        if(nextOrNewButton) nextOrNewButton.textContent = `New ${currentFilter === 'all' && !isSurprise ? '' : currentFilter + ' '}Challenge`;
        if(isSurprise) nextOrNewButton.textContent = "New Challenge"; // Reset naar generiek als het een surprise was

        showMotivationalQuote(); // Toon een nieuwe quote bij elke nieuwe challenge
    }

    function handleDoneClick() { /* Logica blijft grotendeels hetzelfde, maar roept showMotivationalQuote aan */
        if (!currentChallenge) return;
        triggerConfetti();

        const randomFeedback = getRandomElement(feedbackMessages);
        if(feedbackTextElement) feedbackTextElement.textContent = randomFeedback;
        if(feedbackTextElement) feedbackTextElement.classList.add('show');
        if(doneButton) doneButton.disabled = true;

        const today = new Date().toLocaleDateString();
        if (lastCompletedDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastCompletedDate === yesterday.toLocaleDateString()) {
                streak++;
            } else {
                streak = 1;
            }
            lastCompletedDate = today;
            localStorage.setItem('microBoostLastCompletedDate', lastCompletedDate);
        }
        streak = Math.max(streak, 1);
        totalBoosts++;

        localStorage.setItem('microBoostStreak', streak.toString());
        localStorage.setItem('microBoostTotalBoosts', totalBoosts.toString());
        updateStatsDisplay();

        setTimeout(() => {
            if(feedbackTextElement) feedbackTextElement.classList.remove('show');
            showMotivationalQuote(); // Ook een nieuwe quote na feedback
        }, 2800);
    }

    function toggleFavorite() { /* Blijft hetzelfde */
        if (!currentChallenge || !currentChallenge.id) return;
        const challengeId = currentChallenge.id;
        const index = favoriteChallenges.indexOf(challengeId);

        if (index > -1) {
            favoriteChallenges.splice(index, 1);
        } else {
            favoriteChallenges.push(challengeId);
        }
        localStorage.setItem('microBoostFavorites', JSON.stringify(favoriteChallenges));
        updateFavoriteButtonUI();
        if (favoritesPanel && !favoritesPanel.classList.contains('hidden')) {
            renderFavoritesList();
        }
    }

    function renderFavoritesList() { /* Blijft hetzelfde */
        if (!favoritesListElement) return;
        favoritesListElement.innerHTML = '';

        if (favoriteChallenges.length === 0) {
            const li = document.createElement('li');
            li.textContent = "You haven't marked any favorite challenges yet.";
            favoritesListElement.appendChild(li);
            return;
        }

        favoriteChallenges.forEach(favId => {
            const challengeObj = challenges.find(ch => ch.id === favId);
            if (challengeObj) {
                const li = document.createElement('li');
                li.textContent = `${challengeObj.text} (${challengeObj.estimatedTime})`;

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times-circle"></i> Remove';
                removeBtn.classList.add('remove-favorite-btn');
                removeBtn.onclick = (event) => {
                    event.stopPropagation();
                    const index = favoriteChallenges.indexOf(favId);
                    if (index > -1) favoriteChallenges.splice(index, 1);
                    localStorage.setItem('microBoostFavorites', JSON.stringify(favoriteChallenges));
                    renderFavoritesList();
                    updateFavoriteButtonUI();
                };
                li.appendChild(removeBtn);
                favoritesListElement.appendChild(li);
            }
        });
    }

    // --- Event Listeners ---
    if(doneButton) doneButton.addEventListener('click', handleDoneClick);
    if(nextOrNewButton) nextOrNewButton.addEventListener('click', () => showNewChallenge(false)); // Normale nieuwe challenge
    if(favoriteButton) favoriteButton.addEventListener('click', toggleFavorite);

    // **NIEUWE EVENT LISTENER VOOR SURPRISE ME KNOP**
    if(surpriseMeButton) {
        surpriseMeButton.addEventListener('click', () => showNewChallenge(true)); // Surprise challenge
    }

    if (filterButtonsContainer) { /* Logica blijft hetzelfde */
        filterButtonsContainer.addEventListener('click', (event) => {
            const targetButton = event.target.closest('button.filter-button');
            if (targetButton) {
                if (targetButton.id === 'showFavoritesButton') {
                    if (favoritesPanel) {
                        const panelIsHidden = favoritesPanel.classList.toggle('hidden');
                        targetButton.classList.toggle('active-panel-open', !panelIsHidden);
                        if (!panelIsHidden) {
                            renderFavoritesList();
                        }
                    }
                } else if (targetButton.dataset.filter) {
                    currentFilter = targetButton.dataset.filter;
                    setActiveFilterButton(currentFilter);
                    lastShownChallengeText = "";
                    showNewChallenge(false); // Zorg dat isSurprise false is
                }
            }
        });
    }

    if (closeFavoritesButton) { /* Logica blijft hetzelfde */
        closeFavoritesButton.addEventListener('click', () => {
            if (favoritesPanel) favoritesPanel.classList.add('hidden');
            if (showFavoritesButton) showFavoritesButton.classList.remove('active-panel-open');
        });
    }

    // --- Initialisatie ---
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

    const todayForStreakCheck = new Date().toLocaleDateString(); /* Logica blijft hetzelfde */
    const yesterdayForStreakCheck = new Date();
    yesterdayForStreakCheck.setDate(yesterdayForStreakCheck.getDate() - 1);

    if (lastCompletedDate !== todayForStreakCheck && lastCompletedDate !== yesterdayForStreakCheck.toLocaleDateString() && lastCompletedDate !== "") {
        streak = 0;
        localStorage.setItem('microBoostStreak', streak.toString());
    }

    updateStatsDisplay();
    setActiveFilterButton(currentFilter);
    showNewChallenge(false); // Eerste challenge is niet een surprise
    // showMotivationalQuote(); // Toon direct een quote bij het laden, of wacht op de eerste challenge
});