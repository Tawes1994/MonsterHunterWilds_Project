fetch("/Frontend_MonsterHunter/Monster/monster_api.json")
        .then(response => response.json())
        .then(data => {

                const monsterlist = document.getElementById("monster-list");

                data.forEach(monster => {
                        const monsterItem = document.createElement("div");
                        monsterItem.classList.add("mosnter-item");
                        monsterItem.innerHTML = `<strong>${monster.name}</strong>`;
                        monsterlist.appendChild(monsterItem);
                })
        });

