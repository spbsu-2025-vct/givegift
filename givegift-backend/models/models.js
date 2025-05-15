const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Interest = sequelize.define('interest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

module.exports = {
    Interest
}