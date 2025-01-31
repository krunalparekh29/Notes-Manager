const {Note,User} =require('../models');
const { Op } = require("sequelize");


const createNote = async (userId,title,content)=>{
  // console.log(userId,title,content);
    const note = await Note.create({title,content,userId});
    // console.log(note);
    return note;
}

const getAllNotesByUser=async(userId)=>{
  // console.log(userId);
    return await Note.findAll({where:{userId}});
    
}

const getNoteById=async(id)=>{
    return await Note.findByPk(id,{
      include:{model:User,as:"user",attributes:["id","name","email"]},
    });
}

const updateNote=async(id,title,content)=>{
  const note = await  Note.findByPk(id);
  if(!note) return null;
  await note.update({ title, content });
  return note;

}

const deleteNote=async(id)=>{
    const deleted= await Note.destroy({where:{id}});
    return deleted?true:false;
};

const searchNoteByTitle=async(userId,query)=>{
  const notes=await  Note.findAll({
    where:{
      userId:userId,
      title:{[Op.iLike]:`${query}`},
    }
  })
  // console.log(notes);
  return notes;
}

module.exports={
  createNote,
  getAllNotesByUser,
  getNoteById,
  updateNote,
  deleteNote,
  searchNoteByTitle,
};