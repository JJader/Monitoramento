import React, { Component } from 'react';
import { BackHandler, View, ScrollView, RefreshControl } from 'react-native';

import Mensagem from '../../components/mensagen/error';
import Header from '../../components/header/navigationMenu'
import LoadingButton from '../../components/button/loadingButton'

import QueueMonitoring from '../../api/offline/queueMonitoring'
import QueueStudent from '../../api/offline/queueStudent'
import dadosUserAPI from '../../api/offline/dadosUser'

import stylesComponent from '../../styles/componets'
import stylesContainer from '../../styles/Modal';

let monitoring = new QueueMonitoring();
let student = new QueueStudent();

export default class exit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      refreshing: false,
    };
  }

  async componentDidMount() {
    await this.onRefresh()
  }

  async onRefresh() {
    this.setState({ refreshing: true })

    await this.dequeueAllFiles()
    await this.updateIsReady()

    if (this.state.isReady) {
      await this.deletInformation()
    }

    this.setState({ refreshing: false })
  }

  async dequeueAllFiles() {
    await monitoring.dequeue()
    await student.dequeue()
  }

  async updateIsReady() {
    let isReadyMoni = await monitoring.isEmpty()
    let isReadyStud = await student.isEmpty()
    let isReady = isReadyMoni && isReadyStud

    this.setState({ isReady })
  }

  async pressButton(){
    await this.deletInformation()
    this.setState({isReady: true})
  }

  async deletInformation() {
    await dadosUserAPI.delet()
    await monitoring.deletArq()
    await student.deletArq()
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
      />
    )
  }

  showError() {
    return (
      <ScrollView contentContainerStyle={stylesContainer.conteiner}
        refreshControl={this.refreshControl()}
      >
        <Mensagem
          title={"some information was not sent, please update this screen"}
        />

        <View style={[stylesComponent.button, stylesComponent.BoxShadow]}>
          <LoadingButton
            onPress={() => this.pressButton()}
            text={"delet anyway"}
            loading={this.state.refreshing}
          />
        </View>

      </ScrollView>
    )
  }

  render() {
    return (
      <View style={stylesContainer.background}>
        <Header title="Sair" navigationProps={this.props.navigation.toggleDrawer} />

        {this.state.isReady ? BackHandler.exitApp() : this.showError()}

      </View>
    )
  }
}
