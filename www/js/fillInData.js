var dataJSONlocation = 'http://tnt.lanparty.lt/index.php';
$.getJSON(dataJSONlocation).done(function(data) {
	$.each(data.events, function(fieldName, fieldValue) {
		var id = fieldValue.id;
		var pavadinimas = fieldValue.pavadinimas;
		var laikas = fieldValue.laikas;
		var zemelapis = fieldValue.zemelapis;
		var turinys = fieldValue.turinys;
		
		
		var universitetas = fieldValue.universitetas;
		var unitag = universitetas.toLowerCase().replace(/\s+/g, '');
		
		var zona = fieldValue.zona;
		var zonatag = zona.toLowerCase().replace(/\s+/g, '');
		
		var miestas = fieldValue.miestas;
		var miestastag = miestas.toLowerCase().replace(/\s+/g, '');
		
		
		if (document.getElementById('city-'+miestastag) == null) {
			var cityList = document.getElementById('citylist');
			citylist.insertAdjacentHTML('beforeEnd','<li><div class="list" id="city-'+miestastag+'" onclick="toggleCity(\''+miestastag+'\')">'+miestas+'</div><ul id="zones-of-'+miestastag+'"></ul></li>'); 
			toggleCity(miestastag);
		}
		
		if (document.getElementById('zone-'+miestastag+'-'+zonatag) == null) {
			var elementID = 'zones-of-'+miestastag;
			var zonelist = document.getElementById(elementID);
			zonelist.insertAdjacentHTML('beforeEnd','<li><div class="list2" id="zone-'+miestastag+'-'+zonatag+'" onclick="toggleZone(\''+miestastag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+miestastag+'-'+zonatag+'"></div></li>'); 
			toggleZone(miestastag+'-'+zonatag);
		}
		
		if (document.getElementById('uni-'+unitag) == null) {
			var unilist = document.getElementById('unilist');
			unilist.insertAdjacentHTML('beforeEnd', '<li><div class="list" id="uni-'+unitag+'" onclick="toggleCity(\''+unitag+'\')">'+universitetas+'</div><ul id="zones-of-'+unitag+'"></ul></li>'); 
			toggleCity(unitag);
		}
		
		if (document.getElementById('zone-'+unitag+'-'+zonatag) == null) {
			var elementID = 'zones-of-'+unitag;
			var zonelist = document.getElementById(elementID);
			zonelist.insertAdjacentHTML('beforeEnd', '<li><div class="list2" id="zone-'+unitag+'-'+zonatag+'" onclick="toggleZone(\''+unitag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+unitag+'-'+zonatag+'"></div></li>'); 
			toggleZone(unitag+'-'+zonatag);
		}
		
		//if (!foundUni) {
		//
		//}
		
		var eventHTML = '';
		
		eventHTML += '<div class="event-description">\n';
		eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
		eventHTML += '<div>'+laikas+'</div>\n'
		eventHTML += '<p>'+universitetas+'</p>\n';
		eventHTML += '<p>'+turinys+'</p>\n';
		eventHTML += '<div>\n';
		eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
		eventHTML += zemelapis+'">\n</iframe>\n</div>';
		eventHTML += '</div>';
		
		var zoneDiv = document.getElementById('events-of-'+miestastag+'-'+zonatag);
		zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);
		
		eventHTML = '';
		eventHTML += '<div class="event-description">\n';
		eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
		eventHTML += '<div>'+laikas+'</div>\n'
		eventHTML += '<p>'+miestas+'</p>\n';
		eventHTML += '<p>'+turinys+'</p>\n';
		eventHTML += '<div>\n';
		eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
		eventHTML += zemelapis+'">\n</iframe>\n</div>';
		eventHTML += '</div>';
		
		var zoneDiv = document.getElementById('events-of-'+unitag+'-'+zonatag);
		zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);
		
	});
})
.fail(function( jqxhr, textStatus, error ) {
	var err = textStatus + ', ' + error;
	console.log( "Request Failed: " + err);
});