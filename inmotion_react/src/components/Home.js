import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleMaps from './Map'

class Home extends Component {

    render() {
        return <GoogleMaps
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            containerElement={<div style={{height: `400px`}}/>}
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{height: `100%`}}/>}
        />
    }

}

export default connect(() => {
    return {}
})(Home)