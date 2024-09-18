const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const XLSX = require("xlsx");
const fs = require("fs");
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "i_love_my_india";


app.use(express.json());


// const allowedOrigins = ['https://live.vercel.app', 'http://localhost:3000', '127.0.0.1'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,   
//  // Allow cookies for authenticated requests (if applicable)
// };

app.use(cors());

const port = 3006;

const pool = new Pool({
  user: "weldx",
  host: "propickproperty.in",
  database: "pnservice",
  password: "weldx9001",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("hello and welcome");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const financeType = req.body.financeType;
    let sheetData = [];

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const workbook = XLSX.readFile(file.path);
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      sheetData.push({ name: sheetName, data: data });
    });

    const iData = JSON.stringify(sheetData);
    const insertQuery =
      "INSERT INTO sheetdata(name, file, finance) VALUES ($1, $2, $3)";
    const values = [file.originalname, iData, financeType];

    await pool.query(insertQuery, values);

    fs.unlink(file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting temporary file:", unlinkErr);
      }
    });

    res.status(200).send("File uploaded and inserted into database.");
  } catch (err) {
    console.error("Error inserting file into database:", err);
    res.status(500).send("Error inserting file into database.");
  }
});

app.post("/upload-tc", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const financeType = req.body.financeType;
    let sheetData = [];

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const workbook = XLSX.readFile(file.path);
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      sheetData.push({ name: sheetName, data: data });
    });

    const iData = JSON.stringify(sheetData);
    const insertQuery =
      "INSERT INTO tcbsheet(name, file, finance) VALUES ($1, $2, $3)";
    const values = [file.originalname, iData, financeType];

    await pool.query(insertQuery, values);

    fs.unlink(file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting temporary file:", unlinkErr);
      }
    });

    res.status(200).send("File uploaded and inserted into database.");
  } catch (err) {
    console.error("Error inserting file into database:", err);
    res.status(500).send("Error inserting file into database.");
  }
});

app.get("/getlatestdata", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sheetdata ORDER BY id DESC LIMIT 1");

    if (result.rows.length === 0) {
      return res.status(404).send("File not found.");
    }

    const fileData = JSON.parse(result.rows[0].file);
    res.status(200).json(fileData);
  } catch (err) {
    console.error("Error retrieving file from database:", err);
    res.status(500).send("Error retrieving file from database.");
  }
});

app.get("/getlatestdatas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sheetdata");

    if (result.rows.length === 0) {
      return res.status(404).send("File not found.");
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving file from database:", err);
    res.status(500).send("Error retrieving file from database.");
  }
});

app.get("/get_tc_basic_salary", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tcbsheet");

    if (result.rows.length === 0) {
      return res.status(404).send("File not found.");
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving file from database:", err);
    res.status(500).send("Error retrieving file from database.");
  }
});

app.delete("/deletesheets/:id", async (req, res) => {
  try {
    const sheetId = req.params.id;
    const result = await pool.query("DELETE FROM sheetdata WHERE id = $1", [sheetId]);

    if (result.rowCount === 0) {
      return res.status(404).send("Sheet not found.");
    }

    res.status(200).send("Sheet deleted successfully.");
  } catch (err) {
    console.error("Error deleting sheet from database:", err);
    res.status(500).send("Error deleting sheet from database.");
  }
});

app.delete("/deletesheets_tc/:id", async (req, res) => {
  try {
    const sheetId = req.params.id;
    const result = await pool.query("DELETE FROM tcbsheet WHERE id = $1", [sheetId]);

    if (result.rowCount === 0) {
      return res.status(404).send("Sheet not found.");
    }

    res.status(200).send("Sheet deleted successfully.");
  } catch (err) {
    console.error("Error deleting sheet from database:", err);
    res.status(500).send("Error deleting sheet from database.");
  }
});

app.get("/sheets/:id", async (req, res) => {
  try {
    const sheetId = req.params.id;
    const result = await pool.query("SELECT * FROM sheetdata WHERE id = $1", [sheetId]);

    if (result.rows.length === 0) {
      return res.status(404).send("Sheet not found.");
    }

    const sheet = JSON.parse(result.rows[0].file);
    res.status(200).json(sheet);
  } catch (err) {
    console.error("Error fetching sheet from database:", err);
    res.status(500).send("Error fetching sheet from database.");
  }
});

app.get("/sheets-tc/:id", async (req, res) => {
  try {
    const sheetId = req.params.id;
    const result = await pool.query("SELECT * FROM tcbsheet WHERE id = $1", [sheetId]);

    if (result.rows.length === 0) {
      return res.status(404).send("Sheet not found.");
    }

    const sheet = JSON.parse(result.rows[0].file);
    res.status(200).json(sheet);
  } catch (err) {
    console.error("Error fetching sheet from database:", err);
    res.status(500).send("Error fetching sheet from database.");
  }
});
// Placeholder for "/get-finance"
app.get('/get-finance', async (req, res) => {
  try {
    const result = await pool.query("SELECT DISTINCT finance FROM sheetdata");

    if (result.rows.length === 0) {
      return res.status(404).send("No finance types found.");
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving finance types from database:", err);
    res.status(500).send("Error retrieving finance types from database.");
  }
});


// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);

//   try {
//       // Query the database for the user
//       const result = pool.query('SELECT * FROM user WHERE username = $1 AND password = $2', [username], password);
//       console.log(result)
//       // const user = result

//       // if (!user) {
//       //     return res.status(401).json({ message: 'Invalid username or password' });
//       // }

//       // // Compare the password with the hashed password stored in the database
//       // // const isPasswordValid = await bcrypt.compare(password, user.password);
//       // if (!isPasswordValid) {
//       //     return res.status(401).json({ message: 'Invalid username or password' });
//       // }

//       // Generate JWT token
//       // const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//       // console.log(token);
//       // Return the token
//       // res.json({ token });
//   } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Fetch the user from the database
    const result = await pool.query('SELECT * FROM "user" WHERE username = $1 AND password = $2', [username, password]);
    
    if (result.rows.length === 0) {
      // No user found
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // User found, generate JWT token
    const user = result.rows[0];
    // console.log(user)
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    // console.log(token);
    
    // Return the token
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/test-post', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
