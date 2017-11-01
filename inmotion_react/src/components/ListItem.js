import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

class TodoList extends Component {

    static propTypes = {
        itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    };

    render() {
        return (
            <h1>Stub</h1>
        )
    }

}

// See ./Maps.js for explanation
export default connect(({lists}) => ({lists}))(TodoList)