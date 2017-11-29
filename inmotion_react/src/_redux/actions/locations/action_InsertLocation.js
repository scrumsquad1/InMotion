import {INSERT_LOCATION} from '../../../_SpecFetcher/_routes/locations';

export const TYPE_LOCATIONS_INSERTLOCATION_START = 'type_locations_insertlocation_start';
export const TYPE_LOCATIONS_INSERTLOCATION_COMPLETE = 'type_locations_insertlocation_complete';
export const TYPE_LOCATIONS_INSERTLOCATION_ERROR = 'type_locations_insertlocation_error';

export default (location) => (dispatch) => {

    return new Promise((resolve, reject) => {

        if (location) {

            dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_START});
            INSERT_LOCATION(location, (err, result) => {
                if (err) {
                    dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_ERROR, payload: err});
                    reject(err);
                } else {
                    //TODO classes
                    dispatch({type: TYPE_LOCATIONS_INSERTLOCATION_COMPLETE, payload: result});
                    resolve(result);
                }
            });

        } else {

            reject('No location passed');

        }

    })

};