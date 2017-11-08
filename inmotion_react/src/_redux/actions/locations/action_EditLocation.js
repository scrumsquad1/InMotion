import {INSERT_LOCATION} from '../../../_SpecFetcher/_routes/locations';

export const TYPE_LOCATIONS_EDITLOCATIONS_START = 'type_locations_editlocations_start';
export const TYPE_LOCATIONS_EDITLOCATIONS_COMPLETE = 'type_locations_editlocations_complete';
export const TYPE_LOCATIONS_EDITLOCATIONS_ERROR = 'type_locations_editlocations_error';

export default (location) => (dispatch) => {

    if (location) {

        dispatch({type: TYPE_LOCATIONS_EDITLOCATIONS_START});
        INSERT_LOCATION(location, (err, result) => {
            if (err) {
                dispatch({type: TYPE_LOCATIONS_EDITLOCATIONS_ERROR, payload: err});
            } else {
                //TODO classes
                dispatch({type: TYPE_LOCATIONS_EDITLOCATIONS_COMPLETE, payload: result});
            }
        });

    }
}