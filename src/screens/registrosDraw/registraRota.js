import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import registraRota from '../registrosView/registraRota'
import Header from '../../components/navigationMenu'

const registraRotaDrawer = createStackNavigator({
  Home: {
    screen: registraRota,
    navigationOptions: ({ navigation }) => ({
      title: "Registrar rota",
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

export default registraRotaDrawer;