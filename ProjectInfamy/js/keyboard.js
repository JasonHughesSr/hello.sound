$(document).ready(function(){
	$('.colors').each(function(){
		$(this).bind('mouseover', function(){
			$(this).toggleClass('activated');
			MIDI.noteOn(0, MIDI.keyToNote[this.id]);
		});
		$(this).bind('mouseleave', function(){
			$(this).toggleClass('activated');
		});
	});
});
var remoteKeyPressed = function(note){
	$("#" + MIDI.noteToKey[note.noteValue]).toggleClass('activated');
};

var remoteKeyReleased = function(note){
	$("#" + MIDI.noteToKey[note.noteValue]).toggleClass('activated');
};

var keyPressed = function(el) {
	console.log(el);
};