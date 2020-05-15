import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class loadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  async onPress(parameter) {
    this.setState({ loading: true })
    await this.props.onPress(parameter)
    this.setState({ loading: false })
  }

  onLongPress() {
    alert(this.props.text)
  }

  noIsLoding() {
    return (
      <TouchableOpacity style={[this.props.style, styles.button]}
        onPress={() => this.onPress()}
        onLongPress={() => this.onLongPress()}
        delayLongPress={1000}
      >

        <MaterialIcons
          name={this.props.name}
          size={50}
          color={"white"}
        />

      </TouchableOpacity>
    )
  }

  isLoding() {
    return (
      <ActivityIndicator
        style={[this.props.style, styles.button]}
        size={50}
        color={"white"}
        animating={true}
      />
    )
  }

  render() {
    return (
      this.state.loading ?
        this.isLoding()
        :
        this.noIsLoding()
    );
  }
}

export default loadingButton;

const styles = StyleSheet.create({
  button: {
    flex: 1
  }
})