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
    let routes = [];
    routes = results.rows.map((element,index)=>{
      let test = element.st_astext.split(/LINESTRING\(|\|\,|\)/);
      test.shift();
      test.pop();
      test = test[0].split(/,|\s/);
      let result = [];
      for(let i =0;i<test.length;i=i+2){
        let obj = {
          latitude: parseFloat(test[i+1]),
          longitude: parseFloat(test[i])
        }
        result.push(obj);
      }
      return result;
    })
    response.status(200).json(routes);
  })

}

const getRoutesById = (request,response)=>{
  const id = parseInt(request.params.id);

  pool.query(`SELECT ST_AsText(geom) FROM  routes WHERE id=$1;`,[id],(error,results)=>{
    if(error){
      throw error;
    }
    let routes = [];
    routes = results.rows.map((element,index)=>{
      let test = element.st_astext.split(/LINESTRING\(|\|\,|\)/);
      test.shift();
      test.pop();
      test = test[0].split(/,|\s/);
      let result = [];
      for(let i =0;i<test.length;i=i+2){
        let obj = {
          latitude: parseFloat(test[i+1]),
          longitude: parseFloat(test[i])
        }
        result.push(obj);
      }
      return result;
    })
    response.status(200).json(routes[0]);
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
      return {
        latitude: parseFloat(temp[1]),
        longitude: parseFloat(temp[0])
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

      return{
        latitude: parseFloat(temp[1]),
        longitude: parseFloat(temp[0])
      };
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
  getRoutes,
  getRoutesById
}