import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},//unique is true here
    password:{type:String,required:true},
    creditBalance:{type:Number,default:5},
})

const userModel= mongoose.models.user || mongoose.model('user',userSchema)//using userSchema schema it will create model with name user

//it will try to create user model again and again so to solve this we added "mongoose.models.user" 
//first it will search for existing models where name is user, if not found then it will create new model with name user and userSchema schema

export default userModel;   