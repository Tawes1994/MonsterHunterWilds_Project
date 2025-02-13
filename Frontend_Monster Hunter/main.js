document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("monster-element");
    if (!container) {
        console.error("Container 'monster-element' nicht gefunden!");
        return;
    }

    fetch("http://127.0.0.1:8000/api/Monsters/")
        .then(response => response.json())
        .then(data => {
            // Monster alphabetisch nach Name sortieren (optional)
            data.sort((a, b) => a.name.localeCompare(b.name));

            data.forEach(monster => {
                // Erstelle das Container-Div für das Monster
                const monsterCard = document.createElement("div");
                monsterCard.classList.add("monster-card");

                // Monstername auf der linken Seite
                const nameDiv = document.createElement("div");
                nameDiv.classList.add("monster-name");
                const name = document.createElement("h2");
                name.textContent = monster.name;
                nameDiv.appendChild(name);

                // Monsterattribute auf der rechten Seite
                const attributeDiv = document.createElement("div");
                attributeDiv.classList.add("monster-element-view");

                // Attribute in zwei Gruppen aufteilen
                const firstGroup = ["feuer", "wasser", "eis", "blitz"];
                const secondGroup = ["gift", "lähmung", "explosion", "schlaf"];

                // Erster Block: feuer bis blitz
                const firstGroupDiv = document.createElement("div");
                firstGroupDiv.classList.add("monster-attribute-group-one");
                firstGroup.forEach(attr => {
                    const listItem = document.createElement("p");
                    listItem.innerHTML = `<strong>${attr}: </strong> ${monster[attr] || "Nicht vorhanden"}`;
                    listItem.classList.add("monster-attribute");
                    firstGroupDiv.appendChild(listItem);
                });

                // Zweiter Block: gift bis schlaf
                const secondGroupDiv = document.createElement("div");
                secondGroupDiv.classList.add("monster-attribute-group-two");
                secondGroup.forEach(attr => {
                    const listItem = document.createElement("p");
                    listItem.innerHTML = `<strong>${attr}: </strong> ${monster[attr] || "Nicht vorhanden"}`;
                    listItem.classList.add("monster-attribute");
                    secondGroupDiv.appendChild(listItem);
                });

                // Füge die beiden Gruppen dem Attribut-Div hinzu
                attributeDiv.appendChild(firstGroupDiv);
                attributeDiv.appendChild(secondGroupDiv);

                // Füge den Name-Div und den Attribut-Div in die Monsterkarte ein
                monsterCard.appendChild(nameDiv);
                monsterCard.appendChild(attributeDiv);

                // Füge die Monsterkarte dem Container hinzu
                container.appendChild(monsterCard);
            });
        })
        .catch(error => console.error("Fehler:", error));
});

// .then((response) => response.json())
// .then((data) => {
//     let monsterList = document.getElementById("monster-liste");
//     let monsterDescList = document.getElementById("monster-element"); // Container für Beschreibungen

//     for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//             const monster = data[key];

//             // 1. Div für Monstername
//             const monsterInfoItem = document.createElement("div");
//             monsterInfoItem.innerHTML = `${monster.name}`;
//             monsterInfoItem.classList.add("monster-item");

//             // 2. Div für Feuer
//             const monsterDescItem = document.createElement("div");
//             monsterDescItem.innerHTML = `Feuer: ${monster.feuer}`;
//             monsterDescItem.classList.add("monster-element");

//             // 3. Füge das Monsterinfo-Item zur Liste für Namen hinzu
//             monsterList.appendChild(monsterInfoItem);

//             // 4. Füge das Monster-Element (Feuer oder Beschreibung) zur Liste für Beschreibungen hinzu
//             monsterDescList.appendChild(monsterDescItem);
//         }
//     }
// })
// .catch((error) => console.error("Fehler beim Laden der Monster-Daten", error));