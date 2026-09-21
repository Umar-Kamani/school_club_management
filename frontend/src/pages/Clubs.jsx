import { useState } from "react";
import Header from "../components/Header";
import { clubs as initialClubs, memberships } from "../data/mockData";
import "./Clubs.css";

const CATEGORIES = ["All", "Sport", "Academic", "Arts"];

function Clubs() {
  const [clubs, setClubs] = useState(initialClubs);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null); // null = adding new
  const [formData, setFormData] = useState({ club_name: "", category: "Sport", description: "" });
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  // Only clubs matching both the search text AND the selected category
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

  function handleDelete(clubId) {
    setClubs(clubs.filter((c) => c.club_id !== clubId));
    showFeedback("Club deleted.");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.club_name.trim()) {
      setFormError("Club name cannot be empty.");
      return;
    }

    if (editingClub) {
      // Update: keep the same club_id, replace the rest of the fields
      setClubs(clubs.map((c) => (c.club_id === editingClub.club_id ? { ...c, ...formData } : c)));
      showFeedback("Club updated successfully.");
    } else {
      // Create: add a new club to the end of the array
      const newClub = { club_id: Date.now(), ...formData };
      setClubs([...clubs, newClub]);
      showFeedback("Club added successfully.");
    }

    setShowForm(false);
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
                <span className="members">
                  {memberships.filter((m) => m.club_id === club.club_id).length} members
                </span>
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