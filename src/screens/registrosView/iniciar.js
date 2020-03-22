import React from 'react';
import { StyleSheet, Platform, Text, View, Image } from 'react-native';

import MapView, { Marker, Polyline, MarkerAnimated, UrlTile, MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'

const busIcon = require('../../assets/logo/busMap.png');

import _ from "lodash";

import stylesContainer from '../../styles/Modal';

import Header from '../../components/navigationMenu'



export default class App extends React.Component {
    constructor() {
        super();
        this.state = {

            polyBusRoute: [],
            polyRouteRef: {},

            polyWrongRoute: [],
            polyWrongRef: {},
            busStops: [],


            ready: false,

            region: {
                latitude: '',
                longitude: '',
                latitudeDelta: 0.000722,
                longitudeDelta: 0.000221,
            },
            error: null,

            id_moto: 1,//this.props.navigation.getParam('id', 'null'),
            turno_moto: '',//this.props.navigation.getParam('turno', 'null'),
            veiculo_moto: '',//this.props.navigation.getParam('veiculo', 'null'),
            rota_moto: '',//this.props.navigation.getParam('rota', 'null'),

            
            coords: {},
        }
    }

    // component function
    componentWillReceiveProps(newProps) {
        //alert(JSON.stringify(newProps.navigation.state.params.dadosRota))

        let id_moto = newProps.navigation.getParam('id', 'null')
        let turno_moto = newProps.navigation.getParam('turno', 'null')
        let veiculo_moto = newProps.navigation.getParam('veiculo', 'null')
        let rota_moto = newProps.navigation.getParam('rota', 'null')

        if (
            id_moto == this.state.id_moto &&
            turno_moto == this.state.turno_moto &&
            veiculo_moto == this.state.veiculo_moto &&
            rota_moto == this.state.rota_moto
        ) {
            return (null)
        }

        if (id_moto != null &&
            turno_moto != null &&
            veiculo_moto != null &&
            rota_moto != null) {

            this.setState({ id_moto })
            this.setState({ turno_moto })
            this.setState({ veiculo_moto })
            this.setState({ rota_moto })

            this.polyServe()
        }
    }

    componentDidMount() {

        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 1000,
            distanceFilter: 10,
        }

        navigator.geolocation.watchPosition(
            this.geoSuccess,
            this.geoFailure,
            geoOptions);


        this.setState({ ready: false, error: null });
        this.polyServe()
        
    }

    //geoLocation function
    updateLocation(latitude, longitude) {
        const newCoordinate = {
            latitude,
            longitude
        };

        if (Platform.OS === "android") {
            if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(
                    newCoordinate,
                    500
                );
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }

        this.setState({
            ready: true,
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
            },
        })

    }

    geoChange = (position) => {
        const minDelta = 0.0001222 
        let latitude = position.nativeEvent.coordinate.latitude
        let longitude = position.nativeEvent.coordinate.longitude

        let detLat = Math.abs( this.state.region.latitude - latitude )
        let detLon = Math.abs( this.state.region.longitude - longitude )

        if (detLat > minDelta && detLon > minDelta){
            this.updateLocation(latitude, longitude)
        }
    }

    geoSuccess = (position) => {
        console.log(position.coords.latitude);

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        this.updateLocation(latitude, longitude)

        let start = {
            longitude: longitude,
            latitude: latitude
        }
        let end = {
            longitude: -44.4441286,
            latitude: -18.7268367
        }
        this.getPolyWrongline(start,end)

    }

    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    // Polyline function
    async polyServe() {
        let link = URL_API + '/polyline/' + this.state.id_moto
        try {
            const data = await fetch(link);
            const dataJson = await data.json();

            let coords = dataJson.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            })
            this.setState({ polyBusRoute: coords });
            console.log("route okay");

            return coords
        }
        catch (error) {
            alert("Ops !! alguma coisa errada no polyServe")
            return console.log(error);
        } //to catch the errors if any
    }
    
    polyUpdate() {
        let polyline = _.cloneDeep(this.state.polyBusRoute)
        polyline.shift()
        this.state.polyRouteRef.setNativeProps({ coordinates: Polyline })
        this.setState({ polyBusRoute })
    }

    async getPolyWrongline(start, end) {
        let link = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e' + 
        '&start=' + start.longitude + ',' + start.latitude + '&end=' + end.longitude + ',' + end.latitude;
        try {
            const data = await fetch(link);
            const dataJson = await data.json();
            console.log(dataJson);
            dataArray = dataJson.features[0].geometry.coordinates
            
            
            let coords = dataArray.map((point, index) => {
                return {
                    latitude: point[1],
                    longitude: point[0]
                }
            })
            
            this.setState({ polyWrongRoute: coords });
            console.log("New route okay");
            console.log(JSON.stringify(coords));

        }
        catch (error) {
            alert("Ops !! alguma coisa errada no getPolyWrongline")
            return console.log(error);
        } //to catch the errors if any
    }

    // map function
    get mapType() {
        return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }


    mostraMapa() {
        return (
            <View style={stylesContainer.background}>
                <Header title="Mapa" navigationProps={this.props.navigation.toggleDrawer} />
                <MapView
                    style={stylesContainer.conteiner}
                    region={this.state.region}
                    mapType={this.mapType}
                    onUserLocationChange={this.geoChange}
                    //onRegionChange = {this.onRegionChange}
                    showsUserLocation={true}
                >
                    <UrlTile urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maximumZ={30}
                    />

                    {this.state.polyBusRoute.lengthe == 0 ? null :
                        < Polyline
                            key={'0'}
                            ref={(ref => { this.state.polyRouteRef = ref })}
                            geodesic={true}
                            coordinates={this.state.polyBusRoute}
                            strokeColor="#72bcd4"
                            strokeWidth={6} 

                        />
                    }
                    {this.state.polyWrongRoute.lengthe == 0 ? null :
                        < Polyline
                            key={'1'}
                            ref={(ref => { this.state.polyWrongRef = ref })}
                            geodesic={true}
                            coordinates={this.state.polyWrongRoute}
                            strokeColor="red"
                            strokeWidth={10} 
                            
                        />
                    }

                    <MarkerAnimated
                        onPress={() => this.polyUpdate()}
                        coordinate={this.state.region}
                        title={"Minha Localização"}
                        description={
                            "Id: " + this.state.id_moto + "\n"
                        } >
                        <Image
                            style={styles.icon}
                            source={busIcon}
                        />
                    </MarkerAnimated>
                
                </MapView>
            </View>
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