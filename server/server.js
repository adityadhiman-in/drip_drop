import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path"; // For handling file paths
import authRoutes from './routes/authRoutes.js';
import connectDb from "./config/db.js";

dotenv.config();

// Configuration
const port = process.env.PORT || 5000;
const app = express();

// Database connection
connectDb();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());  
app.use(cors());    
app.use(morgan("common"));

// Session Management
app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, 
        collectionName: 'sessions',
        ttl: 24 * 60 * 60  
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',  
        httpOnly: true,  
        maxAge: 1000 * 60 * 60 * 24  
    }
}));

// Auth routes
app.use("/auth", authRoutes);

// Serve React frontend from dist folder in production
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 route handling
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Server listening
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
