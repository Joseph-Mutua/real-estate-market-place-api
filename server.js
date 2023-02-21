import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";

//Sendgrid


dotenv.config();

const app = express();

const port = process.env.PORT || 8000

// db
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => console.log("db_connected"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());
// routes middleware
app.use("/api", authRoutes);
app.use("/api", adRoutes);


//TRY out SENDGRID


app.listen(port, () => console.log(`server_running_on_port ${port}`));