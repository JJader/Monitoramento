import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import stylesText from '../../styles/text';


class input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parameter: ''
    };
  }

  updateParameter = (parameter) => {
    this.setState({ parameter })
    this.props.updateParameter(parameter)
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={[stylesText.text, styles.text]}> {this.props.text} </Text>
        <TextInput
          style={styles.textInput}
          value={this.state.parameter}
          onChangeText={this.updateParameter}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={this.props.secureText}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export default input;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  textInput: {
    minHeight: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
  }

})