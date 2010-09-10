// Get the current window instance
var win = Titanium.UI.currentWindow;
win.layout = "vertical";

// Create the message image view
var messageImage = Titanium.UI.createImageView({
	image:win.message_image,
	preventDefaultImage:true,
	defaultImage:"loading192.png",
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
	backgroundImage:"color_000.png",
	backgroundSelectedImage:"color_333.png",
	borderRadius:8,
	borderWidth:1,
	borderColor:"#FFF",
	title:"Audio Only",
	font:{fontSize:14}
});

var videoButton = Titanium.UI.createButton({
	top:10,
	left:168,
	botton:10,
	width:140,
	backgroundImage:"color_000.png",
	backgroundSelectedImage:"color_333.png",
	borderRadius:8,
	borderWidth:1,
	borderColor:"#FFF",
	title:"Watch Video",
	font:{fontSize:14}
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