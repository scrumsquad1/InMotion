import {DELETE_TASK} from "../../../_SpecFetcher/_routes/tasks";

export const TYPE_LOCATIONS_DELETELOCATION_START = 'type_locations_deltelocation_start';
export const TYPE_LOCATIONS_DELETELOCATION_COMPLETE = 'type_locations_deletelocation_complete';
export const TYPE_LOCATIONS_DELETELOCATION_ERROR = 'type_locations_deletelocation_error';

export default (location) => (dispatch) => {

    if (location) {

        dispatch({type: TYPE_LOCATIONS_DELETELOCATION_START});
        DELETE_TASK(location, (err, result) => {
            if (err) {
                dispatch({type: TYPE_LOCATIONS_DELETELOCATION_ERROR, payload: err});
            } else {
                //TODO classes
                dispatch({type: TYPE_LOCATIONS_DELETELOCATION_COMPLETE, payload: result});
            }
        });

    }

};