import fetcher from '../index.js'

const path = '/api/task';

export const GET_TASKS = (callback) => {

    fetcher.get({
        path,
        callback
    });

};

export const INSERT_TASK = (task, callback) => {

    fetcher.post({
        path,
        data: task.toServerJSON(),
        callback
    });

};

export const DELETE_TASK = (task, callback) => {
    fetcher.delete({
        path,
        data: task.toServerJSON(),
        callback
    });

};
