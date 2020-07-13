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
      if (busStopList) {
        this.updateBusStopList(busStopList)
      }
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

  updateBusStopList(busStopList){
    // trocar essa comparação com o id do busStopList
    if (busStopList.length != this.state.busStopList.length) {
      this.setState({ busStopList })
    }
  }

  renderBusStops(marker, index) {
    return (
      <Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: this.props.latitudeDelta,
          longitudeDelta: this.props.longitudeDelta,
        }}
        key={marker.id}
        description={marker.description}
        onPress={() => this.props.onPress(index,marker.id)}
      >

        {this.renderIconBusStops(marker.arrive)}

      </Marker>
    )
  }

  renderIconBusStops(arrived) {
    return (
      arrived ?
        <FontAwesome
          name= {this.props.icon ? this.props.icon : "map-marker"}
          size={40}
          color="#32CD32"
        />
        :
        <FontAwesome
          name= {this.props.icon ? this.props.icon : "map-marker"}//"nature-people" 
          size={40}
          color="#bc3422" //#72bcd4
        />
    )
  }

  render() {
    return (
      this.state.busStopList && this.state.busStopList.length > 0 ?
        this.state.busStopList.map((marker, index) => this.renderBusStops(marker, index))
        :
        null
    );
  }
}

export default busStopMarker;
