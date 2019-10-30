import React, { Component } from 'react';
import { View, ScrollView, SectionList } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

import BotaoDesembarque from '../../components/botaoDesebarque';


const DATA = [
  {
    title: 'Bairro 1',
    data: [
      {
        id: 1,
        nome: 'Escola Estadual Bolivar de Freitas',
        endereco: 'Avenida Antonio Olinto',
        numero: '20',

      },
      {
        id: 2,
        nome: 'Escola Estadual Major Antônio Salvo',
        endereco: 'Rua Progresso',
        numero: '162',

      },
    ],
  },
  {
    title: 'Bairro 2',
    data: [
      {
        id: 1,
        nome: 'Escola Estadual Bolivar de Freitas',
        endereco: 'Avenida Antonio Olinto',
        numero: '20',

      },
    ],
  },
  {
    title: 'Bairro 3',
    data: [
      {
        id: 1,
        nome: 'Escola Estadual Bolivar de Freitas',
        endereco: 'Avenida Antonio Olinto',
        numero: '20',

      },
      {
        id: 2,
        nome: 'Escola Estadual Major Antônio Salvo',
        endereco: 'Rua Progresso',
        numero: '162',

      },
    ],
  },
  {
    title: 'Bairro 4',
    data: [
      {
        id: 1,
        nome: 'Escola Estadual Bolivar de Freitas',
        endereco: 'Avenida Antonio Olinto',
        numero: '20',

      },
      {
        id: 2,
        nome: 'Escola Estadual Major Antônio Salvo',
        endereco: 'Rua Progresso',
        numero: '162',
      },
      {
        id: 3,
        nome: 'Escola Estadual Major Antônio Salvo',
        endereco: 'Rua Progresso',
        numero: '162',
      },
      {
        id: 4,
        nome: 'Escola Estadual Major Antônio Salvo',
        endereco: 'Rua Progresso',
        numero: '162',
      },
    ],
  },
];



class desembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: DATA
    };
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <View style={stylesContainer.conteiner}>
          <SectionList
            sections={this.state.data}
            renderItem={({ item }) => {
              return (
                <BotaoDesembarque nome={item.nome} />
              )
            }
            }
            keyExtractor={(item, index) => index}
          />

        </View>
      </View>


    );
  }
}

export default desembarque;
