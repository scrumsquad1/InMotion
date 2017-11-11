const LOCATIONS_URI = "/api/location";

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

function getLocations(callback) {
    $.ajax({
        url: LOCATIONS_URI,
        type: 'GET',
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addLocation(location, callback) {
    console.log(note);
    $.ajax({
        url: LOCATIONS_URI,
        type: 'POST',
        data: JSON.stringify(location),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addEdit(location, callback) {
    $.ajax({
        url: LOCATIONS_URI,
        type: 'POST',
        data: JSON.stringify(location),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function deleteLocation(location, callback) {
    $.ajax({
        url: LOCATIONS_URI + '/' + location.Location_Id,
        type: 'DELETE',
        ...generateDefaultApiResponse(callback)
    });
}