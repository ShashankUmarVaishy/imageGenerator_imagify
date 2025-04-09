import { Hono } from 'hono';
import { generateImage } from '../controllers/imageController.js';
import userAuth from '../middlewares/auth.js';

const imageApp = new Hono();

imageApp.post('/generate-image', userAuth, generateImage);

export default imageApp;
