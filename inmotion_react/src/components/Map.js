import React, {Component} from 'react';
import {GoogleMap, OverlayView, withGoogleMap, withScriptjs} from 'react-google-maps';
import {connect} from 'react-redux'
import action_ShowMenu from '../_redux/actions/maps/action_ShowMenu';
import action_SetMenuLocation from '../_redux/actions/maps/action_SetMenuLocation';
import MainMenu from './menus/MainMenu';
import NewListOverlay from './menus/NewListOverlay';
import ListOverlay from "./menus/ListOverlay";
import bindActionCreators from "redux/es/bindActionCreators";

class Map extends Component {

    generateMenuOverlays() {
        let inner = null;
        switch (this.props.mapStore.visibleMenu) {
            case 'main': {
                inner = <MainMenu/>;
                break;
            }
            case 'newList': {
                inner = <NewListOverlay/>;
                break;
            }
            default:
                return;
        }
        return <OverlayView
            position={this.props.mapStore.menuLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            {inner}
        </OverlayView>
    }

    render() {

        const {listsStore: {lists}, mapStore: {listStates}} = this.props;
        const {setMenuLocation, showMenu} = this.props;

        return (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{lat: 47.585224, lng: -122.148861}}
                onRightClick={(event) => {
                    setMenuLocation({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    });
                    showMenu('main');
                }}
            >
                {lists.map(list => {
                    if (list) {
                        return <OverlayView
                            position={list.location}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                            <ListOverlay list={list} listState={listStates[list.id]}/>
                        </OverlayView>
                    }
                })}
                {this.generateMenuOverlays()}
                <OverlayView
                    position={{lat: 47.586224, lng: -122.152861}}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div style={{width: 400, height: 100, background: 'grey', opacity: 0.9, textAlign: 'center', 'padding-top': 1}}>
                        <h3>Welcome To InMotion</h3>
                        <h4>Right click anywhere to create a list</h4>
                    </div>
                </OverlayView>
            </GoogleMap>

        )

    }

}


const mapStateToProps = (state) => {
    return {
        listsStore: state.listsStore,
        mapStore: state.mapStore
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setMenuLocation: action_SetMenuLocation,
        showMenu: action_ShowMenu
    }, dispatch)
};

let wrappedMap = withScriptjs(withGoogleMap(Map));

export default connect(mapStateToProps, mapDispatchToProps)(wrappedMap);
