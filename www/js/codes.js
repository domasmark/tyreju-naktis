var codesRequired = 5;
function enterCode() {
	
	$('#top2').css('top', '0');
	var code = document.getElementById('codeinputfield').value;
	var availableCodes = new Array();
	availableCodes[0] = "354795";
	availableCodes[1] = "111536";
	availableCodes[2] = "965742";
	availableCodes[3] = "128795";
	availableCodes[4] = "635474";
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
		$('#startgame').hide();
	} else {
		$('#code-counter').html(''+(codesRequired-numCodesUnlocked));
		$('#gameover').hide();
		$('#gameon').show();
		$('#startgame').hide();
	};
	
	$('#required-codes').html(''+codesRequired);
};

function emptyCodes() {
	var db = window.localStorage;
	db.clear();
	updateGameScreen();
}
function startGame() {
	var gameStarted = localStorage['myKey'] || 'defaultValue';
	if (gameStarted != 'true') {
		$('#startgame').hide();
		localStorage['myKey'] = 'true';
	}
	updateGameScreen();
}

addOnloadEvent(updateGameScreen);