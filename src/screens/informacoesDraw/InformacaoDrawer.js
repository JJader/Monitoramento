import React from 'react';
import { createStackNavigator, } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons';

import Alunos from '../informacoesView/alunosRota'
import Escolas from '../informacoesView/escolasAtendidas'
import Header from '../../components/navigationMenu'

const InformacaoDrawer = createBottomTabNavigator({
  AlunosButtom: {
    screen: Alunos,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Alunos",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name="md-school"
          size={35}
          color={tintColor}
          style={{ marginLeft: 10, }} />
      ),
    })
  },
  EscolaButtom: {
    screen: Escolas,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Escolas",
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name="ios-business"
          size={35}
          color={tintColor}
          style={{ marginLeft: 10, }} />
      ),
    })
  }

})

export default createStackNavigator({
  InformacaoScreen: {
    screen: InformacaoDrawer,
    navigationOptions: ({ navigation }) => ({
      title: "Informações",
      headerLeft: <Header navigationProps={navigation.toggleDrawer} />,
      headerStyle: {
        backgroundColor: '#0279be',
      },
      headerTintColor: 'white',
    })
  },
})