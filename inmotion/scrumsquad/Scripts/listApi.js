const LISTS_URI = "/api/list";

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

function getLists(callback) {
    $.ajax({
        url: LISTS_URI,
        type: 'GET',
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addList(list, callback) {
    console.log(note);
    $.ajax({
        url: LISTS_URI,
        type: 'POST',
        data: JSON.stringify(list),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addEdit(list, callback) {
    $.ajax({
        url: LISTS_URI,
        type: 'POST',
        data: JSON.stringify(list),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function deleteList(list, callback) {
    $.ajax({
        url: LISTS_URI + '/' + list.List_Id,
        type: 'DELETE',
        ...generateDefaultApiResponse(callback)
    });
}