import express from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import createdUser from '../Models/userSchema.js';
import AppointmentSchema from '../Models/appointment.js'
import authMiddleware from '../Middlewares/auth_middleware.js';
import allowRoles from "../Middlewares/role_middleware.js";


const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();


router.post('/registration',async (req, res) => {
  try {
    const { name, email, password,} = req.body;

    // Check if user already exists
    const existingUser = await createdUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await createdUser.create({
        name,   
        email,
        password:hashedPassword
    });
    
   res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({msg: err.message || "Server error" });
  }

})

router.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await createdUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role}, JWT_SECRET, { expiresIn: "4h" });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server error"});
  }
})

router.get("/getAllDoctors",authMiddleware, async(req, res)=>{
  
  try{
  const doctors = await createdUser.find({role: "doctor"})
  if(!doctors){
    return res.status(404).json({msg: "No Doctors Available"})
  }
  res.status(200).json(doctors);
  }catch(err){
    return res.status(500).json({msg:"Doctor not found"})
  }

})

//get user details
router.get("/doctor/getProfile",authMiddleware, allowRoles("doctor"), async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await createdUser.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message || "Server error" });
  }
});

router.get('/doctor/specific/:doctorId', authMiddleware, async(req, res)=>{
  try{
      const userId = req.params.doctorId;
      const doctorSpecific = await createdUser.findById(userId)
      if(!doctorSpecific){
        return res.status(404).json({msg:"Doctor Not available"})
      }
      res.status(200).json(doctorSpecific);
  }catch(err){
    res.status(500).json({msg: err.message || "Unable to get data"})
  }
})

router.get('/getAppointment',authMiddleware , async(req, res)=>{
  const  userId = req.user.id
    try{
       const AllAppointments = await AppointmentSchema.find({user:userId}).sort({ createdAt: -1 })
       .populate("user", "name email",)
       .populate("doctor","name")
       res.status(200).json(AllAppointments)
    }catch(err){
    res.status(500).json({msg:err.message})
   }
 })

export default router;