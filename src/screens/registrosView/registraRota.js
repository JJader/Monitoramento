import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  RefreshControl
} from 'react-native';
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';



import Header from '../../components/navigationMenu'
import PickerItem from '../../components/list/picker'
import LoadingButton from '../../components/button/loadingButton'
import Notes from '../../components/input/inputVertical'

class RegistraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {

      id: this.props.navigation.getParam('id', 'null'),
      shift: '',
      vehicle: '',
      route: '',
      notes: '',

      routesJson: [{ id: 0, value: 'Null' }],
      shiftJson: [{ id: 0, value: 'Null' }],
      vehicleJson: [{ id: 0, value: 'Null' }],

      loading: false
    };
  }

  componentWillUpdate(newProps) { // esse componente é construido sempre que os props são modificados
    //alert(JSON.stringify(newProps.navigation.state.params.dadosRota))
    let oldId = this.state.id
    const id = newProps.navigation.getParam('id', 'null')

    if (oldId != id) {
      this.setState({ id })
    }
  }

  updateNotes = (notes) => {
    this.setState({ notes })
  };

  // modificar essa função para chamar todos os try catchs das funçoes de rotas 
  ScrollRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.loading}
        onRefresh={() => this.onRefresh()}
      />
    )
  }

  async rotaServe() {
    let link = URL_API + '/rotas.json'
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ routesJson: dataJson.rotas });
      console.log("Rotas okay");
    }
    catch (error) {
      alert("Ops !! alguma coisa errada na rotaServer")
      return console.log(error);
    } //to catch the errors if any
  }

  async turnoServe() {
    let link = URL_API + '/turnos.json'
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ shiftJson: dataJson.turnos });
      console.log("Turno okay");
    }
    catch (error) {
      alert("Ops !! alguma coisa errada no turnoServer")
      return console.log(error);
    } //to catch the errors if any
  }

  async veiculoServe() {
    let link = URL_API + '/veiculos.json'
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ vehicleJson: dataJson.veiculos });
      console.log("Veiculo okay");
    }
    catch (error) {
      alert("Ops !! alguma coisa errada veiculoServer")
      return console.log(error);
    } //to catch the errors if any
  }

  acionandoServe() {
    this.turnoServe()
    this.rotaServe()
    this.veiculoServe()
    this.setState({ refreshing: false })
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
      notes: this.state.notes,
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

  callNewScreen(mapDate){
    this.props.navigation.navigate('Iniciar', {
      id: mapDate.id,
      turno: mapDate.turno,
      rota: mapDate.rota,
      veiculo: mapDate.veiculo
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
              dates={this.state.routesJson}
              text={"TURNO:"}
              iconName={"ios-partly-sunny"}
            />

            <PickerItem
              dates={this.state.shiftJson}
              text={"ROTA:"}
              iconName={"md-git-network"}
            />

            <PickerItem
              dates={this.state.vehicleJson}
              text={"VEÍCULO:"}
              iconName={"ios-bus"}
            />

            <View style={{ flex: 4 }}>
              <Notes
                text="Notas: "
                secureText={false}
                updateParameter={this.updateNotes}
              />
            </View>

          </KeyboardAvoidingView >

          <LoadingButton
            onPress={() => this.buttonEnterEvent()}
            text={"Iniciar Rota"}
            loading={this.state.loading}
          />

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

});