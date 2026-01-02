import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import noteRoute from "./routes/noteRoute.js"
import userRoute from "./routes/userRoute.js"
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimit.js";
const app = express();
const port = process.env.PORT||6001;
app.use(cors({
    origin: "http://localhost:5173",
}
))
app.use(express.json())
app.use(rateLimiter);
app.use("/api/notes", noteRoute)
app.use("/api/users", userRoute)


connectDb().then(()=> {
app.listen(port, () => {
    console.log(`server is running on port ${port}`)

})
})

//mongodb+srv://malikayodeji2003_db_user:<db_password>@cluster0.tw5tn7z.mongodb.net/?appName=Cluster0