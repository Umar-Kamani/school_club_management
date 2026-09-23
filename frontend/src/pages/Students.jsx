import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Students.css";

const API_BASE = "http://localhost:3000/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", programme: ""});
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const res = await fetch(`${API_BASE}/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      showFeedback("Error loading students from server.");
    }
  }

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

  async function handleDelete(studentId) {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`${API_BASE}/students/${studentId}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents(students.filter((s) => s.student_id !== studentId));
        showFeedback("Student deleted from database.");
      }
    } catch (err) {
      showFeedback("Error deleting student.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Name cannot be empty.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Email cannot be empty.");
      return;
    }

    setFormError("");

    try {
      if (editingStudent) {
        const res = await fetch(
            `${API_BASE}/students/${editingStudent.student_id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });

        if (!res.ok) {
          throw new Error("Failed to update student");
        }

        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.student_id === editingStudent.student_id
                    ? { ...student, ...formData }
                    : student
            )
        );

        showFeedback("Student updated successfully.");
      } else {
        const res = await fetch(`${API_BASE}/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          throw new Error("Failed to add student");
        }

        await fetchStudents();
        showFeedback("Student added to database!");
      }
      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      showFeedback("Error saving student.");
    }
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
                  <span className="programme-tag">
                    {student.programme}
                  </span>
                  </td>

                  <td className="actions-col">
                    <div className="row-actions">
                      <button
                          className="btn ghost small"
                          onClick={() => openEditForm(student)}
                      >
                        Edit
                      </button>

                      <button
                          className="btn danger small"
                          onClick={() =>
                              handleDelete(student.student_id)
                          }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
              <p className="empty">No students match your search.</p>
          )}

          {/* FORM MUST BE OUTSIDE THE TABLE */}
          {showForm && (
              <div className="student-form-container">
                <p className="section-label">
                  {editingStudent ? "Edit student" : "Add student"}
                </p>

                <form className="form-panel" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div className="field">
                      <label>Full name</label>

                      <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                          }
                          placeholder="e.g. John Smith"
                      />
                    </div>

                    <div className="field">
                      <label>Email</label>

                      <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                          }
                          placeholder="john@uni.edu"
                      />
                    </div>

                    <div className="field">
                      <label>Programme</label>

                      <input
                          type="text"
                          value={formData.programme}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                programme: e.target.value,
                              })
                          }
                          placeholder="e.g. Computer Science"
                      />
                    </div>
                  </div>

                  {formError && (
                      <p className="form-error">{formError}</p>
                  )}

                  <button type="submit" className="btn primary">
                    {editingStudent ? "Update student" : "Save student"}
                  </button>

                  <button
                      type="button"
                      className="btn ghost"
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        setShowForm(false);
                        setEditingStudent(null);
                      }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
          )}
        </div>
      </>
  );
}

export default Students;
