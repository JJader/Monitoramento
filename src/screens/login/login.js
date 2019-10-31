import React, { Component } from 'react';
import { View, Text, TextInput, Image, Dimensions , StyleSheet, KeyboardAvoidingView} from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';


const WINDOW_WIDTH = Dimensions.get('window').width;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style = {[stylesContainer.background, styles.background]} behavior= "padding" enabled>

        <View
          style={styles.cabecalho}
        >
          <Text style = {styles.cabecalhoText}>Login</Text>
          <Image
            source={require('../../assets/logo/logo.png')}
            style={{ flex: 1 }}
            resizeMode="center"

          />
        </View>

        <View style = {styles.infomacoes}>
          <Text style = {[stylesText.text, styles.text]}> Usuário : </Text>
          <TextInput style = {styles.textInput}/>
          <Text style = {[stylesText.text, styles.text]}> Senha : </Text>
          <TextInput style = {styles.textInput}/>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default login;

const styles = StyleSheet.create({
  cabecalho:{
    marginTop: 30,
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 2
  },
  background:{
    flex: 1,
    borderTopLeftRadius: 110,
    borderBottomRightRadius: 110,
  },
  cabecalhoText:{
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white',
  },
  infomacoes:{
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  text:{
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    minHeight: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  }
});