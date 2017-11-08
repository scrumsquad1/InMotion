import {GET_LOCATIONS} from "../../../_SpecFetcher/_routes/locations";

export const TYPE_LOCATIONS_FETCHLOCATIONS_START = 'type_locations_fetchlocations_start';
export const TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE = 'type_locations_fetchlocations_complete';
export const TYPE_LOCATIONS_FETCHLOCATIONS_ERROR = 'type_locations_fetchlocations_error';

export default () => (dispatch) => {

    dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_START});
    GET_LOCATIONS((err, result) => {
        if(err) {
            dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_ERROR, payload: err});
        } else {
            //TODO convert result to class array
            dispatch({type: TYPE_LOCATIONS_FETCHLOCATIONS_COMPLETE, payload: result});
        }
    });


}