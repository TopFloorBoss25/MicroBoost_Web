document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elementen ---
    const challengeTextElement = document.getElementById('challengeText');
    const doneButton = document.getElementById('doneButton');
    const nextOrNewButton = document.getElementById('nextOrNewButton');
    const feedbackTextElement = document.getElementById('feedbackText');
    const currentYearElement = document.getElementById('currentYear');
    const filterButtonsContainer = document.getElementById('filterButtons');

    const streakDisplayElement = document.getElementById('streakDisplay');
    const totalBoostsDisplayElement = document.getElementById('totalBoostsDisplay');
    const favoriteButton = document.getElementById('favoriteButton'); // Knop bij de challenge (hartje)
    const showFavoritesButton = document.getElementById('showFavoritesButton'); // Knop in filterbalk
    const favoritesPanel = document.getElementById('favoritesPanel');
    const favoritesListElement = document.getElementById('favoritesList');
    const closeFavoritesButton = document.getElementById('closeFavoritesButton');

    // --- Data & State ---
    const challenges = [
        // Zorg ervoor dat elk challenge-object een unieke 'id' heeft.
        // Voorbeeld:
        { id: "c1", text: "Heb je vandaag al je bed opgemaakt? Zo niet, doe het nu even!", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c2", text: "Staat er nog een leeg glas of kopje op je bureau? Breng het nu naar de keuken!", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c3", text: "Drink een glas water. Nu. Je lichaam zal je dankbaar zijn.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c4", text: "Haal 5 keer diep en bewust adem. Voel de rust.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c5", text: "Zet je telefoon 5 minuten met het scherm naar beneden. Geef je brein een pauze.", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c6", text: "Glimlach naar jezelf in de spiegel. Je bent geweldig!", durationCategory: 'short', estimatedTime: "<1 min" },
        { id: "c7", text: "Ruim één ding op dat al een tijdje rondslingert op je bureau of in je kamer.", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c8", text: "Stuur een 'dankjewel' berichtje naar iemand die je recent geholpen heeft.", durationCategory: 'short', estimatedTime: "~2 min" },
        { id: "c9", text: "Doe 1 minuut een paar simpele stretches: nek, schouders, rug.", durationCategory: 'short', estimatedTime: "~1 min" },
        { id: "c10", text: "Zeg drie positieve dingen hardop tegen jezelf.", durationCategory: 'short', estimatedTime: "<1 min" },
        { id: "c11", text: "Doe 10 minuten een snelle opruimsessie in één kamer of hoek.", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c12", text: "Lees 10 minuten in een boek (geen social media!).", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c13", text: "Plan je maaltijden voor de rest van de dag of morgen.", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c14", text: "Bel een vriend of familielid waar je al een tijdje niet mee gesproken hebt, gewoon om bij te praten.", durationCategory: 'medium', estimatedTime: "~10-15 min" },
        { id: "c15", text: "Doe een korte geleide meditatie van 5-10 minuten.", durationCategory: 'medium', estimatedTime: "~5-10 min" },
        { id: "c16", text: "Schrijf 5 minuten onafgebroken in een dagboek (brain dump).", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c17", text: "Maak een gezonde snack voor jezelf klaar (fruit, yoghurt, noten).", durationCategory: 'medium', estimatedTime: "~5 min" },
        { id: "c18", text: "Doe een snelle workout van 10 minuten (zoek een korte routine online).", durationCategory: 'medium', estimatedTime: "~10 min" },
        { id: "c19", text: "Ga een kilometer (of 15-20 minuten) wandelen of joggen.", durationCategory: 'long', estimatedTime: "~15-20 min" },
        { id: "c20", text: "Kook een gezonde, verse maaltijd voor jezelf.", durationCategory: 'long', estimatedTime: "~30-60 min" },
        { id: "c21", text: "Neem een half uur de tijd voor een hobby waar je blij van wordt.", durationCategory: 'long', estimatedTime: "~30 min" },
        { id: "c22", text: "Volg een online tutorial van 20 minuten om iets nieuws te leren.", durationCategory: 'long', estimatedTime: "~20 min" },
        { id: "c23", text: "Plan je week: noteer belangrijke afspraken en taken.", durationCategory: 'long', estimatedTime: "~15-20 min" },
        { id: "c24", text: "Neem een ontspannend bad of een lange douche.", durationCategory: 'long', estimatedTime: "~20-30 min" }
        // Voeg hier jouw volledige lijst met challenges toe, elk met een unieke 'id'
    ];

    const feedbackMessages = [
        "Geweldig gedaan! 🎉", "High five! 🌟", "Je rockt het! 🚀", "Kleine stap, groot effect! ✨",
        "Voelt goed, hè? 😊", "Top! Op naar de volgende! 👍", "Super bezig! 🥳",
        "Je bent een ster! ⭐", "Dat heb je maar mooi gefixt! ✔️", "Fantastisch! 🎊"
    ];

    let currentChallenge = null;
    let currentFilter = 'all'; // Initial filter (zal 'all', 'short', 'medium', of 'long' zijn)
    let lastShownChallengeText = "";

    // --- localStorage Variabelen ---
    let streak = parseInt(localStorage.getItem('microBoostStreak')) || 0;
    let lastCompletedDate = localStorage.getItem('microBoostLastCompletedDate') || "";
    let totalBoosts = parseInt(localStorage.getItem('microBoostTotalBoosts')) || 0;
    let favoriteChallenges = JSON.parse(localStorage.getItem('microBoostFavorites')) || [];

    // --- Functies ---
    function getRandomElement(arr) {
        if (!arr || arr.length === 0) return null;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function triggerConfetti() {
        if (typeof confetti === 'function') { // Check of confetti library geladen is
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
            }, 100);
        }
    }

    function updateStatsDisplay() {
        if (streakDisplayElement) streakDisplayElement.textContent = `🔥 Streak: ${streak} Dagen`;
        if (totalBoostsDisplayElement) totalBoostsDisplayElement.textContent = `🚀 Totaal Boosts: ${totalBoosts}`;
    }

    function updateFavoriteButtonUI() {
        if (!currentChallenge || !favoriteButton) return;
        const isFav = favoriteChallenges.includes(currentChallenge.id);
        favoriteButton.innerHTML = isFav ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        favoriteButton.classList.toggle('is-favorite', isFav);
    }

    function setActiveFilterButton(activeFilterValue) {
        filterButtonsContainer.querySelectorAll('button.filter-button[data-filter]').forEach(btn => {
            if (btn.dataset.filter === activeFilterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function showNewChallenge() {
        let filteredChallenges;
        if (currentFilter === 'all') {
            filteredChallenges = challenges;
        } else {
            filteredChallenges = challenges.filter(ch => ch.durationCategory === currentFilter);
        }

        if (filteredChallenges.length === 0) {
            challengeTextElement.innerHTML = `Geen uitdagingen gevonden voor filter "${currentFilter}". Probeer een ander filter.`;
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
        
        if (!newChallenge) { // Fallback als getRandomElement null retourneert (lege filteredChallenges)
             challengeTextElement.innerHTML = `Geen passende uitdagingen meer voor "${currentFilter}".`;
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
        if(nextOrNewButton) nextOrNewButton.textContent = `Nieuwe ${currentFilter === 'all' ? '' : currentFilter + ' '}Uitdaging`;
    }

    function handleDoneClick() {
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
        streak = Math.max(streak, 1); // Zorg dat streak minstens 1 is
        totalBoosts++;

        localStorage.setItem('microBoostStreak', streak.toString());
        localStorage.setItem('microBoostTotalBoosts', totalBoosts.toString());
        updateStatsDisplay();

        setTimeout(() => {
            if(feedbackTextElement) feedbackTextElement.classList.remove('show');
        }, 2800);
    }

    function toggleFavorite() {
        if (!currentChallenge || !currentChallenge.id) return; // Check ook of currentChallenge.id bestaat
        const challengeId = currentChallenge.id;
        const index = favoriteChallenges.indexOf(challengeId);

        if (index > -1) {
            favoriteChallenges.splice(index, 1);
        } else {
            favoriteChallenges.push(challengeId);
        }
        localStorage.setItem('microBoostFavorites', JSON.stringify(favoriteChallenges));
        updateFavoriteButtonUI();
        if (favoritesPanel && !favoritesPanel.classList.contains('hidden')) { // Update lijst als paneel open is
            renderFavoritesList();
        }
    }

    function renderFavoritesList() {
        if (!favoritesListElement) return;
        favoritesListElement.innerHTML = '';

        if (favoriteChallenges.length === 0) {
            const li = document.createElement('li');
            li.textContent = "Je hebt nog geen favoriete uitdagingen gemarkeerd.";
            favoritesListElement.appendChild(li);
            return;
        }

        favoriteChallenges.forEach(favId => {
            const challengeObj = challenges.find(ch => ch.id === favId);
            if (challengeObj) {
                const li = document.createElement('li');
                li.textContent = `${challengeObj.text} (${challengeObj.estimatedTime})`;

                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-times-circle"></i> Verwijder';
                removeBtn.classList.add('remove-favorite-btn');
                removeBtn.onclick = (event) => { // Gebruik event om bubbling te stoppen indien nodig
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
    if(nextOrNewButton) nextOrNewButton.addEventListener('click', showNewChallenge);
    if(favoriteButton) favoriteButton.addEventListener('click', toggleFavorite);

    if (filterButtonsContainer) {
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
                    lastShownChallengeText = ""; // Reset om herhaling te voorkomen
                    showNewChallenge();
                }
            }
        });
    }

    if (closeFavoritesButton) {
        closeFavoritesButton.addEventListener('click', () => {
            if (favoritesPanel) favoritesPanel.classList.add('hidden');
            if (showFavoritesButton) showFavoritesButton.classList.remove('active-panel-open');
        });
    }

    // --- Initialisatie ---
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

    const todayForStreakCheck = new Date().toLocaleDateString();
    const yesterdayForStreakCheck = new Date();
    yesterdayForStreakCheck.setDate(yesterdayForStreakCheck.getDate() - 1);

    if (lastCompletedDate !== todayForStreakCheck && lastCompletedDate !== yesterdayForStreakCheck.toLocaleDateString() && lastCompletedDate !== "") {
        streak = 0;
        localStorage.setItem('microBoostStreak', streak.toString());
    }

    updateStatsDisplay();
    setActiveFilterButton(currentFilter); // Zet de initieel actieve filterknop ('all')
    showNewChallenge(); // Toon de eerste uitdaging
});