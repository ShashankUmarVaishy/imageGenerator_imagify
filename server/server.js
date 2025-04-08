import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';


// if availabl then fine else use default port 4000
const PORT=process.env.PORT || 4000 
const app = express();



// middleware
app.use(express.json());//requests parsed using json
app.use(cors());
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)


// database connection
await connectDB()


// routes
app.get('/', (req, res) => 
    res.send('Welcome to the server! & API Working')
)


//starting the server
app.listen(PORT,()=>console.log('Server is running on port ',PORT))