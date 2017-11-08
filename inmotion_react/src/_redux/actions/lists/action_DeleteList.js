import {DELETE_LIST} from '../../../_SpecFetcher/_routes/lists';

export const TYPE_LISTS_DELETELIST_START = 'type_lists_deletelist_start';
export const TYPE_LISTS_DELETELIST_COMPLETE = 'type_lists_deletelist_complete';
export const TYPE_LISTS_DELETELIST_ERROR = 'type_lists_deletelist_error';

export default (list) => (dispatch) => {

    dispatch({type: TYPE_LISTS_DELETELIST_START});

    DELETE_LIST(list, (err, result) => {

        if (!err) {
            dispatch({type: TYPE_LISTS_DELETELIST_COMPLETE, payload: result});
        } else {
            dispatch({type: TYPE_LISTS_DELETELIST_ERROR, payload: err});
        }

    });

}