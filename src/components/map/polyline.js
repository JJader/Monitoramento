import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Polyline } from 'react-native-maps'

class polylineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polyline: [],
      polyEmpty: true,
      ref: '',
      color: ''
    };
  }

  componentDidMount() {
    let polyline = this.props.polyline
    let color = this.props.color
    try {
      this.updatePolyline(polyline)
      this.updateColor(color)
    }
    catch (error) {
    }
  }

  componentWillUpdate(newProps) {
    try {
      this.updatePolyline(newProps.polyline)
      this.updateColor(newProps.color)
    }
    catch (error) {
    }

  }

  updatePolyline(newPoly) {
    // trocar essa comparação com o id da polyline
    if (newPoly && newPoly[0] != this.state.polyline[0]) {
      this.setState({ polyline: newPoly })
    }
  }

  updateColor(color) {
    if (color && color != this.state.color) {
      this.setState({ color })
    }
  }

  updateRef = (ref) => {
    this.setState({ ref })
  }

  // deletPoly() {
  //   // delete the first point of polyline route

  //   let polyline = _.cloneDeep(this.state.polyBusRoute)
  //   polyline.shift()
  //   this.state.polyRouteRef.setNativeProps({ coordinates: Polyline })
  //   this.setState({ polyBusRoute })
  // }

  render() {
    return (
      !this.state.polyline && this.state.polyline.length == 0 ? null :
        < Polyline
          key={this.props.id}
          ref={this.updateRef}
          geodesic={true}
          coordinates={this.state.polyline}
          strokeColor={this.state.color ? this.state.color : "#72bcd4"}
          strokeWidth={15}
        />
    );
  }
}

export default polylineComponent;
