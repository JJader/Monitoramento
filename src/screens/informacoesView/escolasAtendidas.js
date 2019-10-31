import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import ItemModal from '../../components/modal/itemModal';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';
import stylesText from '../../styles/text';




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

export default class AlunosRotas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        data: DATA,
        modalItem: {
          nome: 'Anonimo',
          endereco: '-1',
          numero: 'xxx',
                 },
    };
}
  render() {
    return (
      <View style={stylesContainer.conteiner}>
        <SectionList
          sections={this.state.data}
          renderItem={({ item }) => {
            return (
              <ItemModal 
              data = {{
              id:item.id,
              data:
              [["Nome", item.nome],
              ["Endereço", item.endereco],
              ["Número", item.numero],]}
            }/>
            )
          }
          }
          renderSectionHeader={({ section }) => <Text style={stylesComponets.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
  },
  sectionHeader: {
    padding: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0279be',
    color: 'white',
  },
 
})