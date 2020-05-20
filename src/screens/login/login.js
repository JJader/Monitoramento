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

import * as SecureStore from "expo-secure-store";
import loginAPI from '../../api/login/userData'
import dadosUserStore from '../../api/offline/dadosUser'

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

  async componentWillMount() {
    //await dadosUserStore.delet()
    const dados = await dadosUserStore.get()
    this.callNewScreen(dados);
  }

  updateUser = (user) => {
    this.setState({ user })
  };

  updatePassword = (password) => {
    this.setState({ password })
  };

  async buttonEnterEvent() {
    let user = this.state.user
    let password = this.state.password

    let userDate = await loginAPI.callLoginServe(user, password)

    if (!userDate.error) {
      let user = await dadosUserStore.set(userDate)
      this.callNewScreen(user)
    }
    else {
      alert(userDate.error)
      this.setState({ loading: false })
    }
  }

  callNewScreen(user) {
    if (user.name) {
      this.props.navigation.navigate('RegistraR')
      this.props.navigation.navigate('Start', { name: user.name })
    }
    else {
      console.log(user.error)
      this.setState({ loading: false })
    }
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
