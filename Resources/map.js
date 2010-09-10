var win = Titanium.UI.currentWindow;

var mountainView = Titanium.Map.createAnnotation({
    latitude:37.663406,
    longitude:-92.631204,
    title:"Lebanon Family Church",
    subtitle:'Lebanon, MO',
    animate:true,
    myid:1, // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS,
	image:"images/map_pin.png",
	rightButton:Titanium.UI.iPhone.SystemButton.DISCLOSURE
});
 
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: {latitude:37.663406, longitude:-92.631204, 
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:false,
    annotations:[mountainView]
});

// Did you click on the right button?
mapview.addEventListener('click', function(evt) {
	// map event properties 
	var annotation = evt.annotation;
	var clickSource = evt.clicksource;

	// custom annotation attribute
	var myid = evt.annotation.myid;

	if ( myid == 1 && evt.clicksource == 'rightButton') {

		// Check to see if Location Services are on
		if (Titanium.Geolocation.locationServicesEnabled==false)
		{
				Titanium.UI.createAlertDialog({title:'LFC', message:'Your device has Location Services turned off.'}).show();
		}
		else
		{
			// Get the last known location
			// Titanium.Geolocation.getCurrentPosition(function(e)
			// {
			// 	if (e.error)
			// 	{
			// 		alert("We could not get your location at this time.");
			// 	}
			// 	var longitude = e.coords.longitude;
			// 	var latitude = e.coords.latitude;
			// });
			
			// Listen for geo events
			// Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			// Titanium.Geolocation.distanceFilter = 10;
			// Titanium.Geolocation.addEventListener('location',function(e)
			// {
			// 	if (e.error)
			// 	{
			// 		alert("We could not get your location at this time");
			// 		return;
			// 	}
			// 	var longitude = e.coords.longitude;
			// 	var latitude = e.coords.latitude;
			// 	
			// 	Titanium.App.Properties.setString("longitude", longitude);
			// 	Titanium.App.Properties.setString("latitude", latitude);
			// });
			// 
			var longitude = Titanium.App.Properties.getString("longitude");
			var latitude = Titanium.App.Properties.getString("latitude");
			Titanium.Platform.openURL("http://maps.google.com/maps?saddr="+latitude+","+longitude+"&daddr=1450+Tower+Rd+65536");
		}
	}
});

win.add(mapview);


// Listen for geo events
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.addEventListener('location',function(e)
{
	if (e.error)
	{
		alert("We could not get your location at this time");
		return;
	}
	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	
	Titanium.App.Properties.setString("longitude", longitude);
	Titanium.App.Properties.setString("latitude", latitude);
});