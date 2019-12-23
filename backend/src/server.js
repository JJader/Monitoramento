const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries')

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/',(req,res)=>{
    res.json('Api funcionando!');
});

app.listen(port, ()=>{
    console.log('Rodando');
});

app.get('/busstops', db.getBusStops);
app.get('/busstops/:id', db.getBusStopById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.get('/routes',db.getRoutes);
app.get('/routes/:id',db.getRoutesById);

