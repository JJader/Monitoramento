import React, { Component } from 'react';
import { View, Text , Modal, TouchableOpacity, StyleSheet, Image} from 'react-native';

import _ from "lodash";

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

class welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible : true,
        name : 'Jamisson Jader Moraes Pereira Junior',
        id : '',
    };
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  finalizar(id){
    this.setState({isVisible: false})
    this.props.navegar(this.state.id)
  }

  async onWelcome(){
    let usuario = await this.props.loginServe()
    console.log(usuario.nome);

    if (usuario.nome){
        this.setState({isVisible: true})
        this.setState({name : usuario.nome})
        this.setState({id : usuario.id})
        this.wait(5000).then(() => this.finalizar())
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.onWelcome()}>
            <View style={stylesComponets.botao}>
              <Text style={stylesText.cabecalho}>
                Entrar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert("Pagina de modificar senha")}>
            <View style={stylesComponets.botao}>
              <Text>
                Esqueci minha senha
              </Text>
            </View>
          </TouchableOpacity>
        
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isVisible}
            >
                <View style = {stylesContainer.background}>
                    <Text style = {styles.text}>Bem vindo </Text>
                    <View style={styles.cabecalho}>
                        <Image
                            source={require('../../assets/logo/logo.png')}
                            style={{ flex: 1 }}
                            resizeMode="center"
                        />
                    </View>
                    <Text style = {[styles.text, {fontSize : 30}]}>{this.state.name}</Text> 
                </View>

        </Modal>
      </View>
    );
  }
}

export default welcome;

const styles = StyleSheet.create({
    background: {
        marginTop: 20,
        flex: 1,
        backgroundColor: stylesContainer.background.backgroundColor, 
        justifyContent: 'center',
        alignItems: 'center',  
        alignContent: 'center' ,

    },
    text:{
        flex: 1,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        color : 'white'
    },
    cabecalho:{
        marginVertical: 10,
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 2,
        transform: [{ rotate: '40deg' }]
      },
});