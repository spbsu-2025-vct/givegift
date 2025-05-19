import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import router from './routes/index.mjs'
import errorHandler from './middleware/errorHandlingMiddleware.mjs'
import sequelize from './db.mjs'

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        )
    } catch (err) {
        console.error(err)
    }
}

start()
