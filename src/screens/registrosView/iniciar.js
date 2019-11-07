import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = "AIzaSyDTNruUt3WxKm1vr7eFy93r5N37vUQTuuU";
import MapView, { Marker, Polyline, } from 'react-native-maps'

// const destination = {latitude: -19.8087135, longitude: -43.177428};   antiga

var chegou0 = false
var chegou1 = false
var chegou2 = false
var chegou3 = false


var description1= '';
var description2= '';
var description3= '';
var description4= '';

var med = [
    { latitude: -19.8137135, longitude: -43.182428 }, // primeiro ponto
    { latitude: -19.8135101, longitude: -43.1822062 },
    { latitude: -19.8132837, longitude: -43.1819481 },
    { latitude: -19.8129985, longitude: -43.1817201 },
    { latitude: -19.8127134, longitude: -43.181428 }, // segundo ponto
    { latitude: -19.8124749, longitude: -43.1812534 },
    { latitude: -19.8122847, longitude: -43.1809991 },
    { latitude: -19.8121809, longitude: -43.1807468 },
    { latitude: -19.8120708, longitude: -43.1805265 }, // terceiro ponto
    { latitude: -19.8116176, longitude: -43.1806844 },
    { latitude: -19.8110040, longitude: -43.1806505 },
    { latitude: -19.8104467, longitude: -43.1807015 },
    { latitude: -19.8099063, longitude: -43.1806958 }, // ultimo ponto

]

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            origin: { latitude: -19.8137135, longitude: -43.182428 },
            destination: { latitude: -19.8099063, longitude: -43.1806958 },
            Data: '',
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

    getRouteDetails() {
        fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e&start=8.681495,49.41461&end=8.687872,49.420318')
            .then(resposta => resposta.json())
            .then(JSON => console.warn(JSON.features));

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
        let temp = [
            { latitude: -19.8137135, longitude: -43.182428 },
            { latitude: -19.8127134, longitude: -43.181428 },

            { latitude: -19.8127134, longitude: -43.181428 },
            { latitude: -19.8117135, longitude: -43.180428 },

            { latitude: -19.8117135, longitude: -43.180428 },
            { latitude: -19.8087135, longitude: -43.177428 },

        ]
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

    updateOrigin() {

        const origin = med.shift()
        setTimeout(() => {
            // console.log("Entrou")
            this.setState({ origin: origin })
        }, 5000);
    }

    mostraMapa() {
        return (
            <MapView
                style={styles.map}
                region={this.state.region}
                loadingEnabled={true}
                center={this.state.origin}
                >
                
                {
                    this.state.origin.latitude !== this.state.region.latitude && chegou0 === false
                        ?
                        <MapViewDirections
                            style={{ opacity: 0 }}
                            origin={this.state.origin}
                            destination={this.state.region}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={6}
                            resetOnChange={false}
                            onReady={result => {
                                // console.log(result)
                                console.log("PONTO 1")
                                console.log(`Distance: ${result.distance.toFixed(2)} km`)
                                console.log(`Duration: ${result.duration.toFixed(2)} min.`)
                            }}
                        />
                        : chegou0 = true
                }

                {
                    this.state.origin.latitude !== this.state.region1.latitude && chegou1 === false
                        ?
                        <MapViewDirections
                            style={{ opacity: 0 }}
                            origin={this.state.origin}
                            destination={this.state.region1}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={6}
                            resetOnChange={false}
                            onReady={result => {
                                description2= `Distance: ${result.distance.toFixed(2)} km Duration: ${result.duration.toFixed(2)} min.`
                                // console.log(result)
                                // console.log("PONTO 2")
                                // console.log(`Distance: ${result.distance} km`)
                                // console.log(`Duration: ${result.duration} min.`)
                            }}
                        />
                        : chegou1 = true
                }
                {
                    this.state.origin.latitude !== this.state.region2.latitude && chegou2 === false
                        ?
                        <MapViewDirections
                            style={{ opacity: 0 }}
                            origin={this.state.origin}
                            destination={this.state.region2}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={6}
                            resetOnChange={false}
                            onReady={result => {
                                description3= `Distance: ${result.distance.toFixed(2)} km Duration: ${result.duration.toFixed(2)} min.`
                                // console.log(result)
                                // console.log("PONTO 3")
                                // console.log(`Distance: ${result.distance} km`)
                                // console.log(`Duration: ${result.duration} min.`)
                            }}
                        />
                        : chegou2 = true
                }
                {
                    this.state.origin.latitude !== this.state.region3.latitude && chegou3 === false
                        ?
                        <MapViewDirections

                            origin={this.state.origin}
                            destination={this.state.region3}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={6}
                            resetOnChange={false}
                            onReady={result => {
                                description4= `Distance: ${result.distance.toFixed(2)} km Duration: ${result.duration.toFixed(2)} min.`
                                // console.log(result)
                                // console.log("PONTO 4")
                                // console.log(`Distance: ${result.distance} km`)
                                // console.log(`Duration: ${result.duration} min.`)
                            }}
                        />
                        : chegou3 = true
                }




                {/* <Polyline
                    coordinates={this.state.polyline}
                    strokeColor="#72bcd4" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={6}

                /> */}
                <Marker
                    coordinate={this.state.region}
                    title={"Ponto 1 "}
                    description={"Distancia: 0km  Tempo Restante: 0s"}
                />
                <Marker
                    coordinate={this.state.region1}
                    title={"Ponto 2 "}
                    description={description2}
                />
                <Marker
                    coordinate={this.state.region2}
                    title={"Ponto 3 "}
                    description={description3}
                />
                <Marker
                    coordinate={this.state.region3}
                    title={"Ponto 4 "}
                    description={description4}
                />
                <Marker
                    coordinate={this.state.origin}
                    image = {require('../../assets/logo/busMap.png')}
                />
            </MapView>

        )
    }
    render() {
        if (med.length > 0) {
            this.updateOrigin()
        }

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