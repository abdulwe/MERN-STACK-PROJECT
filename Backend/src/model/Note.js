import mongoose, { Schema }  from "mongoose";

//create schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
},{timestamps: true})
//create model off of the above schema
const Note = mongoose.model("Note", noteSchema)
export default Note;