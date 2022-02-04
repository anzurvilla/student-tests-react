'use strict';

// Import SequelizeORM for connect to database
const {sequelize, DataTypes} = require('../config/database');
// Import Student model to associate with each other
const StudentModel = require('./student');

// Define the Model: Test
const TestModel = sequelize.define('test', {
    // attributes
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    studentId: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    score: {
        type: DataTypes.DOUBLE.UNSIGNED,
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
            max: 100,
        }
    },
},
// Options
{
    // Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.
    // This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.
    paranoid: true,
    // Custom Scopes
    scopes: {
        datagrid: {
            attributes: [
                'id', 'name', 'student.name', 'score',
            ],
            include: [
                {
                    model: StudentModel,
                    attributes: [],
                }
            ],
            order: [
                ['name', 'ASC']
            ]
        },
    },
});

// Model associations
StudentModel.hasMany(TestModel);
TestModel.belongsTo(StudentModel);

module.exports = TestModel;