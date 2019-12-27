import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Iniciar from '../registrosView/iniciar'
import Header from '../../components/navigationMenu'
import Modal from '../../styles/Modal';

var turno = '';
var rota = '';

const IniciarDrawer = createStackNavigator({
  Home: {
    screen: Iniciar,
    params: {turno: turno, rota: rota},
    navigationOptions: ({ navigation }) => ({
      title: "Iniciar",
      headerLeft: <Header navigationProps={navigation.toggleDrawer} />,
      headerStyle: {
        backgroundColor: Modal.background.backgroundColor,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    })
  }
})

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turno: JSON.stringify(this.props.navigation.getParam('turno', 'null')),
      rota: JSON.stringify(this.props.navigation.getParam('rota', 'null'))
    }
  }

  componentWillReceiveProps(){
    turnoAux = this.state.turno
    rotaAux = this.state.rota
    this.setState({ turnoAux })
    this.setState({ rotaAux })
    this.turno = turnoAux
    this.rota = rotaAux
    alert(this.turno)
  }

  componentDidMount(){
    turnoAux = this.state.turno
    rotaAux = this.state.rota
    this.turno = turnoAux
    this.rota = rotaAux
  }
  
  static router = IniciarDrawer.router;
  render() {
    const { navigation } = this.props;
    return <IniciarDrawer navigation={navigation}/>;
  }
}



export default DetailsScreen;