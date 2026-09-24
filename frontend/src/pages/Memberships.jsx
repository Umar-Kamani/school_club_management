import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Memberships.css";

const API_BASE = "http://localhost:3000/api";

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [students, setStudents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [formData, setFormData] = useState({
    student_id: "",
    club_id: "",
    join_date: new Date().toISOString().slice(0, 10),
  });
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    try {
      const [memRes, stuRes, clubRes] = await Promise.all([
        fetch(`${API_BASE}/memberships`),
        fetch(`${API_BASE}/students`),
        fetch(`${API_BASE}/clubs`),
      ]);
      setMemberships(await memRes.json());
      setStudents(await stuRes.json());
      setClubs(await clubRes.json());
    } catch (err) {
      showFeedback("Error loading data from server.");
    }
  }

  const filteredMemberships = memberships.filter((m) => {
    const student = students.find((s) => s.student_id === m.student_id);
    return student?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function showFeedback(message) {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 2500);
  }

  function openAddForm() {
    setEditingMembership(null);
    setFormData({
      student_id: students[0]?.student_id || "",
      club_id: clubs[0]?.club_id || "",
      join_date: new Date().toISOString().slice(0, 10),
    });
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(membership) {
    setEditingMembership(membership);
    setFormData({
      student_id: membership.student_id,
      club_id: membership.club_id,
      join_date: membership.join_date,
    });
    setFormError("");
    setShowForm(true);
  }

  async function handleRemove(membershipId) {
    if (!window.confirm("Are you sure you want to remove this membership?")) return;
    try {
      const res = await fetch(`${API_BASE}/memberships/${membershipId}`, { method: 'DELETE' });
      if (res.ok) {
        setMemberships(memberships.filter((m) => m.membership_id !== membershipId));
        showFeedback("Membership removed from database.");
      }
    } catch (err) {
      showFeedback("Error removing membership.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.join_date) {
      setFormError("Join date cannot be empty.");
      return;
    }

    try {
      if (editingMembership) {
       
        showFeedback("Update not implemented for memberships.");
      } else {
        const res = await fetch(`${API_BASE}/memberships`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          await loadInitialData();
          showFeedback("Membership added successfully!");
        }
      }
      setShowForm(false);
    } catch (err) {
      showFeedback("Error saving membership.");
    }
  }

   return (
    <>
      <Header>
        <h1>Memberships</h1>
        <p>{memberships.length} active memberships</p>
      </Header>

      <div className="page-body">
        {feedback && <div className="feedback">{feedback}</div>}

        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by student name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn primary" onClick={openAddForm}>
            + Add membership
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Club</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((membership) => {
              const student = students.find((s) => s.student_id === membership.student_id);
              const club = clubs.find((c) => c.club_id === membership.club_id);
              return (
                <tr key={membership.membership_id}>
                  <td>{student?.name || "Unknown"}</td>
                  <td>
                    <span className={`club-tag ${club?.category?.toLowerCase()}`}>{club?.club_name || "Unknown"}</span>
                  </td>
                  <td className="join-date">{formatDate(membership.join_date)}</td>
                  <td className="actions-col">
                    <div className="row-actions">
                      <button className="btn ghost small" onClick={() => openEditForm(membership)}>
                        Edit
                      </button>
                      <button className="btn danger small" onClick={() => handleRemove(membership.membership_id)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredMemberships.length === 0 && <p className="empty">No memberships match your search.</p>}

        {showForm && (
          <>
            <p className="section-label" style={{ marginTop: "30px" }}>
              {editingMembership ? "Edit membership" : "Add membership"}
            </p>
            <form className="form-panel" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>Student</label>
                  <select
                    value={formData.student_id}
                    onChange={(e) => setFormData({ ...formData, student_id: Number(e.target.value) })}
                  >
                    {students.map((s) => (
                      <option key={s.student_id} value={s.student_id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Club</label>
                  <select
                    value={formData.club_id}
                    onChange={(e) => setFormData({ ...formData, club_id: Number(e.target.value) })}
                  >
                    {clubs.map((c) => (
                      <option key={c.club_id} value={c.club_id}>
                        {c.club_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Join date</label>
                  <input
                    type="date"
                    value={formData.join_date}
                    onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
                  />
                </div>
              </div>

              {formError && <p className="form-error">{formError}</p>}
              <button type="submit" className="btn primary">
                Save membership
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

export default Memberships;
