import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalPonto from '../../components/modal/modalPonto';
import stylesContainer from '../../styles/Modal';

const DATA = [
  {
    title: 'Ponto 1',
    data: [
      {
        id: 1,
        nome: 'Jamisson Jader Moraes Pereira Junior',
        idade: '20',
        escola: 'UEMG',
        turno: 'tarde',
        presenca: false,
      },
      {
        id: 2,
        nome: 'Rafael carvalho de Souza Pereira Junior da Silva',
        idade: '17',
        escola: 'Doctos',
        turno: 'Noite',
        presenca: false,
      },
      {
        id: 3,
        nome: 'Victor Silva de Souza Andrade melo de lima',
        idade: '15',
        escola: 'UFOP',
        turno: 'Noite',
        presenca: false,
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
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 6,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 7,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 8,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 9,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
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
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 11,
        nome: 'Monica veloso',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 12,
        nome: 'Pricila carminha',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 13,
        nome: 'Estefani lorena',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 14,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
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
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 16,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 17,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 18,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 19,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
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
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 21,
        nome: 'Carla',
        idade: '18',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 22,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 23,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
      {
        id: 24,
        nome: 'Sida',
        idade: '13',
        escola: 'UFOP',
        turno: 'Manha',
        presenca: false,
      },
    ],
  },
];

class registraEmbarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: DATA,
      refresh: false,
    };
  }

  PresencaAluno(ponto, aluno, presenca) {
    let DATA = this.state.DATA
    DATA[ponto].data[aluno].presenca = presenca
    this.setState({ DATA })
    alert(this.state.DATA[ponto].data[aluno].presenca)
  }

  FinalizarEmbarque(ponto) {
    let DATA = this.state.DATA
    //DATA.splice(ponto,1)
    DATA.shift()
    this.setState({ DATA })
    this.setState({ refresh: false })
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <View style={stylesContainer.conteiner}>
          <FlatList
            keyExtractor={item => item.title}
            data={this.state.DATA}
            refreshing={this.state.refresh}
            onRefresh={() => this.setState({ refresh: true })}
            renderItem={
              ({ item, index }) => {
                return (
                  <ModalPonto
                    data={item}
                    ponto={index}
                    PresencaAluno={(ponto, aluno, presenca) => this.PresencaAluno(ponto, aluno, presenca)}
                    FinalizarEmbarque={(ponto) => this.FinalizarEmbarque(ponto)}
                  />)
              }
            } />
        </View>
      </View>
    );
  }
}

export default registraEmbarque;
