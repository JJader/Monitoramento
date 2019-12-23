import React, { Component } from 'react';
import { View, Text, Picker, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';

import { Ionicons } from '@expo/vector-icons';

const WINDOW_WIDTH = Dimensions.get('window').width;

const DATA = {
  Turno: ['Manha', 'Tarde', 'Noite'],
  Rota: ['104', '152', '154', '155', 'Rota'],
  Veiculo: ['A', 'B', 'C', 'D', 'E'],
}


class registraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: DATA,
      turno: '',
      veiculo: '',
      rota: '',
    };
  }

  VisualizarRota = () => {
    if (this.state.rota == '' || this.state.veiculo == '' || this.state.turno == '') {
      return(alert("Selecione uma rota válida"))
    } else {
         this.props.navigation.navigate(
        'Iniciar',
        {
          turno: this.state.turno,
          veiculo: this.state.veiculo,
          rota: this.state.rota,
        }
      )
    }
  };
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
                <Ionicons
                  name="ios-bus"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.veiculo}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ veiculo: itemValue })
                  }>
                  <Picker.Item label="VEÍCULO: " value="" />
                  {this.state.DATA.Veiculo.map((item, index) => {
                    return (<Picker.Item label={"   " + item} value={item} key={index} />)
                  })}
                </Picker>
              </View>

            </View>
          </View>

          <TouchableOpacity
            onPress={this.VisualizarRota}
            style={{ marginVertical: 10 }}>
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

  TextInput: {
    flex: 1,
    borderColor: stylesComponets.botao.backgroundColor,
    borderWidth: 3,
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: 'white'
  }
});