# Lista

Aqui são apresentados todos os componentes com função de lista, onde eles foram utilizados e como é sua implementação.

## Picker

Esse componente apresenta um conjunto de opções que podem ser clicados. Ele foi utilizado dentro da tela de [registrar rota](/Estrutura/screens.md), para selecionar o veículo, turno e rota.

```js
import PickerItem from '../../components/list/picker'

var date = [{ name: 'NULL', value: '' }],

<PickerItem
  dates={date}
  text={"VEÍCULO:"}
  iconName={"ios-bus"} // aceita ícones da classe Ionicons
  onValueChange={(item) => this.updateVehicle(item)}
/>
```