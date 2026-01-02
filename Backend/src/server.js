import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

import noteRoute from "./routes/noteRoute.js";
import userRoute from "./routes/userRoute.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimit.js";

const app = express();
const port = process.env.PORT || 6001;

// ================= MIDDLEWARE =================
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// ================= API ROUTES =================
app.use("/api/notes", noteRoute);
app.use("/api/users", userRoute);

// ================= PRODUCTION FRONTEND =================
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // ✅ FIXED PATH (go up TWO levels)
  const frontendPath = path.resolve(__dirname, "../../Frontend/dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ================= START SERVER =================
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
});
