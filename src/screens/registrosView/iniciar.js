import React from 'react';
import { StyleSheet, Platform, Dimensions, Text, View, Image, Button } from 'react-native';

import MapView, { Marker, Polyline, MarkerAnimated, UrlTile, MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'

const busIcon = require('../../assets/logo/busMap.png');

import _ from "lodash";

import stylesContainer from '../../styles/Modal';

import Header from '../../components/navigationMenu'

const { width, height } = Dimensions.get('window');

import * as Permissions from 'expo-permissions'

import TileComponent from '../../components/map/urlTile';
import PolylineComponent from '../../components/map/polyline'
import BusStopMarker from '../../components/map/busStopMarker'
import UserMarker from '../../components/map/marker'

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const minDistanceForReDPoly = 100

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

      polyBusRoute: [],
    

      polyWrongRoute: [],
      polyWrongRef: {},
      polyToNextBusStop: [],
      busStops: [
        //latitude: '',
        //longitude: '',
        //value: '',
        // arrive : false
      ],

      lastBus: null,
      lastBusNumber: 0,
      nextBusStop: 0,

      color : 'red',

      ready: false,

      userLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      error: null,

      timeOut: false,

      id: 1,
      token: ''
    }
  }

  async componentDidMount() {
    let permission = await this.getUserPermissionLocation();

    if (permission) {
      this.startMap()
      this.startUser(this.props)
      
    } else {
      this.geoFailure('Location permission not granted');
    }
  }

  async getUserPermissionLocation() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      return true;
    }
    else {
      return false;
    }
  }

  startMap() {
    navigator.geolocation.watchPosition(
      this.geoSuccess,
      this.geoFailure,
      {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );

    setInterval(this.getPolyToNextBusStop.bind(this), 10000);
  }

  geoFailure = (err) => {
    this.setState({ error: err.message });
  }

  geoSuccess = (position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    let userLocation = _.cloneDeep(this.state.userLocation)
    userLocation.latitude = latitude
    userLocation.longitude = longitude

    this.setState({ ready: true })
    this.setState({ userLocation })
  }

  async getPolyToNextBusStop() {
    
    let isRead = this.state.busStops.length
    
    if (isRead) {

      let APIpoly = await this.sendStartEndPointToServe()

      if (!APIpoly.error) {
        let polyToNextBusStop = this.formatAPIPolyResponse(APIpoly.coordinates)
        this.setState({ polyToNextBusStop })
        this.updateColor(APIpoly.distance)
      }
      else {
        alert(APIpoly.error)
      }

    }
  }

  async sendStartEndPointToServe() {
    let nextStop = await this.returnNextStop()

    if (!nextStop.error) {
      let start = {
        longitude: this.state.userLocation.longitude,
        latitude: this.state.userLocation.latitude
      }

      let end = {
        longitude: nextStop.longitude,
        latitude: nextStop.latitude,
      }

      return await this.callPolyToNextStopServer(start, end)
    }
    else {
      return nextStop
    }
  }

  async returnNextStop() {
    let nextBusStop = this.state.nextBusStop
    let busStops = this.state.busStops

    if (busStops.length > nextBusStop) {
      return busStops[nextBusStop]
    }
    else {
      return responseJson = {
        error: "There is not next stop"
      }
    }
  }

  async callPolyToNextStopServer(start, end) {
    let responseJson = {}

    try {
      responseJson = await this.getpolyAPI(start, end)
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async getpolyAPI(start, end) {

    const link = 'https://api.openrouteservice.org/v2/directions/driving-car?' +
      'api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e' +
      '&start=' + start.longitude + ',' + start.latitude +
      '&end=' + end.longitude + ',' + end.latitude;

    const response = await fetch(link);
    const responseJson = await response.json();
    
    let polyFormat = {
      distance : responseJson.features[0].properties.segments[0].distance,
      duration: responseJson.features[0].properties.segments[0].duration,
      coordinates: responseJson.features[0].geometry.coordinates,
    }

    return polyFormat
  }

  formatAPIPolyResponse(dataArray) {
    let coords = dataArray.map((point, index) => {
      return {
        latitude: point[1],
        longitude: point[0]
      }
    })

    return coords
  }

  updateColor(distance){
    if (distance > minDistanceForReDPoly){
      this.setState({color : 'red'})
    }
    else{
      this.setState({color : "#72bcd4"})
    }
  }

  componentWillUpdate(newProps) {
    if (!this.state.id || !this.state.token) {
      this.startUser(newProps)
    }
  }

  startUser(newProps) {
    let id = newProps.navigation.getParam('id', 1)
    let token = newProps.navigation.getParam('token', null)

    if (id != this.state.id) {
      this.setState({ id })
    }
    if (token != this.state.token) {
      this.setState({ token })
    }
  }

  componentWillReceiveProps(newProps) {
    let busStops = newProps.navigation.getParam('busStops', null)
    let finishedBusStop = newProps.navigation.getParam('index', null)

    if (busStops != null) {
      this.setState({ busStops })
    }

    if (finishedBusStop != null) {

      this.arriveAtBusStop(finishedBusStop)
      this.updateNextBusStop(finishedBusStop + 1)

    }
  }

  arriveAtBusStop(index) {
    try {
      this.changeBusStopsArrive(index)
    }
    catch (error) {
    }
  }

  changeBusStopsArrive(index) {
    let busStops = this.state.busStops

    busStops[index].arrive = true
    this.setState({ busStops })
  }

  updateNextBusStop(nextBusStop) {
    this.setState({ nextBusStop })
  }

  async polyServe() {
    // get polyline route

    let link = URL_API + '/polyline/' + this.state.id
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

  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
  }

  onUserLocationChange = (position) => {
    try {
      this.updateUserLocation(position)
    }
    catch (error) {
    }
  }

  updateUserLocation(position){
    let userLocation = _.cloneDeep(this.state.userLocation)

    let newlat = position.nativeEvent.coordinate.latitude
    let newlon = position.nativeEvent.coordinate.longitude

    userLocation.latitude = newlat
    userLocation.longitude = newlon
    this.setState({ userLocation })
  }

  showMap() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Mapa" navigationProps={this.props.navigation.toggleDrawer} />

        <MapView
          style={stylesContainer.conteiner}
          region={this.state.userLocation}
          provider={null}
          mapType={this.mapType}
          onUserLocationChange={this.onUserLocationChange}
          showsUserLocation={true}
        >

          <TileComponent />

          <PolylineComponent
            id={'rightPoly'}
            polyline={this.state.polyBusRoute}
          />

          <PolylineComponent
            id={'wrongPoly'}
            polyline={this.state.polyToNextBusStop}
            color={this.state.color}
          />

          <BusStopMarker
            busStopList={this.state.busStops}
            latitudeDelta={LATITUDE_DELTA}
            longitudeDelta={LONGITUDE_DELTA}
          />

          <UserMarker
            location={this.state.userLocation}
            urlImag={busIcon}
            title={"My location"}
            description={''}
          />

        </MapView>
      </View>
    )
  }

  render() {
    return (
      this.state.ready ? this.showMap() : <Text>{this.state.error}</Text>
    );
  }
}