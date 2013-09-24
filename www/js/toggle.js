var speed = 'fast';
var game = 'false';
$(document).ready(function() {
	//onLoad
	$('#content').hide();
	$('#mapcontent').hide();
	$('#gamecontent').hide();
	$('#top').hide();
	$('#top2').hide();
	//Lists
	$('#citylist').show();
	$('#unilist').hide();

	//CSS
	$('#content').css("left","0");
	$('#mapcontent').css("left","0");
	$('#gamecontent').css("left","0");
	$('#top').css("left","0");
	$('#top2').css("left","0");
	$('#adcontent').css("left","0");
	$('#logo').css("left","50%");
	$('#bottom').css("left","0");

	//Main Menu Buttons
	$(".button.listb").click(function(){
		menuList();
	});
	$(".button.map").click(function(){
		menuMap();
	});
	$(".button.game").click(function(){
		menuGame();
		var gameStarted = localStorage['myKey'] || 'defaultValue';
		if (gameStarted == 'true') {
			$('#startgame').hide();
		}
		else {
			$('#startgame').show();
			$('#gameover').hide();
			$('#gameon').hide();	
		}
	});
	/*$(".button.facebook").click(function(){
		menuFacebook();
	});*/

	//List Menu back button
	//funtion for android back button
	document.addEventListener("backbutton", menuBack(), true);
	//var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	$(".back").click(function(){
		menuBack();
		//location.reload();
	});

	//Cities / Universities toggle at list menu
	$('#btncity').click(function() {
		$('#citylist').show();
		$('#unilist').hide();
	});
	$('#btnuni').click(function() {
		$('#citylist').hide();
		$('#unilist').show();
	});
	
});

//unified functions for controlling button beheviour
function menuList() {
	$('#top').show();
	$('#content').show();
	/*$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#top").animate({left:"0"},speed);
	$("#content").animate({left:"0"},speed);*/

	$("#bottom").hide();
	$("#logo").hide();
};

function menuMap() {
	$('#top2').show();
	$('#mapcontent').show();
	
	/*$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#toptitle").html("Žemėlapis");
	$("#top2").animate({left:"0"},speed);
	$("#mapcontent").animate({left:"0"},speed);*/
	
	$("#bottom").hide();
	$("#logo").hide();
	$("#toptitle").html("Žemėlapis");
	
	google.maps.event.trigger(map, 'resize');
	var center = new google.maps.LatLng(myLat, myLon);
	map.panTo(center);
};

function menuGame() {
	game = 'true';
	$('#top2').show();
	$('#gamecontent').show();

	/*$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#toptitle").html("Žaidimas");
	$("#top2").animate({left:"0"},speed);
	$("#gamecontent").animate({left:"0"},speed);*/

	$("#bottom").hide();
	$("#logo").hide();
	$("#toptitle").html("Žaidimas");
};

/*function menuFacebook() {
	$('#top2').show();
	$('#adcontent').show();
	$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#toptitle").html("Reklama");
	$("#top2").animate({left:"0"},speed);
	$("#adcontent").animate({left:"0"},speed);
};*/

function menuBack() {
	if (game == 'true') {
		game = 'false';
		location.reload();
	}
	$('#top').hide();
	$('#top2').hide();
	$('#content').hide();
	$('#mapcontent').hide();
	$('#gamecontent').hide();
	$('#adcontent').hide();

	/*$("#top").animate({left:"200%"},speed);
	$("#content").animate({left:"200%"},speed);
	$("#mapcontent").animate({left:"200%"},speed);
	$("#gamecontent").animate({left:"200%"},speed);
	$("#bottom").animate({left:"0"},speed);
	$("#logo").animate({left:"50%"},speed);*/

	$("#bottom").show();
	$("#logo").show();
};
	
//new functions compatible with auto-population
function toggleZones(title) {
	$('#zones-of-'+title).slideToggle(speed);
	//$('#zones-of-'+title).Toggle();
};

function toggleEvents(title) {
	$('#events-of-'+title).slideToggle(speed);
	//$('#events-of-'+title).Toggle();
};