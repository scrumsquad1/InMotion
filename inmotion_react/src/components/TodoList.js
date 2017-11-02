import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import action_ShowItem from '../_redux/actions/maps/action_ShowItem';
import r from '../_Resources/r';

class TodoList extends Component {

    static propTypes = {
        listData: PropTypes.array.isRequired,
        listTitle: PropTypes.string
    };

    static defaultProsp = {
        listTitle: r.strings.untitled
    };

    generateListBody() {
        return (
            <div className="list-group">
                {this.props.listData.map((li) =>
                    <a onClick={() => {
                        this.props.dispatch(action_ShowItem(li.id)) // Here I am dispatching the action_ShowItem() action which takes the item id as an argument. Everything will be re-rendered with updated props.
                    }} key={li.id} className="list-group-item">{li.title}</a>
                )}
            </div>
        )
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                {this.props.listTitle}
            </div>
            {this.generateListBody()}
        </div>
    }

}

// See ./Maps.js for explanation
export default connect(({listsStore}) => ({listsStore}))(TodoList)