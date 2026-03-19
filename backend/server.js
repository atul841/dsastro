const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/consultationDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Schema
const consultationSchema = new mongoose.Schema({
  countryCode: String,
  mobile: String,
  name: String,
  email: String,
  dob: String,
  tob: String,
  location: String,
}, { timestamps: true });

const Consultation = mongoose.model("Consultation", consultationSchema);


// API (SAVE DATA)
app.post("/api/consultation", async (req, res) => {
  try {
    const data = new Consultation(req.body);
    await data.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});


// GET API (optional)
app.get("/api/consultation", async (req, res) => {
  const data = await Consultation.find().sort({ createdAt: -1 });
  res.json(data);
});


// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
}); 





