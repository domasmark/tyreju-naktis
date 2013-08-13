function enterCode() {
	
	var code = document.getElementById('codeinputfield').value;
	var availableCodes = new Array();
	availableCodes[0] = "labas";
	availableCodes[1] = "rytas";
	availableCodes[2] = "drauge";
	for (var i=0;i<availableCodes.length;i++)
	{ 
		if (code.toLowerCase() == availableCodes[i]) {
			//alert('code accepted', function(){});
			var db = window.localStorage;
			var numCodesUnlocked = parseInt(db.getItem("numCodesUnlocked"));
			if (isNaN(numCodesUnlocked)) {
				numCodesUnlocked = 0;
			}
			for (var j = 0; j < numCodesUnlocked; j++) {
				if (db.getItem("code"+j) == code.toLowerCase()) {
					$('p#statusfield').html('Kodas jau įvestas!'); 
					return false;
				}
			}
			$('p#statusfield').html('Kodas priimtas!'); 
			numCodesUnlocked = numCodesUnlocked+1;
			db.setItem("code"+numCodesUnlocked, code.toLowerCase());
			db.setItem("numCodesUnlocked", numCodesUnlocked);
			$('#code-counter').html(''+(5-numCodesUnlocked)); 
			return false;
		}
	}
	$('p#statusfield').html('Kodas neteisingas!'); 
	return false;
};

function loadCodes() {
	var db = window.localStorage;
	var numCodesUnlocked = parseInt(db.getItem("numCodesUnlocked"));
	console.log("total unlocked codes: "  + numCodesUnlocked);
	$('#code-counter').html(''+(5-numCodesUnlocked));
};

//fancy function to add stuff onload
function addOnloadEvent(fnc){
  if ( typeof window.addEventListener != "undefined" )
    window.addEventListener( "load", fnc, false );
  else if ( typeof window.attachEvent != "undefined" ) {
    window.attachEvent( "onload", fnc );
  }
  else {
    if ( window.onload != null ) {
      var oldOnload = window.onload;
      window.onload = function ( e ) {
        oldOnload( e );
        window[fnc]();
      };
    }
    else 
      window.onload = fnc;
  }
};

addOnloadEvent(loadCodes);