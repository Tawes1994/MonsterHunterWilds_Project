// Hole die Monster-Daten von der API (lokale JSON-Datei)
fetch("/Frontend_MonsterHunter/Monster/monster_api.json")
    .then(response => response.json()) // Wandle die JSON-Antwort in ein JavaScript-Objekt um
    .then(data => {
        // Hole den Container, in dem die Monsterkarten angezeigt werden sollen
        const monsterList = document.getElementById("monster-list");

        // Durchlaufe jedes Monster in den Daten und erstelle eine Karte für jedes Monster
        data.forEach(monster => {
            // Erstelle ein neues div für die Monsterkarte
            const monsterCard = document.createElement("div");
            monsterCard.classList.add("monster-card"); // Füge der Karte die CSS-Klasse hinzu

            // Füge den Inhalt der Karte hinzu (Name und Beschreibung des Monsters)
            monsterCard.innerHTML = `
                <h3 class="monster-name">${monster.name}</h3>
                <p class="monster-description">${monster.description || 'Keine Beschreibung verfügbar.'}</p>
            `;

            // Füge die Monsterkarte zum Monster-Container hinzu
            monsterList.appendChild(monsterCard);
        });
    });
