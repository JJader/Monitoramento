# Dados do usuário

Aqui será apresentado as principais funções dentro da estrutura `dadosUser` e sua implementação. Esse componente, por possui informações importante, foi utilizado praticamente em todas as telas.

Os dadosUser foi a estrutura criada para armazenar todas as informações referente ao motorista, como nome, token, turno e etc.

Dentro dessa classe existe 3 métodos: `set`, `get` e `delete`. 

## set

O método `set` serve para atualizar os dados, normalmente é chamado o método `get`, atualiza os parâmetros e por fim é setado os novos dados do usuário.

```js
import dadosUserStore from '../../api/offline/dadosUser'

dadosUser = {
  id: 0,
  name: "Rafael Frederico Alexandre",
  estado: "MG",
  email: "rfalexandre@gmail.com",
  roles: "1",
  token: "123abcd",
  idCity: 191,
  idDailyPlanning: 2,
  idTrip: 3,
  idVehicle: 1,
  turn: "M",
  controleDeTurno: "TS",

}

await dadosUserStore.set(dadosUser)

// O retorno do método é o próprio parâmetro de entrada.
```

## get

```js
import dadosUserStore from '../../api/offline/dadosUser'

let dadosUser = await dadosUserStore.get()

// O retorno da função é um objeto do tipo json.
```

## delete

 ```js
import dadosUserStore from '../../api/offline/dadosUser'

await dadosUserStore.delet()
 ```