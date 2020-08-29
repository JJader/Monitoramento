# Polyline

A polyline indica a rota que o motorista tem que realizar dentro do mapa. Esse componente recebe informações de dois lugares: o primeiro do nosso webserver, vide `Poly route implementação`. Já o segundo, da API do Open Street Map, vide `Open route implementação`. Ambas funções são chamadas dentro da classe [PolyClass](/Classes/polyClass.md).

## Poly route

A função `polyroute()` retorna um array que pode ser utilizado no componente [polyline](/Componentes/map.md). Esse array de retorno é a rota que precisa ser seguida pelo motorista.

```js
import polyRouteAPI from './polyRoute'

let polyRoute = await polyRouteAPI.polyRoute()

/* O retorno da função é um array do tipo: 

[
  {
    latitude: <float>, 
    longitude: <float>
  }
]
*/
```


## Open route

A função `polyToNextPoint(start, end)`,  retorna um objeto com a distancia, duração e o array para o polyline entre os pontos `start` e `end`. Essa função é utilizada sempre que o motorista se distância da sua rota original.

```js
import openRouteAPI from './openRoute'
let start = {
  longitude: 0,
  latitude: 0
}

let end = {
  longitude = 0.001,
  latitude = 0.001
}

let polyBetweenPoints = await openRouteAPI.polyToNextPoint(start, end)

/* O retorno da função é um objeto do tipo: 

{
  distance: <float>,
  duration: <float>,
  coordinates: [
    {
      latitude: <float>, 
      longitude: <float>
    }
  ]
}
*/
```

Outra função que é implementada dentro do open route é para identificar a distância linear entre duas posições geográficas e que utilizamos para identificar o qual longe o motorista está da sua rota.

```js
import openRouteAPI from './openRoute'

let start = {
  longitude: 0,
  latitude: 0
}

let end = {
  longitude = 0.001,
  latitude = 0.001
}

let distance = openRouteAPI.tryGetDistance(start, end)

/*
O retorno da função é um valor do tipo: <float>
*/
```