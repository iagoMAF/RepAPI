const express = require('express');
const cors = require('cors')
const app = express();


const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "apieng.onrender.com");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
   app.use(cors())
   next();
 })

//rotas importadas de router
app.use('/animais', require('./Routes/animalRoutes'))
app.use('/admin', require('./Routes/adminRoutes'))
app.use('/adotantes', require('./Routes/adotanteRoutes'))
app.use('/resgates', require('./Routes/resgateRoutes'))

const server = app.listen({port, host: "0.0.0.0"}, function(){
   const host = server.address().address;
   console.log(`Servidor iniciado`)
});