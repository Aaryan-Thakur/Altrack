var bcrypt = require("bcrypt");
const e = require("express");
var jwt = require("jsonwebtoken");
const { Client } = require("pg");
require('dotenv').config()


async function register(req, response) {
  console.log("register");
  try { 

    const { firstName, lastName, email, password, mobile } = req.body;

    const salt = await bcrypt.genSalt();
    console.log(password, salt);
    const passwordHash = await bcrypt.hash(password, salt);

    const client = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "Aaryan@sql31",
        database: "altrack",
    });

    client.connect();
    client.query(
      `INSERT INTO users VALUES(default,'${firstName}','${lastName}','${email}','${passwordHash}',${mobile})`,
      (err, res) => {
        if (!err) {
          console.log(res.rows);
          response.status(201).json("user created successfully");
        }else{
          console.log(err)
          response.status(500).json(err.constraint);
        }
      }
      );     
      let result = await client.query(
        `SELECT userid FROM users WHERE email='${email}'`
      ); 
     await client.query(
        `INSERT INTO userdata VALUES (${result.rows[0].userid})`
      ); 

      client.end;


  } catch (err) {
    console.log(err);
    response.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try { 
    const { email, password } = req.body;
    const client = new Client({
      host: "localhost",
      user: "postgres",
      port: 5432,
      password: "Aaryan@sql31",
      database: "altrack",
    });

    await client.connect();
    let result = await client.query(
      `SELECT userid,password,fname FROM users WHERE email='${email}'`
    );
    await client.end;


    if (result.rowCount == 0) {
      console.log("no user");
      res.status(201).json("invalid");

    } else if (!await bcrypt.compare(password, result.rows[0].password)) {
      console.log("invalid password");
      res.status(201).json("invalid");
    } else {
      console.log("logged in");
      const uid = result.rows[0].userid;
      const name = result.rows[0].fname;
      const token = jwt.sign({ id: uid }, process.env.JWT_SECRET);
      res.status(201).json({token,uid,name});
    }




  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

async function userdata(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  result1 = await client.query(`SELECT * FROM users WHERE userid=${req.body.uid}`);
  result2 = await client.query(`SELECT * FROM userdata WHERE userid=${req.body.uid}`);

  client.end();

  res.status(201).json({data1:result1.rows,data2:result2.rows});
}


async function updateUserData(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  await client.query(`UPDATE users SET fname='${req.body.fname}',lname='${req.body.lname}' WHERE userid=${req.body.uid}`);
  await client.query(`UPDATE userdata SET height=${req.body.height}, weight=${req.body.weight}, gender='${req.body.gender}', tcal=${req.body.tcal} WHERE userid=${req.body.uid}`);

  client.end();

  res.status(201).json("successful");
}


module.exports = { register, login,userdata,updateUserData };
