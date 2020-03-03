import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import registraRota from '../registrosView/registraRota'
import Header from '../../components/navigationMenu'


var id = ''
const RegistraRotaDrawer = createStackNavigator({
  Home: {
    screen: registraRota,
    params: {id : id},
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

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('id', 'null'),
    }
  }

  atualizarProps = (idParam) => {
    id =  idParam
    console.log(id);
  }

  componentWillReceiveProps(newProps) { // esse componente é construido sempre que os props são modificados
    //alert(JSON.stringify(newProps.navigation.state.params.id))
    let oldId = this.state.id
    //console.log(oldId);
    
    const { id } = newProps.navigation.state.params

    if (oldId != id) {
      this.setState({ id })
      this.atualizarProps(id)
      this.props.navigation.navigate('RegistraR', {id : id});
    }
    
  }

  componentDidMount(){
    //alert(JSON.stringify(this.state.dadosRota))
    this.atualizarProps(this.state.id)
    alert(JSON.stringify(id))
    //console.log(this.state.id);
    
  }

  static router = RegistraRotaDrawer.router;
  render() {
    const { navigation } = this.props;
    return <RegistraRotaDrawer navigation={navigation} />;
  }
}

export default DetailsScreen;