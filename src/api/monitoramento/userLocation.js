import dadosUserStore from '../offline/dadosUser'
import Moment, { now } from 'moment'

async function updateLocation(lat, lon) {
  let response = await trySendToServer(lat, lon)
  console.log(response)

  return response

}

async function trySendToServer(lat, lon) {
  let responseJson = {}

  try {
    responseJson = await sendLatLonToServer(lat, lon)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function sendLatLonToServer(lat, lon) {
  let dadosUser = await dadosUserStore.get();
  if (dadosUser.error) {
    return dadosUser
  }

  let link = globalThis.URL_API + 'monitoring/' + dadosUser.idDailyPlanning
  let date = new Date(now());
  Moment.locale('en');
  date = Moment(date).format('YYYY-MM-DD HH:mm:ss');


  console.log(dateFormat);

  let dailyInfor = {
    type: "Feature",
    properties: {
      hour: date,
      type: "R",
      version: 1
    },
    geometry: {
      type: "Point",
      coordinates: [
        lat,
        lon
      ]
    }
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

const responseApi = {
  updateLocation,
};

export default responseApi;
