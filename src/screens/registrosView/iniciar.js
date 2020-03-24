import React from 'react';
import { StyleSheet, Platform, Dimensions,Text, View, Image, Button } from 'react-native';

import MapView, { Marker, Polyline, MarkerAnimated, UrlTile, MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'

const busIcon = require('../../assets/logo/busMap.png');

import _ from "lodash";

import stylesContainer from '../../styles/Modal';

import Header from '../../components/navigationMenu'

const { width, height } = Dimensions.get('window');

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {

            polyBusRoute: [],
            polyRouteRef: {},

            polyWrongRoute: [],
            polyWrongRef: {},
            busStops: [
                //latitude: '',
                //longitude: '',
                //value: ''
            ],
            busStopsRoute: [],

            ready: false,

            region: {
                latitude: '',
                longitude: '',
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            error: null,

            timeOut : false,

            id_moto: 1,//this.props.navigation.getParam('id', 'null'),
            turno_moto: '',//this.props.navigation.getParam('turno', 'null'),
            veiculo_moto: '',//this.props.navigation.getParam('veiculo', 'null'),
            rota_moto: '',//this.props.navigation.getParam('rota', 'null'),
        }
    }

    // component function
    componentWillReceiveProps(newProps) {
        //alert(JSON.stringify(newProps.navigation.state.params.dadosRota))

        let updateServe = false

        let id_moto = newProps.navigation.getParam('id', 'null')
        let turno_moto = newProps.navigation.getParam('turno', 'null')
        let veiculo_moto = newProps.navigation.getParam('veiculo', 'null')
        let rota_moto = newProps.navigation.getParam('rota', 'null')

        let busStops = newProps.navigation.getParam('busStops', 'null')

        if(id_moto != this.state.id_moto && id_moto != null){
            this.setState({ id_moto })
            updateServe = true
        }
        if(turno_moto != this.state.turno_moto && turno_moto != null){
            this.setState({ turno_moto })
            updateServe = true
        }
        if(veiculo_moto != this.state.veiculo_moto && veiculo_moto != null){
            this.setState({ veiculo_moto })
            updateServe = true
        }
        if(rota_moto != this.state.rota_moto && rota_moto != null){
            this.setState({ rota_moto })
            updateServe = true
        }
        if(updateServe){
            this.polyServe()
        }

        if(busStops != null){
            this.setState({busStops})
            this.setState({busStopsRoute: busStops})
            //console.log(busStops);
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


        this.polyServe()

        setInterval(this.getPolyWrongline.bind(this) , 10000);
        
    }

    //geoLocation function
    updateLocation(latitude, longitude) {
        // Update bus Icon

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
        //call the updateLocation function if bus to drive more than 13 meters

        const minDelta = 0.44/3600
        let latitude = position.nativeEvent.coordinate.latitude
        let longitude = position.nativeEvent.coordinate.longitude

        let detLat = Math.abs( this.state.region.latitude - latitude )
        let detLon = Math.abs( this.state.region.longitude - longitude )

        if (detLat > minDelta && detLon > minDelta){
            this.updateLocation(latitude, longitude)
        }
        
        //this.getPolyWrongline()
    }

    geoSuccess = (position) => {
        // constructor of GeoLocation, first location

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        this.updateLocation(latitude, longitude)
    }

    geoFailure = (err) => {
        this.setState({ error: err.message });
    }

    isWithin100m(a ,  b) {
        const R = 6371000
        let dy = (a.latitude - b.latitude) * R * Math.PI / 180.0;
    
        if (dy < -100 || dy > 100) return false;
    
        let dmid = 0.5 * (a.lat + b.lat) * Math.PI / 180.0;
        let dx = (a.lng - b.lng) * R * Math.PI / 180.0 / Math.cos(dmid);

        return dx*dx + dy*dy <= 10000.0;
    }

    // Polyline function
    async polyServe() {
        // get polyline route

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
        }
    }
    
    polyUpdate() {
        // delete the first point of polyline route

        let polyline = _.cloneDeep(this.state.polyBusRoute)
        polyline.shift()
        this.state.polyRouteRef.setNativeProps({ coordinates: Polyline })
        this.setState({ polyBusRoute })
    }

    async getPolyWrongline() {
        // Get Polyline if driver was not on route
        let busStopsRoute = this.state.busStopsRoute
        
        if(busStopsRoute.length == 0){
            return null
        }

        let bustop = busStopsRoute.pop() //busStopsRoute.shift()
        this.setState({busStopsRoute})

        let start = {
            longitude: this.state.region.longitude,
            latitude: this.state.region.latitude
        }
        
        let end = {
            longitude: bustop.longitude,
            latitude: bustop.latitude,
        }

        let link = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e' + 
        '&start=' + start.longitude + ',' + start.latitude + '&end=' + end.longitude + ',' + end.latitude;
        
        try {
            const data = await fetch(link);
            const dataJson = await data.json();
            //console.log(dataJson);
            dataArray = dataJson.features[0].geometry.coordinates
            
            
            let coords = dataArray.map((point, index) => {
                return {
                    latitude: point[1],
                    longitude: point[0]
                }
            })
            
            this.setState({ polyWrongRoute: coords });
            console.log("New route okay");
            //console.log(JSON.stringify(coords));

        }
        catch (error) {
            alert("Ops !! alguma coisa errada no getPolyWrongline")
            return console.log(error);
        }
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
                            strokeWidth={12}   
                        />
                    }

                    <UrlTile urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maximumZ={25}
                        zIndex={-3}
                    />

                    {this.state.busStops.map(marker => (
                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                                latitudeDelta: this.state.region.latitudeDelta,
                                longitudeDelta: this.state.region.longitudeDelta,
                            }}
                            title={marker.value}
                            key={marker.value}
                        >
                            <MaterialIcons 
                                name="person-pin-circle" 
                                size={styles.icon.height} 
                                color="#0279be" 
                            />
                        </Marker>
                    ))}

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