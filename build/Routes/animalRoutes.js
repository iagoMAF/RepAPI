var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Model/Animal.js
var require_Animal = __commonJS({
  "src/Model/Animal.js"(exports2, module2) {
    var mysql = require("mysql");
    var CadAnimal2 = class _CadAnimal {
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
      //Retorna lista de carros
      static getAnimal(callback) {
        const connection = _CadAnimal.connect();
        const sql = "select * from cadAnimal";
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
          callback(results);
        });
        console.log(query.sql);
        connection.end();
      }
      //Retorna a lista de carros por tipo de banco de dado
      static getAnimalById(id, callback) {
        const connection = _CadAnimal.connect();
        const sql = `select * from cadAnimal left join resgateAnimal on cadAnimal.id = resgateAnimal.id_animal left join adocao on cadAnimal.id = adocao.id_animal where cadAnimal.id = ${id}`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
          callback(results);
        });
        console.log(query.sql);
        connection.end();
      }
      //Atualiza o carro no BD
      static updateAnimal(id, { nome, especie, porte, sexo, idade, descricao }, callback) {
        const connection = _CadAnimal.connect();
        const setStatementCollumns = [];
        if (nome) {
          setStatementCollumns.push(`nome = '${nome}'`);
        }
        if (especie) {
          setStatementCollumns.push(`especie = '${especie}'`);
        }
        if (porte) {
          setStatementCollumns.push(`porte = '${porte}'`);
        }
        if (sexo) {
          setStatementCollumns.push(`sexo = '${sexo}'`);
        }
        if (idade) {
          setStatementCollumns.push(`idade = ${idade}`);
        }
        if (descricao) {
          setStatementCollumns.push(`descricao = '${descricao}'`);
        }
        const sql = `UPDATE cadAnimal SET ${setStatementCollumns.join(",")} where id = ${id}`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
          callback(results);
        });
        console.log(query.sql);
        connection.end();
      }
      static createAnimal(animal, callback) {
        const connection = _CadAnimal.connect();
        const { nome, especie, porte, sexo, idade, descricao } = animal;
        const sql = `INSERT INTO cadAnimal ( nome, especie, porte,sexo, idade, descricao ) values ( '${nome}', '${especie}', '${porte}', '${sexo}', ${idade}, '${descricao}')`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
        });
        console.log(query.sql);
        connection.end();
      }
    };
    module2.exports = CadAnimal2;
  }
});

// src/Routes/animalRoutes.js
var express = require("express");
var router = express.Router();
var CadAnimal = require_Animal();
router.get("/home", function(req, res) {
  res.status(200).send("API da Casa Quatro Patas");
});
router.get("/", function(req, res) {
  CadAnimal.getAnimal(function(carros) {
    res.json(carros);
  });
});
router.get("/:id", function(req, res) {
  const id = req.params.id;
  CadAnimal.getAnimalById(id, function(carro) {
    res.json(carro);
  });
});
router.post("/", function(req, res) {
  const animal = req.body;
  CadAnimal.createAnimal(animal, function(carro) {
    res.json({ msg: "Carro inserido com sucesso" });
  });
});
router.put("/:id", function(req, res) {
  const id = req.params.id;
  const { nome, especie, porte, sexo, idade, descricao } = req.body;
  CadAnimal.updateAnimal(id, { nome, especie, porte, sexo, idade, descricao }, function() {
    res.json({ msg: "Registro atualizado com sucesso!" });
  });
});
module.exports = router;
