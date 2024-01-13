const express = require('express');
const sql = require('mssql');

import { Request, Response } from 'express';

// Initialize Express
const app = express();
const API_PORT = process.env.PORT || 5000;

// SQL Server configuration
const dbConfig = {
  server: 'localhost',
  database: 'Nawy_Apartments_DB',
  user: 'admin',
  password: 'admin',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true,
    integratedSecurity: true,
  },
};

// Function to execute SQL queries
async function executeQuery(query: string) {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

// Define a test route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Define a route to fetch data
app.get('/data', async (req: Request, res: Response) => {
  try {
    const result = await executeQuery('SELECT * FROM Apartment');
    res.json(result);
  } catch (err) {
    res.status(500).send('Error in fetching data');
  }
});

// Start the server
app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});
