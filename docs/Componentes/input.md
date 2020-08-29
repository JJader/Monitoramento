# Input

Aqui são apresentados todos componentes relacionados à entradas de texto, suas funcionalidades e implementações. 

## Input

O input de texto é muito utilizado na tela de [login](/Estrutura/screens.md) e nas anotações para o [registrar rota](/Estrutura/screens.md). Na tela de login, por exemplo, a senha precisava de uma segurança, nesse caso o parâmetro secureText é responsável por realizar essa função.

Esse componente recebe como parâmetro uma variável chamada text, que será o texto que aparecerá em cima do input para identifica-lo. Caso você prefira que esse texto apareça dentro do input utilize o parâmetro placeholder.

Para atualizar uma variável com a entrada do usuário se utiliza uma função para tal feito. Assim, a função updateParameter recebe o novo texto .

```js
import Input from '../../components/input/inputVertical'

<Input
  style={{flex: 1}}
  text="Notas: "
  secureText={false}
  updateParameter={(notes) => this.updateNotes(notes)}
  placeholder={this.props.placeholder}
/>

```