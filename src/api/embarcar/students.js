async function sendStudent(cell) {
  let responseJson = {}

  try {
    responseJson = await sendStudentListToServer(cell)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the student server"
    }
  }

  return responseJson
}

async function sendStudentListToServer(cell) {
  let link = global.URL_API + '/pontos.json'

  const dados = {
    alunos: cell.students,
    id : cell.id
  };

  const response = await fetch(link, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  return responseJson = await response.json();
}

const responseStudentServer = {
  sendStudent,
};

export default responseStudentServer;