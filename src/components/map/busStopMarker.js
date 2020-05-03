import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps'

import { FontAwesome } from '@expo/vector-icons';

class busStopMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busStopList: []
    };
  }

  componentDidMount() {
    let busStopList = this.props.busStopList
    try {
      this.updateBusStopList(busStopList)
    }
    catch (error) {
    }
  }

  componentWillUpdate(newProps) {
    try {
      this.updateBusStopList(newProps.busStopList)
    }
    catch (error) {
    }
  }

  updateBusStopList = (busStopList) => {
    // trocar essa comparação com o id do busStopList
    if (busStopList[0] != this.state.busStopList[0]) {
      this.setState({ busStopList })

    }
  }

  renderBusStops(marker) {
    return (
      <Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta,
        }}
        title={marker.value}
        key={marker.value}
      >

        {this.renderIconBusStops(marker.arrive)}

      </Marker>
    )
  }

  renderIconBusStops(arrived) {
    return (
      arrived ?
        <FontAwesome
          name="map-marker"
          size={40}
          color="#32CD32"
        />
        :
        <FontAwesome
          name="map-marker"//"nature-people" 
          size={40}
          color="#bc3422" //#72bcd4
        />
    )
  }

  render() {
    return (
      this.state.busStopList && this.state.busStopList.length > 0 ?
        this.state.busStopList.map(marker => this.renderBusStops(marker))
        :
        null
    );
  }
}

export default busStopMarker;
