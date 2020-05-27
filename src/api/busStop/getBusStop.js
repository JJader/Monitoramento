import dadosUserStore from '../offline/dadosUser'

async function BusStopsToMap() {
  let busStops = await callBusStopsServer()
  if (busStops.error) {
    return busStops
  }
  else {
    return traitPolyPoint(busStops)
  }

  async function callBusStopsServer() {
    let responseJson = {}

    try {
      responseJson = await getBusStopsFromServer()
    }
    catch (error) {
      responseJson = {
        error: "There's something wrong with the bus stop server"
      }
    }

    return responseJson
  }

  async function getBusStopsFromServer() {
    let dadosUser = await dadosUserStore.get();
    if (dadosUser.error) {
      return dadosUser
    }

    let link = globalThis.URL_API + 'busstop'

    const busStops = await fetch(link,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + dadosUser.token,
        },
      }
    )

    const busStopsJson = await busStops.json();
    return busStopsJson
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
}

const busStopsJson = {
  BusStopsToMap,
};

export default busStopsJson;
