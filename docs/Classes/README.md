# Resumo

Aqui será apresentado as clásses que foram criadas para esse projeto, como é sua implementação e onde foram utilizadas. 

No nosso contexto as classes serviram para manusear os arquivos offline: tanto para as informações gerais do usuário, quanto para trabalhar com a estrutura de dados fila. Além disso, a polyline também recebeu uma classe própria por possui algumas funcionalidades complexas.

É importante ressaltar alguns padrões utilizados dentro das classes. No nosso contexto, para identificar que um determinado método era privado, o mesmo se inicia com o `_`, vide `_metodo2`. Assim sendo, métodos que iniciam com esse carácter não devem ser chamados.

```js
async metodo1(param) { // método público
   ...
}

async _metodo2(param) { // método privado
  ...
}
```

Além disso, a grande parte dos métodos está protegida por um bloco try/catch. Assim sendo, caso a operação não dê certo há um retorno de um objeto com o parâmetro error. 

```js
async exemplo() {
    let dados = await class.callMetodo()

    if (!dados.error) {
      ...
    }
    else {
      console.log(dados.error)
    }
  }
```