var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Model/Animal.js
var require_Animal = __commonJS({
  "src/Model/Animal.js"(exports, module2) {
    var mysql = require("mysql");
    var CadAnimal = class _CadAnimal {
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
    module2.exports = CadAnimal;
  }
});

// src/Routes/animalRoutes.js
var require_animalRoutes = __commonJS({
  "src/Routes/animalRoutes.js"(exports, module2) {
    var express2 = require("express");
    var router = express2.Router();
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
    module2.exports = router;
  }
});

// src/Model/Admin.js
var require_Admin = __commonJS({
  "src/Model/Admin.js"(exports, module2) {
    var mysql = require("mysql");
    var Admin = class _Admin {
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
      static getAdmins(callback) {
        const connection = _Admin.connect();
        const sql = "select * from adm";
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
          callback(results);
        });
        console.log(query.sql);
        connection.end();
      }
      //Retorna a lista de carros por tipo de banco de dado
      static getAdminById(id, callback) {
        const connection = _Admin.connect();
        const sql = `SELECT * FROM adm where id = ${id}`;
        const query = connection.query(sql, function(error, results, fields) {
          if (error)
            throw error;
          callback(results);
        });
        console.log(query.sql);
        connection.end();
      }
    };
    module2.exports = Admin;
  }
});

// src/Routes/adminRoutes.js
var require_adminRoutes = __commonJS({
  "src/Routes/adminRoutes.js"(exports, module2) {
    var express2 = require("express");
    var router = express2.Router();
    var Admin = require_Admin();
    router.get("/", function(req, res) {
      Admin.getAdmins(function(admins) {
        res.json(admins);
      });
    });
    router.get("/:id", function(req, res) {
      const id = req.params.id;
      Admin.getAdminById(id, function(admin) {
        res.json(admin);
      });
    });
    module2.exports = router;
  }
});

// src/Model/Adotante.js
var require_Adotante = __commonJS({
  "src/Model/Adotante.js"(exports, module2) {
    var mysql = require("mysql");
    var Adotante = class _Adotante {
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
    module2.exports = Adotante;
  }
});

// src/Routes/adotanteRoutes.js
var require_adotanteRoutes = __commonJS({
  "src/Routes/adotanteRoutes.js"(exports, module2) {
    var express2 = require("express");
    var router = express2.Router();
    var Adotante = require_Adotante();
    router.post("/", function(req, res) {
      const adotanteInfo = req.body;
      Adotante.createAdotante(adotanteInfo, function(admins) {
        res.json(admins);
      });
    });
    module2.exports = router;
  }
});

// src/Model/Resgate.js
var require_Resgate = __commonJS({
  "src/Model/Resgate.js"(exports, module2) {
    var mysql = require("mysql");
    var Resgate = class _Resgate {
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
    module2.exports = Resgate;
  }
});

// src/Routes/resgateRoutes.js
var require_resgateRoutes = __commonJS({
  "src/Routes/resgateRoutes.js"(exports, module2) {
    var express2 = require("express");
    var router = express2.Router();
    var Resgate = require_Resgate();
    router.post("/", function(req, res) {
      const resgateInfo = req.body;
      Resgate.createResgate(resgateInfo, function(admins) {
        res.json(admins);
      });
    });
    module2.exports = router;
  }
});

// src/app.js
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 5e3;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "apieng.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/animais", require_animalRoutes());
app.use("/admin", require_adminRoutes());
app.use("/adotantes", require_adotanteRoutes());
app.use("/resgates", require_resgateRoutes());
var server = app.listen({ port, host: "0.0.0.0" }, function() {
  const host = server.address().address;
  console.log(`Servidor iniciado`);
});
