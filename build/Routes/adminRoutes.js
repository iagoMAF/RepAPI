var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/Model/Admin.js
var require_Admin = __commonJS({
  "src/Model/Admin.js"(exports2, module2) {
    var mysql = require("mysql");
    var Admin2 = class _Admin {
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
    module2.exports = Admin2;
  }
});

// src/Routes/adminRoutes.js
var express = require("express");
var router = express.Router();
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
module.exports = router;
