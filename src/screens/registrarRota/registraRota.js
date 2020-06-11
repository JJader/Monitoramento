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
import vehicleAPI from '../../api/registrarRota/vehicleServer'
import dadosUserStore from '../../api/offline/dadosUser'
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'

class RegistraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {

      id: 1,
      shift: '',
      vehicle: '',
      route: '',
      notes: '',

      routesJson: [{ name: 'NULL', value: '' }],
      vehiclesJson: [{ name: 'NULL', value: '' }],
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

  async componentDidMount() {
    let statusDaily = await dailyPlanAPI.verifyDailyPlanning()
    this.callNewScreen(statusDaily, true)
  }

  updateNotes(notes) {
    this.setState({ notes })
  };

  async updateShift(shift) {
    if (shift != '') {
      let dadosUser = await this.updateUserShifts(shift)
      if (dadosUser.error) {
        alert(dadosUser.error)
      }
      else {
        await this.updateRoutesJson()
        await this.updateVehiclesJson()
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

  async updateRoutesJson() {
    let routesJson = await routeAPI.routeServer()

    if (!routesJson.error) {
      this.setState({ routesJson })
    }
    else {
      alert(routesJson.error)
    }
  }

  async updateVehiclesJson() {
    let vehiclesJson = await vehicleAPI.vehicleServer()

    if (!vehiclesJson.error) {
      this.setState({ vehiclesJson })
    }
    else {
      alert(vehiclesJson.error)
    }
  }

  updateRoute(route) {
    this.setState({ route })
  };

  updateVehicle(vehicle) {
    this.setState({ vehicle })
  };

  async buttonEnterEvent() {
    let { route, vehicle, notes } = this.state
    if (route == '' || vehicle == '') {
      this.setState({ loading: false })
      return false
    }

    let mapDate = await dailyPlanAPI.submit(route, vehicle, notes)

    if (!mapDate.error) {
      let response = await this.updateDadosUser(mapDate)
      this.callNewScreen(response)
    }
    else {
      alert(mapDate.error)
      this.setState({ loading: false })
    }
  }

  async updateDadosUser(response) {
    let dadosUser = await dadosUserStore.get()
    dadosUser.idDailyPlanning = response.id;
    dadosUser.idTrip = response.id_trip
    dadosUser.idVehicle = this.state.vehicle

    return await dadosUserStore.set(dadosUser)
  }

  callNewScreen(response, alert) {
    if (response.error) {
      if (!alert) {
        alert(response.error)
      }
    }
    else {
      this.props.navigation.navigate('IniciarRota')
    }
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

            <Notes
              style={{ flex: 4 }}
              text="Notas: "
              secureText={false}
              updateParameter={(notes) => this.updateNotes(notes)}
            />

          </KeyboardAvoidingView >

          <View style={[styles.buttonConteiner, styles.BoxShadow]}>
            <LoadingButton
              onPress={() => this.buttonEnterEvent()}
              text={"Registrar rota"}
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

  BoxShadow: {
    borderColor: stylesContainer.background.backgroundColor,
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 6,
  },

});
