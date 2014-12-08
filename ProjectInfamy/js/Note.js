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

GetVexFormat = function(midiNoteType, noteTiming)
{
    var result = ':' + noteTiming + ' ';

    if(midiNoteType.length == 3)
    {
        result += midiNoteType[0] + '@' + '/' + midiNoteType[2];
    } else {

        result += midiNoteType[0] + '/' + midiNoteType[1];
    }

    return result;
}

CreateNote = function(noteKey, duration)
{
    return {
        noteValue: MIDI.keyToNote[noteKey],
        duration: duration,
        isRest: false
    }
};

//note with no volume...
CreateRest = function(duration)
{
    var rest = CreateNote('A6', duration);
    rest.volume = 0;
    return rest;
};

var wholeNoteLength = 1100;

SixteenthNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 16);
    note.vexFormat = GetVexFormat(data, '16');
    NoteQueue.unshift(note);
}

EighthNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 8);
    note.vexFormat = GetVexFormat(data, '8');
    NoteQueue.unshift(note);
}

QuarterNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 4);
    note.vexFormat = GetVexFormat(data, 'q');
    NoteQueue.unshift(note);
}

HalfNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength / 2);
    note.vexFormat = GetVexFormat(data, 'h');
    NoteQueue.unshift(note);
}

WholeNote = function(data)
{
    var note = CreateNote(data, wholeNoteLength);
    note.vexFormat = GetVexFormat(data, 'w');
    NoteQueue.unshift(note);
}





SixteenthRest = function()
{
    var note = CreateRest(data, wholeNoteLength / 16);
    note.vexFormat = GetVexFormat(data, '16');
    NoteQueue.unshift(note);
}

EighthRest = function()
{
    var note = CreateRest(data, wholeNoteLength / 8);
    note.vexFormat = GetVexFormat(data, '8');
    NoteQueue.unshift(note);
}

QuarterRest = function()
{
    var note = CreateRest(data, wholeNoteLength / 4);
    note.vexFormat = GetVexFormat(data, 'q');
    NoteQueue.unshift(note);
}

HalfRest = function()
{
    var note = CreateRest(data, wholeNoteLength / 2);
    note.vexFormat = GetVexFormat(data, 'h');
    NoteQueue.unshift(note);
}

WholeRest = function()
{
    var note = CreateRest(data, wholeNoteLength);
    note.vexFormat = GetVexFormat(data, 'w');
    NoteQueue.unshift(note);
}
