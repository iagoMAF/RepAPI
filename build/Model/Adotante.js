// src/Model/Adotante.js
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
module.exports = Adotante;
