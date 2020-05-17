
async function BusStopsToMap() {
  let busStops = await callBusStopsServer()

  if (busStops.error) {
    return busStops
  }
  else {
    return data = busStops.map((point, index) => {
      return {
        latitude: point.lat,
        longitude: point.lon,
        value: point.value,
        arrive: false,
        index: index
      }
    })
  }
}

async function callBusStopsServer() {
  let responseJson = {}

  try {
    responseJson = await getBusStopsFromServer()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function getBusStopsFromServer() {
  let link = globalThis.URL_API + '/pontos.json'

  const response = await fetch(link);
  const busStopsJson = await response.json();
  return busStopsJson.pontos
}

const busStopsJson = {
  BusStopsToMap,
};

export default busStopsJson;