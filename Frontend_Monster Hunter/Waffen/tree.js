
async function fetchWeapons() {
  const cachedData = localStorage.getItem("weaponData");

  if (cachedData) {
      console.log("Daten aus Cache geladen");
      return JSON.parse(cachedData);
  }

  console.log("Daten von API geladen");
  const response = await fetch("https://mhw-db.com/weapons");
  const weapons = await response.json();

  // Speichere die Daten temporär im localStorage für 10 Minuten
  localStorage.setItem("weaponData", JSON.stringify(weapons));
  localStorage.setItem("cacheTime", Date.now());

  return weapons;
}





function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  function setFontSize(el) {
      var fontSize = el.val();
      
      if ( isNumber(fontSize) && fontSize >= 0.5 ) {
        $('body').css({ fontSize: fontSize + 'em' });
      } else if ( fontSize ) {
        el.val('1');
        $('body').css({ fontSize: '1em' });  
      }
  }
  
  $(function() {
    
    $('#fontSize')
      .bind('change', function(){ setFontSize($(this)); })
      .bind('keyup', function(e){
        if (e.keyCode == 27) {
          $(this).val('1');
          $('body').css({ fontSize: '1em' });  
        } else {
          setFontSize($(this));
        }
      });
    
    $(window)
      .bind('keyup', function(e){
        if (e.keyCode == 27) {
          $('#fontSize').val('1');
          $('body').css({ fontSize: '1em' });  
        }
      });
    
  });