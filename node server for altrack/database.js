const { Client } = require('pg')

const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"Aaryan@sql31",
    database:"altrack"
})

client.connect();

client.query(`SELECT * FROM users`,(err,res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})
