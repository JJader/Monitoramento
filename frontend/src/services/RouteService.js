
function getPolyline() {
  fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489ea5b3cf827249b192042b4334794e4e&start=8.681495,49.41461&end=8.687872,49.420318')  
  .then(function(response) {
    console.log("eae")
    console.log(response.json())
    return response.json()
  })
}

export {getPolyline};