import {DELETE_TASK} from "../../../_SpecFetcher/_routes/tasks";

export const TYPE_TASKS_DELETETASK_START = 'type_tasks_deletetask_start';
export const TYPE_TASKS_DELETETASK_COMPLETE = 'type_tasks_deletetask_complete';
export const TYPE_TASKS_DELETETASK_ERROR = 'type_tasks_deletetask_error';

export default (task) => (dispatch) => {

    if (task) {

        dispatch({type: TYPE_TASKS_DELETETASK_START});
        DELETE_TASK(task, (err, result) => {
            if (err) {
                dispatch({type: TYPE_TASKS_DELETETASK_ERROR, payload: err});
            } else {
                //TODO convert result to class array
                dispatch({type: TYPE_TASKS_DELETETASK_COMPLETE, payload: task});
            }
        });

    }

}