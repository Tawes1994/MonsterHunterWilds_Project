fetch("https://mhw-db.com/monsters")
        .then(response => response.json())
        .then(data => {console.log("Monsterliste:", data)});