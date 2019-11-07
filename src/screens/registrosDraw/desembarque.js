import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Desembarque from '../registrosView/desembarque'
import Header from '../../components/navigationMenu'
import Modal from '../../styles/Modal';



const DesembarqueDrawer = createStackNavigator({
  Home: {
    screen: Desembarque,
    navigationOptions: ({ navigation }) => ({
      title: "Desembarque",
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

export default DesembarqueDrawer;