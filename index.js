import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import listingRouter from './routes/listing.route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = [           // Local frontend
    'https://rentnow-indol.vercel.app',   // Deployed frontend
    'https://script-assist-alpha.vercel.app/',
    
];

// Configure CORS
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Set custom CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',  allowedOrigins); // Allow specific frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow necessary methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow necessary headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server and bind to 0.0.0.0
app.listen(5000, () => {
    console.log(`Server is running on${port} !!!`);
});
