'use strict';

// Import SequelizeORM for connect to database
const {sequelize, DataTypes} = require('../config/database');

// Define the Model: Student
module.exports = sequelize.define('student', {
    // attributes
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
},
// Options
{
    // A paranoid table is one that, when told to delete a record, it will not truly delete it.
    // Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.
    // This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    paranoid: true,
});