const noteService=require('../services/noteService');

const createNote = async(req,res)=>{
    try{
        const {title,content}=req.body;
        // console.log(req.params.userId);
        // console.log(title);
        const note = await noteService.createNote(req.params.userId,title,content);
        // console.log(note);
        res.status(201).json(note);
    }
    catch(error){
        res.status(500).json({ error: "Failed to create note" });

    }
};

const getAllNotesByUser = async(req,res)=>{
    try{
        const {userId}=req.params;
        const notes = await noteService.getAllNotesByUser(userId);
        res.status(201).json(notes);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch note" });

    }
};

const getNoteById = async(req,res)=>{
    try{
        const id=req.params.id;
        const note = await noteService.getNoteById(id);
        res.status(201).json(note);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch note by id" });

    }
};

const updateNote = async(req,res)=>{
    try{
        const {title,content}=req.body;
        const note = await noteService.updateNote(req.params.id,title,content);
        if (!note) return res.status(404).json({ error: "Note not found" });
        res.status(200).json(note);
    }
    catch(error){
        res.status(500).json({ error: "Failed to update note" });

    }
};

const deleteNote = async(req,res)=>{
    try{
        // const {title,content}=req.body;
        const success = await noteService.deleteNote(req.params.id);
        if (!success) return res.status(404).json({ error: "Note not found" });
        res.status(204).send();
    }
    catch(error){
        res.status(500).json({ error: "Failed to delete note" });

    }
};

module.exports = {
    createNote,
    getAllNotesByUser,
    getNoteById,
    updateNote,
    deleteNote,
  };

