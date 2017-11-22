import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverlayPanelList from './OverlayPanelMenu';
import OverlayPanelListElement from './OverlayPanelListElement';
import action_ShowMenu from '../../_redux/actions/maps/action_ShowMenu';
import {bindActionCreators} from "redux";

class MainMenu extends Component {

    render() {

        const {showMenu} = this.props;

        return <OverlayPanelList name="Menu" showCancel={true}>
            <OverlayPanelListElement name="New List" onClick={() => {
                showMenu('newList');
            }}/>
        </OverlayPanelList>

    }

}

const mapStateToProps = (state) => {
    return {};
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showMenu: action_ShowMenu
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);