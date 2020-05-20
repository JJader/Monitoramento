import dadosUserStore from '../offline/dadosUser'

async function submit(route, vehicle, note) {
  let response = await tryServer(route, vehicle, note)
  console.log(response)

  if (response.error) {
    return response
  }
  else {
    return response
  }
}

async function tryServer(route, vehicle, note) {
  let responseJson = {}

  try {
    responseJson = await sendDailyPlanningToServer(route, vehicle, note)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function sendDailyPlanningToServer(route, vehicle, note) {
  let dadosUser = await dadosUserStore.get();
  if (dadosUser.error) {
    return dadosUser
  }

  let link = URL_API + 'dailyplanning/' + route + '/' + dadosUser.id + '/' + vehicle
  let date = new Date()
  let dateFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  console.log(dateFormat)  

  let dailyInfor = {
    dateTrip: dateFormat,
    note: note,
    version: 1
  }

  const response = await fetch(link,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
      body: JSON.stringify(dailyInfor)
    })

  const responseJson = await response.json();
  return responseJson
}

const responseApi = {
  submit,
};

export default responseApi;
