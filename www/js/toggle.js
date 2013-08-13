var speed = 'fast';
$(document).ready(function() {
	//onLoad
	//List Menu is off-screen
	$("#top").animate({left:"200%"},speed);
	$("#content").animate({left:"-200%"},speed);
	$("#mapcontent").animate({left:"-200%"},speed);
	$("#gamecontent").animate({left:"-200%"},speed);
	//Main Menu is visible
	$("#bottom").animate({left:"0"},speed);
	$("#logo").animate({left:"50%"},speed);
	//Lists
	$('#citylist').show();
	$('#unilist').hide();

	//Main Menu Buttons
	$(".button.list").click(function(){
		$("#bottom").animate({left:"-200%"},speed);
		$("#logo").animate({left:"-200%"},speed);
		$("#toptitle").html("Programa");

		$("#top").animate({left:"0"},speed);
		$("#content").animate({left:"0"},speed);
	});
	$(".button.map").click(function(){
		$("#bottom").animate({left:"-200%"},speed);
		$("#logo").animate({left:"-200%"},speed);
		$("#toptitle").html("Žemėlapis");

		$("#top").animate({left:"0"},speed);
		$("#mapcontent").animate({left:"0"},speed);
	});
	$(".button.game").click(function(){
		$("#bottom").animate({left:"-200%"},speed);
		$("#logo").animate({left:"-200%"},speed);
		$("#toptitle").html("Žaidimas");

		$("#top").animate({left:"0"},speed);
		$("#gamecontent").animate({left:"0"},speed);
	});

	//List Menu back button
	$("#back").click(function(){
		$("#top").animate({left:"200%"},speed);
		$("#content").animate({left:"-200%"},speed);
		$("#mapcontent").animate({left:"-200%"},speed);
		$("#gamecontent").animate({left:"-200%"},speed);

		$("#bottom").animate({left:"0"},speed);
		$("#logo").animate({left:"50%"},speed);
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

	
//new functions compatible with auto-population
function toggleZones(title) {
	$('#zones-of-'+title).slideToggle(speed);
};

function toggleEvents(title) {
	$('#events-of-'+title).slideToggle(speed);
};