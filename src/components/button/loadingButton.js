import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import stylesContainer from '../../styles/Modal'

class loadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onPress(parameter) {
    this.props.onPress(parameter)
  }

  componentWillUpdate(newProps) {

    if (newProps.loading != this.state.loading) {
      this.updateLoading(newProps.loading)
    }
  }

  updateLoading = (loading) => {
    this.setState({ loading })
  }

  noIsLoding() {
    return (
      <TouchableOpacity onPress={() => { this.onPress(); this.updateLoading(true) }}>

        <View style={styles.button}>
          <Text style={styles.text}>
            {this.props.text}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }

  isLoding() {
    return (
      <ActivityIndicator size="large" color="blue" animating={true} />
    )
  }

  render() {
    return (
      <View>
        {this.state.loading ?
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
    padding: 10,
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 10,
    minHeight: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row'
  },

});