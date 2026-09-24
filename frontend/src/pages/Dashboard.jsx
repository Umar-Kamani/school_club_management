import { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Dashboard.css";

const API_BASE = "http://localhost:3000/api";

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [stuRes, clubRes, memRes] = await Promise.all([
        fetch(`${API_BASE}/students`),
        fetch(`${API_BASE}/clubs`),
        fetch(`${API_BASE}/memberships`),
      ]);
      setStudents(await stuRes.json());
      setClubs(await clubRes.json());
      setMemberships(await memRes.json());
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
  }

  return (
    <>
      <Header>
        <h1>Hello,</h1>
        <p>Here's what's happening across your clubs this week.</p>
        <div className="stat-strip">
          <div>
            <span className="num">{students.length}</span>
            <span className="lbl">Students</span>
          </div>
          <div>
            <span className="num">{clubs.length}</span>
            <span className="lbl">Clubs</span>
          </div>
          <div>
            <span className="num">{memberships.length}</span>
            <span className="lbl">Memberships</span>
          </div>
        </div>
      </Header>

      <div className="page-body">
        <p className="section-label">Recently joined</p>
        {memberships.slice(0, 3).map((membership) => {
          const student = students.find((s) => s.student_id === membership.student_id);
          const club = clubs.find((c) => c.club_id === membership.club_id);
          return (
            <div className="row" key={membership.membership_id}>
              <span className="who">
                {student?.name} joined <span>{club?.club_name}</span>
              </span>
              <span className="when">{formatDate(membership.join_date)}</span>
            </div>
          );
        })}

        <p className="section-label" style={{ marginTop: "28px" }}>
          Clubs
        </p>
        <div className="cards">
          {clubs.slice(0, 3).map((club) => (
            <div className="card" key={club.club_id}>
              <span className={`chip ${club.category.toLowerCase()}`}>{club.category}</span>
              <h3>{club.club_name}</h3>
              <p>{memberships.filter((m) => m.club_id === club.club_id).length} members</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;