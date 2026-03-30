const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connectDB = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Rate limiting Middleware
app.use(rateLimiter);

// Custom Middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
});
