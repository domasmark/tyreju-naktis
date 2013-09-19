//var dataJSONlocation = 'http://tnt.lanparty.lt';
var dataJSONlocation = 'http://www.loopaloo.com/json/';
//var dataJSONlocation = 'http://www.xn--tyrjnaktis-tmb91i.lt/13metu_json&showtemplate=false';
var eventsArray = new Array();

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñçąčęėįšųūž·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuuncaceeisuuz------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function removeTags(str) {
	var regex = /(<([^>]+)>)/ig;
	var temp = str.replace(/&lt;/g, "<");
	temp = temp.replace(/&gt;/g, ">");
	var result = temp.replace(regex, "");
	return result;
}

addOnloadEvent(function() {

	$.ajax({
		url: dataJSONlocation,
    	async: false,
    	dataType: 'json',
		success: function(data) {
			var db = window.localStorage;
			var localJSON = db.setItem("localJSON", JSON.stringify(data));
			console.log(data.events.length);
			console.log("<p>something</something>");
			console.log(removeTags("<p>something</something>"));
			var i = 0;
			$.each(data.events, function(fieldName, fieldValue) {
				console.log(++i);
				eventsArray.push(fieldValue);
				var id = fieldValue.id;
				var pavadinimas = removeTags(fieldValue.pavadinimas);
				var laikas = fieldValue.laikas;
				var zemelapis = fieldValue.zemelapis;
				var turinys = removeTags(fieldValue.turinys);
				
				
				var universitetas = fieldValue.universitetas;
				var unitag = string_to_slug(universitetas);
				
				var zona = fieldValue.zona;
				var zonatag = string_to_slug(zona);
				
				var miestas = fieldValue.miestas;
				var miestastag = string_to_slug(miestas);
				
				
				if (document.getElementById('city-'+miestastag) == null) {
					var cityList = document.getElementById('citylist');
					cityList.insertAdjacentHTML('beforeEnd','<li><div class="list" id="city-'+miestastag+'" onclick="toggleZones(\''+miestastag+'\')">'+miestas+'</div><ul id="zones-of-'+miestastag+'"></ul></li>'); 
					document.getElementById('zones-of-'+miestastag).style.display="none";
				}
				
				if (document.getElementById('zone-'+miestastag+'-'+zonatag) == null) {
					var elementID = 'zones-of-'+miestastag;
					var zonelist = document.getElementById(elementID);
					zonelist.insertAdjacentHTML('beforeEnd','<li><div class="list2" id="zone-'+miestastag+'-'+zonatag+'" onclick="toggleEvents(\''+miestastag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+miestastag+'-'+zonatag+'"></div></li>'); 
					document.getElementById('events-of-'+miestastag+'-'+zonatag).style.display="none";
				}
				
				if (document.getElementById('uni-'+unitag) == null) {
					var unilist = document.getElementById('unilist');
					unilist.insertAdjacentHTML('beforeEnd', '<li><div class="list" id="uni-'+unitag+'" onclick="toggleZones(\''+unitag+'\')">'+universitetas+'</div><ul id="zones-of-'+unitag+'"></ul></li>'); 
					document.getElementById('zones-of-'+unitag).style.display="none";
				}
				
				if (document.getElementById('zone-'+unitag+'-'+zonatag) == null) {
					var elementID = 'zones-of-'+unitag;
					var zonelist = document.getElementById(elementID);
					zonelist.insertAdjacentHTML('beforeEnd', '<li><div class="list2" id="zone-'+unitag+'-'+zonatag+'" onclick="toggleEvents(\''+unitag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+unitag+'-'+zonatag+'"></div></li>'); 
					document.getElementById('events-of-'+unitag+'-'+zonatag).style.display="none";
				}
				
				var eventHTML = '';
				
				eventHTML += '<div id="event-'+id+'">\n';
				eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
				eventHTML += '<div class="time">'+laikas+'</div>\n'
				eventHTML += '<p>'+universitetas+'</p>\n';
				eventHTML += '<p>'+turinys+'</p>\n';
				eventHTML += '<div>\n';
				//eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
				//eventHTML += 'https://maps.google.lt/maps/ms?msa=0&msid=207538713107079141497.0004de7d82653cd062056&ie=UTF8&t=m&ll='+zemelapis+'&spn=0,0&output=embed">\n</iframe>\n</div>';
				eventHTML += '<button class="mapbtn" onclick="goToMap(\''+zemelapis+'\')">Į žemėlapį</button></div>';
				eventHTML += '</div>';
				
				var zoneDiv = document.getElementById('events-of-'+miestastag+'-'+zonatag);
				zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);
				eventHTML = '';
				eventHTML += '<div id="event-'+id+'">\n';
				eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
				eventHTML += '<div class="time">'+laikas+'</div>\n'
				eventHTML += '<p>'+miestas+'</p>\n';
				eventHTML += '<p>'+turinys+'</p>\n';
				eventHTML += '<div>\n';
				//eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
				//eventHTML += 'https://maps.google.lt/maps/ms?msa=0&msid=207538713107079141497.0004de7d82653cd062056&ie=UTF8&t=m&ll='+zemelapis+'&spn=0,0&output=embed">\n</iframe>\n</div>';
				eventHTML += '<button class="mapbtn" onclick="goToMap(\''+zemelapis+'\')">Į žemėlapį</button></div>';
				eventHTML += '</div>';
				
				var zoneDiv = document.getElementById('events-of-'+unitag+'-'+zonatag);
				zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);
				
			});
		},
		fail: function( jqxhr, textStatus, error ) {
			var err = textStatus + ', ' + error;
			console.log( "Request Failed: " + err);
			
			var db = window.localStorage;
			var savedJSON = db.getItem("localJSON");
			
			var data = JSON.parse(savedJSON);
			$.each(data.events, function(fieldName, fieldValue) {
				eventsArray.push(fieldValue);
				var id = fieldValue.id;
				var pavadinimas = removeTags(fieldValue.pavadinimas);
				var laikas = fieldValue.laikas;
				var zemelapis = removeTags(fieldValue.zemelapis);
				var turinys = fieldValue.turinys;
				
				
				var universitetas = fieldValue.universitetas;
				var unitag = string_to_slug(universitetas);
				
				var zona = fieldValue.zona;
				var zonatag = string_to_slug(zona);
				
				var miestas = fieldValue.miestas;
				var miestastag = string_to_slug(miestas);
				
				
				if (document.getElementById('city-'+miestastag) == null) {
					var cityList = document.getElementById('citylist');
					cityList.insertAdjacentHTML('beforeEnd','<li><div class="list" id="city-'+miestastag+'" onclick="toggleZones(\''+miestastag+'\')">'+miestas+'</div><ul id="zones-of-'+miestastag+'"></ul></li>'); 
					document.getElementById('zones-of-'+miestastag).style.display="none";
				}
				
				if (document.getElementById('zone-'+miestastag+'-'+zonatag) == null) {
					var elementID = 'zones-of-'+miestastag;
					var zonelist = document.getElementById(elementID);
					zonelist.insertAdjacentHTML('beforeEnd','<li><div class="list2" id="zone-'+miestastag+'-'+zonatag+'" onclick="toggleEvents(\''+miestastag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+miestastag+'-'+zonatag+'"></div></li>'); 
					document.getElementById('events-of-'+miestastag+'-'+zonatag).style.display="none";
				}
				
				if (document.getElementById('uni-'+unitag) == null) {
					var unilist = document.getElementById('unilist');
					unilist.insertAdjacentHTML('beforeEnd', '<li><div class="list" id="uni-'+unitag+'" onclick="toggleZones(\''+unitag+'\')">'+universitetas+'</div><ul id="zones-of-'+unitag+'"></ul></li>'); 
					document.getElementById('zones-of-'+unitag).style.display="none";
				}
				
				if (document.getElementById('zone-'+unitag+'-'+zonatag) == null) {
					var elementID = 'zones-of-'+unitag;
					var zonelist = document.getElementById(elementID);
					zonelist.insertAdjacentHTML('beforeEnd', '<li><div class="list2" id="zone-'+unitag+'-'+zonatag+'" onclick="toggleEvents(\''+unitag+'-'+zonatag+'\')">'+zona+'</div><div id="events-of-'+unitag+'-'+zonatag+'"></div></li>'); 
					document.getElementById('events-of-'+unitag+'-'+zonatag).style.display="none";
				}
				
				var eventHTML = '';
				
				eventHTML += '<div id="event-'+id+'">\n';
				eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
				eventHTML += '<div class="time">'+laikas+'</div>\n'
				eventHTML += '<p>'+universitetas+'</p>\n';
				eventHTML += '<p>'+turinys+'</p>\n';
				eventHTML += '<div>\n';
				//eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
				//eventHTML += 'https://maps.google.lt/maps/ms?msa=0&msid=207538713107079141497.0004de7d82653cd062056&ie=UTF8&t=m&ll='+zemelapis+'&spn=0,0&output=embed">\n</iframe>\n</div>';
				eventHTML += '<button class="mapbtn" onclick="goToMap(\''+zemelapis+'\')">Į žemėlapį</button></div>';
				eventHTML += '</div>';
				
				var zoneDiv = document.getElementById('events-of-'+miestastag+'-'+zonatag);
				zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);

				eventHTML = '';
				eventHTML += '<div id="event-'+id+'">\n';
				eventHTML += '<div class="title">'+pavadinimas+'</div>\n';
				eventHTML += '<div class="time">'+laikas+'</div>\n'
				eventHTML += '<p>'+miestas+'</p>\n';
				eventHTML += '<p>'+turinys+'</p>\n';
				eventHTML += '<div>\n';
				//eventHTML += '<iframe style="opacity:0.8" width="260" height="260" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="';
				//eventHTML += 'https://maps.google.lt/maps/ms?msa=0&msid=207538713107079141497.0004de7d82653cd062056&ie=UTF8&t=m&ll='+zemelapis+'&spn=0,0&output=embed">\n</iframe>\n</div>';
				eventHTML += '<button class="mapbtn" onclick="goToMap(\''+zemelapis+'\')">Į žemėlapį</button></div>';
				eventHTML += '</div>';
				
				var zoneDiv = document.getElementById('events-of-'+unitag+'-'+zonatag);
				zoneDiv.insertAdjacentHTML('afterBegin', eventHTML);
				
			});
		}
	});
});