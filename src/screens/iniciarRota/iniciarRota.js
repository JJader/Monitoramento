import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import HeaderImg from '../../components/header/logoHeader'
import Header from '../../components/header/navigationMenu'
import stylesContainer from '../../styles/Modal'
import LoadingButton from '../../components/button/loadingButton'

import dadosUserStore from '../../api/offline/dadosUser'
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'
import queueMonitoring from '../../api/offline/queueMonitoring'

export default class iniciarRota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: false
    };
  }

  async componentDidMount() {
    let statusDaily = await dailyPlanAPI.verifyDailyPlanning()

    let x = new queueMonitoring()
  }

  returnView() {
    return (
      this.state.work ?
        this.workTrue()
        :
        this.workFalse()
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

    if (!status.error && status == 'TF') {
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
            style={{ flex: 1 }}
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

    if (!status.error && status == 'TS') {
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

const styles = StyleSheet.create({
  buttonConteiner: {
    backgroundColor: stylesContainer.background.backgroundColor,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: stylesContainer.background.backgroundColor,
  },

  BoxShadow: {
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
