// Create variable "win" to refer to current window
var win = Titanium.UI.currentWindow;

// // Add a refresh tweets label to view
// var refreshLabel = Titanium.UI.createLabel({
// 	text:"Loading Tweets...",
// 	font:{fontSize:18, fontWeight:"Bold"},
// 	textAlign:"center",
// 	backgroundColor:"#111",
// 	borderRadius:20,
// 	borderWidth:4,
// 	borderColor:"#222",
// 	color:"#FFF",
// 	width:"230",
// 	height:"50"
// });
// win.add(refreshLabel);

// Function loadTweets()
function loadTweets()
{
	// Create an activity indicator and show it
	var spinner = Titanium.UI.createActivityIndicator({
	    height:50,
	    width:10
	});
	win.add(spinner);	
	spinner.show();
	
	// Empty array "rowData" for our tableview
	var rowData = [];
	// Create our HTTP Client and name it "xhr"
	var xhr = Titanium.Network.createHTTPClient({timeout:15000});
	// Sets the HTTP request method, and the URL to get data from
	xhr.open("GET","http://api.twitter.com/1/statuses/user_timeline.json?screen_name=lebfamilychurch");
	
	// Runs the function when the data is ready for us to process
	xhr.onload = function() 
	{
		var tweets = eval('('+this.responseText+')');
		for (var i = 0; i < tweets.length; i++)
		{
			var tweet = tweets[i].text; // The tweet message
			
			// var tweet = linkify(tweet);
			
			var avatar = tweets[i].user.profile_image_url; // The profile image
			
			// Create a row and set its height to auto
			var row = Titanium.UI.createTableViewRow({
				height:'auto',
				selectionStyle:Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
			});

			// Create the view that will contain the text and avatar
			var post_view = Titanium.UI.createView({
				height:'auto'
			});
			// Create image view to hold profile pic
			var av_image = Titanium.UI.createImageView({
				url:avatar, // the image for the image view
				top:10,
				left:10,
				height:50,
				width:50,
				borderRadius:10
			});
			post_view.add(av_image);
			// Create the label to hold the tweet message
			var tweet_lbl = Titanium.UI.createLabel({
				text:tweet,
				left:70,
				top:5,
				bottom:5,
				height:'auto',
				width:236,
				textAlign:'left',
				font:{fontSize:14}
			});
			post_view.add(tweet_lbl);
			// Add the post view to the row
			row.add(post_view);
			// Give each row a class name
			row.className = "item"+i;
			// Add row to the rowData array
			rowData[i] = row;
		}
		// Create the table view and set its data source to "rowData" array
		var tableView = Titanium.UI.createTableView({
			data:rowData
		});
		//Add the table view to the window
		win.add(tableView);
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
	// Send the HTTP request
	xhr.send();
}
loadTweets();