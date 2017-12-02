import React, {Component} from 'react';
import {connect} from 'react-redux';
import OverlayPanelMenu from './OverlayPanelMenu';
import List from '../../data/List';
import Location from '../../data/Location';
import action_InsertList from '../../_redux/actions/lists/action_InsertList';
import action_HideMenus from '../../_redux/actions/maps/action_HideMenus';

class NewListOverlay extends Component {

    render() {
        return <OverlayPanelMenu name="NewList" parentMenu="main" showCancel={true}>
            <input className="form-control" type="text" autoFocus={true} placeholder="Name" onKeyDown={e => {
                switch (e.key) {
                    case 'Enter': {
                        const newList = new List({
                            name: e.target.value,
                            location: new Location({
                                lat: this.props.mapStore.menuLocation.lat,
                                lng: this.props.mapStore.menuLocation.lng,
                            })
                        });
                        this.props.dispatch(action_InsertList(newList));
                        this.props.dispatch(action_HideMenus());
                        break;
                    }
                    case 'Escape': {
                        this.props.dispatch(action_HideMenus());
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }}/>
        </OverlayPanelMenu>;
    }

}

export default connect(({mapStore}) => ({mapStore}))(NewListOverlay);