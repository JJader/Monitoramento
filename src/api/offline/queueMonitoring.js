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

    this.collection.push([lat, lon])

    if (this.size && this.isConnected) {
      this.size = await this.dequeue()
    }
    else if (this.isConnected) {
      let responseAPI = await this._trySendFirstElement()

      if (responseAPI.error) {
        await this._tryStoreCollection()
      }
    }
    else {
      await this._tryStoreCollection()
    }
  };

  async _trySendFirstElement() {
    let first = this.collection.shift()
    let responseAPI = await userLocationAPI.updateLocation(
      first[0],
      first[1]
    );

    if (responseAPI.error) {
      this.collection.unshift(first)
    }

    return responseAPI
  }

  async dequeue() {
    let dados = await this._tryStoreCollection()
    if (dados.error) {
      return dados
    }

    let dadosElement, responseAPI;
    let size = dados.length

    while (size) {
      dadosElement = dados.shift()
      responseAPI = await userLocationAPI.updateLocation(
        dadosElement[0],
        dadosElement[1]
      );

      size = dados.length

      if (responseAPI.error) {
        dados.unshift(dadosElement)
        break;
      }
    }

    await dadosLocation.set(dados);
    return dados.length
  };

  async _tryStoreCollection() {
    let store = await this._storeCollection()

    if (!store.error) {
      this.collection = [];
      this.size = store.length
    }

    return store

  }

  async _storeCollection() {
    let dados = await dadosLocation.get()

    if (dados.error) {
      dados = []
    }

    if (this.collection.length) {
      dados = dados.concat(this.collection)
    }

    return locationStore = await dadosLocation.set(dados);
  }

  async deletArq() {
    await dadosLocation.delet()
  }

};

