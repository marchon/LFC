// The current Window
var win = Titanium.UI.currentWindow;

function loadMessages(){

	// Create an activity indicator and show it
	var spinner = Titanium.UI.createActivityIndicator({
	    height:50,
	    width:10
	});
	win.add(spinner);	
	spinner.show();
	
	// Get the series from the internet
	var tableData = [];

	var xhr = Titanium.Network.createHTTPClient({timeout:15000});

	xhr.open("GET", "http://lebanonfamilychurch.org/api/messages/"+win.series_id);

	xhr.onload = function()
	{
		// Eval JSON response
		var messages = eval('('+this.responseText+')');
		// Loop through, assign JSON keys to variables, make table rows with the data, add the row to the tableView
		for (var i = 0; i < messages.length; i++)
		{
			var title = messages[i].title; // Title of the message
			var url = messages[i].url; // Title of the message
			var date = messages[i].date; // Date of the message
			var week_number = i + 1; // The week number

			// Create the row for the table and add it to the rowData array
			var row = Titanium.UI.createTableViewRow({
				hasChild:true,
				height:"auto"
			});

			// Create view to house the row
			var rowView = Titanium.UI.createView({
				height:60,
				layout:"vertical"
			});
			
			// Create the week number label
			var weekLabel = Titanium.UI.createLabel({
				text:week_number,
				color:"#AAA",
				width:"auto",
				top:0,
				left:20,
				height:60,
				highlightedColor:"#FFF",
				font:{fontSize:28, fontWeight:"bold"}
			});
			rowView.add(weekLabel);
			
			// Create the message title label
			var messageTitleLabel = Titanium.UI.createLabel({
				text:title,
				left:60,
				top:-48,
				bottom:5,
				height:18,
				width:200,
				textAlign:'left',
				highlightedColor:"#FFF",
				font:{fontSize:16, fontWeight:"bold"}
			});
			rowView.add(messageTitleLabel);
			
			// Create the message date label
			var messageDateLabel = Titanium.UI.createLabel({
				text:date,
				left:60,
				top:0,
				bottom:0,
				width:200,
				height:13,
				textAlign:'left',
				color:"#444",
				highlightedColor:"#FFF",
				font:{fontSize:12, fontWeight:"normal"}
			});
			rowView.add(messageDateLabel);
			
			// Add rowView to the row
			row.add(rowView);
			
			// Give each row a class to speed rendering up
			// row.className = "message_row";
			
			// Add the row to the rowData array
			tableData[i] = row;
		}

		// Create the table header view
		var tableHeader = Titanium.UI.createImageView({
			image:win.series_image,
			preventDefaultImage:true,
			defaultImage:"images/loading192.png",
			height:192,
			width:"auto",
			top:0
		});

		// Create the tableview for the messages
		var messageTable = Titanium.UI.createTableView({
			data:tableData,
			headerView:tableHeader
		});
		
		// create table view event listener
		messageTable.addEventListener('click', function(e)
		{
			var index = e.index;
			var rowdata = e.rowData;

			var newWin = Titanium.UI.createWindow({
				title:messages[index].title,
				url:"message_detail.js",
				backgroundColor:'#222',
				barColor:'#111'
			});
			
			// Set some properties for the next window
			newWin.message_id = messages[index].message_id;
			newWin.message_title = messages[index].title;
			newWin.message_url = messages[index].url;
			newWin.message_image = messages[index].message_image;
			newWin.message_date = messages[index].date;
			newWin.message_audiofile = messages[index].message_audiofile;
			newWin.message_videofile = messages[index].message_videofile;
			// Now open the window
			Titanium.UI.currentTab.open(newWin,{animated:true});
		});
		
		
		// Add the message Table to the view
		win.add(messageTable);
		
		// Release the activity indicator
		spinner.hide();
		win.remove(spinner);
	};
	xhr.onerror = function(){
		var alertDialog = Titanium.UI.createAlertDialog({
		    title:"Network Error",
		    message:"We could not get the information you requested.",
		    buttonNames: ['OK']
		});
		alertDialog.show();
		
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
		text:"No internet connection. Messages can not be loaded at this time.",
		height:"auto",
		width:"auto",
		top:20,
		right:20,
		bottom:20,
		left:20,
		color:"#FFF"
	});
	
	win.add(errorLabel);
	
	alert("Your device doesn't have an internet connection");
}
else {
	loadMessages();
}
