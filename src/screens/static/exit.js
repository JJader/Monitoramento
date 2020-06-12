import React, { Component } from 'react';
import { BackHandler, View, ScrollView, RefreshControl } from 'react-native';
import Netinfo from '@react-native-community/netinfo';

import Mensagem from '../../components/mensagen/error';
import Header from '../../components/header/navigationMenu'

import QueueMonitoring from '../../api/offline/queueMonitoring'
import QueueStudent from '../../api/offline/queueStudent'
import dadosUserAPI from '../../api/offline/dadosUser'

import stylesContainer from '../../styles/Modal';

let monitoring = new QueueMonitoring();
let student = new QueueStudent();

export default class exit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isConnected: false,
      refreshing: false,
    };
  }

  async onRefresh() {
    this.setState({ refreshing: true })
    let { isConnected, isReady } = this.state

    if (isConnected && !isReady) {
      await monitoring.dequeue()
      await student.dequeue()
      await dadosUserAPI.delet()

      await this.updateIsReady()
    }

    this.setState({ refreshing: false })
  }

  async componentDidMount() {
    this.netEvent = Netinfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected })
    });

    await this.updateIsReady()
  }

  async updateIsReady() {
    let isReadyMoni = await monitoring.isEmpty()
    let isReadyStud = await student.isEmpty()
    let isReady = isReadyMoni && isReadyStud

    console.log(isReadyMoni)
    console.log(isReadyStud)

    this.setState({ isReady })
  }

  showError() {
    return (
      <ScrollView contentContainerStyle={stylesContainer.conteiner}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }
      >
        <Mensagem
          title={"there is some unsent information"}
        />

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
