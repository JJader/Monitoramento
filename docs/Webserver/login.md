# Login

Aqui é apresentado as funções de chamado relacionados ao login, onde foram utilizadas e como é sua implementação.

## Login

A função `callLoginServe(user,password)` ela verifica com o webserver se o `user` e o `password` são cadastrados e retorna um objeto com as informações do usuário.

```js
import loginAPI from '../../api/login/userData'

let user = 'rfalexandre@gmail.com'
let password = '123'

let userDate = await loginAPI.callLoginServe(user, password)

/* O retorno da função é um objeto do tipo: 

{
  id: <int>,
  name: <string>,
  estado: <string>,
  email: <string>,
  roles: <string>,
  token: <string>,
  idCity: <int>
}
*/
```