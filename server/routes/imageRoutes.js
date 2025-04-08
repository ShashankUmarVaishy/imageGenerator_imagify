import express from 'express';
import { generateImage} from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';


const imageRouter=express.Router();//creating router using express.Router() method

imageRouter.post('/generate-image',userAuth,generateImage);//creating route for image generation using POST method

export default imageRouter;//exporting the router so that we can use it in server.js file