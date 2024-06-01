const express = require('express')
const router = express.Router()
const path = require('path');
const { getAllNotes, createNotes, deleteNotes, updateNotes } = require('../Controllers/notesController');



router.route('/')
.get(getAllNotes)
.post(createNotes)
.patch(updateNotes)
.delete(deleteNotes)


module.exports = router;