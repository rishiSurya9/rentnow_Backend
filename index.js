import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port =  3001;
const allowedOrigins = [
    'http://localhost:3000',              // Local frontend
    'https://rentnow-indol.vercel.app', // Deployed frontend
  ];
  app.use(cors({
    origin: ['http://localhost:3000', 'https://rentnow-indol.vercel.app/signup','https://rentnow-indol.vercel.app'], // Add your actual frontend URLs here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});
    ;
app.listen(port,()=>{
    console.log(`Server is running on port ${port} !!!`);
})

app.use(express.json());
app.get('/',(req,res)=>{
   res.send("Hello")
})
app.use('/api/auth',authRouter);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message  = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        Sucess: false,
        statusCode,
        message
    });
});