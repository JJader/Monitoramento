import dadosUserStore from '../offline/dadosUser'

async function routeServer(shift) {

  let routes = await tryServer(shift)

  if (routes.error) {
    return routes
  }
  else {
    return traitRoutes(routes)
  }
}

async function tryServer(shift) {
  let responseJson = {}

  try {
    responseJson = await sendShiftToServer(shift)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function sendShiftToServer(shift) {
  let dadosUser = await dadosUserStore.get();
  let link = URL_API + 'trip/turn/' + shift + '/' + dadosUser.idCity

  const routes = await fetch(link,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + dadosUser.token,
      },
    })

  const routesJson = await routes.json();
  return routesJson
}

function traitRoutes(routes) {
  return coords = routes.map((point, index) => {
    return {
      value: point.id,
      name: point.name
    }
  })
}

const responseApi = {
  routeServer,
};

export default responseApi;
