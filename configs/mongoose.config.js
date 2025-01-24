const mongoose = require('mongoose')

async function connectDB (){
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("mongoose.config : Connected to database")
    
  }
   catch (err) {
    console.log("mongoose.config : Error while connected to database")

  }
}

module.exports = connectDB