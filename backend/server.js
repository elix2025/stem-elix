import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/UserRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();
connectCloudinary();
// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/auth", userRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
