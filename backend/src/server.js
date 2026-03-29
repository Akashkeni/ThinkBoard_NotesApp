const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const rateLimiter = require("./middleware/rateLimiter.js")

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();


app.use(express.json());

// Rate limiting Middleware
app.use(rateLimiter)

// Custom Middleware
app.use((req, res, next) => {
  console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
  next();
});

app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
})

