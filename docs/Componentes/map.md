# Mapa

Aqui são apresentados todos os componentes que foram utilizados dentro do mapa e sua implementação. Todos esses componentes devem ser inseridos dentro da tag do MapView.

## Bus stop marker

É por meio desse componente que são apresentado os ícones de escola e pontos de ônibus. A ídeia é que esses ícones sejam estáticos e não se movimente durante a execução da aplicação.

Esse componente recebe como parâmetro uma lista de pontos para serem renderizados dentro do mapa. Esses ícones podem ter a funcionalidade de ser clicável.  

```js
import BusStopMarker from '../../components/map/busStopMarker'

busStops[
  {
    latitude: 0,
    longitude: 0,
    description: "Ponto de ônibus",
    arrive: false, // caso seja true o ícone fica verde, caso falso o ícone fica vermelho
    index: 0,
    id: 0
  }
]

<BusStopMarker
  busStopList={this.state.busStops}
  latitudeDelta={LATITUDE_DELTA}
  longitudeDelta={LONGITUDE_DELTA}
  onPress={(index, id) => this.embarcarScreen(index, id)}
  icon={"building"} // ícones da classe FontAwesome
/>
```

## Marker

Este componente representa a posição do motorista. Diferente do anterior ocorre uma animação caso sua posição seja modificada.

```js
import UserMarker from '../../components/map/marker'

var userLocation = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
},

const busIcon = require('../../assets/logo/busMap.png');

<UserMarker
  location={userLocation}
  urlImag={busIcon}
  title={"My location"}
  description={''}
/>
```

## Polyline

Este componente representa a rota que deve ser seguida pelo motorista. A cor dessa polyline pode ser modificada, para representar se o motorista está ou não dentro de sua rota.

```js
import PolylineComponent from '../../components/map/polyline'

var polyline = [
  {
    latitude: 0,
    longitude: 0
  }
]

<PolylineComponent
  id={'PolyRoute'}
  polyline={polyline}
  color={this.state.polyColor}
/>
```

## Url tile

Esse componente retorna para mim um UrlTile para configurar o nosso mapa com o Open Street Map.

```js
import TileComponent from '../../components/map/urlTile';

<TileComponent />
```