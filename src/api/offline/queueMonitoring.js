import userLocationAPI from '../monitoramento/userLocation'
import dadosLocation from './dadosLocation'
import Netinfo from '@react-native-community/netinfo';

import _ from "lodash";

export default class QueueMonitoring {

  collection = [];
  size = 0;
  isConnected = false;
  netEvent;

  constructor() {
    this.netEvent = Netinfo.addEventListener(state => {
      this.isConnected = state.isConnected
    });
  }

  isEmpty() {
    return this.size == 0
  };

  async print() {
    let x = await dadosLocation.get()
    console.log(x)
  };

  async enqueue(lat, lon) {
    let responseAPI = await userLocationAPI.updateLocation(lat, lon)

    if (responseAPI.error) {
      this.collection.push([lat, lon])
      this.size += 1;
    }

    if (this.collection.length >= 10) {
      let store = await this.storeData()

      if (!store.error) {
        this.collection = [];
        this.size = store.length
      }
      else {
        console.log(store.error)
      }
    }
  };

  async storeCollection() {
    let dados = await dadosLocation.get()

    if (dados.error) {
      dados = []
    }

    dados = dados.concat(this.collection)

    return locationStore = await dadosLocation.set(dados);
  }

  async dequeue() {
    let dados = await dadosLocation.get()
    if (dados.error) {
      return dados
    }

    let dadosElement, responseAPI;

    do {
      dadosElement = dados.shift()
      responseAPI = await userLocationAPI.updateLocation(
        dadosElement[0],
        dadosElement[1]
      );

      this.size = dados.length

    } while (!responseAPI.error && this.size);

    if(responseAPI.error){
      dados = dados.concat(dadosElement)
      return locationStore = await dadosLocation.set(dados);
    }
  };
};

