let body = document.getElementById("body");



fetch("https://wilds.mhdb.io/de/weapons")
    .then(response => response.json())
    .then(data => {
        console.log("Geladene Waffen:", data);

        data.forEach(weapon => {
            let tableRow = document.createElement("tr")
            let tableId = document.createElement("td")
            let tableWpBefore = document.createElement("td")
            let tableName = document.createElement("td")
            let tableAttack = document.createElement("td")
            let tableRarity = document.createElement("td")
            // let tableElder = document.createElement("td")
            let tableElement = document.createElement("td")
            let tableSlots = document.createElement("td")

            let ElementType = "None";

            if (weapon.specials && weapon.specials.length > 0 && weapon.specials[0].element !== undefined) {
                ElementType = weapon.specials[0].element;
            }
            let wpBefore = "None";
            if (weapon.crafting.previous && weapon.crafting.previous != null) {
                wpBefore = `${weapon.crafting.previous.id}`;
            }

            // let elderSeal = 'None';
            // if (weapon.elderseal !== null && weapon.elderseal !== undefined) {
            //     elderSeal = weapon.elderseal;
            // }

            let slots = "None";
            if (weapon.slots.length > 0) {
                slots = weapon.slots;
            }

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

            tableId.innerHTML = `${weapon.id}`
            tableWpBefore.innerHTML = `${wpBefore}`
            tableName.innerHTML = `${weapon.name}`
            tableAttack.innerHTML = `${weapon.damage.display}`
            tableRarity.innerHTML = `${weapon.rarity}`
            // tableElder.innerHTML = `${elderSeal}`
            tableElement.innerHTML = `${ElementIcon}`
            tableSlots.innerHTML = `${slots}`

            body.appendChild(tableRow)
            tableRow.appendChild(tableId)
            tableRow.appendChild(tableWpBefore)
            tableRow.appendChild(tableName)
            tableRow.appendChild(tableAttack)
            tableRow.appendChild(tableRarity)
            // tableRow.appendChild(tableElder)
            tableRow.appendChild(tableElement)
            tableRow.appendChild(tableSlots)
        });
    }
    )