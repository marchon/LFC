// Get the current window instance
var win = Titanium.UI.currentWindow;
win.layout = "vertical";

// Create the message image view
var aboutImage = Titanium.UI.createImageView({
	image:"images/church.jpg",
	preventDefaultImage:true,
	defaultImage:"icons/loading192.png",
	height:140,
	bottom:10,
	width:320,
	top:0
});
win.add(aboutImage);

var aboutText = Titanium.UI.createLabel({
	text:"The vision of Lebanon Family Church is to raise the standard of truth in our region and win souls to Jesus Christ.",
	height:"auto",
	left:20,
	right:20,
	bottom:18,
	color:"#FFF",
	font:{fontSize:16}
});
win.add(aboutText);

// Create buttons
var twitterButton = Titanium.UI.createButton({
	bottom:10,
	left:10,
	right:10,
	height:35,
	backgroundImage:"images/about_button.png",
	backgroundSelectedImage:"images/about_button_selected.png",
	color:"#444",
	selectedColor:"#FFF",
	title:"Follow LFC on Twitter",
	font:{fontSize:16, fontWeight:"bold"}
});
win.add(twitterButton);

var facebookButton = Titanium.UI.createButton({
	left:10,
	right:10,
	bottom:10,
	height:35,
	backgroundImage:"images/about_button.png",
	backgroundSelectedImage:"images/about_button_selected.png",
	color:"#444",
	selectedColor:"#FFF",
	title:"Like LFC on Facebook",
	font:{fontSize:16, fontWeight:"bold"}
});
win.add(facebookButton);

var mapButton = Titanium.UI.createButton({
	left:10,
	right:10,
	bottom:10,
	height:35,
	backgroundImage:"images/about_button.png",
	backgroundSelectedImage:"images/about_button_selected.png",
	color:"#444",
	selectedColor:"#FFF",
	title:"Get Directions to LFC",
	font:{fontSize:16, fontWeight:"bold"}
});
win.add(mapButton);


// Twitter event listener
twitterButton.addEventListener('click', function(e)
{
	var newWin = Titanium.UI.createWindow({
		title:"Twitter",
		url:"webview.js",
		barColor:'#111',
		backgroundColor:"#222",
		tabBarHidden:true
	});
	
	newWin.pageURL = "http://twitter.com/lebfamilychurch";
	
	// Now open the window
	Titanium.UI.currentTab.open(newWin,{animated:true});
});

// Facebook event listener
facebookButton.addEventListener('click', function(e)
{
	var newWin = Titanium.UI.createWindow({
		title:"Facebook",
		url:"webview.js",
		barColor:'#111',
		backgroundColor:"#222",
		tabBarHidden:true
	});
	
	newWin.pageURL = "http://facebook.com/lebanonfamilychurch";
	
	// Now open the window
	Titanium.UI.currentTab.open(newWin,{animated:true});
});

// Directions event listener
mapButton.addEventListener('click', function(e)
{
	var newWin = Titanium.UI.createWindow({
		title:"Get Directions to LFC",
		url:"map.js",
		barColor:'#111',
		backgroundColor:"#222",
		tabBarHidden:true
	});
	
	// Now open the window
	Titanium.UI.currentTab.open(newWin,{animated:true});
});