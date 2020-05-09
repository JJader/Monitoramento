import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { MarkerAnimated } from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons';

class marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: new MapView.AnimatedRegion ({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    };
  }

  componentDidMount() {
    let location = this.props.location
    try {
      this.updateLocation(location)
    }
    catch (error) {
    }
  }

  componentWillUpdate(newProps) {
    try {
      this.updateLocation(newProps.location)
    }
    catch (error) {
    }
  }

  updateLocation(newLocation) {
    let location = this.state.location

    if (newLocation.longitude != location.longitude &&
      newLocation.latitude != location.latitude) {

        this.state.location.timing(newLocation, 500).start();

    }
  }

  renderIcon(urlImag) {
    return (
      urlImag ?
        <Image
          style={styles.icon}
          source={urlImag}
        />
        :
        <FontAwesome
          name="map-marker"
          size={styles.icon.height}
          color={"red"}
        />
    )
  }

  render() {
    return (
      <MapView.Marker.Animated
        coordinate={this.state.location}
        title={this.props.title}
        description={this.props.description}
        ref={marker => { this.marker = marker; }}
      >
        {this.renderIcon(this.props.urlImag)}
      </MapView.Marker.Animated>
    );
  }
}

export default marker;

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    zIndex: 3
  }
})