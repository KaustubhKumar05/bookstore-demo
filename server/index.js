import 'dotenv/config'
import { Sequelize } from "sequelize"
// import { initModels } from './models'

const sequelize = new Sequelize(process.env.PG_CONNECTION_URL)

try {
    await sequelize.authenticate()
    console.log("Connected to the database")
} catch(err) {
    console.error("Could not connect to the database: ", err)
}

// const { Book, Author } = initModels(sequelize)


