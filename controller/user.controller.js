import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        messsage:'Api route is working ',
    })
}


export const updateUser = async (req, res, next) => {

    if(req.user.id !== req.params.id ){
        return next (errorHandler(401,'You can only update your own account'))
    }

    try {
        if(req.body.password){
            req.body.password =  bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser= await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },

        },{new: true})

        const {password, ...rest}= updateUser._doc;
        res.status(200).json(rest)
        
    } catch (error) {
        next(error)
    }
}


export const DeleteUser = async (req, res, next) =>     { 
    if(req.user.id !== req.params.id ){
        return next (errorHandler(401,'You can only delete your own account'))
    }

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}
export const getUserListing = async (req, res, next) => {
    try {
        const userListing = await Listing.find({userRef:req.user.id})
        res.status(200).json(userListing)
    }
  catch (error) {
        next(error)
    }

}  