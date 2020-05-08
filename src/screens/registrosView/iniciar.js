import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';

import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'

import _ from "lodash";

import * as Permissions from 'expo-permissions'

import stylesContainer from '../../styles/Modal';
const busIcon = require('../../assets/logo/busMap.png');

import Header from '../../components/navigationMenu'
import TileComponent from '../../components/map/urlTile';
import PolylineComponent from '../../components/map/polyline'
import BusStopMarker from '../../components/map/busStopMarker'
import UserMarker from '../../components/map/marker'
import IconButton from '../../components/button/iconButton'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const minDistanceForReDPoly = 100
const distanceForStayOnPoint = 80

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

      polyRoute: [],
      polyToNextBusStop: [],
      polycolor: 'red',

      busStops: [
        //latitude: '',
        //longitude: '',
        //value: '',
        // arrive : false
      ],

      nextPolyPoint: 0,

      id: 1,
      token: '',
      userLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      ready: false,
      error: null,
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

    setInterval(this.getPolyToNextPoint.bind(this), 2000);
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

  async getPolyToNextPoint() {

    let isRead = this.state.polyRoute.length

    if (isRead) {

      let APIpoly = await this.sendStartEndPointToServe()

      if (!APIpoly.error) {
        let polyToNextBusStop = this.formatAPIPolyResponse(APIpoly.coordinates)
        this.setState({ polyToNextBusStop })
        this.updateColor(APIpoly.distance)
        this.updateNextPolyPoint(APIpoly.distance)

        console.log("distance: " + APIpoly.distance);
      }
    }
  }

  async sendStartEndPointToServe() {
    let nextPoint = await this.returnNextPoint()

    if (!nextPoint.error) {
      let start = {
        longitude: this.state.userLocation.longitude,
        latitude: this.state.userLocation.latitude
      }

      let end = {
        longitude: nextPoint.longitude,
        latitude: nextPoint.latitude,
      }

      return await this.callPolyToNextPointServer(start, end)
    }
    else {
      return nextPoint
    }
  }

  async returnNextPoint() {
    let nextPoint = this.state.nextPolyPoint
    let polyRoute = this.state.polyRoute

    if (polyRoute.length > nextPoint) {
      return polyRoute[nextPoint]
    }
    else {
      return polyRoute[polyRoute.length - 1]
    }
  }

  async callPolyToNextPointServer(start, end) {
    let responseJson = {}

    try {
      responseJson = await this.callpolyAPI(start, end)
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async callpolyAPI(start, end) {

    const link = 'https://api.openrouteservice.org/v2/directions/driving-car?' +
      'api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e' +
      '&start=' + start.longitude + ',' + start.latitude +
      '&end=' + end.longitude + ',' + end.latitude;

    const response = await fetch(link);
    const responseJson = await response.json();

    let polyFormat = {
      distance: responseJson.features[0].properties.segments[0].distance,
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

  updateColor(distance) {
    if (distance > minDistanceForReDPoly) {
      this.setState({ polycolor: 'red' })
    }
    else {
      this.setState({ polycolor: "#6E88E0" })
    }
  }

  updateNextPolyPoint(distance){
    if (distance <= distanceForStayOnPoint) {
      let nextPolyPoint = this.state.nextPolyPoint
      this.setState({nextPolyPoint: nextPolyPoint + 1})
    }
  }

  async getPolyRoute() {
    let serverPoly = await this.callPolyRouteServer()

    if (!serverPoly.error) {
      let polyRoute = this.formatServerPolyResponse(serverPoly)
      this.setState({ polyRoute })
    }
    else {
      alert(APIpoly.error)
    }
  }

  async callPolyRouteServer() {
    let responseJson = {}

    try {
      responseJson = await this.callPolyRoute()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async callPolyRoute() {
    let link = URL_API + '/polyline/' + this.state.id

    const response = await fetch(link);
    const responseJson = await response.json();

    return responseJson

  }

  formatServerPolyResponse(dataArray) {
    let coords = dataArray.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })

    return coords
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

  updateUserLocation(position) {
    let userLocation = _.cloneDeep(this.state.userLocation)

    let newlat = position.nativeEvent.coordinate.latitude
    let newlon = position.nativeEvent.coordinate.longitude

    userLocation.latitude = newlat
    userLocation.longitude = newlon
    this.setState({ userLocation })
  }

  centerRegion() {
    let region = _.cloneDeep(this.state.userLocation)
    this.setState({ region })
  }

  updateRegion(region) {
    this.setState({region})
  }

  showMap() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Mapa" navigationProps={this.props.navigation.toggleDrawer} />

        <MapView
          style={stylesContainer.conteiner}
          initialRegion={this.state.userLocation}
          region={this.state.userLocation}
          //onRegionChangeComplete={(region) => this.updateRegion(region)}
          //onUserLocationChange={this.onUserLocationChange}
          provider={null}
          mapType={this.mapType}
          onPress={this.onUserLocationChange}
          showsUserLocation={true}
          followsUserLocation={true}
          onMapReady={() => this.centerRegion()}
        >

          <TileComponent />

          <PolylineComponent
            id={'rightPoly'}
            polyline={this.state.polyRoute}
          />

          <PolylineComponent
            id={'wrongPoly'}
            polyline={this.state.polyToNextBusStop}
            color={this.state.polycolor}
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

        <View style={styles.buttonUpdatePoly}>
          <IconButton
            onPress={() => this.getPolyRoute()}
            name={"update"}
            text={"Update polyline"}
          />
        </View>

        <View style={styles.buttonUpdateRegion}>
          <IconButton
            onPress={() => this.centerRegion()}
            name={"center-focus-weak"}
            text={"Update polyline"}
          />
        </View>

      </View>
    )
  }

  render() {
    return (
      this.state.ready ? this.showMap() : <Text>{this.state.error}</Text>
    );
  }
}

const styles = StyleSheet.create({
  buttonUpdatePoly: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: '90%',
    right: '40%',
    backgroundColor: stylesContainer.background.backgroundColor,
    minHeight: 20,
    borderRadius: 60,
  },

  buttonUpdateRegion: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: '10%',
    right: '0%',
    //backgroundColor: stylesContainer.background.backgroundColor,
    minHeight: 20,
  }
})