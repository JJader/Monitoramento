async function callLoginServe(user,password) {
  let responseJson = {}

  try {
    responseJson = await sendUserPassToServer(user,password)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the login server"
    }
  }

  return responseJson
}

async function sendUserPassToServer(user,password) {
  let link = URL_API + 'user/login'

  const dados = {
    email: user,
    pass: password,
  };

  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    return responseJson
  }
  else {
    return userDates = {
      id: responseJson.id,
      name: responseJson.name,
      estado: responseJson.state,
      email: responseJson.email,
      roles: responseJson.roles,
      token: responseJson.token,
      idCity: responseJson.idCity
    }
  }
}

const responseApi = {
  callLoginServe,
};

export default responseApi;