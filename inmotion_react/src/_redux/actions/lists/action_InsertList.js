import {INSERT_LIST} from '../../../_SpecFetcher/_routes/lists';
import {TYPE_MAPS_SETLISTSTATE} from '../maps/action_SetListState';

export const TYPE_LISTS_INSERTLIST_START = 'type_lists_insertlist_start';
export const TYPE_LISTS_INSERTLIST_COMPLETE = 'type_lists_insertlist_complete';
export const TYPE_LISTS_INSERTLIST_ERROR = 'type_lists_insertlist_error';

//TODO
let count = 0;

export default (list) => (dispatch) => {

    dispatch({type: TYPE_LISTS_INSERTLIST_START});
    INSERT_LIST(list, (err, result) => {
        if (err) {
            dispatch({type: TYPE_LISTS_INSERTLIST_ERROR, payload: err});
        } else {
            dispatch({type: TYPE_LISTS_INSERTLIST_COMPLETE, payload: result});
        }
    });

    //Todo
    list.id = count++;
    dispatch({type: TYPE_LISTS_INSERTLIST_COMPLETE, payload: list});
    dispatch({type: TYPE_MAPS_SETLISTSTATE, payload: {id: list.id, state: 'visible'}});
}