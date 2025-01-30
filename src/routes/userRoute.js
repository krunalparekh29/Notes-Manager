const userController= require('../controllers/userController');
const authenticate=require('../middleware/authenticate');
const express= require('express');
const router= express.Router();

router.get('/',authenticate,userController.getAllUsers);
router.post('/signup',userController.createUser);
router.post("/login", userController.loginUser);
router.get('/:id',userController.getUserById);
router.put('/:id',authenticate,userController.updateUser);
router.delete('/:id',userController.deleteUser);


module.exports=router;