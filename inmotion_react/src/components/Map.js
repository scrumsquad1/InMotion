import React, {Component} from 'react';
import {GoogleMap, Marker, OverlayView, withGoogleMap, withScriptjs} from 'react-google-maps';
import {connect} from 'react-redux'
//import fakeJoin from '../_Resources/dummyList';
import TodoList from './TodoList';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import request from 'superagent';

/**
 * How we use redux in a Component
 * For an example of dispatching an action, see ./TodoList.js
 */

class Map extends Component { // Create a normal component
    constructor(props){
        super(props)

        this.defaultCenter={lat: 47.585224, lng: -122.148861};
        this.state ={

            pos: {
                lat: 0,
                lng: 0,
            },
            lat: 0,
            lng: 0,
            text: ''
        }
    }

    addMarker =(location, map) =>{
        return
        <Marker position={this.defaultCenter}> </Marker>

    } // let us test that it displays at least.
    onMapClick =(e) => {
        // debugger;
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        request.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`).end((err, res) => {
            let pos = {
                lat: lat,
                lng: lng
            }
            this.setState({lat: lat, lng: lng, text: `The Lat is ${lat} and Long is ${lng} \n  Address is ${res.body.results[0].formatted_address}`});
            //debugger;
        })
    }

    render() {
        return (
            <GoogleMap defaultZoom={16} defaultCenter={this.defaultCenter} onClick= {this.onMapClick}>

                <InfoBox
                    defaultPosition={new window.google.maps.LatLng(this.defaultCenter)}
                    position={ new window.google.maps.LatLng({lat: this.state.lat || this.defaultCenter.lat,
                        lng: this.state.lng || this.defaultCenter.lng}) }


                    options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                    <div style={{ width: `150px`, height: `100px`, backgroundColor: `gray`, opacity: 0.75, padding: `12px` }}>
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            {this.state.text}
                        </div>
                    </div>
                </InfoBox>
                <Marker position={ {lat: this.state.lat, lng: this.state.lng} }/>
            </GoogleMap>
        )
    }

}
// I need to test something

const mapStateToProps = (state) => {
    return {
        mapPoints: state.mapPoints
    }
}

//   const mapDispatchToProps = (dispatch) => {
//     return {
//         onMapClick: (center) => {
//         dispatch(onMapClick(center))
//       }
//     }
//   }
function assignStateToProps(state) { // State is referring to the massive json file I was talking about that controls the whole project

    // We will return an object with what stores we want to use like this:
    return {
        mapsStore: state.mapsStore, // Can now be accessed in the component with this.props.mapsStore
        listsStore: state.listsStore, // Can now be accessed in the component with this.props.listsStore
        locationsStore: state.locationsStore // Can now be accessed in the component with this.props.locationsStore
    }

}

let wrappedMap = withScriptjs(withGoogleMap(Map)); // This is needed for GoogleMaps and is not standard, ignore.

// Finally we use connect!
export default connect(mapStateToProps)(withScriptjs(withGoogleMap(Map)));