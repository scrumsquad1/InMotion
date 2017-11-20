import fetcher from '../index.js'

const path = '/api/task';

export const GET_TASKS = (callback) => {

    fetcher.get({
        path,
        callback
    });

};

export const INSERT_TASK = (task, callback) => {

};

export const DELETE_TASK = (task, callback) => {

};
