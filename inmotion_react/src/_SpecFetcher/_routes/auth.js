import fetcher from '../'
import checkRouteArg from './_utils/checkRouteArg';

const path = '/api/auth';

export const GET_AUTH = (callback) => {

    fetcher.get({
        path,
        callback
    });

};

export const INSERT_AUTH = ({email, password, rawPassword, firstname, lastname}, callback) => {

    if (password)
        rawPassword = password;
    if (
        checkRouteArg('email', email, callback) &&
        checkRouteArg('password', password, callback)
    ) {
        fetcher.post({
            path,
            data: {
                email,
                rawPassword,
                firstname,
                lastname
            },
            callback
        });
    }

};