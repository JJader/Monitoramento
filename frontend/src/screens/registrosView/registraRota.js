import React, { Component } from 'react';
import { View, Text, Picker, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';
import ItemModal from '../../components/modal/itemModal'


import { Ionicons } from '@expo/vector-icons';

const WINDOW_WIDTH = Dimensions.get('window').width;

const DATA = {
  Turno: ['Manha', 'Tarde', 'Noite'],
  Rota: ['104', '152', '154', '155'],
}


class registraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: DATA,
      turno: '',
      rota: '',
      rua: '',
      numero: '',
      bairro: '',
    };
  }

  VisualizarRota = () => {
    const auxTurno = this.state.turno;
    const auxRota = this.state.rota;

    if (auxRota == '' || auxTurno == '') {
      alert("Selecione uma rota válida")
    } else {
      this.props.navigation.navigate('Iniciar', {
        dadosRota : [{
            turno: auxTurno,
            rota: auxRota,
            rua: this.state.rua,
            numero: this.state.numero,
            bairro: this.state.bairro,  
          }]
      });
    }
  };

  alterarRua(rua) {
    this.setState({ rua })
  }

  alterarBairro(bairro) {
    this.setState({ bairro })
  }

  alterarNumero(numero) {
    this.setState({ numero })
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <View style={stylesContainer.conteiner}>

          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <View style={styles.viewPicker}>

              <View style={styles.viewVeiculo}>
                <Ionicons
                  name="ios-partly-sunny"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.turno}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ turno: itemValue })
                  }>
                  <Picker.Item label="TURNO: " value="" />
                  {this.state.DATA.Turno.map((item, index) => {
                    return (<Picker.Item label={"   " + item} value={item} key={index} />)
                  })}
                </Picker>
              </View>

              <View style={styles.viewVeiculo}>
                <Ionicons
                  name="md-git-network"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.rota}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ rota: itemValue })
                  }>
                  <Picker.Item label="ROTA: " value="" />
                  {this.state.DATA.Rota.map((item, index) => {
                    return (<Picker.Item label={"   " + item} value={item} key={index} />)
                  })}
                </Picker>
              </View>

              <View style={styles.viewVeiculo}>
                <ItemModal
                  alterarRua={(rua) => this.alterarRua(rua)}
                  alterarBairro={(bairro) => this.alterarBairro(bairro)}
                  alterarNumero={(numero) => this.alterarNumero(numero)}
                />
              </View>

            </View>
          </View>

          <TouchableOpacity
            onPress={this.VisualizarRota}
            style={{ marginVertical: 10 }}
          >
            <View style={stylesComponets.botao}>
              <Text style={stylesText.cabecalho}>Visualizar rota</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

export default registraRota;

const styles = StyleSheet.create({
  viewPicker: {
    justifyContent: "space-evenly",
    alignItems: "stretch",
    flex: 2
  },
  viewTurno: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: stylesComponets.botao.backgroundColor,
    flexDirection: 'row',
    borderRadius: 15,
    marginHorizontal: '15%',
  },
  viewVeiculo: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: stylesComponets.botao.backgroundColor,
    flexDirection: 'row',
    borderRadius: 15,
  },
  pickerStyle: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
    color: 'white'
  }
});