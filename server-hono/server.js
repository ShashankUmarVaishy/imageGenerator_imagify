// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRoutes.js';


// // if availabl then fine else use default port 4000
// const PORT=process.env.PORT || 4000 
// const app = express();



// // middleware
// app.use(express.json());//requests parsed using json
// app.use(cors());


// //routes
// app.use('/api/user',userRouter)
// app.use('/api/image',imageRouter)


// // database connection
// await connectDB()


// // routes
// app.get('/', (req, res) => 
//     res.send('Welcome to the server! & API Working')
// )


// app.listen(PORT,()=>console.log('Server is running on port ',PORT))

import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import {cors} from 'hono/cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

// connect to database
await connectDB();

const PORT = process.env.PORT || 4000;
const app = new Hono();

// middleware
app.use('*', cors());

// routes
app.route('/api/user', userRouter);
app.route('/api/image', imageRouter);

app.get('/', (c) => c.text('Welcome to the server! & API Working'));

// start the server
serve({ fetch: app.fetch, port: Number(PORT) });
console.log('Server is running on port', PORT);
