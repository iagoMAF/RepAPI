var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Model/Resgate.js
var require_Resgate = __commonJS({
  "src/Model/Resgate.js"(exports2, module2) {
    var mysql = require("mysql");
    var Resgate2 = class _Resgate {
      //Função para conectar o BD
      static connect() {
        const connection = mysql.createConnection({
          host: "bd2-ufvjm.mysql.database.azure.com",
          user: "Mariano",
          password: "m-88443244",
          database: "trabbd"
        });
        connection.connect();
        return connection;
      }
      static createResgate(resgate, callback) {
        const connection = _Resgate.connect();
        const { id_animal, nome_resgatante, data_resgate, situacao_resgate } = resgate;
        const sql = `INSERT INTO resgateAnimal ( id_animal, nome_resgatante, data_resgate, situacao_resgate) values ( ${id_animal}, '${nome_resgatante}', '${data_resgate}', '${situacao_resgate}')`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
        });
        console.log(query.sql);
        connection.end();
      }
    };
    module2.exports = Resgate2;
  }
});

// src/Routes/resgateRoutes.js
var express = require("express");
var router = express.Router();
var Resgate = require_Resgate();
router.post("/", function(req, res) {
  const resgateInfo = req.body;
  Resgate.createResgate(resgateInfo, function(admins) {
    res.json(admins);
  });
});
module.exports = router;
