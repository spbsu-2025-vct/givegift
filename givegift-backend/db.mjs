import { Sequelize } from 'sequelize'
import fs from 'fs'

const dialectOptions = process.env.NODE_ENV === 'production' ? {
    ssl: {
        require: true,
        ca: fs.readFileSync(process.env.CERT_PATH),
        rejectUnauthorized: false,
    },
} : {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: dialectOptions,
    }
)

export default sequelize
