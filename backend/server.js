import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/UserRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import progressRouter from "./routes/progressRoutes.js";
import emailRouter from "./routes/emailRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

dotenv.config();
connectDB();
connectCloudinary();

app.use(express.static("public"));

// middleware
app.use(express.json());
app.use(cors(
//    {origin: function (origin, callback) {
     
//          // allow requests with no origin (like mobile apps, curl, etc.)
//          if (!origin) return callback(null, true);
//          if (allowedOrigin.indexOf(origin) === -1) {
//            return callback(new Error("CORS policy not allowed"), false);
//          }
//       return callback(null, true);
//     },
//     credentials: true, // if you are sending cookies or Authorization headers
// }
)
);

// api endpoints
app.use("/api/auth", userRouter);
app.use("/api/courses", courseRoutes);
app.use("/api/protected", protectedRoutes);
// app.use("/api/user", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/progress", progressRouter);
app.use("/api/email", emailRouter);

app.get("/", (req, res) => {
  res.send("API is running ✅");
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
