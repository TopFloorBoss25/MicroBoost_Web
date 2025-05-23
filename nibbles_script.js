document.addEventListener('DOMContentLoaded', () => {
    const nibbleCard = document.getElementById('nibbleCard');
    const nibbleCategoryElement = document.getElementById('nibbleCategory');
    const nibbleTextElement = document.getElementById('nibbleText');
    const nibbleSourceElement = document.getElementById('nibbleSource');
    const getNibbleButton = document.getElementById('getNibbleButton');
    const filterButtonsContainer = document.querySelector('.filter-nibbles-container');

    const discoveredCountElement = document.getElementById('discoveredCount');
    const totalDailyNibblesElement = document.getElementById('totalDailyNibbles');
    const discoveryProgressBar = document.getElementById('discoveryProgressBar');
    const dailyRewardMessageElement = document.getElementById('dailyRewardMessage');

    const nibbleSound = document.getElementById('nibbleSound');
    const rewardSound = document.getElementById('rewardSound');

    const MAX_DAILY_NIBBLES = 5; // Limiet voor dagelijkse beloning

    const allNibbles = [
        { id: "n1", text: "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!", category: "funfact", source: "National Geographic" },
        { id: "n2", text: "A flock of crows is known as a 'murder'.", category: "funfact" },
        { id: "n3", text: "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.", category: "history", source: "Guinness World Records" },
        { id: "n4", text: "Octopuses have three hearts and blue blood.", category: "science", source: "Ocean Conservancy" },
        { id: "n5", text: "The word 'serendipity' means a 'fortunate happenstance' or 'pleasant surprise'. It was coined by Horace Walpole in 1754.", category: "word", source: "Oxford English Dictionary" },
        { id: "n6", text: "A jiffy is an actual unit of time, equal to 1/100th of a second.", category: "science" },
        { id: "n7", text: "The Great Wall of China is not visible from the Moon with the naked eye.", category: "funfact", source: "NASA" },
        { id: "n8", text: "Cleopatra lived closer in time to the invention of the iPhone than to the construction of the Great Pyramid of Giza.", category: "history" },
        { id: "n9", text: "Bananas are berries, but strawberries aren't.", category: "science", source: "Botanical classification" },
        { id: "n10", text: "'Ephemeral' (adjective): lasting for a very short time.", category: "word" },
        { id: "n11", text: "A group of flamingos is called a 'flamboyance'.", category: "funfact" },
        { id: "n12", text: "The first computer programmer was Ada Lovelace, an English mathematician, in the mid-1800s.", category: "history", source: "Computer History Museum" },
        { id: "n13", text: "It's impossible to hum while holding your nose closed.", category: "funfact" },
        { id: "n14", text: "The human brain is more active during sleep than during the day.", category: "science", source: "Sleep Foundation" },
        { id: "n15", text: "'Ubiquitous' (adjective): present, appearing, or found everywhere.", category: "word" },
        { id: "n16", text: "A 'quixotic' person is exceedingly idealistic, unrealistic, and impractical.", category: "word", source: "Literary (Don Quixote)" },
        { id: "n17", text: "Slugs have four noses.", category: "science", source: "Zoological Fact" },
        { id: "n18", text: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.", category: "science", source: "Engineering Fact" },
        { id: "n19", text: "It's impossible for most people to lick their own elbow.", category: "funfact" },
        { id: "n20", text: "The first oranges weren't orange; they were a greenish-yellow color, native to Southeast Asia.", category: "history", source: "Botanical History" },
        { id: "n21", text: "'Mellifluous' describes a sound that is sweet and smooth, pleasing to hear.", category: "word" },
        { id: "n22", text: "A shrimp's heart is in its head.", category: "science", source: "Marine Biology" },
        { id: "n23", text: "The unicorn is the national animal of Scotland.", category: "funfact", source: "National Symbols" },
        { id: "n24", text: "Humans share about 60% of their DNA with bananas.", category: "science", source: "Genetics" },
        { id: "n25", text: "The shortest complete sentence in the English language is 'I am.'", category: "funfact", source: "Linguistics" },
        { id: "n26", text: "'Petrichor' is the earthy scent produced when rain falls on dry soil.", category: "word" },
        { id: "n27", text: "In Switzerland, it is illegal to own just one guinea pig because they are social animals and get lonely.", category: "funfact", source: "Swiss Animal Welfare" },
        { id: "n28", text: "The Roman emperor Caligula once made his horse a consul.", category: "history", source: "Roman History" },
        { id: "n29", text: "A crocodile cannot stick its tongue out.", category: "science", source: "Zoological Fact" },
        { id: "n30", text: "'Ephemeral' means lasting for a very short time.", category: "word" },
        { id: "n31", text: "Polar bear fur is not white; it's transparent, and their skin is black.", category: "science", source: "Zoological Fact" },
        { id: "n32", text: "The inventor of the Pringles can, Fredric Baur, was so proud of it that his ashes were buried in one.", category: "funfact", source: "Biography" },
        { id: "n33", text: "The Colosseum in Rome had a retractable awning called a 'velarium' to shield spectators from the sun.", category: "history", source: "Architectural History" },
        { id: "n34", text: "A 'lethologica' is the state of not being able to remember a word you want to say.", category: "word" },
        { id: "n35", text: "Snails can sleep for up to three years.", category: "science", source: "Zoological Fact" },
        { id: "n36", text: "The Hawaiian alphabet has only 13 letters.", category: "funfact", source: "Linguistics" },
        { id: "n37", text: "The Library of Alexandria in ancient Egypt was one of the largest and most significant libraries of the ancient world.", category: "history", source: "Ancient History" },
        { id: "n38", text: "Butterflies taste with their feet.", category: "science", source: "Entomology" },
        { id: "n39", text: "'Pulchritudinous' is a long word that simply means beautiful.", category: "word" },
        { id: "n40", text: "It rains diamonds on Saturn and Jupiter.", category: "science", source: "Planetary Science" },
        { id: "n41", text: "The ampersand symbol (&) was once the 27th letter of the alphabet.", category: "history", source: "Linguistic History" },
        { id: "n42", text: "A group of owls is called a 'parliament'.", category: "funfact" },
        { id: "n43", text: "The human nose can remember 50,000 different scents.", category: "science", source: "Human Biology" },
        { id: "n44", text: "'Supine' means lying face upwards.", category: "word" },
        { id: "n45", text: "The first alarm clock could only ring at one time: 4 a.m.", category: "history", source: "Invention History" },
        { id: "n46", text: "Starfish do not have brains.", category: "science", source: "Marine Biology" },
        { id: "n47", text: "The term 'disc jockey' was first used in 1935.", category: "history", source: "Music History" },
        { id: "n48", text: "A 'bostrychophilist' is a lover of moustaches.", category: "word" },
        { id: "n49", text: "A day on Venus is longer than a year on Venus. It rotates very slowly.", category: "science", source: "Astronomy" },
        { id: "n50", text: "The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo' (1950).", category: "funfact", source: "Literary History" },
        { id: "n51", text: "The city of Venice is built on more than 100 small islands in a lagoon in the Adriatic Sea.", category: "history", source: "Geography/History" },
        { id: "n52", text: "Koalas have fingerprints that are almost indistinguishable from human fingerprints.", category: "science", source: "Zoological Fact" },
        { id: "n53", text: "'Effervescent' means vivacious and enthusiastic, or (of a liquid) giving off bubbles; fizzy.", category: "word" },
        { id: "n54", text: "The hashtag symbol (#) is technically called an octothorpe.", category: "funfact", source: "Typography" },
        { id: "n55", text: "The ancient Mayans used cocoa beans as currency.", category: "history", source: "Mayan Civilization" },
        { id: "n56", text: "Sound travels about 4 times faster in water than in air.", category: "science", source: "Physics" },
        { id: "n57", text: "A 'bibliopole' is a person who buys and sells books, especially rare ones.", category: "word" },
        { id: "n58", text: "The fear of long words is called 'hippopotomonstrosesquippedaliophobia'.", category: "funfact" },
        { id: "n59", text: "The first McDonald's menu items were hot dogs, not hamburgers.", category: "history", source: "Company History" },
        { id: "n60", text: "A group of porcupines is called a 'prickle'.", category: "funfact" },
        { id: "n61", text: "The speed of light is approximately 299,792 kilometers per second.", category: "science", source: "Physics" },
        { id: "n62", text: "'Limerence' is the state of being infatuated or obsessed with another person.", category: "word" },
        { id: "n63", text: "A 'galimatías' is confused or unintelligible talk; gibberish.", category: "word" },
        { id: "n64", text: "The dot over the letter 'i' and 'j' is called a tittle.", category: "funfact", source: "Typography" },
        { id: "n65", text: "The inventor of the frisbee was turned into a frisbee after he died. His ashes were mixed into a plastic frisbee.", category: "funfact", source: "Biography" },
        { id: "n66", text: "A 'zeugma' is a figure of speech in which a word applies to two others in different senses (e.g., 'John and his license expired last week').", category: "word" },
        { id: "n67", text: "The longest English word without a vowel is 'rhythms'.", category: "funfact", source: "Linguistics" },
        { id: "n68", text: "The first product to have a barcode was Wrigley's gum.", category: "history", source: "Invention History" },
        { id: "n69", text: "A 'pogonophile' is a person who loves or studies beards.", category: "word" },
        { id: "n70", text: "There are more possible iterations of a game of chess than there are atoms in the known universe.", category: "funfact", source: "Mathematics/Chess Theory" },
        { id: "n71", text: "The driest place on Earth is the Atacama Desert in Chile.", category: "science", source: "Geography" },
        { id: "n72", text: "The first novel ever written on a typewriter was 'Tom Sawyer'.", category: "history", source: "Literary History" },
        { id: "n73", text: "A 'quidnunc' is an inquisitive and gossipy person.", category: "word" },
        { id: "n74", text: "The national anthem of Greece has 158 verses.", category: "funfact", source: "National Symbols" },
        { id: "n75", text: "The human body contains enough carbon to make 9,000 pencils.", category: "science", source: "Human Biology" },
        { id: "n76", text: "The word 'checkmate' in chess comes from the Persian phrase 'Shah Mat,' which means 'the king is dead.'", category: "history", source: "Etymology/Chess" },
        { id: "n77", text: "'Borborygmus' is the medical term for the rumbling or gurgling noise produced by the movement of fluid and gas in the intestines.", category: "word" },
        { id: "n78", text: "A 'group of cats' can also be called a 'clowder' or a 'pounce'.", category: "funfact" },
        { id: "n79", text: "The original name for the search engine Google was 'Backrub'.", category: "history", source: "Tech History" },
        { id: "n80", text: "The oldest known musical instrument is a flute made from a vulture's wing bone, found in Germany and dated to be over 40,000 years old.", category: "history", source: "Archaeology" },
        { id: "n81", text: "'Sesquipedalian' describes someone who uses long words.", category: "word" },
        { id: "n82", text: "A bolt of lightning is five times hotter than the surface of the sun.", category: "science", source: "Meteorology" },
        { id: "n83", text: "The 'Mona Lisa' has no eyebrows. It was the fashion in Renaissance Florence to shave them off.", category: "history", source: "Art History" },
        { id: "n84", text: "A 'mumpsimus' is a traditional custom or notion that is adhered to although it has been shown to be unreasonable.", category: "word" },
        { id: "n85", text: "The only letter not appearing on the periodic table is 'J'.", category: "funfact", source: "Chemistry" }
    ];

    let currentNibblesPool = [...allNibbles];
    let lastShownNibbleId = null;
    let discoveredToday = parseInt(localStorage.getItem('nibblesDiscoveredToday')) || 0;
    let lastDiscoveryDate = localStorage.getItem('nibblesLastDiscoveryDate') || "";

    function updateButtonState(isLimitReached) {
        if (getNibbleButton) {
            getNibbleButton.disabled = isLimitReached;
            if (isLimitReached) {
                getNibbleButton.innerHTML = '<i class="fas fa-hourglass-half"></i> Come back tomorrow!';
            } else {
                getNibbleButton.innerHTML = '<i class="fas fa-lightbulb"></i> Get New Nibble!';
            }
        }
    }

    function initializeDailyProgress() {
        const today = new Date().toLocaleDateString();
        if (lastDiscoveryDate !== today) {
            discoveredToday = 0;
            localStorage.setItem('nibblesDiscoveredToday', '0');
            localStorage.setItem('nibblesLastDiscoveryDate', today);
            if (dailyRewardMessageElement) dailyRewardMessageElement.textContent = "";
            updateButtonState(false); // Schakel knop in voor nieuwe dag
        } else {
            // Het is nog steeds dezelfde dag, check of limiet al bereikt was
            updateButtonState(discoveredToday >= MAX_DAILY_NIBBLES);
            if (discoveredToday >= MAX_DAILY_NIBBLES && dailyRewardMessageElement) {
                 dailyRewardMessageElement.textContent = "You've discovered all your nibbles for today! Come back tomorrow for more!";
            }
        }
        updateProgressDisplay();
    }

    function updateProgressDisplay() {
        if(discoveredCountElement) discoveredCountElement.textContent = discoveredToday;
        if(totalDailyNibblesElement) totalDailyNibblesElement.textContent = MAX_DAILY_NIBBLES;
        if(discoveryProgressBar) {
            const percentage = (discoveredToday / MAX_DAILY_NIBBLES) * 100;
            discoveryProgressBar.style.width = `${Math.min(percentage, 100)}%`;
        }
    }

    function triggerCardAnimation() {
        if (!nibbleCard) return;
        nibbleCard.classList.remove('reveal', 'hide'); // Zorg dat beide weg zijn
        void nibbleCard.offsetWidth; // Forceer reflow
        nibbleCard.classList.add('hide'); // Start met verbergen
        setTimeout(() => {
            nibbleCard.classList.remove('hide');
            nibbleCard.classList.add('reveal');
        }, 50);
    }

    function displayRandomNibble() {
        if (discoveredToday >= MAX_DAILY_NIBBLES && getNibbleButton && getNibbleButton.disabled) {
            // Als limiet bereikt is en knop al disabled, doe niets meer,
            // of toon een herhaalde boodschap in de nibble card.
            if(nibbleTextElement) nibbleTextElement.textContent = "You've reached your daily nibble limit. More tomorrow!";
            if(nibbleCategoryElement) nibbleCategoryElement.textContent = "See you soon!";
            if(nibbleSourceElement) nibbleSourceElement.textContent = "";
            triggerCardAnimation(); // Misschien toch een animatie voor de kaart
            return;
        }

        if (currentNibblesPool.length === 0) {
            if (nibbleTextElement) nibbleTextElement.textContent = "No more nibbles in this category for now. Try another or 'All'!";
            if (nibbleCategoryElement) nibbleCategoryElement.textContent = "Oops!";
            if (nibbleSourceElement) nibbleSourceElement.textContent = "";
            triggerCardAnimation();
            return;
        }

        let nibble;
        if (currentNibblesPool.length === 1) {
            nibble = currentNibblesPool[0];
        } else {
            do {
                nibble = currentNibblesPool[Math.floor(Math.random() * currentNibblesPool.length)];
            } while (nibble && nibble.id === lastShownNibbleId); // Check of nibble bestaat
        }
        
        if (!nibble) { // Fallback als er iets misgaat met selectie
            if (nibbleTextElement) nibbleTextElement.textContent = "Something went wrong, please try again!";
            triggerCardAnimation();
            return;
        }

        lastShownNibbleId = nibble.id;
        triggerCardAnimation();

        if (nibbleTextElement) nibbleTextElement.textContent = nibble.text;
        if (nibbleCategoryElement) nibbleCategoryElement.textContent = nibble.category.replace(/^\w/, c => c.toUpperCase());
        if (nibbleSourceElement) nibbleSourceElement.textContent = nibble.source ? `(Source: ${nibble.source})` : "";

        if (nibbleSound && nibbleSound.readyState >= 2) {
             nibbleSound.currentTime = 0;
             nibbleSound.play().catch(e => console.warn("Nibble sound play error:", e));
        }

        if (discoveredToday < MAX_DAILY_NIBBLES) {
            const today = new Date().toLocaleDateString();
            // Als het een nieuwe dag is, had initializeDailyProgress dit al moeten afhandelen.
            // Deze check is meer voor het geval de pagina lang openstaat.
            if (lastDiscoveryDate !== today) {
                initializeDailyProgress(); // Her-initialiseer als de dag is veranderd sinds pageload
            }

            // Verhoog alleen als de limiet nog niet bereikt was VOORDAT deze nibble werd getoond.
            // Dit voorkomt dat de teller onnodig oploopt als de limiet al bereikt was.
             if (discoveredToday < MAX_DAILY_NIBBLES) { // Dubbele check voor de zekerheid
                discoveredToday++;
                localStorage.setItem('nibblesDiscoveredToday', discoveredToday.toString());
             }
        }
        updateProgressDisplay(); // Update altijd de display

        if (discoveredToday >= MAX_DAILY_NIBBLES) {
            if(dailyRewardMessageElement) dailyRewardMessageElement.textContent = "🎉 You've unlocked all daily nibbles! Amazing job!";
            if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
            }
            if(rewardSound && rewardSound.readyState >=2) {
                rewardSound.play().catch(e => console.warn("Reward sound play error:", e));
            }
            updateButtonState(true); // Schakel knop uit
        } else if (dailyRewardMessageElement){
            dailyRewardMessageElement.textContent = "";
        }
    }

    if (getNibbleButton) {
        getNibbleButton.addEventListener('click', displayRandomNibble);
    }

    if (filterButtonsContainer) {
        filterButtonsContainer.addEventListener('click', (event) => {
            const targetButton = event.target.closest('button.filter-nibble-button');
            if (targetButton && targetButton.dataset.category) {
                filterButtonsContainer.querySelectorAll('.filter-nibble-button').forEach(btn => btn.classList.remove('active'));
                targetButton.classList.add('active');

                const category = targetButton.dataset.category;
                if (category === 'all') {
                    currentNibblesPool = [...allNibbles];
                } else {
                    currentNibblesPool = allNibbles.filter(n => n.category === category);
                }
                lastShownNibbleId = null;
                // Als de limiet al bereikt is, toon dan geen nieuwe nibble maar de limietboodschap
                if (discoveredToday < MAX_DAILY_NIBBLES || !getNibbleButton.disabled) {
                    displayRandomNibble();
                } else {
                     if(nibbleTextElement) nibbleTextElement.textContent = "You've reached your daily nibble limit. More tomorrow!";
                     if(nibbleCategoryElement) nibbleCategoryElement.textContent = "See you soon!";
                     if(nibbleSourceElement) nibbleSourceElement.textContent = "";
                     triggerCardAnimation();
                }
            }
        });
    }

    // Initialisatie
    initializeDailyProgress(); // Dit stelt de knop correct in bij laden.
    const initialActiveFilter = filterButtonsContainer ? filterButtonsContainer.querySelector('.filter-nibble-button[data-category="all"]') : null;
    if(initialActiveFilter) initialActiveFilter.classList.add('active');
    
    // Toon een eerste nibble alleen als de limiet nog niet is bereikt
    if (discoveredToday < MAX_DAILY_NIBBLES) {
        displayRandomNibble();
    } else {
        // Limiet is al bereikt bij het laden van de pagina
        if(nibbleTextElement) nibbleTextElement.textContent = "You've discovered all your nibbles for today! Come back tomorrow for more!";
        if(nibbleCategoryElement) nibbleCategoryElement.textContent = "Limit Reached!";
        if(nibbleSourceElement) nibbleSourceElement.textContent = "";
        triggerCardAnimation();
    }
});