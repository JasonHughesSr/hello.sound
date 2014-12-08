/**
 * Created by brandonmccartney on 12/7/14.
 */

NoteQueue = [];

ProcessNoteQueue = function()
{
    var note = NoteQueue.pop();

    if(note == undefined)
    {
        FinishedPlaying();
        debugger;
        return;
    }

    MIDI.setVolume(0, 127);

    if(!note.isRest)
    {
        MIDI.noteOn(0, note.noteValue);
    }
    debugger;

    setTimeout(function(){

        MIDI.noteOff(0, note.noteValue, 0.1);

        ProcessNoteQueue();

    }, note.duration);

}

GetVexFormat = function(midiNoteType, noteTiming, isRest)
{
    var result = ' :' + noteTiming + ' ';

    if(isRest == true)
    {
        result += '##';
        return result;
    }

    if (typeof isRest === 'undefined')
        isRest = false;

    if(midiNoteType.length == 3)
    {
        result += midiNoteType[0] + '@' + '/' + midiNoteType[2];
    } else if(!isRest){
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


CreateRest = function(duration)
{
    var rest = CreateNote('A6', duration);
    rest.isRest = true;
    return rest;
};

var wholeNoteLength = 2200;

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
    var note = CreateRest(wholeNoteLength / 16);
    note.vexFormat = GetVexFormat('A6', '16', true);
    NoteQueue.unshift(note);
}

EighthRest = function()
{
    var note = CreateRest(wholeNoteLength / 8);
    note.vexFormat = GetVexFormat('A6', '8', true);
    NoteQueue.unshift(note);
}

QuarterRest = function()
{
    var note = CreateRest(wholeNoteLength / 4);
    note.vexFormat = GetVexFormat('A6', 'q', true);
    NoteQueue.unshift(note);
}

HalfRest = function()
{
    var note = CreateRest(wholeNoteLength / 2);
    note.vexFormat = GetVexFormat('A6', 'h', true);
    NoteQueue.unshift(note);
}

WholeRest = function()
{
    debugger;
    var note = CreateRest(wholeNoteLength);
    note.vexFormat = GetVexFormat('A6', 'w', true);
    NoteQueue.unshift(note);
}
