var map;
function initialize() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

var onSuccess = function(position) {
		  var mapOptions = {
		  center : new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		  zoom: 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  var map = new google.maps.Map(document.getElementById("mapcontent"),
			mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			map: map,
			title:"Your position",
			clickable: true,
			icon: { path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale:6 }
			
		});
		
		
		// creating event markers
		for (var i = 0; i < eventsArray.length; i++) {
			var event = eventsArray[i];
			var id = event.id;
			var pavadinimas = event.pavadinimas;
			var miestastag = event.miestas.toLowerCase().replace(/\s+/g, '');
			var zonatag = event.zona.toLowerCase().replace(/\s+/g, '');
			var zemelapis = event.zemelapis;
			var gpsposition = zemelapis.split(',');
			var lat = parseFloat(gpsposition[0]);
			var lon = parseFloat(gpsposition[1]);
				
			var otherMarker = new google.maps.Marker({
				
				position: new google.maps.LatLng(lat, lon),
				map: map,
				title: pavadinimas,
				clickable: true,
				icon: { path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale:6 }
			});
			
			(function(aId, aZonatag, aMiestastag) {
				google.maps.event.addListener(otherMarker, 'click', function (){
					// cancel map
					menuBack();
					
					//show list
					menuList();
					
					// show cities tab
					$('#citylist').show();
					$('#unilist').hide();
					
					// focus on certain event
					console.log(aMiestastag+'-'+aZonatag+'-'+aId);
					$('#zones-of-'+aMiestastag).slideDown(speed);
					$('#events-of-'+aMiestastag+'-'+aZonatag).slideDown(speed);
					$('html,body').animate({scrollTop: $('#event-'+aId).offset().top - 78},'slow');
				});
			})(id, zonatag, miestastag);
		};
		
		
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
