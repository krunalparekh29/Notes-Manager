const express = require('express');
const router= express.Router();
const authenticate=require('../middleware/authenticate');
const noteController = require('../controllers/noteController');
const { searchNoteByTitle } = require('../services/noteService');

router.get("/:userId",authenticate, noteController.getAllNotesByUser);
router.post("/:userId",authenticate,noteController.createNote);
router.get("/:id",authenticate,noteController.getNoteById);
router.put("/:id",authenticate,noteController.updateNote);
router.delete("/:id",authenticate, noteController.deleteNote);
router.get("/:userId/search", noteController.searchNoteByTitle);

module.exports=router;