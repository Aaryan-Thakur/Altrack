const { Client } = require("pg");

async function getdata(req,res) {
    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "Aaryan@sql31",
        database: "altrack",
    });

    await client.connect();
    result = await client.query(`SELECT * FROM dataset LIMIT 50`);
    client.end();
    res.status(201).json(result.rows);

}

module.exports = { getdata };
