import express from "express";
import allowRoles from "../Middlewares/role_middleware.js";
import DoctorPrescription from "../Models/DoctorPrescription.js";
import { prescriptionUpload } from "../Middlewares/prescriptionUpload.js";

const router = express.Router();

router.post("/add-prescription",allowRoles("doctor"),
  prescriptionUpload.single("report"),
  async (req, res) => {
    try {
      const { appointmentId } = req.body;
      
     const prescription = JSON.parse(req.body.prescription);
      const newPrescription = new DoctorPrescription({
        appointmentId,
        doctorId: req.user.id,
        report: req.file ? req.file.path : null,
        prescription
      });

      await newPrescription.save();

      res.status(201).json({
        msg: "Prescription added successfully",
        newPrescription,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

router.get("/get-all-prescription/:appointmentId", async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const prescriptions = await DoctorPrescription.find({ appointmentId }).sort({ createdAt: -1 })

    if (!prescriptions.length) {
      return res.status(404).json({ msg: "No prescriptions found for this appointment" });
    }

    res.status(200).json({
      msg: "Prescriptions fetched successfully",
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching prescriptions", error: err.message });
  }
});

export default router;
