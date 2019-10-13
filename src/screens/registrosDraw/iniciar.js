import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Iniciar from '../registrosView/iniciar'
import Header from '../../components/navigationMenu'

const IniciarDrawer = createStackNavigator({
  Home: {
    screen: Iniciar,
    navigationOptions: ({ navigation }) => ({
      title: "Iniciar",
      headerLeft: <Header navigationProps={navigation.toggleDrawer} />,
      headerStyle: {
        backgroundColor: '#0279be',
      },
      headerTintColor: 'white',
      headerTitleStyle:{
        fontWeight : 'bold'
      }
    })
  }
})

export default IniciarDrawer;