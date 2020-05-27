import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';

import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'

import _ from "lodash";

import * as Permissions from 'expo-permissions'

import stylesContainer from '../../styles/Modal';
const busIcon = require('../../assets/logo/busMap.png');

import Header from '../../components/header/navigationMenu'
import TileComponent from '../../components/map/urlTile';
import PolylineComponent from '../../components/map/polyline'
import BusStopMarker from '../../components/map/busStopMarker'
import UserMarker from '../../components/map/marker'
import IconButton from '../../components/button/iconButton'

import busStopAPI from '../../api/busStop/getBusStop'
import openRouteAPI from '../../api/polyline/openRoute'
import polyRouteAPI from '../../api/polyline/polyRoute'
import userLocationAPI from '../../api/monitoramento/userLocation'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const minDistanceForReDPoly = 100
const distanceForStayOnPoint = 60

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
      token: globalThis.token,
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
    }
    else {
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
        this.setState({ polyToNextBusStop: APIpoly.coordinates })
        this.updateColor(APIpoly.distance)
        this.updateNextPolyPoint(APIpoly.distance)
      }
    }
    else {
      //await this.updateBuStops()
      await this.updatePolyRoute()
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

      return await openRouteAPI.polyToNextPoint(start, end)
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

  updateColor(distance) {
    if (distance > minDistanceForReDPoly) {
      this.setState({ polycolor: 'red' })
    }
    else {
      this.setState({ polycolor: stylesContainer.background.backgroundColor })
    }
  }

  updateNextPolyPoint(distance) {
    if (distance <= distanceForStayOnPoint) {
      let nextPolyPoint = this.state.nextPolyPoint
      this.setState({ nextPolyPoint: nextPolyPoint + 1 })
    }
  }

  async updateBuStops() {
    const busStops = await busStopAPI.BusStopsToMap();

    if (!busStops.error) {
      this.setState({ busStops })
    }
    else {
      console.log("Erro no updateBusStops");
    }
  }

  async updatePolyRoute() {
    let id = this.state.id
    let polyRoute = await polyRouteAPI.polyRoute(id)

    if (!polyRoute.error) {
      this.setState({ polyRoute })
    }
    else {
      console.log("Erro no updatePolyRoute");
    }
  }

  componentWillUpdate(newProps) {
    if (!this.state.id) {
      this.startUser(newProps)
    }
  }

  startUser(newProps) {
    let id = newProps.navigation.getParam('id', 1)

    if (id != this.state.id) {
      this.setState({ id })
    }
  }

  componentWillReceiveProps(newProps) {
    let indexBusWithStudent = newProps.navigation.getParam('index', null)
    
    if (indexBusWithStudent != null) {

      this.arriveAtBusStop(indexBusWithStudent)
      this.updateNextBusStop(indexBusWithStudent + 1)

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

  async onUserLocationChange(position) {
    try {
      await this.updateUserLocation(position)
    }
    catch (error) {
      console.log("Erro no userLocationChange");
    }
  }

  async updateUserLocation(position) {
    let userLocation = _.cloneDeep(this.state.userLocation)

    let newlat = position.nativeEvent.coordinate.latitude
    let newlon = position.nativeEvent.coordinate.longitude

    userLocation.latitude = newlat
    userLocation.longitude = newlon

    await userLocationAPI.updateLocation(newlat, newlon)
    // precisa criar uma função que armazene as informações offline
    this.setState({ userLocation })
    
  }

  centerRegion() {
    let region = _.cloneDeep(this.state.userLocation)
    this.map.animateToRegion(region, 1000 * 2)
  }

  updateRegion(region) {
    this.setState({ region })
  }

  changeScreen(index) {
    this.props.navigation.navigate('RegistraE',{index})
  }

  showMap() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Mapa" navigationProps={this.props.navigation.toggleDrawer} />

        <MapView
          ref={ref => { this.map = ref; }}
          style={stylesContainer.conteiner}
          //region={this.state.userLocation}
          onRegionChangeComplete={(region) => this.updateRegion(region)}
          //onUserLocationChange={(position) => this.onUserLocationChange(position)}
          onPress={(position) => this.onUserLocationChange(position)}
          provider={null}
          mapType={this.mapType}
          showsUserLocation={true}
          followsUserLocation={true}
          onMapReady={() => this.centerRegion()}
        >

          <TileComponent />

          <PolylineComponent
            id={'wrongPoly'}
            polyline={this.state.polyToNextBusStop}
            color={this.state.polycolor}
          />

          <BusStopMarker
            busStopList={this.state.busStops}
            latitudeDelta={LATITUDE_DELTA}
            longitudeDelta={LONGITUDE_DELTA}
            onPress={(index) => this.changeScreen(index)}
          />

          <UserMarker
            location={this.state.userLocation}
            urlImag={busIcon}
            title={"My location"}
            description={''}
          />

        </MapView>

        <IconButton
          style={styles.buttonUpdatePoly}
          onPress={ async () => {
            await this.updatePolyRoute()
            //await this.updateBuStops()
          }}
          name={"update"}
          text={"Update polyline"}
        />

        <IconButton
          style={styles.buttonCenterRegion}
          onPress={() => this.centerRegion()}
          name={"center-focus-weak"}
          text={"Center user location"}
        />
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

  buttonCenterRegion: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: '10%',
    right: '0%',
    minHeight: 20,
  }
})
