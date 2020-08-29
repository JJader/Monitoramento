# Embarcar

Até o momento atual o webserver com funcionalidades de embarcar ainda não foi implementado. Dessa forma, fica para trabalhos futuros implementar essa funcionalidade para o aplicativo mobile. Aqui é explicado como o aplicativo imagina que será o chamado.

## Embarcar estudantes

o webserver para Embarcar alunos foi utilizado dentro do objeto [queueStudent](/Classes/queueStudents).

```js
import studentAPI from '../embarcar/students'

var element = {
  students: [1,10,35,26] // array dos ids de cada aluno embarcado no ponto de ônibus
  id: 1 // id do ponto de ônibus
}

studentAPI.sendStudent(element);
```