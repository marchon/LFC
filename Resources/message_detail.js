// Get the current window instance
var win = Titanium.UI.currentWindow;
win.layout = "vertical";

// Create the message image view
var messageImage = Titanium.UI.createImageView({
	image:win.message_image,
	preventDefaultImage:true,
	defaultImage:"images/loading192.png",
	height:192,
	width:"auto",
	top:0
});
win.add(messageImage);

// Create the message title label
var titleLabel = Titanium.UI.createLabel({
	text:win.message_title,
	top:10,
	left:14,
	bottom:0,
	height:"auto",
	textAlign:"left",
	color:'#FFF',
	font:{fontSize:18, fontWeight:"bold"}
});
win.add(titleLabel);

// Create the message date label
var dateLabel = Titanium.UI.createLabel({
	text:win.message_date,
	top:0,
	left:14,
	bottom:10,
	height:20,
	textAlign:'left',
	color:'#FFF',
	font:{fontSize:12}
});
win.add(dateLabel);

// Create audio/video view holder
var mediaHolder = Titanium.UI.createView({
	height:45,
	bottom:10
});

// Create Audio & Video buttons
var audioButton = Titanium.UI.createButton({
	top:10,
	left:14,
	botton:10,
	width:140,
	backgroundImage:"images/media_button.png",
	backgroundSelectedImage:"images/media_button_selected.png",
	title:"Audio Only",
	color:"#444",
	selectedColor:"#FFF",
	font:{fontSize:16, fontWeight:"bold"}
});

var videoButton = Titanium.UI.createButton({
	top:10,
	left:168,
	botton:10,
	width:140,
	backgroundImage:"images/media_button.png",
	backgroundSelectedImage:"images/media_button_selected.png",
	title:"Watch Video",
	color:"#444",
	selectedColor:"#FFF",
	font:{fontSize:16, fontWeight:"bold"}
});

mediaHolder.add(audioButton);
// If there's a video variable, show it
if (win.message_videofile)
{
	mediaHolder.add(videoButton);
}
// audioButton event handler
audioButton.addEventListener("click", function()
{	
	// Create the webview
	var webView = Titanium.UI.createWebView({
		top:30000,
		height:0,
		width:0,
		backgroundColor:"#222",
		url:win.message_audiofile
	});
	// release previous webViews
	win.remove(webView);
	win.add(webView);
});

// videoButton event handler
videoButton.addEventListener("click", function()
{
	var newWin = Titanium.UI.createWindow({
		backgroundColor:"#000",
		url:"video.js"
	});
	newWin.message_videofile = win.message_videofile;
	
	// Now open the window
	newWin.open();
	
});

// Add media holder to view
win.add(mediaHolder);