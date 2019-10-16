import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

import BotaoDesembarque from '../../components/botaoDesebarque';

class desembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: 'Escola 1'
    };
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <View style = {stylesContainer.conteiner}>
          
          <ScrollView style = {{margir: 20, flex: 1}}>
            <BotaoDesembarque nome = "Universidade Federal de Ouro Preto - Campus João Monlevade "/>
            <BotaoDesembarque nome = "Escola 2 "/>
            <BotaoDesembarque nome = "Escola 3 "/>
            <BotaoDesembarque nome = "Escola 4 "/>
            <BotaoDesembarque nome = "Escola 5 "/>
          </ScrollView>

        </View>
      </View>
    );
  }
}

export default desembarque;
