import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema(
  {
    tabletName: {
      type: [String],   // because you are using TagsInput (array)
    },
    dose: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    timePeriod: {
      type: String,  // e.g. "5 days", "1 week", "Morning & Night"
    },
  },
  { _id: false } // prevents auto _id for each medicine object (optional but cleaner)
);

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    report:{
      type:String,
      default:""
    },
    prescription: [medicineSchema], // Array of medicines
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);
