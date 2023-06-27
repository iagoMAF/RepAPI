const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rotas importadas de router
app.use('/animais', require('./Routes/animalRoutes'))
app.use('/admin', require('./Routes/adminRoutes'))
app.use('/adotantes', require('./Routes/adotanteRoutes'))
app.use('/resgates', require('./Routes/resgateRoutes'))

const server = app.listen({port, host: "0.0.0.0"}, function(){
   const host = server.address().address;
   console.log(`Servidor iniciado`)
});