# Pontos de parada

Aqui será apresentado a implementação para se obter os pontos de ônibus e os pontos das escolas, onde foram utilizados e seus retornos. 

## Pontos de ônibus

Os retorno dos pontos de ônibus podem ser utilizados dentro do componente [Marker](/Componentes/map.md) e eles indicam a localização de cada ponto. Essa função é utilizada dentro do mapa.

```js
import busStopAPI from '../../api/busStop/getBusStop'

const busStops = await busStopAPI.BusStopsToMap();

/* O retorno da função é um objeto do tipo

[
 {
    latitude: <float>,
    longitude: <float>,
    description: <string>,
    arrive: <bool>,
    index: <int>,
    id: <int>
  }
]
*/
```

## Pontos de escola

Os retorno dos pontos de escola também podem ser utilizados dentro do componente [Marker](/Componentes/map.md) e eles indicam a localização de cada escola. Essa função é utilizada dentro do mapa.

```js
import stopAPI from '../../api/busStop/getStop'

const stops = await stopAPI.getStops();

/*O retorno da função é um objeto do tipo

[
 {
    latitude: <float>,
    longitude: <float>,
    description: <string>,
    arrive: <bool>,
    index: <int>,
    id: <int>
  }
]
*/

```