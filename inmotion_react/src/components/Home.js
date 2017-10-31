import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleMaps from './Map'
import r from '../_Resources/r'

class Home extends Component {

    render() {
        return (
            <div>
                <GoogleMaps
                    googleMapURL={r.keys.GOOGLE_MAPS}
                    containerElement={<div style={
                        {
                            position: 'absolute',
                            top: '50px',
                            left: '0',
                            height: '95vh',
                            width: '100%'
                        }
                    }/>}
                    loadingElement={<div style={{height: `100%`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        )
    }

}

export default connect(() => ({}))(Home)