const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: 'campos98',
  port: 5432,
})


const getRoutes = (request,response)=>{
  pool.query(`SELECT ST_AsText(geom) FROM  routes;`,(error,results)=>{
    if(error){
      throw error;
    }
    response.status(200).json(results.rows);
  })

}


const getBusStops = (request, response) => {
  pool.query(`SELECT ST_AsText(pos) FROM  bus_stops;`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    let temp = results.rows.map(element => {
      let str = element.st_astext.split(/POINT\(|\)/);
      let temp = str[1].split(' ');

      let latlng = {
        lat: parseFloat(temp[1]),
        lng: parseFloat(temp[0])
      };

      console.log(latlng);
      return {
        pos: latlng
      }
    })
    response.status(200).json(temp)
  })
}

const getBusStopById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(`SELECT ST_AsText(pos) FROM  bus_stops WHERE id = $1`, [id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    let temp = results.rows.map(element => {
      let str = element.st_astext.split(/POINT\(|\)/);
      let temp = str[1].split(' ');

      let latlng = {
        lat: parseFloat(temp[1]),
        lng: parseFloat(temp[0])
      };

      console.log(latlng);
      return {
        pos: latlng
      }
    })
    response.status(200).json(temp);
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getBusStops,
  getBusStopById,
  createUser,
  updateUser,
  deleteUser,
  getRoutes
}