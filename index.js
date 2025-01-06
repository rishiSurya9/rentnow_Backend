import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port =  process.env.PORT || 5000;
const allowedOrigins = [
    'http://localhost:3000',              // Local frontend
    'https://rentnow-indol.vercel.app', // Deployed frontend
  ];
  app.use(cors({
    origin: ['http://localhost:3000', 'https://rentnow-indol.vercel.app'], // Add your actual frontend URLs here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rentnow-indol.vercel.app'); // Allow specific frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the necessary methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow necessary headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
  });
  
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
    
//mongodb://localhost:27017/
app.listen(port,()=>{
    console.log(`Server is running on port ${port} !!!`);
})

app.use(express.json());

app.use('/api/auth',authRouter);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 5000;
    const message  = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        Sucess: false,
        statusCode,
        message
    });
});