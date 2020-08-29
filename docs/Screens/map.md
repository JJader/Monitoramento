# Mapa

Aqui é apresentado a lógica de funcionamento da screen map, qual é a ordem de chamadas das funções e como seus componentes foram implementados.

## Construção da screen

A primeira função a ser chamada nessa screen é o `componentDidMount()`, aqui é solicitado a permissão do usuário para utilizarmos sua localização. Caso o usuário aceite a permissão as seguintes funções são chamadas:

- `startMap()` :  Esse método configura o evento para monitorar a posição do usuário. Caso não ocorra erros a posição do usuário (`userLocation`) é atualizada e o mapa está pronto para ser mostrado (`ready: true`).

- `updateWork()` : Nesse método avaliamos se o motorista está em seu horário de trabalho utilizando os dados armazenados na memória (`dadosUserStore`). Com isso atualizamos a variável `isWork`.

- `updateIntervalId(isWork)` : É aqui que setamos os eventos que ficam sendo executados automaticamente, como a atualização da polyline e o envio da posição do usuário ao back-end. Caso a variável `isWork` seja falça ele exclui todos os eventos em execução.

## Eventos

Os eventos são função que sempre precisam ser executadas para o monitoramento do ônibus. Existem dois eventos principais:

- `getPolyToNextPoint()` : Essa função é responsável por chamar os métodos do objeto `polyRoute` que retornaram um novo array da polyline e uma nova cor. Caso o objeto indique que a polyline não está pronta, essa função atualiza os pontos de ônibus, os pontos de parada e a polyline com o webserver. Caso queira saber mais sobre a [polyRoute clique aqui](/Classes/polyClass.md)

- `monitoringFunction()`: Essa função é responsável por chamar os método do objeto `queueMonitoring` que atualizaram a posição do motorista dentro do webserver. Caso queira saber mais sobre o [queueMonitoring clique aqui](/Classes/queueLocation.md).

## Funções que recebem novos props

Algumas variáveis dependem de outras screens para serem utilizados, dai a necessidade de avaliar se o mapa recebe alguma modificação dessas variáveis. Existem duas funções responsáveis por isso e elas são chamadas sempre que novos props são recebidos:

- `componentWillUpdate(newProps)`: Esse método é chamado para atualizar a variável isFocused, utilizada para indicar se o usuário está na tela mapa. Dessa forma, caso o usuário não esteja na screen map, a mesma interrompe todos os eventos relacionados ao monitoramento.

- `componentWillReceiveProps(newProps)`: Esse método é utilizado para obter o index do ponto de ônibus retornado pela tela embarcar. Além disso, essa função também recebe o index da escola retornado pela screen desembarcar. Por fim, a tela de iniciar rota retorna se o usuário está ou não trabalhando.

## Render

A tela mapa possui dois estados, o primeiro apresenta o mapa, o qual contem os markers, polyline e tiles. O outro estado indica que ouve algum erro ou que o motorista não está em sua jornada de trabalho.

![](..\img\mapa.png)
![](..\img\error.png)