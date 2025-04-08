import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    amount:{type:Number,required:true},
    plan:{type:String,required:true},
    credits:{type:Number,required:true},
    payment:{type:Boolean,default:false},//if payment is done or not
    date:{type:Number},//date of transaction
})

const transactionModel= mongoose.models.transaction || mongoose.model('transaction',transactionSchema)
export default transactionModel;   