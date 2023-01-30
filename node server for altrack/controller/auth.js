var bcrypt = require("bcrypt");
const e = require("express");
var jwt = require("jsonwebtoken");
const { Client } = require("pg");
require('dotenv').config()


async function register(req, res) {
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
        } else {
          console.log(err);
        }
        client.end;
      }
    );

    res.status(201).json("user created  successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
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
      `SELECT userid,password FROM users WHERE email='${email}'`
    );
    await client.end;

    console.log(result.rows);
    if (result.rowCount == 0) {
      console.log("no user");
    } else if (!await bcrypt.compare(password, result.rows[0].password)) {
      console.log("invalid password");
    } else {
      console.log("logged in");
    }
    const uid = result.rows[0].userid;
    const token = jwt.sign({ id: uid }, process.env.JWT_SECRET);


    res.status(201).json({token,uid});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
