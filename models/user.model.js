import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
       default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3gyFNHmjfgWOjb05uBtqga&ust=1736957563796000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiSu6bN9YoDFQAAAAAdAAAAABAE"
    },
},
{
    timestamps:true
}
);
const User = mongoose.model('User',userSchema);
export default User;