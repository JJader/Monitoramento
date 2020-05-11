import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import PresencaAluno from './PresencaAluno';
import stylesContainer from '../../../styles/Modal'
import stylesText from '../../../styles/text';
import stylesComponets from '../../../styles/componets';
import BotaoPonto from '../../../components/modal/botaoPonto';
import Header from '../../../components/header/header'
import _ from "lodash";

class ModalAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      isVisible: false,
      alunos: _.cloneDeep(this.props.data),
      ponto: this.props.ponto,
      backgColor: '#0279be',
      refresh: false,
      alunos_add: 0,
    
    };
  }

  //Refresh
  modalSet(estado) {
    this.setState({ isVisible: estado })
    this.onRefreshFlat()
  }

  onRefreshFlat() {
    this.setState({ refresh: !this.state.refresh })
  }

  cancelar() {

    this.presencaTodosAluno(-1, false)
    this.props.closedModalnotSave()
    
  }


  // Embarque
  presencaAluno(aluno, presenca) {
    let alunos = _.clone(this.state.alunos)
    alunos[aluno].presenca = presenca
    this.setState({ alunos })
  }

  presencaTodosAluno(aluno, presenca) {

    let i
    for (i = 0; i < this.state.alunos.length; i++) {
      this.presencaAluno(i, presenca)
    }

    return null
  }

  finalizarEmbarque() {

    if (this.props.titulo != 'default') {

      this.onRefreshFlat()

      this.setState({ backgColor: '#32CD32' })
      this.setState({ isVisible: !this.state.isVisible })

      this.setState({ alunos_add: 0 })

      this.props.finalizarEmbarque(this.state.ponto, this.state.alunos)
    }
    else {
      alert("Não é permitido enviar para o servidor")
    }
  }

  //Operações especiais
  delStudent(index, ponto) {
    let aluno = this.props.delStudent(index, ponto)
    return aluno
  }

  searchStudent(id) {
    let alunos = _.clone(this.state.alunos)

    let aluno = alunos.find(element => element.id == id)
    if (aluno == undefined) {
      return false
    } else {
      return true
    }
  }

  addStudent(index, oldPonto) {
    let aluno = this.delStudent(index, oldPonto)

    if (aluno != undefined) {
      let alunos_add = this.state.alunos_add + 1

      let alunos = _.clone(this.state.alunos)
      alunos.push(aluno)
      this.setState({ alunos })
      this.setState({ alunos_add })
      this.onRefreshFlat()
    } else {
      alert("O aluno não foi encontrado")
    }
  }

  printStudent(id, oldPonto) {
    let exist = this.searchStudent(id)
    let dados = undefined

    try {
      dados = this.props.searchStudent(id, oldPonto)
    } catch (error) {

    }

    if (exist) {
      alert("Esse aluno já existe nessa lista")
      return null
    }

    if (dados != undefined) {

      let student = {
        aluno: dados.aluno,
        index: dados.index,
      }

      return student
    } else {
      alert("O aluno não foi encontrado")
      return undefined
    }
  }

  componentWillUpdate(newProps) {
    try {
      if (newProps.data.length + this.state.alunos_add < this.state.alunos.length) {
        this.setState({ alunos: newProps.data })

      }
    } catch (error) {
      console.log("Erro modalPonto ");

    }

  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header title={"Embarcar"} />

        <View style={stylesContainer.conteiner}>
          <ScrollView>

            <PresencaAluno
              presencaAluno={(aluno, presenca) => this.presencaTodosAluno(aluno, presenca)}
              nome="Todos Alunos"
              aluno={-1}
              presenca={false}
            />

            <FlatList
              keyExtractor={item => String(item.id)}
              data={this.state.alunos}
              extraData={this.state.refresh}
              renderItem={
                ({ item, index }) => {

                  return (
                    <PresencaAluno
                      presencaAluno={(aluno, presenca) => this.presencaAluno(aluno, presenca)}
                      nome={item.nome}
                      escola={item.escola}
                      aluno={index}
                      presenca={item.presenca}
                    />
                  )
                }
              }
            />

          </ScrollView>

          <BotaoPonto
            finalizarEmbarque={() => this.finalizarEmbarque()}
            modalSet={(estado) => this.modalSet(estado)}
            printStudent={(id, oldPonto) => this.printStudent(id, oldPonto)}
            addStudent={(index, oldPonto) => this.addStudent(index, oldPonto)}
            cancelar={() => this.cancelar()}
          />

        </View>

      </View>

    );
  }
}

export default ModalAlunos;

const styles = StyleSheet.create({
  scholl: {
    justifyContent: "space-around"
  },
})