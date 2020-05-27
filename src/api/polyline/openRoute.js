async function polyToNextPoint(start, end) {
  let dataArray = await callServer(start, end)

  if (dataArray.error) {
    return dataArray
  }
  else {
    return traitPoly(dataArray)
  }
}

async function callServer(start, end) {
  let responseJson = {}

  try {
    responseJson = await callpolyAPI(start, end)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the openRoute poly server"
    }
  }

  return responseJson
}

async function callpolyAPI(start, end) {

  const link = 'https://api.openrouteservice.org/v2/directions/driving-car?' +
    'api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e' +
    '&start=' + start.longitude + ',' + start.latitude +
    '&end=' + end.longitude + ',' + end.latitude;

  const response = await fetch(link);
  const responseJson = await response.json();

  let polyFormat = {
    distance: responseJson.features[0].properties.segments[0].distance,
    duration: responseJson.features[0].properties.segments[0].duration,
    coordinates: responseJson.features[0].geometry.coordinates,
  }

  return polyFormat
}

function traitPoly(dataArray) {
  let coords = dataArray.coordinates.map((point, index) => {
    return {
      latitude: point[1],
      longitude: point[0]
    }
  })

  return polyFormat = {
    distance: dataArray.distance,
    duration: dataArray.duration,
    coordinates: coords,
  }
}

const responseApi = {
  polyToNextPoint,
};

export default responseApi;