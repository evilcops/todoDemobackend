const express = require('express')

const app = express()
const port = 5000
const connectDb = require('./db/connect')
const cors = require('cors')

//req router
const router = require('./routes/crud')

//Require dotenv
require('dotenv').config()

// //middlewarer(cors)
// app.use((req, res, next) => {
//   headers.append('Access-Control-Allow-Origin', 'http://localhost:3000')
//   headers.append('Access-Control-Allow-Credentials', 'true')

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
//     return res.status(200).json({})
//   }

//   next()
// })

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
)
//Route
app.use('/api/v1/crud', router)

//Connection
const start = async () => {
  try {
    await connectDb(process.env.MONGO_CONNECT)
    app.listen(port, (req, res) => {
      console.log('You are listening to port :', port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
