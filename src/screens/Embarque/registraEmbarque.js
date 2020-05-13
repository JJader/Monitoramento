import React, { Component } from 'react';
import { View, Alert, FlatList, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import ModalStudent from './modalListaAlunos';

import stylesContainer from '../../styles/Modal';
import stylesComponets from '../../styles/componets'

import ModalButton from '../../components/button/modalButton'

import _ from "lodash";

import Header from '../../components/header/navigationMenu'

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
    this.setState({modal: false})
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

  returnStudentsFromStop(indexStop) {
    let responseJson = {}
    let pontosJson = this.state.pontosJson

    try {
      responseJson = pontosJson[indexStop].alunos
    }
    catch (error) {
      responseJson = {
        error: "There is not student with this dates"
      }
    }

    return responseJson
  }

  returnStudentIndex(student, id) {
    return student.findIndex((element) => {
      return (element.id == id)
    })
  }

  returnButtonModalComponent(item, index) {
    return (
      <ModalButton
        title={item.value}
        modal={this.state.modal}
        view={this.returnStudentListComponent(item, index)}
        onRequestClose={() => this.closedModalnotSave()}
        style={[stylesComponets.BoxShadow, styles.buttonConteiner]}
      />
    )
  }

  returnStudentListComponent(item, index) {
    return (
      <ModalStudent
        data={item.alunos}
        ponto={index}
        endingABoarding={(ponto, AlunosPonto) => this.endingABoarding(ponto, AlunosPonto)}
        searchStudent={(id, ponto) => this.searchStudent(id, ponto)}
        updateRefresh={(param) => this.updateRefreshScroll(param)}
        refresh = {this.state.refreshScroll}
        closedModalnotSave={() => this.closedModalnotSave()}
      />
    )
  }

  async endingABoarding(ponto, AlunosPonto) {
    // excluir alunos adicionados
    let pontosJson = this.state.pontosJson
    pontosJson[ponto].alunos = _.cloneDeep(AlunosPonto)

    this.updateRefreshScroll(true)
    this.setState({ pontosJson })
    let response = await this.callPostServer(ponto)
    this.updateRefreshScroll(false)

    if (!response.error) {
      this.shareIndexReadyBustopToMaps(ponto)
    }
    else {
      return response.error   
    }
  }

  deleteStudent(indexStudent, indexStop) {
    let students = _.cloneDeep(this.returnStudentsFromStop(indexStop))
    let student = {}

    if (!students.error && indexStudent < students.length) {
      //student = students.splice(indexStudent, 1)
      student = students[indexStudent]

      if (student) {
        let busStops = _.cloneDeep(this.state.pontosJson)
        this.updateRefreshScroll(true)

        busStops[indexStop].alunos = students
        this.setState({ pontosJson: busStops })
        
        return student
      }
    }

    return student = {
      error: "There is not student with this dates"

    }
  }

  shareIndexReadyBustopToMaps(index){
    this.props.navigation.navigate('Iniciar', { index })
    this.setState({modal: false})
  }

  async callPostServer(stop) {
    let responseJson = {}

    try {
      responseJson = await this.sendStudentsToServer(stop)
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
        error: students.error
      }
    }
  }

  updateRefreshScroll(param) {
    this.setState({ refreshScroll: param })
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
            renderItem={({ item, index }) => this.returnButtonModalComponent(item, index)}
          />

        </ScrollView>
      </View>
    );
  }
}

export default RegistraEmbarque;

const styles = StyleSheet.create({
  buttonConteiner: {
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 20,
    minHeight: 50,
    borderRadius: 15,
  },
})