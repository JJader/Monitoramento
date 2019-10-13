import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModalAlunos from '../../components/modalAlunos'
const DATA = [
  {
    title: 'Ponto 1',
    data: [
      {
        id: 1,
        nome: 'Jamisson Jader Moraes Pereira Junior',
        idade: '20',
        escola: 'UEMG',
        turno: 'tarde'
      },
      {
        id: 2,
        nome: 'Rafael carvalho de Souza Pereira Junior da Silva',
        idade: '17',
        escola: 'Doctos',
        turno: 'Noite'
      },
      {
        id: 3,
        nome: 'Victor Silva de Souza Andrade melo de lima',
        idade: '15',
        escola: 'UFOP',
        turno: 'Noite'
      },
    ],
  },
  {
    title: 'Ponto 2',
    data: [
      {
        id: 4,
        nome: 'Vanessa',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 6,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
    ],
  },
  {
    title: 'Ponto 3',
    data: [
      {
        id: 4,
        nome: 'Vanessa',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 6,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
    ],
  },
  {
    title: 'Ponto 4',
    data: [
      {
        id: 4,
        nome: 'Vanessa',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 6,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
    ],
  },
  {
    title: 'Ponto 5',
    data: [
      {
        id: 4,
        nome: 'Vanessa',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 6,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
    ],
  },
];

export default class AlunosRotas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalItem: {
        nome: 'Anonimo',
        idade: '-1',
        escola: 'xxx',
        turno: 'xxx'
      },
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <SectionList
          sections={DATA}
          renderItem={({ item }) => {
            return (
              <ModalAlunos data={item} />
            )
          }
          }
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
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