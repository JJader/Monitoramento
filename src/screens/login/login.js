import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import stylesContainer from '../../styles/Modal'

import LoadingButton from '../../components/button/loadingButton'
import Header from '../../components/header/logoHeader'
import Input from '../../components/input/inputHorizontal'

import _ from "lodash";

const WINDOW_WIDTH = Dimensions.get('window').width;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',

      id: '',
      name: '',

      loading: false
    };
  }

  updateUser = (user) => {
    this.setState({ user })
  };

  updatePassword = (password) => {
    this.setState({ password })
  };

  async buttonEnterEvent() {
    let userDate = await this.callLoginServe()

    if (!userDate.error) {
      this.callNewScreen(userDate)

    } else {
      alert(userDate.error)
      this.setState({ loading: false })
    }
  }

  async callLoginServe() {
    let responseJson = {}

    try {
      responseJson = await this.sendUserPassToServer()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async sendUserPassToServer() {
    let link = URL_API + 'user/login'

    const dados = {
      email: this.state.user,
      pass: this.state.password,
    };

    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    let responseJson = await response.json();
    return responseJson
  }

  callNewScreen(userDate) {
    this.props.navigation.navigate('RegistraR', {
      id: userDate.id,
      token: userDate.token,
      name: userDate.name,
    })

    this.props.navigation.navigate('Start')
    globalThis.token = userDate.token
  }

  render() {
    return (
      <View style={stylesContainer.background}>

        <KeyboardAvoidingView style={styles.background} behavior="height" enabled>

          <Header text="Login" />

          <View style={styles.viewTextInput}>
            <Input
              text="Usuário: "
              secureText={false}
              updateParameter={this.updateUser}
            />
            <Input
              text="Senha: "
              secureText={true}
              updateParameter={this.updatePassword}
            />
          </View>

        </KeyboardAvoidingView>

        <View style={styles.buttonConteiner}>
          <LoadingButton
            onPress={() => this.buttonEnterEvent()}
            text={"Entrar"}
            loading={this.state.loading}
          />
        </View>

      </View>
    );
  }
}

export default login;

const styles = StyleSheet.create({
  background: {
    flex: 4,
  },

  buttonConteiner: {
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 20,
    minHeight: 50,
    borderRadius: 15,
  },

  viewTextInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
});