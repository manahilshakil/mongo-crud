const express = require("express");
const mongoose = require("mongoose");
const {
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} = require("./StudentOperations");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/mernstack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new student
app.post("/students", async (req, res) => {
  const { name, age, major } = req.body;
  try {
    const newStudent = await createStudent(name, age, major);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new student" });
  }
});

// Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to get students" });
  }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const deletedStudent = await deleteStudent(studentId);
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the student" });
  }
});

// Update a student
app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, age, major } = req.body;
  try {
    const updatedStudent = await updateStudent(studentId, name, age, major);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the student" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
