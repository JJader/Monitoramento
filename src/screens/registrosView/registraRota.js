import React, { Component } from 'react';
import { View, 
         Text, 
         Picker, 
         StyleSheet, 
         TouchableOpacity, 
         TextInput, 
         KeyboardAvoidingView,
         ScrollView,
         RefreshControl } from 'react-native';
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import stylesContainer from '../../styles/Modal';

import { Ionicons } from '@expo/vector-icons';

import Header from '../../components/navigationMenu'

class RegistraRota extends Component {
  constructor(props) {
    super(props);
    this.state = {

      id: this.props.navigation.getParam('id', 'null'),
      turno: '',
      veiculo: '',
      rota: '',
      nota: '',
      
      rotasJson: [{id: 0, value:'Null'}],
      turnosJson: [{id: 0, value:'Null'}],
      veiculosJson: [{id: 0, value:'Null'}],

      refreshing: false,
    };
  }
  
  componentWillUpdate(newProps) { // esse componente é construido sempre que os props são modificados
    //alert(JSON.stringify(newProps.navigation.state.params.dadosRota))
    let oldId = this.state.id
    const { id } = newProps.navigation.state.params

    if (oldId != id) {
      this.setState({ id })
    }
  }

  async rotaServe(){
    let link = URL_API + '/rotas.json' 
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ rotasJson: dataJson.rotas });
      console.log("Rotas okay");
    }
    catch (error) {
      alert("Ops !! alguma coisa errada na rotaServer")
      return console.log(error);
    } //to catch the errors if any
    }

    async turnoServe(){
      let link = URL_API + '/turnos.json' 
      try {
        const data = await fetch(link);
        const dataJson = await data.json();
        this.setState({ turnosJson: dataJson.turnos });
        console.log("Turno okay");
      }
      catch (error) {
        alert("Ops !! alguma coisa errada no turnoServer")
        return console.log(error);
      } //to catch the errors if any
      }

      async veiculoServe(){
        let link = URL_API + '/veiculos.json' 
        try {
          const data = await fetch(link);
          const dataJson = await data.json();
          this.setState({ veiculosJson: dataJson.veiculos });
          console.log("Veiculo okay");
        }
        catch (error) {
          alert("Ops !! alguma coisa errada veiculoServer")
          return console.log(error);
        } //to catch the errors if any
        }

      acionandoServe(){
        this.turnoServe()
        this.rotaServe()
        this.veiculoServe()
        this.setState({refreshing: false})
      }

      wait(timeout) {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

      onRefresh(){
        this.setState({refreshing: true})
        this.wait(2000).then(() => this.acionandoServe())
      }

      async submeter(){
        let link = URL_API + '/registrar/rota' 
        const rotas = { 
            id : this.state.id,
            turno: this.state.turno,
            rota: this.state.rota,
            veiculo: this.state.veiculo,
            nota: this.state.nota, 
        };

        try{
          const response = await fetch(link, {
            method: 'POST', // or 'PUT'
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rotas),
          });
          if (response.ok){
            alert("Rota registrada");
            this.props.navigation.navigate('Iniciar', {
              id : rotas.id, 
              turno: rotas.turno,
              rota : rotas.rota,
              veiculo: rotas.veiculo
            })
          }
        }
        catch (error) {
          alert("Ops !! alguma coisa errada no submeter_Rota")
          return console.log(error);
        }
      }
  componentDidMount(){
    alert(this.state.id)
    console.log(this.state.id)
    alert(JSON.stringify(this.props.navigation.state.params))
  }
  render() {
    return (
      
      <View style={stylesContainer.background}>
        <Header title = "Registrar rota" navigationProps={this.props.navigation.toggleDrawer}/>
        <ScrollView contentContainerStyle={stylesContainer.conteiner} 
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()}/>}>

          <View style={{ flex: 1 , marginHorizontal: 10, justifyContent: 'space-between'}}>
            <View style={styles.viewPicker}>

              <View style={styles.viewVeiculo}>
                <Ionicons
                  name="ios-partly-sunny"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.turno}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ turno: itemValue })
                  }>
                  <Picker.Item label="TURNO: " value="" />
                  {this.state.turnosJson.map((item,index) => {
                    return (<Picker.Item label={"   " + item.value} value={item.value} key={item.id} />)
                  })}
                </Picker>
              </View>

              <View style={styles.viewVeiculo}>
                <Ionicons
                  name="md-git-network"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.rota}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ rota: itemValue })
                  }>
                  <Picker.Item label="ROTA: " value="" />
                  {this.state.rotasJson.map((item,index) => {
                    return (<Picker.Item label={"   " + item.value} value={item.value} key={item.id} />)
                  })}
                </Picker>
              </View>

              <View style={styles.viewVeiculo}>
                <Ionicons
                  name="ios-bus"
                  size={35}
                  style={styles.icon} />
                <Picker
                  selectedValue={this.state.veiculo}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ veiculo: itemValue })
                  }>
                  <Picker.Item label="VEÍCULO: " value="" />
                  {this.state.veiculosJson.map((item,index) => {
                    return (<Picker.Item label={"   " + item.value} value={item.value} key={item.id} />)
                  })}
                </Picker>
              </View>

            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
              <Text style={stylesText.text}>Notas</Text>
              <TextInput
                style={styles.TextInput}
                onChangeText={text => this.setState({ nota: text })}
                value={this.state.nota}
              />
            </KeyboardAvoidingView >
          </View>

          <TouchableOpacity
            onPress={
              () => this.submeter()}
            style={{ marginVertical: 10 }}>
            <View style={stylesComponets.botao}>
              <Text style={stylesText.cabecalho}>Iniciar rota</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        
      </View>
    );
  }
}

export default RegistraRota;

const styles = StyleSheet.create({
  viewPicker: {
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent:"stretch",
    flex: 1,
    
  },

  viewVeiculo: {
    alignItems: "stretch",
    justifyContent: 'space-between',
    alignContent: 'stretch',
    backgroundColor: '#0279be',
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: "5%",
    flex: 1, 
  },
  pickerStyle: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
  },

  TextInput: {
    minHeight: 100,
    flex: 1,
    borderColor: '#0279be',
    borderWidth: 3,
    marginRight: '40%',
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: 'white'
  }
});