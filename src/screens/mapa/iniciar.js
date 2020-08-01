import React from 'react';
import { Dimensions, Text, View, StyleSheet, Image } from 'react-native';

import MapView, { MAP_TYPES, PROVIDER_DEFAULT } from 'react-native-maps'
import { withNavigationFocus } from 'react-navigation'

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
import ErrorComponent from '../../components/mensagen/error'

import busStopAPI from '../../api/busStop/getBusStop'
import stopAPI from '../../api/busStop/getStop'
import queueLocation from '../../api/offline/queueMonitoring'
import dadosUserStore from '../../api/offline/dadosUser'
import polyClass from '../../api/polyline/PolyClass'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const queueMonitoring = new queueLocation();
const polyRoute = new polyClass();

class App extends React.Component {
  constructor() {
    super();
    this.state = {

      busStops: [
        //latitude: '',
        //longitude: '',
        //value: '',
        // arrive : false
      ],

      polyline: [],
      polyColor: 'red',

      stops: [

      ],

      id: 1,
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

      setIntervalID: [],
      isWork: false,
      isFocused: false
    }
  }

  async componentWillUpdate(param) {
    if (param.isFocused != this.state.isFocused) {

      if (param.isFocused) {
        await this.updateWork()
        this.updateIntervalId(this.state.isWork)
      }
      else {
        this.updateIntervalId(param.isFocused)
      }

      this.setState({ isFocused: param.isFocused })
    }
  }

  updateIntervalId(isFocused) {
    var setIntervalID = this.state.setIntervalID


    if (setIntervalID.length == 0 && isFocused) {

      setIntervalID.push(setInterval(
        this.getPolyToNextPoint.bind(this),
        2000
      ))

      setIntervalID.push(setInterval(
        this.monitoringFunction.bind(this),
        2000
      ))
      
      this.setState({ setIntervalID })
    }

    if (!isFocused) {

      while (setIntervalID.length) {
        clearInterval(setIntervalID.pop())
      }
      this.setState({ setIntervalID: [] })
    }
  }

  async componentDidMount() {
    let permission = await this.getUserPermissionLocation();

    if (permission) {
      this.startMap()
      await this.updateWork()
      this.updateIntervalId(this.state.isWork)
    }
    else {
      this.geoFailure('Location permission not granted');
    }
  }

  async updateWork() {
    let dadosUser = await dadosUserStore.get()

    if (!dadosUser.error) {
      if (dadosUser.controleDeTurno == 'TS') {
        this.setState({ isWork: true })

      }
      else {
        this.setState({ isWork: false })
      }
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

    if (polyRoute.isReady) {

      await polyRoute.UpdatePolyline(this.state.userLocation)

      this.setState({
        polyline: polyRoute.polyline,
        polyColor: polyRoute.color
      })

    }
    else {
      await this.updateBuStops()
      await this.updateStops()
      await polyRoute.startPolyline()
    }
  }

  async monitoringFunction() {
    var userLocation = this.state.userLocation

    await queueMonitoring.enqueue(
      userLocation.latitude,
      userLocation.longitude
    )
  }

  async updateBuStops() {
    const busStops = await busStopAPI.BusStopsToMap();

    if (!busStops.error) {
      this.setState({ busStops })
    }
    else {
      console.log(busStops.error);
    }
  }

  async updateStops() {
    const stops = await stopAPI.getStops();

    if (!stops.error) {
      this.setState({ stops })
    }
    else {
      console.log(stops.error);
    }
  }

  componentWillReceiveProps(newProps) {
    let indexBusWithStudent = newProps.navigation.getParam('busStop', null)
    let indexStopArrive = newProps.navigation.getParam('stop', null)
    let isWork = newProps.navigation.getParam('isWork', null)

    if (indexBusWithStudent != null) {
      this.arriveAtBusStop(indexBusWithStudent)
    }

    if (indexStopArrive != null) {
      this.arriveAtStop(indexBusWithStudent)
    }

    if (isWork != null) {
      this.setState({ isWork })
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

  arriveAtStop(index) {
    try {
      this.changeStopsArrive(index)
    }
    catch (error) {
    }
  }

  changeStopsArrive(index) {
    let stops = this.state.stops

    stops[index].arrive = true
    this.setState({ stops })
  }

  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
  }

  async onUserLocationChange(position) {
    try {
      await this.updateUserLocation(position)
    }
    catch (error) {
      console.log("Error on userLocationChange");
    }
  }

  async updateUserLocation(position) {
    let userLocation = _.cloneDeep(this.state.userLocation)

    let newlat = position.nativeEvent.coordinate.latitude
    let newlon = position.nativeEvent.coordinate.longitude

    userLocation.latitude = newlat
    userLocation.longitude = newlon
    this.setState({ userLocation })

  }

  centerRegion() {
    let region = _.cloneDeep(this.state.userLocation)
    this.map.animateToRegion(region, 1000 * 2)
  }

  updateRegion(region) {
    this.setState({ region })
  }

  embarcarScreen(index, id) {
    this.props.navigation.navigate('RegistraE', { index, id })
  }

  desembarcarScreen(index, id) {
    this.props.navigation.navigate('Desembarque', { index, id })
  }

  showMap() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={stylesContainer.conteiner}
          //region={this.state.region}
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
            id={'PolyRoute'}
            polyline={this.state.polyline}
            color={this.state.polyColor}
          />

          <BusStopMarker
            busStopList={this.state.busStops}
            latitudeDelta={LATITUDE_DELTA}
            longitudeDelta={LONGITUDE_DELTA}
            onPress={(index, id) => this.embarcarScreen(index, id)}
          />

          <BusStopMarker
            busStopList={this.state.stops}
            latitudeDelta={LATITUDE_DELTA}
            longitudeDelta={LONGITUDE_DELTA}
            onPress={(index, id) => this.desembarcarScreen(index, id)}
            icon={"building"}
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
          onPress={async () => {
            await polyRoute.startPolyline()
            await this.updateBuStops()
            await this.updateStops()
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

  showError() {
    return (
      <View style={stylesContainer.conteiner}>
        <ErrorComponent title={"This screen is not available"} />
      </View>
    )
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Mapa" navigationProps={this.props.navigation.toggleDrawer} />
        {this.state.ready && this.state.isWork ?
          this.showMap() :
          this.showError()
        }
      </View>
    );
  }
}

export default withNavigationFocus(App)

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
    top: '0%',
    right: '0%',
    minHeight: 20,
  },
})
