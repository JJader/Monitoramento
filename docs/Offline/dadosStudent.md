# Dados do estudante

Aqui será apresentado as principais funções dentro da estrutura `dadosStudent` e sua implementação. Esse componente foi utilizado dentro da classe [Fila de estudantes](/Classes/queueStudents.md)

Os `dadosStudent` foi a estrutura criada para armazenar na memória todas os estudantes e o ponto de ônibus de embarque, caso a aplicação não consiga se comunicar com o webserver.

Dentro dessa classe existe 3 métodos: `set`, `get` e `delete`. 

## set

O método `set` serve para atualizar os dados, normalmente é chamado o método `get`, atualiza os parâmetros e por fim é setado os novos dados do usuário.

```js
import dadosStudent from './dadosStudent'

cell = {
  id: 0,
  students: [0,1,2],
}

dados = await dadosStudent.set(cell);

// O retorno do método é a lista de alunos inteira.
```

## get

```js
import dadosStudent from './dadosStudent'

let dados = await dadosStudent.get()

// O retorno da função é um objeto do tipo json.
```

## delete

 ```js
import dadosStudent from './dadosStudent'

let dados = await dadosStudent.get();
 ```