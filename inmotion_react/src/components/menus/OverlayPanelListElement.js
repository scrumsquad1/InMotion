import React, {Component} from 'react';

export default class OverlayPanelListElement extends Component {
    render() {
        return (
            <a className="list-group-item btn" onClick={this.props.onClick}>
                {this.props.name}
            </a>
        )
    }
}