/**
 * Created by brandonmccartney on 12/7/14.
 */

NoteQueue = [];

ProcessNoteQueue = function()
{
    var note = NoteQueue.pop();

    if(note == undefined)
        return;

    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, note.noteValue);

    setTimeout(function(){

        MIDI.noteOff(0, note.noteValue, 0.75);

        ProcessNoteQueue();

    }, note.duration);

}

CreateNote = function(noteKey, duration)
{
    return {
        noteValue: MIDI.keyToNote[noteKey],
        duration: duration
    }
};

var wholeNoteLength = 1200;

QuarterNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 4);
    NoteQueue.unshift(note);
}

HalfNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 2);
    NoteQueue.unshift(note);
}

WholeNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength);
    NoteQueue.unshift(note);
}