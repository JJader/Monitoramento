import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ModalPonto from '../../components/modalPonto';
import { FlatList } from 'react-native-gesture-handler';

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
        id: 8,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 9,
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
        id: 10,
        nome: 'Cintia loviada',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 11,
        nome: 'Monica veloso',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 12,
        nome: 'Pricila carminha',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 13,
        nome: 'Estefani lorena',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 14,
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
        id: 15,
        nome: 'Jorge duntra',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 16,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 17,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 18,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 19,
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
        id: 20,
        nome: 'Mirielle',
        idade: '15',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 21,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 22,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 23,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
      {
        id: 24,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha'
      },
    ],
  },
];

class registraEmbarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  PresencaAluno(pres){
      if (pres) {
        alert("Jamisson")
      }
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor = {item => item.title}
          data = {DATA}
          renderItem = {
            ({item}) =>{
              return <ModalPonto 
                data = {item}
                PresencaAluno = {(pres) => this.PresencaAluno(pres) }
        />
            }
          }
        />
      </View>
    );
  }
}

export default registraEmbarque;
