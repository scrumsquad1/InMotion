import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import action_SetListState from '../../_redux/actions/maps/action_SetListState';
import action_DeleteList from '../../_redux/actions/lists/action_DeleteList';
import thunkBindActionCreators from "../../_redux/thunkBindActionCreators";
import action_InsertTask from "../../_redux/actions/tasks/action_InsertTask";
import action_EditTask from "../../_redux/actions/tasks/action_EditTask";
import action_DeleteTask from "../../_redux/actions/tasks/action_DeleteTask";
import Task from "../../data/Task";


class ListOverlay extends Component {

    render() {

        const {list, listState} = this.props;
        const {deleteList, setListState, insertTask, editTask, deleteTask} = this.props;
        const {body_below, body_above} = this.refs;

        let header = (
            <div className="panel-heading clearfix">
                <h3 className="panel-title pull-left" style={{paddingTop: 10}}>{list.name}</h3>
                <button className="btn btn-warning pull-right" onClick={() => {
                    setListState({id: list.id, state: 'deleteList'});
                }}>X
                </button>
            </div>
        );

        let body = (
            <div>
                {list.tasks.map(task =>
                    <a className="list-group-item btn">{task.name}</a>
                )}
            </div>
        );

        let footer = null;

        switch (listState) {

            case 'visible': {
                body = (
                    <div>
                        {list.tasks.map(task =>
                            <a onClick={() => {
                    setListState({id: list.id, state: 'editTask' + task.id})
                }} className="list-group-item btn">{task.subject}</a>
                        )}
                        <button className="btn btn-primary form-control" onClick={() => {
                            setListState({id: list.id, state: 'addTask'})
                        }}>Add Task
                        </button>
                    </div>
                );
                break;
            }
            case 'addTask': {
                const uniqueInputRef = `list_add_${list.id}`;
                body = (
                    <div>
                        {list.tasks.map(task =>
                            <a className="list-group-item btn">{task.subject}</a>
                        )}
                        <div>
                            <input className="form-control" placeholder="name" ref={uniqueInputRef}/>
                            <button className="form-control btn btn-warning" onClick={() => {
                                const newTask = new Task({
                                    list,
                                    subject: this.refs[uniqueInputRef].value
                                });
                                insertTask(newTask);
                                setListState({id: list.id, state: 'visible'})
                            }}>Add
                            </button>
                            <button className="form-control btn btn-primary" onClick={() => {
                                setListState({id: list.id, state: 'visible'})
                            }}>Cancel
                            </button>
                        </div>
                    </div>
                );
                break;
            }
            case 'editTask': {
                break;
            }
            case 'deleteTask': {
                break;
            }
            case 'deleteList': {
                header = (
                    <div className="panel-heading"><h3 className="panel-title">Confirm</h3></div>
                );
                body = (
                    <div>
                        <button className="list-group-item btn" onClick={() => {
                            deleteList(list);
                        }}>Delete List
                        </button>
                        <button className="list-group-item btn" onClick={() => {
                            setListState({id: list.id, state: 'visible'})
                        }}>Cancel
                        </button>
                    </div>
                );
                break;
            }
            default: {
                break;
            }

        }

        if (listState.indexOf('editTask') > -1) {

            let taskId = listState.split("k")[1];
            const uniqueInputRef = "task_edit_" + taskId;
            body = (
                <div>
                {list.tasks.map(task =>
                <a className="list-group-item btn">{task.subject}</a>
                )}
        <div>
            <input className="form-control" placeholder="subject" ref={uniqueInputRef}/>
            <button className="form-control btn btn-warning" onClick={() => {
                const newTask = new Task({
                    list,
                    id: taskId,
                    subject: this.refs[uniqueInputRef].value
                });
                editTask(newTask);
                setListState({id: list.id, state: 'visible'})
            }}>Edit
            </button>
            <button className="form-control btn btn-primary" onClick={() => {
              let theTask;
              for (let i = 0; i < list.tasks.length; i++){
                  if (taskId === list.tasks[i].id){
                      theTask = list.tasks[i];
                      console.log(theTask);
                      deleteTask(theTask);
                  }
              }
                setListState({id: list.id, state: 'visible'})
            }}>Delete
            </button>
            <button className="form-control btn btn-primary" onClick={() => {
                setListState({id: list.id, state: 'visible'})
            }}>Cancel
            </button>
            </div>
            </div>
        );
        }

        return <div className="panel panel-default" style={{width: 200}}>
            {header}
            {body}
            {footer && <div className="panel-footer">{footer}</div>}
        </div>;

    }

}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return thunkBindActionCreators({
        deleteList: action_DeleteList,
        setListState: action_SetListState,
        insertTask: action_InsertTask,
        editTask: action_EditTask,
        deleteTask: action_DeleteTask
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOverlay);