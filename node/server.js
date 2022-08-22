const express = require('express')
const app = express()
const porta = 4000
const config = {
    host: 'db',
    port: 3306,
    user: 'root',
    password: 'b3RmELKOvCUrAdxIg0GEmugc3SY',
    database:'desafio'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`
    CREATE TABLE IF NOT EXISTS people(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
    )`
);

app.get('/', (req,res) => {

    const names = ["Diogo", "João", "Nike", "Gretna", "Romeo", "Maribeth", "Chucho", "Fanechka", "Rafa", "Hercule", "Foss", "Rockie", "Terrance", "Bill", "Phyllys", "Gherardo", "Madeline", "Michel", "Renado", "Sheree", "Shaylah", "Claudelle", "Harp", "Dominic", "Vivyanne"];

    connection.query(`INSERT INTO people (name) values ('${names[Math.floor(Math.random() * 24) + 1]}')`);

    connection.query(
        "SELECT * FROM people",
        function(err, results, fields)
        {
            if (err) throw res.send(`<h1>Error : ${err}</h1>`);

            const names = new Array;

            results.forEach(function(row) {
                names.push(row.name);
            });

            res.send(`<h1>Full Cycle</h1> <br/> <lu><li> ${names.join([separador = '</li> <li>'])} </li> </lu>`);
        }
    );
})

app.listen(porta, ()=> {
    console.log(`Rodando na porta: ${porta}`)
})