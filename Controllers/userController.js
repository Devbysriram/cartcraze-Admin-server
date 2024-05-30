let User = require("../Models/userShema");
let Note = require("../Models/notesSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// get all users
// GET /users
// private access

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ users: "No users found" });
  }
  res.json(users);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !roles) {
    res.json({ Error: "All fields are required" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ ErrorMsg: "User Already Registered" });
  }


  // Hashing Password
  const hashpassword = await bcrypt.hash(password,10)

  const userObject = { username , password : hashpassword , roles }

  const newUser = await User.create(userObject)

  if(newUser)
    {
        res.status(201).json({message : "user Created Successfully" })
    }
    else{
        res.status(400).json({message : "Unable to create User"})
    }

});


const updateUser = asyncHandler( async (req,res) => {

    // find user
    // verify no duplicate
    // hashpassword if password changed
    // update user


    // find user

    let { username, updatedUsername , roles,status, password } = req.body

    let user =await User.find({username}).exec()

    let userId = await user[0]._id

    username = await updatedUsername
    roles = await roles
    status =await status

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await User.findByIdAndUpdate( userId , {username ,roles,status})

    res.json({ Message : updatedUser })


})


const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = { getAllUsers, createUser , updateUser , deleteUser };
