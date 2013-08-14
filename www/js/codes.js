﻿var codesRequired = 5;
function enterCode() {
	
	var code = document.getElementById('codeinputfield').value;
	var availableCodes = new Array();
	availableCodes[0] = "labas";
	availableCodes[1] = "rytas";
	availableCodes[2] = "drauge";
	availableCodes[3] = "trys";
	availableCodes[4] = "penki";
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
			db.setItem("code"+numCodesUnlocked, code.toLowerCase());
			numCodesUnlocked = numCodesUnlocked+1;
			db.setItem("numCodesUnlocked", numCodesUnlocked);
			document.getElementById('codeinputfield').value = '';
			updateGameScreen();
			
			return false;
		}
	}
	$('p#statusfield').html('Kodas neteisingas!'); 
	return false;
};

function updateGameScreen() {
	var db = window.localStorage;
	var numCodesUnlocked = parseInt(db.getItem("numCodesUnlocked"));
	if (isNaN(numCodesUnlocked)) {
		numCodesUnlocked = 0;
	}
	
	if (numCodesUnlocked >= codesRequired) {
		$('#gameover').show();
		$('#gameon').hide();
	} else {
		$('#code-counter').html(''+(codesRequired-numCodesUnlocked));
		$('#gameover').hide();
		$('#gameon').show();
	};
	
	$('#required-codes').html(''+codesRequired);
};

function emptyCodes() {
	var db = window.localStorage;
	db.clear();
	updateGameScreen();
}

addOnloadEvent(updateGameScreen);