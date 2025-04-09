// import jwt from "jsonwebtoken";


// const userAuth=async(req,res,next)=>{
//     const {token}=req.headers;//getting the token from the request headers

//     if(!token){
//         return res.json({success:false,message:"Not Authorised, Login Again"})
//     } 
//     try{
//         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
//         if(tokenDecode.id){
//             req.body = req.body || {};
//             req.body.userId=tokenDecode.id;//adding userId to the request body
//         }else{
//             return res.json({success:false,message:"Not Authorised, Login Again"})
//         }
//         next();
//     }catch(error){
//         console.log(error);
//         return res.json({success:false,message:error.message})
//     }
// };

// export default userAuth;
import { verify } from "hono/jwt"  
const userAuth = async (c, next) => {
  const token = c.req.header("token");

  if (!token) {
    return c.json({ success: false, message: "Not Authorised, Login Again" }, 401);
  }

  try {
    const tokenDecode = await verify(token, process.env.JWT_SECRET);
    
    if (tokenDecode.id) {
      c.userId = tokenDecode.id; // storing userId in context
      await next();
    } else {
      return c.json({ success: false, message: "Not Authorised, Login Again" }, 401);
    }
  } catch (error) {
    console.log(error);
    return c.json({ success: false, message: error.message }, 401);
  }
};

export default userAuth;
