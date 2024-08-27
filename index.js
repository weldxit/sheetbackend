const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { Pool } = require("pg");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const app = express();
app.use(cors());

const port = 3006;

const pool = new Pool({
  user: "weldx",
  host: "localhost",
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

app.listen(port, () => {
  console.log(`server listening at port ${port}`);
});
