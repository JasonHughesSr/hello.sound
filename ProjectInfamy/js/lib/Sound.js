
var Sound = {
	velocity: 127,
	delay: 0,
	playNote: function(channel, note, noteVelocity, noteDelay) {
		if(!this.validate()) return;
		if(typeof noteDelay === undefined) {
			noteDelay = delay;
		}
		if(typeof noteVelocity === undefined) {
			noteVelocity = velocity;
		}
		return MIDI.WebAudio.noteOn(channel, this.getCorrectNote(note), noteVelocity, noteDelay);
	},
	playChord: function(channel, chord, noteVelocity, noteDelay){
		if(!this.validate()) return;
		if(typeof noteDelay === undefined) {
			noteDelay = delay;
		}
		if(typeof noteVelocity === undefined) {
			noteVelocity = velocity;
		}
		return MIDI.WebAudio.chordOn(channel, this.getChordNotes(chord), noteVelocity, noteDelay);
	},
	noteOff: function(channel, note, noteDelay) {
		if(!this.validate()) return;
		if(typeof noteDelay === undefined) {
			noteDelay = delay;
		}
		return MIDI.WebAudio.noteOff(channel, this.getCorrectNote(note), noteDelay);
	},
	allNotesOff: function() {
		if(!this.validate()) return;
		return MIDI.WebAudio.stopAllNotes()
	},
	validate: function(){
		if(typeof MIDI === undefined){
			return false;
		} else {
			return true;
		}
	},
	//string to int
	keyToNote: function(key){
		if(!this.validate()) return;
		for( var prop in MIDI.noteToKey ) {
	        if( MIDI.noteToKey.hasOwnProperty( prop ) ) {
	             if( MIDI.noteToKey[ prop ] === key )
	                 return prop;
	    	}
    	}
	},
	// int to string
	noteToKey: function(note){
		if(!this.validate()) return;
		for( var prop in MIDI.keyToNote ) {
	        if( MIDI.keyToNote.hasOwnProperty( prop ) ) {
	             if( MIDI.keyToNote[ prop ] === note )
	                 return prop;
	    	}
    	}
	},
	getCorrectNote: function(value){
		var reg = new RegExp('^\\d+$');
		if(reg.test(value)){
			if(typeof this.noteToKey(value) !== undefined) {
				return value;
			}
		} else {
			if(typeof this.keyToNote(value) !== undefined) {
				return this.keyToNote(value);
			}
		}
	},
	getChordNotes: function(arrayOfNotes) {
		var notes = [];
		for(var i = 0; i < arrayOfNotes.length; i++) {
			notes.push(this.getCorrectNote(arrayOfNotes[i]));
		}
		return notes;
	}
};
