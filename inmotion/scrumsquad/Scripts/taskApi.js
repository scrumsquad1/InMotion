const TASKS_URI = "/api/task";

function getTasks(callback) {
    $.ajax({
        url: TASKS_URI,
        type: 'GET',
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addList(task, callback) {
    console.log(task);
    $.ajax({
        url: TASKS_URI,
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function addEdit(task, callback) {
    $.ajax({
        url: TASKS_URI,
        type: 'POST',
        data: JSON.stringify(task),
        contentType: "application/json",
        ...generateDefaultApiResponse(callback)
    });
}

function deleteList(task, callback) {
    $.ajax({
        url: TASKS_URI + '/' + task.Task_id,
        type: 'DELETE',
        ...generateDefaultApiResponse(callback)
    });
}