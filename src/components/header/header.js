import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import stylesContainer from '../../styles/Modal'

const header = ({ title }) => (
    
  <View style={styles.view}>
  <Text style = {styles.text}>
    {title}
  </Text>
</View>
);

export default header;

const styles = StyleSheet.create({
    view: {
      width: "100%",
      flexDirection: 'row', 
      backgroundColor: stylesContainer.background.backgroundColor, 
      paddingTop: 20
    },

    text: {
      flex: 1, 
      color:'white', 
      fontSize:20,
      fontWeight: 'bold',
      textAlign:"center"
    },
});
