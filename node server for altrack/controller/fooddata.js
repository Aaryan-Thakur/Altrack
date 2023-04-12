const { Client } = require("pg");

async function fooddata(req, res) {
  const request = req.body;
  console.log(request);
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  result = await client.query(
    `SELECT * FROM fooddata WHERE userid=${request.auth.user} AND date='${request.date}' `
  );
  
  client.end();

  let food = {
    breakfast: [],
    brunch: [],
    lunch: [],
    snacks: [],
    dinner: [],
    supper: [],
  };

  for (const a of result.rows) {
    if (a.slot == "BRF") {
      food.breakfast.push(a);
    } else if (a.slot == "BRU") {
      food.brunch.push(a);
    } else if (a.slot == "LUN") {
      food.lunch.push(a);
    } else if (a.slot == "SNK") {
      food.snacks.push(a);
    } else if (a.slot == "DIN") {
      food.dinner.push(a);
    } else {
      food.supper.push(a);
    }
  }
  const sumOfCalories = result.rows.reduce((acc, obj) => {
    return acc + obj.calories;
  }, 0);

  const sumofCarbs = result.rows.reduce((acc, obj) => {
    return acc + obj.carbs;
  }, 0);

  const sumofProteins = result.rows.reduce((acc, obj) => {
    return acc + obj.proteins;
  }, 0);

  const sumofFats = result.rows.reduce((acc, obj) => {
    return acc + obj.fats;
  }, 0);

  console.log(result.rows)

  res.status(201).json({food:food,tcal:sumOfCalories,ndata:{c:sumofCarbs,p:sumofProteins,f:sumofFats}});
}

async function getFoodData(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  result = await client.query(`SELECT * FROM fcirdata`);
  client.end();

  console.log(result.rows)

  res.status(201).json(result.rows);
}

async function addUserFoodData(req, response) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  let check = 0;
  for (const a of req.body.data) {
    if (a.slot == "Auto") {
      const [hours, minutes] = a.time.split(":").map(Number);

      if (hours >= 5 && hours < 9) {
        a.slot = "BRF";
      } else if (hours >= 9 && hours < 11 && minutes < 30) {
        a.slot = "BRU";
      } else if (hours >= 11 && hours < 15) {
        a.slot = "LUN";
      } else if (hours >= 15 && hours < 18) {
        a.slot = "SNK";
      } else if (hours >= 18 && hours < 21) {
        a.slot = "DIN";
      } else {
        a.slot = "SUP";
      }
    }
    console.log(a)
    client.query(
      `INSERT INTO fooddata VALUES (default,${req.body.id},'${a.food}',${a.weight},${a.cal},'${a.imgurl}','${a.date}','${a.time}','${a.slot}',${a.id},${a.carbs},${a.protiens},${a.fats})`,
      (err, res) => {
        if (!err) {
        } else {
          console.log(err);
          response.status(500).json(err.constraint);
        }
      }
      );
    }
    client.end;
    response  .status(201).json("added")
}

async function delentry(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  await client.query(`DELETE FROM fooddata WHERE id = ${req.body.id}`);
  client.end();

  fooddata

  res.status(201).json("deleted");

}

async function entryInfo(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  result = await client.query(`SELECT * FROM fcirdata WHERE id = ${req.body.id}`);
  console.log(req.body)
  console.log(result.rows)
  client.end();


  res.status(201).json(result.rows[0]);
}

async function updateEntry(req, res) {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Aaryan@sql31",
    database: "altrack",
  });

  await client.connect();
  await client.query(`UPDATE fooddata SET weight=${req.body.weight},slot='${req.body.slot}',calories=${req.body.cal} WHERE foodid=${req.body.id}`);
  client.end();

  
  res.status(201).json("safe");
}


module.exports = { fooddata, getFoodData, addUserFoodData,delentry,entryInfo,updateEntry };
