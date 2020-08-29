# Header

Aqui são apresentados todos os cabeçalhos utilizados dentro da aplicação, sua funcionalidade e implementação.

## Header

o Header é um cabeçalho padrão, que recebe como parâmetro um titulo e retorna um componente cabeçalho.

## Navigation Menu

Esse componente serve para controlar o drawer navigation de todas as screen do aplicativo. Esse componente precisa estar dentro de um screen que é controlada pelo drawer navigation.

```js
import Header from '../../components/header/navigationMenu'

<Header 
  title="Registrar rota"
  navigationProps={this.props.navigation.toggleDrawer}
/>

```