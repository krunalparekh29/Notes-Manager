const userService=require('../services/userService');

const createUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await userService.getUserByEmail(email);
        if(existingUser)return res.status(400).json({ error: "User already exists" });

        
        const user = await userService.createUser(name,email,password);
        console.log(user);
        res.status(201).json(user);
        
    }
    catch(error){
        res.status(500).json({ error: "Failed to create user" });
    }
};


const loginUser=async(req,res)=>
{
    try{
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const userWithToken = await userService.loginUser(email, password);
         
        if (!userWithToken) return res.status(401).json({ error: "Invalid email or password" });
        res.status(200).json(userWithToken);
       } 
    catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
}


const getAllUsers = async(req,res)=>{
    try{
        // const {userId}=req.params;
        const users = await userService.getAllUsers();
        res.status(201).json(users);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch users" });

    }
};

const getUserById = async(req,res)=>{
    try{
        const id=req.params.id;
        const user = await userService.getUserById(id);
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({ error: "Failed to fetch user by id" });

    }
};

const updateUser = async(req,res)=>{
    try{
        const {name,email}=req.body;
        const user = await userService.updateUser(req.params.id,name,email);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ error: "Failed to update user" });

    }
};

const deleteUser = async(req,res)=>{
    try{
       
        const success = await userService.deleteUser(req.params.id);
        if (!success) return res.status(404).json({ error: "User not found" });
        res.status(204).send();
    }
    catch(error){
        res.status(500).json({ error: "Failed to delete user" });

    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
  };

