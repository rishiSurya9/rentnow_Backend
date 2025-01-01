 import user from '../models/user.model.js';
 import bcrypt from 'bcryptjs';
 import { errorHandler } from '../utils/error.js';
 const  signup  = async (req,res,next) => {
   const {username , email , password} = (req.body);
   const hashPsw = bcrypt.hashSync(password,10);
   const newUser = new user({username,email,password:hashPsw});
   
   try{
    await newUser.save();
    res.status(201).json("user created successfully");
   }catch(err){
       next(err);
   }
  
}
export default signup;