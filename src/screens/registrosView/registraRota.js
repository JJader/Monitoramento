import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';

import { Ionicons } from '@expo/vector-icons';


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

      notas: '',
    };
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <View style={stylesContainer.conteiner}>
          <View style={{ flex: 1 , marginHorizontal: 10}}>
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

            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
              <Text style={stylesText.text}>Notas</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={text => this.setState({ notas: text })}
                value={this.state.notas}
              />
            </KeyboardAvoidingView >
          </View>

          <TouchableOpacity
            onPress={
              () => this.props.navigation.navigate('Iniciar')}
            style={{ marginVertical: 10 }}>
            <View style={stylesComponets.botao}>
              <Text style={stylesText.cabecalho}>Iniciar rota</Text>
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