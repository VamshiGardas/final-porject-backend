const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize express app
const app = express();

// Enable CORS for frontend interactions
app.use(cors());

// Body parser middleware to handle JSON data
app.use(express.json());

// MongoDB URL - replace with your actual MongoDB URL
const mongoDBUrl =
  "mongodb+srv://VAMSHI:abcd123@cluster0.9druc5w.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB with updated connection options
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define Note Schema and Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  font: String,
  color: String,
});

const Note = mongoose.model("Note", noteSchema);

// Routes
// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (err) {
    console.error("Error fetching notes", err);
    res.status(500).send("Error fetching notes");
  }
});

// Add a new note
app.post("/notes", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.send(newNote);
  } catch (err) {
    console.error("Error saving the note", err);
    res.status(500).send("Error saving the note");
  }
});

// Delete a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(404).send("The note with the given ID was not found.");
    res.send(result);
  } catch (err) {
    console.error("Error deleting the note", err);
    res.status(500).send("Error deleting the note");
  }
});

// Start server on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; // Exporting the app for potential testing or further extension
