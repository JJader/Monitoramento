# Button

Aqui são apresentados todos os botões desenvolvidos, onde eles foram utilizados e como é sua implementação.

## Loading Button

Esse componente é um botão clássico que possui animações de carregamento caso a função de entrada seja async. Ele é utilizado na [screen de registrar rota](/Estrutura/screens.md) e de [iniciar rota](/Estrutura/screens.md). Ele foi utilizado para enviar e aguardar a reposta de requisições.

```js
import LoadingButton from '../../components/button/loadingButton'

<LoadingButton
  style={{flex: 1}}
  onPress={() => this.function()}
  text={"text"}
  loading={false}
/>
```

## Icon Button

Esse componente é um ícone clicável, utilizado dentro da [screen mapa](/Estrutura/screens.md) e da [screen embarcar aluno](/Estrutura/screens.md). Ele possui animação de carregamento caso a função de entrada seja async. 

Esse botão também recebe um texto, que é utilizado para mostrar um alerta caso o usuário pressione o botão por um longo período. Ele foi utilizado em interfaces que não convêm colocar um botão convencional, como por exemplo dentro do mapa.

```js
import IconButton from '../../components/button/iconButton'

<IconButton
  style={{flex: 1}}
  onPress={() => this.function()}
  name={"center-focus-weak"} // nome do ícone da classe MaterialIcons
  text={"Texto informativo sobre o componente"}
/>
```

## Modal Button

Esse componente é um botão que além de possuir as funcionalidades dos dois componentes anteriores, ele possui dois outros parâmetros: um bool modal e uma view que são utilizados para controlar o modal associado a esse botão.

Caso esse componente receba o parâmetro icon, ele se comportará como um Icon Button, caso contrário ele se comportará como um Loading Button. Ele foi utilizado nos primeiros protótipos das telas de embarque.

```js
import ModalButton from '../../components/button/modalButton'

var acionarModal = false;

<ModalButton
  style={{flex: 1}}
  onPress={() => this.function()}
  onRequestClose={() => this.function2()}
  icon={"center-focus-weak"} // opcional
  name={"text"}
  view={<Text></Text>}
  modal={acionarModal}
/>
```



