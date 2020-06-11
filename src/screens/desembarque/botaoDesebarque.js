import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

const WIDTH = Dimensions.get('screen').width/10

class BotaoDesembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.nome,
      index : this.props.index,
      status: false,
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

  serverDesembarcar(){
    let index = this.state.index
    this.setState({status: true})
    this.setState({backgColor: '#32CD32'})
    this.props.mudarChegada(index, true)
  }

  naoDesembarca(){
    let index = this.state.index
    this.setState({status: false})
    this.setState({backgColor: stylesComponets.botao.backgroundColor})
    this.props.mudarChegada(index, false)
  }

  ClickDesemparcar(){
    Alert.alert(
      "Desembarcar",
      "Você chegou ao destino?",
      [
        {
          text: "sim",
          onPress: () => this.serverDesembarcar(),
          
        },
        { text: "não",
          onPress: () => this.naoDesembarca(),
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
          <View style={[stylesComponets.BoxShadow,stylesComponets.botao, {backgroundColor: this.state.backgColor}]}>
            <Text style={stylesText.cabecalho}>Desembarcar</Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default BotaoDesembarque;
