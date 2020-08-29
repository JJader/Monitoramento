# Monitoramento

Aqui será apresentado as funções responsáveis pelo monitoramento do motorista, como se utiliza e onde elas foram implementada.

## Localização do usuário

A `updateLocation(lat, lon)` é a função que enviar a posição do usuário ao webserver. Ela foi utilizada dentro da classe [queueMonitoring](/Classes/queueLocation.md).

```js
import userLocationAPI from '../monitoramento/userLocation'

var lat = 0
var lon = 0

await userLocationAPI.updateLocation(lat, lon);
```
