import express, {Response, Request} from 'express'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import currencyRoutes from './routes/currency.routes'


import {swaggerDocs} from './swaggerdocs'

const cors = require('cors');
const cookieParser = require('cookie-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require("swagger-jsdoc")

const app = express()

app.use(express.json())
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig))
app.use(cookieParser())

const specs = swaggerJsdoc(swaggerDocs);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))



app.use('/api/v1/auth', authRoutes)  
app.use('/api/v1/users', userRoutes)  
app.use('/api/v1/currencies', currencyRoutes)  


app.get("/", (req:Request, res:Response) => res.json({message: `Volopa Take Home Challege API V1. Visit 'http://localhost:4000/api-docs' to view open api docs and endpoints`}));

export default app;