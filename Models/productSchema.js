const mongoose = require('mongoose')


const productSchema = mongoose.Schema({

  ItemName : {
    type : String ,
    required : true ,
  },
  description : {
    type : String ,
    required: true,
  },
  Price: {
    type : String,
    required: true,
  },
  Availability : {
    type : Boolean,
    default : true
  }
},
{
    timestamps : true
}
)




module.exports = mongoose.model('Products' , productSchema)