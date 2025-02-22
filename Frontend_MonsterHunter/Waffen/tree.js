document.addEventListener("DOMContentLoaded", () => {
    let listGroup = document.getElementById("list-group");
    let counter = 0;

    function toggleCard(event) {
        const card = event.currentTarget;
        const expanded = card.dataset.expanded === "true";

        card.querySelector(".content").innerHTML = expanded ?
            card.dataset.smallTable :
            card.dataset.tableHTML;

        card.dataset.expanded = expanded ? "false" : "true";
    }

    fetch("/Frontend_Monster Hunter/weapons.json")
        .then(response => response.json())
        .then(data => {
            console.log("Geladene Waffen:", data);

            // Alle Buttons mit einer gemeinsamen Klasse (damit wir einen EventListener auf alle anwenden können)
            const buttons = document.querySelectorAll(".button");

            // Funktion, die den Waffentyp filtern wird
            function filterWeaponsByType(type) {
                const loadedweapon = data.filter(weapon => weapon.type === type.toLowerCase());
                console.log("Gefilterte Waffen:", loadedweapon);

                // Waffendaten als verschachtelte UL-Liste generieren
                const weaponTree = createWeaponTree(loadedweapon);
                listGroup.innerHTML = "";  // Vorherige Ergebnisse löschen
                listGroup.appendChild(weaponTree);
            }

            // EventListener für jeden Button hinzufügen
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const weaponType = button.id.split("_")[1].toLowerCase();  // 'GS', 'LS' oder 'DB'
                    console.log("Button ID:", button.id);  // Debug-Ausgabe, um sicherzustellen, dass die ID richtig ist
                    filterWeaponsByType(weaponType);  // Aufruf der Funktion mit dem richtigen Typ
                });
            });

            // Speicher für später im Code
            let weaponElements = {};

            // Funktion zum Erstellen des Waffentraums
            function createWeaponTree(weapons) {
                let treeRoot = document.createElement("ul");
                let weaponElements = {};

                // **1. Durchlauf: Erstelle alle Waffen-Elemente**
                weapons.forEach(GS => {
                    let weaponElement = createWeaponElement(GS);
                    weaponElements[GS.id] = weaponElement;  // **Richtig speichern**
                });

                // **2. Durchlauf: Baue die Hierarchie**
                weapons.forEach(GS => {
                    let weaponElement = weaponElements[GS.id];
                    const secChild = weaponElement.children[1];
                    let parentID = GS.crafting?.previous;

                    if (!parentID || parentID === GS.id) {
                        treeRoot.appendChild(weaponElement);
                        return;
                    }

                    let parentLI = weaponElements[parentID];
                    if (secChild) {
                        secChild.setAttribute('class', 'label_child');
                    }
                    if (parentLI) {
                        parentLI.querySelector("ul").appendChild(weaponElement);
                    } else {
                        treeRoot.appendChild(weaponElement);
                    }
                });

                return treeRoot;
            }


            function createWeaponElement(GS) {
                const li = document.createElement('li');
                li.setAttribute('class', 'li_tree')
                const id = `weapons_${counter++}`;

                const ElementType = GS.elements.length > 0 ? GS.elements[0].type : "Kein Element";
                const Slot = GS.slots.length > 0
                    ? GS.slots.map(slot => `Stufe ${slot.rank}`).join(", ")
                    : "Kein Slot";
                const ElderSeal = GS.elderseal?.affinity || "Kein Siegel";

                let ElementIcon = "";
                switch (ElementType) {
                    case "fire":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/fireblight.png"></img>';
                        break;
                    case "ice":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/iceblight.png"></img>';
                        break;
                    case "water":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/waterblight.png"></img>';
                        break;
                    case "thunder":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/thunderblight.webp"></img>';
                        break;
                    case "dragon":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/dragonblight.png"></img>';
                        break;
                    case "poison":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/Poison.png"></img>';
                        break;
                    case "blast":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/blastblight.png"></img>';
                        break;
                    case "paralysis":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/Paralysis.webp"></img>';
                        break;
                    case "sleep":
                        ElementIcon = '<img class="element-icon" src="../assets/images/Elemente/Sleep.png"></img>';
                        break;
                    default:
                        ElementIcon = "";
                }

                let tableHTML = `
                <input type="checkbox" id="${id}" class="checkbox"/>
                    <label class="tree_label" for="${id}">
                        <span class="label">${GS.name} ${GS.attack.display}</span>
                    </label>
                    <div class="weapon-details">
                    <table class="bigTbl">
                        <tr>
                            <td class="gs-title">ID</td>
                            <td>: ${GS.id}</td>
                            <td class="gs-title">Waffe vorher</td>
                            <td>: ${GS.crafting.previous || "Keine"}</td>
                        </tr>
                        <tr>
                            <td class="gs-title">Name</td>
                            <td>: ${GS.name}</td>
                            <td class="gs-title">Attack</td>
                            <td>: ${GS.attack.display}</td>
                        </tr>
                        <tr>
                            <td class="gs-title">Seltenheit</td>
                            <td>: ${GS.rarity}</td>
                            <td class="gs-title">Elderseal</td>
                            <td>: ${ElderSeal}</td>
                        </tr>
                        <tr>
                            <td class="gs-title">Element</td>
                            <td>: ${ElementIcon}</td>
                            <td class="gs-title">Slots</td>
                            <td>: ${Slot}</td>
                        </tr>
                    </table>
                </label>`;

                li.innerHTML = tableHTML;
                let subTree = document.createElement('ul');
                subTree.setAttribute('class', 'ul_tree');
                let checkbox = li.querySelector(".checkbox");
                checkbox.addEventListener("change", () => {
                    let isChecked = checkbox.checked;
                    li.querySelector(".weapon-details").style.display = isChecked ? "flex" : "none";
                    subTree.style.display = isChecked ? "flex" : "none";
                });

                li.appendChild(subTree);
                weaponElements[GS.id] = subTree;

                return li;
            }
        })
        .catch(error => console.error("Fehler beim Laden der JSON-Daten:", error));
});