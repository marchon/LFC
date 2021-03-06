// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var messagesWindow = Titanium.UI.createWindow({  
    title:'Messages',
    backgroundColor:'#222',
	barColor:"#111",
	url:'messages.js'
});
var messagesTab = Titanium.UI.createTab({  
    icon:'icons/66-microphone.png',
    title:'Messages',
    window:messagesWindow
});

// Events Tab
var eventsWindow = Titanium.UI.createWindow({
	title:"Events",
	backgroundColor:"#222",
	barColor:"#111",
	url:"events.js"
});

var eventsTab = Titanium.UI.createTab({
	icon:"icons/83-calendar.png",
	title:"Events",
	window:eventsWindow
});

/* Twitter Tab */
var twitterWindow = Titanium.UI.createWindow({
	title:"@lebfamilychurch on Twitter",
	backgroundColor:"#222",
	barColor:"#111",
	url:"tweets.js"
});

var twitterTab = Titanium.UI.createTab({
	icon:"icons/08-chat.png",
	title:"Twitter",
	window:twitterWindow
});

/* About Tab */
var aboutWindow = Titanium.UI.createWindow({
	title:'About LFC',
	backgroundColor:'#222',
	barColor:'#111',
	url:'about.js'
});

var aboutTab = Titanium.UI.createTab({
	icon:'icons/59-info.png',
	title:'About LFC',
	window:aboutWindow
});

//  add tabs
tabGroup.addTab(messagesTab);
tabGroup.addTab(eventsTab);
tabGroup.addTab(twitterTab);
tabGroup.addTab(aboutTab);

// open tab group
tabGroup.open();
