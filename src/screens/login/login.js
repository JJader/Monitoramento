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
import Welcome from './welcome'

import _ from "lodash";

const WINDOW_WIDTH = Dimensions.get('window').width;

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : '',
      password : '',
    };
  }

  userChange = (user) => {
    this.setState({ user })
  };
  
  passwordChange = (password) => {
    this.setState({ password })
  };

  finalizarLogin(response){
    let dados = _.cloneDeep(response)
    console.log(dados.nome);
    return dados
  }

  navegar(id){
    this.props.navigation.navigate('RegistraR', id = id) 
  }

  async loginServe(){
    let link = URL_API + '/login' 

        const dados = { 
            user : this.state.user,
            password : this.state.password,  
        };

        try{
          const response = await fetch(link, {
            method: 'POST', // or 'PUT'
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
          });
          let responseJson = await response.json();
          
          if (response.ok && response.status != 404){
            return this.finalizarLogin(responseJson)
          }
          else{
            alert("Usuário ou senha incorreto")
            return false
          }

        }
        catch (error) {
          alert("Ops !! alguma coisa errada no submeter_Rota")
          console.log(error);
          return false
        }
      
    
  }

  render() {
    return (
      <View style = {stylesContainer.background}>

        <KeyboardAvoidingView 
          style = {styles.background}
          behavior= "padding" enabled>

          <View style={styles.cabecalho}>

            <Text style = {styles.cabecalhoText}>Login</Text>
            <Image
              source={require('../../assets/logo/logo.png')}
              style={{ flex: 1 }}
              resizeMode="center"

            />
          </View>

          <View style = {styles.infomacoes}>
            <Text style = {[stylesText.text, styles.text]}> Usuário : </Text>
            <TextInput 
              style = {styles.textInput}
              value={this.state.user}
              onChangeText={this.userChange}
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <Text style = {[stylesText.text, styles.text]}> Senha : </Text>
            <TextInput 
              style = {styles.textInput}
              value={this.state.password}
              onChangeText={this.passwordChange}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
          </View>

        </KeyboardAvoidingView>
        
        <View style={styles.botaoConteiner}>
          

          <Welcome
          loginServe = {() => this.loginServe()}
          navegar = {()=> this.navegar()}
          />

        </View>
      </View>
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
    flex: 4,
    //borderTopLeftRadius: 110,
    //borderBottomRightRadius: 110,
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
    paddingHorizontal: 20
  },
  botaoConteiner:{
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});