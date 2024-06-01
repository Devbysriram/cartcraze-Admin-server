let User = require("../Models/userShema");
let Products = require("../Models/productSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// get all Products
// GET /Products
// private access

const getAllProductss = asyncHandler(async (req, res) => {
  const Productss = await Products.find().lean();
  if (!Productss) {
    return res.status(400).json({ Productss: "No Productss found" });
  }
  res.json(Productss);
});

// create New Productss

const createProductss = asyncHandler(async (req, res) => {
  const { user, ItemName , description , Price} = req.body;
  const newProductss = await Products.create({  user, ItemName , description , Price });
  res.json(newProductss)
});

// Update Productss
const updateProductss = asyncHandler ( async (req,res)=>{

  let {id} = req.params
  let { ItemName , description , Price, Availability  } = req.body
  let findProduct = await Products.findByIdAndUpdate(id , { ItemName , description , Price , Availability });

  // Check if product is found
  if (!findProduct) {
      return res.status(404).json({ message: "Product not found" });
  }
  // Respond with the found product
  res.json(findProduct);
})

// Delete Productss
const deleteProductss = asyncHandler ( async (req,res)=>{
  const {id} = req.params

  let deleteOption = await Products.findOneAndDelete(id)
  res.json(deleteOption)

})

module.exports = { getAllProductss, createProductss,updateProductss, deleteProductss };
