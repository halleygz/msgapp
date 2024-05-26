import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

import messageRoutes from './routes/message.routes.js'
import connectMongo from './db/connetMongo.js'

const app = express()
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

//middleware
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

//root route
app.get('/', (req, res) => {
    res.send('server ready')
})


app.listen(PORT, ()=>{
    connectMongo()
    console.log(`server runnign on port ${PORT}`)
})