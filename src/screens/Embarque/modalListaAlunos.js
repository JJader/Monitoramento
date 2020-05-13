import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Switch, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import PresencaAluno from './PresencaAluno';
import stylesContainer from '../../styles/Modal'

import BotaoPonto from './botaoListaAlunos';
import Header from '../../components/header/header'
import _ from "lodash";

class ModalAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {

      alunos: _.cloneDeep(this.props.data),
      ponto: this.props.ponto,
      backgColor: '#0279be',
      refresh: false,
      alunos_add: 0,

    };
  }

  componentWillUpdate(newProps) {
    try {
      if (newProps.data && newProps.refresh) {
        this.setState({ alunos: newProps.data })
        this.onRefreshFlat()
        this.onRefreshRegistraEmbarque()
      }
    } 
    catch (error) { 
    }
  }

  onRefreshFlat() {
    this.setState({ refresh: !this.state.refresh })
    
  }

  onRefreshRegistraEmbarque(){
    this.props.updateRefresh(false)
  }

  cancel(){
    this.props.closedModalnotSave()
  }

  presencaAluno(aluno, presenca) {
    let alunos = _.clone(this.state.alunos)
    alunos[aluno].presenca = presenca
    this.setState({ alunos })
  }

  presencaTodosAluno(aluno, presenca) {
    for (i = 0; i < this.state.alunos.length; i++) {
      this.presencaAluno(i, presenca)
    }
  }

  endingABoarding() {
    if (this.props.titulo != 'default') {
      let response = this.props.endingABoarding(this.state.ponto, this.state.alunos)

      if (response.error) {
        alert(response.error)
      }
      else {
        this.onRefreshRegistraEmbarque()
        this.setState({ backgColor: '#32CD32' })
        this.setState({ alunos_add: 0 })
      }
    }

    else {
      alert("Não é permitido enviar para o servidor")
    }
  }

  addStudent(student) {
    if (student) {
      let alunos_add = this.state.alunos_add + 1
      let alunos = _.cloneDeep(this.state.alunos)

      alunos.push(student)
      this.setState({ alunos })
      this.setState({ alunos_add })
      this.onRefreshFlat()
      return response = {
        ok: "student successfully added"
      }
    }
    else {
      return response = {
        error: "invalid student"
      }
    }
  }

  searchStudent(id, oldPonto) {
    let isAlreadyStop = this.isAlreadyStop(id)

    if (!isAlreadyStop) {
      return student = this.props.searchStudent(id, oldPonto)
    }
    else {
      return student = {
        error: "Student is already the bus stop"
      }
    }
  }

  isAlreadyStop(id) {
    let alunos = this.state.alunos
    let aluno = alunos.find(element => element.id == id)

    if (aluno == undefined) {
      return false
    }
    else {
      return true
    }
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header title={"Embarcar"} />

        <View style={stylesContainer.conteiner}>

          <View style={styles.scholl}>
            <ScrollView >

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
          </View>

          <BotaoPonto
            endingABoarding={() => this.endingABoarding()}
            searchStudent={(id, oldPonto) => this.searchStudent(id, oldPonto)}
            addStudent={(student) => this.addStudent(student)}
            cancel={() => this.cancel()}
          />

        </View>

      </View>

    );
  }
}

export default ModalAlunos;

const styles = StyleSheet.create({
  scholl: {
    flex: 3
  },
})