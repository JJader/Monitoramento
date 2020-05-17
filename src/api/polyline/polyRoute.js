async function polyRoute(id) {
  let dataArray = await callPolyRouteServer(id)

  if (dataArray.error) {
    return dataArray
  }
  else {
    let coords = dataArray.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })

    return coords
  }
}

async function callPolyRouteServer(id) {
  let responseJson = {}

  try {
    responseJson = await polyRouteServer(id)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function polyRouteServer(id) {
  let link = globalThis.URL_API + '/polyline/' + id

  const response = await fetch(link);
  const responseJson = await response.json();

  return responseJson
}

const responseApi = {
  polyRoute,
};

export default responseApi;
