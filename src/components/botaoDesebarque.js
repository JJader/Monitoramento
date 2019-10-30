import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import stylesContainer from '../styles/Modal'
import stylesComponets from '../styles/componets';
import stylesText from '../styles/text';

const WIDTH = Dimensions.get('screen').width/10

class BotaoDesembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.nome,
      backgColor: stylesComponets.botao.backgroundColor,
    };
  }
  
  StringCorte(str){
    return(
      str.length <= WIDTH ? 
        str:
        str.substring(0, WIDTH) + " ..."
    )     
  }

  ClickDesemparcar(){
    Alert.alert(
      "Desembarcar",
      "Você chegou ao destino?",
      [
        {
          text: "sim",
          onPress: () => this.setState({backgColor: '#32CD32'}),
          
        },
        { text: "não",
          onPress: () => this.setState({backgColor: stylesComponets.botao.backgroundColor}),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
    
  }


  render() {
    return (
      <View style={[stylesText.view, {margin: 10}]}>
        <View style = {{flex: 1}}>

        <Text style={stylesText.text}>{this.StringCorte(this.state.nome)}</Text>

        <TouchableOpacity style={{ flex: 1 }}
          onPress = {() => this.ClickDesemparcar()}
        >
          <View style={[stylesComponets.botao, {backgroundColor: this.state.backgColor}]}>
            <Text style={stylesText.cabecalho}>Desembarcar</Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default BotaoDesembarque;
