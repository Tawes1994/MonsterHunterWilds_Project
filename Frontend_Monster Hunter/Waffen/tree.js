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

            // Waffen nach Typ filtern (z. B. Großschwerter)
            const greatSwords = data.filter(weapon => weapon.type === "great-sword");
            console.log("Gefilterte Großschwerter:", greatSwords);

            // Waffendaten als verschachtelte UL-Liste generieren
            function createWeaponTree(weapons) {
                const ul = document.createElement("li");
                const li = document.createElement('li')
                ul.classList.add("tree");

                weapons.forEach((GS) => {
                    const id = `weapon_${counter++}`;

                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = id;

                    // Erstelle eine Detailansicht als div
                    let weaponDetails = document.createElement("div");
                    weaponDetails.setAttribute("id", `GS-Element-${counter}`);
                    weaponDetails.setAttribute("class", `GS-Element`);
                    weaponDetails.addEventListener("click", toggleCard);

                    // let label = document.createElement("label");
                    // label.htmlFor = id;
                    // label.classList.add("tree_label");
                    // label.textContent = GS.name;



                    // Waffenelemente aus JSON extrahieren
                    const ElementType = GS.elements.length > 0 ? GS.elements[0].type : "Kein Element";
                    const Slot = GS.slots.length > 0
                        ? GS.slots.map(slot => `Stufe ${slot.rank}`).join(", ")
                        : "Kein Slot";
                    const ElderSeal = GS.elderseal?.affinity || "Kein Siegel";

               // Mappe das Element auf ein entsprechendes Icon
            let ElementIcon = "";
            switch (ElementType) {
              case "fire":
                ElementIcon =
                  '<img class="element-icon" src="../assets/images/Elemente/fireblight.png"></img>';
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


                    let smallTable = `
                      <table>
                          <tr>
                              <td class="smallTitle">${GS.name}</td>
                              ${ElementIcon ? `<td class="smallElement">${ElementIcon}</td>` : ""}
                          </tr>
                      </table>`;

                    let tableHTML = `
                      <table class="bigTbl">
                          <tr>
                              <td class="gs-title">ID</td>
                              <td>: ${GS.id}</td>
                              <td class="gs-title">Waffe vorher</td>
                              <td>: ${GS.crafting.previous}</td>
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
                          <tr class="tb-btn">
                              <td colspan="4" class="gs-button">
                                  <button id="btn-expand">Nächste Stufe</button>
                              </td>
                          </tr>
                      </table>`;

                    weaponDetails.dataset.smallTable = smallTable;
                    weaponDetails.dataset.tableHTML = tableHTML;


                    let contentDiv = document.createElement("div");
                    contentDiv.classList.add("content");
                    contentDiv.htmlFor = id;
                    contentDiv.classList.add("label");
                    contentDiv.classList.add("tree_label");
                    contentDiv.innerHTML = smallTable;

                    li.appendChild(checkbox);
                    li.appendChild(contentDiv);

                    weaponDetails.appendChild(contentDiv);
                    li.appendChild(weaponDetails);

                    ul.appendChild(li);
                });

                return ul;
            }

            // Den generierten Baum ins HTML einfügen
            const weaponTree = createWeaponTree(greatSwords);
            listGroup.appendChild(weaponTree);
        })
        .catch(error => console.error("Fehler beim Laden der JSON-Daten:", error));
});


// TEST ENDE, JA TEST! xD

