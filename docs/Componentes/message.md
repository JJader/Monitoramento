# Menssagem

Aqui são apresentados todos os componentes que possuem como função apresentar uma mensagem personalizada para o usuário, sua implementação e onde foram utilizados.

## Error

Algumas vezes é necessário apresentar alguma mensagem personalizada na tela do usuário. Como por exemplo informar que algumas informações não foram realizadas. Nesse caso se utiliza desse componente para tal feito.

O componente Error recebe como parâmetro um titúlo e apresenta na tela esse título com a imagem de erro. Ele foi utilizado na [tela de mapa](/Estrutura/screens.md) e é ativada caso o usuário não esteja em sua jornada de trabalho.

```js
import ErrorComponent from '../../components/mensagen/error'

<View style={{flex: 1}}>
  <ErrorComponent title={"This screen is not available"} />
</View>
```