import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Lead', leadSchema)
