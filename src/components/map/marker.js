import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { MarkerAnimated } from 'react-native-maps'
import { FontAwesome } from '@expo/vector-icons';

class marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      }
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

      this.setState({ location: newLocation })

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
      <MarkerAnimated
        coordinate={this.state.location}
        title={this.props.title}
        description={this.props.description}
      >
        {this.renderIcon(this.props.urlImag)}
      </MarkerAnimated>
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