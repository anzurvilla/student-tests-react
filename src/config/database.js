'use strict';

// Import ENV VARS
require('dotenv').config({ path: require('path').resolve('.env') });

const { Sequelize, DataTypes, Op } = require('sequelize');

// Connect to MySQL database
const sequelize = new Sequelize(
    process.env.DB_NAME, // database name
    process.env.DB_USERNAME, // database username
    process.env.DB_PASSWORD, // dataqbase user password
    {
        host: process.env.DB_HOST,
        // the sql dialect of the database, supported: 'mysql', 'sqlite', 'postgres', 'mssql'
        //⚠️You'll also have to manually install the driver for your database of choice:
        // # One of the following:
        // $ npm install --save pg pg-hstore # Postgres
        // $ npm install --save mysql2
        // $ npm install --save mariadb
        // $ npm install --save sqlite3
        // $ npm install --save tedious # Microsoft SQL Server
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT, //custom port; default: dialect default
        // pool configuration used to pool database connections
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },
        // disable logging; default: console.log
        logging: process.env.SQLITE_CONSOLE_LOG=='true' ? console.log : false    
    },
    
);

(async () => {
    try {
        await sequelize.authenticate();
        if(process.env.NODE_ENV=='development') {
            console.log('✔️ ','Database connection has been established successfully.');
        }
    } catch (err) {
        if(process.env.NODE_ENV=='development') {
            console.error('❌ ','Unable to connect to the database:', `${err.name||''} ${err.message||''}`);
        }
    }
}) ();

module.exports = { sequelize, DataTypes, Op }
