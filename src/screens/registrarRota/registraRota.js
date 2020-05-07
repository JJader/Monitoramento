import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl
} from 'react-native';

import stylesContainer from '../../styles/Modal';

import Header from '../../components/navigationMenu'
import PickerItem from '../../components/list/picker'
import LoadingButton from '../../components/button/loadingButton'
import Notes from '../../components/input/inputVertical'

class RegistraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {

      id: 1,
      token: '',

      shift: '',
      vehicle: '',
      route: '',
      notes: '',

      routesJson: [{ id: 0, value: 'Null' }],
      shiftsJson: [{ id: 0, value: 'Null' }],
      vehiclesJson: [{ id: 0, value: 'Null' }],

      loading: false
    };
  }

  componentWillUpdate(newProps) {
    try {
      const id = newProps.navigation.getParam('id', null)
      this.updateId(id)

      const token = newProps.navigation.getParam('token', null)
      this.updateToken(token)
    }
    catch (error) {

    }
  }

  updateId = (id) => {
    if (id != this.state.id && id != null) {
      this.setState({ id })
    }
  };

  updateToken = (token) => {
    if (token != this.state.token && token != null) {
      this.setState({ token })
    }
  };

  updateNotes = (notes) => {
    this.setState({ notes })
  };

  updateVehicle = (vehicle) => {
    this.setState({ vehicle })
  };

  updateRoute = (route) => {
    this.setState({ route })
  };

  updateShift = (shift) => {
    this.setState({ shift })
  };

  ScrollRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={() => { this.callAllUpdatesJson() }
        }
      />
    )
  }

  async callAllUpdatesJson() {
    this.setState({ loading: true })
    await this.updateRoutesJson()
    await this.updateShiftsJson()
    await this.updateVehiclesJson()
    this.setState({ loading: false })
  }

  async updateRoutesJson() {
    let routesJson = await this.callRouteServer()

    if (!routesJson.error) {
      this.setState({ routesJson: routesJson.rotas })
    }
    else {
      alert(routesJson.error)
    }
  }

  async callRouteServer() {
    let responseJson = {}

    try {
      responseJson = await this.returnRouteList()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async returnRouteList() {
    let link = URL_API + '/rotas.json'

    const routes = await fetch(link);
    const routesJson = await routes.json();

    return routesJson
  }

  async updateShiftsJson() {
    let shiftsJson = await this.callShiftServer()

    if (!shiftsJson.error) {
      this.setState({ shiftsJson: shiftsJson.turnos })
    }
    else {
      alert(shiftsJson.error)
    }
  }

  async callShiftServer() {
    let responseJson = {}

    try {
      responseJson = await this.returnShiftList()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the server"
      }
    }

    return responseJson
  }

  async returnShiftList() {
    let link = URL_API + '/turnos.json'

    const shifts = await fetch(link);
    const shiftsJson = await shifts.json();

    return shiftsJson

  }

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
      token: this.state.token,
    })
  }

  render() {
    return (

      <View style={stylesContainer.background}>

        <Header title="Registrar rota"
          navigationProps={this.props.navigation.toggleDrawer}
        />

        <ScrollView contentContainerStyle={stylesContainer.conteiner}
          refreshControl={this.ScrollRefreshControl()}
        >

          <KeyboardAvoidingView style={styles.viewPicker} behavior="height" enabled>

            <PickerItem
              dates={this.state.shiftsJson}
              text={"TURNO:"}
              iconName={"ios-partly-sunny"}
              onValueChange={this.updateShift}
            />

            <PickerItem
              dates={this.state.routesJson}
              text={"ROTA:"}
              iconName={"md-git-network"}
              onValueChange={this.updateRoute}
            />

            <PickerItem
              dates={this.state.vehiclesJson}
              text={"VEÍCULO:"}
              iconName={"ios-bus"}
              onValueChange={this.updateVehicle}
            />

            <View style={{ flex: 4 }}>
              <Notes
                text="Notas: "
                secureText={false}
                updateParameter={this.updateNotes}
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