import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import stylesContainer from '../../styles/Modal'
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

  onLongPress(){
    alert(this.props.text)
  }

  componentWillUpdate(newProps) {

    try {
      this.updateLoading(newProps.loading)
    }
    catch (error) {

    }

  }

  updateLoading = (loading) => {
    if (loading && loading != this.state.loading) {
      this.setState({ loading })
    }
  }

  noIsLoding() {
    return (
      <TouchableOpacity style={styles.button}
        onPress={() => {
          this.onPress();
          this.updateLoading(true)
        }}
        onLongPress = {()=> this.onLongPress()}
        delayLongPress = {1000}
      >

        <MaterialIcons
          name= {this.props.name}
          size={50}
          color={"white"}
        />

      </TouchableOpacity>
    )
  }

  isLoding() {
    return (
      <ActivityIndicator style={styles.button} size="large" color="blue" animating={true} />
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

});