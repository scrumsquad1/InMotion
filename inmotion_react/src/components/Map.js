import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';

class GoogleMaps extends Component {

    render() {
        return <GoogleMap/>
    }

}

export default withGoogleMap(GoogleMaps);