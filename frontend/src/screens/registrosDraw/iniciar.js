import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Iniciar from '../registrosView/iniciar'
import Header from '../../components/navigationMenu'
import Modal from '../../styles/Modal';

const IniciarDrawer = createStackNavigator({
  Home: {
    screen: Iniciar,
    navigationOptions: ({ navigation }) => ({
      title: "Iniciar",
      headerLeft: <Header navigationProps={navigation.toggleDrawer} />,
      headerStyle: {
        backgroundColor: Modal.background.backgroundColor,
      },
      headerTintColor: 'white',
      headerTitleStyle:{
        fontWeight : 'bold'
      }
    })
  }
})

export default IniciarDrawer;