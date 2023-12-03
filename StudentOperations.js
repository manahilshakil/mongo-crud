const StudentModel = require("./StudentModel");
const createStudent = async (name,age,major) => {
  console.log("Create Student");
  let student = new StudentModel();
  student.name = name;
  student.age = age;
  student.major = major;
  await student.save();
  return student;
};
const updateStudent = async (_id, name,age,major) => {
  let student = await StudentModel.findById(_id);
  student.name = name;
  student.age = age;
  student.major = major;
  await student.save();
  return student;
};
const getStudents = async () => {
    let student = await StudentModel.find();
    return student;
};
const deleteStudent = async (_id) => {
  let student = await StudentModel.findByIdAndDelete(_id);
  return student;
};
module.exports.createStudent = createStudent;
module.exports.getStudents = getStudents;
module.exports.deleteStudent = deleteStudent;
module.exports.updateStudent = updateStudent;