import fetcher from '../index.js'

const path = '/api/lists';

export const GET_LISTS = (callback) => {

    fetcher.get({
        path,
        callback
    });

};

export const GET_LIST_BY_ID = (callback) => {

};

export const GET_LIST_BY_LOCATION = (callback) => {

};

export const GET_LIST_BY_TASK = (callback) => {

};

export const INSERT_LIST = ({email, password, rawPassword, firstname, lastname}, callback) => {

};

export const DELETE_LIST = (list, callback) => {

};
