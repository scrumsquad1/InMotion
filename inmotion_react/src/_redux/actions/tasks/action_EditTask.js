import {INSERT_TASK} from '../../../_SpecFetcher/_routes/tasks';

export const TYPE_TASKS_EDITTASK_START = 'type_tasks_edittask_start';
export const TYPE_TASKS_EDITTASK_COMPLETE = 'type_tasks_edittask_complete';
export const TYPE_TASKS_EDITTASK_ERROR = 'type_tasks_edittask_error';

export default (task) => (dispatch) => {

    if (task) {

        dispatch({type: TYPE_TASKS_EDITTASK_START});
        INSERT_TASK(task, (err, result) => {
            if (err) {
                dispatch({type: TYPE_TASKS_EDITTASK_ERROR, payload: err});
            } else {
                //TODO convert result to class array
                dispatch({type: TYPE_TASKS_EDITTASK_COMPLETE, payload: task});
            }
        });

    }

}