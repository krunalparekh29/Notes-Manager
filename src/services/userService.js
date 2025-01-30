const {User} =require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const  getAllUsers=async ()=>{
    return await User.findAll();
}

const  getAllUsersById=async (id)=>{
    return await User.findByPk(id);
}

const getUserByEmail=async(email)=>{
   return await  User.findOne({where:{email}});
}
//signup route
const  createUser=async (name,email,password)=>{
    console.log(name);
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedpassword=await bcrypt.hash(password,salt);
    return await User.create({name,email,password:hashedpassword});
 
}
//login route
const loginUser=async(email,password)=>{
      const user = await User.findOne({where:{email}});
    //   console.log(user);
      if(!user) return null;
     const isMatch = await bcrypt.compare(password,user.password);
     console.log(isMatch);
     if(!isMatch) return null;
      console.log(process.env.JWT_SECRET);
     const token= jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"})
     console.log(token);
     return {user,token};
}

const updateUser=async(id,name,email)=>{
    const user = await  User.findByPk(id);
    if(!user) return null;
    await user.update({name, email});
    return user;
}

const deleteUser=async(id)=>
{
   const deleted= User.destroy({where:{id}});
   return deleted?true:false;
}


module.exports={
    createUser,
    getAllUsers,
    getAllUsersById,
    updateUser,
    deleteUser,
    loginUser,
    getUserByEmail
  };