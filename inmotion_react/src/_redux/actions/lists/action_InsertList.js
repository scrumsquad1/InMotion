import {INSERT_LIST} from '../../../_SpecFetcher/_routes/lists';

export const TYPE_LISTS_INSERTLISTS_START = 'type_lists_insertlists_start';
export const TYPE_LISTS_INSERTLISTS_COMPLETE = 'type_lists_insertlists_complete';
export const TYPE_LISTS_INSERTLISTS_ERROR = 'type_lists_insertlists_error';

export default (list) => (dispatch) => {

    dispatch({type: TYPE_LISTS_INSERTLISTS_START});
    INSERT_LIST(list, (err, result) => {
        if (err) {
            dispatch({type: TYPE_LISTS_INSERTLISTS_ERROR, payload: err});
        } else {
            dispatch({type: TYPE_LISTS_INSERTLISTS_COMPLETE, payload: result});
        }
    });

}