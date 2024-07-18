import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },

    createdAT: { type: Date, default: Date.now, index: { expires: 60 } }
}, { timestamps: true })

const otp = mongoose.model("OTP", otpSchema);
export default otp; 