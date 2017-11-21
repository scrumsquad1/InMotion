import fetcher from '../index.js'

const path = '/api/location';

export const GET_LOCATIONS = (callback) => {

    fetcher.get({
        path,
        callback
    })

};

export const INSERT_LOCATION = (location, callback) => {

    fetcher.post({
        path,
        data: location.toServerJSON(),
        callback
    });

};

export const DELETE_LOCATION = (location, callback) => {

};