const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  age: Number,
  major: String
});
const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel;