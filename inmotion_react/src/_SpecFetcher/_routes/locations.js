import fetcher from '../index.js'

const path = '/api/location';

export const GET_LOCATIONS = (callback) => {
    fetcher.get({
        path,
        callback
    });
};

export const DELETE_LOCATION = (location, callback) => {
    fetcher.delete({
        path,
        data: location.toServerJSON(),
        callback
    });
};

export const INSERT_LOCATION = (location, callback) => {
    fetcher.post({
        path: path,
        data: location.toServerJSON(),
        callback
    });
};
