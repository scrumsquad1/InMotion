import fetcher from '../'

const path = '/api/lists';

export const GET_LISTS = (callback) => {

    fetcher.get({
        path,
        callback
    });

};

//Todo determine list data
export const INSERT_LIST = ({email, password, rawPassword, firstname, lastname}, callback) => {

    console.log('STUB');

    // if (password)
    //     rawPassword = password;
    // if (
    //     checkRouteArg('email', email, callback) &&
    //     checkRouteArg('password', password, callback)
    // ) {
    //     fetcher.post({
    //         path,
    //         data: {
    //             email,
    //             rawPassword,
    //             firstname,
    //             lastname
    //         },
    //         callback
    //     });
    // }

};