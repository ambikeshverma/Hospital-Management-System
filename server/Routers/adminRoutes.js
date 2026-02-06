import express from "express";
import bcrypt from "bcrypt";
import Doctor from "../Models/userSchema.js";
import AppointmentSchema from '../Models/appointment.js'
import allowRoles from "../Middlewares/role_middleware.js";
import upload from "../Middlewares/upload.js";

const router = express.Router();

/**
 * ADD Doctor (Admin only)
 */
router.post(
  "/add-doctor",
  allowRoles("admin"),upload.single("profileImage"),
  async (req, res) => {
    try {
    const {name ,email,age,contact, password, degrees, experience, expertise, consultationFee, slots} = req.body
      const existingUser = await Doctor.findOne({ email });
     if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const imagePath = req.file
        ? `/uploads/profiles/${req.file.filename}`
        : "";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const doctor = await Doctor.create({
        name,
        email,
        age,
        contact,
        password: hashedPassword,
        role:"doctor",
        doctorProfile: {
        profileImage: imagePath,
        degrees,
        experience,
        expertise:Array.isArray(expertise) ? expertise : [expertise],
        consultationFee,
        slots:Array.isArray(slots) ? slots : [slots]
        }
      });
      res.status(201).json({
        message: "Doctor added successfully",
        doctor
      });
    } catch (error) {
      res.status(500).json({ msg: error.msg });
    }
  }
);

/**
 * UPDATE Doctor (Admin or Doctor itself)
 */
router.put(
  "/update/:id",
  allowRoles("admin", "doctor"),
  async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!doctor)
        return res.status(404).json({ message: "Doctor not found" });

      res.json({
        message: "Doctor updated successfully",
        doctor
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

/**
 * DELETE Doctor (Admin only)
 */
router.delete(
  "/delete/:id",
  allowRoles("admin"),
  async (req, res) => {
    try {
      const doctor = await Doctor.findByIdAndDelete(req.params.id);

      if (!doctor)
        return res.status(404).json({ message: "Doctor not found" });

      res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get('/getAllAppointment',allowRoles("admin"), async(req, res)=>{
    try{
       const AllAppointments = await AppointmentSchema.find().sort({ updatedAt: -1 })
       .populate("user", "name email",)
       .populate("doctor","name")
       res.status(200).json(AllAppointments)
    }catch(err){
    res.status(500).json({msg:err.message})
   }
 })

router.get('/getAppointment/:doctorId',allowRoles("doctor"), async(req, res)=>{
  const { doctorId } = req.params
    try{
       const AllAppointments = await AppointmentSchema.find({doctor:doctorId}).sort({ updatedAt: -1 })
       .populate("user", "name email",)
       .populate("doctor","name")
       res.status(200).json(AllAppointments)
    }catch(err){
    res.status(500).json({msg:err.message})
   }
 })


router.put("/appointments/Update/:id", allowRoles("admin", "doctor"), async (req, res) => {
  try {
    const { id } = req.params;
    const { currentStatus } = req.body;

    const allowedStatus = ["Pending", "Approved", "Rejected","Completed"];
    if (!allowedStatus.includes(currentStatus)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    const updatedAppointment = await AppointmentSchema.findByIdAndUpdate(
      id,
      { currentStatus },
      { new: true } // return updated doc
    )
      .populate("user", "name email")
      .populate("doctor", "name");

    if (!updatedAppointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    res.status(200).json({
      msg: "Appointment status updated",
      appointment: updatedAppointment,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.put("/doctor/update-slots/:doctorId",allowRoles("admin"), async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { slots } = req.body;

    if (!Array.isArray(slots)) {
      return res.status(400).json({ msg:"Slots must be an array" });
    }
    if (slots.length === 0){
      return res.status(400).json({ msg: "Slots must be have values" });
    }
     const doctor = await Doctor.findByIdAndUpdate(
     doctorId,
    { $addToSet: { "doctorProfile.slots": { $each: slots } } }, 
     { new: true }
     );

    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.status(200).json({ msg: "Slots updated", doctor });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update slots" });
  }
} );

export default router;