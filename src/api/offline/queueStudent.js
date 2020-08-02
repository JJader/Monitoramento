import studentAPI from '../embarcar/students'
import dadosStudent from './dadosStudent'
import Netinfo from '@react-native-community/netinfo';

import _ from "lodash";

export default class QueueStudent {

  collection = [];
  first = {};
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
    let x = await dadosStudent.get()
    console.log(x)
  };

  async isEmpty() {
    let x = await dadosStudent.get()
    if (x.error) {
      return true
    }
    else {
      return x.length == 0
    }
  }

  async enqueue(idStop, Students) {

    if (this.isStartNow) {
      await this.dequeue()
      this.isStartNow = false;
    }

    let cell = {
      id: idStop,
      students: Students,
    }

    this.collection.push(cell)

    if (this.collection.length > 10) {
      await this._storeColletion()
    }

    if (!this.first || this.first.id == undefined) {
      this.first = cell
    }

    let responseAPI = await this.sendElementToServer(this.first)

    if (responseAPI.error) {
      console.log(responseAPI.error)
      return responseAPI
    }

    if (this.size && this.isConnected) {
      await this.dequeue()
    }

    if (this.isConnected) {
      this.collection = await this._dequeueArray(this.collection)
    }
  };

  async dequeue() {

    let dados = await dadosStudent.get()
    if (dados.error) {
      console.log(dados.error)
      return dados
    }

    dados = await this._dequeueArray(dados)

    dados = await dadosStudent.set(dados);

    if (!dados.error) {
      this.size = dados.length
      this.first = dados.slice(0, 1)
    }
    else {
      console.log(store.error)
    }

  }

  async _dequeueArray(arrayParam) {

    arrayParam.shift() // Eu já enviei o primeiro elemento

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
    return await studentAPI.sendStudent(element);
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
    let dados = await await dadosStudent.get()

    if (dados.error) {
      dados = []
    }

    dados = dados.concat(arrayParam)
    return await dadosStudent.set(dados);
  }

  async deletArq() {
    await dadosStudent.delet()
  }

};

