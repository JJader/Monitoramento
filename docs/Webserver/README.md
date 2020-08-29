# Resumo

Aqui é apresentado todos os objetos criados com o intuito de comunicar com o webserver. Será mostrado para que servem, como implementa-los e onde foram utilizados. 

Os objetos que contem as função, podem ser encontrados dentro da pasta `./API`. É importante ressaltar que todas as funções, caso haja erro, retornam um objeto do tipo:

```js
responseJson = {
  error: "There's something wrong with function"
}
```

Assim sendo, toda a implementação que utilizar essas funções devem verificar se existe o objeto `error` no retorno, como pode ser visto a seguir.

```js
async exemplo() {
    let dados = await api.callServe()

    if (!dados.error) {
      await armazeneDados(dados)
    }
    else {
      console.log(dados.error)
    }
  }
```