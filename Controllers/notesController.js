let User = require("../Models/userShema");
let Note = require("../Models/notesSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// get all notes
// GET /Notes
// private access

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes) {
    return res.status(400).json({ Notes: "No Notes found" });
  }
  res.json(notes);
});

// create New Notes

const createNotes = asyncHandler(async (req, res) => {
  const { user, title, description } = req.body;

  if (!user || !title || !description) {
    res.json({ Error: "All fields are required" });
  }

  const newNotes = await Note.create({ user, title, description });
  res.json(newNotes)
});

// Update Notes
const updateNotes = asyncHandler ( async (req,res)=>{
  const {id , uptitle, updescription } = req.body
  let getNote = await Note.findById(id)
  // getNote.title = await uptitle
  // getNote.description = await updescription

  await Note.findByIdAndUpdate( id , { title : uptitle , description : updescription })
  
  res.json({message : "updated Successfully" , getNote})

})

// Delete Notes
const deleteNotes = asyncHandler ( async (req,res)=>{
  const {id} = req.body

  let deleteOption = await Note.findOneAndDelete(id)
  res.json(deleteOption)

})

module.exports = { getAllNotes, createNotes,updateNotes, deleteNotes };
