fetch("https://mhw-db.com/monsters")
    .then(response => response.json())
    .then(data => {
        const monsterListContainer = document.getElementById("monster-list");

        data.forEach(monster => {
            // Monsterkarte erstellen
            const monsterCard = document.createElement("div");
            monsterCard.classList.add("monster-card");

            // Monster-Name hinzufügen
            const monsterName = document.createElement("h3");
            monsterName.classList.add("monster-name");
            monsterName.textContent = monster.name;

            // Monster-Icon hinzufügen
            const monsterIcon = document.createElement("img");
            monsterIcon.classList.add("monster-icon");
            // Hier den Pfad zum heruntergeladenen Bild setzen
            monsterIcon.src = `../assets/images/monstericons/${monster.name.toLowerCase().replace(/ /g, '-')}.png`;
            monsterIcon.alt = `${monster.name} Icon`;

            // Die Karte zusammenbauen
            monsterCard.appendChild(monsterIcon);  // Icon zuerst, dann Name
            monsterCard.appendChild(monsterName);

            // Karte der Monsterliste hinzufügen
            monsterListContainer.appendChild(monsterCard);
        });
    });
