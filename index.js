import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Allowed origins for CORS
const allowedOrigins = [
    'http://localhost:3000',              // Local frontend
    'https://rentnow-indol.vercel.app',   // Deployed frontend
];

// Configure CORS
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Set custom CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rentnow-indol.vercel.app'); // Allow specific frontend origin
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
app.use('/api/auth', authRouter); 

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

// app.get('/google');
// app.get('/auth/google/callback', passport.authenticate('google',{session:false, failureRedirect:'/login'}),(req,res)=>{

//     const {user, accessToken, refreshToken, AccessTokenExp, refreshTokenExp} = req.user

//     setTokenCookie(res,accessToken,refreshToken,AccessTokenExp,refreshTokenExp)

//     //successful authentication redirect home 
//     res.redirect('/')
// })

// Start the server and bind to 0.0.0.0
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port} !!!`);
});
