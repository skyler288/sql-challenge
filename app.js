require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const app = express()

// Activate body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

//import routes
const depRoutes = require('./routes/dep')
const EmpRoutes = require('./routes/emp')
const daRoutes = require('./routes/da')
const dmRoutes = require('./routes/dm')

//routes
app.use('/dep', depRoutes)
app.use('/emp', EmpRoutes)
app.use('/da', daRoutes)
app.use('/dm', dmRoutes)

// Check if the connection is successful
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database is connected');
        connection.release();
    }
});

const port = process.env.PORT || 5000;

// Listen on environment port or 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});