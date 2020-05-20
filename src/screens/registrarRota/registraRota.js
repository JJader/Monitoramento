import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl
} from 'react-native';

import stylesContainer from '../../styles/Modal';

import Header from '../../components/header/navigationMenu'
import PickerItem from '../../components/list/picker'
import LoadingButton from '../../components/button/loadingButton'
import Notes from '../../components/input/inputVertical'

import routeAPI from '../../api/registrarRota/routeServer'
import dadosUserStore from '../../api/offline/dadosUser'

class RegistraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {

      id: 1,
      token: globalThis.token,

      shift: '',
      vehicle: '',
      route: '',
      notes: '',

      routesJson: [{ id: 0, value: 'Null' }],
      vehiclesJson: [{ id: 0, value: 'Null' }],
      shiftsJson: [
        { value: "M", name: "Manhã" },
        { value: "A", name: "Tarde" },
        { value: "N", name: "Noite" },
        { value: "F", name: "Tempo Todo" },
        { value: "U", name: "Indefinido" }
      ],

      loading: false
    };
  }

  updateNotes(notes) {
    this.setState({ notes })
  };

  async updateShift(shift) {
    if (shift != '') {
      let dadosUser = await this.updateUserShifts(shift)
      if (dadosUser.error){
        alert(dadosUser.error)      
      }
      else{
      await this.updateRoutesJson(shift)
    }
    }
  };

  async updateUserShifts(shift) {
    let dadosUser = await dadosUserStore.get()

    if (!dadosUser.error) {
      dadosUser.turn = shift
      return await dadosUserStore.set(dadosUser)
    }
    else {
      return dadosUser
    }
  }

  async updateRoutesJson(shift) {
    let routesJson = await routeAPI.routeServer(shift)

    if (!routesJson.error) {
      this.setState({ routesJson })
    }
    else {
      alert(routesJson.error)
    }
  }

  updateVehicle(vehicle) {
    this.setState({ vehicle })
  };

  updateRoute(route) {
    this.setState({ route })
  };

  async updateVehiclesJson() {
    let vehiclesJson = await this.callVehicleServer()

    if (!vehiclesJson.error) {
      this.setState({ vehiclesJson: vehiclesJson.veiculos })
    }
    else {
      alert(vehiclesJson.error)
    }
  }

  async callVehicleServer() {
    let responseJson = {}

    try {
      responseJson = await this.returnVehicleList()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async returnVehicleList() {
    let link = URL_API + '/veiculos.json'

    const vehicles = await fetch(link);
    const vehiclesJson = await vehicles.json();

    return vehiclesJson
  }

  async buttonEnterEvent() {
    let mapDate = await this.callDaylyServe()

    if (!mapDate.error) {

      this.callNewScreen(mapDate)

    } else {
      alert(mapDate.error)
      this.setState({ loading: false })
    }
  }

  async callDaylyServe() {
    let responseJson = {}

    try {
      responseJson = await this.sendDailyInformationToServer()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async sendDailyInformationToServer() {
    let link = URL_API + '/registrar/rota'

    const dailyInfor = {
      id: this.state.id,
      turno: this.state.shift,
      rota: this.state.route,
      veiculo: this.state.vehicle,
      nota: this.state.notes,
    };

    const response = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dailyInfor),
    });

    let responseJson = await response.json();
    return responseJson
  }

  callNewScreen(mapDate) {
    this.props.navigation.navigate('Iniciar', {
      id: this.state.id,
    })
  }

  render() {
    return (

      <View style={stylesContainer.background}>

        <Header title="Registrar rota"
          navigationProps={this.props.navigation.toggleDrawer}
        />

        <ScrollView contentContainerStyle={stylesContainer.conteiner}>

          <KeyboardAvoidingView style={styles.viewPicker} behavior="height" enabled>

            <PickerItem
              dates={this.state.shiftsJson}
              text={"TURNO:"}
              iconName={"ios-partly-sunny"}
              onValueChange={(item) => this.updateShift(item)}
            />

            <PickerItem
              dates={this.state.routesJson}
              text={"ROTA:"}
              iconName={"md-git-network"}
              onValueChange={(item) => this.updateRoute(item)}
            />

            <PickerItem
              dates={this.state.vehiclesJson}
              text={"VEÍCULO:"}
              iconName={"ios-bus"}
              onValueChange={(item) => this.updateVehicle(item)}
            />

            <View style={{ flex: 4 }}>
              <Notes
                text="Notas: "
                secureText={false}
                updateParameter={(notes) => this.updateNotes(notes)}
              />
            </View>

          </KeyboardAvoidingView >

          <View style={styles.buttonConteiner}>
            <LoadingButton
              onPress={() => this.buttonEnterEvent()}
              text={"Iniciar Rota"}
              loading={this.state.loading}
            />
          </View>

        </ScrollView>

      </View>
    );
  }
}

export default RegistraRota;

const styles = StyleSheet.create({
  viewPicker: {
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "stretch",
    flex: 1,
  },

  buttonConteiner: {
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 20,
    minHeight: 50,
    borderRadius: 15,
  },

});
