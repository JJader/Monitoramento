import dadosUserStore from '../offline/dadosUser'

async function polyRoute() {
  let dataArray = await callPolyRouteServer()

  if (dataArray.error) {
    return dataArray
  }
  else {
    let arrayPoints = dataArray.geom.coordinates
    return traitPolyPoint(arrayPoints)
  }
}

async function callPolyRouteServer() {
  let responseJson = {}

  try {
    responseJson = await polyRouteServer()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function polyRouteServer() {
  let dadosUser = await dadosUserStore.get();
  if (dadosUser.error) {
    return dadosUser
  }

  let link = globalThis.URL_API + 'trip/optimized/route/' +
    dadosUser.turn + '/' + dadosUser.idVehicle + '/' + dadosUser.idCity

  const polyPoint = await fetch(link,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
    }
  )

  const polyPointJson = await polyPoint.json();
  return polyPointJson
}

async function traitPolyPoint(dataArray) {
  return coords = dataArray.map((point, index) => {
    return {
      latitude: point[0],
      longitude: point[1]
    }
  })
}

const responseApi = {
  polyRoute,
};

export default responseApi;
