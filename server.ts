const express = require('express');
const sql = require('mssql');
const ConnectionPool = sql.ConnectionPool;
import { Request, Response } from 'express';

// Initialize Express
const app = express();
const API_PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Create a database connection pool
const pool = new ConnectionPool(dbConfig);

pool
  .connect()
  .then(() => {
    console.log('Database connection pool is ready.');
  })
  .catch((err: string) => {
    console.error('Error initializing database connection pool:', err);
  });

// Function to execute SQL queries
async function executeQuery(query: string, params?: Record<string, any>) {
  try {
    const request = pool.request();

    if (params) {
      for (const paramName in params) {
        if (Object.hasOwnProperty.call(params, paramName)) {
          request.input(paramName, params[paramName]);
        }
      }
    }

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

// Define a route to fetch all apartments data
app.get('/apartment', async (req: Request, res: Response) => {
  try {
    const result = await executeQuery('SELECT * FROM Apartment');
    res.json(result);
  } catch (err) {
    res.status(500).send('Error in fetching data');
  }
});

// Define a route to fetch an apartment data using an ID
app.get('/apartment/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await executeQuery(
      `SELECT * FROM Apartment WHERE ApartmentID = ${id} `
    );
    res.json(result);
  } catch (err) {
    res.status(500).send('Error in fetching data');
  }
});

// Define a route to create a new apartment
app.post('/apartment/create', async (req: Request, res: Response) => {
  try {
    const {
      Title,
      Description,
      Address,
      Price,
      Size,
      CountBeds,
      CountToilets,
    } = req.body;

    const query = `
      INSERT INTO Apartment (Title, Description, Address, Price, Size, CountBeds, CountToilets)
      VALUES (@Title, @Description, @Address, @Price, @Size, @CountBeds, @CountToilets)
    `;

    const result = await executeQuery(query, {
      Title,
      Description,
      Address,
      Price,
      Size,
      CountBeds,
      CountToilets,
    });

    res.json({ message: 'Apartment created successfully' });
  } catch (err) {
    console.error('Error creating apartment', err);
    res.status(500).send('Error creating apartment');
  }
});

// Start the server
app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
});
