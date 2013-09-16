var speed = 'fast';
$(document).ready(function() {
	//onLoad
	$('#content').hide();
	$('#mapcontent').hide();
	//$("#mapcontent").css({ opacity: 0.0 });
	$('#gamecontent').hide();
	$('#top').hide();
	$('#top2').hide();
	//Lists
	$('#citylist').show();
	$('#unilist').hide();

	//Main Menu Buttons
	$(".button.list").click(function(){
		menuList();
	});
	$(".button.map").click(function(){
		menuMap();
	});
	$(".button.game").click(function(){
		menuGame();
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
	//$('#mapcontent').hide();
	$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#top").animate({left:"0"},speed);
	$("#content").animate({left:"0"},speed);
};

function menuMap() {
	$('#top2').show();
	$('#mapcontent').show();
	//$("#mapcontent").css({ opacity: 0.7 });
	$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#toptitle").html("Žemėlapis");
	$("#top2").animate({left:"0"},speed);
	$("#mapcontent").animate({left:"0"},speed);
	google.maps.event.trigger(map, 'resize');
	var center = new google.maps.LatLng(myLat, myLon);
	map.panTo(center);
	//x=window.innerHeight||document.documentElement.clientWidth||document.getElementsByTagName("body")[0].clientWidth;
	//y=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight;
	//$("#mapcontent").css("width", x);
	//$("#mapcontent").css("height", y);
};

function menuGame() {
	$('#top2').show();
	$('#gamecontent').show();
	$("#bottom").animate({left:"-200%"},speed);
	$("#logo").animate({left:"-200%"},speed);
	$("#toptitle").html("Žaidimas");
	$("#top2").animate({left:"0"},speed);
	$("#gamecontent").animate({left:"0"},speed);
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
	$('#top').hide();
	$('#top2').hide();
	$('#content').hide();
	$('#mapcontent').hide();
	$('#gamecontent').hide();
	$('#adcontent').hide();
	$("#top").animate({left:"200%"},speed);
	$("#content").animate({left:"200%"},speed);
	$("#mapcontent").animate({left:"200%"},speed);
	$("#gamecontent").animate({left:"200%"},speed);
	$("#bottom").animate({left:"0"},speed);
	$("#logo").animate({left:"50%"},speed);
};
	
//new functions compatible with auto-population
function toggleZones(title) {
	$('#zones-of-'+title).slideToggle(speed);
};

function toggleEvents(title) {
	$('#events-of-'+title).slideToggle(speed);
};