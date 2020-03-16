import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import stylesText from '../styles/text';
import stylesComponets from '../styles/componets';
import stylesContainer from '../styles/Modal';
import Header from '../components/navigationMenu'

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class start extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {stylesContainer.background} >
      <Header title = "Bem vindo" navigationProps={this.props.navigation.toggleDrawer}/>
        <View style = {{flex: 1}}>
          <Image
                source={require('../assets/logo/splash.png')}
                style={{ flex: 1 , width: WINDOW_WIDTH}}
                resizeMode="cover"
          />
        </View>
      </View>
    );
  }
}
