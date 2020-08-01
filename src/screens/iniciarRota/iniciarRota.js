import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { withNavigationFocus } from 'react-navigation'

import Header from '../../components/header/navigationMenu'
import stylesContainer from '../../styles/Modal'
import LoadingButton from '../../components/button/loadingButton'
import ErrorComponent from '../../components/mensagen/error'

import dadosUserStore from '../../api/offline/dadosUser'
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'
import queueMonitoring from '../../api/offline/queueMonitoring'

class iniciarRota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: false,
      teste: false,
    };
  }

  async componentDidMount() {
    await this.updateWork()
  }

  async componentWillUpdate(param) {
    let work = this.state.work

    if (param.isFocused && work == undefined) {
      await this.updateWork()
    }
  }

  async updateWork() {
    let dadosUser = await dadosUserStore.get()

    if (!dadosUser.error && dadosUser.idDailyPlanning != undefined) {
      if (dadosUser.controleDeTurno == 'TS') {
        this.setState({ work: true })
      }
      else {
        this.setState({ work: false })
      }
    }

    else {
      this.setState({ work: undefined })
    }
  }

  returnView() {
    if (this.state.work == undefined) {
      return this.showError()
    }

    else if (this.state.work == true) {
      return this.workTrue()
    }

    else {
      return this.workFalse()
    }
  }

  showError() {
    return (
      <View style={stylesContainer.conteiner}>
        <ErrorComponent title={"This screen is not available"} />
      </View>
    )
  }

  workTrue() {
    return (
      <View style={stylesContainer.conteiner}>
        <View style={styles.imgView}>
          <Image
            source={require("../../assets/start/map2G.png")}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        </View>

        <LoadingButton
          style={[styles.buttonConteiner, styles.BoxShadow]}
          onPress={() => this.stopWork()}
          text={"Stop route"}
          loading={false}
        />
      </View>
    )
  }

  async stopWork() {
    let status = await dailyPlanAPI.changeDailyPlanStatus(false)
    console.log(status);

    if ((!status.error && status == 'TF') || this.state.teste) {
      this.setState({ work: false })
      alert("You stopped work")
      this.props.navigation.navigate("Iniciar", { isWork: false });
      this.props.navigation.navigate("IniciarRota")
    }
    else {
      alert(status.error)
    }
  }

  workFalse() {
    return (
      <View style={stylesContainer.conteiner}>
        <View style={styles.imgView}>
          <Image
            source={require("../../assets/start/map2R.png")}
            style={{ flex: 2 }}
            resizeMode="contain"
          />
        </View>

        <LoadingButton
          style={[styles.buttonConteiner, styles.BoxShadow]}
          onPress={() => this.startWork()}
          text={"Start route"}
          loading={false}
        />
      </View>
    )
  }

  async startWork() {
    let status = await dailyPlanAPI.changeDailyPlanStatus(true)
    console.log(status);

    if ((!status.error && status == 'TS') || this.state.teste) {
      this.setState({ work: true })
      alert("You are working")
      this.props.navigation.navigate("Iniciar", { isWork: true });
    }
    else {
      alert(status.error)
    }
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header
          title="Iniciar rota"
          navigationProps={this.props.navigation.toggleDrawer}
        />

        {this.returnView()}

      </View>
    );
  }
}

export default withNavigationFocus(iniciarRota);

const styles = StyleSheet.create({
  buttonConteiner: {
    flex: 1,
    backgroundColor: stylesContainer.background.backgroundColor,
    borderRadius: 15,
    marginVertical: 20,
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

  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 7,
    marginHorizontal: 10,
  }
})
