import React, { Component } from 'react';
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';

import stylesContainer from '../../../styles/Modal'
import stylesComponets from '../../../styles/componets';
import stylesText from '../../../styles/text';

import BotaoDesembarque from './botaoDesebarque';

import _ from "lodash";

class desembarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshServer : false,
      refreshFlat: false,
      
      chegadasJson: [
          {
            id: 0,
            value: 'null',
            status: 'null',
            lat: 'null',
            lon: 'null'
          }
        ],

    };
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  async chegadaServe(){
    let link = URL_API + '/chegadas.json' 
    try {
      const data = await fetch(link);
      const dataJson = await data.json();
      this.setState({ chegadasJson: dataJson.chegadas });
      console.log("Chegada okay");
      console.log();
      
      this.setState({refreshServer: false})
    }
    catch (error) {
      alert("Ops !! alguma coisa errada no chegadaServe")
      this.setState({refreshServer: false})
      return console.log(error);
    } //to catch the errors if any
  }

  onRefreshFlat(){
    this.setState({refreshFlat : !this.state.refreshFlat})
  }

  onRefreshServer(){
    this.setState({refreshServer: true})
    this.onRefreshFlat()
    this.wait(2000).then(() => this.chegadaServe())
  }

  async enviarServer(index){
    let link = URL_API + '/chegadas.json' 

        let dado = this.state.chegadasJson[index]
        const dados =  {
          id : dado.id,
          status: dado.status,
        }
        try{
          const response = await fetch(link, {
            method: 'POST', // or 'PUT'
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
          });
          let responseJson = await response.json();
          
          if (response.ok){
            alert("destino registrado com sucesso")
          }
        }
        catch (error) {
          alert("Ops !! alguma coisa errada no submeter_chegada")
          console.log(error);
          return false
        }
  }

  mudarChegada(index, status){
    let data = _.cloneDeep(this.state.chegadasJson)
    data[index].status = status
    this.setState({chegadasJson: data})

    if (index > 0 && status){
      this.enviarServer(index - 1)
    }

    if (index == data.length - 1){
      this.enviarServer(index)
    }
  }


  render() {
    return (
      <View style={stylesContainer.background}>
        <ScrollView contentContainerStyle={stylesContainer.conteiner}
          refreshControl={<RefreshControl refreshing={this.state.refreshServer} onRefresh={() => this.onRefreshServer()}/>}>
          <FlatList  
            keyExtractor={item => String(item.id)}
            data={this.state.chegadasJson}
            extraData = {this.state.refreshFlat}
            renderItem={
              ({ item, index }) => {
                return (
                <BotaoDesembarque 
                  nome={item.value} 
                  index = {index} 
                  mudarChegada = {(index, status) => this.mudarChegada(index, status) }
                  />
                
                )
              }
            } />
        </ScrollView>
      </View>


    );
  }
}

export default desembarque;
