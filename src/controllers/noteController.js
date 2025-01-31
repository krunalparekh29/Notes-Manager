const noteService=require('../services/noteService');
const noteSchema=require('../utils/validators');

const createNote = async(req,res)=>{
    try{
        const {error}=noteSchema.validate(req.body);
        if(error)return res.status(400).json({error:error.details[0].message});
        const {title,content}=req.body;
        const note = await noteService.createNote(req.params.userId,title,content);
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
        console.log(notes);
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
        const {error}=noteSchema.validate(req.body);
        if(error) return res.status(400).json({error:error.details[0].message});
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
        const success = await noteService.deleteNote(req.params.id);
        if (!success) return res.status(404).json({ error: "Note not found" });
        res.status(204).send();
    }
    catch(error){
        res.status(500).json({ error: "Failed to delete note" });
    }
};

const searchNoteByTitle=async(req,res)=>{
    try{
        const {userId}=req.params;
        console.log(userId);
        const {query}=req.query;
        console.log(query);
        if(!query) return res.status(400).json({ error: "Search query is required" })
        const notes = await noteService.searchNoteByTitle(userId,query);
        res.json(notes);
        }catch(error){
            res.status(500).json({ error: "Failed to search notes" });
        }
    };
module.exports = {
    createNote,
    getAllNotesByUser,
    getNoteById,
    updateNote,
    deleteNote,
    searchNoteByTitle,
  };

