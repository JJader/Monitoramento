import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, SafeAreaView } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';

import { Ionicons } from '@expo/vector-icons';

import LoadingButton from '../../components/button/loadingButton';
import Header from '../../components/header/header';
import Input from '../../components/input/inputHorizontal'
import IconButton from '../../components/button/iconButton'

class BotaoPonto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: {
        id: '',
        nome: '',
        idade: '',
        escola: '',
        turno: '',
        presenca: 0,
      },
      index: '',
      oldPonto: '',
      id: '',
    };
  }

  idChange = (id) => {
    id ?
      this.setState({ id: parseInt(id) })
      :
      this.setState({ id: '' })

  };

  oldpontoChange = (oldPonto) => {
    oldPonto ?
      this.setState({ oldPonto: parseInt(oldPonto) })
      :
      this.setState({ oldPonto: '' })
  };

  printStudent() {
    let student = this.getStudent()

    if (!student.error) {

      this.setState({ aluno: student.aluno })
      this.setState({ index: student.index })

    } else {
      this.restoreProps()
      alert(student.error)
    }
  }

  getStudent() {
    let id = this.state.id
    let oldPonto = this.state.oldPonto

    if (typeof (id) == "number" && typeof (oldPonto) == "number") {
      return student = this.props.searchStudent(id, oldPonto)
    }
    else {
      return student = {
        error: "there are problems with param"
      }
    }
  }

  addStudent() {
    let student = this.state.aluno

    if (this.isValidStudent(student)) {
      let response = this.props.addStudent(student)

      if (response.ok) {
        this.restoreProps()
        alert(response.ok)
      }
      else {
        alert(response.error)
      }
    }

    else {
      alert("there are problems with param")
    }
  }

  isValidStudent(student) {
    if (student && student.id != '') {
      return true
    }
    else {
      return false
    }
  }

  restoreProps() {
    this.setState({
      aluno: {
        id: '',
        nome: '',
      }
    })
    this.setState({ index: '' })
    this.setState({ oldPonto: '' })
    this.setState({ id: '' })
  }

  showIconStudentValid() {
    return (
      this.state.aluno.id != '' ?
        <Ionicons name="ios-happy" size={50} color="gray" />
        :
        <Ionicons name="ios-sad" size={50} color="gray" />)
  }

  closeModal() {
    this.props.cancel()
    this.restoreProps()
  }

  render() {
    return (
      <View style={styles.background}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>

          <View style={styles.view}>
            <Header title={"Procurar Aluno"} />

            <View style={styles.viewInputContainer}>

              <View style={styles.viewTextInput}>
                <Input
                  style={{ flex: 1 }}
                  placeholder={"Id: "}
                  secureText={false}
                  updateParameter={this.idChange}
                />
                <Input
                  style={{ flex: 1 }}
                  placeholder={"Ponto de Onibus: "}
                  secureText={false}
                  updateParameter={this.oldpontoChange}
                />
              </View>

              <IconButton
                onPress={() => this.printStudent()}
                name={"youtube-searched-for"}
                text={"Search a student"}
              />
            </View>
          </View>

          <View style={styles.viewStudent}>
            {this.showIconStudentValid()}
            <Text style={stylesText.text} >{this.state.aluno.id}</Text>
            <Text style={stylesText.text} >{this.state.aluno.nome}</Text>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.viewBottom}>
          <LoadingButton
            onPress={() => this.addStudent()}
            text={"Adicionar aluno"}
            style={[stylesComponets.BoxShadow, styles.buttonConteiner,]}
          />
          <LoadingButton
            onPress={() => this.closeModal()}
            text={"Cancelar"}
            style={[stylesComponets.BoxShadow, styles.buttonConteiner,]}
          />
        </View>
      </View>
    );
  }
}

export default BotaoPonto;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },

  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: stylesContainer.background.backgroundColor,
    minHeight: 30
  },

  buttonConteiner: {
    flex: 1,
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 5,
    minHeight: 50,
    borderRadius: 15,
  },

  viewTextInput: {
    marginBottom: 20,
    marginHorizontal: 20,
    flex: 3,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch',
    minHeight: 100
  },

  viewInputContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },

  viewStudent: {
    flex: 2,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'white'
  },

  viewBottom: {
    flexDirection: 'row',
    marginBottom: 10,
  }

})