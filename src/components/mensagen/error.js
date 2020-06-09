import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TextInput } from 'react-native';

import stylesText from '../../styles/text';
import stylesContainer from '../../styles/Modal';
import Header from '../header/navigationMenu'

const WINDOW_WIDTH = Dimensions.get('window').width;

const error = ({ title }) => (

  <View style={{ flex: 1 }}>
    <Image
      source={require('../../assets/work/error.png')}
      style={{ flex: 1, width: WINDOW_WIDTH }}
      resizeMode="cover"
    />
  </View>
);

export default error;