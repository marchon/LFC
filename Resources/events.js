// Get the current window
var win = Titanium.UI.currentWindow;

function loadEvents()
{
	// Create an activity indicator and show it
	var spinner = Titanium.UI.createActivityIndicator({
	    height:50,
	    width:10
	});
	win.add(spinner);	
	spinner.show();
	
	var rowData = [];
	var xhr = Titanium.Network.createHTTPClient({timeout:30000});

	xhr.open("GET", "http://dev.lebanonfamilychurch.org/api/events");
	
	// Build the UI of events
	xhr.onload = function()
	{
		// Eval JSON response
		var events = eval('('+this.responseText+')');
		// Loop through, assign JSON keys to variables, make table rows with the data, add the row to the tableView
		for (var i = 0; i < events.length; i++)
		{
			var title = events[i].title; // Title of the event
			var event_cost = events[i].event_cost; // The cost of the event
			var event_date = events[i].event_date; // The event date
			var event_time = events[i].event_time; // The event date
			var event_description = events[i].event_description; // The description		
			
			// Create the row for the table and add it to the rowData array
			var row = Titanium.UI.createTableViewRow({
				hasChild:true,
				height:"auto",
				leftImage:"icons/83-calendar.png"
			});

			// Create view to house the row
			var rowView = Titanium.UI.createView({
				height:61,
				layout:"vertical"
			});
			
			// Create the message title label
			var messageTitleLabel = Titanium.UI.createLabel({
				text:title,
				left:45,
				top:11,
				bottom:5,
				height:20,
				width:250,
				textAlign:'left',
				highlightedColor:"#FFF",
				font:{fontSize:16, fontWeight:"bold"}
			});
			rowView.add(messageTitleLabel);
			
			// Create the message date label
			var messageDateLabel = Titanium.UI.createLabel({
				text:event_date,
				left:45,
				top:0,
				bottom:0,
				width:250,
				height:13,
				textAlign:'left',
				color:"#444",
				highlightedColor:"#FFF",
				font:{fontSize:12, fontWeight:"normal"}
			});
			rowView.add(messageDateLabel);
			
			// Add rowView to the row
			row.add(rowView);
			
			rowData[i] = row;
		}
		
		// Create the tableview and add to the window
		var eventsTable = Titanium.UI.createTableView({
			data:rowData
		});
		
		// create table view event listener
		eventsTable.addEventListener('click', function(e)
		{
			var index = e.index;
			var rowdata = e.rowData;

			var newWin = Titanium.UI.createWindow({
				title:events[index].title,
				url:"event_detail.js",
				backgroundColor:'#222',
				barColor:'#111'
			});
			
			// Set some properties for the next window
			newWin.event_title = events[index].title;
			newWin.event_cost = events[index].event_cost;
			newWin.event_date = events[index].event_date;
			newWin.event_time = events[index].event_time;
			newWin.event_description = events[index].event_description;
			// Now open the window
			Titanium.UI.currentTab.open(newWin,{animated:true});
		});
		
		// Add it to the window
		win.add(eventsTable);
		
		// Release the activity indicator
		spinner.hide();
		win.remove(spinner);
	};
	
	// Send the request
	xhr.send();
}


// If there's no network, warn the user
if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE)
{
	// Build label that shows error message
	var errorLabel = Titanium.UI.createLabel({
		text:"No internet connection. Events could not be loaded at this time.",
		height:"auto",
		width:"auto",
		top:20,
		right:20,
		bottom:20,
		left:20,
		color:"#FFF"
	});
	
	win.add(errorLabel);
	
	alert("Your device doesn't have an internet connection.");
}
else {
	loadEvents();
}