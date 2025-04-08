import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

export const generateImage=async(req,res)=>{
    try{
        const {userId,prompt}=req.body;//destructuring the data from request body
        const user= await userModel.findById(userId);//finding the user using userId from the database
        if(!user || !prompt){
            return res.json({success:false,message:"user or prompt not found"})
        }
        if(user.creditBalance===0 || user.creditBalance<0){
            return res.json({success:false,message:"Not enough credits",creditBalance:user.creditBalance})
        }

        const formData=new FormData();//creating form data using FormData() constructor
        formData.append('prompt',prompt);//adding prompt to the form data

        
       const data=await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
              },
              responseType:'arraybuffer'
        })
        const base64Image=Buffer.from(data.data,'binary').toString('base64');//converting the image to base64 using Buffer.from() method
        const resultImage=`data:image/png;base64,${base64Image}`//adding the base64 image to the resultImage variable
        await userModel.findByIdAndUpdate(user._id,{
            creditBalance:user.creditBalance-1//updating the user credit balance by 1
        })
        res.json({
            success:true,
            message:"Image generated successfully",
            resultImage,
            creditBalance:user.creditBalance-1//sending the user credit balance to the client
        })

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:`${error.message} this is the error from catch block of image cotroller `})
    }
}