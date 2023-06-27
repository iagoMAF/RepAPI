var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Model/Adotante.js
var require_Adotante = __commonJS({
  "src/Model/Adotante.js"(exports2, module2) {
    var mysql = require("mysql");
    var Adotante2 = class _Adotante {
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
      static createAdotante(adotante, callback) {
        const connection = _Adotante.connect();
        const { id_animal, nome_adotante, cpf_adotante, telefone_adotante, endereco_adotante } = adotante;
        const sql = `INSERT INTO adocao ( id_animal, nome_adotante, cpf_adotante, telefone_adotante, endereco_adotante ) values ( ${id_animal}, '${nome_adotante}', '${cpf_adotante}', '${telefone_adotante}', '${endereco_adotante}')`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
        });
        console.log(query.sql);
        connection.end();
      }
    };
    module2.exports = Adotante2;
  }
});

// src/Routes/adotanteRoutes.js
var express = require("express");
var router = express.Router();
var Adotante = require_Adotante();
router.post("/", function(req, res) {
  const adotanteInfo = req.body;
  Adotante.createAdotante(adotanteInfo, function(admins) {
    res.json(admins);
  });
});
module.exports = router;
