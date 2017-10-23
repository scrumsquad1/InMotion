const NOTES_URI = "/api/notes";

function generateDefaultApiResponse(callback) {
    return {
        success: function (result) {
            callback(null, result)
        },
        error: function (err) {
            callback(err)
        }
    }
}

const defaultApiReponse = {};

function getNotes(callback) {
    $.ajax({
        url: NOTES_URI,
        type: 'GET',
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addNote(note, callback) {
    console.log(note);
    $.ajax({
        url: NOTES_URI,
        type: 'POST',
        data: JSON.stringify(note),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addEdit(note, callback) {
    $.ajax({
        url: NOTES_URI,
        type: 'POST',
        data: JSON.stringify(note),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function deleteNote(note, callback) {
    $.ajax({
        url: NOTES_URI + '/' + note.Id,
        type: 'DELETE',
        ...generateDefaultApiResponse(callback)
    });
}