import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// An endpoint is a combination of a URL + HTTP method that let's the client interact with a specific resource

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // this middleware will parse json bodies
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// app.get("/api/notes", (req,res) => {
//     res.status(200).send("Or do this")
// })

connectDB().then(() => {
  // first connect to database then start listening on the app
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
