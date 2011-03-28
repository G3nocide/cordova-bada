/*
* PhoneGap Sample App
*
*/

// Geolocation
var watchLocationID = null;

function onGeoLocationSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' +
                        '<hr />'      + element.innerHTML;
}

function onGeoLocationError(error) {
    debugPrint('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function getCurrentPosition() {
	var geolocation = document.getElementById('geolocation');
	try {
    debugPrint("PhoneGap.available: "+PhoneGap.available());
    Geolocation.usePhoneGap();
		geolocation.style.display = 'block';
		navigator.geolocation.getCurrentPosition(onGeoLocationSuccess, onGeoLocationError, { frequency: 3000 });
	} catch(e) {
		alert(e.message);
	}
}
function toggleWatchPosition(em) {
	var geolocation = document.getElementById('geolocation');
	if(em.value == "GeoLocation.StartWatching") {
		em.value = "GeoLocation.StopWatching";
		geolocation.style.display = 'block';
		try {
      debugPrint("PhoneGap.available: "+PhoneGap.available());
			Geolocation.usePhoneGap();
			watchLocationID = navigator.geolocation.watchPosition(onGeoLocationSuccess, onGeoLocationError, { frequency: 3000 });
		} catch(e) {
			alert(e.message);
		}
	} else {
		em.value = "GeoLocation.StartWatching";
		geolocation.style.display = 'none';
		try {
			navigator.geolocation.clearWatch(watchLocationID);
			geolocation.innerHTML = '';
		} catch(e) {
			alert(e.message);
		}
	}
}

// Acceleration
var watchAccelerationID = null;

function onAccelerationSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

function onAccelerationError() {
    alert('onError!');
}

function startWatchAcceleration() {
  var options = { frequency: 3000 };
  watchAccelerationID = navigator.accelerometer.watchAcceleration(onAccelerationSuccess, onAccelerationError, options);
}

function stopWatchAcceleration() {
    if (watchAccelerationID) {
        navigator.accelerometer.clearWatch(watchAccelerationID);
        watchAccelerationID = null;
    }
}

function getCurrentAcceleration() {
	var accelerometer = document.getElementById('accelerometer');
	try {
		accelerometer.style.display = 'block';
		navigator.accelerometer.getCurrentAcceleration(onAccelerationSuccess, onAccelerationError, { frequency: 5000 });
	} catch(e) {
		alert(e.message);
	}
}


function toggleStartAcceleration(em) {
	try {
		var accelerometer = document.getElementById('accelerometer');
		if(em.value == "Accelerometer.watchAcceleration") {
			em.value = "Accelerometer.clearWatch";
			accelerometer.style.display = 'block';
			startWatchAcceleration();
		} else {
			em.value = "Accelerometer.watchAcceleration";
			accelerometer.style.display = 'none';
			stopWatchAcceleration();
		}
	}
	catch(e) {
		alert(e.message);
	}
}
// Utility Function
function debugPrint(body) {
    var list = document.getElementById("debuglist");
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(body));
    list.appendChild(item);
}

// Stock Browser Test (Any URL request launches Stock browser) 
function launchExternalBrowser() {
  window.location = "http://www.phonegap.com";
}


// Network
function hostIsReachable() {
  try {
    var network = document.getElementById('network');
    var callback = function(reachability) {
      var networkState = reachability.code;
      var http_code = reachability.http_code;
      var states = [];
      states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
      states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
      states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
      network.style.display = 'block';
      network.innerHTML = 'Code: '+reachability.code+' Connection type: '+states[networkState];
    }
    navigator.network.isReachable("http://phonegap.com", callback, {});
  } catch(e) {
    debugPrint("hostIsReachable(): "+e.message);
  }
}

// System
function getSystemInfo() {
  try {
    var system = document.getElementById("system");
    system.style.display = "block";
    system.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                       'Device PhoneGap: ' + device.phonegap + '<br />' + 
                       'Device Platform: ' + device.platform + '<br />' + 
                       'Device UUID: '     + device.uuid     + '<br />' + 
                       'Device Version: '  + device.version  + '<br />';
  } catch(e) {
    debugPrint("Error Occured: "+e.message);
  }
  
}

// DebugConsole 
function Log() {
  var log_statement = document.getElementById("log_statement").value;
  console.log(log_statement); 
  console.warn(log_statement); 
  console.error(log_statement); 
  console.log({test:'pouet', test2:['pouet1', 'pouet2']});
}

// Contacts
function createContact() {
  var myContact = navigator.service.contacts.create({displayName: "Test User"});
  myContact.gender = "male";
  console.log("The contact, "+myContact.displayName + ", is of the "+myContact.gender +" gender");
}

function saveContact(contacts) {
  var onSuccess = function() {
    debugPrint("Save Success "+contacts);
  };
  var onError = function(contactError) {
    debugPrint("Error = "+contactError.code);
  };
  var contact = navigator.service.contacts.create();
  contact.displayName = "Plumber";
  contact.nickname = "Plumber";

  var name = new ContactName();
  name.givenName = "Jane";
  name.familtyName = "Doe";
  contact.name = name;
  contact.save(onSuccess, onError);
}

// Compass
var watchCompassId = null;

function startWatchCompass() {
  var options = { frequency: 3000 };
  var onSuccess = function(compass) {
      var element = document.getElementById('compass');
      element.innerHTML = 'Compass X: ' + compass.x + '<br />' +
                          'Compass Y: ' + compass.y + '<br />' +
                          'Compass Z: ' + compass.z + '<br />' +
                          'Timestamp: '      + compass.timestamp + '<br />';
  };

  var onFail = function() {
      debugPrint('Compass Error!');
  };
  watchCompassId = navigator.compass.watchHeading(onSuccess, onFail, options);
}

function stopWatchCompass() {
    try {
      navigator.compass.clearWatch(watchCompassId);
      watchCompassId= null;
    } catch(e) {
      debugPrint("stopWatchCompass: "+e.message);
    }
}

function getCurrentHeading() {
	try {
    var compass = document.getElementById('compass');
    var onSuccess = function(compass) {
        var element = document.getElementById('compass');
        element.innerHTML = 'Compass X: ' + compass.x + '<br />' +
                            'Compass Y: ' + compass.y + '<br />' +
                            'Compass Z: ' + compass.z + '<br />' +
                            'Timestamp: ' + compass.timestamp + '<br />';
    }

    var onFail = function() {
        debugPrint('Compass Error!');
    }
		compass.style.display = 'block';
		navigator.compass.getCurrentHeading(onSuccess, onFail, { frequency: 5000 });
	} catch(e) {
		alert(e.message);
	}
}


function toggleStartCompass(em) {
	try {
		var compass = document.getElementById('compass');
		if(em.value == "Compass.watchHeading") {
			em.value = "Compass.clearWatch";
			compass.style.display = 'block';
			startWatchCompass();
		} else {
			em.value = "Compass.watchHeading";
			compass.style.display = 'none';
			stopWatchCompass();
		}
	}
	catch(e) {
		alert(e.message);
	}
}
