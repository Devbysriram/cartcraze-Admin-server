const mongoose = require('mongoose')

let connectDB =async (uri) =>{
   await mongoose.connect(uri)
   return console.log('Database connection established');
}

module.exports = {connectDB}