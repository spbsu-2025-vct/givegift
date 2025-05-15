import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Interest = sequelize.define('interest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

export { Interest }
