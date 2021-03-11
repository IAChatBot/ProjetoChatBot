
const mysql = require('mysql');

var MySqlConnection = mysql({
    host: "mysql.cariuska.com.br",
    user: "diego",
    password: "diego@123",
    database: "diego",
    connectionLimite: 10

});

MySqlConnection.connect((err)=>{
    if(!err)
    console.log("Banco de Dados conectado com sucesso!");
    else
    console.log('Banco de Dados não conectado\n Error:' + JSON.stringify(err, undefined, 2));
});
