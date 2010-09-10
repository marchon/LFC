// Get the current window
var win = Titanium.UI.currentWindow;

// Create the webview
var webView = Titanium.UI.createWebView({
	url:win.message_audiofile
});

win.add(webView);

// listener for the web view movie player
webView.addEventListener('resize', function()
{
	win.close();
});