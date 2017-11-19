import {INSERT_TASK} from '../../../_SpecFetcher/_routes/tasks';

export const TYPE_TASKS_INSERTTASK_START = 'type_tasks_inserttask_start';
export const TYPE_TASKS_INSERTTASK_COMPLETE = 'type_tasks_inserttask_complete';
export const TYPE_TASKS_INSERTTASK_ERROR = 'type_tasks_inserttask_error';

//TODO
let count = 0;

export default (task) => (dispatch) => {

    if (task) {

        dispatch({type: TYPE_TASKS_INSERTTASK_START});
        INSERT_TASK(task, (err, result) => {
            if (err) {
                dispatch({type: TYPE_TASKS_INSERTTASK_ERROR, payload: err});
            } else {
                //TODO convert result to class array
                dispatch({type: TYPE_TASKS_INSERTTASK_COMPLETE, payload: result});
            }
        });

        //TODO delete
        task.id = count++;
        dispatch({type: TYPE_TASKS_INSERTTASK_COMPLETE, payload: task});

    }

}