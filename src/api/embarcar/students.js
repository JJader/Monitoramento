async function sendStudents(students) {
  let responseJson = {}

  try {
    responseJson = await sendStudentsListToServer(students)
  }
  catch (error) {
    responseJson = {
      error: "There's something wrong with the server"
    }
  }

  return responseJson
}

async function sendStudentsListToServer(students) {
  let link = URL_API + '/pontos.json'

  const dados = {
    alunos: students
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

const responseStudentsServer = {
  sendStudents,
};

export default responseStudentsServer;