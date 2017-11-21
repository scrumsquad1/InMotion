import React, {Component} from 'react';
import {GoogleMap, OverlayView, withGoogleMap, withScriptjs} from 'react-google-maps';
import {connect} from 'react-redux'
import OverlayPanelList from './OverlayPanelMenu';
import OverlayPanelListElement from './OverlayPanelListElement';
import action_ShowMenu from '../_redux/actions/maps/action_ShowMenu';
import action_SetMenuLocation from '../_redux/actions/maps/action_SetMenuLocation';
import MainMenu from './menus/MainMenu';
import NewListOverlay from './menus/NewListOverlay';
import action_SetListState from '../_redux/actions/maps/action_SetListState';
import Task from '../data/Task';
import action_InsertTask from '../_redux/actions/tasks/action_InsertTask';

class Map extends Component {

    onRightClick(event) {
        this.props.dispatch(action_SetMenuLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }));
        this.props.dispatch(action_ShowMenu('main'));
    }

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

    generateListOverlays() {

        let that = this;
        return this.props.listsStore.lists.map(list => {

                if (list) {

                    const listState = this.props.mapStore.listStates[list.id];

                    function generateListFooter() {
                        switch (listState) {
                            case 'visible': {

                                const onAddClick = () => {
                                    that.props.dispatch(action_SetListState({id: list.id, state: 'add'}));
                                };

                                return <button className="btn btn-primary form-control" onClick={onAddClick}>Add Item</button>;

                            }
                            case 'add': {

                                const uniqueInputRef = `list_add_${list.id}`;

                                const onAddClick = () => {
                                    const input = that.refs[uniqueInputRef];
                                    that.props.dispatch(action_InsertTask(new Task({list, subject: input.value})));
                                    that.props.dispatch(action_SetListState({id: list.id, state: 'visible'}));
                                    input.value = '';
                                };

                                const onCancelClick = () => {
                                    that.props.dispatch(action_SetListState({id: list.id, state: 'visible'}));
                                };

                                return (
                                    <div>
                                        <input className="form-control" placeholder="name" ref={uniqueInputRef}/>
                                        <button className="form-control btn btn-warning" onClick={onAddClick}>Add</button>
                                        <button className="form-control btn btn-primary" onClick={onCancelClick}>Cancel</button>
                                    </div>
                                );

                            }
                            default: {
                                break;
                            }
                        }

                    }

                    return <OverlayView
                        key={list.id}
                        position={{lat: list.location.lat, lng: list.location.lng}}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        filterClick={this}>
                        <OverlayPanelList
                            name={list.name}>
                            {list.tasks.map(task =>
                                <OverlayPanelListElement
                                    key={task.id}
                                    name={task.subject}
                                />
                            )}
                            {generateListFooter()}
                        </OverlayPanelList>
                    </OverlayView>

                }

            }
        );
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{lat: 47.585224, lng: -122.148861}}
                onRightClick={this.onRightClick.bind(this)}
            >
                {this.generateListOverlays()}
                {this.generateMenuOverlays()}
            </GoogleMap>
        )
    }

}


let wrappedMap = withScriptjs(withGoogleMap(Map));

export default connect(({listsStore, mapStore}) => ({listsStore, mapStore}))(wrappedMap);