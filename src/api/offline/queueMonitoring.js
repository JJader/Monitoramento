import userLocationAPI from '../monitoramento/userLocation'
import dadosLocation from './dadosLocation'
import Netinfo from '@react-native-community/netinfo';

import _ from "lodash";

export default class QueueMonitoring {

  collection = [];
  first = [];
  size = 0;
  isConnected = false;
  isStartNow = true;

  netEvent;

  constructor() {
    this.netEvent = Netinfo.addEventListener(state => {
      this.isConnected = state.isConnected
    });
  }

  async print() {
    let x = await dadosLocation.get()
    console.log(x)
  };

  async isEmpty() {
    let x = await dadosLocation.get()
    if (x.error) {
      return true
    }
    else {
      return x.length == 0
    }
  }

  async enqueue(lat, lon) {

    if (this.isStartNow){
      await this.dequeue()
      this.isStartNow = false;
    }

    this.collection.push([lat, lon])
    
    if (this.collection.length > 10) {
      await this._storeColletion()
    }

    if (this.first.length == 0){
      this.first = [lat,lon]
    }

    let responseAPI = await this.sendElementToServer(this.first)

    if (responseAPI.error) {
      console.log(responseAPI.error)
      return responseAPI
    }

    if (this.size && this.isConnected) {
      this.size = await this.dequeue()
    }

    if (this.isConnected) {
      this.collection = await this._dequeueArray(this.collection)
    }
  };

  async dequeue() {
    
    let dados = await dadosLocation.get()
    if (dados.error) {
      console.log(dados.error)
      return dados
    }
   
    dados = await this._dequeueArray(dados)

    dados = await dadosLocation.set(dados);
    console.log(dados)
    if (!dados.error) {
      this.size = dados.length
      this.first = dados.slice(0, 1)
    }
    else {
      console.log(store.error)
    }
    
  }

  async _dequeueArray(arrayParam) {
    while (arrayParam.length) {

      let first = arrayParam.shift()
      let responseAPI = await this.sendElementToServer(first)

      if (responseAPI.error) {
        console.log(responseAPI.error)
        arrayParam.unshift(first)
        break
      }
    }

    return arrayParam
  }

  async sendElementToServer(element) {
    return await userLocationAPI.updateLocation(
      element[0],
      element[1]
    );
  }

  async _storeColletion() {
    let dados = await this._storeArray(this.collection)

    if (!dados.error) {
      this.collection = []
      this.size = dados.length
      this.first = dados.slice(0, 1)
    }
    else {
      console.log(store.error)
    }
  }

  async _storeArray(arrayParam) {
    let dados = await dadosLocation.get()

    if (dados.error) {
      dados = []
    }
    
    dados = dados.concat(arrayParam)
    return await dadosLocation.set(dados);
  }

  async deletArq() {
    await dadosLocation.delet()
  }

};

