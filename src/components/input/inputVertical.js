import React, { Component } from 'react';
import { View, Text , TextInput, StyleSheet} from 'react-native';

import stylesText from '../../styles/text';
import stylesContainer from '../../styles/Modal'

class input extends Component {
  constructor(props) {
    super(props);
    this.state = {
        parameter : ''
    };
  }

  updateParameter = (parameter) => {
    this.setState({parameter})
    this.props.updateParameter(parameter)
  }

  render() {
    return (
      <View style = {{flex: 1}}>
        <Text style={[stylesText.text, styles.text]}> {this.props.text} </Text>
            <TextInput
              style={styles.TextInput}
              value={this.state.parameter}
              onChangeText={this.updateParameter}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry = {this.props.secureText}
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

    TextInput: {
      flex: 1,
      borderColor: stylesContainer.background.backgroundColor ,
      borderWidth: 3,
      marginRight: '40%',
      borderRadius: 10,
    },
})