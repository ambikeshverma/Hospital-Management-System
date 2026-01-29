import express from 'express';
import AppointmentSchema from '../Models/appointment.js'
import createdUser from '../Models/userSchema.js';

const router = express.Router();

router.post('/createAppointment', async(req, res)=>{
   
    const UserId =  req.user.id
    try{
    const user = await createdUser.findById(UserId)
    if(!user){
        return res.status(404).json({msg:"User not found"})
    }
    const {ptName, ptEmail, ptPhone, ptAge, ptCareOf, ptAddress, selectedSlot, doctorId} = req.body
     const doctor = await createdUser.findById(doctorId)
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }
     if (!doctor.doctorProfile.slots.includes(selectedSlot)) {
     return res.status(400).json({ msg: "Selected slot is no longer available" });
    }
    doctor.doctorProfile.slots = doctor.doctorProfile.slots.filter(s => s !== selectedSlot);
    await doctor.save();

    const createdAppointment = await AppointmentSchema.create({
        user:UserId,
        doctor:doctorId,
        ptName,
        ptEmail,
        ptPhone,
        ptAge,
        ptCareOf,
        ptAddress,
        selectedSlot
    })
   
    res.status(201).json(createdAppointment);
    }catch(err){
        res.status(500).json({msg: err.message})
    }  
})

export default router;