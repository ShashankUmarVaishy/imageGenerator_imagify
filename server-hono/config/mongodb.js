// import mongoose from "mongoose";


// const connectDB = async () => {

//     mongoose.connection.on('connected',()=>{
//         console.log('MongoDB database connected');
        
//     })
//     await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
// }

// export default connectDB;
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // optional: crash the app if DB fails
  }
};

export default connectDB;
