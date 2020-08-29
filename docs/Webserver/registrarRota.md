# Registrar rota

Aqui é apresentado as funções de chamado relacionados ao registrar rota, onde foram utilizadas e como é sua implementação.

## Obtendo as rotas

As rotas indicam qual o caminho que o motorista irá executar, por exemplo no contexto UFOP - JM poderia haver como rotas: 155, 104, 152 e etc. Para esse chamado é preciso inicialmente já ter cadastrado o turno dessa rota.

O retorno da função é um objeto que pode ser utilizado dentro do componente [Picker](/Componentes/list.md). Além disso, essa função foi utilizada dentro da [Screen Registrar rota](/Estrutura/screens.md)  

```js
import routeAPI from '../../api/registrarRota/routeServer'

let routesJson = await routeAPI.routeServer()

/* O retorno da função é um objeto do tipo:

[
  {
    value: <int>,
    name: <string>
  }
]
*/
```

## Obtendo os veículos

Os veículos apresenta uma lista de opções de veículos para o motorista. O retorno da função é um objeto que pode ser utilizado dentro do componente [Picker](/Componentes/list.md)  

Além disso, essa função foi utilizada dentro da [Screen Registrar rota](/Estrutura/screens.md)  

```js
import vehicleAPI from '../../api/registrarRota/vehicleServer'

let vehiclesJson = await vehicleAPI.vehicleServer()

/* O retorno da função é um objeto do tipo:

[
  {
    value: <int>,
    name: <string>
  }
]
*/
```

## Registrando o planejamento diário

É nessa função que se realiza o registro dos ids: `route` e `vehicle`, além do envio das notas (`notes`). Aqui esses ids são obtidos pelas duas funções anteriores. Essa função foi utilizada dentro da [Screen Registrar rota](/Estrutura/screens.md).

```js
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'

let mapDate = await dailyPlanAPI.submit(route, vehicle, notes)

/* O retorno da função é um objeto do tipo:

{
  id: <int>,
  id_trip: <string>
}
*/
```

## Status do trabalho 

O `statusWork` tem como objetivo interagir com o webserver e modifica-lo, permitindo que o motorista entre ou sai de sua jornada de trabalho. Ademais, verificar qual o estado de trabalho do motorista no momento.. 

Essa função foi utilizada principalmente dentro da [Screen Iniciar rota](/Estrutura/screens.md), mas foi utilizada também na [Registrar rota](/Estrutura/screens.md) e no [Mapa](/Estrutura/screens.md). 

### Modificar status

```js
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'

let isWork = false

let status = await dailyPlanAPI.changeDailyPlanStatus(isWork)

/*O retorno da função é um objeto do tipo:

{
  <string>
}
*/
```

### Verificar status

```js
import dailyPlanAPI from '../../api/registrarRota/dailyPlanning'

let statusDaily = await dailyPlanAPI.verifyDailyPlanning()

/*O retorno da função é um objeto do tipo:

{
  <string>
}
*/
```

