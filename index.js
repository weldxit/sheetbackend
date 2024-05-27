const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { Pool } = require('pg');
const cors = require('cors');
const XLSX = require('xlsx');
const app = express();
const fs = require('fs');
app.use(cors())

const port = 3006;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'subha123',
    port: 5432,
  });


  // app.post('/upload', upload.single('file'), (req, res) => {
  //   let shettdata;
  //   const file = req.file;
  //   if (!file) {
  //       return res.status(400).send('No file uploaded.');
  //   }
  //   const workbook = XLSX.readFile(file.path);
  //   const sheetName = workbook.SheetNames;
  //   const sheet = workbook.Sheets[sheetName];
  //   const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //   // console.log(data[0]);
  //   // console.log(typeof(data));
  //   shettdata=JSON.stringify(data)
  //   // console.log(typeof(data[0]));
  //   const insertQuery = 'INSERT INTO sheetdata(name, file) VALUES ($1, $2)';
  //   const values = [file.originalname,shettdata];
  //   pool.query(insertQuery, values, (err, result) => {
  //       if (err) {
  //           console.error('Error inserting file into database:', err);
  //           return res.status(500).send('Error inserting file into database.');
  //       }
  //       console.log('File inserted successfully.');
  //       res.status(200).send('File uploaded and inserted into database.');
  //   });
  // });
app.post('/upload', upload.single('file'), (req, res) => {
  let sheetData = [];
  const file = req.file;
  const financeType = req.body.financeType;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const workbook = XLSX.readFile(file.path);
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    sheetData.push({ name: sheetName, data: data });
  });

  console.log(sheetData);
  const iData = JSON.stringify(sheetData);
  const insertQuery = 'INSERT INTO sheetdata(name, file, finance) VALUES ($1, $2, $3)';
  const values = [file.originalname, iData, financeType];

  pool.query(insertQuery, values, (err, result) => {
    // Clean up uploaded file
    fs.unlink(file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting temporary file:', unlinkErr);
      }
    });

    if (err) {
      console.error('Error inserting file into database:', err);
      return res.status(500).send('Error inserting file into database.');
    }
    
    console.log('File inserted successfully.');
    res.status(200).send('File uploaded and inserted into database.');
  });
});


  app.get('/getlatestdata', (req, res) => {
    pool.query('select * from sheetdata order by id desc limit 1',  (err, result) => {
        if (err) {
            console.error('Error retrieving file from database:', err);
            return res.status(500).send('Error retrieving file from database.');
        }

        if (result.rows.length === 0) {
            return res.status(404).send('File not found.');
        }
        // console.log(result.rows[0],'rr');
        // console.log(result.rows)
 
        const fileData = result.rows[0].file
        // console.log(JSON.parse(fileData));
        const jsondata = JSON.parse(fileData);
        // console.log(jsondata[0])
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=file.xlsx`);
        res.send(jsondata);
    });
});


app.get('/getlatestdatas', (req, res) => {
    // console.log('this was called')
    pool.query('select * from sheetdata',  (err, result) => {
        if (err) {
            console.error('Error retrieving file from database:', err);
            return res.status(500).send('Error retrieving file from database.');
        }

        if (result.rows.length === 0) {
            return res.status(404).send('File not found.');
        }
        // console.log(result.rows[0],'rr');
        // console.log(result.rows)
        
        // const fileData = result.rows
        // // console.log(JSON.parse(fileData));
        // console.log(fileData)
        // const jsondata = JSON.parse(fileData);
        // console.log(jsondata[0])
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=file.xlsx`);
        res.send(result.rows);
    });
});


app.delete('/deletesheets/:id', (req, res) => {
  const sheetId = req.params.id;
  const deleteQuery = 'DELETE FROM sheetdata WHERE id = $1';

  pool.query(deleteQuery, [sheetId], (err, result) => {
    if (err) {
      console.error('Error deleting sheet from database:', err);
      return res.status(500).send('Error deleting sheet from database.');
    }
    
    if (result.rowCount === 0) {
      return res.status(404).send('Sheet not found.');
    }

    console.log('Sheet deleted successfully.');
    res.status(200).send('Sheet deleted successfully.');
  });
});

app.get('/sheets/:id', (req, res) => {
  const sheetId = req.params.id;
  const selectQuery = 'SELECT * FROM sheetdata WHERE id = $1';

  pool.query(selectQuery, [sheetId], (err, result) => {
    if (err) {
      console.error('Error fetching sheet from database:', err);
      return res.status(500).send('Error fetching sheet from database.');
    }
    
    if (result.rows.length === 0) {
      return res.status(404).send('Sheet not found.');
    }

    const sheet = JSON.parse(result.rows[0].file);
    res.status(200).json(sheet);
  });
});

app.listen(port,(req,res)=>{
    console.log(`server listening at port ${port}`);
  })