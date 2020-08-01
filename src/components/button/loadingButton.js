import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

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

  componentWillUpdate(newProps) {

    try {
      this.updateLoading(newProps.loading)
    }
    catch (error) {

    }

  }

  updateLoading(loading) {
    if (loading != this.state.loading) {
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
      >

        <Text style={styles.text}>
          {this.props.text}
        </Text>

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
      <View style = {[this.props.style, {flex: 1}]}>
        {
          this.state.loading ?
            this.isLoding()
            :
            this.noIsLoding()
        }
      </View>
    );
  }
}

export default loadingButton;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    flex: 1
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },

});