import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const logoHeader = ({ text, img }) => (
  <View style={styles.cabecalho}>
    {text ?
      <Text style={styles.cabecalhoText}>{text}</Text>
      :
      null
    }
    <Image
      source={img}
      style={{ flex: 1 }}
      resizeMode="center"
    />
  </View>
);

export default logoHeader;

const styles = StyleSheet.create({
  cabecalho: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  cabecalhoText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white',
  },
});
