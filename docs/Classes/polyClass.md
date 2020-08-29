# Classe polyline

Aqui será apresentado a classe polyline, seus métodos e atributos, sua implementação e onde foi utilizada. 

A polyline recebeu alguns requisitos para a sua funcionalidade. O primeiro requisito foi que a cor indicaria se o motorista estava dentro ou fora da rota gerada pelo webserver.

Além disso, polyline precisaria atualizar com a posição do motorista, de forma que o ponto inicial desse componente deve sempre coincida com a posição do ônibus. Dando assim, o efeito de que o carro está seguindo a polyline. 

## Atributos

Dentro dessa classe há 5 atributos:

  - `polyRoute` : Array com polyline recebido pelo webserver;
  - `polyline` : Array com partição da polyRoute que será executada pelo motorista;
  - `color`: String com a cor em hexadecimal do polyline;
  - `isReady`: Bool para identificar se existe polyline;
  - `indexWhereDriverNeedGo`: inteiro com o index da polyRoute onde o motorista precisa chegar.

## Iniciando a classe

O método `startPolyline()` ele solicita ao servidor qual será a polyline executada. 

```js
import polyClass from '../../api/polyline/PolyClass'

const polyRoute = new polyClass();

await polyRoute.startPolyline()
```

## Atualizando a polyline 

A polyline obtida pelo webserver é tratada com base na posição do motorista, de forma que os pontos já passados são descartados.

```js
import polyClass from '../../api/polyline/PolyClass'

const polyRoute = new polyClass();

let userLocation = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
},

await polyRoute.UpdatePolyline(userLocation)
```