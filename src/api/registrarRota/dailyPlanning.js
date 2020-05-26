import dadosUserStore from '../offline/dadosUser'

async function submit(route, vehicle, note) {
  let response = await trySendToServer(route, vehicle, note)
  console.log(response)

  if (response.error) {
    return response
  }
  else {
    return response
  }
}

async function trySendToServer(route, vehicle, note) {
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

  let dailyInfor = {
    dateTrip: dateFormat,
    note: note,
    version: 1,
    idTrip: route,
	idEmployee: dadosUser.id,
	idVehicle: vehicle,
	status: "TNS",
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

async function verifyDailyPlanning() {
  let responseJson = {}

  try {
    responseJson = await getDailyPlanning()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function getDailyPlanning() {
  let dadosUser = await dadosUserStore.get()

  if (dadosUser.error) {
    return dadosUser
  }

  let link = URL_API + 'dailyplanning/router/control/' + dadosUser.idCity + '/' +
    dadosUser.id;

  const response = await fetch(link,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
    })
  //console.log(response)
  const responseJson = await response.json();
  return responseJson
}

async function changeDailyPlanStatus(param) {
  let responseJson = {}

  try {
    responseJson = await submitStatus(param)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function submitStatus(param) {
  let dadosUser = await dadosUserStore.get()
  if (dadosUser.error) {
    return dadosUser
  }

  let status = param ? 'TS' : 'TF'

  let link = URL_API + 'dailyplanning/change/status/' + dadosUser.idDailyPlanning +
    '?status=' + status

  const response = await fetch(link,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
    })

  if (response.status == 200) {
    dadosUser.controleDeTurno = status;
    await dadosUserStore.set(dadosUser)
    return status
  }
  else {
    throw "Invalid status"
  }
}

const responseApi = {
  submit, verifyDailyPlanning, changeDailyPlanStatus,
};

export default responseApi;
