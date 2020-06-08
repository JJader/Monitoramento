import dadosUserStore from '../offline/dadosUser'

async function routeServer() {

  let routes = await tryServer()

  if (routes.error) {
    return routes
  }
  else {
    return traitRoutes(routes)
  }
}

async function tryServer() {
  let responseJson = {}

  try {
    responseJson = await sendShiftToServer()
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the route server"
    }
  }

  return responseJson
}

async function sendShiftToServer() {
  let dadosUser = await dadosUserStore.get();
  let link = global.URL_API + 'trip/turn/' + dadosUser.turn + '/' + dadosUser.idCity

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
