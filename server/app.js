import express from 'express'
import userRouter from "./Routers/userRouters.js"
import adminRouter from "./Routers/adminRoutes.js"
import appointmentRouter from './Routers/appointmentRoutes.js'
import drPrescriptionRouter from './Routers/drPrescriptionRoutes.js'
import authMiddleware from './Middlewares/auth_middleware.js'
import aiSuggestionRouter from './Routers/aiSuggestion.js'
import connectDB from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express(); 
app.use(express.json());
app.use("/uploads", express.static("uploads"));
connectDB();
app.use(cors());


app.use('/user',userRouter)
app.use('/admin',authMiddleware, adminRouter)
app.use('/app', authMiddleware, appointmentRouter)
app.use('/doctor',authMiddleware,drPrescriptionRouter)
app.use("/api/ai",aiSuggestionRouter);




export default app