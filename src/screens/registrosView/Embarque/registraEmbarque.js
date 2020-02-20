import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import ModalPonto from './modalPonto';
import stylesContainer from '../../../styles/Modal';

class RegistraEmbarque extends Component {
  constructor(props) {
    super(props);
    this.state = {

      refreshServer: false,
      refreshFlat : false,

      pontosJson: [
          {
            value: 'default',
            id: 0 ,
            data: [
              {
                id: 0,
                nome: 'Null',
                idade: 'Null',
                escola: 'NUll',
                turno: 'NUll',
                presenca: 0,
              }
            ]
          },
      ]
    };
  }

  async pontoServe(){
    let link = URL_API + '/pontos.json' 
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ pontosJson: dataJson.pontos });
      console.log("Aluno okay");
      this.setState({refreshServer: false})
    }
    catch (error) {
      alert("Ops !! alguma coisa errada no alunoServe")
      this.setState({refreshServer: false})
      return console.log(error);
    } //to catch the errors if any
    }

  finalizarEmbarque(ponto,AlunosPonto) {
    let DATA = this.state.DATA
    DATA[ponto] = AlunosPonto
    this.setState({ DATA })
    this.onRefreshFlat()
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  onRefreshServer(){
    this.setState({refreshServer: true})
    this.wait(2000).then(() => this.pontoServe())
    
  }

  onRefreshFlat(){
    this.setState({refreshFlat : !this.state.refreshFlat})
  }

  retornaAluno(nome, idade){
    // Back end busca 
    //returno o aluno
    return ({
      id: 24,
      nome: 'João abraam jose',
      idade: '13',
      escola: 'UFOP',
      turno: 'Manha',
      presenca: false,
    })
  }

  restaurar(ponto){
    let data = this.state.pontosJson[ponto] 
    alert(JSON.stringify(data))
    return (data)
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <ScrollView contentContainerStyle={stylesContainer.conteiner}
          refreshControl={<RefreshControl refreshing={this.state.refreshServer} onRefresh={() => this.onRefreshServer()}/>}>
          <FlatList
            
            keyExtractor={item => String(item.id)}
            data={this.state.pontosJson}
            extraData = {this.state.refreshFlat}
            renderItem={
              ({ item, index }) => {
                return (
                  <ModalPonto
                    data={item}
                    ponto={index}
                    //PresencaAluno={(ponto, aluno, presenca) => this.PresencaAluno(ponto, aluno, presenca)}
                    FinalizarEmbarque={(ponto,AlunosPonto) => this.finalizarEmbarque(ponto,AlunosPonto)}
                    RetornaAluno = {(nome, idade) => this.retornaAluno(nome,idade)}
                    Refresh = {() => this.onRefreshFlat()}
                    Cancelar = {(ponto) => this.restaurar(ponto)}
                  />)
              }
            } />
            
        </ScrollView>
      </View>
    );
  }
}

export default RegistraEmbarque;
