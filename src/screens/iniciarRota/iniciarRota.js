import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { withNavigationFocus } from 'react-navigation'

import Header from '../../components/header/navigationMenu'
import stylesContainer from '../../styles/Modal'
import stylesComponent from '../../styles/componets'
import LoadingButton from '../../components/button/loadingButton'
import ErrorComponent from '../../components/mensagen/error'

import dadosUserStore from '../../api/offline/dadosUser'
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'


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
          style={[stylesComponent.button, stylesComponent.BoxShadow]}
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
          style={[stylesComponent.button, stylesComponent.BoxShadow]}
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
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
    marginHorizontal: 10,
  }
})
