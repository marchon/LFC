// Get the current window
var win = Titanium.UI.currentWindow;
// Make the layout vertical
win.layout = "vertical";

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
// Create the progresBar that will show the audio file progress
var progressBar = Titanium.UI.createProgressBar({
	top:30,
	min:0,
	value:0,
	width:200
});
win.add(progressBar);

var progressLabel = Titanium.UI.createLabel({
	width: 100,
	height:"auto",
	top:30
});
win.add(progressLabel);

// Create the audio player
Titanium.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
var audioPlayer = Ti.Media.createAudioPlayer({
	url:win.message_audiofile
});

// Start the audio
audioPlayer.start();

audioPlayer.addEventListener('progress',function(e)
{
	progressBar.value = 200;
});

// save off current idle timer state
var idleTimer = Ti.App.idleTimerDisabled;

// while we're in this window don't let the app shutdown when the screen is idle
Ti.App.idleTimerDisabled = true;

win.addEventListener('close',function()
{
	Ti.API.info("window was closed, idleTimer reset to = "+idleTimer);
	
	// restore previous idle state when closed
	Ti.App.idleTimerDisabled = idleTimer;
});