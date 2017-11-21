// import 'whatwg-fetch';
import request from 'superagent';

let defaultHeaders = {};

export default {
    get: ({path, query, callback}) => {
        request
            .get(path)
            .set(defaultHeaders)
            .query(query)
            .end(callback);
    },
    post: ({path, query, data, callback}) => {
        request
            .post(path)
            .set(defaultHeaders)
            .set({
                'Content-Type': 'application/json'
            })
            .query(query)
            .send(data)
            .end(callback);
    },
    delete: ({path, query, data, callback}) => {
        request
            .delete(path)
            .set(defaultHeaders)
            .query(query)
            .send(data)
            .end(callback);
    },
    setAuthentication: ({username, password}) => {
        console.log("Set Auth");
        defaultHeaders = {
            Authorization: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`
        };
        console.log(defaultHeaders);
    },
    clearAuthentication: () => {
        defaultHeaders = {};
    }
}