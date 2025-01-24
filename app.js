const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./configs/mongoose.config')
const userRouter = require('./routes/user.route')
const orderRouter = require('./routes/order.route')

const corsOptions = {
  origin: 'https://mahakumbhamritjal.vercel.app/',
  credentials: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/user", userRouter)
app.use("/api/orders", orderRouter)

app.listen(process.env.PORT || 8000, () => {
  console.log(`app : Server is running on port ${process.env.PORT || 8000}`);
  connectDB()
})
