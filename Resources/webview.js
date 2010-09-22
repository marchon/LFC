// Get the current window
var win = Titanium.UI.currentWindow;
// Titanium.UI.TabGroup.hide();

// webView
var webView = Titanium.UI.createWebView({
	url:win.pageURL
});
win.add(webView);

// Buttons
var backButton = Titanium.UI.createButton({
	image:"icons/leftArrow.png",
	enabled:'false'
});

var forwardButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.PLAY,
	enabled:'false'
});

var refreshButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH		
});

var openSafariButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.ACTION
});

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var stopButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.STOP,
	enabled:true
});

// Button Listeners
backButton.addEventListener("click", function(){
	webView.goBack();
});

forwardButton.addEventListener("click", function(){
	webView.goForward();
});

refreshButton.addEventListener("click", function(){
	webView.reload();
});

openSafariButton.addEventListener("click", function(){
	Titanium.Platform.openURL(win.pageURL);
});

stopButton.addEventListener("click", function(){
	webView.stopLoading();
	win.toolbar = [backButton,flexSpace,forwardButton,flexSpace,refreshButton,flexSpace,openSafariButton];
});

// Listeners

webView.addEventListener("beforeload", function(e)
{
	win.toolbar = [backButton,flexSpace,forwardButton,flexSpace,stopButton,flexSpace,openSafariButton];
	
	// Disable the openSafariButton while the page is loading
	openSafariButton.enabled = "false";
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
	
	// Enable the openSafariButton after the page is done loading
	openSafariButton.enabled = "true";
});

