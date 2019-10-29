import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import stylesContainer from '../styles/Modal'
import stylesComponets from '../styles/componets';
import stylesText from '../styles/text';


class BotaoDesembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: this.props.nome
    };
  }

  render() {
    return (
      <View style={[stylesText.view, {alignItems: 'center', marginVertical: 20}]}>
        <Text style={[stylesText.text, {flex: 2}]}>{this.state.nome}</Text>

        <View style={{ flex: 1 }}>
          
        </View>
        <Button
            title="Desembarcar"
          />
      </View>
    );
  }
}

export default BotaoDesembarque;
