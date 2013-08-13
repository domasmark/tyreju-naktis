var map;
function initialize() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

var onSuccess = function(position) {
	//navigator.notification.alert('geolocation received', function(){});
	//alert('Latitude: '          + position.coords.latitude          + '\n' +
	//	  'Longitude: '         + position.coords.longitude         + '\n' +
	//	  'Altitude: '          + position.coords.altitude          + '\n' +
	//	  'Accuracy: '          + position.coords.accuracy          + '\n' +
	//	  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	//	  'Heading: '           + position.coords.heading           + '\n' +
	//	  'Speed: '             + position.coords.speed             + '\n' +
	//	  'Timestamp: '         + position.timestamp                + '\n');
		  var mapOptions = {
		  center : new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		  zoom: 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  var map = new google.maps.Map(document.getElementById("mapcontent"),
			mapOptions);
		var marker = new google.maps.Marker({
			position: mapOptions.center,
			map: map,
			title:"Your position",
			clickable: true,
			icon: { path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale:6 }
			
		});
		google.maps.event.addListener(marker, 'click', function (){
			window.location.replace('http://www.google.com');
		
		
		});
		map.set('styles', [
			{
				featureType: 'road',
				elementType: 'geometry',
				stylers: [
					{ color: '#ffffff' }, {weight: 1.0}
				]
			}, {
				featureType: 'road',
				elementType: 'labels',
				stylers: [
					{ color: '#000055' }, {weight: 0.2}
				]
			}, {
				featureType: 'poi',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			}, {
				featureType: 'road.highway',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			}, {
				featureType: 'poi',
				elementType: 'geometry',
				stylers: [
					{ visibility: 'off' }
				]
			}
			
			]);
};

// onError Callback receives a PositionError object
//
function onError(error) {
	//if (PositionError.PERMISSION_DENIED == error.code)
		//alert('geolocation permission not granted');
		//navigator.notification.alert('geolocation permission not granted', function(){});
	//if (PositionError.POSITION_UNAVAILABLE == error.code)
		//alert('geolocation not available');
		//navigator.notification.alert('geolocation not available', function(){});
	//if (PositionError.TIMEOUT = error.code)
		//alert('geolocation timeout');
		//navigator.notification.alert('geolocation timeout', function(){});
}

google.maps.event.addDomListener(window, 'load', initialize);
