import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps'


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            region1: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            region2: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            region3: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            error: null,
            x : (0,1),
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
            region1: {
                latitude: position.coords.latitude + 0.001,
                longitude: position.coords.longitude + 0.001,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            region2: {
                latitude: position.coords.latitude + 0.005,
                longitude: position.coords.longitude + 0.005,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            region3: {
                latitude: position.coords.latitude + 0.002,
                longitude: position.coords.longitude + 0.002,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
        })
    }
    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    mostraMapa() {
        return (
            <MapView
                style={styles.map}
                region={this.state.region}>

                <Marker
                    coordinate={this.state.region}
                    title={"Ponto 1 "}
                    description={"Primeiro ponto dos alunos"}
                />
                <Marker
                    coordinate={this.state.region1}
                    title={"Ponto 2 "}
                    description={"Segundo ponto dos alunos"}
                />
                <Marker
                    coordinate={this.state.region2}
                    title={"Ponto 3 "}
                    description={"Terceiro ponto dos alunos"}
                />
                <Marker
                    coordinate={this.state.region3}
                    title={"Ponto 4 "}
                    description={"Quarto ponto dos alunos"}
                />
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
    }
});  