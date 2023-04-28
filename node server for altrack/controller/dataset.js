const { Client } = require("pg");


// async function getexercise(req, res) {
//     const client = new Client({
//       host: "localhost",
//       user: "postgres",
//       port: 5432,
//       password: "Aaryan@sql31",
//       database: "altrack",
//     });
  
//     await client.connect();
//     result = await client.query(`SELECT * FROM excercise`);
//     client.end();
  
//     console.log(result.rows)
  
//     res.status(201).json(result.rows);
//   }

  async function getexercise(req, res) {
    const client = new Client({
      host: "localhost",
      user: "postgres",
      port: 5432,
      password: "Aaryan@sql31",
      database: "altrack",
    });
  
    await client.connect();
    result = await client.query(`SELECT * FROM fcirdata2`);
    client.end();
  
    console.log(result.rows)
  
    res.status(201).json(result.rows);
  }

module.exports = { getexercise };
