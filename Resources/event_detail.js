// Get the current window
var win = Titanium.UI.currentWindow;
win.layout = "vertical";

var eventTitle = Titanium.UI.createLabel({
	text:win.event_title,
	height:"auto",
	top:14,
	left:20,
	right:20,
	color:"#FFF",
	font:{fontSize:22, fontWeight:"bold"}
});
win.add(eventTitle);

var eventDate = Titanium.UI.createLabel({
	text:win.event_date+" @ "+win.event_time,
	height:"auto",
	left:20,
	right:20,
	color:"#FFF",
	font:{fontSize:14}
});
win.add(eventDate);

var eventCost = Titanium.UI.createLabel({
	text:"Cost: "+win.event_cost,
	height:"auto",
	left:20,
	right:20,
	bottom:16,
	color:"#FFF",
	font:{fontSize:14}
});
win.add(eventCost);

var eventDescription = Titanium.UI.createLabel({
	text:win.event_description,
	height:"auto",
	left:20,
	right:20,
	color:"#FFF",
	font:{fontSize:16}
});
win.add(eventDescription);