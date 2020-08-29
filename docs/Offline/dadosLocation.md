# Dados de localização

Aqui será apresentado as principais funções dentro da estrutura `dadosLocation` e sua implementação. Esse componente foi utilizado dentro da classe [Fila de monitoramento](/Classes/queueMonitoring.md)

Os `dadosLocation` foi a estrutura criada para armazenar na memória todas as posições do ônibus caso ele não consiga se comunicar com o webserver.

Dentro dessa classe existe 3 métodos: `set`, `get` e `delete`. 

## set

O método `set` serve para atualizar os dados, normalmente é chamado o método `get`, atualiza os parâmetros e por fim é setado os novos dados do usuário.

```js
import dadosLocation from './dadosLocation'

var lat = 0;
var lon = 0;
let location = [lat,lon]

let dados = await dadosLocation.set(location);

// O retorno do método é a lista de localização inteira.
```

## get

```js
import dadosLocation from './dadosLocation'

let dados = await dadosLocation.get();

// O retorno da função é um objeto do tipo json.
```

## delete

 ```js
import dadosLocation from './dadosLocation'

let dados = await dadosLocation.get();
 ```