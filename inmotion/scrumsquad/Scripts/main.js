let focusNote = null;

$(document).on('pagebeforeshow ', '#main', function () {   // see: https://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events

    const el_Display = $("#div_notes_list");
    const in_Text_Filter = $("#in_text_filter");
    in_Text_Filter.keyup(() => {
        updateNotes()
    });

    let notesList;
    getNotes((err, result) => {
        if (!err) {
            notesList = result;
            updateNotes()
        } else {
            alert("ERR");
        }
    });

    function updateNotes() {


        el_Display.empty();
        notesList.forEach(function (note, index) {
            if (!in_Text_Filter.val() || note.Subject.indexOf(in_Text_Filter.val()) > -1) {
                el_Display.append(generateNoteView(note));
                if (index < notesList.length - 1) {
                    el_Display.append("<hr/>");
                }
            }
        });
        $('.note .delete-button').click(function (t) {
            var clickedId = t.target.parentNode.id.replace("note_", "");
            notesList.forEach(function (note) {
                if (note.Id == clickedId) {
                    deleteNote(note);
                }
            })
        });
        $('.note .edit-button').click(function (t) {
            var clickedId = t.target.parentNode.id.replace("note_", "");
            notesList.forEach(function (note) {
                if (note.Id == clickedId) {
                    editNote(note);
                }
            })
        })
    }

    function generateNoteView(note) {
        return "<div class='note' id='note_" + note.Id + "'>" +
            "<p>" + note.Subject + "</p>" +
            "<p class='text-muted'>" + note.Details + "</p>" +
            "<button class='btn btn-danger delete-button'>Delete</button> " +
            "<button class='btn btn-warning edit-button'>Edit</button> " +
            "</div>" +
            "</div>";
    }

    function editNote(note) {

    }

    function deleteNote(note) {
        console.log(note);
    }

});

$(document).on('pagebeforeshow ', '#add', function () {   // see: https://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events


});





