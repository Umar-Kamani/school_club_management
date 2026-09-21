import { useState } from "react";
import Header from "../components/Header";
import { students as initialStudents } from "../data/mockData";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null); // null = adding new
  const [formData, setFormData] = useState({ name: "", email: "", programme: "" });
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function showFeedback(message) {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 2500);
  }

  function openAddForm() {
    setEditingStudent(null);
    setFormData({ name: "", email: "", programme: "" });
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(student) {
    setEditingStudent(student);
    setFormData({ name: student.name, email: student.email, programme: student.programme });
    setFormError("");
    setShowForm(true);
  }

  function handleDelete(studentId) {
    setStudents(students.filter((s) => s.student_id !== studentId));
    showFeedback("Student deleted.");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError("Name cannot be empty.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Email cannot be empty.");
      return;
    }

    if (editingStudent) {
      setStudents(
        students.map((s) => (s.student_id === editingStudent.student_id ? { ...s, ...formData } : s))
      );
      showFeedback("Student updated successfully.");
    } else {
      const newStudent = { student_id: Date.now(), ...formData };
      setStudents([...students, newStudent]);
      showFeedback("Student added successfully.");
    }

    setShowForm(false);
  }

  return (
    <>
      <Header>
        <h1>Students</h1>
        <p>{students.length} students registered</p>
      </Header>

      <div className="page-body">
        {feedback && <div className="feedback">{feedback}</div>}

        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Search students by name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn primary" onClick={openAddForm}>
            + Add student
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Programme</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.student_id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <span className="programme-tag">{student.programme}</span>
                </td>
                <td className="actions-col">
                  <div className="row-actions">
                    <button className="btn ghost small" onClick={() => openEditForm(student)}>
                      Edit
                    </button>
                    <button className="btn danger small" onClick={() => handleDelete(student.student_id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && <p className="empty">No students match your search.</p>}

        {showForm && (
          <>
            <p className="section-label" style={{ marginTop: "30px" }}>
              {editingStudent ? "Edit student" : "Add student"}
            </p>
            <form className="form-panel" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>Full name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Smith"
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@uni.edu"
                  />
                </div>
                <div className="field">
                  <label>Programme</label>
                  <input
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </div>
              {formError && <p className="form-error">{formError}</p>}
              <button type="submit" className="btn primary">
                Save student
              </button>
              <button type="button" className="btn ghost" style={{ marginLeft: "8px" }} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default Students;