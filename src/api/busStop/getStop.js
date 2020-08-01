import dadosUserStore from '../offline/dadosUser'

async function getStops() {
  let busStops = await tryStopServer()
  if (busStops.error) {
    return busStops
  }
  else {
    return traitPolyPoint(busStops)
  }
}

async function tryStopServer() {
  let responseJson = {}

  try {
    responseJson = await stopServer()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the stop server"
    }
  }

  return responseJson
}

async function stopServer() {
  let dadosUser = await dadosUserStore.get();
  if (dadosUser.error) {
    return dadosUser
  }

  let link = global.URL_API + 'school/search'

  let dados = {
    city:{
      id: 191//dadosUser.idCity
    }
  }

  const stops = await fetch(link,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
      body: JSON.stringify(dados),
    }
  )

  const stopsJson = await stops.json();
  return stopsJson
}

async function traitPolyPoint(busStops) {
  return data = busStops.map((point, index) => {
    return {
      latitude: point.geom.coordinates[0],
      longitude: point.geom.coordinates[1],
      description: point.description,
      arrive: false,
      index: index,
      id: point.id
    }
  })
}

const busStopsJson = {
  getStops,
};

export default busStopsJson;
