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
    };
  }

  componentDidMount() {
    let polyline = this.props.polyline
    try {
      this.updatePolyline(polyline)  
    } 
    catch (error) {
    }
  }

  componentWillUpdate(newProps) {

    try {
      this.updatePolyline(newProps.polyline)
    }
    catch (error) {
    }

  }

  updatePolyline = (newPoly) => {
    // trocar essa comparação com o id da polyline
    if (newPoly[0] != this.state.polyline[0]) {
      this.setState({ polyline: newPoly })
    }
  }

  updateRef = (ref) => {
    this.setState({ ref })
  }

  render() {
    return (
      !this.state.polyline && this.state.polyline.length == 0 ? null :
        < Polyline
          key={this.props.id}
          ref={this.updateRef}
          geodesic={true}
          coordinates={this.state.polyline}
          strokeColor={this.props.color ? this.props.color : "#72bcd4"}
          strokeWidth={12}
        />
    );
  }
}

export default polylineComponent;
