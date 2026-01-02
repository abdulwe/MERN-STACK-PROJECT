import express from "express";
import { deletedNote, getAllNote, updateNotes, getNoteById, createNote } from "../controller/noteController.js";

const router = express.Router();

router.get("/", getAllNote)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNotes)
router.delete("/:id", deletedNote)



export default router