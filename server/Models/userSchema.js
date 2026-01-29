import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age:{type:String, default:""},
  contact:{type:String, default:""},
  role: {
      type: String,
      enum: ['user', 'doctor', 'admin'],
      default: 'user',
    },

    // Optional doctor-only fields
    doctorProfile: {
      profileImage: {type: String, default: ''},
      degrees: { type: String, default: '' },
      experience: { type: String, default: '' },
      expertise: { type: [String], default: [] },
      consultationFee: { type: Number, default: null },
      slots: { type: [String], default: [] },
      isApproved: { type: Boolean, default: false },
    },

    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  }, { timestamps: true });

export default mongoose.model('User', userSchema);