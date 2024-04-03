import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import router from "./routes/route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
