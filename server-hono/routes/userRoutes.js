import express from "express";
// import {registerUser,loginUser, userCredits, paymentRazorpay, verifyRazorpay} from "../controllers/userController.js";
// import userAuth from "../middlewares/auth.js";


// const userRouter=express.Router();//creating router using express.Router() method


// userRouter.post('/register',registerUser);
// userRouter.post('/login',loginUser);
// userRouter.get('/credits',userAuth,userCredits);
// userRouter.post('/pay-razor',userAuth,paymentRazorpay);
// userRouter.post('/verify-razor',verifyRazorpay);
// export default userRouter;//exporting the router so that we can use it in server.js file

// //localhost:4000/api/user/register->
// //localhost:4000/api/user/login->
// //localhost:4000/api/user/credits->
import { Hono } from 'hono';
import { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';

const userRouter = new Hono();

// Route definitions using Hono syntax
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-razor', userAuth, paymentRazorpay);
userRouter.post('/verify-razor', verifyRazorpay);

export default userRouter;
