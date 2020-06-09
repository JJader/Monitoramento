import * as SecureStore from "expo-secure-store";
import _ from "lodash";

async function set(data) {
  try {
    
    let dadosStudent = JSON.stringify(data)

    await SecureStore.setItemAsync('dadosStudent', dadosStudent);
    return await get()
  }
  catch (error) {
    return { error: "Não foi possivel armazenar dadosStudent" }
  }
}

async function get() {
  try {
    return await tryGet()
  }
  catch (error) {
    return { error: "Não existe a sessão dadosStudent" }
  }
}

async function tryGet() {
  const dados = await SecureStore.getItemAsync('dadosStudent');

  if (dados) {
    return _.cloneDeep(JSON.parse(dados));
  }
  else {
    return { error: "Não existe a sessão dadosStudent" }
  }
}

async function delet() {
  try {

    await SecureStore.deleteItemAsync('dadosStudent')

  }
  catch (error) {

    return { error: "Não existe a sessão dadosStudent" }

  }
}

const responseApi = {
  set, get, delet,
};

export default responseApi;
