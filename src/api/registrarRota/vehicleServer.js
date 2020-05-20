import dadosUserStore from '../offline/dadosUser'

async function vehicleServer() {

  let vehicle = await tryServer()

  if (vehicle.error) {
    return vehicle
  }
  else {
    return traitVehicle(vehicle)
  }
}

async function tryServer() {
  let responseJson = {}

  try {
    responseJson = await sendRouteToServer()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function sendRouteToServer() {
  let dadosUser = await dadosUserStore.get();
  let link = URL_API + 'vehicle/' + dadosUser.idCity

  const vehicle = await fetch(link,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
    })

  const vehicleJson = await vehicle.json();
  return vehicleJson
}

function traitVehicle(vehicles) {
  return coords = vehicles.map((point, index) => {
    return {
      value: point.id,
      name: point.plate
    }
  })
}

const responseApi = {
  vehicleServer,
};

export default responseApi;
