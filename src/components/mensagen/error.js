import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const error = ({ title }) => (

  <View style={styles.view}>

    <Text style={styles.cabecalhoText}>{title}</Text>

    <Image
      source={require('../../assets/work/errorSemFundo.png')}
      style={{ flex: 1, width: WINDOW_WIDTH*0.9 }}
      resizeMode="center"
    />
  </View>
);

export default error;

const styles = StyleSheet.create({
  view:{
    alignItems: 'center',
    flex: 1,
  },
  cabecalhoText: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});