import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { withNavigationFocus } from 'react-navigation'

import Header from '../../components/header/navigationMenu'
import stylesContainer from '../../styles/Modal'
import LoadingButton from '../../components/button/loadingButton'
import ErrorComponent from '../../components/mensagen/error'

import dadosUserStore from '../../api/offline/dadosUser'
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'

class desembarcar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: false,
      teste: true,
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
        return true
      }
    }

    this.setState({ work: undefined })
  }

  returnView() {

    if (this.state.work) {
      return this.workTrue()
    }
    else {
      return this.showError()
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
            source={require("../../assets/arrive/arrive.png")}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        </View>

        <LoadingButton
          style={[styles.buttonConteiner, styles.BoxShadow]}
          onPress={() => this.arriveOnSchool()}
          text={"Disembark"}
        />
      </View>
    )
  }

  async arriveOnSchool() {
    this.props.navigation.navigate('Iniciar', {
      stop: this.props.navigation.getParam('index', null)
    })
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header
          title="Desembarcar"
          navigationProps={this.props.navigation.toggleDrawer}
        />

        {this.returnView()}

      </View>
    );
  }
}

export default withNavigationFocus(desembarcar);

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
    padding: 40,
    marginHorizontal: 10,
  }
})
