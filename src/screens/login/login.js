import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

import LoadingButton from '../../components/button/loadingButton'
import Header from '../../components/header/logoHeader'
import Input from '../../components/input/inputVertical'

import _ from "lodash";

const WINDOW_WIDTH = Dimensions.get('window').width;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',

      token: '',
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
      name: userDate.name ,
    })

    this.props.navigation.navigate('Start')
  }

  render() {
    return (
      <View style={stylesContainer.background}>

        <KeyboardAvoidingView style={styles.background} behavior="height" enabled>

          <Header text="Login" />

          <View style={stylesText.viewTextInput}>
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
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});