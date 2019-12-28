import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Iniciar from '../registrosView/iniciar'
import Desembarque from '../registrosView/desembarque'
import Header from '../../components/navigationMenu'
import Modal from '../../styles/Modal';

var dadosRota = [{
  turno : '',
  rota : '',
  rua : '',
  numero : '',
  bairro : '',
}]

const IniciarDrawer = createStackNavigator({
  Home: {
    screen: Iniciar,
    params: { dadosRota: dadosRota },
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
  },
})

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosRota: this.props.navigation.getParam('dadosRota', 'null'),
      /*turno: '',
      rota: '',
      rua: '',
      bairro: '',
      numero: '',
      */
    }
  }

  atualizarProps = (dadosParam) => {
      this.dadosRota = dadosParam
    //alert(JSON.stringify(this.state.dadosRota))
  }

  componentWillReceiveProps(newProps) { // esse componente é construido sempre que os props são modificados
    //alert(JSON.stringify(newProps.navigation.state.params.dadosRota))
    let oldDados = this.state.dadosRota
    const { dadosRota } = newProps.navigation.state.params

    if (dadosRota[0].turno != oldDados[0].turno ||
      dadosRota[0].rota != oldDados[0].rota ||
      dadosRota[0].rua != oldDados[0].rua ||
      dadosRota[0].bairro != oldDados[0].bairro ||
      dadosRota[0].numero != oldDados[0].numero
    ) {
      this.setState({ dadosRota: dadosRota })
      this.atualizarProps(dadosRota)
      this.props.navigation.navigate('Home', {
        dadosRota : dadosRota
      });
    }
    
  }

  componentDidMount(){
    //alert(JSON.stringify(this.state.dadosRota))
    this.atualizarProps(this.state.dadosRota)
  }

  static router = IniciarDrawer.router;
  render() {
    const { navigation } = this.props;
    return <IniciarDrawer navigation={navigation} />;
  }
}



export default DetailsScreen;