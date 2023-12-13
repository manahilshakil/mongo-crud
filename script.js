document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    document.getElementById('studentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addStudent();
    });
  });
  
  async function fetchStudents() {
    try {
      const response = await fetch('/students');
      const students = await response.json();
      displayStudents(students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
  
  async function addStudent() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const major = document.getElementById('major').value;
  
    try {
      const response = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, major }),
      });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error('Failed to add student:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  }
  
  async function removeStudent(id) {
    try {
      const response = await fetch(`/students/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error('Failed to remove student:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing student:', error);
    }
  }
  
  function editStudent(id, name, age, major) {
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('major').value = major;
  
    document.getElementById('name').setAttribute('data-studentId', id);
  }
  
  async function updateStudent() {
    const id = document.getElementById('name').getAttribute('data-studentId');
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const major = document.getElementById('major').value;
  
    try {
      const response = await fetch(`/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, major }),
      });
      if (response.ok) {
        fetchStudents();
      } else {
        console.error('Failed to update student:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }
  
  function displayStudents(students) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
  
    students.forEach((student) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${student.name}, Age: ${student.age}, Major: ${student.major}
        <button onclick="removeStudent('${student._id}')">Remove</button>
        <button onclick="editStudent('${student._id}', '${student.name}', ${student.age}, '${student.major}')">Edit</button>`;
      studentList.appendChild(listItem);
    });
  }
  