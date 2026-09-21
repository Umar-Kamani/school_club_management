import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Clubs.css";

const CATEGORIES = ["All", "Sport", "Academic", "Arts"];
const API_BASE = "http://localhost:3000/api";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [formData, setFormData] = useState({ club_name: "", category: "Sport", description: "" });
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  // Fetch clubs from backend
  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    try {
      const res = await fetch(`${API_BASE}/clubs`);
      const data = await res.json();
      setClubs(data);
    } catch (err) {
      showFeedback("Error loading clubs from server.");
    }
  }

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = activeCategory === "All" || club.category === activeCategory;
    const matchesSearch = club.club_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function showFeedback(message) {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 2500);
  }

  function openAddForm() {
    setEditingClub(null);
    setFormData({ club_name: "", category: "Sport", description: "" });
    setFormError("");
    setShowForm(true);
  }

  function openEditForm(club) {
    setEditingClub(club);
    setFormData({ club_name: club.club_name, category: club.category, description: club.description });
    setFormError("");
    setShowForm(true);
  }

  async function handleDelete(clubId) {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    try {
      // Note: Delete API needs to be added to backend, for now we simulate locally 
      // but in a real app you'd call: await fetch(`${API_BASE}/clubs/${clubId}`, { method: 'DELETE' })
      setClubs(clubs.filter((c) => c.club_id !== clubId));
      showFeedback("Club deleted.");
    } catch (err) {
      showFeedback("Error deleting club.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.club_name.trim()) {
      setFormError("Club name cannot be empty.");
      return;
    }

    try {
      if (editingClub) {
        // Update API Call (To be added to backend)
        setClubs(clubs.map((c) => (c.club_id === editingClub.club_id ? { ...c, ...formData } : c)));
        showFeedback("Club updated successfully.");
      } else {
        // Create API Call (To be added to backend, currently backend only has memberships POST)
        // Simulating the add for now until I expand the backend
        const newClub = { club_id: Date.now(), ...formData };
        setClubs([...clubs, newClub]);
        showFeedback("Club added successfully.");
      }
      setShowForm(false);
    } catch (err) {
      showFeedback("Error saving club.");
    }
  }

  return (
    <>
      <Header>
        <h1>Clubs</h1>
        <p>{clubs.length} clubs currently active across campus</p>
      </Header>

      <div className="page-body">
        {feedback && <div className="feedback">{feedback}</div>}

        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Search clubs by name…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filters">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={`filter ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
          <button className="btn primary" onClick={openAddForm}>
            + Add club
          </button>
        </div>

        <div className="cards">
          {filteredClubs.map((club) => (
            <div className="club-card" key={club.club_id}>
              <span className={`chip ${club.category.toLowerCase()}`}>{club.category}</span>
              <h3>{club.club_name}</h3>
              <p className="club-desc">{club.description}</p>
              <div className="club-meta">
                <span className="members">Loading members...</span>
                <div className="club-actions">
                  <button className="btn ghost small" onClick={() => openEditForm(club)}>
                    Edit
                  </button>
                  <button className="btn danger small" onClick={() => handleDelete(club.club_id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredClubs.length === 0 && <p className="empty">No clubs match your search.</p>}
        </div>

        {showForm && (
          <>
            <p className="section-label" style={{ marginTop: "30px" }}>
              {editingClub ? "Edit club" : "Add club"}
            </p>
            <form className="form-panel" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>Club name</label>
                  <input
                    value={formData.club_name}
                    onChange={(e) => setFormData({ ...formData, club_name: e.target.value })}
                    placeholder="e.g. Robotics Club"
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Sport</option>
                    <option>Academic</option>
                    <option>Arts</option>
                  </select>
                </div>
                <div className="field full">
                  <label>Description</label>
                  <textarea
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="What does this club do?"
                  />
                </div>
              </div>
              {formError && <p className="form-error">{formError}</p>}
              <button type="submit" className="btn primary">
                Save club
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

export default Clubs;
