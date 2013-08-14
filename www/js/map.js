var map;
function initialize() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

var onSuccess = function(position) {
	initializeMap(position.coords.latitude, position.coords.longitude, 14, true);

};

function initializeMap(latCenter, lonCenter, zoomLevel, geoLocated) {
		var mapOptions = {
		  center : new google.maps.LatLng(latCenter, lonCenter),
		  zoom: zoomLevel,
		  disableDefaultUI: true,
		  backgroundColor: 'none',
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		map = new google.maps.Map(document.getElementById("mapcontent"),
			mapOptions);
		if (geoLocated) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latCenter, lonCenter),
				map: map,
				title:"Tu esi čia",
				animation: google.maps.Animation.DROP,
				clickable: true,
				icon: 'img/pin-your.png'
				
			});
		}
		
		
		// creating event markers
		for (var i = 0; i < eventsArray.length; i++) {
			console.log('adding marker for event '+id);
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
				icon: 'img/pin.png'
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
				featureType: 'poi',
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
			}, {
    			featureType: 'water',
    			stylers: [
     		 	{ color: '#000000' }, {weight: 1.0}
   			 	]
  			},{
			    featureType: 'landscape.natural',
			    stylers: [
			      { color: '#000053' }
			    ]
			  },{
			    featureType: 'landscape.man_made',
			    stylers: [
			      { color: '#243661' }
			    ]
			  },{
			    featureType: 'road',
			    elementType: 'labels.text.stroke',
			    stylers: [
			      { color: '#ffffff' }, {weight: 2.0}
			    ]
			  },{
			    featureType: 'road',
			    elementType: 'labels.text.fill',
			    stylers: [
			      { color: '#000000' }
			    ]
			  },{
			    featureType: 'administrative',
			    elementType: 'labels.text.fill',
			    stylers: [
			      { color: '#ffffff' }
			    ]
			  },{
			    featureType: 'administrative',
			    elementType: 'labels.text.stroke',
			    stylers: [
			      { color: '#000000' }
			    ]
			  },{
			    featureType: 'road.arterial',
			    elementType: 'labels.icon',
			    stylers: [
			      { visibility: 'off' }
			    ]
			  }
			]);
};

// onError Callback receives a PositionError object
//
function onError(error) {
	initializeMap(54.892603,23.968735, 12, false);
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

function goToMap(coords) {
	menuBack();
	menuMap();
	var gpsposition = coords.split(',');
	var lat = parseFloat(gpsposition[0]);
	var lon = parseFloat(gpsposition[1]);
	var center = new google.maps.LatLng(lat, lon);
    // using global variable:
    map.panTo(center);
}

google.maps.event.addDomListener(window, 'load', initialize);
