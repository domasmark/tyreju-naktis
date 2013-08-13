var map;
function initialize() {
		var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(55.235288,23.917236),
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('mapcontent'),
		mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
