import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

 const registerUser = async (req, res) => {
    try{
        const{name,email,password}=req.body;//destructuring the data from request body
       if(!name || !email || !password){
            return res.json({success:false,message:"Please fill all the fields"})
        }
        const salt=await bcrypt.genSalt(10);//generating salt for password hashing
        const hashedPassword=await bcrypt.hash(password,salt);//hashing the password using bcrypt

        const userData={
            name,email,password:hashedPassword
        }
        const newUser=new userModel(userData);//creating new user using userModel
        const user=await newUser.save();//saving the user to the database and saved to the variable user

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);//creating token using jwt.sign() method


        res.json({success:true,token,user:{name:user.name}})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

const loginUser = async (req, res) => {
    try{
        const {email,password}=req.body;//destructuring the data from request body
        if(!email || !password){
            return res.json({success:false,message:"Please fill all the fields"})
        }
        const user=await userModel.findOne({email});//finding the user using email from the database

        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);//comparing the password using bcrypt.compare() method
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);//creating token using jwt.sign() method

        res.json({success:true,token,user:{name:user.name}})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const userCredits=async(req,res)=>{
    try{
        const {userId}=req.body;//need middleware to get user ID

        const user=await userModel.findById(userId);//finding the user using userId from the database
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})//sending the user credits to the client

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay=async(req,res)=>{
    try{
        const {userId,planId}=req.body;//need middleware to get user ID and plan ID
        const userData=await userModel.findById(userId);//finding the user using userId from the database
        if(!userId || !planId || !userData){
            return res.json({success:false,message:"Missing Details or user not found"})
        }
        console.log(userData)
        let credits,plan,amount,date;
        switch(planId){
            case 'Basic':
                plan='Basic';
                console.log('Basic plan selected');
                credits=100;
                amount=1000
                break;
            case 'Advanced':
                plan='Advanced';
                console.log('Advanced plan selected');
                credits=500;
                amount=5000
                break;
            case 'Business':
                plan='Business';
                console.log('Business plan selected');
                credits=5000;
                amount=25000
                break;
            default:
                console.log('undefined plan selected');
                return res.json({success:false,message:"Invalid Plan"})    
        }
        date=Date.now();
        const transactionData={
            userId,
            plan,
            credits,
            amount,
            date
        }
        const newTransaction=await transactionModel.create(transactionData);//creating new transaction using transactionModel
        
        const options={
            amount:amount *100,//why ? becauese razorplay considers 155 as 1.55
            currency:process.env.CURRENCY,
            receipt:newTransaction._id,
        }
        
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error.message})
            }
            res.json({success:true,order})//sending the order details to the client
        })
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay=async(req,res)=>{
    try{
        const {razorpay_order_id}=req.body;//destructuring the data from request body

        const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id);//fetching the order details using razorpayInstance.orders.fetch() method
        
        if(orderInfo.status === 'paid'){
            const transactionData=await transactionModel.findById(orderInfo.receipt);//finding the transaction using orderInfo.receipt from the database
            if(transactionData.payment){
                return res.json({success:false,message:"Payment Failed"})
            }
            const userData=await userModel.findById(transactionData.userId);//finding the user using transactionData.userId from the database
            const creditBalance=userData.creditBalance+transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id,{creditBalance});//updating the user credit balance using userModel.findByIdAndUpdate() method
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true});//updating the transaction payment status using transactionModel.findByIdAndUpdate() method
            res.json({success:true, message:"Credits added"})
        }else{
            res.json({success:false, message:"Payment Failed"})
        }
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export{registerUser,loginUser,userCredits,paymentRazorpay,verifyRazorpay};//exporting the userModel and registerUser and loginUser functions so that we can use it in userRoutes.js file