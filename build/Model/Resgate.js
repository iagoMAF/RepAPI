// src/Model/Resgate.js
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
module.exports = Resgate;
