// src/Model/Admin.js
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
module.exports = Admin;
