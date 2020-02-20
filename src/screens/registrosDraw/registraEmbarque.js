import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import registraEmbarque from '../registrosView/Embarque/registraEmbarque'
import Header from '../../components/navigationMenu'

const registraEmbarqueDrawer = createStackNavigator({
  Home: {
    screen: registraEmbarque,
    navigationOptions: ({ navigation }) => ({
      title: "Embarque",
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

export default registraEmbarqueDrawer;