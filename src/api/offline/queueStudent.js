import studentAPI from '../embarcar/students'
import dadosStudent from './dadosStudent'
import Netinfo from '@react-native-community/netinfo';

import _ from "lodash";

export default class QueueStudent {

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
    let x = await dadosStudent.get()
    console.log(x)
  };

  async enqueue(idStop,Students) {

    let cell = {
      id : idStop,
      students: Students,
    }

    this.collection.push(cell)

    if (this.size && this.isConnected) {
      this.size = await this._dequeue()
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
    let cell = this.collection.shift()
    let responseAPI = await studentAPI.sendStudent(cell);

    if (responseAPI.error) {
      this.collection.unshift(cell)
    }

    return responseAPI
  }

  async _dequeue() {
    let dados = await this._tryStoreCollection()
    if (dados.error) {
      return dados
    }

    let cell, responseAPI;
    let size = dados.length

    while (size) {
      cell = dados.shift()
      responseAPI = await studentAPI.sendStudent(cell);

      size = dados.length

      if (responseAPI.error) {
        dados.unshift(cell)
        break;
      }
    }

    await dadosStudent.set(dados);
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
    let dados = await dadosStudent.get()

    if (dados.error) {
      dados = []
    }

    dados = dados.concat(this.collection)

    return locationStore = await dadosStudent.set(dados);
  }

  async deletArq() {
    await dadosStudent.delet()
  }

};

