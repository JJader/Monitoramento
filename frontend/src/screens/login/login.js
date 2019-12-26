import React, { Component } from 'react';
import { View, Text, TextInput, Image, Dimensions, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';


const WINDOW_WIDTH = Dimensions.get('window').width;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : "",
      password : "",
    };
  }

  userChange = (user) => {
    this.setState({ user })
  };
  passwordChange = (password) => {
    this.setState({ password })
  };

  render() {
    return (
      <KeyboardAvoidingView style={[stylesContainer.background, styles.background]} behavior="padding" enabled>

        <View
          style={styles.cabecalho}
        >
          <Image
            source={require('../../assets/logo/logo.png')}
            resizeMode="center"
            style = {{width : WINDOW_WIDTH - 30}}
          />
          {//<Text style={styles.cabecalhoText}>ambev</Text>
          }
        </View>

        <View style={styles.inputConteiner}>
          <TextInput
            style = {stylesComponets.viewInput}
            placeholder="Usuário"
            value={this.state.user}
            onChangeText={this.userChange}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style = {stylesComponets.viewInput}
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.passwordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          </View>

          <View style={styles.botaoConteiner}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('RegistraR')}>
            <View style={stylesComponets.botao}>
              <Text style={stylesText.cabecalho}>
                Entrar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert("Pagina de modificar senha")}>
            <View style={stylesComponets.botao}>
              <Text style={styles.esqueciText}>
                Esqueci minha senha
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

export default login;

const styles = StyleSheet.create({
  cabecalho: {
    marginTop: 30,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  },
  background: {
    flex: 1,
  },
  esqueciText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#B8B8B8',
  },
  inputConteiner: {
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 2,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  botaoConteiner:{
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});