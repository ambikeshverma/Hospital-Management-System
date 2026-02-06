import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true},
    doctor: {type: mongoose.Schema.Types.ObjectId,ref: "User", required: true},
    ptName: {type:String, default:""},
    ptEmail:{type:String, default:""},
    ptPhone:{type:String, default:""},
    ptAge:{type:String, default:""},
    ptCareOf:{type:String, default:""},
    ptAddress:{type:String, default:""},
    selectedSlot:{ type: [String], default: [] },
    currentStatus:{type:String, enum:["Pending","Approved","Rejected","Completed"], default:"Pending"}
}, {timestamps:true}
)

export default mongoose.model("appointment", appointmentSchema)