import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = "AIzaSyDTNruUt3WxKm1vr7eFy93r5N37vUQTuuU";
import MapView, { Marker, Polyline, } from 'react-native-maps'

// const destination = {latitude: -19.8087135, longitude: -43.177428};   antiga

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            origin: { latitude: -19.9942, longitude: -44.01745 },
            destination: { latitude: -19.8099063, longitude: -43.1806958 },
            ready: false,
            busStops: [],
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            polyline: [],
            error: null,
        }

    }



    getRouteDetails() {
        fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e&start=8.681495,49.41461&end=8.687872,49.420318')
            .then(resposta => resposta.json())
            .then(JSON => console.warn(JSON.features));

    }


    async getRoute() {
        try {
            let url = 'http://192.168.1.122:3000/routes/2';
            const response = await fetch(url);
            this.setState({ polyline: await response.json() });
            console.log('rotas ok')
        }
        catch (err) {
            console.log('erro fetch rota ', err);
        }
    }

    async getBusStops() {
        try {
            let url = 'http://192.168.1.122:3000/busstops/';
            const response = await fetch(url);
            this.setState({ busStops: await response.json() });
            console.log('pontos ok');
        }
        catch (err) {
            console.log('fetch failed', err);
        }
    }
    async componentDidMount() {

        await this.getBusStops();
        await this.getRoute();
        console.log('ola')
        this.setState({ ready: true });

        let geoOptions = {
            enableHighAccuracy: false,
            timeOut: 20000, //20 second  
            //  maximumAge: 1000 //1 second  
        };
        // this.setState({ ready: false, error: null });
        // navigator.geolocation.getCurrentPosition(this.geoSuccess,
        //     this.geoFailure,
        //     geoOptions);

    }

    geoSuccess = (position) => {
        this.setState({
            ready: true,
            region: {
                latitude: -19.9942,
                longitude: -44.01745,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421,
            }
        })
    }
    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    updateOrigin() {
        // this.setState({ index: this.state.index + 1 })
        // let temp = this.state.origin
        // const origin = this.state.polyline.shift()
        setTimeout(() => {
            console.log("Entrou")
            this.setState({ index: this.state.index + 1 })
            // this.setState({ origin: temp })
        }, 1000);
    }

    mostraMapa() {
        // console.log(this.state.polyline);
        // console.log(this.state.busStops);
        this.updateOrigin();
        let newRegion =
        {
            latitude: this.state.polyline[this.state.index].latitude,
            longitude: this.state.polyline[this.state.index].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }


        return (
            <MapView
                style={styles.map}
                region={newRegion}
                loadingEnabled={true}
            >

                {/* {
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
                } */}

                {this.state.polyline.length > 0 ?
                    // console.log(this.state.polyline)
                    <Polyline
                        coordinates={this.state.polyline}
                        strokeColor="#72bcd4" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}

                    />
                    :
                    console.log('oi')

                }
                {
                    this.state.busStops.length > 0 ?

                        this.state.busStops.map((element, index) => {
                            return (
                                <Marker
                                    key={index}
                                    coordinate={element}
                                    title={`PONTO ${index}`}
                                    description={element.description}
                                />)
                        })
                        :
                        console.log('não há dados')
                }
                {/* <Marker
                    coordinate={this.state.region}
                    title={"Ponto 1 "}
                    description={"Distancia: 0km  Tempo Restante: 0s"}
                />*/}
                <Marker
                    coordinate={this.state.polyline[this.state.index]}
                    image={require('../../assets/logo/busMap.png')}
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
