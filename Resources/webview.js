// Get the current window
var win = Titanium.UI.currentWindow;
// Titanium.UI.TabGroup.hide();

// Web Buttons
var webView = Titanium.UI.createWebView({
	url:win.pageURL
});
win.add(webView);

// Buttons
var backButton = Titanium.UI.createButton({
	image:"icons/leftArrow.png",
	enabled:'false'
});

backButton.addEventListener("click", function(){
	webView.goBack();
});

var forwardButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.PLAY,
	enabled:'false'
});

forwardButton.addEventListener("click", function(){
	webView.goForward();
});

var refreshButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH		
});

refreshButton.addEventListener("click", function(){
	webView.reload();
});

var openSafariButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ACTION
});

openSafariButton.addEventListener("click", function(){
	Titanium.Platform.openURL(win.pageURL);
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});


var stopButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.STOP,
	enabled:true
});

stopButton.addEventListener("click", function(){
	webView.stopLoading();
	win.toolbar = [backButton,flexSpace,forwardButton,flexSpace,refreshButton,flexSpace,openSafariButton];
});



// Listeners

webView.addEventListener("beforeload", function(e)
{
	win.toolbar = [backButton,flexSpace,forwardButton,flexSpace,stopButton,flexSpace,openSafariButton];
});

// webView back/forward buttons event listener
webView.addEventListener("load", function()
{
	win.toolbar = [backButton,flexSpace,forwardButton,flexSpace,refreshButton,flexSpace,openSafariButton];
	
	if (webView.canGoBack() == 1) {
		backButton.enabled = "true";
	}
	else {
		backButton.enabled = "false";
	}
	
	if (webView.canGoForward() == 1) {
		forwardButton.enabled = "true";
	}
	else {
		forwardButton.enabled = "false";
	}
});

