import mongoose, { Schema }  from "mongoose";

//create schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
     whatsAppNumber:{
        type: String,
        required: true,
        trim: true,
    
    },
    otp: {
        type: String,
        required: false,
    },
    otoExpiry: {
        type: Date,
        required: false,
    },
    password:{
        type: String,
        required: true,
    }
},{timestamps: true})
//create model off of the above schema
const User = mongoose.model("User", userSchema)
export default User;