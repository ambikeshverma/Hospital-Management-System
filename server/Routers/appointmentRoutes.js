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

    //Notify doctor
    global.io.to(`doctor-${doctorId}`).emit("new-appointment", {
    message: "New appointment booked",
    createdAppointment,
    });

      // Notify Admins
    global.io.to("admins").emit("new-appointment-admin", {
    message: "New appointment booked",
    createdAppointment,
  });

    res.status(201).json(createdAppointment);
    }catch(err){
        res.status(500).json({msg: err.message})
    }  
})


router.get("/doctor/:doctorId/available-slots", async (req, res) => {
  try {
    const doctor = await createdUser.findById(req.params.doctorId);

    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.json({
      doctorName:doctor.name,
      doctorId: doctor._id,
      availableSlots: doctor.doctorProfile.slots
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.put("/appointments/rebook/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { newSlot } = req.body;

    const appointment = await AppointmentSchema.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const doctor = await createdUser.findById(appointment.doctor);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    const slots = doctor.doctorProfile?.slots || [];

    if (!slots.includes(newSlot)) {
      return res.status(400).json({ msg: "Slot no longer available" });
    }

    doctor.doctorProfile.slots = slots.filter(s => s !== newSlot);
    await doctor.save();

    appointment.selectedSlot = newSlot;
    appointment.currentStatus = "Pending";
    await appointment.save();

    res.json({ msg: "Appointment rebooked successfully", appointment });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;