import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

//root route
app.get('/', (req, res) => {
    res.send('server ready')
})

app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>console.log(`server runnign on port ${PORT}`))