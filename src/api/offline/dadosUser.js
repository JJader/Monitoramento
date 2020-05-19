import * as SecureStore from "expo-secure-store";

async function set(data) {
  try {

    let dadosUser = JSON.stringify(data)
    await SecureStore.setItemAsync('dadosUser', dadosUser);
    return this.returnUserData()

  }
  catch (error) {
    return { error: "Não foi possivel armazenar dadosUser" }
  }
}

async function get() {
  try {
    return await tryGet()
  }
  catch (error) {
    return { error: "Não existe a sessão dadosUser" }
  }
}

async function tryGet() {
  const dados = await SecureStore.getItemAsync('dadosUser');

  if (dados) {
    return JSON.parse(dados);
  }
  else {
    return { error: "Não existe a sessão dadosUser" }
  }
}

async function delet() {
  try {

    await SecureStore.deleteItemAsync('dadosUser')

  }
  catch (error) {

    return { error: "Não existe a sessão dadosUser" }

  }
}

const responseApi = {
  set, get, delet,
};

export default responseApi;