import {GET_LISTS} from '../../../_SpecFetcher/_routes/lists';

export const TYPE_LISTS_FETCHLISTS_START = 'type_lists_fetchlists_start';
export const TYPE_LISTS_FETCHLISTS_COMPLETE = 'type_lists_fetchlists_complete';
export const TYPE_LISTS_FETCHLISTS_ERROR = 'type_lists_fetchlists_error';

export default () => (dispatch) => {

    dispatch({type: TYPE_LISTS_FETCHLISTS_START});
    GET_LISTS((err, result) => {
        if (!err) {
            dispatch({type: TYPE_LISTS_FETCHLISTS_COMPLETE, payload: result});
        } else {
            dispatch({type: TYPE_LISTS_FETCHLISTS_ERROR, payload: err});
        }
    });

}