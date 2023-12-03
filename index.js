const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent,
} = require("./StudentOperations");
app.use(express.json());

mongoose
  .connect("mongodb://localhost/mernstack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connection ongoing");
    let Student = await createStudent("Eishal", 20, "Arts");
    console.log(Student);
    let Students = await getStudents();
    console.log(Students);
    console.log(await deleteStudent("656c97901a7cc9aa7cbb003f"));
    let newStudent = updateStudent(
      "656ca62a1a7cc9aa7cbb0043",
      "Ahmed",
      25,
      "Psychology"
    );
  })
  .catch((err) => {
    console.log("Connection FAILED");
    console.log(err);
  });
app.listen(3000);