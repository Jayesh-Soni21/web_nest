import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required:true,
        unique:true
    },
    role: {
        type: String,
        enum:['student','recruiter'],
        required: true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},//yaha par relation generate krenge between company table and user table to yaha pr uski id store kr lenge company vaale schema me se, also yha hmne company vaaale model ka reference bhi diya hai obviously 
        profilePhoto:{
            type:String,
            default:" "
        }
    },

},{timestamps:true});
export const User=mongoose.model('User',userSchema); 