import React, { Component } from 'react';
import { View, Alert, FlatList, ScrollView, RefreshControl } from 'react-native';
import ModalStudent from './modalPonto';
import stylesContainer from '../../../styles/Modal';
import ModalButton from '../../../components/button/modalButton'

import _ from "lodash";

import Header from '../../../components/header/navigationMenu'

class RegistraEmbarque extends Component {
  constructor(props) {
    super(props);
    this.state = {

      refreshScroll: false,
      modal: false,

      pontosJson: [
        {
          value: 'default',
          id: 0,
          alunos: [
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

  async endingABoarding(ponto, AlunosPonto) {
    let pontosJson = this.state.pontosJson
    pontosJson[ponto].alunos = _.cloneDeep(AlunosPonto)

    this.updateRefreshScroll(true)
    this.setState({ pontosJson })
    await this.sendStudentsToServer(ponto)
    this.updateRefreshScroll(false)

    this.props.navigation.navigate('Iniciar', { index: ponto })
  }

  async callPostServer() {
    let responseJson = {}

    try {
      responseJson = await this.getBusStopsFromServer()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async sendStudentsToServer(ponto) {
    let link = URL_API + '/pontos.json'

    const dados = {
      alunos: this.state.pontosJson[ponto].alunos
    };

    const response = await fetch(link, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    return responseJson = await response.json();
  }

  returnRefreshControllConfig() {
    return (
      <RefreshControl
        refreshing={this.state.refreshScroll}
        onRefresh={() => this.onRefreshScroll()}
      />
    )
  }

  async onRefreshScroll() {
    let updateOk = await this.updateBusStopsWithServer()

    if (updateOk) {
      this.shareBustopToMaps()
    }
  }

  shareBustopToMaps() {
    let busStops = this.state.pontosJson

    let data = busStops.map((point, index) => {
      return {
        latitude: point.lat,
        longitude: point.lon,
        value: point.value,
        arrive: false
      }
    })
    this.props.navigation.navigate('Iniciar', { busStops: data })
  }

  async updateBusStopsWithServer() {
    this.updateRefreshScroll(true)

    let busStops = await this.callBusStopsServer()

    this.updateRefreshScroll(false)

    if (!busStops.error) {
      this.setState({ pontosJson: busStops })
      return true
    }
    else {
      alert(busStops.error)
      return false
    }


  }

  updateRefreshScroll(param) {
    this.setState({ refreshScroll: param })
  }

  async callBusStopsServer() {
    let responseJson = {}

    try {
      responseJson = await this.getBusStopsFromServer()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async getBusStopsFromServer() {
    let link = URL_API + '/pontos.json'

    const response = await fetch(link);
    const busStopsJson = await response.json();
    return busStopsJson.pontos
  }

  deleteStudent(indexStudent, indexStop) {
    let students = this.returnStudentsFromStop(indexStop)
    let student = {}

    if (!students.error && indexStudent < students.length) {
      student = students.splice(indexStudent, 1)

      if (student) {
        let busStops = _.cloneDeep(this.state.pontosJson)

        busStops[indexStop].alunos = students
        this.setState({ pontosJson: busStops })

        return student
      }
    }

    else {
      return student = {
        error: "There is not student with this dates"
      }
    }
  }

  searchStudent(id, indexStop) {
    let students = this.returnStudentsFromStop(indexStop)
    let index = -1

    if (!students.error) {
      index = this.returnStudentIndex(students, id)
    }

    if (index != -1) {
      let student = students[index]

      return dates = {
        aluno: _.cloneDeep(student),
        index: index
      }
    }
    else {
      return dates = {
        error: "There is not student with this dates"
      }
    }
  }

  returnStudentsFromStop(indexStop) {
    let responseJson = {}
    let pontosJson = this.state.pontosJson

    try {
      responseJson = pontosJson[indexStop].alunos
    }
    catch (error) {
      responseJson = {
        error: "There is not students on this stop"
      }
    }

    return responseJson
  }

  returnStudentIndex(student, id) {
    return student.findIndex((element) => {
      return (element.id == id)
    })
  }

  returnModalStudentComponent(item, index) {
    return (
      <ModalButton
        title={item.value}
        modal={this.state.modal}
        view={this.returnStudentListComponent(item, index)}
        onRequestClose={() => this.closedModalnotSave()}
      />
    )
  }

  returnStudentListComponent(item, index) {
    return (
      <ModalStudent
        data={item.alunos}
        title={item.va}
        ponto={index}
        finisheA={(ponto, AlunosPonto) => this.endingABoarding(ponto, AlunosPonto)}
        deleteStudent={(index, ponto) => this.deleteStudent(index, ponto)}
        searchStudent={(id, ponto) => this.searchStudent(id, ponto)}
        refresh={(param) => this.updateRefreshScroll(param)}
        closedModalnotSave={() => this.closedModalnotSave()}
      />
    )
  }

  closedModalnotSave() {
    Alert.alert(
      "Cancelar embarque",
      "Você não salvou o embarque",
      [
        {
          text: "Ok",
          onPress: () => { this.closedModal() },
          style: "cancel"
        },
        {
          text: "cancelar",
          onPress: () => { return false }
        }
      ],
      { cancelable: false }
    );
  }

  async closedModal() {
    this.updateRefreshScroll(true)
    this.setState({ modal: false })
    this.updateRefreshScroll(false)
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Registrar embarque" navigationProps={this.props.navigation.toggleDrawer} />

        <ScrollView
          contentContainerStyle={stylesContainer.conteiner}
          refreshControl={this.returnRefreshControllConfig()}
        >

          <FlatList
            keyExtractor={item => String(item.id)}
            data={this.state.pontosJson}
            extraData={this.state.refreshScroll}
            renderItem={({ item, index }) => this.returnModalStudentComponent(item, index)}
          />

        </ScrollView>
      </View>
    );
  }
}

export default RegistraEmbarque;
