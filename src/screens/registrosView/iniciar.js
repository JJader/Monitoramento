import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = "AIzaSyDTNruUt3WxKm1vr7eFy93r5N37vUQTuuU";
import MapView, { Marker, Polyline, } from 'react-native-maps'

// const destination = {latitude: -19.8087135, longitude: -43.177428};   antiga

const origin = {latitude: -19.8137135, longitude: -43.182428};
const destination = {latitude: -19.8099063, longitude: -43.1806958};
var med = [
    { lat: -19.8137135, lng: -43.182428 }, // primeiro ponto
    { lat: -19.8135101, lng: -43.1822062 },
    { lat: -19.8132837, lng: -43.1819481 },
    { lat: -19.8129985, lng: -43.1817201 },
    { lat: -19.8127134, lng: -43.181428}, // segundo ponto
    { lat: -19.8124749, lng: -43.1812534 },
    { lat: -19.8122847, lng: -43.1809991 },
    { lat: -19.8121809, lng: -43.1807468 },
    { lat: -19.8120708, lng: -43.1805265 }, // terceiro ponto
    { lat: -19.8116176, lng: -43.1806844 },
    { lat: -19.8110040, lng: -43.1806505 },
    { lat: -19.8104467, lng: -43.1807015 },
    { lat: -19.8099063, lng: -43.1806958 }, // ultimo ponto

]

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            intermediarios: [],
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
            polyline: [],
            error: null,
            x: (0, 1),
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


    addMarker(coordinates) {
        console.log(coordinates);
        this.setState({
            intermediarios: [...this.state.intermediarios,
            { latlng: coordinates }
            ]
        })
    }

    geoSuccess = (position) => {
        console.log(position.coords.latitude);
        let temp = [
            { latitude: -19.8137135, longitude: -43.182428 },
            { latitude: -19.8127134, longitude: -43.181428 },

            { latitude: -19.8127134, longitude: -43.181428 },
            { latitude: -19.8117135, longitude: -43.180428 },

            { latitude: -19.8117135, longitude: -43.180428 },
            { latitude: -19.8087135, longitude: -43.177428 },

        ]
        console.log(temp)
        this.setState({
            ready: true,
            region: {
                latitude: -19.8137135,
                longitude: -43.182428,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            region1: {
                latitude: -19.8127134,
                longitude: -43.181428,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            region2: {
                latitude: -19.8120708,
                longitude: -43.1805265,

                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            region3: {
                latitude: -19.8099063,
                longitude: -43.1806958,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            },
            polyline: temp
        })
    }
    geoFailure = (err) => {
        this.setState({ error: err.message });
    }


    mostraMapa() {
        console.log(this.state.region)
        console.log(this.state.region1)
        console.log(this.state.region2)
        console.log(this.state.region3)
        return (
            <MapView
                style={styles.map}
                region={this.state.region}
                loadingEnabled={true}
                onPress={(e) => this.addMarker(e.nativeEvent.coordinate)}>{
                    this.state.intermediarios.map((marker, i) => (
                        <Marker key={i} coordinate={marker.latlng}
                            title={`${marker.latlng.latitude}, ${marker.latlng.longitude}`} />
                    ))
                }
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={6}
                />
                {/* <Polyline
                    coordinates={this.state.polyline}
                    strokeColor="#72bcd4" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={6}

                /> */}
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