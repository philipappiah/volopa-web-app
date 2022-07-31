import app from "./app";
import Database from './config/db'

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL ||  `mongodb://localhost:27017/mydb`
const PORT = process.env.PORT || 4000

new Database(MONGO_URL).connectDataBase()


app.listen(PORT,  () => {
    console.log(`App is running on port ${PORT}`)
})