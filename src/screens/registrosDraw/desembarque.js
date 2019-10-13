import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Desembarque from '../registrosView/desembarque'
import Header from '../../components/navigationMenu'




const DesembarqueDrawer = createStackNavigator({
  Home: {
    screen: Desembarque,
    navigationOptions: ({ navigation }) => ({
      title: "Desembarque",
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

export default DesembarqueDrawer;