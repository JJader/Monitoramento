import React from 'react';
import { StyleSheet, Platform, Text, View, Image } from 'react-native';

import MapView, { Marker, Polyline, MarkerAnimated } from 'react-native-maps'

const busIcon = require('../../assets/logo/busMap.png');

import _ from "lodash";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {

            polyline: [],
            busStops: [],
            ready: false,

            region: {},
            error: null,
            x: (0, 1),

            //id_motorista: this.props.navigation.getParam('id', 'null'),
            id_motorista: 1,
            polylineRef:{},
            coords: {},
        }
    }
    componentDidMount() {
        let geoOptions = {
            enableHighAccuracy: false,
            timeOut: 20000, //20 second  
            //  maximumAge: 1000 //1 second  
        };
        this.setState({ ready: false, error: null });
        navigator.geolocation.getCurrentPosition(this.geoSuccess,
            this.geoFailure,
            geoOptions);
        this.polyServe()
    }

    geoSuccess = (position) => {
        console.log(position.coords.latitude);

        this.setState({
            ready: true,
            region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
        })
    }
    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    async polyServe() {
        let link = URL_API + '/polyline/' + this.state.id_motorista
        try {
            const data = await fetch(link);
            const dataJson = await data.json();

            let coords = dataJson.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ polyline: coords });
            this.setState({ coords });
            console.log("Mapa okay");
            console.log(this.state.polyline);

            return coords
        }
        catch (error) {
            alert("Ops !! alguma coisa errada no alunoServe")
            return console.log(error);
        } //to catch the errors if any
    }

    polyUpdate() {
        let polyline = _.cloneDeep(this.state.polyline)
        polyline.shift()
        this.state.polylineRef.setNativeProps({coordinates: Polyline})
        this.setState({polyline})
    }

    
    mostraMapa() {
        return (
            <MapView
                style={styles.map}
                region={this.state.region}>

                {this.state.polyline.lengthe == 0 ? null :
                    <Polyline
                        key={'0'}
                        ref={(ref => {this.state.polylineRef = ref})}
                        geodesic={true}
                        coordinates={this.state.polyline}
                        strokeColor="#72bcd4" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6} />
                }
                <MarkerAnimated
                    onPress={() => this.polyUpdate() }
                    coordinate={this.state.region}
                    title={"Id: " + this.state.id_motorista} >
                    <Image
                        style={styles.icon}
                        source={busIcon}
                    />
                </MarkerAnimated>
            </MapView>
        )
    }
    render() {
        return (
            this.state.ready ? this.mostraMapa() : <Text>{this.state.error}</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    big: {
        fontSize: 25
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        zIndex: 3
    }
});  