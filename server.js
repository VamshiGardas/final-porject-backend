const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Updated CORS origin without trailing slash
app.use(
  cors({
    origin: "https://final-project-frontend-liart.vercel.app",
  })
);

app.use(express.json());

// Hardcoded MongoDB URL
const mongoDBUrl =
  "mongodb+srv://VAMSHI:abcd123@cluster1.jrwompw.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define Note Schema and Model with basic validation
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  font: String,
  color: String,
});

const Note = mongoose.model("Note", noteSchema);

// Routes with added logging
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    console.log("Fetched notes:", notes); // Added for debugging
    res.send(notes);
  } catch (err) {
    console.error("Error fetching notes", err);
    res.status(500).send("Server error");
  }
});

app.post("/notes", async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    console.log("Saved new note:", newNote); // Added for debugging
    res.status(201).send(newNote);
  } catch (err) {
    console.error("Error saving the note", err);
    res.status(400).send("Error saving the note");
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (!result) {
      console.log("Note not found with ID:", req.params.id); // Added for debugging
      return res.status(404).send("The note with the given ID was not found.");
    }
    console.log("Deleted note:", result); // Added for debugging
    res.send(result);
  } catch (err) {
    console.error("Error deleting the note", err);
    res.status(500).send("Error deleting the note");
  }
});

const port = 5000; // Hardcoded port number
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
