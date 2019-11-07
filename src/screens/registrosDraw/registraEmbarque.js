import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import registraEmbarque from '../registrosView/registraEmbarque'
import Header from '../../components/navigationMenu'
import Modal from '../../styles/Modal';

const registraEmbarqueDrawer = createStackNavigator({
  Home: {
    screen: registraEmbarque,
    navigationOptions: ({ navigation }) => ({
      title: "Embarque",
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

export default registraEmbarqueDrawer;