var win = Titanium.UI.currentWindow;

var videoPlayer = Titanium.Media.createVideoPlayer({
	url:win.message_videofile,
	movieControlMode:Titanium.Media.VIDEO_CONTROL_EMBEDDED,
	scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL
});
win.add(videoPlayer);


videoPlayer.addEventListener('fullscreen', function(e){   // when fullscreen status is changed
    if (!e.entering){                                     // user pressed "Done" or video finished
        win.remove(videoPlayer);
		win.close();
        win.orientationModes = [Ti.UI.PORTRAIT];
    }
});

videoPlayer.addEventListener('playing', function(e){
	win.orientationModes = [Ti.UI.LANDSCAPE_RIGHT];
	videoPlayer.fullscreen = true;
});

videoPlayer.addEventListener('complete', function(e){
	videoPlayer.close();
	win.close();
});

videoPlayer.play();