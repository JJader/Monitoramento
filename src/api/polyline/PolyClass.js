import polyRouteAPI from './polyRoute'
import openRouteAPI from './openRoute'
import _ from "lodash";

const minDistanceForReDPoly = 200
const distanceForStayOnPoint = 10


export default class PolyRoute {

  polyline = [];
  polyRoute = [];

  color = 'red';
  isReady = false;

  indexWhereDriverNeedGo = 0;

  async startPolyline() {
    let polyRoute = await polyRouteAPI.polyRoute()

    if (!polyRoute.error) {
      this.polyRoute = polyRoute;
      this.polyline = this.polyRoute.slice(0, 2)
      this.isReady = true;
    }
    else {
      console.log(polyRoute.error);
    }
  }

  length() {
    return this.polyline.length;
  }

  async UpdatePolyline(driverPosition) {

    if (this.polyline.length >= 2) {
      let end = this.polyline[0]

      let distanceBetweenPolyAndDriver = openRouteAPI.tryGetDistance(
        driverPosition,
        end
      )

      if (distanceBetweenPolyAndDriver.distance <= distanceForStayOnPoint) {
        
        var newPolyline = this._removeFirstElement(this.polyline)
        this.polyline = newPolyline.polyline

        this._updateIndex(newPolyline.element)
      }
      else if (distanceBetweenPolyAndDriver.distance >= minDistanceForReDPoly) {
        this.polyline = await this._createPolyFromDriverToRoute(driverPosition)
        this.color = 'red';
      }
    }
    else if (this.polyRoute.length) {
      this.color = 'blue';

      let index = this.indexWhereDriverNeedGo
      this.polyline = this.polyRoute.slice(index, 50)
    }

  }

  _removeFirstElement(polyParam) {
    var polyline = _.cloneDeep(polyParam)
    var element = polyline.shift()

    return {polyline, element}
  }

  _updateIndex(element) {

    let index = this.indexWhereDriverNeedGo
    let poly = this.polyRoute

    if (index == this.polyRoute.length) {
      return
    }
    else if (
      element.latitude == poly[index].latitude &&
      element.longitude == poly[index].longitude
    ) {
      this.indexWhereDriverNeedGo = index + 1
    }
  }

  async _createPolyFromDriverToRoute(DriverPosition) {

    let end = this.polyRoute[this.indexWhereDriverNeedGo];
    let polyBetweenPolyAndDriver = await openRouteAPI.polyToNextPoint(DriverPosition, end)

    if (!polyBetweenPolyAndDriver.error) {
      return polyBetweenPolyAndDriver.coordinates
    }
    else {
      return this.polyRoute
    }
  }

};

