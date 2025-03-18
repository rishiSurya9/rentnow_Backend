 import User from '../models/user.model.js';
 import bcrypt from 'bcryptjs';
 import { errorHandler } from '../utils/error.js';
 import jwt from 'jsonwebtoken';



export const  signup  = async (req,res,next) => {
   const {username , email , password} = (req.body);
   const hashPsw = bcrypt.hashSync(password,10);
   const newUser = new User({username,email,password:hashPsw});
   
   try{
    await newUser.save();
    res.status(201).json("user created successfully");
   }catch(err){
       next(err);
   }
  
}

export const  login  = async (req,res,next) => {
    const {email , password} = (req.body);
    try{
        const valid_user = await User.findOne({email});
        if(!valid_user){
            return next(errorHandler(404,"user not found"));
        }
        const isMatch = await bcrypt.compare(password,valid_user.password);
        if(!isMatch){
            return next(errorHandler(401,"invalid credentials"));
        }
        const token = jwt.sign({id:valid_user._id},process.env.JWT_SECRET);
        const {password: pass, ...rest}= valid_user._doc;
        res.cookie('access_token', token, {
            httpOnly: false, // ✅ Allow frontend JavaScript access (optional)
            secure: true, // ✅ Required for cross-site cookies
            sameSite: "None", // ✅ Allow cookie to be sent in cross-origin requests
            domain: ".vercel.app", // ✅ Set for frontend domain (not backend)
            path: "/", }).status(200).json(rest);

    }catch(err){
        next(err);
    }
}

// export const  update  = async (req,res,next) => {
//     const {email , oldPassword , newPassword} = (req.body);
//     try{
//         const valid_user = await User.findOne({email});
//         if(!valid_user){
//             return next(errorHandler(404,"user not found"));
//         }
//         const isMatch = await bcrypt.compare(oldPassword,valid_user.password);
//         if(!isMatch){
//             return next(errorHandler(401,"invalid credentials"));
//         }
//         const hashPsw = bcrypt.hashSync(newPassword,10);
//         valid_user.password = hashPsw;
//         await valid_user.save();
//         res.status(200).json("password updated successfully");
//     }catch(err){
//         next(err);
//     }
// }
  

export const google = async (req,res,next) => {
    try{
        const  user = await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password: pass, ...rest}= user._doc;
            res.cookie('access_token', token, {
                secure:  process.env.NODE_ENV === 'production', 
                httponly: true,
                sameSite: 'none', 
                domain: 'rentnow-backend.onrender.com',}).status(200).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPsw = bcrypt.hashSync(generatedPassword,10);
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4),email:req.body.email,password:hashPsw , avatar:req.body.photo});
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password: pass, ...rest}= newUser._doc;
            res.cookie('access_token', token, {
                secure:  process.env.NODE_ENV === 'production', 
                httponly: true,
                sameSite: 'none',                 
                domain: 'rentnow-backend.onrender.com'}).status(200).json(rest);        

        }
        console.log(token);
    }
    catch(error){
        next(error);
    }
}


export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };