// The current Window
var win = Titanium.UI.currentWindow;

/* Function to get message series JSON from the api */
function loadSeries()
{
	// Create an activity indicator and show it
	var spinner = Titanium.UI.createActivityIndicator({
	    height:50,
	    width:10
	});
	win.add(spinner);	
	spinner.show();
	
	// Create empty rowData for our tableview
	var rowData = [];
	var xhr = Titanium.Network.createHTTPClient({timeout:30000});

	xhr.open("GET", "http://dev.lebanonfamilychurch.org/api/series/");

	xhr.onload = function()
	{
		// Eval JSON response
		var series = eval('('+this.responseText+')');
		// Loop through, assign JSON keys to variables, make table rows with the data, add the row to the tableView
		for (var i = 0; i < series.length; i++)
		{
			var title = series[i].title; // Title of the series
			var series_id = series[i].series_id; // The EE id of the series
			var series_image = series[i].series_image; // The series images
			var series_thumb = series[i].series_thumb; // The series thumbnail
			
			// Create the row for the table and add it to the rowData array
			var row = Titanium.UI.createTableViewRow({
				height:"auto",
				hasChild:true
			});
			
			// Create a vertical layout view to hold all the info labels and images for each tweet
			var series_view = Titanium.UI.createView({
				height:60,
				left:0,
				top:0,
				bottom:0,
				right:0
			});
			
			var series_image_view = Titanium.UI.createImageView({
				top:0,
				left:0,
				height:60,
				width:100,
				image:series_thumb,
				preventDefaultImage:true,
				defaultImage:"icons/loading60.png"
			});
			series_view.add(series_image_view);
			
			var series_label = Titanium.UI.createLabel({
				text:title,
				left:110,
				top:0,
				bottom:0,
				height:60,
				width:200,
				textAlign:'left',
				highlightedColor:"#FFF",
				font:{fontSize:16, fontWeight:"bold"}
			});
			series_view.add(series_label);
			
			// Add the series view to the row
			row.add(series_view);
			
			// Give each row a class to speed rendering up
			// row.className = "series_row";
			
			// Add the row to the rowData array
			rowData[i] = row;
		}
		
		// Create the series tableView
		var seriesTable = Titanium.UI.createTableView({
			data:rowData
			// style:Titanium.UI.iPhone.TableViewStyle.GROUPED
		});
		
		// create table view event listener
		seriesTable.addEventListener('click', function(e)
		{
			var index = e.index;
			var rowdata = e.rowData;

			var newWin = Titanium.UI.createWindow({
				title:series[index].title,
				url:"series_overview.js",
				backgroundColor:'#222',
				barColor:'#111'
			});

			// Set some properties for the next window
			newWin.series_id = series[index].series_id;
			newWin.series_title = series[index].title;
			newWin.series_image = series[index].series_image;
			
			// Now open the window
			Titanium.UI.currentTab.open(newWin,{animated:true});
		});

		// Add the table to the window
		win.add(seriesTable);

		// Release the activity indicator
		spinner.hide();
		win.remove(spinner);
	};
	// Send the request
	xhr.send();
};


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
	loadSeries();
}