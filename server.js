const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Update CORS settings to allow requests from your Vercel frontend URL
app.use(
  cors({
    origin:
      "https://final-project-frontend-6i1vmsupe-vamshi-gardas-projects.vercel.app/",
  })
); // Replace with your Vercel frontend URL

app.use(express.json());

// MongoDB connection details
const mongoDBUrl =
  "mongodb+srv://VAMSHI:abcd123@cluster1.jrwompw.mongodb.net/yourDatabaseName?retryWrites=true&w=majority";
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
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (err) {
    console.error("Error fetching notes", err);
    res.status(500).send("Error fetching notes");
  }
});

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

app.delete("/notes/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("The note with the given ID was not found.");
    }
    res.send(result);
  } catch (err) {
    console.error("Error deleting the note", err);
    res.status(500).send("Error deleting the note");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
