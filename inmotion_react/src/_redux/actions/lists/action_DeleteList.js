import {DELETE_LIST, INSERT_LIST} from '../../../_SpecFetcher/_routes/lists';

export const TYPE_LISTS_DELTELISTS_START = 'type_lists_deltelists_start';
export const TYPE_LISTS_DELTELISTS_COMPLETE = 'type_lists_deltelists_complete';
export const TYPE_LISTS_DELTELISTS_ERROR = 'type_lists_deltelists_error';

export default (list) => (dispatch) => {

    dispatch({type: TYPE_LISTS_DELTELISTS_START});

    DELETE_LIST(list, (err, result) => {

        if (!err) {
            dispatch({type: TYPE_LISTS_DELTELISTS_COMPLETE, payload: result});
        } else {
            dispatch({type: TYPE_LISTS_DELTELISTS_ERROR, payload: err});
        }

    });

}